import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Link, Outlet } from 'react-router-dom';
import { useNavermaps } from 'react-naver-maps';

import logoImg from 'assets/logo_horizon.png';
import NavLinks from './NavLinks/NavLinks';
import MobileNavLinks from './NavLinks/MobileNavLinks';
import UserItems from './UserItems';
import { useRecoilState } from 'recoil';
import { windowOffsetAtom } from 'recoil/atom';

const Header = () => {
  const navermaps = useNavermaps();
  const [offset, setOffset] = useRecoilState(windowOffsetAtom);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      setOffset({ width, height });
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  });

  return (
    <>
      <AppContainer>
        <HeaderContainer>
          <Wrapper>
            <LinkWrapper>
              <LogoImageContainer to={'/'}>
                <LogoImage src={logoImg} alt="로고" />
              </LogoImageContainer>
              <NavLinks />
            </LinkWrapper>
            <UserItems />
          </Wrapper>
          <MobileNavLinks />
        </HeaderContainer>
        <Main url={location.pathname}>
          <Outlet context={{ navermaps }} />
        </Main>
      </AppContainer>
    </>
  );
};

const AppContainer = styled.div`
  height: 100vh;
`;

const HeaderContainer = styled.header`
  position: sticky;
  top: 0;
  z-index: 100;
  height: 108px;
  background-color: ${({ theme }) => theme.colors.white};
  display: flex;
  flex-direction: column;
`;

const Wrapper = styled.div`
  display: flex;
  padding: 25px 20px;
  width: 100%;
  max-width: 1252px;
  margin: 0 auto;
  justify-content: space-between;
  align-items: center;

  @media ${({ theme }) => theme.devices.mobile} {
    padding: 40px 20px;
  }
`;

const LinkWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-shrink: 0;
`;

const LogoImageContainer = styled(Link)`
  width: 127px;
  height: 22px;
  display: flex;
  flex-shrink: 0;
  align-items: center;
  cursor: pointer;

  @media ${({ theme }) => theme.devices.mobile} {
    width: 163px;
    height: 28px;
  }
`;

const LogoImage = styled.img`
  display: block;
  width: 100%;
  height: 100%;
`;

const Main = styled.main<{ url: string }>`
  flex: 1 1 auto;
  width: 100%;
  height: calc(100vh - 108px);
`;

export default Header;
