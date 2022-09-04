import React, { useState, useImperativeHandle, useContext } from 'react';
import TodoItems from '../components/TodoItems';
import TodoTab from '../components/TodoTab';

import { DataContext } from '../components/DataContext';
import { TodoContext } from '../components/TodoContext';

const TodoList = ({ cRef }) => {
  const { getData, setData, getTabStatus } = useContext(DataContext);
  const [todo, setTodo] = useState(getData());
  const [status, setStatus] = useState(getTabStatus());

  const todoContextValue = {
    setTodo,
    todo,
    filterData,
    status, setStatus
  };

  // 父層觸發子層 set 方法
  useImperativeHandle(cRef, () => ({
    changeTodo: (resTodo) => {
      console.log("changeTodo", resTodo);
      setTodo(resTodo);
    }
  }));

  function filterData() {
    console.log("filterData", todo)
    const type = getTabStatus();
    const ret = type === "all" ? getData() : getData().filter(item => type === "done" ? item.status : !item.status);
    console.log("filterData", ret)
    return ret;
  }

  function delTodo(id) {
    const ret = getData().filter(item => item.id !== id);
    console.log(ret, id);
    setData(ret);  // 更新外層 data
    setTodo(filterData());  // 觸發 re-render
  }

  function delAllTodo() {
    if (filterData().length == 0) {
      return;
    }
    const ret = getTabStatus() === "all" ? [] : getData().filter(item => getTabStatus() === "done" ? !item.status : item.status);
    setTodo([]);  // 觸發 re-render
    setData(ret);  // 更新外層 data
  }

  return (
    <TodoContext.Provider value={todoContextValue}>
      <div className="todoList_list">
        {console.log("renderList", getData(), todo)}
        <TodoTab />
        <div className="todoList_items">
          {console.log("renderItems")}
          <TodoItems todo={filterData()} delTodo={delTodo} delAllTodo={delAllTodo} />
        </div>
      </div>
    </TodoContext.Provider>

  );
};

// export default React.forwardRef(TodoList);
export default TodoList;