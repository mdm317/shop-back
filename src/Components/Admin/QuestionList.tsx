import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { getQuestion } from '../../Redux/Popup/reducer';
import { getAllQuestion } from '../../Redux/Admin/thunk';
import { RootState } from '../../Redux/index';

import QnaLine from '../Qna/QnaLine';
import { RouteComponentProps } from 'react-router-dom';

const Container = styled.div`

`;
const QnaBox = styled.div`
    border : 1px solid red;
    margin: 3px 0;
`;
const ButtonBox = styled.div`
    margin-top:5px;
    margin-left:6px;
`;
const Button = styled.button`
    margin-left:1px;
    margin-top:1px;
`
interface Props extends RouteComponentProps{

}
export default (props:Props)=>{
    const dispatch = useDispatch();
    const productList = useSelector((state:RootState) => state.product.products);
    useEffect(() => {
        dispatch(getAllQuestion());
    }, []);
    const qnaList = useSelector((state:RootState) => state.admin.qna);
    const clickGoProduct = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>)=>{
        const element = e.target as HTMLElement;
        const pid = element.id;
    
        let idx=0;
        for(let i=0;i<productList.length;++i){
            if(productList[i].id=== pid){
                idx= i;
            }
        }
        props.history.push(`/productDetail/${idx}`);
        
    }
    return (
        <Container>
            {qnaList.map(qna=>{
                if(qna.product){
                    return (
                        <QnaBox key={qna.id}>
                            <ButtonBox><Button id={qna.product.id} onClick={clickGoProduct}>제품보기</Button></ButtonBox>
                            <QnaLine
                                qna={qna}
                            />
                        </QnaBox>
                    )
                }
                return(
                <QnaLine
                    key={qna.id}
                    qna={qna}
                />
                )
                
            })}
        </Container>
    )
}