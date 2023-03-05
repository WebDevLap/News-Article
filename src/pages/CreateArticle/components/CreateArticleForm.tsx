import axios from 'axios';
import { useState } from 'react';
import { MainCard } from '../../MainPage/components/MainCard';

export const CreateArticleForm = () => {
  const [imageUrl, setImageUrl] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [subtitle, setSubitle] = useState<string>('');

  function submitCard() {
    axios.post('https://6403387ef61d96ac487a1e4d.mockapi.io/articles', {
      titls: title,
      subtitle: subtitle,
      imageUrl: imageUrl,
    }).then(() => alert('Изменения сохранены'))
  }

  return (
    <div className="createArticleForm">
      <div className="createArticleForm__container">
        <div className="articleForm">
          <div className="signInBlock__container">
            <h2 className="signInBlock__title">Режим создания статьи</h2>
            <div className="signInBlock__notFoundUser"></div>
            <div className="signInBlock__content">
              <h3 className="signInBlock-content__title">URL картинки</h3>
              <div className="signInBlock-content__input">
                <input onChange={(e) => setImageUrl(e.target.value)} />
              </div>
            </div>
            <div className="signInBlock__content">
              <h3 className="signInBlock-content__title">Название статьи</h3>
              <div className="signInBlock-content__input">
                <input onChange={(e) => setTitle(e.target.value)} />
              </div>
            </div>
            <div className="signInBlock__content">
              <h3 className="signInBlock-content__title">Текст для статьи</h3>
              <textarea onChange={(e) => setSubitle(e.target.value)}></textarea>
            </div>
            <button className="signInBlock__submit" onClick={submitCard}>
              Отправить
            </button>
          </div>
        </div>
        <div className="showTheArticle">
          <MainCard title={title} subtitle={subtitle} imageUrl={imageUrl} />
        </div>
      </div>
    </div>
  );
};
