import express, { Request, Response } from 'express';

// Sample vehicle data
const vehicles = [
  { id: 1, make: 'Toyota', model: 'Corolla', year: 2018 },
  { id: 2, make: 'Honda', model: 'Civic', year: 2019 },
  { id: 3, make: 'Ford', model: 'Fusion', year: 2017 },
  { id: 4, make: 'Chevrolet', model: 'Malibu', year: 2020 },
];

const app = express();
const PORT = 23000;

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
