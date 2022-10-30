import Dashboard from './../../components/Dashboard/Dashboard';
import Sidebar from './../../components/Sidebar/Sidebar';
import './Homepage.scss';
const Homepage = () => {
  return (
    <div className="container-fluid row main px-0">
      <div className="col-2">
        <Sidebar />
      </div>
      <div className="col-10">
        <Dashboard />
      </div>
    </div>
  );
};

export default Homepage;
