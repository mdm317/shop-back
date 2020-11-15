import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RouteComponentProps } from "react-router-dom";
import { toast } from "react-toastify";
import styled from "styled-components";
import { useInputStr } from "../Hooks/useInput";
import { signUp, SignUpData, checkId, checkIdAPI } from "../Redux/User/thunk";
import { RootState } from "../Redux/index";
import Input from "../Components/Input";
const Container = styled.div`
  margin-top: 10vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Line = styled.div`
  height: 1.5px;
  width: 100%;
  background-color: black;
  margin-bottom: 10px;
`;
const Text = styled.p`
  font-size: 0.8em;
  padding-bottom: 10px;
`;
const Form = styled.div`
  padding: 40px;
  padding-bottom: 30px;
  margin-bottom: 15px;
  width: 50vw;

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    input {
      height: 30px;
      width: 100%;
      min-width: 100px;
      &:not(:last-child) {
        margin-bottom: 7px;
      }
    }
    button {
      margin-top: 10px;
    }
  }
`;
type Props = RouteComponentProps;
export default function SignUp(props: Props) {
  const checkIdState = useSelector((state: RootState) => state.user.checkId);
  const dispatch = useDispatch();
  const userId = useInputStr("");
  const name = useInputStr("");
  const password = useInputStr("");
  const passwordCheck = useInputStr("");
  const email = useInputStr("");
  const phone = useInputStr("");

  useEffect(() => {
    if (checkIdState.possible) {
      requestSignup();
    } else if (checkIdState.message) {
      toast.error(checkIdState.message);
    }
  }, [checkIdState]);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password.value !== passwordCheck.value) {
      toast.error("check your password");
      return;
    }
    dispatch(checkId(userId.value));
    //중복된 아이디가 없는지 확인
  };
  const requestSignup = () => {
    const newUser: SignUpData = {
      userId: userId.value,
      name: name.value,
      password: password.value,
    };
    if (email.value) {
      newUser.email = email.value;
    }
    if (phone.value) {
      newUser.phone = phone.value;
    }
    dispatch(signUp(newUser, props));
  };
  // submit 가 되면 서버에 아이디를 중복확인하는 요청을 먼저보낸다
  // 결과를 state.user.checkId 에서 가져와서 중복된 아이디가 없으면
  // 가입신청 request 를 보낸다
  // 가입신청이 승인되면 thunk에서 login 페이지로 가도록 한다
  return (
    <Container>
      SIGN UP
      <Form>
        <form onSubmit={onSubmit}>
          <input
            id="userId"
            value={userId.value}
            onChange={userId.onChange}
            placeholder="Enter id"
            required={true}
          ></input>
          <Input inputProp={{ ...name, placeholder: "Enter name" }}></Input>
          <Input
            inputProp={{ ...password, placeholder: "Enter password" }}
          ></Input>
          <Input
            inputProp={{
              ...passwordCheck,
              placeholder: "Enter password again",
            }}
          ></Input>
          <Text>이 밑의 항목은 선택사항 입니다.</Text>
          <Line></Line>
          <Input
            inputProp={{
              ...email,
              placeholder: "Enter email",
              required: false,
            }}
          ></Input>
          <Input
            inputProp={{
              ...phone,
              placeholder: "Enter phone",
              required: false,
            }}
          ></Input>

          <button>submit</button>
        </form>
      </Form>
    </Container>
  );
}
