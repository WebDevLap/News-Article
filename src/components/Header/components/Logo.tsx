import { FC } from 'react';
import { NavLink } from 'react-router-dom';

export const Logo: FC = () => {
  return (
    <NavLink to="/" className="header__logo" translate='no'>
      <img
        className="header-logo__img"
        src="https://cdn-icons-png.flaticon.com/128/282/282733.png"
        alt=""
      />
      <p className="header-logo__text">News Article</p>
    </NavLink>
  );
};
