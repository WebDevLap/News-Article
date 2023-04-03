import axios from 'axios';
import React from 'react';
import { MainCard } from '../../MainPage/components/MainCard';
import { WaitModal } from '../../../components/WaitModal/WaitModal';
import { useNavigate, useLocation } from 'react-router-dom';
import qs from 'qs';

export const CreateArticleForm = () => {
  const [imageUrl, setImageUrl] = React.useState<string>('');
  const [title, setTitle] = React.useState<string>('');
  const [subtitle, setSubitle] = React.useState<string>('');

  const navigate = useNavigate();
  const location = useLocation();
  const [waitModal, setWaitModal] = React.useState<boolean>(false);

  const [stringifeQsIsMounted, setStringifeQsIsMounted] =
    React.useState<boolean>(false);


  async function submitCard() {
    try {
      setWaitModal(true);
      const addArticle = await axios.post(
        'https://6403387ef61d96ac487a1e4d.mockapi.io/articles',
        {
          title: title,
          subtitle: subtitle,
          imageUrl: imageUrl,
        },
      );
      setWaitModal(false);
      alert('Изменения сохранены');
      navigate('/');
    } catch (err) {
      setTimeout(
        () => alert(`Ошибка! Добавить статью не удалось. код ошибки:\n${err}`),
        100,
      );
    } finally {
      setWaitModal(false);
    }
  }

  React.useEffect(() => {
    if (location.search) {
      const params = qs.parse(location.search.substring(1));
      setImageUrl(String(params.imageUrl));
      setTitle(String(params.title));
      setSubitle(String(params.subtitle));
      console.log(subtitle, title, imageUrl);
    }
  }, []);

  React.useEffect(() => {
    if (!stringifeQsIsMounted) {
      setStringifeQsIsMounted(true);
      return;
    }
    const queryString = qs.stringify({
      imageUrl,
      title,
      subtitle,
    });
    navigate(`?${queryString}`);
  }, [imageUrl, title, subtitle]);

  return (
    <div className="createArticleForm">
      <div className="createArticleForm__container">
        <WaitModal state={waitModal} />
        <div className="articleForm">
          <div className="signInBlock__container">
            <h2 className="signInBlock__title">Режим создания статьи</h2>
            <div className="signInBlock__notFoundUser"></div>
            <div className="signInBlock__content">
              <h3 className="signInBlock-content__title">URL картинки</h3>
              <div className="signInBlock-content__input">
                <input
                  onChange={e => setImageUrl(e.target.value)}
                  value={imageUrl}
                />
              </div>
            </div>
            <div className="signInBlock__content">
              <h3 className="signInBlock-content__title">Название статьи</h3>
              <div className="signInBlock-content__input">
                <input onChange={e => setTitle(e.target.value)} value={title} />
              </div>
            </div>
            <div className="signInBlock__content">
              <h3 className="signInBlock-content__title">Текст для статьи</h3>
              <textarea
                onChange={e => setSubitle(e.target.value)}
                value={subtitle}
              ></textarea>
            </div>
            <button className="signInBlock__submit" onClick={submitCard}>
              Отправить
            </button>
          </div>
        </div>
        <div className="showTheArticle">
          <MainCard
            id="-1"
            disabled
            title={title}
            subtitle={subtitle}
            imageUrl={imageUrl}
          />
        </div>
      </div>
    </div>
  );
};
