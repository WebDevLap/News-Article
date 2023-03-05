import React from 'react'
import { useAppSelector } from '../../store/store'
import { CreateArticleForm } from './components/CreateArticleForm'

export const CreateArticle = () => {
  const role = useAppSelector(state => state.user.role)

  return (
    <div className="createArticle">
      <div className="createArticle__container _container">
        {
          role < 2 ? <div className="error-title">Извините но у вас нету доступа к этой странице</div> : <CreateArticleForm/>
        }
      </div>
    </div>
  )
}
