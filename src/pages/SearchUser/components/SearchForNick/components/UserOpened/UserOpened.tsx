import React from 'react'
import s from './UserOpened.module.scss'

type UserOpenedType = {
  isOpen: boolean;
}

export const UserOpened: React.FC<UserOpenedType> = ({isOpen}) => {
  return (
    <div className={isOpen ? `${s.userOpened} ${s.active}` : s.userOpened}>
      <div className={s.userOpened__container}>
        
      </div>
    </div>
  )
}
