import React from 'react';
import { useState, useRef } from 'react';
import Modal from 'react-modal';
import { createLesson } from '../../../services/CourseService';
import alert from 'sweetalert2';

const AddLesson = ({ subtitle }) => {
  const LessonNameRef = useRef();
  const LessonHoursRef = useRef();
  const LessonDescriptionRef = useRef();
  const [ModalVisible, setModalVisible] = useState(false);

  const addLesson = async () => {
    const body = {
      subtitleId: subtitle._id,
      lesson: {
        name: LessonNameRef.current.value,
        description: LessonDescriptionRef.current.value,
        hours: LessonHoursRef.current.value,
      },
    };
    if (
      body.lesson.name === '' ||
      body.lesson.description === '' ||
      body.lesson.hours === ''
    ) {
      alert.fire('Bad Input!', 'Please dont leave any blanks', 'warning');
    } else {
      const response = await createLesson(body);
      if (response.status === 200) {
        // window.location.reload();
        alert.fire('Lesson created successfully', '', 'success');
        setTimeout(() => window.location.reload(), 3000);
      }
    }
  };

  return (
    <div>
      <button
        id="searchButton"
        className="mx-2 btn btn-outline-primary"
        onClick={() => setModalVisible(true)}
      >
        Add Lesson
      </button>
      <Modal
        isOpen={ModalVisible}
        onRequestClose={() => setModalVisible(false)}
        style={{
          content: {
            width: '28vw',
            height: '35vh',
            margin: 'auto',
          },
        }}
      >
        <div className="w-100">
          <div className="row">
            <h1>Add Lesson</h1>
          </div>
          <div className="row">
            <div className="col-12 m-2">
              <h5 className="d-inline">Lesson Name: &nbsp;</h5>
              <input type="text" name="" id="" ref={LessonNameRef} />
            </div>
            <div className="col-12 m-2">
              <h5 className="d-inline">Lesson Hours: &nbsp;</h5>
              <input type="number" name="" id="" ref={LessonHoursRef} />
            </div>
            <div className="col-12 m-2">
              <h5 className="d-inline">Lesson Description: &nbsp;</h5>
              <input type="textarea" name="" id="" ref={LessonDescriptionRef} />
            </div>
          </div>
          <div className="row d-flex justify-content-center">
            <button
              id="searchButton"
              className="my-1 mx-2 btn btn-outline-primary w-25"
              onClick={() => addLesson()}
            >
              Add
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default AddLesson;
