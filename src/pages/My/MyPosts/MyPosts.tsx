import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

import { BREAK_POINT } from 'constants/style';
import Post from '../Post';
import NoPost from '../NoPost';

const MyPosts = () => {
  const nav = useNavigate();
  const [MyPostList] = useState([1, 2, 3, 4, 5]);
  // const [MyPostList] = useState([]);

  const renderPosts = MyPostList.map(i => (
    <PostContainer key={i}>
      <Post />
    </PostContainer>
  ));

  return (
    <Container>
      {MyPostList.length === 0 ? (
        <NoPost title="올린 글이 없어요!" subTitle="판매하고 싶은 밭이 있나요?" url="/my/garden-register-seller" />
      ) : (
        <MyPostsSection>
          <SectionTitle>내 분양글</SectionTitle>
          <PostList>{renderPosts}</PostList>
          <Span>
            판매하고 싶은 밭이 있나요?
            <span onClick={() => nav('/my/garden-register-seller')}> 분양 글 등록하기</span>
          </Span>
        </MyPostsSection>
      )}
    </Container>
  );
};

export default MyPosts;

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const MyPostsSection = styled.div`
  padding-bottom: 40px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SectionTitle = styled.h1`
  margin-bottom: 10px;
  color: #414c38;
  font-size: 18px;
  font-weight: 500;

  @media screen and (max-width: ${BREAK_POINT.MOBILE}) {
    display: none;
  }
`;

const PostList = styled.li`
  width: 100%;
`;

const PostContainer = styled.div`
  position: relative;
  padding: 26px 0;
  width: 100%;
  height: 187px;
  border-bottom: 1px solid #e1e1e1;
`;

const Span = styled.span`
  margin-top: 16px;
  align-self: flex-start;
  color: #afafaf;
  font-weight: 400;
  font-size: 13px;

  & > span {
    color: #afafaf;
    text-decoration: underline;
    cursor: pointer;
  }
`;