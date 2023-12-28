import React from 'react';
import styled from 'styled-components';
import logo from 'assets/logo_horizon.png';
import Kakao from './Kakao/Kakao';

import Bubble from 'assets/Bubble.png';
import { ReactComponent as BackIcon } from 'assets/back-icon.svg';
import { useNavigate } from 'react-router-dom';
import { BREAK_POINT } from 'constants/style';
import Naver from './Naver/Naver';

const Login = () => {
  const nav = useNavigate();

  return (
    <Container>
      <BackBtn onClick={() => nav('/')}>
        <BackIcon width="16" height="30" stroke="#414C38" strokeWidth="2" />
      </BackBtn>
      <Content>
        <BubbleBox>
          <Span>3초만에 로그인</Span>
        </BubbleBox>
        <Logo src={logo}></Logo>
        <Kakao />
        <Naver />
      </Content>
    </Container>
  );
};

export default Login;

const Container = styled.section`
  width: 100vw;
  height: var(--vh, 1vh) * 100;
  display: flex;
  position: absolute;
  top: 0px;
  z-index: 9999;
  background-color: white;
  @media screen and (max-width: ${BREAK_POINT.MOBILE}) {
    position: static;
  }
`;

const Content = styled.div`
  width: fit-content;
  height: 510px;
  margin: 263px auto;
  display: flex;
  flex-direction: column;
  @media screen and (max-width: ${BREAK_POINT.MOBILE}) {
    margin-top: 258px;
  }
`;

const Logo = styled.img`
  width: 270px;
  height: 46px;
  margin: 13px auto;
  margin-bottom: 0px;
  @media screen and (max-width: ${BREAK_POINT.MOBILE}) {
    width: 199.57px;
    height: 34px;
  }
`;

const Span = styled.span`
  width: fit-content;
  height: 21px;
  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 21px;
  text-align: center;
  margin-top: 15px;
  display: inline-block;
  color: #414c38;
  @media screen and (max-width: ${BREAK_POINT.MOBILE}) {
    font-size: 12px;
    line-height: 14px;
    margin-top: 12px;
  }
`;

const BackBtn = styled.button`
  width: 22px !important;
  height: 39px !important;
  position: absolute;
  margin-top: 76px;
  margin-left: 57px;
  @media screen and (max-width: ${BREAK_POINT.MOBILE}) {
    display: none;
  }
`;

const BubbleBox = styled.div`
  width: 163px !important;
  height: 72px !important;
  background-image: url(${Bubble});
  background-repeat: no-repeat;
  background-size: contain;
  text-align: center;
  margin: 0 auto;
  @media screen and (max-width: ${BREAK_POINT.MOBILE}) {
    width: 116px !important;
    height: 49px !important;
  }
`;

const BackBtnMobile = styled.button`
  width: 22px !important;
  height: 39px !important;
  position: absolute;
  margin-top: 56px;
  margin-left: 20px;
`;
