// import { useSelector } from 'react-redux';

// const CourseModal = ({ course }) => {
//   const currency = useSelector(
//     (state) => state.region.selectedRegion.currencyCodes[0]
//   );
//   <div
//     class="modal fade modal-fullscreen"
//     id={'momo'}
//     data-bs-backdrop="static"
//     data-bs-keyboard="false"
//     tabindex="-1"
//     aria-labelledby="staticBackdropLabel"
//     aria-hidden="true"
//   >
//     <div class="modal-dialog modal-fullscreen">
//       <div class="modal-content">
//         <div class="modal-header">
//           <h5 class="modal-title" id="staticBackdropLabel">
//             Course Preview
//           </h5>
//           <button
//             type="button"
//             class="btn-close"
//             data-bs-dismiss="modal"
//             aria-label="Close"
//           ></button>
//         </div>
//         <div class="modal-body">
//           <div className="row">
//             <div className="col-6">
//               <img
//                 src="https://cdn3.iconfinder.com/data/icons/logos-and-brands-adobe/512/267_Python-512.png"
//                 style={{ width: '150px', height: '150px' }}
//               />
//               <div className="row mb-3">
//                 <div className="col-6">
//                   <h1>{course.title}</h1>
//                 </div>
//                 <div className="col-6 text-end">
//                   <h3>
//                     {course.price} {currency}
//                   </h3>
//                 </div>
//               </div>
//             </div>

//             <div className="col-6 text-end">
//               <iframe
//                 width="560"
//                 height="315"
//                 src={course.videoURL}
//                 title="YouTube video player"
//                 frameborder="0"
//                 allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//                 allowfullscreen
//               ></iframe>
//             </div>
//           </div>

//           <div className="row mb-3">
//             <p style={{ width: '50%' }}>{course.description}</p>
//           </div>
//           <div className="row mb-3">
//             <h6 style={{ color: 'black' }}>{course.totalHours} Hours</h6>
//           </div>
//           <div className="row">
//             <div class="accordion" id="subtitleAccordion">
//               {course.subtitles.map((subtitle) => {
//                 <div class="accordion-item">
//                   <h2 class="accordion-header" id="headingOne">
//                     <button
//                       class="accordion-button"
//                       type="button"
//                       data-bs-toggle="collapse"
//                       data-bs-target="#collapseOne"
//                       aria-expanded="true"
//                       aria-controls="collapseOne"
//                     >
//                       {subtitle.name}
//                     </button>
//                   </h2>
//                   <div
//                     id="collapseOne"
//                     class="accordion-collapse collapse show"
//                     aria-labelledby="headingOne"
//                     data-bs-parent="#accordionExample"
//                   >
//                     <div class="accordion-body">
//                       <ul>
//                         {subtitle.lessons.map((lesson) => {
//                           <div className="row">
//                             <div className="col-6">
//                               <li>{lesson.name}</li>
//                             </div>
//                             <div className="col-6 text-end">{lesson.hours}</div>
//                           </div>;
//                         })}
//                       </ul>
//                     </div>
//                   </div>
//                 </div>;
//               })}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   </div>;
// };

// export default CourseModal;
