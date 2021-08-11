import React, { useState } from 'react';
import style from '../Scss/Auth.module.scss';
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';

const Login = ({}) => {
  const [form, setForm] = useState({ email: null, password: null });
  const history = useHistory();

  const submitHandler = async (e) => {
    e.preventDefault();
    const { email, password } = form;

    try {
      const post = await axios.post(
        'http://localhost:3001/auth/local/login',
        {
          username: email,
          password,
        },
        { withCredentials: true }
      );
      history.push('/profile');
      // After successful register redirect to login page
      //   history.push('/login');
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const submitSocialMedia = async (method) => {
    window.location.href = `http://localhost:3001/auth/${method}`;
  };

  const formStateHandler = ({ field, value }) => {
    setForm({
      ...form,
      [field]: value,
    });
  };

  console.log(form);

  return (
    <section className={style.wrapper}>
      <p className={style.logo}>YOUR LOGO</p>
      <h1 className={style.title}>Login</h1>
      <form onSubmit={(e) => submitHandler(e)} className={style.form}>
        <div className={style.input_container}>
          <span className='material-icons'>email</span>
          <input
            onChange={(e) =>
              formStateHandler({ field: 'email', value: e.target.value })
            }
            placeholder='Email'
            type='text'
            className={style.input}
          />
        </div>
        <div className={style.input_container}>
          <span className='material-icons'>lock</span>
          <input
            onChange={(e) =>
              formStateHandler({ field: 'password', value: e.target.value })
            }
            placeholder='Password'
            type='password'
            className={style.input}
          />
        </div>
        <button type='submit' className={style.button}>
          Start coding now
        </button>
      </form>

      <p className={style.desc_small}>or continue with these social profile</p>
      <div className={style.icons}>
        <i
          className='fab fa-google'
          onClick={() => submitSocialMedia('google')}
        ></i>
        <i
          className='fab fa-facebook-square'
          onClick={() => submitSocialMedia('facebook')}
        ></i>
        <i
          className='fab fa-twitter'
          onClick={() => submitSocialMedia('twitter')}
        ></i>
        <i
          className='fab fa-github'
          onClick={() => submitSocialMedia('github')}
        ></i>
      </div>
      <p className={style.desc_small}>
        Don’t have an account yet?
        <Link to='/register' className={style.login}>
          Register
        </Link>
      </p>
    </section>
  );
};

export default Login;
