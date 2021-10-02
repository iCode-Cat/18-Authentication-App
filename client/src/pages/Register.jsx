import React, { useState } from 'react';
import style from '../Scss/Auth.module.scss';
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';

const Register = () => {
  const [form, setForm] = useState({ email: null, password: null });
  const history = useHistory();
  const submitHandler = async (e) => {
    e.preventDefault();
    const { email, password } = form;

    try {
      axios.defaults.withCredentials = true;
      const post = await axios.post(
        'https://authentication-appp.herokuapp.com/auth/local/register',
        {
          username: email,
          password,
        },
        { withCredentials: true }
      );
      console.log(post.data);
      // After successful register redirect to login page
      history.push('/login');
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const submitSocialMedia = async (method) => {
    window.location.href = `https://authentication-appp.herokuapp.com/auth/${method}`;
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
      <h1 className={style.title}>
        Join thousands of learners from <br /> around the world
      </h1>
      <p className={style.desc}>
        Master web development by making real-life projects. There are multiple
        paths for you to choose
      </p>
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
        {/* <i
          className='fab fa-facebook-square'
          onClick={() => submitSocialMedia('facebook')}
        ></i> */}
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
        Adready a member?
        <Link to='/login' className={style.login}>
          Login
        </Link>
      </p>
    </section>
  );
};

export default Register;
