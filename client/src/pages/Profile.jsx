import React, { useState } from 'react';
import Layout from '../components/Layout';
import style from '../Scss/Profile.module.scss';
import { useSelector } from 'react-redux';

const Profile = () => {
  const userState = useSelector((state) => state.user.user);
  const { name, phone, profile_img, bio, provider, email, id } = userState;
  const [profile, setProfile] = useState([
    {
      field: 'PHOTO',
      value: profile_img,
    },
    {
      field: 'NAME',
      value: name || 'Empty',
    },
    {
      field: 'BIO',
      value: bio || 'Empty',
    },

    {
      field: 'PHONE',
      value: phone || 'Empty',
    },
    {
      field: 'EMAIL',
      value: email || 'Empty',
    },
  ]);
  return (
    <Layout>
      <section className={style.wrapper}>
        <h1 className={style.title}>Personal info</h1>
        <p className={style.sub_title}>Basic info, like your name and photo</p>
        <section className={style.profile_container}>
          <section className={style.columnBox}>
            <p className={style.profile_title}>Profile</p>
            <p className={style.profile_subTitle}>
              Some info may be visible to other people
            </p>
            <button className={style.button}>Edit</button>
          </section>
          {profile.map((user, index) => (
            <section key={index} className={style.columnBox}>
              {user.value}
            </section>
          ))}
        </section>
      </section>
    </Layout>
  );
};

export default Profile;
