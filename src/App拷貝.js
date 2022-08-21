import React, { useState, useEffect } from 'react';
import './App.css';

import { clone, cloneDeep } from 'lodash';


const data = [{
  text: "把冰箱發霉的檸檬拿去丟",
  id: new Date().getTime(),
  status: false,
}];

const TodoTab = ({status, setStatus}) => {
  const tabData = [
    {title: "全部", status: "all"},
    {title: "待完成", status: "undone"},
    {title: "已完成", status: "done"},
  ];
  return (
    <ul className="todoList_tab">
      {tabData.map( (item, index) => (
        <li key={index}>
          <a href="#" 
            className={item.status === status ? "active" : ""}
            data-status={item.status}
            onClick={ e => setStatus(e.target.dataset.status) }
          >{item.title}</a>
        </li>
      ))}
    </ul>
  );
}

function TodoList({ todo, setTodo, status }) {
  // const { text, id , status} = props.data;
  // const { status} = props.status;

  function delTodo(id) {
    setTodo(todo.filter(item => item.id !== id));
  }
  
  function changeState(id) {
    // 淺拷貝
    // const ret = [...todo];
    // const ret = clone(todo);
    // 深拷貝
    const ret = cloneDeep(todo);
    const index = ret.findIndex(item => item.id === id);
    ret[index].status = !ret[index].status;
    setTodo(ret);
  }

  function getTodo() {
    console.log("getTodo");
    return todo.filter( item => {
      if (status === "done") {
        return item.status === true;
      } else if (status === "undone") {
        return item.status === false;
      } else {
        return true
      }
    })
  }

  return (
    <ul className="todoList_item">
      {getTodo().map((item) => (
        <li key={item.id}>
            <label className="todoList_label">
                <input className="todoList_input" type="checkbox" value="true" 
                  checked={item.status} 
                  onChange={() => {
                    changeState(item.id);
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

// function TodoItem() {
//   return (
    
//   );
// }

function App() {
  const [todoInput, setTodoInput] = useState("");
  const [todo, setTodo] = useState(data);
  const [status, setStatus] = useState("all");
  
  useEffect(()=> {
    console.log("useEffect");
    
  }, [todo, status]);

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
    setTodo([...todo, res]);
    setTodoInput("");
  }

  function delAllTodo() {
    setTodo(todo.filter(item => item.status === false));
  }

  // function todoFilter() {
  //   console.log('todoFilter')
  //   return todo.filter( item => {
  //     if (status === "done") {
  //       return item.status === true;
  //     } else if (status === "undone") {
  //       return item.status === false;
  //     } else {
  //       return true
  //     }
  //   })
  // }

  const htmlTag = <div id="todoListPage" className="bg-half">
    <nav>
        <h1><a href="#">ONLINE TODO LIST</a></h1>
    </nav>
    <div className="conatiner todoListPage vhContainer">
        <div className="todoList_Content">
          <TodoList />
            {/* <div className="inputBox">
                <input type="text" placeholder="請輸入待辦事項" 
                  value={todoInput} 
                  onChange={(e) => setTodoInput(e.target.value)}
                />
                <a href="#" onClick={ addTodo }>
                <i className="fa fa-plus"></i>
                </a>
            </div>
            <div className="todoList_list">
                <TodoTab
                  status={status}
                  setStatus={setStatus}
                />
                <div className="todoList_items">
                    <TodoList
                        todo={todo}
                        setTodo={setTodo}
                        status={status}
                    />
                    {/* <ul className="todoList_item">
                      {todo.map((item) => {
                        console.log("filter");
                        (
                          <TodoList
                            key={item.id}
                            data={item}
                            status={item.status}
                            todo={todo}
                            setTodo={setTodo}
                          />
                      )})}
                    </ul> */}
                    <div className="todoList_statistics">
                        <p> {todo.filter( item => item.status == true).length} 個已完成項目</p>
                        <a href="#" onClick={delAllTodo}>清除已完成項目</a>
                    </div>
                </div>
            </div> */}
        </div>
    </div>
  </div>;

  return (
    htmlTag
  );

  // return (
  //   <div id="todoListPage" className="bg-half">
  //     <nav>
  //       <h1><a href="#">ONLINE TODO LIST</a></h1>
  //     </nav>
  //     <div className="conatiner todoListPage vhContainer">
  //       <div className="todoList_Content">
  //           <div className="inputBox">
  //               <input type="text" placeholder="請輸入待辦事項" 
  //                 value={todoInput} 
  //                 onChange={(e) => setTodoInput(e.target.value)}
  //               />
  //               <a href="#" onClick={ addTodo }>
  //                 <i className="fa fa-plus"></i>
  //               </a>
  //           </div>
  //           <div className="todoList_list">
  //               <ul className="todoList_tab">
  //                   <li><a href="#" className="active">全部</a></li>
  //                   <li><a href="#">待完成</a></li>
  //                   <li><a href="#">已完成</a></li>
  //               </ul>
  //               <div className="todoList_items">
  //                   <ul className="todoList_item">
  //                     {todo.map((item) => (
  //                       <TodoList
  //                         key={item.id}
  //                         data={item}
  //                         status={item.status}
  //                         todoList={todo}
  //                         setTodo={setTodo}
  //                       />
  //                     ))}
  //                   </ul>
  //                   <div className="todoList_statistics">
  //                       <p> {todo.length} 個已完成項目</p>
  //                       <a href="#">清除已完成項目</a>
  //                   </div>
  //               </div>
  //           </div>
  //       </div>
  //     </div>
  //   </div>
  // );
}

export default App;
