import { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

import './App.css';
import Header from './components/header/Header';
import LoadingOverlay from './components/loading/LoadingOverlay';
import LoadingPage from './components/loading/LoadingPage';
import PrivateRoute from './components/private-route/PrivateRoute';
import NotFoundPage from './pages/not-found/NotFoundPage';
import InvitePage from './pages/invite/InvitePage';
import ClassLayout from './components/layout/ClassLayout';
import AdminClassroom from './components/admin/classroom/AdminClassroom';

const HomePage = lazy(() => import('./pages/home/HomePage'));
const SignUpPage = lazy(() => import('./pages/sign-up/SignUpPage'));
const LoginPage = lazy(() => import('./pages/login/LoginPage'));
const LandingPage = lazy(() => import('./pages/landing/LandingPage'));
const ProfilePage = lazy(() => import('./pages/profile/ProfilePage'));
const ForgotPasswordPage = lazy(() => import('./pages/forgot-password/ForgotPassword'));
const RedeemOTPPage = lazy(() => import('./pages/profile/otp/RedeemOTP'));
const ResetPasswordPage = lazy(() => import('./pages/forgot-password/ResetPassword'));
const ClassPage = lazy(() => import('./pages/class/ClassPage'));
const StructurePage = lazy(() => import('./pages/structure/StructurePage'));
const PeoplePage = lazy(() => import('./pages/people/PeoplePage'));
const StudentListPage = lazy(() => import('./pages/student-list/StudentListPage'));
const GradesPage = lazy(() => import('./pages/grades/GradesPage'));
const InviteLinkPage = lazy(() => import('./pages/invite-link/InviteLinkPage'));
const GradesReviewPage = lazy(() => import('./pages/grades/GradesReviewPage'));
const AdminLayout = lazy(() => import('./pages/admin/AdminLayout'));
const AdminUser = lazy(() => import('./components/admin/user/AdminUser'));

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
            path='/admin/user'
            element={
              <PrivateRoute>
                <AdminLayout>
                  <AdminUser />
                </AdminLayout>
              </PrivateRoute>
            }
          />
          <Route
            path='/admin/classroom'
            element={
              <PrivateRoute>
                <AdminLayout>
                  <AdminClassroom/>
                </AdminLayout>
              </PrivateRoute>
            }
          />
          <Route path='/invite-link' element={<InviteLinkPage />} />
          <Route path='/invite' element={<InvitePage />} />

          <Route
            path='/class/:id'
            element={
              <PrivateRoute>
                <ClassLayout page='stream'>
                  <ClassPage />
                </ClassLayout>
              </PrivateRoute>
            }
          />
          <Route
            path='/structure/:id'
            element={
              <PrivateRoute>
                <ClassLayout page='structure'>
                  <StructurePage />
                </ClassLayout>
              </PrivateRoute>
            }
          />
          <Route
            path='/people/:id'
            element={
              <PrivateRoute>
                <ClassLayout page='people'>
                  <PeoplePage />
                </ClassLayout>
              </PrivateRoute>
            }
          />
          <Route
            path='/grades/:id'
            element={
              <PrivateRoute>
                <ClassLayout page='grades'>
                  <GradesPage />
                </ClassLayout>
              </PrivateRoute>
            }
          />

          <Route
            path='/grades-review/:id'
            element={
              <PrivateRoute>
                <ClassLayout page='grades'>
                  <GradesReviewPage />
                </ClassLayout>
              </PrivateRoute>
            }
          />
          <Route
            path='/student-list/:id'
            element={
              <PrivateRoute>
                <ClassLayout page='student-list'>
                  <StudentListPage />
                </ClassLayout>
              </PrivateRoute>
            }
          />

          <Route
            path='/grades-review/:id/:gradeReviewId'
            element={
              <PrivateRoute>
                <ClassLayout page='grades'>
                  <GradesReviewPage />
                </ClassLayout>
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
