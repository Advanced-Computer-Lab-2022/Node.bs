import './app.scss';
import CourseGroup from './components/CourseGroup/CourseGroup';
import CountryDropdown from './components/CountryDropdown/CountryDropdown';

function App() {
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
    <div className="App">
      <CourseGroup courses={courses} />
      <CountryDropdown />
    </div>
  );
}

export default App;
