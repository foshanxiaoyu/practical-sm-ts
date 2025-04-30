export interface MetaData {
    '1. Information': string;
    '2. Symbol': string;
    '3. Last Refreshed': string;
    '4. Interval': string;
    '5. Output Size': string;
    '6. Time Zone': string;
  }
  
  export interface StockDataPoint {
    open: string;
    high: string;
    low: string;
    close: string;
    volume: string;
  }
  
  export interface TimeSeries5min {
    [timestamp: string]: StockDataPoint; // Key is timestamp (string), value is StockDataPoint
  }
  
  export interface NewText {
    'Meta Data': MetaData;
    'Time Series (5min)': TimeSeries5min;
  }
  
  export async function fetchNewText(): Promise<any> {
    const endpoint:string|undefined = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=5min&apikey=${process.env.ALPHAVAPIKEY}`;
  
    try {
      const response = await fetch(endpoint);
  
      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }
  
      const newtext: NewText[] = await response.json() ; //as any;
    //   console.log(users)
      
      return newtext ;
      
  
    //   const userList = document.getElementById('user-list');
    //   if (!userList) return;
  
    //   users.forEach(user => {
    //     const li = document.createElement('li');
    //     li.textContent = `${user.name} (${user.email})`;
    //     userList.appendChild(li);
    //   });
  
    } catch (error) {
      console.error("Error fetching or displaying users:", error);
    }
  }
  