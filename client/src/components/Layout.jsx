import React from 'react';
import style from '../Scss/Layout.module.scss';
import { useSelector } from 'react-redux';

const Layout = (props) => {
  const state = useSelector((state) => state.user.user);
  const profileImage = state.profile_img;
  const profileName = state.name;
  return (
    <section className={style.wrapper}>
      <header className={style.header}>
        <img src='/devchallenges.png' className={style.logo} alt='YOUR-LOGO' />
        <img src={profileImage} className={style.profile} alt='YOUR-PROFILE' />
        <p className={style.profile_name}>{profileName}</p>
        <span className={`material-icons ${style.profile_icon}`}>
          arrow_drop_up
        </span>
      </header>
      {props.children}
      {/* <footer>Footer</footer> */}
    </section>
  );
};

export default Layout;
