import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import List from "./components/List";
import { db } from "./utils/firebase";

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
  const dispatch = useDispatch();

  // this function will add tasks to configured firebase database and also update in redux store

  const createTaskHandler = async (e) => {
    dispatch({ type: "todo/createTodoList", payload: task });
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

  // this function will fetch tasks from firebase and update the redux store

  useEffect(() => {
    const q = query(collection(db, "todos"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let todosArr = [];
      querySnapshot.forEach((doc) => {
        todosArr.push({ ...doc.data(), id: doc.id });
      });
      setNewtask(todosArr);
      dispatch({ type: "todo/fetchTodoListStart", payload: todosArr });
    });
    return () => unsubscribe();
  }, []);

  // this function will update tasks in firebase and also update the redux store

  const updateTaskHandler = async (task) => {
    dispatch({ type: "todo/updateTodoList", payload: task.id });
    // console.log("task is",task.id);
    await updateDoc(doc(db, "todos", task.id), {
      completed: !task.completed,
    });
  };

  // this function will delete tasks from firebase and also update the redux store after deletion

  const deleteTaskHandler = async (task) => {
    dispatch({ type: "todo/removeTodoList", payload: task.id });
    await deleteDoc(doc(db, "todos", task.id));
  };

  return (
    <div className="bg-slate-800 w-full h-screen mx-auto fixed">
      <div className="w-full sm:w-1/2 mx-auto rounded-md bg-slate-600 md:mt-40">
        <div className="w-full flex justify-center items-center text-center">
          <h1 className="font-bold pt-7 text-2xl md:text-4xl text-white ">
            Todo App
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
            placeholder="Add Todo"
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
        <p className="text-white text-center flex justify-center items-center p-3 text-md sm:text-xl font-bold">{`You have ${newtask.length} todo in total`}</p>
      </div>
    </div>
  );
}

export default App;
