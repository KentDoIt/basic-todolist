import React, { useState, useEffect } from 'react';
import TodoItem from './TodoItem';
import TodoStats from '../components/TodoStats';

function TodoList({ todo, setTodo, status }) {
    const [filterData, setFilterData] = useState([]);
  
    useEffect(()=> {
      console.log("useEffect");
      setFilterData(status === "all" ? todo : todo.filter( item => status === "done" ? item.status : !item.status));
    }, [todo, status]);
    
    function delAllTodo() {
      setTodo(status === "all" ? [] : todo.filter(item => status === "done" ? !item.status : item.status));
    }
  
    return (
      <div className="todoList_items">
        {console.log("renderTodoList")}
        <TodoItem todo={filterData} setTodo={setTodo}/>
        <TodoStats todo={filterData} status={status} delAllTodo={delAllTodo}/>
      </div>
    );
}
export default TodoList;