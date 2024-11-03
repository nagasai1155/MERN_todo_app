import React, { useEffect,useState } from 'react'
import axios from 'axios';
import './App.css'


const App = () => {

  const [items,setItems]=useState([]);
  const [newtask,setnewtask]=useState(" ");

  useEffect(()=>{
      axios.get('http://localhost:4500/gettask')
      .then(arr=>setItems(arr.data));
  },[])

  const onsubmit=(e)=>{
    e.preventDefault();
   axios.post("http://localhost:4500/addtask",{todo:newtask})
   .then(arr => setItems(arr.data))
  }

   const deletehandler=(id)=>{
    axios.delete(`http://localhost:4500/deletetask/${id}`)
    .then(arr=>setItems(arr.data))
   }

  return (
    <>
   <div style={{marginTop:"80px"}} >
    <center >
      <h1 style={{marginBottom:"70px"}}>TO-DO-APP</h1>
      <form onSubmit={onsubmit}>
        <input type='text' value={newtask} onChange={(e)=>setnewtask(e.target.value)}/>
        <input type='submit' value="add"/>
      </form>
     {
      items.map(task=><div key={task._id}>
        <h1>
          {task.todo}
        </h1><button onClick={()=>{
          deletehandler(task._id)
        }}>delete</button>
      </div>)
     }
    </center>
   </div>
    </>
  )
}

export default App