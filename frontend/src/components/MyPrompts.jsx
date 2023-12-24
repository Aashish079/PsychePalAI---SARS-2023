import { useEffect, useState } from "react";
import "../Styles/MyPrompts.css";
import useJournals from "../hooks/useJournals.js";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import Speech from "react-text-to-speech";
import useAnalysis from "../hooks/useAnalysis.js";
import apiClient from "../utils/apiClient.js";

const MyPrompts = () => {
  // Creating tasks, newTask and editTask states for user input
  // Creating tasks for saving tasks
  const { data: journal, error, isLoading: isLoadingJournal } = useJournals();
  const {
    data: analysis,
    erroranalysis,
    isLoading: isLoadingAnalysis,
  } = useAnalysis();
  const [parent, enableAnimations] = useAutoAnimate({
    duration: 400,
  });

  const [tasks, setTasks] = useState([]);
  const [prompts, setPrompts] = useState([]);
  // console.log(tasks);

  // Saving instance of new tasks
  const [newTask, setNewTask] = useState({});
  // Saving instance of edit tasks
  const [editTask, setEditTask] = useState(null);
  // Creating prompts for tasks;
  // setTasks([...journalTitles]);
  useEffect(() => {
    if (!journal) return;
    setTasks([...journal]);
    console.log({ journal });
  }, [journal]);

  useEffect(() => {
    if (!analysis) return;
    setPrompts([...analysis]);
    console.log({ analysis });
  }, [analysis]);
  // Creating function handleAddTask to handle add user input
  const handleAddTask = () => {
    // Checking if user input is empty
    if (newTask.content === "") {
      alert("Please enter your journal entry");
      return;
    }

    // Checking if user input is already in the list
    // const duplicate = tasks.find((task) => task === newTask);
    // if (duplicate) {
    //   alert("Task already exists");
    //   return;
    // }

    // Adding user input to the list
    // setTasks([
    //   {
    //     title: "",
    //     content: newTask.content,
    //   },
    //   ...tasks,
    // ]); // Need to change this to add to object
    console.log(newTask.content);
    apiClient
      .post("/journals", {
        id: tasks.length + 1,
        date: Date.now(),
        title: "",
        content: newTask.content,
      })
      .then((response) => {
        const { journal, analysisdb } = response.data;
        setTasks([journal, ...tasks]);
        setPrompts([analysisdb, ...prompts]);
      })
      .catch((error) => {
        console.log(error);
      });
    console.log();
    setNewTask({
      title: "",
      content: "",
    });
  };

  // Clearing user input

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
  useEffect(() => {
    console.log({ prompts });
  }, [prompts]);
  return (
    <div className="main w-10/12 h-full bg-content_background">
      <div className="add-task-container">
        <input
          type="text"
          value={newTask.content}
          onChange={(e) =>
            setNewTask({ ...newTask, title: " ", content: e.target.value })
          }
          placeholder="How was your day? Please write about it here."
          className="prompt"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleAddTask();
            }
          }}
        />
        <button onClick={handleAddTask} className="submit-btn">
          Submit
        </button>
      </div>
    
      <div className="tasks-container" ref={parent}>
        {tasks.map((task, index) => (
          <div
            key={task.id}
            className="bor border-2 border-gray-200 p-2 rounded-xl m-2"
          >
            <div key={index} className="task">
              {editTask === index ? (
                <input
                  type="text"
                  value={newTask.content}
                  onChange={(e) => {
                    setNewTask({
                      ...newTask,
                      title: " ",
                      content: e.target.value,
                    });
                    console.log(newTask.content); // This won't
                  }}
                  className="edit-task w-full p-3"
                  placeholder="Content"
                />
              ) : (
                <div>
                  <div className="font-bold">{task.title}</div>
                  <p>{task.content}</p>
                </div>
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
              <p>Suggestion: </p>
              <p>
                {prompts.filter((prompt) => prompt.entry === task._id)[0]
                  ?.counsel || "Loading"}
                <Speech
                  text={
                    prompts.filter((prompt) => prompt.entry === task._id)[0]
                      ?.counsel || "No response yet"
                  }
                />
              </p>
            </div>
            <div className="response p-6">
              <p>
                sentimentScore:
                {prompts.filter((prompt) => prompt.entry === task._id)[0]
                  ?.sentimentScore || "0"}{" "}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default MyPrompts;
