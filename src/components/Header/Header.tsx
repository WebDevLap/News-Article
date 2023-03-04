import { FC, useState, useEffect } from 'react';
import { BurgerMenu } from './components/BurgerMenu';
import { Logo } from './components/Logo';
import { Nav } from './components/Nav';

export const Header: FC = () => {
  const [burgerIsActive, setBurgerIsActive] = useState<boolean>(false);

  useEffect(() => {
    if (burgerIsActive) {
      document.body.classList.add('hidden');
    } else {
      document.body.classList.remove('hidden');
    }
  }, [burgerIsActive]);

  useEffect(() => {
    function bodyHandler() {
      setBurgerIsActive(false);
    }

    document.body.addEventListener('click', bodyHandler);
  }, []);

  return (
    <section className="header">
      <div className="header__container _container">
        <Logo />
        <BurgerMenu setBurgerIsActive={setBurgerIsActive} />
        <Nav burgerIsActive={burgerIsActive} setBurgerIsActive={setBurgerIsActive} />
      </div>
    </section>
  );
};
