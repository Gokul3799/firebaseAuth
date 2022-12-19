import React from "react";
import { FaRegTrashAlt } from "react-icons/fa";

const style = {
  li: `flex justify-between bg-slate-200 mt-4 capitalize`,
  liComplete: `flex justify-between bg-slate-400 p-4 mt-4 capitalize`,
  row: `flex`,
  text: `ml-2 cursor-pointer mb-0`,
  textComplete: `ml-2 cursor-pointer line-through mb-0`,
  button: `cursor-pointer flex items-center`,
};

const Todo = ({ todo, toggleComplete, deleteTodo }) => {
  return (
    <li className={todo.comleted ? style.li : style.liComplete}>
      <div className={style.row}>
        <input
          type="checkbox"
          checked={todo.completed ? true : false}
          onChange={() => toggleComplete(todo)}
        />
        <p
          onClick={() => toggleComplete(todo)}
          className={!todo.completed ? style.text : style.textComplete}
        >
          {todo.text}
        </p>
      </div>
      <button onClick={() => deleteTodo(todo.id)}>{<FaRegTrashAlt />}</button>
    </li>
  );
};

export default Todo;
