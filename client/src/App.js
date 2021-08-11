import style from './Theme.module.scss';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Profile from './pages/Profile';
import EditProfile from './pages/EditProfile';
function App() {
  return (
    <BrowserRouter>
      <main data-theme='light' className={style.root}>
        <article className={style.wrapper}>
          <Route path='/register' component={Register} />
          <Route path='/login' component={Login} />
          <Route path='/profile' component={Profile} />
          <Route path='/profile/edit' component={EditProfile} />
        </article>
      </main>
    </BrowserRouter>
  );
}

export default App;
