const AddForm = ({ toBeAdded, handleSubmit }) => {
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
                  type="text"
                  class="form-control"
                  id={'inputUsername' + toBeAdded}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <label for="inputPassword" class="form-label">
                  Password
                </label>
                <input
                  type="password"
                  class="form-control"
                  id={'inputPassword' + toBeAdded}
                />
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-12">
                <label for="inputPassword" class="form-label">
                  Confirm Password
                </label>
                <input
                  type="password"
                  class="form-control"
                  id={'inputConfirmationPassword' + toBeAdded}
                />
              </div>
            </div>
            <button class="btn btn-primary" onClick={handleSubmit}>
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddForm;
