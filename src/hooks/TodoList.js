import React, { useState, useEffect } from 'react';
import TodoItems from './TodoItems';
import TodoStats from '../components/TodoStats';
import { clone, cloneDeep } from 'lodash';

function TodoList({ data, status, setData }) {
  // const [filterData, setFilterData] = useState([]);
  // const [todo, setTodo] = useState(data);
  let todo = cloneDeep(data);

  function setTodo(res) {
    console.log("setTodo", res);
    todo = res;
    setData(res);
  }

  function filterData() {
    // const ret = status === "all" ? todo : todo.filter(item => status === "done" ? item.status : !item.status);
    const ret = status === "all" ? data : data.filter(item => status === "done" ? item.status : !item.status);
    return ret;
  }

  function delAllTodo() {
    // 更新父元件
    // setData(status === "all" ? [] : data.filter(item => status === "done" ? !item.status : item.status));
    setData(status === "all" ? [] : todo.filter(item => status === "done" ? !item.status : item.status));
  }

  return (
    <div className="todoList_items">
      {console.log("renderTodoList", data, filterData)}
      <TodoItems data={filterData} status={status} setData={setTodo} />
      <TodoStats todo={filterData} status={status} delAllTodo={delAllTodo} />
    </div>
  );
}
export default TodoList;