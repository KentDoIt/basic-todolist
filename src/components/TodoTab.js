import { useContext, useState } from 'react';
import { DataContext } from './DataContext';
import { TodoContext } from '../components/TodoContext';

const TodoTab = () => {
    const { setTabStatus } = useContext(DataContext);
    const { status, setStatus } = useContext(TodoContext);
    const tabData = [
        { title: "全部", status: "all" },
        { title: "待完成", status: "undone" },
        { title: "已完成", status: "done" },
    ];
    function handleTabClick(e) {
        // 透過 setStatus 來 re-render TodoList
        let retState = e.target.dataset.status;
        console.log("handleTabClick", retState);
        setStatus(retState);
        setTabStatus(retState);
    }
    return (
        <ul className="todoList_tab">
            {console.log("renderTab")}
            {tabData.map((item, index) => (
                <li key={index}>
                    <a href="#"
                        className={item.status === status ? "active" : ""}
                        data-status={item.status}
                        onClick={handleTabClick}
                    >{item.title}</a>
                </li>
            ))}
        </ul>
    );
}

export default TodoTab;