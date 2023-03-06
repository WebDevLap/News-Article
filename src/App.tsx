import { FC, useState, useEffect } from 'react';
import { Header } from './components/Header/Header';
import { Routes, Route } from 'react-router-dom';
import { SignInPage } from './pages/SignInPage/SignInPage';
import { useAppSelector } from './store/store';
import { Navigate } from 'react-router-dom';
import { SignUpPage } from './pages/SignUpPage/SignUpPage';
import { MainPage } from './pages/MainPage/MainPage';
import { FullCard } from './pages/FullCard/FullCard';
import { CreateArticle } from './pages/CreateArticle/CreateArticle';
import { SettingsPage } from './pages/SettingsPage/SettingsPage';

export const App: FC = () => {

  // saving user data on local storage after singing in
  const userName = useAppSelector((state) => state.user.name);
  const userRole = useAppSelector((state) => state.user.role);
  const userVerified = useAppSelector((state) => state.user.verified);
  const [isMountedLS, setIsMountedLS] = useState<boolean>(false);

  useEffect(() => {
    if (isMountedLS) {
      const jsons = JSON.stringify({ userName, userRole, userVerified });
      localStorage.setItem('userData', jsons);
    }
    setIsMountedLS(true);
  }, [userName, userRole, userVerified]);

  return (
    <div className="wrapper">
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
