function TodoStats({todo, status, delAllTodo}) {
    const tabMapping = {
      "all": "全部",
      "undone": "待完成",
      "done": "已完成",
    };
  
    return (
      <div className="todoList_statistics">
          <p> {status === "all" ? "全部 " : ""}{todo.length} 個{status === "all" ? "" : tabMapping[status]}項目</p>
          <a href="#" onClick={delAllTodo}>清除{tabMapping[status]}項目</a>
      </div>
    );
}
export default TodoStats;  