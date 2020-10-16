import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { getQuestion } from '../../Redux/Popup/reducer';
import { getAllQuestion } from '../../Redux/Admin/thunk';
import { RootState } from '../../Redux/index';
import QnaContainer from '../Qna/QnaContainer';
import QnaLine from '../Qna/QnaLine';

const Container = styled.div`

`;
export default ()=>{
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAllQuestion());
    }, []);
    const qnaList = useSelector((state:RootState) => state.admin.qna);
    return (
        <Container>
            {qnaList.map(qna=>{
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