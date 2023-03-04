import {FC} from 'react'
import { Header } from './components/Header/Header';
import {Routes, Route} from 'react-router-dom'
import { SignInPage } from './pages/SignInPage/SignInPage';

export const App: FC = () => {
  return (
    <div className="wrapper">
      <Header/>
      <Routes>
        <Route path='/SignIn' element={<SignInPage/>}/>
      </Routes>
    </div>
  );
}