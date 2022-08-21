import React, { useState, useEffect } from 'react';
import './App.css';
import TodoInput from './hooks/TodoInput';
import TodoTab from './components/TodoTab';
import TodoList from './hooks/TodoList';

const data = [{
  text: "把冰箱發霉的檸檬拿去丟",
  id: new Date().getTime(),
  status: false,
}];

function Todo() {
  const [todo, setTodo] = useState(data);
  const [status, setStatus] = useState("all");
  return (
    <div className="conatiner todoListPage vhContainer">
        <div className="todoList_Content">
            <TodoInput
              todo={todo}
              setTodo={setTodo}
            />
            <div className="todoList_list">
                <TodoTab
                  status={status}
                  setStatus={setStatus}
                />
                
                <TodoList
                    todo={todo}
                    setTodo={setTodo}
                    status={status}
                />
            </div>
        </div>
    </div>
  );
}

function App() {
  const htmlTag = <div id="todoListPage" className="bg-half">
    <nav>
        <h1><a href="#">ONLINE TODO LIST</a></h1>
    </nav>
    <Todo />
  </div>;

  return (
    htmlTag
  );
}

export default App;
