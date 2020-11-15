import React, { useEffect } from "react";
import { Qna } from "../../Model/db";
import { RootState } from "../../Redux/index";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import { getPrdQueList } from "../../Redux/Product/thunk";

const QuestionItem = styled.div`
  display: flex;
  margin-top: 5px;
  align-items: center;
  :first-child {
    margin-top: 15px;
  }
  p {
    padding: 0 auto;
    width: 10%;
    text-align: center;
    :nth-child(2) {
      cursor: pointer;
      margin-left: 10%;
      width: 70%;
      text-align: left;
    }
  }
`;
const AnswerItem = styled.div`
  margin-top: 5px;
  padding: 10px;
  background-color: lightgray;
  p {
    margin-left: 5%;
  }
`;

export default function QnaLine({ qna, pid }: { qna: Qna; pid: string }) {
  const dispatch = useDispatch();

  const [popupClosed, setpopupClosed] = useState(false);
  useEffect(() => {
    if (popupClosed) {
      dispatch(getPrdQueList(pid));
    }
  }, [popupClosed]);
  // popup 감지
  const [visibleAnswer, setvisibleAnswer] = useState(false);
  const user = useSelector((state: RootState) => state.user.user);
  const isAdmin = user ? user.isAdmin : false;
  let newUserId = qna.user.userId.slice(0, 4);
  newUserId += "****";
  const clickAddAnswer = () => {
    const popup = window.open(
      `/answerform/${qna.id}`,
      "PopupWin",
      "width=500,height=650"
    );
    const interval = setInterval(() => {
      if (popup?.closed) {
        setpopupClosed(true);
        clearInterval(interval);
      }
    }, 2000);
  }; //admin 계정일경우
  //답변을 작성하는 팝업을 열고 닫혔는지를 2초마다 검사해서
  //닫혔으면 다시 질문을 가져와서 화면을 다시 렌더링함

  const clickContent = () => {
    setvisibleAnswer(!visibleAnswer);
  }; //질문내용을 클릭하면 답변이 보임
  return (
    <>
      <QuestionItem>
        {isAdmin ? (
          <p>
            {qna.answer ? (
              "답변완료"
            ) : (
              <button id={qna.id} onClick={clickAddAnswer}>
                답변하기
              </button>
            )}
          </p>
        ) : (
          <p>{qna.answer ? "답변완료" : "답변대기"}</p>
        )}
        <p onClick={clickContent}>{qna.content}</p>
        <p>{newUserId}</p>
        <p>{qna.createdAt.slice(0, 10)}</p>
      </QuestionItem>
      {qna.answer && visibleAnswer && (
        <AnswerItem>
          <p>▶{qna.answer.content}</p>
        </AnswerItem>
      )}
    </>
  );
}
