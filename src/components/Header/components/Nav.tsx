import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import { useAppSelector } from '../../../store/store';

type NavItemType = {
  item: string;
  link: string;
};

type NavProps = {
  burgerIsActive: boolean;
  setBurgerIsActive: (value: boolean) => void;
};

export const Nav: FC<NavProps> = ({ burgerIsActive, setBurgerIsActive }) => {
  const navItems: NavItemType[] = [
    { item: 'Главная', link: '/' },
    { item: 'Войти', link: '/SignIn' },
    { item: 'И еще', link: '/r' },
  ];

  const userRole = useAppSelector((state) => state.user.role);
  return (
    <nav
      className={burgerIsActive ? 'header__nav nav active' : 'header__nav nav'}
      onClick={(e) => e.stopPropagation()}>
      <ul className="nav__list">
        {navItems.map((item, index) => (
          <li className="nav__item" key={index}>
            <NavLink to={item.link} className="nav__link" onClick={() => setBurgerIsActive(false)}>
              {item.item}
            </NavLink>
          </li>
        ))}
        {userRole === 'mainAdmin' && (
          <li className="nav__item">
            <NavLink
              to="/createArticle"
              className="nav__link"
              onClick={() => setBurgerIsActive(false)}>
              Создать статью
            </NavLink>
          </li>
        )}
      </ul>
    </nav>
  );
};
