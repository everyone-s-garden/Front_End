import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { BREAK_POINT } from 'constants/style';
import { useForm } from 'react-hook-form';
import icon from 'assets/search_icon.svg';
import { useDaumPostcodePopup } from 'react-daum-postcode';
import handleComplete from 'utils/PostCode';
import customAxios from 'utils/token';
import { IProps, ILocation, IUploadData, IFaclity, IStates, Idata } from './type';
import {
  UploadData,
  formValidation,
  inputContactFormat,
  inputPriceFormat,
  uncommaPrice,
  inputSizeFormat,
  formDataHandler,
} from './query';
import { useNavigate } from 'react-router-dom';
import { AxiosResponse } from 'axios';
export interface IRequestData {
  gardenName: string;
  price: string;
  size: string;
  gardenStatus: 'ACTIVE' | 'INACTIVE' | '';
  linkForRequest: string;
  contact: string;
  address: string;
  latitude: number;
  longitude: number;
  isToilet: boolean;
  isWaterway: boolean;
  isEquipment: boolean;
  gardenDescription: string;
  recruitStartDate: string;
  recruitEndDate: string;
  useStartDate: string;
  useEndDate: string;
}

const Form = ({ match, images, setImages, location, setLocation }: IProps) => {
  const open = useDaumPostcodePopup(`${process.env.REACT_APP_DAUM_API_URL}`);
  const nav = useNavigate();
  const [price, setPrice] = useState<string>('');
  const [size, setSize] = useState<string>('');
  const [contact, setContact] = useState<string>('');
  const { handleSubmit, getValues, register, setValue } = useForm();
  const [isOk, setIsOk] = useState<boolean>(false);
  const [facility, setFacility] = useState({
    toilet: false,
    waterway: false,
    equipment: false,
  });
  const [states, setStates] = useState({
    recruiting: false,
    end: false,
  });
  const getPost = () => {
    open({
      onComplete: async location => {
        const data: ILocation | undefined = await handleComplete(location);
        if (data) {
          setLocation(data);
        }
      },
      onError: err => console.log(err),
    });
  };

  const getStatus = (states: { recruiting: boolean; end: boolean }): IRequestData['gardenStatus'] => {
    if (states.recruiting) return 'ACTIVE';
    if (states.end) return 'INACTIVE';
    return ''; // 명시적으로 빈 문자열을 반환하는 경우를 추가합니다.
  };

  const uploadField = async () => {
    if (location?.address && location.lat && location.lng) {
      const uploadPrice = uncommaPrice(price);
      const status = getStatus(states);
      const gardenImages = await Promise.all(
        images.map(async v => {
          return await formDataHandler(v);
        }),
      );
      console.log(gardenImages);
      const uploadData = {
        gardenName: getValues('name'),
        price: uploadPrice,
        size,
        gardenStatus: status,
        linkForRequest: 'www.everygarden.me',
        contact,
        address: location?.address,
        latitude: Number(location?.lat),
        longitude: Number(location?.lng),
        isToilet: facility.toilet,
        isWaterway: facility.waterway,
        isEquipment: facility.equipment,
        gardenDescription: getValues('content'),
        recruitStartDate: '2023.12.01',
        recruitEndDate: '2023.12.23',
        useStartDate: '2023.11.01',
        useEndDate: '2023.12.31',
      };
      const validation = formValidation(uploadData, gardenImages);
      if (!validation) return;
      const res = await UploadData(uploadData, gardenImages);
      if (res.status === 201) nav('/my');
    } else {
      alert('지역은 필수입니다.');
    }
  };
  const handleToilet = () => {
    setFacility((prev: IFaclity) => ({
      ...prev,
      toilet: !prev.toilet,
    }));
  };
  const handleChannel = () => {
    setFacility((prev: IFaclity) => ({
      ...prev,
      waterway: !prev.waterway,
    }));
  };
  const handleEquip = () => {
    setFacility((prev: IFaclity) => ({
      ...prev,
      equipment: !prev.equipment,
    }));
  };
  const handleRecruiting = () => {
    setStates((prev: IStates) => ({
      recruiting: true,
      end: false,
    }));
  };

  const handleEnd = () => {
    setStates((prev: IStates) => ({
      recruiting: false,
      end: true,
    }));
  };

  useEffect(() => {
    if (images.length < 1) setIsOk(false);
    else if (size === '') setIsOk(false);
    else if (price === '') setIsOk(false);
    else if (getValues('name') === '') setIsOk(false);
    else if (states.end === false && states.recruiting === false) setIsOk(false);
    else if (contact === '') setIsOk(false);
    else if (location.address === '') setIsOk(false);
    else if (getValues('content') === '') setIsOk(false);
    else setIsOk(true);
  }, [images, location, size, price, location, states, contact, getValues('name'), getValues('content')]);

  const getEditData = async () => {
    try {
      const res = await customAxios.get(`v1/garden/${match?.params.id}`);
      const { data } = res;
      setImages(res.data.images);
      setValue('name', data.name);
      setPrice(inputPriceFormat(data.price));
      setSize(data.size);
      setContact(data.contact);
      setValue('content', data.content);
      setFacility(data.facility);
      setLocation({
        address: data.address,
        lat: String(data.latitude),
        lng: String(data.longitude),
      });
      setStates({
        recruiting: data.status === 'ACTIVE',
        end: data.status === 'INACTIVE',
      });
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    if (match) {
      getEditData();
    }
  }, []);

  const editField = async () => {
    const uploadPrice = await uncommaPrice(price);
    // const status = getStatus(states);
    // const uploadData: IUploadData = {
    //   name: getValues('name'),
    //   price: uploadPrice,
    //   size,
    //   contact,
    //   address: location?.address,
    //   latitude: Number(location?.lat),
    //   longitude: Number(location?.lng),
    //   images,
    //   content: getValues('content'),
    //   status,
    //   facility,
    // };
    // try {
    //   const validation = formValidation(uploadData);
    //   if (validation) {
    //     const res = await customAxios.put(`v1/garden/${match?.params.id}`, uploadData);
    //     if (res.status === 200) nav(-1);
    //   }
    // } catch (err) {
    //   console.log(err);
    // }
  };

  return (
    <Wrapper>
      <InfoBox onSubmit={handleSubmit(match ? editField : uploadField)}>
        <InputWrapper>
          <Input {...register('name')} placeholder="텃밭 이름" />
        </InputWrapper>
        <InputWrapper>
          {price.toString() !== '' && <Won>₩</Won>}
          <Input
            value={price}
            onChange={(e: React.FormEvent<HTMLInputElement>) => setPrice(inputPriceFormat(e.currentTarget.value))}
            placeholder="가격"
          />
        </InputWrapper>
        <InputWrapper>
          <SizeInput
            value={size}
            onChange={(e: React.FormEvent<HTMLInputElement>) => setSize(inputSizeFormat(e.currentTarget.value))}
            placeholder="면적(평)"
            size={size.length}
          />
          {size !== '' && <span>평</span>}
        </InputWrapper>
        <InputWrapper>
          <Input
            value={contact}
            onChange={(e: React.FormEvent<HTMLInputElement>) => setContact(inputContactFormat(e.currentTarget.value))}
            placeholder="연락처"
          />
        </InputWrapper>
        <StateBox>
          <span>상태</span>
          <RecruitingBtn state={states.recruiting} onClick={handleRecruiting}>
            <Circle state={states.recruiting} />
            모집 중
          </RecruitingBtn>

          <EndBtn state={states.end} onClick={handleEnd}>
            마감
          </EndBtn>
        </StateBox>
        <Location>
          <div>
            <span>위치</span>
            {location.address !== '' && <LocationInputSpan>{location.address}</LocationInputSpan>}
          </div>
          <img onClick={getPost} src={icon} />
        </Location>
        <Facility>
          <span>시설</span>
          <ToiletBtn toilet={facility.toilet} onClick={handleToilet}>
            화장실
          </ToiletBtn>
          <ChannelBtn channel={facility.waterway} onClick={handleChannel}>
            수로
          </ChannelBtn>
          <EquipBtn equip={facility.equipment} onClick={handleEquip}>
            농기구
          </EquipBtn>
        </Facility>
        <TextArea {...register('content')} placeholder="기간, 주의사항 등 상세 내용을 입력해주세요." />
        <UploadBtn isOk={isOk}>완료</UploadBtn>
      </InfoBox>
    </Wrapper>
  );
};
export default Form;

