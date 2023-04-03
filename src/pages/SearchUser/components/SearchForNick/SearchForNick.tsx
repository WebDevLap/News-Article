import axios from 'axios';
import React from 'react';
import { useAppSelector } from '../../../../store/store';
import s from './SearchForNick.module.scss';

interface IUser {
  name: string;
  mail: string;
  role: string;
  id: string;
}

type TitleValueType = {
  name: string;
  value: string;
};

export const SearchForNick: React.FC = () => {
  const [name, setName] = React.useState<string>('');
  const [users, setUsers] = React.useState<IUser[]>([]);
  const [waiting, setWaiting] = React.useState<boolean>(true);
  const [submitIsWaiting, setSubmitIsWaiting] = React.useState<boolean>(false);

  const [titleMenuIsActive, setTitleMenuIsActive] =
    React.useState<boolean>(false);
  const [titleActiveValue, setTitleActiveValue] = React.useState<number>(0);

  const [pageXY, setPageXY] = React.useState<[number, number]>([0, 0]);
  const [isContextOpen, setIsContextOpen] = React.useState<boolean>(false);
  const [activeContextValue, setActiveContextValue] = React.useState<number>(0);
  // const [btnRoles, setBtnRoles] = React.useState<number>(0)

  const btnRoles: string[] = [
    'Назначить читателем',
    'Назначить писателем',
    'Назначить модератором',
    'Назначить администратором',
  ];

  const parentRef = React.useRef<HTMLDivElement>(null);
  const allRoles = useAppSelector(state => state.user.allRoles);
  const userRole = useAppSelector(state => state.user.role);

  React.useEffect(() => {
    function HandleClick() {
      setIsContextOpen(false);
    }
    if (!parentRef.current) return;
    parentRef.current.addEventListener('click', HandleClick);

    return () => {
      if (!parentRef.current) return;
      parentRef.current.removeEventListener('click', HandleClick);
    };
  }, []);

  const titleValues: TitleValueType[] = [
    {
      name: 'имени',
      value: 'name',
    },
    {
      name: 'почте',
      value: 'mail',
    },
  ];

  async function getApi() {
    try {
      const { data: usersApi } = await axios.get(
        `https://6403387ef61d96ac487a1e4d.mockapi.io/users?${titleValues[titleActiveValue].value}=${name}`,
      );
      setUsers(usersApi);
    } catch (err) {
      console.error(err);
    } finally {
      setWaiting(false);
    }
  }

  function titleMenuItemClick(index: number) {
    setTitleActiveValue(index);
    setTitleMenuIsActive(false);
  }
  function onClickUser(e: any, index: number) {
    e.stopPropagation();
    setIsContextOpen(!isContextOpen);
    setPageXY([e.pageX, e.pageY]);
    setActiveContextValue(index);
  }
  function submitClick() {
    if (submitIsWaiting) return;
    setSubmitIsWaiting(true);
    setTimeout(() => setSubmitIsWaiting(false), 1000);
    setWaiting(true);
    getApi();
  }
  function isContextBtnDisabl(index: number): boolean {
    if (index + 1 === +users[activeContextValue]?.role) {
      return true;
    } else if (userRole <= index + 1) {
      return true;
    }
    return false;
  }

  async function onSetRoleClick(index: number) {
    try {
      const setUserRole = await axios.put(
        `https://6403387ef61d96ac487a1e4d.mockapi.io/users/${users[activeContextValue].id}`,
        {
          id: users[activeContextValue].id,
          role: index + 1,
        },
      );
      alert('Роль успешно изменена');
      getApi();
    } catch (err) {
      alert(`Ошибка! Изменить роль не удалось. код ошибки:\n${err}`);
    }
  }

  React.useEffect(() => {
    setWaiting(true);
    getApi();
  }, [titleActiveValue]);

  return (
    <div className={s.searchForNick} ref={parentRef}>
      <div className={s.searchForNick__content}>
        <div className={s.searchForNick__title}>
          <div className={s.name}>
            Поиск по{' '}
            <span
              className="link"
              onClick={() => setTitleMenuIsActive(() => !titleMenuIsActive)}
            >
              {titleValues[titleActiveValue].name}
            </span>
          </div>
          <div className={titleMenuIsActive ? `${s.menu} ${s.active}` : s.menu}>
            {titleValues.map((item, index) => (
              <div
                onClick={() => titleMenuItemClick(index)}
                className={
                  titleActiveValue === index ? `${s.menuItem} link` : s.menuItem
                }
                key={index}
              >
                {item.name}
              </div>
            ))}
          </div>
        </div>
        <div className={s.searchForNick__inputArea}>
          <div className={s.searchForNick__input}>
            <input
              type="text"
              onChange={e => setName(e.target.value)}
              value={name}
            />
          </div>
          <button
            className={s.btn}
            onClick={submitClick}
            disabled={submitIsWaiting}
          >
            Применить
          </button>
        </div>
        <div
          className={
            isContextOpen
              ? `${s.searchForNick__contextmenu} ${s.active}`
              : s.searchForNick__contextmenu
          }
          style={{ left: pageXY[0] + 50, top: pageXY[1] }}
        >
          <div className="">для пользователя:</div>
          <div className="">
            Ник: <span>{users[activeContextValue]?.name}</span>
          </div>
          <div className="">
            Почта: <span>{users[activeContextValue]?.mail}</span>
          </div>
          <div className="">
            Роль: <span>{allRoles[+users[activeContextValue]?.role]}</span>
          </div>
          <div className={s.buttons}>
            {+users[activeContextValue]?.role >= userRole ? (
              <button
                onClick={() =>
                  alert(
                    'Изменения для пользователей с ролью выше; равным вашему или своему аккаунту изменения не доступны',
                  )
                }
              >
                Изменения недоступны
              </button>
            ) : (
              btnRoles.map((item, index) => (
                <button
                  key={index}
                  disabled={isContextBtnDisabl(index)}
                  onClick={() => onSetRoleClick(index)}
                >
                  {item}
                </button>
              ))
            )}
          </div>
        </div>
        <div className={s.searchForNick__users}>
          <div
            className={waiting ? `${s.waiting} ${s.active}` : s.waiting}
          ></div>
          {!users.length ? (
            <div>Найденных совпадений нет</div>
          ) : (
            users.map((item, index) => (
              <div
                className={s.userItem}
                key={index}
                onClick={e => onClickUser(e, index)}
              >
                <div className={s.userItem__text}>
                  Nickname: <span>{item.name}</span>
                </div>
                <div className={s.userItem__text}>
                  Mail: <span>{item.mail}</span>
                </div>
                <div className={s.userItem__text}>
                  Role:{' '}
                  <span>
                    {allRoles[+item.role]}({item.role})
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
