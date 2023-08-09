import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BASE_URL } from '../api/base';

const Todos = () => {

    const navigate = useNavigate();

    const [input, setInput] = useState('');
    const [todos, setTodos] = useState([]);
    const [token, setToken] = useState('')

    // 확인용 로그아웃 기능 구현
    const onClickLogout = () => {
        if(localStorage.getItem('signin-token')){
            localStorage.removeItem('signin-token');
            navigate('/')
        }else {
            alert('로그아웃된 상태입니다.')
        }
    }

    // todos 가져오기
    // const getTodos = async () => {
    //     const gotTodos = await axios.get(`${BASE_URL}/todos`, {
    //         headers : {
    //             Authorization : localStorage.getItem('signin-token')
    //         }
    //     })
    //     setTodos(gotTodos);
    // }

    // 로컬저장소에 토큰이 없으면 singin으로 이동
    useEffect(()=>{
        if(localStorage.getItem('signin-token')=== null){
            navigate('/signin');
        } else {
            // getTodos();
            // setToken(localStorage.getItem('signin-token'));
            // try{
            //     axios.get(`${BASE_URL}/todos`, {
            //         headers : {
            //             Authorization : token.toString
            //         }
            //     }).then((res)=>{
            //         setTodos(res)
            //     })
            // }catch(err){
            //     console.log(err)
            // }
        }
    },[])

    const onChange = (e) => {
        setInput(e.target.value);
    }

    const onSubmitTodo = async () => {
        await axios.post(`${BASE_URL}/todos`, {
            todo : input,
        }, {
            headers : `Bearer ${localStorage.getItem('signin-token')}`
        })
    }

    return (
        <div>
            <h1>ToDo</h1>
            <input type="text" onChange={onChange} value={input}/><button onClick={onSubmitTodo}>등록</button>
            <ul>
                {/* {
                    todos.map((todo, i) => {
                        <li>
                            <input type="checkbox" name="done" id="" checked={todo.isCompleted}/>{todo.todo}
                            <button>수정</button>
                            <button>삭제</button>
                        </li>
                    })
                } */}
            </ul>
            
            <hr/>
            <button onClick={onClickLogout}>logout</button><button><Link to='/'>홈으로</Link></button>
        </div>
    );
};

export default Todos;