import React, { useEffect } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import Todo from "./Todo";
import { db } from "../firebase";
import {
  query,
  collection,
  onSnapshot,
  doc,
  updateDoc,
  addDoc,
  deleteDoc,
  setDoc,
} from "firebase/firestore";
import { useApp } from "../Contexts/AppContext";
import { useAuth } from "../Contexts/AuthContext";

const style = {
  bg: `p-4 bg-gradient-to-r from-[#2F80ED] to-[#1CB5E0]`,
  container: `bg-slate-100 max-w-[500px] w-full m-auto rounded-md shadow-xl p-4`,
  heading: `text-3xl font-bold text-center text-gray-800 p-2`,
  form: `flex justify-between`,
  input: `border p-2 w-full text-xl`,
  button: `border p-4 ml-2 bg-purple-500 text-slate-100`,
  count: `text-center p-2`,
};

function TodoDashboard() {
  const { todos, setTodos, todoInput, setTodoInput } = useApp();
  const {currentUser} = useAuth();

  // Create todo
  const createTodo = async (e) => {
    e.preventDefault();
    todoInput === null || todoInput === undefined || todoInput.length < 1
      ? alert("Please enter valid todo")
      :
     await addDoc(collection(db, `${currentUser.email.split('@')[0]}-TodoList`), {
          // addDoc creates doc with auto gen ID, even creates new collection if no there
          text: todoInput,
          completed: false,
        });
    // await setDoc(doc(db, "todoList", "12345678"), { // setDoc for specific ID for existing collection
    //   text: todoInput,
    //   completed: false,
    // });
    setTodoInput("");
  };

  // Read todo from firebase
  useEffect(() => {
    const q = query(collection(db, `${currentUser.email.split('@')[0]}-TodoList`));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let todosArr = [];
      querySnapshot.forEach((doc) => {
        todosArr.push({ ...doc.data(), id: doc.id });
      });
      setTodos(todosArr);
    });
    return () => unsubscribe();
  }, []);

  // Update todo
  const toggleComplete = async (todo) => {
    await updateDoc(doc(db, `${currentUser.email.split('@')[0]}-TodoList`, todo.id), {
      completed: !todo.completed,
    });
  };

  //delete todo
  const deleteTodo = async (docId) => {
    await deleteDoc(doc(db, `${currentUser.email.split('@')[0]}-TodoList`, docId));
  };

  return (
    <div className={style.bg}>
      <div className={style.container}>
        <h3 className={style.heading}>Todo List</h3>
        <form className={style.form} onSubmit={createTodo}>
          <input
            className={style.input}
            type="text"
            placeholder="Add Todo"
            value={todoInput}
            onChange={(e) => setTodoInput(e.target.value)}
          />
          <button className={style.button} type="submit">
            <AiOutlinePlus size={30} />
          </button>
        </form>
        <ul style={{padding:0}}>
          {todos.map((todo, index) => (
            <Todo
              key={index}
              todo={todo}
              toggleComplete={toggleComplete}
              deleteTodo={deleteTodo}
            />
          ))}
        </ul>
        {todos.length >= 1 ? (
          <p className={style.count}>{`You have ${todos.length} todos`}</p>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

export default TodoDashboard;
