import React from "react";

import { useState } from "react";

const AddTest = ({ instructorId, courseId, subtitleId }) => {
  const [questionList, setQuestionList] = useState([
    { question: "", choices: { A: "", B: "", C: "", D: "" }, answer: "" },
  ]);

  console.log(questionList);
  const handleQuestionAdd = () => {
    setQuestionList([
      ...questionList,
      { question: "", choices: { A: "", B: "", C: "", D: "" }, answer: "" },
    ]);
  };

  const handleQuestionRemove = (index) => {
    const list = [...questionList];
    list.splice(index, 1);
    setQuestionList(list);
  };

  const handleQuestionChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...questionList];
    list[index][name] = value;
    setQuestionList(list);
  };

  const handleQuestionChoiceChange = (e, index, option) => {
    const { name,  value } = e.target;
    const list = [...questionList];
    list[index][name][option] = value;
    console.log("option: " + option)
    setQuestionList(list);
  };

  const handleAnswerChange = (e, index) => {
    const { value } = e.target;
    const list = [...questionList];
    list[index]["answer"] = value;
    console.log("answer: " + value)
    setQuestionList(list);
  };
  return (
    <div
      class="modal fade"
      id="addTestModal"
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
              Add Test
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            {/* ////////////////////////////////QUESTION///////////////////////////////////// */}
            {questionList.map((question, index) => (
              <div key={index} className={"question" + { index }}>
                <div>
                  <form>
                    <div class="form-group">
                      <div class="form-group">
                        <label for={"question" + { index } + "Body"}>
                          Question #{index}
                        </label>
                        <input
                          class="form-control"
                          id={"question" + { index } + "Body"}
                          aria-describedby="emailHelp"
                          placeholder="Write question body here"
                          value={question.question}
                          name="question"
                          onChange={(e) => handleQuestionChange(e, index)}
                        />
                      </div>
                    </div>
                    <div class="choices">
                      <label for={"choiceAQuestion" + { index }}>A</label>
                      <input
                        class="form-control"
                        id={"choiceAQuestion" + { index }}
                        aria-describedby="emailHelp"
                        placeholder="Choice A"
                        name="choices"
                        value={question.choices.A}
                        onChange={(e) => handleQuestionChoiceChange(e, index, "A")}
                      />
                      <div class="form-group">
                        <label for={"choiceBQuestion" + { index }}>B</label>
                        <input
                          type="email"
                          class="form-control"
                          id={"choiceBQuestion" + { index }}
                          aria-describedby="emailHelp"
                          placeholder="Choice B"
                          name="choices"
                          value={question.choices.B}
                          onChange={(e) => handleQuestionChoiceChange(e, index, "B")}
                        />
                      </div>
                      <div class="form-group">
                        <label for={"choiceCQuestion" + { index }}>C</label>
                        <input
                          type="email"
                          class="form-control"
                          id={"choiceCQuestion" + { index }}
                          aria-describedby="emailHelp"
                          placeholder="Choice C"
                          name = "choices"
                          value={question.choices.C}
                          onChange={(e) => handleQuestionChoiceChange(e, index, "C")}
                        />
                      </div>
                      <div class="form-group">
                        <label for={"choiceAQuestion" + { index }}>D</label>
                        <input
                          type="email"
                          class="form-control"
                          id={"choiceAQuestion" + { index }}
                          aria-describedby="emailHelp"
                          placeholder="Choice D"
                          name = "choices"
                          value={question.choices.D}
                          onChange={(e) => handleQuestionChoiceChange(e, index, "D")}
                        />
                      </div>
                    </div>

                    <div className="radioGroup">
                      <label>Correct Answer</label>
                      <br />
                      <div class="form-check form-check-inline">
                        <input
                          class="form-check-input"
                          type="radio"
                          name="inlineRadioOptions"
                          id={"inlineRadioAQuestion" + { index }}
                          value="A"
                          onChange={(e) => handleAnswerChange(e, index)}
                        />
                        <label
                          class="form-check-label"
                          for={"inlineRadioAQuestion" + { index }}
                        >
                          A
                        </label>
                      </div>
                      <div class="form-check form-check-inline">
                        <input
                          class="form-check-input"
                          type="radio"
                          name="inlineRadioOptions"
                          id={"inlineRadioBQuestion" + { index }}
                          value="B"
                          onChange={(e) => handleAnswerChange(e, index)}
                        />
                        <label
                          class="form-check-label"
                          for={"inlineRadioBQuestion" + { index }}
                        >
                          B
                        </label>
                      </div>
                      <div class="form-check form-check-inline">
                        <input
                          class="form-check-input"
                          type="radio"
                          name="inlineRadioOptions"
                          id={"inlineRadioCQuestion" + { index }}
                          value="C"
                          onChange={(e) => handleAnswerChange(e, index)}
                        />
                        <label
                          class="form-check-label"
                          for={"inlineRadioCQuestion" + { index }}
                        >
                          C
                        </label>
                      </div>
                      <div class="form-check form-check-inline">
                        <input
                          class="form-check-input"
                          type="radio"
                          name="inlineRadioOptions"
                          id={"inlineRadioDQuestion" + { index }}
                          value="D"
                          onChange={(e) => handleAnswerChange(e, index)}
                        />
                        <label
                          class="form-check-label"
                          for={"inlineRadioDQuestion" + { index }}
                        >
                          D
                        </label>
                      </div>
                    </div>
                    {/* <button class="btn btn-primary" 
        >
          Add another Question?
        </button> */}
                  </form>
                  <br />
                </div>
                {questionList.length - 1 === index ? (
                  <button class="btn btn-primary" onClick={handleQuestionAdd}>
                    Add another Question?
                  </button>
                ) : (
                  <></>
                )}
                {questionList.length > 1 ? (
                  <button
                    class="btn btn-danger"
                    onClick={() => handleQuestionRemove(index)}
                  >
                    Remove Question
                  </button>
                ) : (
                  <></>
                )}
                <hr />
              </div>
            ))}

            <button
              class="btn btn-primary"
              // onClick={async () => {
              //   await createCourse({
              //     title: document.getElementById('inputCourseTitle').value,
              //     hours: document.getElementById('inputHours').value,
              //     subjects:
              //       document.getElementById('inputSubjects').selectedValues,
              //     subtitles: [
              //       ...document
              //         .getElementById('inputSubtitles')
              //         .value.split(','),
              //     ],
              //     price: document.getElementById('inputPrice').value,
              //     description:
              //       document.getElementById('inputDescription').value,
              //     instructors: [InstructorId],
              //   });
              // }}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddTest;
