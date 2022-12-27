import { faDoorOpen, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import "./Landing.scss";
import Cookie from "js-cookie";
const LandingPage = () => {
  sessionStorage.setItem("type", "guest");
  Cookie.set("jwt", "123");
  return (
    <div style={{ backgroundColor: "white", fontWeight: "bolder" }}>
      <nav class="navbar navbar-expand-lg navbar-light bg-light pb-2 sticky-top">
        <div class="container-fluid">
          <a class="navbar-brand" href="#">
            <FontAwesomeIcon icon={faDoorOpen} />
            CourseIndoors
          </a>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNavAltMarkup"></div>
        </div>
      </nav>
      <div
        className="container-fluid m-0 p-0"
        style={{
          height: "100vh",
          // width: "90%",
          backgroundImage:
            'url("https://www.collegiateparent.com/wp-content/uploads/2021/02/4-reasons-college-students-struggle.png")',
          backgroundSize: "cover",
          // backgroundColor: "rgba(200,100,0,.5)",
          // backgroundBlendMode: "multiply",
          //   filter: "brightness(50%)",
        }}
      >
        {/* <img
        src={
          "https://www.collegiateparent.com/wp-content/uploads/2021/02/4-reasons-college-students-struggle.png"
        }
      /> */}
        <div className="container">
          {" "}
          <h1 style={{ color: "white" }}>
            {" "}
            <FontAwesomeIcon icon={faDoorOpen} />
            CourseIndoors
          </h1>
          <h1 style={{ color: "white", fontWeight: "bolder" }} className="m-5">
            Welcome to CourseIndoors,
          </h1>
          <div className="container">
            <div className="row">
              <div className="col-8"></div>
              <div className="col-4">
                <button
                  className="btn btn-outline-light btn-block btn-xl m-3 sm"
                  onClick={() => (window.location.href = "/signup")}
                >
                  New user? Sign Up!
                </button>
              </div>
            </div>
            <div className="row">
              <div className="col-8"></div>
              <div className="col-4">
                <button
                  className="btn btn-outline-light m-3 btn-xl"
                  onClick={() => (window.location.href = "/signin")}
                >
                  Sign In
                </button>
              </div>
            </div>
            <div className="row">
              <div className="col-8"></div>
              <div className="col-6">
                <button
                  className="btn btn-outline-light m-3"
                  onClick={() => (window.location.href = "/guest")}
                >
                  Browse our courses
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <h3 style={{ fontWeight: "bolder" }}>
          {" "}
          See what our users think of our platform!
        </h3>
        <div
          id="carouselExampleFade"
          class="carousel slide carousel-fade  mb-5"
          data-bs-ride="carousel"
        >
          <div class="carousel-inner">
            <div class="carousel-item active">
              <img
                src="https://media.istockphoto.com/id/1353041652/photo/confident-developer-holding-book-and-laptop-walking-on-urban-street-handsome-smiling-african.jpg?b=1&s=170667a&w=0&k=20&c=rbJOli01guqSU9dGVut1mRXSEUfhQz9238DhluAJEdg="
                class="d-block w-100"
                alt="..."
              />
              <div class="carousel-caption d-none d-md-block">
                <h1>
                  <FontAwesomeIcon icon={faStar} />
                  <FontAwesomeIcon icon={faStar} />
                  <FontAwesomeIcon icon={faStar} />
                  <FontAwesomeIcon icon={faStar} />
                  <FontAwesomeIcon icon={faStar} />
                </h1>
                <h3>
                  The easiest online course platform to use! Would defnitly
                  recommend!
                </h3>
              </div>
            </div>
            <div class="carousel-item">
              <img
                src="https://www.uagc.edu/sites/default/files/styles/paid_hero_header_899x600/public/2021-08/early-childhood-edu-leadership-ma-1-1166850734.jpg?h=36c22dd1&itok=dIdfz3Bk"
                class="d-block w-100"
                alt="..."
              />
              <div class="carousel-caption d-none d-md-block">
                <h1>
                  {" "}
                  <FontAwesomeIcon icon={faStar} />
                  <FontAwesomeIcon icon={faStar} />
                  <FontAwesomeIcon icon={faStar} />
                  <FontAwesomeIcon icon={faStar} />
                  <FontAwesomeIcon icon={faStar} />
                </h1>
                <h3>Teaching my students hav never been easier</h3>
              </div>
            </div>
            <div class="carousel-item">
              <img
                src="https://thecollegepost.com/wp-content/uploads/2020/11/pexels-andrea-piacquadio-3769021.jpg"
                class="d-block w-100"
                alt="..."
              />
              <div class="carousel-caption d-none d-md-block">
                <h1>
                  {" "}
                  <FontAwesomeIcon icon={faStar} />
                  <FontAwesomeIcon icon={faStar} />
                  <FontAwesomeIcon icon={faStar} />
                  <FontAwesomeIcon icon={faStar} />
                  <FontAwesomeIcon icon={faStar} />
                </h1>
                <h3>I can learn anything and everything anywhere</h3>
              </div>
            </div>
          </div>
          <button
            class="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleFade"
            data-bs-slide="prev"
          >
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
          </button>
          <button
            class="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleFade"
            data-bs-slide="next"
          >
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
          </button>
        </div>
      </div>
      <div
        className="container p-0"
        style={{
          color: "darkgray",
          borderTop: "solid gray 1px",
          marginTop: "20%",
        }}
      >
        <div className="row">
          <div className="col-4">®Registered Company 2022</div>
          <div className="col-8" style={{ margin: "auto" }}>
            <h1>
              <FontAwesomeIcon icon={faDoorOpen} /> CourseIndoors
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
