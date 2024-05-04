import express, { Request, Response } from 'express';
import { MongoClient,  MongoClientOptions,  ServerApiVersion } from 'mongodb';
require('dotenv').config();

export interface ClientInfo {
    dataSource: string;
    client: MongoClient;
}

// console.log('MONGOURIONE:', process.env.MONGOURIONE);
// console.log('MONGOURITWO:', process.env.MONGOURITWO);
// console.log('MONGOURITHREE:', process.env.MONGOURITHREE);

export const dataSources:string[] =  [
    process.env.MONGOURIONE!,
    process.env.MONGOURITWO!,
    process.env.MONGOURITHREE!,
];

export type DatabasesBySource = {
    [key: string]: string[]; // Define an index signature for dynamic property names and their values as string arrays
};

/**
 * 第二个版本
 */

// Function to switch MongoDB data sources with a retry mechanism
export async function switchDataSourcesWithRetry(dataSources: string[], options: MongoClientOptions, maxRetries: number, retryDelay: number): Promise<ClientInfo[]> {
    const connections: ClientInfo[] = [];

    for (const dataSource of dataSources) {
        let retries = 0;
        // let dataSourceTitle =''
        while (retries < maxRetries) {
            try {
                const client = new MongoClient(dataSource, options);
                await client.connect();
                // dataSourceTitle = retries.toString()
                // connections.push({ dataSourceTitle, client });
                connections.push({ dataSource, client });
                break;
            } catch (error) {
                retries++;
                console.error(`Failed to connect to ${dataSource}. Retrying...${retries}`);
                await new Promise(resolve => setTimeout(resolve, retryDelay)); // Wait before retrying
            }
        }
    }

    return connections;
}

// Function to list databases within a MongoDB client
export async function listDbs(client: MongoClient): Promise<string[]> {
    const databasesList = await client.db().admin().listDatabases();
    return databasesList.databases.map(db => db.name);
}

// Express app
const app = express();
const port = 30005;

// RESTful API endpoint to list databases
app.get('/listDbs', async (req: Request, res: Response) => {
    // connections 是 switchDatasourcesWithRetry 返回的对象数组，结构是（ 数据源，MGClient）
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
            const databases = await listDbs(client);
            databasesBySource[dataSource] = databases;
        } catch (error) {
            console.error(`Failed to list databases for ${dataSource}.`);
            databasesBySource[dataSource] = [];
        } finally {
            await client.close();
        }
    }

    const updatedObject:any = {};
    for (const [key,[index, valueArray]] of Object.entries(databasesBySource)) {
        // Define the New Key Name (replace 'newKey' with your desired name)
        const newKey = `newKey-- ${index}`;
      
        // Add the New Key-Value Pair to the Updated Object
        updatedObject[newKey]  = valueArray;
      }

    // for(let i=0; i < databasesBySource.length; i++ ){
    // databasesBySource[i].forEach(obj => {
    //   const objectKeys = Object.keys(obj);
    //   allKeys.push(...objectKeys); // Concatenate all key arrays
    // });
    // }
    

    // const updataData = Object.entries(databasesBySource).map(([key,value])=>{
    //     return Object.assign({}, obj, {
    //         "newKey": obj.oldKey, // Rename "oldKey" to "newKey"
    //         // Optional: Remove the original "oldKey" if desired
    //         // delete obj.oldKey
    //       });
    // })

    // 直接渲染
    res.send(
        Object.entries(databasesBySource).map(([key, value]) => (
            `<h4>${key}</h4> ${value.map((item) => `<p>${item}</p>`).join('')}` // Join the array of strings into a single string
        )).join('') // Join the array of HTML elements into a single string
    );
    
    // res.send(Object.entries(databasesBySource).map(([key,value])=>(
    //         `<h4>${key} </h4> ${value.map((item)=> `<p> ${item}</p>`)}`
    //         )));
    // res.json(updatedObject);
    // res.json(databasesBySource);
    // res.json(Object.entries(databasesBySource).map(([key,value])=>(
    //     `<h4>${key}</h4> <p>${value}<p>`
    //     )));
});

// Start the Express server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

/**
 * 第一个版本
 */
// // Function to switch MongoDB data sources with a retry mechanism
// async function switchDataSourcesWithRetry(dataSources: string[], {}, maxRetries: number, retryDelay: number): Promise<MongoClient | null> {
//    const options = {
//     serverApi: {
//       version: ServerApiVersion.v1,
//       strict: true,
//       deprecationErrors: true,
//     }
// } 
//     // console.log("datasources[0]:",dataSources[0])

//     for (const dataSource of dataSources) {
//         let retries = 0;
//         while (retries < maxRetries) {
//             try {
//                 console.log("dataSource,options",`${dataSource}`,options)
//                 const client = new MongoClient(dataSource, options);
//                 await client.connect();
//                 return client;
//             } catch (error) {
//                 retries++;
//                 console.error(`Failed to connect to ${dataSource}. Retrying...`);
//                 await new Promise(resolve => setTimeout(resolve, retryDelay)); // Wait before retrying
//             }
//         }
//     }
//     console.error("Exhausted all retries. Unable to connect to any data source.");
//     return null;
// }

// // Function to list databases within a MongoDB client
// async function listDbs(client: MongoClient)  :Promise<string[]> {
//     const databasesList = await client.db().admin().listDatabases();
//     return databasesList.databases.map(db => db.name);
// }

// // Express app
// const app = express();
// const port = 30005;

// // RESTful API endpoint to list databases
// app.get('/listDbs', async (req: Request, res: Response) => {
//     const client = await switchDataSourcesWithRetry(dataSources,  {
//         serverApi: {
//           version: ServerApiVersion.v1,
//           strict: true,
//           deprecationErrors: true,
//         }
//     }, 3, 5000); // Retry 3 times with 5-second delay
//     if (!client) {
//         return res.status(500).send("Failed to connect to any data source.");
//     }

//     try {
        
//         const databases = await listDbs(client);
//         res.json({ databases });
//     } catch (error) {
//         res.status(500).send("Failed to list databases.");
//     } finally {
//         await client.close();
//     }
// });

// // Start the Express server
// app.listen(port, () => {
//     console.log(`Server running on port ${port}`);
// });
