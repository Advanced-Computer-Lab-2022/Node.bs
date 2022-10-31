import Searchbar from './../Searchbar/Searchbar';
import CourseGroup from './../CourseGroup/CourseGroup';
import ProfileCard from '../ProfileCard/ProfileCard';
import ProgressCard from '../ProgressCard/ProgressCard';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getAllCourses } from '../../redux/features/resultSlice';
import AddForm from '../AddForm/CoursePreview';
const Dashboard = (props) => {
  const dispatch = useDispatch();
  const courses = useSelector((state) => state.courses.all);
  useEffect(() => {
    dispatch(getAllCourses());
  }, []);
  // let coursesClone = [
  //   {
  //     title: "Theory Of Computation",
  //     subtitles: ["brobo", "jidhwisd"],
  //     instructors: [
  //       { name: "Haythem Ismail", id: 3 },
  //       { name: "Rami Younes", id: 1 },
  //       { name: "Slim Abbdennadher", id: 2 },
  //     ],
  //     price: 1000,
  //     currentDiscount: { expiryDate: new Date("11/1/2021"), percentage: 0.5 },
  //     totalHours: 20,
  //     rating: 4,
  //   },
  //   {
  //     title: "Operating Systems",
  //     subtitles: ["brobo", "jidhwisd"],
  //     instructors: [
  //       { name: "Haythem Ismail", id: 3 },
  //       { name: "Rami Younes", id: 1 },
  //       { name: "Slim Abbdennadher", id: 2 },
  //     ],
  //   },
  //   {
  //     title: "Computer Architecture",
  //     subtitles: ["brobo", "jidhwisd"],
  //     instructors: [
  //       { name: "Haythem Ismail", id: 3 },
  //       { name: "Rami Younes", id: 1 },
  //       { name: "Slim Abbdennadher", id: 2 },
  //     ],
  //   },
  //   {
  //     title: "Computer Architecture",
  //     subtitles: ["brobo", "jidhwisd"],
  //     instructors: [
  //       { name: "Haythem Ismail", id: 3 },
  //       { name: "Rami Younes", id: 1 },
  //       { name: "Slim Abbdennadher", id: 2 },
  //     ],
  //   },
  //   {
  //     title: "Computer Architecture",
  //     subtitles: ["brobo", "jidhwisd"],
  //     instructors: [
  //       { name: "Haythem Ismail", id: 3 },
  //       { name: "Rami Younes", id: 1 },
  //       { name: "Slim Abbdennadher", id: 2 },
  //     ],
  //   },
  //   {
  //     title: "Computer Architecture",
  //     subtitles: ["brobo", "jidhwisd"],
  //     instructors: [
  //       { name: "Haythem Ismail", id: 3 },
  //       { name: "Rami Younes", id: 1 },
  //       { name: "Slim Abbdennadher", id: 2 },
  //     ],
  //   },
  //   {
  //     title: "Computer Architecture",
  //     subtitles: ["brobo", "jidhwisd"],
  //     instructors: [
  //       { name: "Haythem Ismail", id: 3 },
  //       { name: "Rami Younes", id: 1 },
  //       { name: "Slim Abbdennadher", id: 2 },
  //     ],
  //   },
  // ];
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
