import React from 'react';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';

import { BREAK_POINT } from 'constants/style';
import { isLoginAtom } from 'recoil/atom';
import BeforeLogin from './BeforeLogin/BeforeLogin';
import AfterLogin from './AfterLogin/AfterLogin';
import Menu from './Menu/Menu';
import { Helmet } from 'react-helmet-async';
const Mypage = () => {
  const isLogin: boolean = useRecoilValue(isLoginAtom);

  return (
    <Container>
      <Helmet>
        <title>마이페이지, 월별 추천 작물보기</title>
      </Helmet>
      <MyContent>
        <Menu />

        {isLogin ? <AfterLogin /> : <BeforeLogin />}
      </MyContent>
    </Container>
  );
};

export default Mypage;

const Container = styled.div`
  margin-top: 40px;
  padding: 0 20px;
  width: 100%;
  display: flex;
  justify-content: center;

  @media screen and (max-width: ${BREAK_POINT.MOBILE}) {
    margin-top: 20px;
    padding: 0 19px;
  }
`;

const MyContent = styled.div`
  flex-grow: 1;
  max-width: 1200px;
  display: flex;

  @media screen and (max-width: ${BREAK_POINT.MOBILE}) {
    margin-top: 0;
    flex-direction: column-reverse;
    width: 100%;
  }
`;
