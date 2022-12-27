import Admin from '../Admin/Admin';
import Instructor from '../Instructor/Instructor';
import {
  BrowserRouter,
  redirect,
  Route,
  Routes,
  useParams,
} from 'react-router-dom';

import './Homepage.scss';
import Trainee from '../Trainee/Trainee';

import PasswordReset from '../../components/PasswordReset/PasswordReset';
import SignUp from '../SignUp/SignUp';
import SignIn from '../SignIn/SignIn';

import RequireAuth from '../RequireAuth/RequireAuth';
import Admin from "../Admin/Admin";
import Instructor from "../Instructor/Instructor";
import { BrowserRouter, Route, Routes, useParams } from "react-router-dom";
// import Dashboard from './../../components/Dashboard/Dashboard';
// import Sidebar from './../../components/Sidebar/Sidebar';
import "./Homepage.scss";
import Trainee from "../Trainee/Trainee";
import PasswordForm from "../../components/PasswordForm/PasswordForm";
import PasswordReset from "../../components/PasswordReset/PasswordReset";
import LandingPage from "../../components/LandingPage/LandingPage";
import Guest from "../../components/Guest/Guest";
const Homepage = () => {
  // const { auth, updateAuth } = useContext(AuthContext);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/" element={<LandingPage />} />
        <Route path="/guest/*" element={<Guest />} />
        <Route path="/change-password/:id/:type" element={<PasswordReset />} />
        <Route path="/admin" element={<Admin />} />
        <Route
          path="/instructor/*"
          element={<Instructor id={"635f37bcde75e20effb14fc3"} />}
        />
        <Route
          path="/individual/*"
          element={
            <Trainee id={"63a2eb4d7dcc2cec5b085060"} corporate={false} />
          }
        />

        <Route path="/signup" element={<SignUp />} />

        <Route path="/unauthorized" element={<h1>Unauthorized page!</h1>} />

        {/* elements that require authentication */}
        <Route
          element={
            <RequireAuth
              allowedTypes={['instructor', 'corporate', 'individual']}
            />
          }
        >
          <Route
            path="/change-password/:id/:type"
            element={<PasswordReset />}
          />
        </Route>

        <Route element={<RequireAuth allowedTypes={['admin']} />}>
          <Route path="/admin" element={<Admin />} />
        </Route>

        <Route element={<RequireAuth allowedTypes={['instructor']} />}>
          <Route
            path="/instructor/*"
            element={
              <Instructor
              // id={auth.id}
              />
            }
          />
        </Route>

        <Route element={<RequireAuth allowedTypes={['individual']} />}>
          <Route path="/individual/*" element={<Trainee corporate={false} />} />
        </Route>

        <Route element={<RequireAuth allowedTypes={['corporate']} />}>
          <Route path="/corporate/*" element={<Trainee corporate={true} />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Homepage;
