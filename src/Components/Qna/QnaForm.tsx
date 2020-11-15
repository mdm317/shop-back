import React from "react";
import styled from "styled-components";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addQuestion } from "../../Redux/Product/thunk";
import { withRouter } from "react-router-dom";
import { RootState } from "../../Redux/index";
import ModalTop from "../ModalTop";
import { toast } from "react-toastify";
import { match } from "../../Types";

const Container = styled.div`
  display: flex;
  flex-direction: column;
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
interface MatchParams {
  productId: string;
}
function QnaForm({ match }: { match: match<MatchParams> }) {
  const [isSubmit, setisSubmit] = useState(false);
  const {
    params: { productId },
  } = match;
  const addQuestionErr = useSelector(
    (state: RootState) => state.product.error.addQuestion
  );
  const [textarea, settextarea] = useState("");

  const onTextarea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    settextarea(e.target.value);
  };
  const dispatch = useDispatch();
  const clickQnaBtn = async () => {
    if (!textarea.trim()) {
      toast.error("내용을 입력하세요");
      return;
    }
    await dispatch(addQuestion({ content: textarea, productId }));
    setisSubmit(true);
  };

  if (isSubmit) {
    if (addQuestionErr === null) {
      return <ModalTop message={"등록 성공"} />;
    } else {
      return <ModalTop message={"등록 실패"} />;
    }
  }
  //등록을 하면 isSubmit 가 true 가되고 ModalTop이 렌더됨
  //modal top은 message 버튼을 만들고 버튼을 누르면 닫히게 됨
  return (
    <Container>
      <Header>질문을 작성하세요</Header>

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
  );
}
export default withRouter(QnaForm);
