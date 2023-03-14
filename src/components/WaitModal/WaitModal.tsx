import {useEffect, FC} from 'react'

interface IWaitingModal {
  state: boolean;
}

export const WaitModal: FC<IWaitingModal> = ({state}) => {

  return (
    <div className={state ? "waitModal active" : "waitModal"}>
      <div className="waitModal__container">
        <div className="waitModal__title">Ожидание сервера...</div>
        <div className="waitModal__circle"></div>
      </div>
    </div>
  )
}
