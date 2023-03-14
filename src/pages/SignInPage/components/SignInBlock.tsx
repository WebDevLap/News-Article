import React from 'react';
import axios from 'axios';
import { setUserName, setUserRole, setUserVerified } from '../../../store/slices/userSlice';
import { useDispatch } from 'react-redux/es/exports';
import { NavLink } from 'react-router-dom';
import { WaitModal } from '../../../components/WaitModal/WaitModal';
import {
  dirtyBlur,
  dirtyFocus,
  glassClick,
  onEmailChange,
  onPasswordChange,
} from '../../../utils/signUtils';

export const SignInBlock: React.FC = () => {
  const dispatch = useDispatch();

  const password1Ref = React.useRef<HTMLInputElement>(null);

  const [email, setEmail] = React.useState<string>('');
  const [emailError, setEmailError] = React.useState<string>('Некорректная почта');
  const [emailDirty, setEmailDirty] = React.useState<boolean>(false);

  const [password, setPassword] = React.useState<string>('');
  const [passwordError, setPasswordError] = React.useState<string>('Некорректный пароль');
  const [passwordDirty, setPasswordDirty] = React.useState<boolean>(false);

  const [formIsValid, setFormIsValid] = React.useState<boolean>(false);
  const [waitModal, setWaitModal] = React.useState<boolean>(false);
  const [formError, setFormError] = React.useState<string>('');

  React.useEffect(() => {
    if (emailError.length || passwordError.length) {
      setFormIsValid(false);
    } else {
      setFormIsValid(true);
    }
  }, [emailError, passwordError]);

  // PASSWORD EVENTS

  function onPasswordFocus() {
    setPasswordDirty(false);
  }
  function onPasswordBlur() {
    setPasswordDirty(true);
  }

  // SUBMIT EVENT
  function onClickSubmit() {
    setWaitModal(true);

    try {
      axios
        .get(`https://6403387ef61d96ac487a1e4d.mockapi.io/users?mail=${email}`)
        .then((res) => res.data)
        .then((json) => {
          if (!json.length) {
            setFormError('Неверный логин или пароль');
            return;
          }
          if (!(json[0].password === password)) {
            setFormError('Неверный логин или пароль');
            return;
          }
          if (json[0].password === password) {
            const jsons = JSON.stringify({ email });
            localStorage.setItem('userData', jsons);
            dispatch(setUserVerified(true));
            dispatch(setUserName(json[0].name));
            dispatch(setUserRole(json[0].role));
          }
        })
        .then(() => setWaitModal(false))
        .catch(() => setWaitModal(false));
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="signInBlock">
      <div className="signInBlock__container">
        <WaitModal state={waitModal} />
        <h2 className="signInBlock__title">Войти</h2>
        <div className="signInBlock__notFoundUser">{formError}</div>
        <div className="signInBlock__content">
          <h3 className="signInBlock-content__title">Почта</h3>
          <div className={emailDirty ? 'error active' : 'error'}>{emailError}</div>
          <div className="signInBlock-content__input">
            <input
              name="mail"
              value={email}
              onChange={(e) => onEmailChange(e, setEmail, setEmailError)}
              onFocus={() => dirtyFocus(setEmailDirty)}
              onBlur={() => dirtyBlur(setEmailDirty)}
            />
          </div>
        </div>
        <div className="signInBlock__content">
          <h3 className="signInBlock-content__title">Пароль</h3>
          <div className={passwordDirty ? 'error active' : 'error'}>{passwordError}</div>

          <div className="signInBlock-content__input">
            <input
              name="password"
              type='password'
              onChange={(e) => onPasswordChange(e, setPassword, setPasswordError)}
              value={password}
              onFocus={onPasswordFocus}
              onBlur={onPasswordBlur}
              ref={password1Ref}
            />
            <div className="glass" onClick={() => glassClick(password1Ref)}></div>
          </div>
        </div>
        <button className="signInBlock__submit" disabled={!formIsValid} onClick={onClickSubmit}>
          Отправить
        </button>
        <NavLink to="/signUp" className="signInBlock__submit">
          Зарегистрироваться
        </NavLink>
      </div>
    </div>
  );
};
