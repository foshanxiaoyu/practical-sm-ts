import { MongoClient,  MongoClientOptions,  ServerApiVersion } from 'mongodb';
require('dotenv').config();

export interface ClientInfo {
    dataSource: string;
    client: MongoClient;
}

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
