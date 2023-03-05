import { MainCard } from './components/MainCard';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';

type ArticleType = {
  title: string;
  subtitle: string;
  imageUrl: string;
};

export const MainPage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [articles, setArticles] = useState<ArticleType[]>();

  useEffect(() => {
    setIsLoading(true);
    axios
      .get('https://6403387ef61d96ac487a1e4d.mockapi.io/articles')
      .then((res) => res.data)
      .then((json) => setArticles(json))
      .then(() => setIsLoading(false))
  }, []);

  return (
    <div className="mainPage">
      <div className="mainPage__container _container">
        {articles ?
          articles.map((item, index) => (
            <MainCard
              key={index}
              title={item.title}
              subtitle={item.subtitle}
              imageUrl={item.imageUrl}
            />
          )) : <span></span>}
      </div>
    </div>
  );
};
