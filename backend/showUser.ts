export interface User {
    id: number;
    name: string;
    email: string;
  }
  
  export async function fetchAndDisplayUsers(): Promise<any> {
    const endpoint = 'https://jsonplaceholder.typicode.com/users';
  
    try {
      const response = await fetch(endpoint);
  
      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }
  
      const users: User[] = await response.json() as any;
    //   console.log(users)
      
      return users ;
      
  
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
  
//   fetchAndDisplayUsers();
  