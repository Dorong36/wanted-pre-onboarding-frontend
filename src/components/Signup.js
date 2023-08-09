import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { BASE_URL } from '../api/base';
import { Link, redirect, useNavigate } from 'react-router-dom';

const Signup = () => {

    const navigate = useNavigate();

    const [inputs, setInputs] = useState(
        {
            email : "",
            password : ""
        }
    );
    const [disabled, setDisabled] = useState(true);

    const { email, password } = inputs;

    const onChangeInput = (e) => {
        const { value, name } = e.target;
        setInputs({
            ...inputs,
            [name]: value
        });
    };

    // 로컬저장소에 토큰이 있으면 todos로 이동
    useEffect(()=>{
        if(localStorage.getItem('signin-token')!== null){
            navigate('/todos');
        }
    },[])
    
    useEffect(() => {
        if(email.indexOf("@")>=0 && password.length >= 8){
            setDisabled(false);
        }else {
            setDisabled(true);
        }
    }, [inputs])

    const onClickSubmit = async () => {
        try{
             await axios.post(`${BASE_URL}/auth/signup`, {
                email : inputs.email,
                password : inputs.password
            }).then((res) => {
                console.log(res);
                navigate('/signin');
            })
        }catch(err){
            alert(err);
        }
    }

    return (
        <div>
            <h1>회원가입</h1>
            E-mail : <input name="email" data-testid="email-input" onChange={onChangeInput} value={email}/><br/>
            Password : <input name="password" data-testid="password-input" onChange={onChangeInput} value={password}/><br/>
            <button data-testid="signup-button" onClick={onClickSubmit} disabled={disabled}>회원가입</button>
            <hr/>
            <Link to='/'>홈으로</Link>
        </div>
    );
};

export default Signup;