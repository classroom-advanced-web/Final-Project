import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";

import "./App.css";
import Header from "./components/header/Header";
import PrivateRoute from "./components/private-route/PrivateRoute";
import LoadingPage from "./components/loading/LoadingPage";
import NotFoundPage from "./pages/not-found/NotFoundPage";

const HomePage = lazy(() => import("./pages/home/HomePage"));
const SignUpPage = lazy(() => import("./pages/sign-up/SignUpPage"));
const LoginPage = lazy(() => import("./pages/login/LoginPage"));
const LandingPage = lazy(() => import("./pages/landing/LandingPage"));
const ProfilePage = lazy(() => import("./pages/profile/ProfilePage"));

function App() {
  return (
    <div>
      <Header />
      <Suspense fallback={<LoadingPage />}>
        <Routes>
          <Route
            path="/"
            element={
              <PrivateRoute>
                <HomePage />
              </PrivateRoute>
            }
          />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/sign-up" element={<SignUpPage />} />
          <Route path="/landing" element={<LandingPage />} />

          <Route path="/profile" element={<ProfilePage />} />

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
