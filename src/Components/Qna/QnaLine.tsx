import React, { useEffect } from 'react';
import { Qna } from '../../Model/db';
import { RootState } from '../../Redux/index';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { getAllQuestion } from '../../Redux/Admin/thunk';
import { getPrdQueList } from '../../Redux/Product/thunk';

const QuestionItem = styled.div`
    display:flex;
    margin-top:5px;
    align-items:center;
    :first-child{
        margin-top:15px;
    }
    p{
        padding:0 auto;
        width:10%;
        text-align:center;
        :nth-child(2){
            cursor: pointer;
            margin-left:10%;
            width:70%;
            text-align:left
        }
    };
`;
const AnswerItem = styled.div`
    margin-top:5px;
    padding:10px;
    background-color:lightgray;
    p{
        margin-left:5%;
    }
    
`;
interface props extends RouteComponentProps{
    qna:Qna;
}
export default ({qna,pid}:{qna:Qna,pid:string})=>{
    const dispatch = useDispatch();

    const [popupClosed, setpopupClosed] = useState(false);
    useEffect(() => {
            if(popupClosed){
                dispatch(getPrdQueList(pid));
                // window.location.reload(false);
                // setpopupClosed(false);
            }
    }, [popupClosed]);
    // popup 감지
    const [visibleAnswer, setvisibleAnswer] = useState(false);
    const user = useSelector((state:RootState) => state.user.user);
    const isAdmin = user?user.isAdmin:false;
    let newUserId = qna.user.userId.slice(0,4);
    newUserId += "****";
    const clickAddAnswer = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>)=>{
        const popup = window.open(`/answerform/${qna.id}`,"PopupWin","width=500,height=600");
        const interval = setInterval(()=>{
            if(popup?.closed){
                setpopupClosed(true);
                clearInterval(interval);
            }
        },1000);
    }

    const clickContent = (e: React.MouseEvent<HTMLParagraphElement, MouseEvent>)=>{
        setvisibleAnswer(!visibleAnswer);
    }
    const clickGoProduct = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>)=>{

    }
    return(
        <>
        <QuestionItem>
            {isAdmin?
                <p>{qna.answer?"답변완료":<button id={qna.id} onClick={clickAddAnswer}>답변하기</button>}</p>
                :
                <p>{qna.answer?"답변완료":"답변대기"}</p>
            }          
            <p  onClick={clickContent}>{qna.content}</p>
            <p>{newUserId}</p>
            <p>{qna.createdAt.slice(0,10)}</p>
        </QuestionItem>
        {qna.answer && visibleAnswer &&
        <AnswerItem>
            <p>▶{qna.answer.content}</p>
        </AnswerItem>
        }
        
        </>

    )
}