const Wrapper = styled.div`
  border: none;
  border-top: 0.5px solid #e1e1e1;
`;
const InfoBox = styled.form`
  width: 100%;
  height: fit-content;
  display: flex;
  flex-direction: column;

  @media screen and (max-width: ${BREAK_POINT.MOBILE}) {
    width: 100%;
  }
`;
const Input = styled.input`
  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 500;
  font-size: 17px;
  line-height: 20px;
  border: none;
  min-width: 120px;
  ::placeholder {
    font-style: normal;
    font-weight: 500;
    font-size: 17px;
    line-height: 20px;
    color: #d1d3d7;
  }
  @media screen and (max-width: ${BREAK_POINT.MOBILE}) {
    width: 100%;
  }
`;
const SizeInput = styled.input<{ size: number }>`
  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 500;
  font-size: 17px;
  line-height: 20px;
  border: none;
  width: ${props => (props.size !== 0 ? `${props.size * 9.5}px` : 'fit-content')};
  ::placeholder {
    font-style: normal;
    font-weight: 500;
    font-size: 17px;
    line-height: 20px;
    color: #d1d3d7;
  }
  @media screen and (max-width: ${BREAK_POINT.MOBILE}) {
    font-size: 12px;
  }
`;

const InputWrapper = styled.div`
  width: 664px;
  padding: 21px 12px;
  border: 0;
  border-bottom: 0.5px solid #e1e1e1;
  display: flex;
  @media screen and (max-width: ${BREAK_POINT.MOBILE}) {
    width: 100%;
  }
`;

