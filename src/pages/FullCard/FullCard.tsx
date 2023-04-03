import axios from 'axios';
import React from 'react';
import { useParams } from 'react-router-dom';
import s from './FullCard.module.scss';

export const FullCard = () => {
  const params = useParams();
  const [imageUrl, setImageUrl] = React.useState<string>('');
  const [title, setTitle] = React.useState<string>('');
  const [subtitle, setSubtitle] = React.useState<string>('');

  React.useEffect(() => {
    axios
      .get(`https://6403387ef61d96ac487a1e4d.mockapi.io/articles?id=${params.id}`)
      .then((res) => res.data)
      .then((json) => {
        setImageUrl(json[0].imageUrl);
        setTitle(json[0].title);
        setSubtitle(json[0].subtitle);
      });
  }, []);

  return (
    <div className={s.fullCard}>
      <div className={`${s.fullCard__container} _container`}>
        <h2 className={s.fullCard__title}>{title}</h2>
        <div className={s.fullCard__content}>
          <div className={s.fullCard__image}>
            <img src={imageUrl} alt="" />
          </div>
          <div className={s.fullCard__subtitle}>{subtitle}</div>
        </div>
      </div>
    </div>
  );
};
