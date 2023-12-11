import { useState } from 'react';

const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  const addTask = () => {
    if (newTask.trim() !== '') {
      setTasks([...tasks, { id: Date.now(), text: newTask, completed: false }]);
      setNewTask('');
    }
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };
  

  const toggleTaskCompletion = (taskId) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

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
              className={`cursor-pointer ${task.completed ? 'line-through text-gray-500' : ''}`}
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
