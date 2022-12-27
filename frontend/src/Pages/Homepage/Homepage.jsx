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
const Homepage = () => {
  // const { auth, updateAuth } = useContext(AuthContext);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signin" element={<SignIn />} />

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
