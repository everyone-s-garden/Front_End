import React from 'react';
import styled from 'styled-components';
import MonthCropList from './MonthCropList';
import { BREAK_POINT } from 'constants/style';

const monthlyTitle = [
  null,
  '1월 추운 겨울 심기 좋은 작물 추천 해드려요!',
  '2월 추운 겨울 심기 좋은 작물 추천 해드려요!',
  '3월 봄의 시작! 심기 좋은 작물 추천 해드려요!',
  '4월 봄의 시작! 심기 좋은 작물 추천 해드려요!',
  '5월 봄의 시작! 심기 좋은 작물 추천 해드려요!',
  '6월 더운 여름 심기 좋은 작물 추천 해드려요!',
  '7월 더운 여름 심기 좋은 작물 추천 해드려요!',
  '8월 더운 여름 심기 좋은 작물 추천 해드려요!',
  '9월 가을의 시작! 심기 좋은 작물 추천 해드려요!',
  '10월 가을의 시작! 심기 좋은 작물 추천 해드려요!',
  '11월 추운 겨울 심기 좋은 작물 추천 해드려요!',
  '12월 추운 겨울 심기 좋은 작물 추천 해드려요!',
];

const MonthlyCrop = () => {
  const currentMonth = new Date().getMonth() + 1;

  return (
    <Wrapper>
      <Container>
        <Title>{monthlyTitle[currentMonth]}</Title>
        <MonthCropList currentMonth={currentMonth} />
      </Container>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background-color: #fff7ee;
  padding: 50px 0;
  @media (min-width: ${BREAK_POINT.MOBILE}) {
    padding: 0;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  margin: 0 auto;
  max-width: 1234px;
  width: 100%;
  padding: 0 20px;
  @media (min-width: ${BREAK_POINT.MOBILE}) {
    padding: 50px 20px;
  }
`;

const Title = styled.h2`
  font-size: 20px;
  font-weight: 600;
  word-break: keep-all;
  @media (min-width: ${BREAK_POINT.MOBILE}) {
    font-size: 26px;
    font-weight: 700;
  }
`;

export default MonthlyCrop;
