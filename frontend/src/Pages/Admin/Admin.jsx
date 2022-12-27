// import Dashboard from './../../components/Dashboard/Dashboard';
import AdminSidebar from '../../components/AdminSpecific/AdminSidebar/AdminSidebar';
import './Admin.scss';
import { logOut } from '../../services/GuestService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOut } from '@fortawesome/free-solid-svg-icons';

// import './Homepage.scss';

const Admin = () => {
  const logOutHandler = async () => {
    await logOut();
    window.location.href = '/signin';
  };
  return (
    <div className="container-fluid row main px-0" id="adminMainPage">
      <div className="col-2">
        <AdminSidebar />
      </div>
      <div className="col-10">
        {/* <Dashboard /> */}
        <div className="edit-icon-container" onClick={() => logOutHandler()}>
          <FontAwesomeIcon icon={faSignOut} className="edit-icon" />
        </div>
      </div>
    </div>
  );
};

export default Admin;
