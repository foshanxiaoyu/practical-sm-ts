import fs from 'node:fs/promises';
import path from 'node:path';
import axios from 'axios';

async function saveDataToFile(apiUrl: string, saveDirectory: string, filename: string): Promise<void> {
  try {
    // 1. Make the API request using axios
    const response = await axios.get(apiUrl);

    // 2. Check if the request was successful (status code 2xx)
    if (response.status >= 200 && response.status < 300) {
      const data = response.data;
      const filePath = path.join(saveDirectory, filename);

      // 3. Ensure the save directory exists
      await fs.mkdir(saveDirectory, { recursive: true });

      // 4. Convert the data to a string format (you might need to adjust this based on your API response)
      const dataString = JSON.stringify(data, null, 2); // Use JSON.stringify for JSON data

      // 5. Write the data to the specified file
      await fs.writeFile(filePath, dataString, 'utf-8');

      console.log(`Data successfully saved to: ${filePath}`);
    } else {
      console.error(`Error fetching data from API. Status code: ${response.status}`);
    }
  } catch (error: any) {
    console.error(`An error occurred: ${error.message}`);
  }
}

// Example usage:
const apiEndpoint = 'https://jsonplaceholder.typicode.com/todos/1'; // Replace with your API endpoint
const directoryToSave = './data'; // Specify the directory to save the file
const outputFilename = 'api_data.json'; // Specify the desired filename

saveDataToFile(apiEndpoint, directoryToSave, outputFilename);