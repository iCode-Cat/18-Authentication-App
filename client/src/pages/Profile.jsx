import React, { useState } from 'react';
import Layout from '../components/Layout';
import style from '../Scss/Profile.module.scss';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Profile = () => {
  const userState = useSelector((state) => state.user.user);
  const { name, phone, profile_img, bio, provider, email, id } = userState;
  const [profile, setProfile] = useState([
    {
      field: 'PHOTO',
      value:
        profile_img ||
        'https://www.pngarea.com/pngm/676/4747761_default-image-png-default-profile-picture-transparent-hd.png',
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
    {
      field: 'PASSWORD',
      value: '***********',
    },
  ]);
  return (
    <Layout>
      <section className={style.wrapper}>
        <h1 className={style.title}>Personal info</h1>
        <p className={style.sub_title}>Basic info, like your name and photo</p>
        <section className={style.profile}>
          <section className={style.columnBox}>
            <p className={style.profile_title}>Profile</p>
            <p className={style.profile_subTitle}>
              Some info may be visible to <br /> other people
            </p>
            <Link to='/profile/edit'>
              <button className={style.button}>Edit</button>
            </Link>
          </section>
          {profile.map((user, index) => (
            <section
              key={index}
              className={`${style.item} ${index === 0 && style.borderTop}`}
            >
              <div className={style.columnBox}>
                <p className={style.loop_field}>{user.field}</p>
                {index === 0 ? (
                  <img
                    className={style.loop_image}
                    src={user.value}
                    alt='profile'
                  />
                ) : (
                  <p className={style.loop_value}>{user.value}</p>
                )}
              </div>
            </section>
          ))}
        </section>
      </section>
    </Layout>
  );
};

export default Profile;
