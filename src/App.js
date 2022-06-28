import React, { useState, useEffect } from 'react';
import './style.css';

function News() {
  const [counter, setCounter] = useState(0);
  const [todos, setTodos] = useState([]);
  const [todoID, setTodoID] = useState(1);
  const [todo, setTodo] = useState({});
  const [reloadCount, setReloadCount] = useState(0);
  const [needReload, setNeedReload] = useState(false);

  useEffect(() => {
    // setCounter((prevState) => prevState + 1);
    fetch('https://jsonplaceholder.typicode.com/todos')
      .then((response) => response.json())
      .then((json) => {
        setTodos(json);
        console.log('reloaded');
        setNeedReload(false);
      });
  }, [needReload]);

  useEffect(() => {
    console.log('state changed');
    fetch('https://jsonplaceholder.typicode.com/todos/' + todoID)
      .then((response) => response.json())
      .then((json) => {
        console.log('loaded');
        setTodo(json);
      });
  }, [todoID, reloadCount]);

  const clickHandle = (inc) => {
    const tmp = setCounter((prevState) => {
      let var1 = prevState + inc;
      console.log(inc, var1);
      return var1;
    });
  };

  useEffect(() => {
    console.log('reloaded');
  }, [reloadCount]);

  const clickHandle1 = () => {
    setNeedReload(true);
  };

  const clickHandle2 = () => {
    setTodoID((prevID) => prevID + 1);
  };

  const reloadHandle = () => {
    setReloadCount((prevCount) => prevCount + 1);
  };

  return (
    <>
      <h1>{counter}</h1>
      <button onClick={() => clickHandle(1)}>+</button>
      <button onClick={() => clickHandle(-1)}>-</button>
      <p></p>
      <div>
        <button onClick={() => clickHandle2()}>Next Todo</button>
        <ul>
          <li>{todo.id}</li>
          <li>{todo.title}</li>
          <li>{todo.completed ? 'Yes' : 'No'}</li>
        </ul>
        <button onClick={() => reloadHandle()}>Reload</button>
        <ul>
          {todos.map((todo) => (
            <li key={todo.id}>
              ({todo.id}) {todo.title}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

function Counter() {
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    const intervalID = setInterval(() => {
      console.log('tick');
      setCounter((prevCounter) => prevCounter + 1);
    }, 1000);

    return () => {
      clearInterval(intervalID);
    };
  }, []);
  return <h1>{counter}</h1>;
}

export default function App() {
  const [clicked, setClicked] = useState();
  const click = () => {
    setClicked((prevClicked) => !prevClicked);
  };
  return (
    <>
      <button onClick={click}>Toggle</button>
      {clicked ? <Counter /> : ''}
    </>
  );
}
