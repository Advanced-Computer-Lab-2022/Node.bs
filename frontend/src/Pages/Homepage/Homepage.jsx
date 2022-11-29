import Admin from '../Admin/Admin';
import Instructor from '../Instructor/Instructor';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
// import Dashboard from './../../components/Dashboard/Dashboard';
// import Sidebar from './../../components/Sidebar/Sidebar';
import './Homepage.scss';
import Trainee from '../Trainee/Trainee';
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
        <Route path="/admin" element={<Admin />} />
        <Route
          path="/instructor/*"
          element={<Instructor id={'635f37bcde75e20effb14fc3'} />}
        />
        <Route path="/individual" element={<Trainee corporate={false} />} />

        <Route path="/corporate" element={<Trainee corporate={true} />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Homepage;
