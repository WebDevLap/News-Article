import { FC } from 'react';
import { useAppSelector } from '../../../store/store';
import { userExit } from '../../../store/slices/userSlice';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

export const ProfileBlock: FC = () => {
  const userName = useAppSelector((state) => state.user.name);
  const userRole = useAppSelector((state) => state.user.role);
  const userVerified = useAppSelector((state) => state.user.verified);
  const allRoles = useAppSelector((state) => state.user.allRoles);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  function onExitClick() {
    dispatch(userExit());
    localStorage.removeItem('userData')
    navigate('/');
  }

  return (
    <div className="profileBlock">
      <div className="profileBlock__container _container">
        <h2 className="profileBlock__title">Настройки аккаунта</h2>
        <ul className="profileBlock__list">
          <div className={userVerified ? 'profileBlock__item' : 'profileBlock__item disNone'}>
            <div className="profileBlock-item__title">Никнейм: {userName}</div>
          </div>
          <div className="profileBlock__item">
            <div className="profileBlock-item__title">Вы верифицированы как: </div>
            {allRoles.map((item, index) => (
              <span className={userRole === index ? ' span active' : 'span'} key={index}>
                {item}
              </span>
            ))}
          </div>
          <div className="profileBlock__item">
            <div className="profileBlock-item__title">
              <span className="link">Нажмите</span> чтобы увидеть больше информации о ролевых
              системах
            </div>
          </div>
          <div className={userVerified ? 'profileBlock__item disNone' : 'profileBlock__item'}>
            <div className="profileBlock-item__title">
              Вы можете:
              <NavLink to="/signIn" className="link">
                войти
              </NavLink>
              <span> или </span>
              <NavLink to="/signUp" className="link">
                зарегистрироваться
              </NavLink>
            </div>
          </div>
          <div className={userVerified ? 'profileBlock__item' : 'profileBlock__item disNone'}>
            <div className="profileBlock-item__title">
              <span className="link" onClick={onExitClick}>
                Выйти
              </span>{' '}
              из аккаунта
            </div>
          </div>
        </ul>
      </div>
    </div>
  );
};
