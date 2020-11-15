import React, { useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { getAllQuestion } from "../../Redux/Admin/thunk";
import { RootState } from "../../Redux/index";

import QnaLine from "../Qna/QnaLine";
import { RouteComponentProps } from "react-router-dom";

const Container = styled.div``;
const QnaBox = styled.div`
  border: 1px solid red;
  margin: 3px 0;
`;
const ButtonBox = styled.div`
  margin-top: 5px;
  margin-left: 6px;
`;
const Button = styled.button`
  margin-left: 1px;
  margin-top: 1px;
`;
type Props = RouteComponentProps;
export default function QuestionList(props: Props) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllQuestion());
  }, []);
  const qnaList = useSelector((state: RootState) => state.admin.qna);
  const clickGoProduct = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    const element = e.target as HTMLElement;
    const pid = element.id;
    props.history.push(`/productDetail/${pid}`);
  };
  return (
    <Container>
      {qnaList.map((qna) => {
        if (qna.product) {
          return (
            <QnaBox key={qna.id}>
              <ButtonBox>
                <Button id={qna.product.id} onClick={clickGoProduct}>
                  제품보기
                </Button>
              </ButtonBox>
              <QnaLine page="admin" qna={qna} pid={qna.product.id} />
            </QnaBox>
          );
        }
        return <QnaLine page="admin" key={qna.id} qna={qna} pid="0" />;
      })}
    </Container>
  );
}
