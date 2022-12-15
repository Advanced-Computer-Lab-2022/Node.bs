import Admin from '../Admin/Admin';
import Instructor from '../Instructor/Instructor';
import { BrowserRouter, Route, Routes, useParams } from 'react-router-dom';
// import Dashboard from './../../components/Dashboard/Dashboard';
// import Sidebar from './../../components/Sidebar/Sidebar';
import './Homepage.scss';
import Trainee from '../Trainee/Trainee';
import PasswordForm from '../../components/PasswordForm/PasswordForm';
import PasswordReset from '../../components/PasswordReset/PasswordReset';
const Homepage = () => {
  return (
    // <div className="container-fluid row main px-0">
    //   <div className="col-2">
    //     <Sidebar />
    //   </div>
    //   <div className="col-10">
    //     <Dashboard />
    //   </div>
    // </div>
    <BrowserRouter>
      <Routes>
        <Route path="/change-password/:id/:type" element={<PasswordReset />} />
        <Route path="/admin" element={<Admin />} />
        <Route
          path="/instructor/*"
          element={<Instructor id={'635f37bcde75e20effb14fc3'} />}
        />
        <Route
          path="/individual/*"
          element={<Trainee id={'638796ae23b3b73229cb811b'} corporate={false} />}
        />

        <Route
          path="/corporate/*"
          element={<Trainee id={'635fd142224d29b004e7b1c6'} corporate={true} />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default Homepage;
