import {FC} from 'react'
import { SignInBlock } from './components/SignInBlock'

export const SignInPage: FC = () => {
  return (
    <section className="signIn">
      <div className="signIn__container _container">
        <SignInBlock/>
      </div>
    </section>
  )
}
