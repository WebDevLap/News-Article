import { FC, useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { setUserName, setUserRole, setUserVerified } from '../../../store/slices/userSlice';
import { useDispatch } from 'react-redux/es/exports';
import { NavLink } from 'react-router-dom';
import { WaitModal } from '../../../components/WaitModal/WaitModal';
import { useAppSelector } from '../../../store/store';

// click on glass near input
export const glassClick = (element: HTMLInputElement | null) => {
  if (!element) return;
  switch (element?.type) {
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

  const passwordInputRef = useRef<HTMLInputElement>(null);

  const [isWaiting, setIsWaiting] = useState<boolean>(false);

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
    setIsWaiting(true);
    axios
      .get(`https://6403387ef61d96ac487a1e4d.mockapi.io/users?mail=${mail}`)
      .then((res) => res.data)
      .then((json) => {
        if (!json.length) {
          setFormError('Неправильный логин или пароль');
          return;
        }
        if (json[0]['password'] === password) {
          setFormError('');
          dispatch(setUserName(json[0]['name']));
          dispatch(setUserRole(json[0]['role']));
          dispatch(setUserVerified(true));
        } else {
          setFormError('Неправильный логин или пароль');
        }
      })
      .then(() => setIsWaiting(false));
  }


  return (
    <div className="signInBlock">
      <div className="signInBlock__container">
        <WaitModal state={isWaiting} />
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
              onFocus={() => setErrorMail('')}
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
