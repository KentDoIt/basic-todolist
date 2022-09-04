import React, { useRef } from 'react';
import './App.css';
import TodoInput from './hooks/TodoInput';
import TodoList from './hooks/TodoList';
import { DataContext } from './components/DataContext';
import { cloneDeep } from 'lodash';

const apiData = [{
  text: "把冰箱發霉的檸檬拿去丟",
  id: new Date().getTime(),
  status: false,
}];

// export const DataContext = React.createContext();

const Todo = () => {
  const dataContextValue = {
    setData,
    getData,
    addTodo,
    setTabStatus,
    getTabStatus,
  }

  let data = cloneDeep(apiData);
  let tabStatus = "all";
  const childRef = useRef();

  function setData(res) {
    data = res;
  }

  function setTabStatus(status) {
    tabStatus = status;
  }

  function getData() {
    return data;
  }

  function getTabStatus() {
    return tabStatus;
  }

  function addTodo(value) {
    // 全部、待完成 status 都是 false
    const ret = [...getData(), {
      text: value,
      id: new Date().getTime(),
      status: tabStatus == "done" ? true : false,
    }];
    console.log("addTodo", ret, tabStatus);
    setData(ret);
    // 父層觸發子層 set 方法
    childRef.current.changeTodo(ret)
  }

  return (
    <DataContext.Provider value={dataContextValue}>
      <div className="container todoListPage vhContainer">
        {console.log("renderApp")}
        <div className="todoList_Content">
          <TodoInput />
          <TodoList
            cRef={childRef}
          />
        </div>
      </div>
    </DataContext.Provider>
  );
}

function App() {
  return (
    <div id="todoListPage" className="bg-half">
      <nav>
        <h1><a href="#">ONLINE TODO LIST</a></h1>
      </nav>
      <Todo />
    </div>
  );
}

export default App;
