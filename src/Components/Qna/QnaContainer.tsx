import React, { useEffect } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../Redux/index";
import { Qna } from "../../Model/db";
import { toast } from "react-toastify";
import QnaLine from "./QnaLine";
import { getPrdQueList } from "../../Redux/Product/thunk";
import baseurl from "../../baseurl";

const QnaBox = styled.div``;
const QnaHeader = styled.div`
  padding-top: 20px;
  margin-top: 40px;
`;
const Button = styled.button`
  margin-top: 10px;
  margin-bottom: 10px;
`;
const QnaList = styled.div``;

const TextStrong = styled.div`
  padding: 0 auto;
  font-size: 2rem;
  font-weight: 700;
  width: 500px;
`;
const QnaListTop = styled.div`
  display: flex;
  border-bottom: solid 1px lightgray;
  border-top: solid 1px black;
  padding: 20px 0;
  p {
    text-align: center;
    padding: 0 auto;
    width: 100px;
    :nth-child(2) {
      width: 700px;
    }
  }
`;

export default function QnaContainer({
  productId,
  qnaList,
  setpopupClosed,
  popupClosed,
}: {
  productId: string;
  qnaList: Qna[];
  setpopupClosed: React.Dispatch<React.SetStateAction<boolean>>;
  popupClosed: boolean;
}) {
  //props 에 productID 와 qna 목록이 필요
  const user = useSelector((state: RootState) => state.user.user);
  // const [popupClosed, setpopupClosed] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    if (popupClosed) {
      dispatch(getPrdQueList(productId));
      setpopupClosed(false);
    }
  }, [popupClosed]);
  const isAdmin = user ? user.isAdmin : false;

  if (qnaList === undefined) {
    qnaList = [];
  }
  const clickAddQna = () => {
    if (!user) {
      toast.error("you need to login");
      return;
    }
    if (productId) {
      const a = window.open(
        `${baseurl}/qnaform/${productId}`,
        "PopupWin",
        "width=500,height=600"
      );
      const interval = setInterval(() => {
        if (a?.closed) {
          setpopupClosed(true);
          clearInterval(interval);
        }
      }, 1000);
      //질문을 작성하는 팝업을 열고 닫혔는지를 1초마다 검사해서
      //닫혔으면 다시 질문을 가져와서 화면을 다시 렌더링함
    }
  };

  return (
    <QnaBox>
      <QnaHeader>
        <TextStrong>{"Q&A"}</TextStrong>
        {!isAdmin && <Button onClick={clickAddQna}>qna 작성하기</Button>}
      </QnaHeader>
      <QnaListTop>
        <p>답변상태</p>
        <p>내용</p>
        <p>작성자</p>
        <p>작성일</p>
      </QnaListTop>
      <QnaList>
        {qnaList.map((qna) => {
          if (qna.question) {
            return;
          }
          return (
            <QnaLine
              page="productDeatail"
              key={qna.id}
              qna={qna}
              pid={productId}
            />
          );
        })}
      </QnaList>
    </QnaBox>
  );
}
