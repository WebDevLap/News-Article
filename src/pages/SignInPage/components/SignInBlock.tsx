import { FC, useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { setUserName, setUserRole, setUserVerified } from '../../../store/slices/userSlice';
import { useDispatch } from 'react-redux/es/exports';
import { NavLink } from 'react-router-dom';

// click on glass near input
export const glassClick = (element: HTMLInputElement | null) => {
  if (!element) return;
  switch (element.type) {
    case 'password':
      element.type = 'text';
      break;
    case 'text':
      element.type = 'password';
      break;
  }
};

export const SignInBlock: FC = () => {
  const dispatch = useDispatch();

  const [mail, setMail] = useState<string>('');
  const [errorMail, setErrorMail] = useState<string>('');
  const [mailIsError, setMailIsError] = useState<boolean>(true);

  const [password, setPassword] = useState<string>('');
  const [errorPassword, setErrorPassword] = useState<string>('');
  const [passwordIsError, setPasswordIsError] = useState<boolean>(true);

  const [formIsValid, setFormIsValid] = useState<boolean>(false);
  const [formError, setFormError] = useState<string>('');
  const [temporaryUser, setTemporaryUser] = useState();

  const passwordInputRef = useRef<HTMLInputElement>(null);

  const re =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

  useEffect(() => {
    if (mailIsError || passwordIsError) {
      setFormIsValid(false);
    } else {
      setFormIsValid(true);
    }
  }, [mailIsError, passwordIsError]);

  function mailInputChange(e: any) {
    setMail(e.target.value);
    if (!re.test(String(e.target.value).toLowerCase())) {
      setMailIsError(true);
    } else {
      setMailIsError(false);
    }
  }
  function mailInputBlue(e: any) {
    if (!re.test(String(e.target.value).toLowerCase())) {
      setErrorMail('Некорректная почта');
      if (!e.target.value.length) {
        setErrorMail('Пустое поле');
      }
    }
  }

  function passwordInputChange(e: any) {
    setPassword(e.target.value);
    if (e.target.value.length < 6) {
      setPasswordIsError(true);
    } else {
      setPasswordIsError(false);
    }
  }

  function passwordInputBlue(e: any) {
    if (e.target.value.length < 6) {
      setErrorPassword('Кол-во символов меньше 7');
      if (!e.target.value.length) {
        setErrorPassword('Пустое поле');
      }
    } else {
      setErrorPassword('');
      setPasswordIsError(false);
    }
  }

  function onSubmitClick() {
    axios
      .get(`https://6403387ef61d96ac487a1e4d.mockapi.io/users?mail=${mail}`)
      .then((res) => res.data)
      .then((json) => setTemporaryUser(json[0]))
      .then(() => {
        if (!temporaryUser) return;
        console.log(temporaryUser);
        if (temporaryUser['password'] === password) {
          setFormError('');
          dispatch(setUserName(temporaryUser['name']));
          dispatch(setUserRole(temporaryUser['role']));
          dispatch(setUserVerified(true));
        } else {
          setFormError('Неправильный логин или пароль');
        }
      });
  }
  // passwordInputRef?.current

  return (
    <div className="signInBlock">
      <div className="signInBlock__container">
        <h2 className="signInBlock__title">Войти</h2>
        <div className="signInBlock__notFoundUser">{formError}</div>
        <div className="signInBlock__content">
          <h3 className="signInBlock-content__title" data-error={errorMail}>
            Почта
          </h3>
          <div className="signInBlock-content__input">
            <input
              value={mail}
              onChange={(e) => mailInputChange(e)}
              onBlur={(e) => mailInputBlue(e)}
              onFocus={(e) => setErrorMail('')}
              name="mail"
            />
          </div>
        </div>
        <div className="signInBlock__content">
          <h3 className="signInBlock-content__title" data-error={errorPassword}>
            Пароль
          </h3>
          <div className="signInBlock-content__input">
            <input
              type="password"
              value={password}
              onChange={(e) => passwordInputChange(e)}
              onBlur={(e) => passwordInputBlue(e)}
              onFocus={(e) => setErrorPassword('')}
              name="password"
              ref={passwordInputRef}
            />
            <div className="glass" onClick={() => glassClick(passwordInputRef?.current)}></div>
          </div>
        </div>
        <button className="signInBlock__submit" disabled={!formIsValid} onClick={onSubmitClick}>
          Отправить
        </button>
        <NavLink to="/signUp" className="signInBlock__submit">
          Зарегистрироваться
        </NavLink>
      </div>
    </div>
  );
};
