import React, { useState } from "react";
import "./Main.css";

const Main = () => {
  // Creating tasks, newTask and editTask states for user input
  // Creating tasks for saving tasks
  const [tasks, setTasks] = useState([]);
  // Saving instance of new tasks
  const [newTask, setNewTask] = useState("");
  // Saving instance of edit tasks
  const [editTask, setEditTask] = useState(null);
  // Creating prompts for tasks;
  const [prompts, setPrompts] = useState(["Prompt 1", "Prompt 2", "Prompt 3"]);

  // Creating function handleAddTask to handle add user input
  const handleAddTask = () => {
    // Checking if user input is empty
    if (newTask === "") {
      alert("Please enter a task");
      return;
    }

    // Checking if user input is already in the list
    const duplicate = tasks.find((task) => task === newTask);
    if (duplicate) {
      alert("Task already exists");
      return;
    }

    // Adding user input to the list
    setTasks([...tasks, newTask]);

    // Clearing user input
    setNewTask("");
  };

  // Creating function handleDeleteTask to handle delete user input
  const handleDeleteTask = (index) => {
    // Checking if user input is empty
    const newTasks = [...tasks];
    // Removing task in the index
    newTasks.splice(index, 1);
    // Setting updated tasks
    setTasks(newTasks);
    // Clearing user input
    setNewTask("");
  };

  // Creating function handleEditTask to handle edit user input
  const handleEditTask = (index) => {
    // Setting user input to edit task
    setNewTask(tasks[index]);
    // Setting edit task to index
    setEditTask(index);
  };

  // Creating function handleSaveTask to handle save user input
  const handleSaveTask = (index) => {
    const newTasks = [...tasks];
    newTasks[index] = newTask;
    setTasks(newTasks);
    setEditTask(null);
  };

  return (
    <div className="main w-10/12 h-full">
      <div className="add-task-container">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add a new task"
          className="prompt"
        />
        <button onClick={handleAddTask}>Submit</button>
      </div>      
      <div className="tasks-container">
        {tasks.map((task, index) => (
          <div className="border-2 border-gray-300 p-2 rounded-xl m-2">
            <div key={index} className="task">
              {editTask === index ? (
                <input
                  type="text"
                  value={newTask}
                  onChange={(e) => setNewTask(e.target.value)}
                  className="edit-task w-full" />
              ) : (
                <p>{task}</p>
              )}

              <div className="buttons">
                {editTask === index ? (
                  <button onClick={() => handleSaveTask(index)}>Save</button>
                ) : (
                  <button onClick={() => handleEditTask(index)}>Edit</button>
                )}
                <button onClick={() => handleDeleteTask(index)}>Delete</button>
              </div>
            </div>
            <div className="response p-6">
              <p>Response: </p>
              <p>{prompts[index]}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Main;
