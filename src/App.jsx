import React, { useState, useCallback } from "react";

const TaskList = React.memo(({ tasks }) => {
  console.log("TaskList rendered");
  return (
    <ul>
      {tasks.map((task, index) => (
        <li key={index}>{task}</li>
      ))}
    </ul>
  );
});

export default function App() {
  console.log("App rendered");

  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");

  const addTask = useCallback(() => {
    if (input.trim()) {
      setTasks((prev) => [...prev, input]);
      setInput("");
    }
  }, [input]);

  return (
    <div>
      <h2>To-Do List</h2>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Add task"
      />
      <button onClick={addTask}>Add</button>
      <TaskList tasks={tasks} />
    </div>
  );
}
