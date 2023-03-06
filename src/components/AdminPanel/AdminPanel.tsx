import { FC, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useAppSelector } from '../../store/store';

type adminItemType = {
  name: string;
  role: number;
  link: string;
};

interface IAdminPanel {
  setBurgerIsActive?: (value: boolean) => void;
}

export const AdminPanel: FC<IAdminPanel> = ({setBurgerIsActive = () => {}}) => {
  const [panesIsActive, setPanesIsActive] = useState<boolean>(false)

  const adminItems: adminItemType[] = [
    {
      name: 'Создать статью',
      role: 2,
      link: '/createArticle',
    },
    {
      name: 'Найти пользователя',
      role: 3,
      link: '/searchUser',
    },
  ];

  const userRole = useAppSelector(state => state.user.role);

  return (
    <div className="adminPanel" onMouseEnter={() => setPanesIsActive(true)} onMouseLeave={() => setPanesIsActive(false)}>
      <div className="adminPanel__title">Админ панель</div>
      <div className={panesIsActive ? "adminPanel__container active" : "adminPanel__container"}>
        <ul className="adminPanel__list">
          {adminItems.map((item, index) => (
            <NavLink to={item.link} className={userRole >= item.role ? "adminPanel__item" : "adminPanel__item disabled"} onClick={() => {setBurgerIsActive(false); setPanesIsActive(false)}} key={index}>{item.name}</NavLink>
          ))}
        </ul>
      </div>
    </div>
  );
};
