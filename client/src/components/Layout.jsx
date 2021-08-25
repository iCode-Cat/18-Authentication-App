import React, { useState, useRef, useEffect } from 'react';
import style from '../Scss/Layout.module.scss';
import { useSelector } from 'react-redux';
import SessionPopup from './Popups/SessionPopup';
import { Link } from 'react-router-dom';

const Layout = (props) => {
  const name = useRef();
  const img = useRef();
  const state = useSelector((state) => state.user.user);
  const [popupActive, setPopupActive] = useState(false);
  // Remove popup if user clicks out of the username
  useEffect(() => {
    window.onclick = (e) => {
      if (e.target !== name.current && e.target !== img.current) {
        setPopupActive(false);
      }
    };
  }, []);

  const profileImage =
    state.profile_img ||
    'https://www.pngarea.com/pngm/676/4747761_default-image-png-default-profile-picture-transparent-hd.png';
  const profileName = state.name;
  return (
    <section className={style.wrapper}>
      <header className={style.header}>
        <Link to='/profile'>
          <img
            src='/devchallenges.png'
            className={style.logo}
            alt='YOUR-LOGO'
          />
        </Link>
        <img
          ref={img}
          src={profileImage}
          className={style.profile}
          onClick={() => setPopupActive(!popupActive)}
          alt='YOUR-PROFILE'
        />
        <p
          ref={name}
          onClick={() => setPopupActive(!popupActive)}
          className={style.profile_name}
        >
          {profileName}
        </p>
        <span className={`material-icons ${style.profile_icon}`}>
          arrow_drop_up
        </span>
        {popupActive && <SessionPopup />}
      </header>
      {props.children}
      {/* <footer>Footer</footer> */}
    </section>
  );
};

export default Layout;
