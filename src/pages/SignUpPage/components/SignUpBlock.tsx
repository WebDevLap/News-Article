import axios from 'axios';
import { useRef, useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { glassClick } from '../../SignInPage/components/SignInBlock';

export const SignUpBlock = () => {
  const passwordInput1Ref = useRef<HTMLInputElement>(null);
  const passwordInput2Ref = useRef<HTMLInputElement>(null);

  const [passwordInput1, setPasswordInput1] = useState<string>('');
  const [passwordErrorText1, setPasswordErrorText1] = useState<string>('');
  const [passwordIsError1, setPasswordIsError1] = useState<boolean>(true);

  const [passwordInput2, setPasswordInput2] = useState<string>('');
  const [passwordErrorText2, setPasswordErrorText2] = useState<string>('');
  const [passwordIsError2, setPasswordIsError2] = useState<boolean>(true);

  const [mailInput, setMailInput] = useState<string>('');
  const [mailErrorText, setMailErrorText] = useState<string>('');
  const [mailIsError, setMailIsError] = useState<boolean>(true);

  const [formError, setFormError] = useState('')
  const [formIsValid, setFormIsValid] = useState<boolean>(false);
  const [isntSoAccount, setIsntSoAccount] = useState<boolean>(false)

  useEffect(() => {
    if (passwordIsError1 || passwordIsError2 || mailIsError) {
      setFormIsValid(false);
    } else {
      setFormIsValid(true);
    }
  }, [passwordIsError1, passwordIsError2, mailIsError]);

  function passwordInputChange(e: any, setStater: any, inputIsValider: any) {
    setStater(e.target.value);
    if (e.target.value.length < 7) {
      // setPasswordIsError1(false);
      inputIsValider(true);
    } else {
      inputIsValider(false);
    }
  }
  function passwordInputBlur(e: any, setStater: any, inputIsValider: any) {
    if (e.target.value.length < 7) {
      setStater('Кол-во символов меньше 7');
      inputIsValider(true);
      if (!e.target.value) {
        setStater('Поле пустое');
      }
    } else {
      inputIsValider(false);
    }
  }

  const re =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

  function mailChange(e: any) {
    setMailInput(e.target.value);
    if (re.test(String(e.target.value).toLowerCase())) {
      setMailIsError(false);
    } else {
      setMailIsError(true);
    }
  }

  function mailFocus() {
    setMailErrorText('');
  }
  function mailBlur(e: any) {
    if (re.test(String(mailInput).toLowerCase())) {
      setMailIsError(false);
      setMailErrorText('');
    } else {
      setMailIsError(true);
      setMailErrorText('Некорректная почта');
      if(!e.target.value.length) setMailErrorText('Поле пустое');
    }
  }

  function onSubmitClick(){
    if(!formIsValid) return;
    axios
      .get(`https://6403387ef61d96ac487a1e4d.mockapi.io/users?mail=${mailInput}`)
      .then(res => res.data)
      .then(json => {
        if(json.length){
          setFormError('Аккаунт с такой почтой уже создан');
          setIsntSoAccount(false);
        } else if(passwordInput1 !== passwordInput2){
          setFormError('Пароли не совпадают');
          setIsntSoAccount(false);
        } else{
          setFormError('');
          setIsntSoAccount(true);
        }
      })

    if(isntSoAccount){
      axios
        .post('https://6403387ef61d96ac487a1e4d.mockapi.io/users', {
          mail: mailInput,
          password: passwordInput1,
          name: "Some",
          role: 1,
        })
    }
  }

  return (
    <div className="signInBlock">
      <div className="signInBlock__container">
        <h2 className="signInBlock__title">Зарегистрироваться</h2>
        <div className="signInBlock__notFoundUser">{formError}</div>
        <div className="signInBlock__content">
          <h3 className="signInBlock-content__title" data-error={mailErrorText}>
            Почта
          </h3>
          <div className="signInBlock-content__input">
            <input
              value={mailInput}
              onChange={(e) => mailChange(e)}
              onFocus={mailFocus}
              onBlur={(e) => mailBlur(e)}
            />
          </div>
        </div>
        <div className="signInBlock__content">
          <h3 className="signInBlock-content__title" data-error={passwordErrorText1}>
            Придумайте пароль
          </h3>
          <div className="signInBlock-content__input">
            <input
              ref={passwordInput1Ref}
              type="password"
              onChange={(e) => passwordInputChange(e, setPasswordInput1, setPasswordIsError1)}
              value={passwordInput1}
              onBlur={(e) => passwordInputBlur(e, setPasswordErrorText1, setPasswordIsError1)}
              onFocus={() => setPasswordErrorText1('')}
            />
            <div className="glass" onClick={() => glassClick(passwordInput1Ref.current)}></div>
          </div>
        </div>
        <div className="signInBlock__content">
          <h3 className="signInBlock-content__title" data-error={passwordErrorText2}>
            Повторите пароль
          </h3>
          <div className="signInBlock-content__input">
            <input
              type="password"
              ref={passwordInput2Ref}
              onChange={(e) => passwordInputChange(e, setPasswordInput2, setPasswordIsError2)}
              onBlur={(e) => passwordInputBlur(e, setPasswordErrorText2, setPasswordIsError2)}
              onFocus={() => setPasswordErrorText2('')}
              value={passwordInput2}
            />
            <div className="glass" onClick={() => glassClick(passwordInput2Ref.current)}></div>
          </div>
        </div>
        <button className="signInBlock__submit" disabled={!formIsValid} onClick={onSubmitClick}>
          Отправить
        </button>
        <NavLink to="/signIn" className="signInBlock__submit">
          Войти
        </NavLink>
      </div>
    </div>
  );
};
