import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0);

  useEffect(() => {
      const fetchData = async () => {
        const response = await fetch(`/api/hello`);
        const newData = await response.json();
        setCount(newData.count);
      };

      fetchData();
    }, []);

  return (
    <div>
      <p>{count ? count : 0}</p>
    </div>
  )
}

export default App
