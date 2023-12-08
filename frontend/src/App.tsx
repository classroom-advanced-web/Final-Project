import { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

import './App.css';
import Header from './components/header/Header';
import LoadingOverlay from './components/loading/LoadingOverlay';
import LoadingPage from './components/loading/LoadingPage';
import PrivateRoute from './components/private-route/PrivateRoute';
import NotFoundPage from './pages/not-found/NotFoundPage';
import ClassPage from './pages/class/ClassPage';

const HomePage = lazy(() => import('./pages/home/HomePage'));
const SignUpPage = lazy(() => import('./pages/sign-up/SignUpPage'));
const LoginPage = lazy(() => import('./pages/login/LoginPage'));
const LandingPage = lazy(() => import('./pages/landing/LandingPage'));
const ProfilePage = lazy(() => import('./pages/profile/ProfilePage'));
const ForgotPasswordPage = lazy(() => import('./pages/forgot-password/ForgotPassword'));
const RedeemOTPPage = lazy(() => import('./pages/profile/otp/RedeemOTP'));
const ResetPasswordPage = lazy(() => import('./pages/forgot-password/ResetPassword'));

function App() {
  return (
    <div>
      <Header />
      <Suspense fallback={<LoadingPage />}>
        <Routes>
          <Route
            path='/'
            element={
              <PrivateRoute>
                <HomePage />
              </PrivateRoute>
            }
          />
          <Route
            path='/class/:id'
            element={
              <PrivateRoute>
                <ClassPage />
              </PrivateRoute>
            }
          />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/sign-up' element={<SignUpPage />} />
          <Route path='/landing' element={<LandingPage />} />
          <Route path='/profile' element={<ProfilePage />} />
          <Route path='/forgot-password' element={<ForgotPasswordPage />} />
          <Route path='/redeem' element={<RedeemOTPPage />} />
          <Route path='/forgot-password/reset' element={<ResetPasswordPage />} />

          <Route path='*' element={<NotFoundPage />} />
        </Routes>
      </Suspense>
      <LoadingOverlay />
    </div>
  );
}

export default App;
