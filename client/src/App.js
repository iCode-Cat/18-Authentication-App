import style from './Theme.module.scss';
import './App.css';
import {
  BrowserRouter as Router,
  Redirect,
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
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  const dispatch = useDispatch();

  // Check whether user authenticated
  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  const state = useSelector((state) => state.user);
  const isAuthenticated = state.isAuthenticated;

  return (
    <Router>
      {isAuthenticated !== null ? (
        <main data-theme='light' className={style.root}>
          <article className={style.wrapper}>
            <Switch>
              <Route path='/register' component={Register} />
              <Route path='/login' component={Login} />
              <ProtectedRoute
                path='/profile'
                component={Profile}
                isAuthenticated={isAuthenticated}
              />
              <ProtectedRoute
                path='/profile/edit'
                component={EditProfile}
                isAuthenticated={isAuthenticated}
              />
              <Route path='*'>
                {' '}
                <Redirect to='/login' />{' '}
              </Route>
            </Switch>
          </article>
        </main>
      ) : (
        ''
      )}
    </Router>
  );
}

export default App;
