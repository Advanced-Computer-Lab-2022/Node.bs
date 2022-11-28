import {
  faLaptopHouse,
  faCog,
  faClipboard,
  faMedal,
  faKey,
  faGraduationCap,
  faChalkboardTeacher,
  faDoorOpen,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SidebarButton from '../../Sidebar/SidebarButton/SidebarButton';
import AddForm from '../../AddForm/AddForm';
import {
  createCorporateTrainee,
  createInstructor,
  createAdmin,
} from '../../../services/AdminService';
import './AdminSidebar.scss';

const AdminSidebar = () => {
  const addInstructor = async (body) => {
    await createInstructor(body);
  };
  const addCorporateTrainee = async (body) => {
    await createCorporateTrainee(body);
  };
  const addAdminstrator = async (body) => {
    await createAdmin(body);
  };

  return (
    <div class="container-fluid sidebar-container">
      <div class="logo">
        <h6 className="brand">
          <FontAwesomeIcon icon={faDoorOpen} /> CourseIndoors
        </h6>
      </div>
      <div className="sidebarButtonContainer">
        <SidebarButton icon={faLaptopHouse} label="Dashboard" primary />
        <SidebarButton icon={faMedal} label="Certificates" />
        <SidebarButton icon={faClipboard} label="Tests" />
        <SidebarButton icon={faCog} label="Settings" />
        <SidebarButton
          icon={faChalkboardTeacher}
          label="Add Instructor"
          toBeAdded="Instructor"
        />
        <AddForm toBeAdded="Instructor" handleSubmit={addInstructor} />
        <SidebarButton
          icon={faGraduationCap}
          label="Add Corporate Trainee"
          toBeAdded="CorporateTrainee"
        />
        <AddForm
          toBeAdded="CorporateTrainee"
          handleSubmit={addCorporateTrainee}
        />
        <SidebarButton
          icon={faKey}
          label="Add Adminstrator"
          toBeAdded="Adminstrator"
        />
        <AddForm toBeAdded="Adminstrator" handleSubmit={addAdminstrator} />
      </div>
    </div>
  );
};

export default AdminSidebar;
