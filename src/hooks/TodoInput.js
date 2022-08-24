import React, { useState } from 'react';

function TodoInput({ todo, setData }) {
    const [todoInput, setTodoInput] = useState("");
    function addTodo() {
        console.log("addTodo")
        if (!todoInput) {
            return;
        }
        const res = {
            text: todoInput,
            id: new Date().getTime(),
            status: false,
        };
        setData([...todo, res]);
        setTodoInput("");
    }
    return (
        <div className="inputBox">
            <input type="text" placeholder="請輸入待辦事項"
                value={todoInput}
                onChange={(e) => setTodoInput(e.target.value)}
            />
            <a href="#" onClick={addTodo}>
                <i className="fa fa-plus"></i>
            </a>
        </div>
    );
}

export default TodoInput;