import React from 'react';
import Layout from '../components/Layout';
import styled from 'styled-components';
import { useHistory } from 'react-router';
import { useSelector } from 'react-redux';

const Wrapper = styled.section`
  margin-top: 4rem;
`;

const BackDirect = styled.div`
  cursor: pointer;
  p {
    color: #2d9cdb;
    font-size: 1.8rem;
    font-weight: 400;
  }
`;

const ProfileParent = styled.div`
  margin-top: 2.4rem;
`;

const Title = styled.h1`
  font-size: 2.4rem;
  font-weight: 400;
`;

const SubTitle = styled.p`
  color: #828282;
  font-size: 1.3rem;
  margin-top: 0.4rem;
`;

const ImageContainer = styled.div`
  margin-top: 2.5rem;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

  max-width: 72px;
  cursor: pointer;

  /* ICON */
  .changeIcon {
    color: #fff;
    position: absolute;
    display: none;
  }

  &:hover {
    .changeIcon {
      display: flex;
    }
  }
`;

const Image = styled.img`
  width: 100%;
  border-radius: 8px;
`;

const TextAreaParent = styled.div``;

const TextArea = styled.input`
  width: 100%;
`;

// Text area component

const EditProfile = () => {
  const history = useHistory();
  const state = useSelector((state) => state.user.user);
  const { profile_img } = state;

  // Redirect user back to route where hey are coming
  const redirectHandler = () => {
    history.push('/profile');
  };
  return (
    <Layout>
      <Wrapper>
        <BackDirect onClick={redirectHandler}>
          <p>Back</p>
        </BackDirect>
        {/* Onclick should upload a new image or paste a url */}
        <ProfileParent>
          <Title>Change Info</Title>
          <SubTitle>Changes will be reflected to every services</SubTitle>
          <ImageContainer>
            <Image src={profile_img} alt='profile' />
            <span className='material-icons changeIcon'>image</span>
          </ImageContainer>
        </ProfileParent>
        {/* Textarea inputs */}
        <TextAreaParent>
          <TextArea placeholder='Enter your name...' />
        </TextAreaParent>
      </Wrapper>
    </Layout>
  );
};

export default EditProfile;
