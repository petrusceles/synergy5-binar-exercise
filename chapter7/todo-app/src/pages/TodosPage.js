import { useEffect, useState } from 'react'
import axios from 'axios'

export default function TodosPage() {
  const [todosData, setTodosData] = useState([])
  const [count, setCount] = useState(0)
  const [count2, setCount2] = useState(0)

  useEffect(() => {
    console.log("useEffect running");

    const getTodosData = async () => {
      const todos = await axios.get("https://jsonplaceholder.typicode.com/todos");
      setTodosData(todos.data)
    }

    getTodosData();
  }, []);

  return (
    <div>
      <h1>Counter: {count}</h1>
      <button onClick={() => setCount(count + 1)}>Tambah Count</button>
      <br />

      TodosPage
      {todosData.map(todo => <div key={todo.id}>{todo.title}</div>)}
    </div>
  )
}
