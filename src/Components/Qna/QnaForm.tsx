import React from 'react';
import styled from 'styled-components';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addQuestion } from '../../Redux/Product/thunk';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { RootState } from '../../Redux/index';
import ModalTop from '../ModalTop';
import { toast } from 'react-toastify';

const Container = styled.div`
    display:flex;
    flex-direction:column;
    align-items:center;
`;

const Header = styled.div`
    width:100%;
    height:100px;

    color:black;
    font-size:3rem;
    text-align:center;
    padding-top:35px;
    margin-bottom:20px;
`;

const TextContainer = styled.div`
    position:relative;
    width:400px;
    height:300px;
    margin-bottom:20px;
`;
const TextArea = styled.textarea`
    width:100%;
    height:100%;
    resize:none;
`;
const LimitLabel = styled.div`
    position:absolute;
    right:0;
`;
const WhiteBox = styled.div`
    display:flex;
    flex-direction:column;
    align-items:center;
    width:300px;
    height:100px;
    margin: 10 auto;
    padding-top:10px;
    position:relative;
    border-radius:5px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    p{
        text-align:center;
    }
`;
const Button = styled.button`
    margin-top:15px;
    width:50px;
    height:25px;
    background-color:blue;
    color:white;
    border :0px;
    border-radius:3px;
`;
const maxLength = 100;
interface MatchParams {
    productId:string
}
const QnaForm: React.SFC<RouteComponentProps<MatchParams>> = ({match})=>{
    const [isSubmit, setisSubmit] = useState(false);
    const {params:{productId}} = match;
    const addQuestionErr = useSelector((state:RootState) => state.product.error.addQuestion);
    const [textarea, settextarea] = useState("");
 
    const onTextarea = (e:React.ChangeEvent<HTMLTextAreaElement>)=>{
        settextarea(e.target.value);
    }
    const dispatch = useDispatch();
    const clickQnaBtn = async(e:React.MouseEvent<HTMLButtonElement, MouseEvent>)=>{
        if(!textarea.trim()){
            toast.error('내용을 입력하세요');
            return;
        }
        await dispatch(addQuestion({content:textarea, productId}));
        setisSubmit(true);
    }

    if(isSubmit){
        if(addQuestionErr===null){
            return (
                <ModalTop message={"등록 성공"}/>
            );
        }else{
            return (
                <ModalTop message={"등록 실패"}/>
            );
        }

    }
    return(
        <Container>
            <Header>질문을 작성하세요</Header>

            <TextContainer>
                <TextArea  maxLength={maxLength} value={textarea} onChange={onTextarea} />
                <LimitLabel>{textarea.length}/{maxLength} </LimitLabel>
            </TextContainer>
    

            <button onClick={clickQnaBtn}>등록</button>
        </Container>
    );
}
export default withRouter(QnaForm);