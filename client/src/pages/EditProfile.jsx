import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import styled from 'styled-components';
import { useHistory } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUser } from '../redux/userSlice';
import axios from 'axios';

const Wrapper = styled.section`
  margin-top: 4rem;
  max-width: 845px;

  @media (min-width: 50em) {
    margin-top: unset;
    margin: 6rem auto;
  }
`;

const BackDirect = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  p,
  span {
    color: #2d9cdb;
    font-size: 1.8rem;
    font-weight: 400;
  }
  span {
    margin-right: 0.1rem;
    margin-top: 0.3rem;
  }
`;

const ProfileParent = styled.div`
  margin-top: 2.4rem;
  @media (min-width: 50em) {
    border: solid 1px #e0e0e0;
    padding: 3rem 5rem 5rem 5rem;
    border-radius: 12px;
  }
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

const TextAreaWrapper = styled.div`
  margin-top: 3.2rem;
  display: grid;
  gap: 2.4rem;
`;

const TextAreaParent = styled.div``;

const TextInput = styled.input`
  width: 100%;
  border: 1px solid #828282;
  border-radius: 12px;
  padding: 1.7rem 1.8rem;
`;

const TextArea = styled.textarea`
  width: 100%;
  border: 1px solid #828282;
  border-radius: 12px;
  padding: 1.7rem 1.8rem;
  min-height: ${(props) => props.textarea && '91px'};
`;

const TextTitle = styled.p`
  font-size: 1.3rem;
  color: #333;
  font-weight: 500;
  margin-bottom: 0.3rem;
`;

const SaveButton = styled.button`
  justify-self: flex-start;
  background: #2f80ed;
  color: #fff;
  padding: 0.8rem 2.4rem;
  border-radius: 8px;
  font-size: 1.6rem;
  margin-bottom: 1rem;
`;

// Text area component
const Input = ({
  placeholder,
  title = 'Empty',
  type,
  textarea,
  onChange,
  defaultValue,
}) => {
  return (
    <TextAreaParent>
      <TextTitle>{title}</TextTitle>
      {textarea ? (
        <TextArea
          onChange={onChange}
          textarea={textarea}
          type={type}
          placeholder={placeholder}
          rows='0'
          defaultValue={defaultValue}
        />
      ) : (
        <TextInput
          onChange={onChange}
          type={type}
          placeholder={placeholder}
          rows='0'
          defaultValue={defaultValue}
        />
      )}
    </TextAreaParent>
  );
};

const EditProfile = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const state = useSelector((state) => state.user.user);
  const { profile_img, name, bio, phone, email } = state;
  const [profile, setProfile] = useState(false);

  // Profile Setting Handler
  const profileHandler = ({ name, value }) => {
    setProfile({ ...profile, [name]: value });
  };

  const updateProfileHandler = async () => {
    if (!profile) {
      return console.log('There is nothing to update');
    }
    try {
      const fetch = await axios.post(
        'https://authentication-appp.herokuapp.com/api/user/profile',
        { updated: profile },
        {
          withCredentials: true,
        }
      );
      dispatch(fetchUser());
      return fetch.data;
    } catch (error) {
      console.log(error);
    }
  };

  // Redirect user back to route where they are coming
  const redirectHandler = () => {
    history.push('/profile');
  };

  useEffect(() => {
    if (!profile) return;
    // After user state updated, redirect back
    redirectHandler();
  }, [state]);

  return (
    <Layout>
      <Wrapper>
        <BackDirect onClick={redirectHandler}>
          <span class='material-icons'>arrow_back_ios</span>
          <p>Back</p>
        </BackDirect>
        {/* Onclick should upload a new image or paste a url */}
        <ProfileParent>
          <Title>Change Info</Title>
          <SubTitle>Changes will be reflected to every services</SubTitle>
          <ImageContainer>
            <Image src={profile_img} alt='profile' />
            {/* <span className='material-icons changeIcon'>photo_camera</span> */}
          </ImageContainer>

          {/* Textarea inputs */}
          <TextAreaWrapper>
            <Input
              onChange={(e) =>
                profileHandler({ name: 'name', value: e.target.value })
              }
              type='text'
              title='Name'
              placeholder='Enter your name...'
              defaultValue={name}
            />
            <Input
              onChange={(e) =>
                profileHandler({ name: 'bio', value: e.target.value })
              }
              textarea
              type='text'
              title='Bio'
              placeholder='Enter your bio...'
            />
            <Input
              onChange={(e) =>
                profileHandler({ name: 'phone', value: e.target.value })
              }
              type='text'
              title='Phone'
              placeholder='Enter your phone...'
            />
            <Input
              onChange={(e) =>
                profileHandler({ name: 'email', value: e.target.value })
              }
              type='email'
              title='Email'
              placeholder='Enter your email...'
            />
            <Input
              onChange={(e) =>
                profileHandler({ name: 'password', value: e.target.value })
              }
              type='password'
              title='Password'
              placeholder='Enter your password...'
            />
            <SaveButton onClick={updateProfileHandler}>Save</SaveButton>
          </TextAreaWrapper>
        </ProfileParent>
      </Wrapper>
    </Layout>
  );
};

export default EditProfile;
