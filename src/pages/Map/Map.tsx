import React, { useState } from 'react';
import './map.css';
import { Container as MapDiv } from 'react-naver-maps';
import styled from 'styled-components';

import { BREAK_POINT } from 'constants/style';
import Loader from 'components/Loader';
import MyMap from './MapView/MyMap';
import ListView from './ListView/ListView';
import OptionBar from './MapView/OptionBar';
import { Helmet } from 'react-helmet-async';
const Map = () => {
  const [isInitializing, setIsInitializing] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [map, setMap] = useState<naver.maps.Map | null>(null);

  return (
    <MapPage>
      <Helmet>
        <title>개인, 공공 텃밭 매물 map 페이지</title>
      </Helmet>
      <Loader isLoading={isInitializing} />

      <OptionBar map={map} />
      <MapViewer>
        <MapDiv
          style={{
            width: '100%',
            height: '100%',
            overflow: 'hidden',
            transition: 'all 0.2s ease-in',
          }}
        >
          <MyMap
            isLoading={isLoading}
            setIsLoading={setIsLoading}
            setIsInitializing={setIsInitializing}
            map={map}
            setMap={setMap}
          />
        </MapDiv>
        <ListView map={map} />
      </MapViewer>
    </MapPage>
  );
};

export default Map;

const MapPage = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  height: calc(var(--vh, 1vh) * 100 - 108px);

  /* @media (min-width: ${BREAK_POINT.MOBILE}) {
    height: calc(var(--vh, 1vh) * 100 - 106px);
  } */
`;

const MapViewer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;

  @media (min-width: ${BREAK_POINT.MOBILE}) {
    flex-direction: row;
  }
`;
