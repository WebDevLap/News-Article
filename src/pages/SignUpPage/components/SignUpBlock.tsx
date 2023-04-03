import React from 'react';
import { NavLink } from 'react-router-dom';
import { WaitModal } from '../../../components/WaitModal/WaitModal';
import { useDispatch } from 'react-redux';
import {
  dirtyBlur,
  dirtyFocus,
  glassClick,
  onEmailChange,
  onPasswordChange,
  onNicknameChange,
} from '../../../utils/signUtils';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const SignUpBlock = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const passwordInput1Ref = React.useRef<HTMLInputElement>(null);
  const passwordInput2Ref = React.useRef<HTMLInputElement>(null);

  const [email, setEmail] = React.useState<string>('');
  const [emailError, setEmailError] =
    React.useState<string>('Некорректная почта');
  const [emailDirty, setEmailDirty] = React.useState<boolean>(false);

  const [nickname, setNickname] = React.useState<string>('');
  const [nicknameError, setNicknameError] = React.useState<string>(
    'Некорректный никнейм',
  );
  const [nicknameDirty, setNicknameDirty] = React.useState<boolean>(false);

  const [password1, setPassword1] = React.useState<string>('');
  const [password1Error, setPassword1Error] = React.useState<string>(
    'Некорректный пароль',
  );
  const [password1Dirty, setPassword1Dirty] = React.useState<boolean>(false);

  const [password2, setPassword2] = React.useState<string>('');
  const [password2Error, setPassword2Error] = React.useState<string>(
    'Некорректный пароль',
  );
  const [password2Dirty, setPassword2Dirty] = React.useState<boolean>(false);

  const [formIsValid, setFormIsValid] = React.useState<boolean>(false);
  const [formError, setFormError] = React.useState<string>('');
  const [waitModal, setWaitModal] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (emailError || nicknameError || password1Error || password2Error) {
      setFormIsValid(false);
    } else {
      setFormIsValid(true);
    }
  }, [emailError, nicknameError, password1Error, password2Error]);

  function onSubmitClickl() {
    setWaitModal(true);
    if (password1 !== password2) {
      setFormError('Пароли не совпадают');
      setWaitModal(false);
      return;
    }
    try {
      axios
        .get(`https://6403387ef61d96ac487a1e4d.mockapi.io/users?mail=${email}`)
        .then(res => res.data)
        .then(json => {
          if (json.length) {
            setFormError('Аккаунт с такой почтой уже создан');
            setWaitModal(false);
          } else {
            axios
              .get(
                `https://6403387ef61d96ac487a1e4d.mockapi.io/users?name=${nickname}`,
              )
              .then(res => res.data)
              .then(json => {
                if (json.length) {
                  setFormError('Никней должен быть уникальным');
                  setWaitModal(false);
                } else {
                  axios
                    .post(`https://6403387ef61d96ac487a1e4d.mockapi.io/users`, {
                      mail: email,
                      password: password1,
                      name: nickname,
                      role: 1,
                    })
                    .then(() => {
                      alert(`Аккаунт с почтой: ${email} успешно создан!`);
                      navigate('/');
                    })
                    .finally(() => {
                      setWaitModal(false);
                    });
                }
              });
          }
        });
    } catch (err) {
      console.log(err);
      setWaitModal(false);
    }
  }

  async function onSubmitClick() {
    try {
      setWaitModal(true);
      if (password1 !== password2) {
        setFormError('Пароли не совпадают');
        setWaitModal(false);
        return;
      }
      const { data: getMails } = await axios.get(
        `https://6403387ef61d96ac487a1e4d.mockapi.io/users?mail=${email}`,
      );

      if (getMails.length) {
        setFormError('Аккаунт с такой почтой уже создан');
        setWaitModal(false);
        return;
      }

      const { data: namesApi } = await axios.get(
        `https://6403387ef61d96ac487a1e4d.mockapi.io/users?name=${nickname}`,
      );

      if (namesApi.length) {
        setFormError('Никнейм должен быть уникальным');
        setWaitModal(false);
      } else {
        const postUser = await axios.post(
          `https://6403387ef61d96ac487a1e4d.mockapi.io/users`,
          {
            mail: email,
            password: password1,
            name: nickname,
            role: 1,
          },
        );
        navigate('/');
        setTimeout(
          () => alert(`Аккаунт с почтой: ${email} успешно создан!`),
          300,
        );
      }
    } catch (err) {
      console.error(err);
    } finally {
      setWaitModal(false);
    }
  }

  return (
    <div className="signInBlock">
      <div className="signInBlock__container">
        <WaitModal state={waitModal} />
        <h2 className="signInBlock__title">Зарегистрироваться</h2>
        <div className="signInBlock__notFoundUser">{formError}</div>
        <div className="signInBlock__content">
          <h3 className="signInBlock-content__title">Почта</h3>
          <div className={emailDirty ? 'error active' : 'error'}>
            {emailError}
          </div>
          <div className="signInBlock-content__input">
            <input
              value={email}
              onChange={e => onEmailChange(e, setEmail, setEmailError)}
              onBlur={() => dirtyBlur(setEmailDirty)}
              onFocus={() => dirtyFocus(setEmailDirty)}
            />
          </div>
        </div>
        <div className="signInBlock__content">
          <h3 className="signInBlock-content__title">Никнейм на сайте</h3>
          <div className={nicknameDirty ? 'error active' : 'error'}>
            {nicknameError}
          </div>
          <div className="signInBlock-content__input">
            <input
              onChange={e => onNicknameChange(e, setNickname, setNicknameError)}
              value={nickname}
              onFocus={() => dirtyFocus(setNicknameDirty)}
              onBlur={() => dirtyBlur(setNicknameDirty)}
            />
          </div>
        </div>
        <div className="signInBlock__content">
          <h3 className="signInBlock-content__title">Придумайте пароль</h3>
          <div className={password1Dirty ? 'error active' : 'error'}>
            {password1Error}
          </div>
          <div className="signInBlock-content__input">
            <input
              type="password"
              onChange={e =>
                onPasswordChange(e, setPassword1, setPassword1Error)
              }
              value={password1}
              onFocus={() => dirtyFocus(setPassword1Dirty)}
              onBlur={() => dirtyBlur(setPassword1Dirty)}
              ref={passwordInput1Ref}
            />
            <div
              className="glass"
              onClick={() => glassClick(passwordInput1Ref)}
            ></div>
          </div>
        </div>
        <div className="signInBlock__content">
          <h3 className="signInBlock-content__title">Повторите пароль</h3>
          <div className={password2Dirty ? 'error active' : 'error'}>
            {password2Error}
          </div>

          <div className="signInBlock-content__input">
            <input
              type="password"
              onChange={e =>
                onPasswordChange(e, setPassword2, setPassword2Error)
              }
              value={password2}
              onFocus={() => dirtyFocus(setPassword2Dirty)}
              onBlur={() => dirtyBlur(setPassword2Dirty)}
              ref={passwordInput2Ref}
            />
            <div
              className="glass"
              onClick={() => glassClick(passwordInput2Ref)}
            ></div>
          </div>
        </div>
        <button
          className="signInBlock__submit"
          disabled={!formIsValid}
          onClick={onSubmitClick}
        >
          Отправить
        </button>
        <NavLink to="/signIn" className="signInBlock__submit">
          Войти
        </NavLink>
      </div>
    </div>
  );
};
