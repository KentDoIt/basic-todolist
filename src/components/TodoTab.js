const TodoTab = ({ status, setStatus }) => {
    const tabData = [
        { title: "全部", status: "all" },
        { title: "待完成", status: "undone" },
        { title: "已完成", status: "done" },
    ];
    return (
        <ul className="todoList_tab">
            {tabData.map((item, index) => (
                <li key={index}>
                    <a href="#"
                        className={item.status === status ? "active" : ""}
                        data-status={item.status}
                        onClick={e => setStatus(e.target.dataset.status)}
                    >{item.title}</a>
                </li>
            ))}
        </ul>
    );
}

export default TodoTab;