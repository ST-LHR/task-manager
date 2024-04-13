import React, { useState, useEffect } from "react";
import List from "./components/List";
import { db } from "./firebase";

import {
  collection,
  addDoc,
  query,
  onSnapshot,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import TextField from "@mui/material/TextField";

function App() {
  const [task, setTask] = useState("");
  const [newtask, setNewtask] = useState([]);

  const createTaskHandler = async (e) => {
    e.preventDefault();
    if (task === "") {
      alert("Please enter a valid task");
      return;
    }
    await addDoc(collection(db, "todos"), {
      text: task,
      completed: false,
    });
    setTask("");
    alert("Task added successfully");
  };

  useEffect(() => {
    const q = query(collection(db, "todos"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let todosArr = [];
      querySnapshot.forEach((doc) => {
        todosArr.push({ ...doc.data(), id: doc.id });
      });
      setNewtask(todosArr);
    });
    return () => unsubscribe();
  }, []);

  const updateTaskHandler = async (task) => {
    // console.log("task is",task.id);
    await updateDoc(doc(db, "todos", task.id), {
      completed: !task.completed,
    });
  };
  const deleteTaskHandler = async (task) => {
    await deleteDoc(doc(db, "todos", task.id));
  };

  return (
    <div className="bg-slate-800 w-full h-screen mx-auto">
      <div className="w-full sm:w-1/2 mx-auto rounded-md bg-slate-600">
        <div className="w-full flex justify-center items-center text-center">
          <h1 className="font-bold pt-7 text-2xl md:text-4xl text-white ">
            Task Manager
          </h1>
        </div>
        <form
          onSubmit={createTaskHandler}
          className="mt-10 w-full flex justify-between mx-auto"
        >
          {/* <input
            className=" w-full h-10"
            type="text"
            value={task}
            onChange={(e) => setTask(e.target.value)}
          /> */}

          <TextField
            id="outlined-basic"
            label="Enter Task"
            variant="outlined"
            className=" w-full bg-slate-300"
            type="text"
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />
          <Button
            className=""
            type="submit"
            variant="contained"
            endIcon={<SendIcon />}
          >
            Add
          </Button>
        </form>
      </div>
      <div className=" mt-5 w-full sm:w-1/2 mx-auto rounded-md bg-slate-600 ">
        <ul>
          {newtask.map((task, index) => (
            <List
              key={index}
              task={task}
              deleteTaskHandler={deleteTaskHandler}
              updateTaskHandler={updateTaskHandler}
            />
          ))}
        </ul>
      </div>
      <div className=" mt-5 w-full sm:w-1/2 mx-auto rounded-md bg-slate-600 ">
        <p className="text-white text-center flex justify-center items-center p-3 text-md sm:text-xl font-bold">{`You have ${newtask.length} tasks in total`}</p>
      </div>
    </div>
  );
}

export default App;
