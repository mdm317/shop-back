import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Strong = styled.h1`
  font-size: 4em;
  font-weight: 700;
  margin: 20px 0;
`;
export default function ForbiddenPage() {
  return (
    <Container>
      <Strong>접근권한이 없습니다.</Strong>
      <Link to="/">홈으로 가기</Link>
    </Container>
  );
}
