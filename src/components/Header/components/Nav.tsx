import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import { useAppSelector } from '../../../store/store';
import { AdminPanel } from '../../AdminPanel/AdminPanel';

type NavItemType = {
  item: string | JSX.Element;
  link: string;
};

type NavProps = {
  burgerIsActive: boolean;
  setBurgerIsActive: (value: boolean) => void;
};

export const Nav: FC<NavProps> = ({ burgerIsActive, setBurgerIsActive }) => {
  const navItems: NavItemType[] = [
    { item: 'Главная', link: '/' },
    { item: 'Настройки', link: '/settings' },
  ];
  const isUserVerified = useAppSelector((state) => state.user.verified);
  const userRole = useAppSelector((state) => state.user.role);
  return (
    <nav
      className={burgerIsActive ? 'header__nav nav active' : 'header__nav nav'}
      onClick={(e) => e.stopPropagation()}>
      <ul className="nav__list">
        {userRole > 1 && (
          <li className="nav__item">
            <div>
              <AdminPanel setBurgerIsActive={setBurgerIsActive}/>
            </div>
          </li>
        )}
        {navItems.map((item, index) => (
          <li className="nav__item" key={index}>
            <NavLink to={item.link} className="nav__link" onClick={() => setBurgerIsActive(false)}>
              {item.item}
            </NavLink>
          </li>
        ))}

        {!isUserVerified && (
          <li className="nav__item">
            <NavLink to="/SignIn" className="nav__link" onClick={() => setBurgerIsActive(false)}>
              Войти
            </NavLink>
          </li>
        )}
      </ul>
    </nav>
  );
};
