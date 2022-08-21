import React, { useState } from 'react';
import { clone, cloneDeep } from 'lodash';

function TodoItem({todo, setTodo}) {
    function setState(id) {
      const ret = cloneDeep(todo);
      const index = ret.findIndex(item => item.id === id);
      ret[index].status = !ret[index].status;
      setTodo(ret);
    }
    
    function delTodo(id) {
      setTodo(todo.filter(item => item.id !== id));
    }
    
    return (
      <ul className="todoList_item">
        {console.log("renderTodoItem")}
        {todo.map((item) => (
          <li key={item.id}>
              <label className="todoList_label">
                  <input className="todoList_input" type="checkbox" value="true" 
                    checked={item.status} 
                    onChange={() => {
                      setState(item.id);
                    }}
                  />
                  <span>{ item.text }</span>
              </label>
              <a href="#" onClick={() => {delTodo(item.id)}}>
                  <i className="fa fa-times"></i>
              </a>
          </li>
        ))}
      </ul>
    );
}

export default TodoItem;