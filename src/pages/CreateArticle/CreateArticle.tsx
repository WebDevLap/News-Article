import React from 'react';
import { ErrorText } from '../../components/ErrorText';
import { useAppSelector } from '../../store/store';
import { CreateArticleForm } from './components/CreateArticleForm';

export const CreateArticle = () => {
  const role = useAppSelector(state => state.user.role);

  return (
    <div className="createArticle">
      <div className="createArticle__container _container">
        {role < 2 ? <ErrorText /> : <CreateArticleForm />}
      </div>
    </div>
  );
};
