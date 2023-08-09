import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom';
import { BASE_URL } from '../api/base';

const Signin = () => {

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

    // https://www.pre-onboarding-selection-task.shop/auth/signin


    const onClickSubmit = async () => {
        try{
             await axios.post( `${BASE_URL}/auth/signin`, {
                email : inputs.email,
                password : inputs.password
            }).then((res) => {
                if (res.data.access_token) {
                    localStorage.setItem('signin-token', res.data.access_token);
                    // 토큰 로컬에 저장 잘 되는지 확인
                    console.log(localStorage.getItem('signin-token'));
                    navigate('/todos')
                }else {
                    console.log("error!!");
                }
                
            })
        }catch(err){
            alert(err, BASE_URL);
        }
    }

    return (
        <div>
            <h1>로그인</h1>
            E-mail : <input name="email" data-testid="email-input" onChange={onChangeInput} value={email}/><br/>
            Password : <input name="password" data-testid="password-input" onChange={onChangeInput} value={password}/><br/>
            <button data-testid="signup-button" onClick={onClickSubmit} disabled={disabled}>로그인</button>
            <hr/>
            <Link to='/'>홈으로</Link>
        </div>
    );
};

export default Signin;