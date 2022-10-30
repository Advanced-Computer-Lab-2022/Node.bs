import Searchbar from './../../components/Searchbar/Searchbar';
import CourseGroup from './../../components/CourseGroup/CourseGroup';
import ProfileCard from '../../components/ProfileCard/ProfileCard';
import ProgressCard from '../../components/ProgressCard/ProgressCard';
const Dashboard = (props) => {
  let courses = [
    {
      title: 'Theory Of Computation',
      subtitles: ['brobo', 'jidhwisd'],
      instructors: [
        { name: 'Haythem Ismail', id: 3 },
        { name: 'Rami Younes', id: 1 },
        { name: 'Slim Abbdennadher', id: 2 },
      ],
    },
    {
      title: 'Operating Systems',
      subtitles: ['brobo', 'jidhwisd'],
      instructors: [
        { name: 'Haythem Ismail', id: 3 },
        { name: 'Rami Younes', id: 1 },
        { name: 'Slim Abbdennadher', id: 2 },
      ],
    },
    {
      title: 'Computer Architecture',
      subtitles: ['brobo', 'jidhwisd'],
      instructors: [
        { name: 'Haythem Ismail', id: 3 },
        { name: 'Rami Younes', id: 1 },
        { name: 'Slim Abbdennadher', id: 2 },
      ],
    },
    {
      title: 'Computer Architecture',
      subtitles: ['brobo', 'jidhwisd'],
      instructors: [
        { name: 'Haythem Ismail', id: 3 },
        { name: 'Rami Younes', id: 1 },
        { name: 'Slim Abbdennadher', id: 2 },
      ],
    },
    {
      title: 'Computer Architecture',
      subtitles: ['brobo', 'jidhwisd'],
      instructors: [
        { name: 'Haythem Ismail', id: 3 },
        { name: 'Rami Younes', id: 1 },
        { name: 'Slim Abbdennadher', id: 2 },
      ],
    },
    {
      title: 'Computer Architecture',
      subtitles: ['brobo', 'jidhwisd'],
      instructors: [
        { name: 'Haythem Ismail', id: 3 },
        { name: 'Rami Younes', id: 1 },
        { name: 'Slim Abbdennadher', id: 2 },
      ],
    },
    {
      title: 'Computer Architecture',
      subtitles: ['brobo', 'jidhwisd'],
      instructors: [
        { name: 'Haythem Ismail', id: 3 },
        { name: 'Rami Younes', id: 1 },
        { name: 'Slim Abbdennadher', id: 2 },
      ],
    },
  ];
  return (
    <div className="container-fluid row ">
      <div className="col-8">
        <div className="row">
          <div className="col-6" style={{ marginBottom: '8%' }}>
            <h2>Dashboard</h2>
          </div>
          <div className="col-6 row ">
            <Searchbar />
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <h4>Course Catalog</h4>
          </div>
          <CourseGroup courses={courses} />
        </div>
      </div>
      <div className="col-4">
        <div className="row">
          <ProfileCard />
        </div>
        <div className="row">
          <ProgressCard />
          <ProgressCard />
          <ProgressCard />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
