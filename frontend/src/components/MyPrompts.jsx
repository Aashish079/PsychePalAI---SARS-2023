import { useEffect, useState } from "react";
import "../Styles/MyPrompts.css";
import useJournals from "../hooks/useJournals.js";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import React from 'react'
import Speech from 'react-text-to-speech'

const MyPrompts = () => {
  // Creating tasks, newTask and editTask states for user input
  // Creating tasks for saving tasks
  const { journals, error, isLoading } = useJournals();
  const [parent, enableAnimations] = useAutoAnimate({
    duration: 400,
  });

  const [tasks, setTasks] = useState([]);
  // console.log(tasks);

  // Saving instance of new tasks
  const [newTask, setNewTask] = useState("");
  // Saving instance of edit tasks
  const [editTask, setEditTask] = useState(null);
  // Creating prompts for tasks;
  const [prompts, setPrompts] = useState(["Prompt 1", "Prompt 2", "Prompt 3"]);
  // setTasks([...journalTitles]);
  useEffect(() => {
    if (!journals) return;
    setTasks(journals.map((journal) => journal.title));
    console.log("journals");
  }, [tasks.length, journals]);
  // Creating function handleAddTask to handle add user input
  const handleAddTask = () => {
    // Checking if user input is empty

    if (newTask === "") {
      alert("Please enter your journal entry");
      return;
    }

    // Checking if user input is already in the list
    const duplicate = tasks.find((task) => task === newTask);
    if (duplicate) {
      alert("Task already exists");
      return;
    }

    // Adding user input to the list
    setTasks([newTask, ...tasks]);

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
          placeholder="How was your day? Please write about it here."
          className="prompt"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleAddTask();
            }
          }}
        />
        <button onClick={handleAddTask}>Submit</button>
      </div>
      <div className="tasks-container" ref={parent}>
        {tasks.map((task, index) => (
          <div
            key={task}
            className="border-2 border-gray-300 p-2 rounded-xl m-2"
          >
            <div key={index} className="task">
              {editTask === index ? (
                <input
                  type="text"
                  value={newTask}
                  onChange={(e) => setNewTask(e.target.value)}
                  className="edit-task w-full"
                />
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
              <p>{prompts[index]} <Speech text= {prompts[index]} /></p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default MyPrompts;
