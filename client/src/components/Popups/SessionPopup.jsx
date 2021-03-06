import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';

const Wrapper = styled.div`
  display: grid;
  position: absolute;
  right: 0;
  margin-top: 20rem;
  gap: 0.5rem;
  background: var(--bg-color);
  width: 188px;
  padding: 1.4rem 1.2rem;
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  box-shadow: hsla(0, 0%, 0%, 0.05) 0px 2px 4px 0px;
`;

const Option = styled.a`
  display: grid;
  grid-auto-flow: column;
  justify-content: flex-start;
  gap: 1.15rem;
  padding: 1.1rem 1.3rem;
  border-radius: 8px;
  color: ${(props) => (props.red ? '#EB5757' : 'var(--text-color)')};
  transition: 0.3s;
  font-weight: 500;
  :hover {
    background: #f2f2f2;
  }
`;

const SessionPopup = () => {
  const history = useHistory();
  const logout = async () => {
    try {
      const get = await axios.get(
        'http://localhost:3001/api/user/profile/logout',
        { withCredentials: true }
      );
      // After successfully logout, redirect to auth page.
      history.push('/');
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <Wrapper>
      <Link to='/profile'>
        <Option>
          <span className='material-icons'>account_circle</span>
          <p>My Profile</p>
        </Option>
      </Link>
      <hr style={{ border: '.5px #E0E0E0 solid' }} />
      <Option onClick={logout} red={true} href='/login'>
        <span className='material-icons'>logout</span>
        <p>Logout</p>
      </Option>
    </Wrapper>
  );
};

export default SessionPopup;
