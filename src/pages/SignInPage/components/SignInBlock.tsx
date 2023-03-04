import { FC, useState, useEffect } from 'react';
import axios from 'axios';
import { setUserName, setUserRole } from '../../../store/slices/userSlice';
import { useDispatch } from 'react-redux/es/exports';
import { useAppSelector } from '../../../store/store';
import { NavLink } from 'react-router-dom';

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
          dispatch(
            setUserName({
              name: temporaryUser['name'],
            }),
          );
          dispatch(setUserRole(temporaryUser['role']));
        } else {
          setFormError('Неправильный логин или пароль');
        }
      });
  }

  return (
    <div className="signInBlock">
      <div className="signInBlock__container">
        <h2 className="signInBlock__title">Войти</h2>
        <div className="signInBlock__notFoundUser">{formError}</div>
        <div className="signInBlock__content">
          <div className="signInBlock-content__input">
            <h3 className="signInBlock-content__title" data-error={errorMail}>
              Почта
            </h3>
            <input
              type="text"
              value={mail}
              onChange={(e) => mailInputChange(e)}
              onBlur={(e) => mailInputBlue(e)}
              onFocus={(e) => setErrorMail('')}
              name="mail"
            />
          </div>
        </div>
        <div className="signInBlock__content">
          <div className="signInBlock-content__input">
            <h3 className="signInBlock-content__title" data-error={errorPassword}>
              Пароль
            </h3>
            <input
              type="text"
              value={password}
              onChange={(e) => passwordInputChange(e)}
              onBlur={(e) => passwordInputBlue(e)}
              onFocus={(e) => setErrorPassword('')}
              name="password"
            />
          </div>
        </div>
        <button className="signInBlock__submit" disabled={!formIsValid} onClick={onSubmitClick}>
          Отправить
        </button>
        <NavLink to='/signUp' className="signInBlock__sign-up">
          Зарегистрироваться
        </NavLink>
      </div>
    </div>
  );
};
