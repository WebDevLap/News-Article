import { FC } from 'react';
import { Header } from './components/Header/Header';
import { Routes, Route } from 'react-router-dom';
import { SignInPage } from './pages/SignInPage/SignInPage';
import { useAppSelector } from './store/store';
import { Navigate } from 'react-router-dom';
import { SignUpPage } from './pages/SignUpPage/SignUpPage';
import { MainPage } from './pages/MainPage/MainPage';
import { FullCard } from './pages/FullCard/FullCard';
import { CreateArticle } from './pages/CreateArticle/CreateArticle';


export const App: FC = () => {
  const isUserVerified = useAppSelector(state => state.user.verified);

  return (
    <div className="wrapper">
      <Header />
      <Routes>
        <Route path='/' element={<MainPage/>}/>
        <Route path="/SignIn" element={isUserVerified ? <Navigate to='/' /> : <SignInPage/>} />
        <Route path='/signUp' element={isUserVerified ? <Navigate to='/' /> : <SignUpPage/>}/>
        <Route path='/fullCard' element={<FullCard/>}/>
        <Route path='/createArticle' element={<CreateArticle/>} />
      </Routes>
    </div>
  );
};
