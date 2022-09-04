import { useContext } from 'react';
import { clone, cloneDeep } from 'lodash';
import { DataContext } from './DataContext';
import TodoStats from './TodoStats';
import { TodoContext } from './TodoContext';

function TodoItems({ todo, delTodo, delAllTodo }) {
  const { setData, getData } = useContext(DataContext);
  const { setTodo, filterData } = useContext(TodoContext);

  function setState(id) {
    const ret = cloneDeep(getData());
    const retIndex = ret.findIndex(obj => obj.id === id);
    ret[retIndex].status = !ret[retIndex].status;
    setData(ret);
    setTodo(filterData());
  }

  return (
    /**
     * todo 參數會傳入 filter 過後的 todo。
     * 這邊不適合再將 li 拆為元件，雖然拆出去可以讓 check 時不會全部 re-render，但 tab 在 '待完成'、'已完成' 時就會出現 bug todo 沒有消失。
     */
    <>
      <ul className="todoList_item">
        {console.log("renderTodoItems", todo)}
        {todo.map((item) => (
          <li key={item.id}>
            {console.log("renderTodoItem", getData(), todo)}
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
        ))}
      </ul>
      <TodoStats todoLength={todo.length} delAllTodo={delAllTodo} />
    </>
  );
}

export default TodoItems;