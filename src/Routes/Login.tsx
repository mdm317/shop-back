import React from "react";
import { useDispatch } from "react-redux";
import { RouteComponentProps } from "react-router-dom";
import styled from "styled-components";
import { useInputStr } from "../Hooks/useInput";
import { logIn } from "../Redux/User/thunk";
import Input from "../Components/Input";

const Container = styled.div`
  margin-top: 10vh;
  display: flex;
  flex-direction: column;
  align-items: center;
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
export default function Login(props: Props) {
  const dispatch = useDispatch();
  const { value: userId, onChange: onUserId } = useInputStr("");
  const { value: password, onChange: onPassword } = useInputStr("");
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(logIn({ userId, password }, props));
  };

  return (
    <Container>
      LOGIN
      <Form>
        <form onSubmit={onSubmit}>
          <input
            id="userId"
            value={userId}
            onChange={onUserId}
            placeholder="Enter id"
            required={true}
          ></input>
          <input
            id="password"
            type="password"
            value={password}
            onChange={onPassword}
            placeholder="Enter password"
            required={true}
          ></input>
          <button>submit</button>
        </form>
      </Form>
    </Container>
  );
}
