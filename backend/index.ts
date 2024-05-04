import express, { Request, Response } from 'express';
import { ServerApiVersion } from 'mongodb';
import {dataSources, switchDataSourcesWithRetry,DatabasesBySource,listDbs } from './dbf'



// Sample vehicle data
const vehicles = [
  { id: 1, make: 'Toyota', model: 'Corolla', year: 2018 },
  { id: 2, make: 'Honda', model: 'Civic', year: 2019 },
  { id: 3, make: 'Ford', model: 'Fusion', year: 2017 },
  { id: 4, make: 'Chevrolet', model: 'Malibu', year: 2020 },
];

const app = express();
const PORT = 30002;

const API_KEY = 'your_api_key';


app.use(express.json());

// Middleware to verify API key
const verifyApiKey = (req: Request, res: Response, next: Function) => {
  const apiKey = req.query.apiKey as string;
  if (apiKey === API_KEY) {
    next();
  } else {
    res.status(401).json({ error: 'Invalid API key' });
  }
};

// Apply API key verification middleware to all routes
app.use(verifyApiKey);

// Endpoint to get all vehicles
app.get('/vehicles', (req: Request, res: Response) => {
  res.json(vehicles);
});

// dbs-list 
app.get('/dblist', async (req:Request,res:Response)=>{

  // connections 是 switchDatasourcesWithRetry 返回的对象数组，结构是（ 数据源，MG-client）
  const connections = await switchDataSourcesWithRetry(dataSources,  {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
}, 3, 5000); // Retry 3 times with 5-second delay
if (connections.length === 0) {
    return res.status(500).send("Failed to connect to any data source.");
}

const databasesBySource:DatabasesBySource = {};
for (const { dataSource, client } of connections) {
    try {
        const databases = await listDbs(client); // return Promise<string[]>
        databasesBySource[dataSource] = databases; // 对应的数据源为key ，value 为对应的 Promise<string[]>
    } catch (error) {
        console.error(`Failed to list databases for ${dataSource}.`);
        databasesBySource[dataSource] = [];
    } finally {
        await client.close();
    }
}
// 直接渲染
res.send(
    Object.entries(databasesBySource).map(([key, value]) => (
        `<h4>${key}</h4> ${value.map((item) => `<p>${item}</p>`).join('')}` // Join the array of strings into a single string
    )).join('') // Join the array of HTML elements into a single string
);
})


// Endpoint to get vehicle by ID
app.get('/vehicles/:id', (req: Request, res: Response) => {
  const vehicleId = parseInt(req.params.id);
  const vehicle = vehicles.find(v => v.id === vehicleId);
  if (vehicle) {
    res.json(vehicle);
  } else {
    res.status(404).json({ error: 'Vehicle not found' });
  }
});

// Endpoint to search vehicles by make
app.get('/search', (req: Request, res: Response) => {
  const make = req.query.make as string;
  const filteredVehicles = vehicles.filter(v => v.make.toLowerCase() === make.toLowerCase());
  res.json(filteredVehicles);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
