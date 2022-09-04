import { useState, useContext } from 'react';
import { DataContext } from '../components/DataContext';


function TodoInput() {
    const [todoInput, setTodoInput] = useState("");
    const { addTodo } = useContext(DataContext);
    function setTodo() {
        if (!todoInput) {
            return;
        }
        addTodo(todoInput);
        setTodoInput("");
    }
    return (
        <div className="inputBox">
            <input type="text" placeholder="請輸入待辦事項"
                value={todoInput}
                onChange={(e) => setTodoInput(e.target.value)}
            />
            <a href="#" onClick={setTodo}>
                <i className="fa fa-plus"></i>
            </a>
        </div>
    );
}

export default TodoInput;