import React, { useEffect } from "react";
import styled from "styled-components";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addAnswer } from "../Redux/Product/thunk";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { RootState } from "../Redux/index";
import ModalTop from "./ModalTop";
import { toast } from "react-toastify";
import { getQuestion } from "../Redux/Popup/reducer";
import { match } from "../Types";
const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`;
const Container = styled.div`
  display: flex;
  width: 80%;
  flex-direction: column;
  margin: 0 auto;
  align-items: center;
`;

const Header = styled.div`
  width: 100%;
  height: 100px;
  color: black;
  font-size: 3rem;
  text-align: center;
  padding-top: 35px;
  margin-bottom: 20px;
`;

const TextContainer = styled.div`
  position: relative;
  width: 400px;
  height: 300px;
  margin-bottom: 20px;
`;
const TextArea = styled.textarea`
  width: 100%;
  height: 100%;
  resize: none;
`;
const LimitLabel = styled.div`
  position: absolute;
  right: 0;
`;

const Button = styled.button`
  margin-top: 15px;
  width: 50px;
  height: 25px;
  background-color: blue;
  color: white;
  border: 0px;
  border-radius: 3px;
`;

const maxLength = 100;
const QuestionBox = styled.div`
  width: 300px;
  h2 {
    font-size: 2rem;
    font-weight: 500;
  }
`;
const WhiteBox = styled.div`
  margin: 10px 0;
  padding: 10px;
  border: 0.1px solid black;
  background-color: white;
`;

const Label = styled.p`
  width: 400px;
  margin: 10px 0;
`;
interface MatchParams {
  qnaId: string;
}

function AnswerForm({ match }: { match: match<MatchParams> }) {
  const {
    params: { qnaId },
  } = match;
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user.user);
  useEffect(() => {
    dispatch(getQuestion(qnaId));
  }, [user]);
  const question = useSelector((state: RootState) => state.popup.data.qna);
  const qerr = useSelector((state: RootState) => state.product.error.addAnswer);
  const [textarea, settextarea] = useState("");
  const [isSubmit, setisSubmit] = useState(false);

  const onTextarea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    settextarea(e.target.value);
  };
  const clickQnaBtn = async () => {
    if (!textarea.trim()) {
      toast.error("내용을 입력하세요");
      return;
    }
    await dispatch(
      addAnswer({
        content: textarea,
        qId: qnaId,
        productId: question.product.id,
      })
    );

    setisSubmit(true);
  };
  if (isSubmit) {
    if (qerr === null) {
      return <ModalTop message={"등록 성공"} />;
    } else {
      return <ModalTop message={"등록 실패"} />;
    }
  } //등록을 하면 isSubmit 가 true 가되고 ModalTop이 렌더됨
  //modal top은 message 버튼을 만들고 버튼을 누르면 닫히게 됨
  return (
    <Wrapper>
      <Container>
        <Header>답변을 작성하세요</Header>
        <QuestionBox>
          <h2>질문 내용:</h2>
          <WhiteBox>
            <p>{question.content}</p>
          </WhiteBox>
        </QuestionBox>
        <Label>답변:</Label>
        <TextContainer>
          <TextArea
            maxLength={maxLength}
            value={textarea}
            onChange={onTextarea}
          />
          <LimitLabel>
            {textarea.length}/{maxLength}{" "}
          </LimitLabel>
        </TextContainer>

        <Button onClick={clickQnaBtn}>등록</Button>
      </Container>
    </Wrapper>
  );
}
export default withRouter(AnswerForm);
