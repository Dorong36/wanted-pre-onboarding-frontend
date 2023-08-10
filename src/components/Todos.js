import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BASE_URL } from '../api/base';

const Todos = () => {

    const navigate = useNavigate();
    const token = localStorage.getItem('signin-token');

    const [input, setInput] = useState('');
    const [todos, setTodos] = useState([]);

    // 확인용 로그아웃 기능 구현
    const onClickLogout = () => {
        if(localStorage.getItem('signin-token')){
            localStorage.removeItem('signin-token');
            navigate('/')
        }else {
            alert('로그아웃된 상태입니다.')
        }
    }

    // 로컬저장소에 토큰이 없으면 singin으로 이동
    useEffect(()=>{
        if(localStorage.getItem('signin-token')=== null){
            navigate('/signin');
        } else {
            getTodos();
        }
    },[])

    const onChangeInput = (e) => {
        setInput(e.target.value);
    }

    // todos 가져오기
    const getTodos = async () => {
        try{
            const gotTodos = await axios.get(`${BASE_URL}/todos`, {
                headers : {
                    Authorization : `Bearer ${token}`
                }
            })
            setTodos(gotTodos.data);
            console.log(todos);
        }catch(err) {
            console.log(err);
        }
    }

    // 할일 등록
    const onSubmitTodo = async () => {
        try{
            await axios.post(`${BASE_URL}/todos`, 
                {
                    todo : input,
                }, 
                {
                    // 이 한 줄을 위해 얼마나 오류를 많이 겪었는지,,, 눙물이,,
                    headers : {Authorization : `Bearer ${token}`}
                }
            ).then(
                (res) => {
                    console.log(res);
                    setInput('');
                    getTodos();
                }
            )
        }catch(err){
            console.log(err)
        }
    }

    // 할일 수정


    // 할일 삭제
    const onDeleteTodo = async (e) => {
        try{
            await axios.delete(`${BASE_URL}/todos/${e.target.name}`,
                {
                    headers : {Authorization : `Bearer ${token}`}
                }
            ).then(
                (res) => {
                    console.log(res);
                    getTodos();
                }
            )
        }catch(err){
            console.log(err);
        }
    }

    return (
        <div>
            <h1>ToDo</h1>
            <input type="text" onChange={onChangeInput} value={input}/><button onClick={onSubmitTodo}>등록</button>
            <ul>
                {
                    todos.map((todo) => (
                        <li key={todo.id}>
                            <input type="checkbox" name="done" id="" checked={todo.isCompleted}/>
                            {todo.todo}
                            <button name={todo.id}>수정</button>
                            <button onClick={onDeleteTodo} name={todo.id}>삭제</button>
                        </li>
                    ))
                }
            </ul>
            
            <hr/>
            <button onClick={onClickLogout}>logout</button><button><Link to='/'>홈으로</Link></button>
        </div>
    );
};

export default Todos;