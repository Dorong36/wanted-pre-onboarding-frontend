import React from 'react';
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const Box = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-top: 2rem;
    margin-left: 2rem;
`

const Main = () => {
    return (
        <div>
            <Box>
                <button><Link to='/signin'>로그인</Link><br/></button>
                <button><Link to='/signup'>회원가입</Link><br/></button>
                <button><Link to='/todos'>할일</Link></button>
            </Box>
           
        </div>
    );
};

export default Main;