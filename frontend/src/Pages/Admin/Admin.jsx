// import Dashboard from './../../components/Dashboard/Dashboard';
import AdminSidebar from '../../new components/AdminSidebar/AdminSidebar';
import './Admin.scss';
// import './Homepage.scss';

const Admin = () => {
  return (
    <div className="container-fluid row main px-0" id="adminMainPage">
      <div className="col-2">
        <AdminSidebar />
      </div>
      <div className="col-10">
        {/* <Dashboard /> */}
        <h1>This is the admin page!</h1>
        <p>Todo...</p>
      </div>
    </div>
  );
};

export default Admin;
