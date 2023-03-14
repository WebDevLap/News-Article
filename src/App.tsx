import React from 'react';
import { Header } from './components/Header/Header';
import { Routes, Route } from 'react-router-dom';
import { SignInPage } from './pages/SignInPage/SignInPage';
import { Navigate } from 'react-router-dom';
import { SignUpPage } from './pages/SignUpPage/SignUpPage';
import { MainPage } from './pages/MainPage/MainPage';
import { FullCard } from './pages/FullCard/FullCard';
import { CreateArticle } from './pages/CreateArticle/CreateArticle';
import { SettingsPage } from './pages/SettingsPage/SettingsPage';
import { useLogicForSigns } from './utils/useLogicForSigns';
import { useAppSelector } from './store/store';
import { WaitModal } from './components/WaitModal/WaitModal';

export const App: React.FC = () => {
  const userVerified = useAppSelector(state => state.user.verified)
  const [waitModal, setWaitModal] = React.useState<boolean>(false)
  useLogicForSigns(setWaitModal)  

  return (
    <div className="wrapper">
      <WaitModal state={waitModal}/>
      <Header />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/SignIn" element={userVerified ? <Navigate to="/" /> : <SignInPage />} />
        <Route path="/signUp" element={userVerified ? <Navigate to="/" /> : <SignUpPage />} />
        <Route path="/fullCard" element={<FullCard />} />
        <Route path="/createArticle" element={<CreateArticle />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Routes>
    </div>
  );
};
