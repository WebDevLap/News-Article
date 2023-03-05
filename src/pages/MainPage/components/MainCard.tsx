import { NavLink } from "react-router-dom";
import {FC} from 'react'

type MainCardProps = {
  title: string;
  subtitle: string;
  imageUrl: string;
}

export const MainCard: FC<MainCardProps> = ({title, subtitle, imageUrl}) => {
  return (
    <div className="mainCard">
      <div className="mainCard__container">
        <div className="mainCard__imageUrl">
          <img
            src={imageUrl}
            alt=""
          />
        </div>
        <h2 className="mainCard__title">{title}</h2>
        <p className="mainCArd__subtitle">
          {subtitle}
        </p>
        <NavLink to='/fullCard' className="mainCard__readMore">Перейти</NavLink>
      </div>
    </div>
  );
};
