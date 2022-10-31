import Searchbar from './../Searchbar/Searchbar';
import CourseGroup from './../CourseGroup/CourseGroup';
import ProfileCard from '../ProfileCard/ProfileCard';
import ProgressCard from '../ProgressCard/ProgressCard';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getAllCourses } from '../../redux/features/resultSlice';
import Filter from '../Filter/Filter';
const Dashboard = (props) => {
  const dispatch = useDispatch();
  let all = useSelector((state) => state.courses.all);
  let results = useSelector((state) => state.courses.results);
  // let displayedCourses = all;
  const lastAction = useSelector((state) => state.courses.lastActionDone);
  useEffect(() => {
    dispatch(getAllCourses());
  }, []);
  let courses;
  useEffect(() => {
    courses = lastAction === 'getAll' ? all : results;
  }, [lastAction, all, results]);
  // const updateState = () => {
  //   all = useSelector((state) => state.courses.all);
  //   results = useSelector((state) => state.courses.results);
  // };
  // useEffect(() => {
  //   displayedCourses = lastAction === 'getAll' ? all : results;
  // }, [lastAction, all, results]);
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
          <div className="col-9">
            {lastAction === 'getAll' ? (
              <h4>Course Catalog</h4>
            ) : (
              <h4>Search Results</h4>
            )}
          </div>
          <div className="col-3 text-end ">
            <Filter />
          </div>
          <CourseGroup courses={lastAction === 'getAll' ? all : results} />
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
