import React, { useState } from 'react';
import './App.css';
import TodoInput from './hooks/TodoInput';
import TodoTab from './components/TodoTab';
import TodoList from './hooks/TodoList';
import { cloneDeep } from 'lodash';

const apiData = [{
  text: "把冰箱發霉的檸檬拿去丟",
  id: new Date().getTime(),
  status: false,
}];

function Todo() {
  // const [todo, setTodo] = useState(apiData);
  let todo = cloneDeep(apiData);
  const [status, setStatus] = useState("all");

  // for 子層更新資料，不使用 useState 是避免整個畫面重新渲染
  function setData(res) {
    // console.log(res);
    // setTodo(res);
    todo = res;
    console.log(todo);
  }

  return (
    <div className="container todoListPage vhContainer">
      {console.log("renderApp", todo)}
      <div className="todoList_Content">
        <TodoInput
          todo={todo}
          setData={setData}
        />
        <div className="todoList_list">
          <TodoTab
            status={status}
            setStatus={setStatus}
          />

          <TodoList
            data={todo}
            setData={setData}
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
