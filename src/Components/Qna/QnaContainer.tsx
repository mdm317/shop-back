import React, { useEffect,useState } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../Redux/index';
import { Qna } from '../../Model/db';
import { toast } from 'react-toastify';
import QnaLine from './QnaLine';
import { getPrdQueList } from '../../Redux/Product/thunk';


const QnaBox = styled.div`

`;
const QnaHeader = styled.div`
    padding-top:20px;
    margin-top:40px;
  
`;
const Button = styled.button`
    margin-top:10px;
    margin-bottom:10px;
`;
const QnaList = styled.div`
`;
const TextMedium = styled.div`
    padding: 0 auto;
    width:100px;
    font-size:1.5rem;
`;
const TextStrong = styled.div`
    padding: 0 auto;
    font-size:2rem;
    font-weight:700;
    width:500px;
`;
const QnaListTop = styled.div`
    display:flex;
    border-bottom: solid 1px lightgray;
    border-top : solid 1px black;
    padding: 20px 0;
    p{
        text-align: center;
        padding:0 auto;
        width:100px;
        :nth-child(2){
            width:700px;
        }
    };

`;

export default ({productId, qnaList}:{productId:string, qnaList:Qna[]})=>{//props 에 productID 와 qna 목록이 필요
    const user = useSelector((state:RootState) => state.user.user);
    const [popupClosed, setpopupClosed] = useState(false);
    const dispatch = useDispatch();
    useEffect(() => {
        if(popupClosed){
            dispatch(getPrdQueList(productId));
            setpopupClosed(false);
        }
    }, [popupClosed]);
    const isAdmin = user?user.isAdmin:false;

    if(qnaList===undefined){
        qnaList=[];
    }
    const clickQuestion = ()=>{

    }
    const clickAddQna =(e: React.MouseEvent<HTMLButtonElement, MouseEvent>)=>{
        if(!user){
            toast.error('you need to login');
            return;
        }
        if(productId){
            const a= window.open(`/qnaform/${productId}`,"PopupWin","width=500,height=600");
            const interval = setInterval(()=>{
            if(a?.closed){
                setpopupClosed(true);
                clearInterval(interval);
            }
            },1000);
        }
    }

    return (
        <QnaBox>
            <QnaHeader>
                <TextStrong>{"Q&A"}</TextStrong>
                {!isAdmin &&
                    <Button onClick={clickAddQna}>qna 작성하기</Button>
                }
            </QnaHeader>
            <QnaListTop>
                <p>답변상태</p>
                <p>내용</p>
                <p>작성자</p>
                <p>작성일</p>
            </QnaListTop>
            <QnaList>
            {
             
                qnaList.map((qna)=>{
                    if(qna.question){
                        return
                    }
                    return (
                        <QnaLine
                            key={qna.id}
                            qna={qna}
                            pid={productId}
                        />
                    )   
                    //작성자 답변상태 필요 qna 수정 해야함
                    //현재 db참고
                })
            }
            </QnaList>
        </QnaBox>
    );
}