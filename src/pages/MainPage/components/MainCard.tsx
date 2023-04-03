import { NavLink } from 'react-router-dom';
import { FC } from 'react';

type MainCardProps = {
  title: string;
  subtitle: string;
  imageUrl: string;
  id: string;
  disabled?: boolean;
};

export const MainCard: FC<MainCardProps> = ({
  id,
  title,
  subtitle,
  imageUrl,
  disabled,
}) => {
  return (
    <div className="mainCard">
      <div className="mainCard__container">
        <div className="mainCard__imageUrl">
          <img src={imageUrl} alt="" />
        </div>
        <h2 className="mainCard__title">{title}</h2>
        <p className="mainCArd__subtitle">{subtitle}</p>
        {disabled ? (
          <button disabled={true} className="mainCard__readMore">
            Перейти
          </button>
        ) : (
          <NavLink to={`/fullCard/${id}`} className="mainCard__readMore">
            Перейти
          </NavLink>
        )}
      </div>
    </div>
  );
};
