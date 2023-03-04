import {FC} from 'react';

type BurgerMenuProps = {
  setBurgerIsActive: (value: boolean) => void;
}

export const BurgerMenu: FC<BurgerMenuProps> = ({setBurgerIsActive}) => {
  return (
    <div
      className="header__burger-menu"
      onClick={(e) => {
        setBurgerIsActive(true);
        e.stopPropagation();
      }}>
      <span></span>
      <span></span>
      <span></span>
    </div>
  );
};
