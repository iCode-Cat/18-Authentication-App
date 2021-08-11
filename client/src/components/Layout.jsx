import React from 'react';

const Layout = (props) => {
  return (
    <>
      <header>Header</header>
      {props.children}
      <footer>Footer</footer>
    </>
  );
};

export default Layout;
