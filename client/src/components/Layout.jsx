import React from 'react';
import style from '../Scss/Layout.module.scss';

const Layout = (props) => {
  return (
    <section className={style.wrapper}>
      <header className={style.header}>
        <img src={style.image} alt='YOUR-LOGO' />
        <img src={style.profile} alt='YOUR-PROFILE' />
      </header>
      {props.children}
      {/* <footer>Footer</footer> */}
    </section>
  );
};

export default Layout;