const Won = styled.span`
  margin-right: 10px;
`;
const StateBox = styled.div`
  display: flex;
  align-items: center;
  padding: 15px 12px;
  border: 0;
  border-bottom: 0.5px solid #e1e1e1;
  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 500;
  font-size: 17px;
  line-height: 20px;
  span {
    margin-right: 45px;
  }
  div {
    background: rgba(255, 255, 255, 0.5);
    border-radius: 8px;
    padding: 6px 10px;
    border: 1px solid #afafaf;
    margin-right: 16px;
    display: flex;
    color: #afafaf;
    align-items: center;
    font-size: 12px;
    cursor: pointer;
    @media screen and (max-width: ${BREAK_POINT.MOBILE}) {
      margin-right: 10px;
    }
  }
`;

const RecruitingBtn = styled.div<{ state: boolean }>`
  border: ${props => (props.state ? '1px solid  #AFAFAF' : '1px solid #d9d9d9')} !important;
  color: ${props => (props.state ? '#414C38' : '#d9d9d9')} !important;
  transition: 0.3s ease-in-out;
`;
const ReqularBtn = styled.div<{ state: boolean }>`
  border: ${props => (props.state ? '1px solid  #AFAFAF' : '1px solid #d9d9d9')} !important;
  color: ${props => (props.state ? '#414C38' : '#d9d9d9')} !important;
  transition: 0.3s ease-in-out;
`;
const EndBtn = styled.div<{ state: boolean }>`
  border: ${props => (props.state ? '1px solid  #AFAFAF' : '1px solid #d9d9d9')} !important;
  color: ${props => (props.state ? '#414C38' : '#d9d9d9')} !important;
  transition: 0.3s ease-in-out;
`;
const ToiletBtn = styled.div<{ toilet: boolean }>`
  border: ${props => (props.toilet ? '1px solid  #AFAFAF' : '1px solid #d9d9d9')} !important;
  color: ${props => (props.toilet ? '#414C38' : '#d9d9d9')} !important;
  transition: 0.3s ease-in-out;
`;
const ChannelBtn = styled.div<{ channel: boolean }>`
  border: ${props => (props.channel ? '1px solid  #AFAFAF' : '1px solid #d9d9d9')} !important;
  color: ${props => (props.channel ? '#414C38' : '#d9d9d9')} !important;
  transition: 0.3s ease-in-out;
`;
const EquipBtn = styled.div<{ equip: boolean }>`
  border: ${props => (props.equip ? '1px solid  #AFAFAF' : '1px solid #d9d9d9')} !important;
  color: ${props => (props.equip ? '#414C38' : '#d9d9d9')} !important;
  transition: 0.3s ease-in-out;
`;

