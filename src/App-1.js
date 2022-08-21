import React, { useState, useEffect } from 'react';
import './App.css';

const Nav = () => {
  return (
    <nav>
      <h1><a href="#">ONLINE TODO LIST</a></h1>
   </nav>
  )
}

const TodoList_Input = ({clickEvent}) => {
  const [todo, setTodo] = useState('');
  const add = async() => {
    await clickEvent(todo);
    await setTodo('');
  }
  return (
    <div className="inputBox">
        <input type="text" placeholder="請輸入待辦事項" value={todo} onInput={(e) => setTodo(e.target.value)} />
        <a href="#" onClick={add}><i className="fa fa-plus"></i></a>
    </div>
  )
}

const TodoList_Tabs = ({status, setTabStatus}) => {
  const tabs = [
    {name: '全部', status:'all'},
    {name: '待完成', status:'todo'},
    {name: '已完成', status:'done'}
  ]
  return (
    <ul className="todoList_tab">
      {tabs.map((item, index) => (<li key={'todoList_'+ index}><a className={ item.status === status ? 'active' : '' } href="#" data-status={item.status} onClick={(e)=> setTabStatus(e.target.dataset.status)}>{item.name}</a></li>))}
    </ul>
  )
}

const TodoList_Items = ({data, setData}) => {
  const updateItem = (index) => {
    const newData = Object.assign([],data);
    newData[index].done = !newData[index].done;
    setData(newData);
  }
  const removeItem = (index) => {
    const newData = Object.assign([],data);
    newData.splice(index, 1);
    setData(newData);
  }
  const filterList = () => {
    console.log("filterList");
    return (
    data.map((item, index) => (
        <li key={item.id}>
            <label className="todoList_label">
                <input className="todoList_input" type="checkbox" checked={item.done} onChange={()=> updateItem(index)} />
                <span>{item.title}</span>
            </label>
            <a href="#" onClick={() => removeItem(index)}><i className="fa fa-times"></i></a>
        </li>
    )));
  }
  return (
    <ul className="todoList_item">
     {
        filterList()
        // data.map((item, index) => (
        //   <li key={item.id}>
        //       <label className="todoList_label">
        //           <input className="todoList_input" type="checkbox" checked={item.done} onChange={()=> updateItem(index)} />
        //           <span>{item.title}</span>
        //       </label>
        //       <a href="#" onClick={() => removeItem(index)}><i className="fa fa-times"></i></a>
        //   </li>
        // ))
      }
     </ul>
  )
}

const TodoList_Content = ({data, tabStatus, setData}) => {
  const [doneLength, setDoneLength] = useState(0);
  const [filterData, setFilterData] = useState([]);
  useEffect(()=> {
    //  setDoneLength(data.filter(item => item.done).length);
     setFilterData(tabStatus === 'all' ? data : data.filter(item => tabStatus === 'done' ? item.done : !item.done));
  }, [data, tabStatus]);
  
  const removeDoneData = () => setData(data.filter(item => !item.done))
  
  return (
     <div className="todoList_items">
        <TodoList_Items data={filterData} setData={setData} />
        { tabStatus === 'all' ? <div className="todoList_statistics">
            <p> {data.filter(item => item.done).length} 個已完成項目</p>
            <a href="#" onClick={removeDoneData}>清除已完成項目</a>
        </div> : '' }
     </div>
  )
}

const TodoList = () => {
  const [data, setData] = useState([
    {id:1, title: '把冰箱發霉的檸檬拿去丟', done: false},
    {id:2, title: '打電話叫媽媽匯款給我', done: false},
    {id:3, title: '整理電腦資料夾', done: true},
  ]);
  const [tabStatus, setTabStatus] = useState('all');
  const addData = (value) => setData([ { id: data.length + 1, title: value, done: false }, ...data])
  
  return (
    <div className="conatiner todoListPage vhContainer">
        <div className="todoList_Content">
            <TodoList_Input clickEvent={addData} />
            <div className="todoList_list">
                <TodoList_Tabs status={tabStatus} setTabStatus={setTabStatus} />
                <TodoList_Content data={data} tabStatus={tabStatus} setData={setData} />
            </div>
        </div>
    </div>
  )
}

const App = () => {
  return (
    <div id="todoListPage" className="bg-half">
      <Nav/>
      <TodoList/>
    </div>
  )
}

export default App;