import style from './Theme.module.scss';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useRoutes,
} from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Profile from './pages/Profile';
import EditProfile from './pages/EditProfile';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser } from './redux/userSlice';

function App() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.user);
  const isAuthenticated = state.isAuthenticated;
  console.log(isAuthenticated);
  // Check whether user authenticated
  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  return (
    <Router>
      <main data-theme='light' className={style.root}>
        <article className={style.wrapper}>
          <Switch>
            <Route path='/register' component={Register} />
            <Route path='/login' component={Login} />
            <Route path='/profile' component={Profile} />
            <Route path='/profile/edit' component={EditProfile} />
          </Switch>
        </article>
      </main>
    </Router>
  );
}

export default App;