const Location = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 21px 12px;
  border: 0;
  border-bottom: 0.5px solid #e1e1e1;
  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 500;
  font-size: 17px;
  line-height: 20px;
  img {
    cursor: pointer;
  }
  div {
    display: flex;
    align-items: center;
    overflow: hidden;
    width: 100%;
    span {
      margin-right: 45px;
      white-space: nowrap;
    }
  }
`;

const LocationInputSpan = styled.span`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  @media screen and (max-width: ${BREAK_POINT.MOBILE}) {
    display: block;
    width: 340px;
  }
`;
const Circle = styled.div<{ state: boolean }>`
  width: 9px !important;
  height: 9px !important;
  border-radius: 5px;
  padding: 0px !important;
  background: ${props => (props.state ? ' #ff6a00' : '#d9d9d9')} !important;
  margin-right: 5px !important;
  transition: 0.3s ease-in-out;
  box-shadow: ${props => (props.state ? '0px 0px 2.15599px 1.07799px #ffc869' : 'none')};
  border: ${props => (props.state ? '1px solid #ff6a00' : '#d9d9d9')} !important;
`;

const Facility = styled.div`
  display: flex;
  align-items: center;
  padding: 15px 12px;
  border: 0;
  border-bottom: 0.5px solid #e1e1e1;
  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 500;
  font-size: 17px;
  line-height: 20px;
  span {
    margin-right: 45px;
  }
  div {
    background: rgba(255, 255, 255, 0.5);
    border: 1px solid #d9d9d9;
    border-radius: 16.7033px;
    padding: 6px 10px;
    margin-right: 16px;
    color: #d9d9d9;
    font-size: 12px;
    cursor: pointer;
  }
`;

const StateBtn = styled.div`
  background: rgba(255, 255, 255, 0.5);
  border: 1px solid #d9d9d9;
  border-radius: 16.7033px;
  padding: 6px 10px;
  margin-right: 16px;
  color: #d9d9d9;
  font-size: 12px;
`;
const TextArea = styled.textarea`
  height: 300px;
  margin-top: 5px;
  padding: 19px 12px;
  border: 0;
  resize: none;
  font-weight: 500;
  font-size: 17px;
  line-height: 25px;
  outline-color: white;
  :focus {
    border-color: white;
  }
  ::placeholder {
    color: #c8c8c8;
  }
`;

const UploadBtn = styled.button<{ isOk: boolean }>`
  width: 348px;
  height: 59px;
  background-color: ${props => (props.isOk ? '#414c38' : '#d9d9d9')};
  margin: 20px auto;
  border-radius: 15px;
  color: white;
  font-weight: 600;
  font-size: 19px;
  cursor: pointer;
  transition: 0.3s ease-in-out;
`;
