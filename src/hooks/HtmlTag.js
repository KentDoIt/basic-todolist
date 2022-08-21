import React, { useState } from 'react';

export default function HtmlTag() {
    const [todoInput, setTodoInput] = useState("");
    const [todo, setTodo] = useState([tempObj]);
    
    function addTodo() {
        const res = {
        text: todoInput,
        id: new Date().getTime(),
        status: false,
        };
        setTodo([...todo, res]);
        setTodoInput('');
    }
    return (
        <div id="todoListPage" className="bg-half">
            <nav>
                <h1><a href="#">ONLINE TODO LIST</a></h1>
            </nav>
            <div className="conatiner todoListPage vhContainer">
                <div className="todoList_Content">
                    <div className="inputBox">
                        <input type="text" placeholder="請輸入待辦事項" 
                        value={todoInput} 
                        onChange={(e) => setTodoInput(e.target.value)}
                        />
                        <a href="#" onClick={ addTodo }>
                        <i className="fa fa-plus"></i>
                        </a>
                    </div>
                    <div className="todoList_list">
                        <ul className="todoList_tab">
                            <li><a href="#" className="active">全部</a></li>
                            <li><a href="#">待完成</a></li>
                            <li><a href="#">已完成</a></li>
                        </ul>
                        <div className="todoList_items">
                            <ul className="todoList_item">
                            {todo.map((item) => (
                                <Child
                                key={item.id}
                                data={item}
                                status={item.status}
                                todoList={todo}
                                setTodoList={setTodo}
                                />
                            ))}
                            </ul>
                            <div className="todoList_statistics">
                                <p> {todo.length} 個已完成項目</p>
                                <a href="#">清除已完成項目</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </div>
    );
};