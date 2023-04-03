import React from 'react'
import { ErrorText } from '../../components/ErrorText'
import { useAppSelector } from '../../store/store'
import { SearchForNick } from './components/SearchForNick/SearchForNick'
import s from './SearchUser.module.scss'

export const SearchUser: React.FC = () => {
  const userRole = useAppSelector(state => state.user.role)
  if(userRole <= 2) return <ErrorText/>
  return (
    <div className={s.searchUser}>
      <div className={`${s.searchUser__container} _container`}>
        <div className={s.searchUser__searches}>
          <SearchForNick/>
        </div>
      </div>
    </div>
  )
}