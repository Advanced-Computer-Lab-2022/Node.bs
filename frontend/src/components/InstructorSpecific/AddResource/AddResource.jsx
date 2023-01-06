import React from 'react';
import { useRef, useState } from 'react';
import { createResource } from './../../../services/CourseService';
import Modal from 'react-modal';
import alert from 'sweetalert2';

const AddResource = ({ lesson, courseId }) => {
  const ResourceTitleRef = useRef();
  const ResourceURLRef = useRef();
  const ResourceTypeRef = useRef();
  const [ModalVisible, setModalVisible] = useState(false);

  const addResource = async () => {
    const body = {
      lessonId: lesson._id,
      resource: {
        title: ResourceTitleRef.current.value,
        URL: ResourceURLRef.current.value,
        type: ResourceTypeRef.current.value,
      },
      courseId,
    };
    if (
      body.resource.title === '' ||
      body.resource.URL === '' ||
      body.resource.type === ''
    ) {
      alert.fire('Bad Input!', 'Please dont leave any blanks', 'warning');
    } else {
      const response = await createResource(body);
      if (response.status === 200) {
        // window.location.reload();
        alert.fire('Resource added successfully', '', 'success');
        setTimeout(() => window.location.reload(), 3000);
      } else {
        alert.fire(
          'Unexpected error has occured!',
          'please try again later',
          'error'
        );
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
        Add Resource
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
            <h1>Add Resource</h1>
          </div>
          <div className="row">
            <div className="col-12 m-2">
              <h5 className="d-inline">Resource Title: &nbsp;</h5>
              <input type="text" name="" id="" ref={ResourceTitleRef} />
            </div>
            <div className="col-12 m-2">
              <h5 className="d-inline">Resource Type: &nbsp;</h5>
              <select type="number" name="" id="" ref={ResourceTypeRef}>
                <option value="text">Link to Reading Material</option>
                <option value="video">Embedded video from YouTube</option>
              </select>
            </div>
            <div className="col-12 m-2">
              <h5 className="d-inline">Resource URL: &nbsp;</h5>
              <input type="textarea" name="" id="" ref={ResourceURLRef} />
            </div>
          </div>
          <div className="row d-flex justify-content-center">
            <button
              id="searchButton"
              className="my-1 mx-2 btn btn-outline-primary w-25"
              onClick={() => addResource()}
            >
              Add
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default AddResource;
