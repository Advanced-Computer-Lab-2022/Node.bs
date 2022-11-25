import { useRef } from 'react';

const AddForm = ({ toBeAdded, handleSubmit }) => {
  const usernameRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  const submitForm = async () => {
    if (
      passwordRef.current.value === confirmPasswordRef.current.value &&
      !/^ *$/.test(usernameRef.current.value) &&
      !/^ *$/.test(passwordRef.current.value)
    ) {
      const data = {
        username: usernameRef.current.value,
        password: passwordRef.current.value,
      };
      await handleSubmit(data);
      usernameRef.current.value = '';
      passwordRef.current.value = '';
      confirmPasswordRef.current.value = '';
      alert('Insert was a success!');
    } else {
      //warn for non matching passwords
      alert('Please insert valid data');
    }
  };

  return (
    <div
      class="modal fade"
      id={'add' + toBeAdded + 'Modal'}
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabindex="-1"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="staticBackdropLabel">
              Add {toBeAdded}
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <div className="row">
              <div className="col-12">
                <label for="inputUsername" class="form-label">
                  Username
                </label>
                <input
                  ref={usernameRef}
                  type="text"
                  class="form-control"
                  id={'inputUsername' + toBeAdded}
                  required
                />
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <label for="inputPassword" class="form-label">
                  Password
                </label>
                <input
                  ref={passwordRef}
                  type="password"
                  class="form-control"
                  id={'inputPassword' + toBeAdded}
                  required
                />
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-12">
                <label for="inputPassword" class="form-label">
                  Confirm Password
                </label>
                <input
                  ref={confirmPasswordRef}
                  type="password"
                  class="form-control"
                  id={'inputConfirmationPassword' + toBeAdded}
                  required
                />
              </div>
            </div>
            <div className="">
              <button className="btn btn-primary " onClick={submitForm}>
                Add
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddForm;
