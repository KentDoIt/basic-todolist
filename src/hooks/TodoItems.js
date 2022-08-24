import React, { useState, useEffect } from 'react';
import { clone, cloneDeep } from 'lodash';

function TodoItem({ todos, item, setData }) {
  const [todo, setTodo] = useState(todos);

  function setState(id) {
    console.log(item)
    item.status = !item.status;

    const ret = cloneDeep(todo);
    // const index = ret.findIndex(item => item.id === id);
    // ret[index].status = !ret[index].status;
    setTodo(ret);

    console.log(ret, todo);
    setData(todo);
  }

  function delTodo(id) {
    setTodo(todo.filter(item => item.id !== id));
  }
  return (
    <li key={item.id}>
      {console.log("renderTodoItem")}
      <label className="todoList_label">
        <input className="todoList_input" type="checkbox" value="true"
          checked={item.status}
          onChange={() => {
            setState(item.id);
          }}
        />
        <span>{item.text}</span>
      </label>
      <a href="#" onClick={() => { delTodo(item.id) }}>
        <i className="fa fa-times"></i>
      </a>
    </li>
  );
}

function TodoItems({ data, status, setData }) {
  // const [todo, setTodo] = useState(data);

  let todo = cloneDeep(data());

  function setTodo(res) {
    console.log("setTodo", res);
    todo = res;
    console.log("setTodo", todo);
  }

  // 更新父層資料到 todo 上，避免
  useEffect(() => {
    console.log("useEffectItem");
    setTodo(data)
  }, [data]);

  return (
    <ul className="todoList_item">
      {console.log("renderTodoItems")}
      {todo.map((item) => (
        <TodoItem todos={todo} item={item} key={item.id} setData={setData} />
        // <TodoItem todo={todo} setTodo={setTodo} item={item} key={item.id} setData={setData} />
      ))}
    </ul>
  );
}

export default TodoItems;