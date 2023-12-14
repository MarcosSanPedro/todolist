import { useState, useEffect  } from 'react';
import { db } from './firebase';
import { addDoc, collection,  deleteDoc,  getDocs, doc } from 'firebase/firestore';

const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  const addTask = async () => {
    if (newTask.trim() !== '') {
      const taskReference = collection(db, "todos");
      const docRef = await addDoc(taskReference, {
        text: newTask,
        done: false,
      });
  
      const task = {
        id: docRef.id,
        text: newTask,
        done: false,
      };
  
      setTasks([...tasks, task]);
      setNewTask('');
    }
  };
  

  
  

  const deleteTask = async (taskId) => {
    await deleteDoc(doc(db, "todos", taskId))
    setTasks(tasks.filter((task) => task.id !== taskId));
  };
  

  const toggleTaskCompletion = (taskId) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, done: !task.done } : task
      )
    );
  };
  useEffect(()=>{
    const todoReference = collection(db,"todos")

    const getData = async () =>{
    const data = await getDocs(todoReference);
    const todos = data.docs.map((doc)=>({
      id: doc.id,
      ...doc.data()
    }));

    setTasks(todos)
  }
    getData()
},[]);

 
  return (
    <div className="max-w-md mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">To-Do List</h1>
      <div className="flex items-center mb-4">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          className="border p-2 mr-2 w-full"
          placeholder="New Task..."
        />
        <button onClick={addTask} className="bg-blue-500 text-white p-2 rounded">
          Add task
        </button>
      </div>
      <ul>
        {tasks.map((task) => (
          <li key={task.id} className="flex items-center justify-between mb-2">
            <span  
              className={`cursor-pointer ${task.done ? 'line-through text-gray-500' : ''}`}
              onClick={() => toggleTaskCompletion(task.id)}
            >
              {task.text}
            </span>
            <button onClick={() => deleteTask(task.id)} className="text-red-500">
              Delete Task
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
