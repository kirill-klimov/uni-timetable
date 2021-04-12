import React, { useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { logInStart } from '../../redux/user/user.actions';
import { UserActionTypes } from '../../redux/user/user.types';
import CoolButton from '../CoolButton/CoolButton';
import TextInput from '../TextInput/TextInput';
import AuthError from '../AuthError/AuthError';

const LogIn = ({ error }) => {

  const dispatch = useDispatch();

  const [credentials, setCredentials] = useState({
    name: '',
    password: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (credentials.name.trim().length && credentials.password.trim().length)
      dispatch(logInStart(credentials));
  }

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="menu-block_titled">

        <span className="menu-block_titled__title">Вход</span>

        {
          error && error.action === UserActionTypes.LOG_IN_START ?
          <AuthError message={error.message} /> : null
        }

        <TextInput 
          placeholder="Логин" 
          onChange={handleChange}
          value={credentials.name}
          name="name" />

        <TextInput 
          placeholder="Пароль" 
          type="password" 
          name="password"
          onChange={handleChange}
          value={credentials.password}
          autoComplete="on" />

        <CoolButton text="Войти" type="submit" />

      </div>
    </form>
  );
}

const mapStateToProps = (state) => ({
  error: state.user.error
})

export default connect(mapStateToProps)(LogIn);