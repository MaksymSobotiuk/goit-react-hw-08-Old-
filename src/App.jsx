
import 'modern-normalize';
import s from './App.module.css';
import { Suspense, lazy, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsRefreshing } from './redux/auth/selectors';
import { RestrictedRoute } from './RestrictedRoute';
import { PrivateRoute } from './PrivateRoute';
import Layout from './Layout';
import { ThreeCircles } from 'react-loader-spinner';


const HomePage = lazy(() => import('./pages/HomePage/HomePage'));
const ContactsPage = lazy(() => import('./pages/ContactsPage/ContactsPage'));
const RegistrationPage = lazy(() => import('./pages/ RegistrationPage/RegistrationPage'));
const LoginPage = lazy(() => import('./pages/LoginPage/LoginPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage/NotFoundPage'));

const App = () => {
  // const dispatch = useDispatch();
  // const { isRefreshing } = useSelector(selectIsRefreshing);

  // useEffect(() => {
  //   dispatch(refreshUser());
  // }, [dispatch]);
  // return isRefreshing ? (
  //   <b>Refreshing user...</b>
  // ) : (
  return (
    <Suspense fallback={<div className={s.loader}>
      <ThreeCircles
        visible={true}
        height="50"
        width="50"
        color="#CD00CD"
        ariaLabel="three-circles-loading"
        wrapperStyle={{}
        }
        wrapperClass=""
      />
    </div>}>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route
            path="contacts"
            element={
              <PrivateRoute redirectTo="/login" component={<ContactsPage />} />
            }
          />
          <Route
            path="register"
            element={
              <RestrictedRoute redirectTo="/contacts" component={<RegistrationPage />} />
            }
          />

          <Route
            path="login"
            element={
              <RestrictedRoute redirectTo="/contacts" component={<LoginPage />} />
            }
          />
          <Route path='*' element={<NotFoundPage />} />
        </Route>

      </Routes>
    </Suspense>
  );
};

export default App;

