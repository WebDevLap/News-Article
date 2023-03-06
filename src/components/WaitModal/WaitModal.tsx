import {useEffect, FC} from 'react'

interface IWaitingModal {
  state: boolean;
}

export const WaitModal: FC<IWaitingModal> = ({state}) => {

  useEffect(() => {
    if(state){
      document.body.classList.add('poinerEventsNone')
      document.body.classList.add('hidden')
    } else{
      document.body.classList.remove('poinerEventsNone')
      document.body.classList.remove('hidden')
    }

    function removeAllClassList(){
      document.body.classList.remove('poinerEventsNone')
      document.body.classList.remove('hidden')
    }

    return removeAllClassList()
  }, [state])

  return (
    <div className={state ? "waitModal active" : "waitModal"}>
      <div className="waitModal__container">
        <div className="waitModal__title">Ожидание сервера...</div>
        <div className="waitModal__circle"></div>
      </div>
    </div>
  )
}
