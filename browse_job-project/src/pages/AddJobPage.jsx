// import React, { useState } from "react";
// import { useForm } from "react-hook-form";
// import { useNavigate } from "react-router-dom";
// import { gooeyToast } from "goey-toast";
// // import ImageSlideshow from "./ImageSlideshow";
// import "../components/customstyles/AddJobPage.css";
// import ImageSlideshow from "@/components/ImageSlideshow";
// // import onACall from "../assets/images/onACall.jpg";
// import happyManager from "../assets/images/happyManager.jpg";
// import onhisLaptop from "../assets/images/on his laptop.jpg";
// import givingJobAssistance from "../assets/images/givingJobAssistance.jpg";

// const AddJobPage = ({ addJobSubmit }) => {
//   const navigate = useNavigate();
//   const [currentStep, setCurrentStep] = useState(1);

//   const {
//     register,
//     handleSubmit,
//     trigger,
//     clearErrors,
//     formState: { errors, isSubmitting },
//     reset,
//   } = useForm({
//     mode: "onSubmit",
//     reValidateMode: "onChange",
//     defaultValues: {
//       type: "Full-Time",
//       salary: "Under $50K",
//     },
//   });

//   const onSubmit = async (data) => {
//     const newJob = {
//       title: data.title.trim(),
//       type: data.type,
//       description: data.description.trim(),
//       salary: data.salary,
//       location: data.location.trim(),
//       company: {
//         name: data.companyName.trim(),
//         description: data.companyDescription.trim(),
//         contactEmail: data.contactEmail.trim(),
//         contactPhone: data.contactPhone.trim(),
//       },
//     };

//     await addJobSubmit(newJob);

//     gooeyToast.success("Job added successfully!", {
//       description: "Your job has been added successfully.",
//     });

//     reset();
//     navigate("/jobs");
//   };

//   const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//   const phonePattern = /^[0-9+()\-\s]{10,15}$/;

//   const jobImages = [
//     // { src: onACall },
//     { src: happyManager },
//     { src: givingJobAssistance },
//     { src: onhisLaptop },
//   ];

//   const handleNext = async () => {
//     const isValid = await trigger([
//       "type",
//       "title",
//       "description",
//       "salary",
//       "location",
//     ]);

//     if (!isValid) {
//       return;
//     }

//     setCurrentStep(2);
//   };

//   const handleBack = () => {
//     setCurrentStep(1);
//   };

//   return (
//     <section className="add-job-page">
//       <div className="container-fluid">
//         <div className="row add-job-layout">
//           <div className="col-lg-5 col-md-5 col-12 add-job-visual-section">
//             <div className="add-job-visual-inner">
//               <ImageSlideshow
//                 images={jobImages}
//                 intervalDuration={10000}
//                 objectFit="cover"
//                 className="add-job-slideshow"
//               />
//             </div>
//           </div>

//           <div className="col-lg-7 col-md-7 col-12 add-job-form-section">
//             <div className="add-job-form-wrapper">
//               <div className="add-job-heading" style={{ marginTop: "-15px" }}>
//                 <span className="add-job-eyebrow">JOB POSTING</span>

//                 <h3 style={{ fontSize: "30px" }}>Add Job</h3>

//                 <p>
//                   Create a new job listing and connect with the right
//                   candidates.
//                 </p>
//               </div>

//               {/* =========================
//                   STEPPER
//               ========================== */}
//               <div
//                 className="add-job-stepper"
//                 aria-label="Job posting progress"
//                 style={{ marginTop: "-20px" }}
//               >
//                 <div
//                   className={`stepper-item ${
//                     currentStep >= 1 ? "active" : ""
//                   } ${currentStep > 1 ? "completed" : ""}`}
//                 >
//                   <div className="stepper-number">
//                     {currentStep > 1 ? "✓" : "01"}
//                   </div>

//                   <div className="stepper-content">
//                     <span>Step 1</span>
//                     <strong>Job Details</strong>
//                   </div>
//                 </div>

//                 <div className="stepper-line">
//                   <span
//                     className={currentStep > 1 ? "stepper-line-active" : ""}
//                   />
//                 </div>

//                 <div
//                   className={`stepper-item ${
//                     currentStep === 2 ? "active" : ""
//                   }`}
//                 >
//                   <div className="stepper-number">02</div>

//                   <div className="stepper-content">
//                     <span>Step 2</span>
//                     <strong>Company Info</strong>
//                   </div>
//                 </div>
//               </div>

//               <form
//                 onSubmit={handleSubmit(onSubmit)}
//                 noValidate
//                 className="add-job-form"
//               >
//                 {/* =========================
//                     STEP CONTENT
//                 ========================== */}
//                 <div className="add-job-step-container">
//                   <div
//                     className={`add-job-step ${
//                       currentStep === 1
//                         ? "add-job-step-active"
//                         : "add-job-step-hidden"
//                     }`}
//                     aria-hidden={currentStep !== 1}
//                   >
//                     {/* =========================================
//                         JOB DETAILS
//                     ========================================== */}
//                     <div
//                       className="form-section"
//                       style={{ marginTop: "-10px" }}
//                     >
//                       <div className="form-section-heading">
//                         <span className="section-number">01</span>

//                         <div>
//                           <h3>Job Details</h3>

//                           <p>
//                             Provide the details of the position you are hiring
//                             for.
//                           </p>
//                         </div>
//                       </div>

//                       <div className="row">
//                         {/* JOB TYPE */}
//                         <div className="col-lg-6 col-md-6 col-12">
//                           <div className="form-field">
//                             <label htmlFor="type">Job Type</label>

//                             <select
//                               id="type"
//                               {...register("type", {
//                                 required: "Please select a job type",
//                                 onChange: () => clearErrors("type"),
//                               })}
//                               className={`form-control-modern ${
//                                 errors.type
//                                   ? "input-error"
//                                   : "form-control-modern"
//                               }`}
//                             >
//                               <option value="Full-Time">Full-Time</option>
//                               <option value="Part-Time">Part-Time</option>
//                               <option value="Remote">Remote</option>
//                               <option value="Internship">Internship</option>
//                             </select>

//                             {errors.type && (
//                               <p className="form-error">
//                                 {errors.type.message}
//                               </p>
//                             )}
//                           </div>
//                         </div>

//                         {/* JOB LISTING NAME */}
//                         <div className="col-lg-6 col-md-6 col-12">
//                           <div className="form-field">
//                             <label htmlFor="title">Job Listing Name</label>

//                             <input
//                               type="text"
//                               id="title"
//                               {...register("title", {
//                                 required: "Job listing name is required",
//                                 onChange: () => clearErrors("title"),
//                               })}
//                               className={`form-control-modern ${
//                                 errors.title
//                                   ? "input-error"
//                                   : "form-control-modern"
//                               }`}
//                               placeholder="eg. React Developer"
//                             />

//                             {errors.title && (
//                               <p className="form-error">
//                                 {errors.title.message}
//                               </p>
//                             )}
//                           </div>
//                         </div>

//                         {/* DESCRIPTION */}
//                         <div className="col-lg-12 col-md-12 col-12">
//                           <div className="form-field">
//                             <label htmlFor="description">Description</label>

//                             <textarea
//                               id="description"
//                               {...register("description", {
//                                 required: "Job description is required",
//                                 onChange: () => clearErrors("description"),
//                               })}
//                               className={`form-control-modern form-textarea ${
//                                 errors.description
//                                   ? "input-error"
//                                   : "form-control-modern"
//                               }`}
//                               rows="4"
//                               placeholder="Add any job duties, expectations, requirements, etc"
//                               style={{ resize: "none" }}
//                             ></textarea>

//                             {errors.description && (
//                               <p className="form-error">
//                                 {errors.description.message}
//                               </p>
//                             )}
//                           </div>
//                         </div>

//                         {/* SALARY */}
//                         <div className="col-lg-12 col-md-12 col-12">
//                           <div className="form-field">
//                             <label htmlFor="salary">Salary</label>

//                             <select
//                               id="salary"
//                               {...register("salary", {
//                                 required: "Salary is required",
//                                 onChange: () => clearErrors("salary"),
//                               })}
//                               className={`form-control-modern ${
//                                 errors.salary
//                                   ? "input-error"
//                                   : "form-control-modern"
//                               }`}
//                             >
//                               <option value="Under $50K">Under $50K</option>
//                               <option value="$50K - 60K">$50K - $60K</option>
//                               <option value="$60K - 70K">$60K - $70K</option>
//                               <option value="$70K - 80K">$70K - $80K</option>
//                               <option value="$80K - 90K">$80K - $90K</option>
//                               <option value="$90K - 100K">$90K - $100K</option>
//                               <option value="$100K - 125K">
//                                 $100K - $125K
//                               </option>
//                               <option value="$125K - 150K">
//                                 $125K - $150K
//                               </option>
//                               <option value="$150K - 175K">
//                                 $150K - $175K
//                               </option>
//                               <option value="$175K - 200K">
//                                 $175K - $200K
//                               </option>
//                               <option value="Over $200K">Over $200K</option>
//                             </select>

//                             {errors.salary && (
//                               <p className="form-error">
//                                 {errors.salary.message}
//                               </p>
//                             )}
//                           </div>
//                         </div>

//                         {/* LOCATION */}
//                         <div className="col-lg-12 col-md-12 col-12">
//                           <div className="form-field">
//                             <label htmlFor="location">Location</label>

//                             <input
//                               type="text"
//                               id="location"
//                               {...register("location", {
//                                 required: "Location is required",
//                                 onChange: () => clearErrors("location"),
//                               })}
//                               className={`form-control-modern ${
//                                 errors.location
//                                   ? "input-error"
//                                   : "form-control-modern"
//                               }`}
//                               placeholder="Company Location"
//                             />

//                             {errors.location && (
//                               <p className="form-error">
//                                 {errors.location.message}
//                               </p>
//                             )}
//                           </div>
//                         </div>
//                       </div>
//                     </div>

//                     {/* STEP 1 BUTTON */}
//                     <div className="add-job-step-actions add-job-next-actions">
//                       <button
//                         type="button"
//                         className="add-job-next-button"
//                         onClick={handleNext}
//                       >
//                         <span>Next</span>
//                         <span className="next-arrow">→</span>
//                       </button>
//                     </div>
//                   </div>

//                   <div
//                     className={`add-job-step ${
//                       currentStep === 2
//                         ? "add-job-step-active"
//                         : "add-job-step-hidden"
//                     }`}
//                     aria-hidden={currentStep !== 2}
//                   >
//                     {/* =========================================
//                         COMPANY INFORMATION
//                     ========================================== */}
//                     <div className="form-section company-section">
//                       <div className="form-section-heading">
//                         <span className="section-number">02</span>

//                         <div>
//                           <h3>Company Info</h3>

//                           <p>
//                             Provide information candidates can use to learn
//                             about your company.
//                           </p>
//                         </div>
//                       </div>

//                       <div className="row">
//                         {/* COMPANY NAME */}
//                         <div className="col-lg-12 col-md-12 col-12">
//                           <div className="form-field">
//                             <label htmlFor="companyName">Company Name</label>

//                             <input
//                               type="text"
//                               id="companyName"
//                               {...register("companyName", {
//                                 required: "Company name is required",
//                                 onChange: () => clearErrors("companyName"),
//                               })}
//                               className={`form-control-modern ${
//                                 errors.companyName ? "input-error" : ""
//                               }`}
//                               placeholder="Company Name"
//                             />

//                             {errors.companyName && (
//                               <p className="form-error">
//                                 {errors.companyName.message}
//                               </p>
//                             )}
//                           </div>
//                         </div>

//                         {/* COMPANY DESCRIPTION */}
//                         <div className="col-lg-12 col-md-12 col-12">
//                           <div className="form-field">
//                             <label htmlFor="companyDescription">
//                               Company Description
//                             </label>

//                             <textarea
//                               id="companyDescription"
//                               {...register("companyDescription", {
//                                 required: "Company description is required",
//                                 onChange: () =>
//                                   clearErrors("companyDescription"),
//                               })}
//                               className={`form-control-modern form-textarea ${
//                                 errors.companyDescription ? "input-error" : ""
//                               }`}
//                               rows="3"
//                               placeholder="What does your company do?"
//                               style={{ resize: "none" }}
//                             ></textarea>

//                             {errors.companyDescription && (
//                               <p className="form-error">
//                                 {errors.companyDescription.message}
//                               </p>
//                             )}
//                           </div>
//                         </div>

//                         {/* CONTACT EMAIL */}
//                         <div className="col-lg-12 col-md-12 col-12">
//                           <div className="form-field">
//                             <label htmlFor="contactEmail">Contact Email</label>

//                             <input
//                               type="email"
//                               id="contactEmail"
//                               {...register("contactEmail", {
//                                 required: "Contact email is required",
//                                 pattern: {
//                                   value: emailPattern,
//                                   message: "Please enter a valid email address",
//                                 },
//                                  onChange: () => clearErrors("contactEmail"),
//                               })}
//                               className={`form-control-modern ${
//                                 errors.contactEmail ? "input-error" : ""
//                               }`}
//                               placeholder="Email address for applicants"
//                             />

//                             {errors.contactEmail && (
//                               <p className="form-error">
//                                 {errors.contactEmail.message}
//                               </p>
//                             )}
//                           </div>
//                         </div>

//                         {/* CONTACT PHONE */}
//                         <div className="col-lg-12 col-md-12 col-12">
//                           <div className="form-field">
//                             <label htmlFor="contactPhone">Contact Phone</label>

//                             <input
//                               type="tel"
//                               id="contactPhone"
//                               {...register("contactPhone", {
//                                 required: "Contact phone is required",
//                                 pattern: {
//                                   value: phonePattern,
//                                   message: "Please enter a valid phone number",
//                                 },
//                               })}
//                               className={`form-control-modern ${
//                                 errors.contactPhone ? "input-error" : ""
//                               }`}
//                               placeholder="Optional phone for applicants"
//                             />

//                             {errors.contactPhone && (
//                               <p className="form-error">
//                                 {errors.contactPhone.message}
//                               </p>
//                             )}
//                           </div>
//                         </div>
//                       </div>
//                     </div>

//                     {/* STEP 2 BUTTONS */}
//                     <div className="add-job-step-actions add-job-company-actions">
//                       <button
//                         type="button"
//                         className="add-job-back-button"
//                         onClick={handleBack}
//                       >
//                         <span className="back-arrow">←</span>
//                         <span>Back</span>
//                       </button>

//                       <button
//                         className="add-job-submit"
//                         type="submit"
//                         disabled={isSubmitting}
//                       >
//                         <span>
//                           {isSubmitting ? "Adding Job..." : "Add Job"}
//                         </span>

//                         {!isSubmitting && (
//                           <span className="submit-arrow">→</span>
//                         )}
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default AddJobPage;

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { gooeyToast } from "goey-toast";
import "../components/customstyles/AddJobPage.css";
import ImageSlideshow from "@/components/ImageSlideshow";
import happyManager from "../assets/images/happyManager.jpg";
import onhisLaptop from "../assets/images/on his laptop.jpg";
import givingJobAssistance from "../assets/images/givingJobAssistance.jpg";
import { Check, MoveLeft, MoveRight } from "lucide-react";

const AddJobPage = ({ addJobSubmit }) => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);

  const {
    register,
    handleSubmit,
    trigger,
    clearErrors,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues: {
      type: "Full-Time",
      salary: "Under $50K",
    },
  });

  const onSubmit = async (data) => {
    const newJob = {
      title: data.title.trim(),
      type: data.type,
      description: data.description.trim(),
      salary: data.salary,
      location: data.location.trim(),
      company: {
        name: data.companyName.trim(),
        description: data.companyDescription.trim(),
        contactEmail: data.contactEmail.trim(),
        contactPhone: data.contactPhone.trim(),
      },
    };

    await addJobSubmit(newJob);

    gooeyToast.success("Job added successfully!", {
      description: "Your job has been added successfully.",
    });

    reset();
    navigate("/jobs");
  };

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phonePattern = /^[0-9+()\-\s]{10,15}$/;

  const jobImages = [
    { src: happyManager },
    { src: givingJobAssistance },
    { src: onhisLaptop },
  ];

  const handleNext = async () => {
    const isValid = await trigger([
      "type",
      "title",
      "description",
      "salary",
      "location",
    ]);

    if (!isValid) {
      return;
    }

    setCurrentStep(2);
  };

  const handleTabChange = (step) => {
    setCurrentStep(step);
  };

  const handleBack = () => {
    setCurrentStep(1);
  };

  return (
    <section className="add-job-page">
      <div className="container-fluid_">
        <div className="row add-job-layout">
          {/* IMAGE SECTION */}
          <div className="col-lg-5 col-md-5 col-12 add-job-visual-section">
            <div className="add-job-visual-inner" style={{boxShadow:"0 6px 18px rgba(15, 23, 42, 0.05)"}}>
              <ImageSlideshow
                images={jobImages}
                intervalDuration={10000}
                objectFit="cover"
                className="add-job-slideshow"
              />
            </div>
          </div>

          {/* FORM SECTION */}
          <div className="col-lg-7 col-md-7 col-12 add-job-form-section" >
            <div className="add-job-form-wrapper">
              {/* HEADER */}
              <div className="add-job-heading" >
                {/* <span className="add-job-eyebrow">JOB POSTING</span> */}

                <h3 style={{ fontSize: "30px" }}>Add Job</h3>

                <p>
                  Create a new job listing and connect with the right
                  candidates.
                </p>
              </div>

              {/* =========================
                  MODERN TAB NAVIGATION
              ========================== */}
              <div
                className="add-job-tabs"
                role="tablist"
                aria-label="Job posting sections"
              >
                <button
                  type="button"
                  role="tab"
                  aria-selected={currentStep === 1}
                  className={`add-job-tab ${
                    currentStep === 1 ? "add-job-tab-active" : ""
                  }`}
                  onClick={() => handleTabChange(1)}
                >
                  <span className="add-job-tab-number">
                    {currentStep === 2 ? <Check size={17} /> : "01"}
                  </span>

                  <span className="add-job-tab-content">
                    <strong>Job Details</strong>
                    <small>Position information</small>
                  </span>
                </button>

                <button
                  type="button"
                  role="tab"
                  aria-selected={currentStep === 2}
                  disabled={currentStep === 1}
                  style={{
                    cursor: currentStep === 1 ? "not-allowed" : "pointer",
                  }}
                  className={`add-job-tab ${
                    currentStep === 2 ? "add-job-tab-active" : ""
                  } ${currentStep === 1 ? "add-job-tab-disabled" : ""}`}
                  onClick={() => handleTabChange(2)}
                >
                  <span className="add-job-tab-number">02</span>

                  <span className="add-job-tab-content">
                    <strong>Company Info</strong>
                    <small>Company information</small>
                  </span>
                </button>
              </div>

              <form
                onSubmit={handleSubmit(onSubmit)}
                noValidate
                className="add-job-form"
              >
                {/* =========================
                    TAB CONTENT
                ========================== */}
                <div className="add-job-tab-container">
                  {/* =========================
                      JOB DETAILS TAB
                  ========================== */}
                  <div
                    className={`add-job-tab-panel ${
                      currentStep === 1
                        ? "add-job-tab-panel-active"
                        : "add-job-tab-panel-hidden"
                    }`}
                    role="tabpanel"
                    aria-hidden={currentStep !== 1}
                  >
                    <div className="form-section add-job-compact-section">
                      <div className="form-section-heading">
                        <span className="section-number">01</span>

                        <div>
                          <h3>Job Details</h3>

                          <p>
                            Provide the details of the position you are hiring
                            for.
                          </p>
                        </div>
                      </div>

                      <div className="row g-2">
                        {/* JOB TYPE */}
                        <div className="col-lg-6 col-md-6 col-12">
                          <div className="form-field">
                            <label htmlFor="type">Job Type</label>

                            <select
                              id="type"
                              {...register("type", {
                                required: "Please select a job type",
                                onChange: () => clearErrors("type"),
                              })}
                              className={`form-control-modern ${
                                errors.type ? "input-error" : ""
                              }`}
                            >
                              <option value="Full-Time">Full-Time</option>
                              <option value="Part-Time">Part-Time</option>
                              <option value="Remote">Remote</option>
                              <option value="Internship">Internship</option>
                            </select>

                            {errors.type && (
                              <p className="form-error">
                                {errors.type.message}
                              </p>
                            )}
                          </div>
                        </div>

                        {/* JOB LISTING NAME */}
                        <div className="col-lg-6 col-md-6 col-12">
                          <div className="form-field">
                            <label htmlFor="title">Job Listing Name</label>

                            <input
                              type="text"
                              id="title"
                              {...register("title", {
                                required: "Job listing name is required",
                                onChange: () => clearErrors("title"),
                              })}
                              className={`form-control-modern ${
                                errors.title ? "input-error" : ""
                              }`}
                              placeholder="eg. React Developer"
                            />

                            {errors.title && (
                              <p className="form-error">
                                {errors.title.message}
                              </p>
                            )}
                          </div>
                        </div>

                        {/* DESCRIPTION */}
                        <div className="col-lg-12 col-md-12 col-12">
                          <div className="form-field">
                            <label htmlFor="description">Description</label>

                            <textarea
                              id="description"
                              {...register("description", {
                                required: "Job description is required",
                                onChange: () => clearErrors("description"),
                              })}
                              className={`form-control-modern form-textarea ${
                                errors.description ? "input-error" : ""
                              }`}
                              rows="3"
                              placeholder="Add any job duties, expectations, requirements, etc"
                              style={{ resize: "none" }}
                            ></textarea>

                            {errors.description && (
                              <p className="form-error">
                                {errors.description.message}
                              </p>
                            )}
                          </div>
                        </div>

                        {/* SALARY */}
                        <div className="col-lg-6 col-md-6 col-12">
                          <div className="form-field">
                            <label htmlFor="salary">Salary</label>

                            <select
                              id="salary"
                              {...register("salary", {
                                required: "Salary is required",
                                onChange: () => clearErrors("salary"),
                              })}
                              className={`form-control-modern ${
                                errors.salary ? "input-error" : ""
                              }`}
                            >
                              <option value="Under $50K">Under $50K</option>
                              <option value="$50K - 60K">$50K - $60K</option>
                              <option value="$60K - 70K">$60K - $70K</option>
                              <option value="$70K - 80K">$70K - $80K</option>
                              <option value="$80K - 90K">$80K - $90K</option>
                              <option value="$90K - 100K">$90K - $100K</option>
                              <option value="$100K - 125K">
                                $100K - $125K
                              </option>
                              <option value="$125K - 150K">
                                $125K - $150K
                              </option>
                              <option value="$150K - 175K">
                                $150K - $175K
                              </option>
                              <option value="$175K - 200K">
                                $175K - $200K
                              </option>
                              <option value="Over $200K">Over $200K</option>
                            </select>

                            {errors.salary && (
                              <p className="form-error">
                                {errors.salary.message}
                              </p>
                            )}
                          </div>
                        </div>

                        {/* LOCATION */}
                        <div className="col-lg-6 col-md-6 col-12">
                          <div className="form-field">
                            <label htmlFor="location">Location</label>

                            <input
                              type="text"
                              id="location"
                              {...register("location", {
                                required: "Location is required",
                                onChange: () => clearErrors("location"),
                              })}
                              className={`form-control-modern ${
                                errors.location ? "input-error" : ""
                              }`}
                              placeholder="Company Location"
                            />

                            {errors.location && (
                              <p className="form-error">
                                {errors.location.message}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* NEXT */}
                    <div className="add-job-tab-actions add-job-next-actions">
                      <button
                        type="button"
                        className="add-job-next-button"
                        onClick={handleNext}
                      >
                        <span>Continue to Company Info</span>
                        <span className="next-arrow">→</span>
                      </button>
                    </div>
                  </div>

                  {/* =========================
                      COMPANY INFO TAB
                  ========================== */}
                  <div
                    className={`add-job-tab-panel ${
                      currentStep === 2
                        ? "add-job-tab-panel-active"
                        : "add-job-tab-panel-hidden"
                    }`}
                    role="tabpanel"
                    aria-hidden={currentStep !== 2}
                  >
                    <div className="form-section add-job-compact-section">
                      <div className="form-section-heading">
                        <span className="section-number">02</span>

                        <div>
                          <h3>Company Info</h3>

                          <p>
                            Provide information candidates can use to learn
                            about your company.
                          </p>
                        </div>
                      </div>

                      <div className="row g-2">
                        {/* COMPANY NAME */}
                        <div className="col-lg-6 col-md-6 col-12">
                          <div className="form-field">
                            <label htmlFor="companyName">Company Name</label>

                            <input
                              type="text"
                              id="companyName"
                              {...register("companyName", {
                                required: "Company name is required",
                                onChange: () => clearErrors("companyName"),
                              })}
                              className={`form-control-modern ${
                                errors.companyName ? "input-error" : ""
                              }`}
                              placeholder="Company Name"
                            />

                            {errors.companyName && (
                              <p className="form-error">
                                {errors.companyName.message}
                              </p>
                            )}
                          </div>
                        </div>

                        {/* COMPANY DESCRIPTION */}
                        

                        {/* CONTACT EMAIL */}
                        <div className="col-lg-6 col-md-6 col-12">
                          <div className="form-field">
                            <label htmlFor="contactEmail">Contact Email</label>

                            <input
                              type="email"
                              id="contactEmail"
                              {...register("contactEmail", {
                                required: "Contact email is required",
                                pattern: {
                                  value: emailPattern,
                                  message: "Please enter a valid email address",
                                },
                                onChange: () => clearErrors("contactEmail"),
                              })}
                              className={`form-control-modern ${
                                errors.contactEmail ? "input-error" : ""
                              }`}
                              placeholder="Email address for applicants"
                            />

                            {errors.contactEmail && (
                              <p className="form-error">
                                {errors.contactEmail.message}
                              </p>
                            )}
                          </div>
                        </div>

                        {/* CONTACT PHONE */}
                        <div className="col-lg-6 col-md-6 col-12">
                          <div className="form-field">
                            <label htmlFor="contactPhone">Contact Phone</label>

                            <input
                              type="tel"
                              id="contactPhone"
                              {...register("contactPhone", {
                                required: "Contact phone is required",
                                pattern: {
                                  value: phonePattern,
                                  message: "Please enter a valid phone number",
                                },
                                onChange: () => clearErrors("contactPhone"),
                              })}
                              className={`form-control-modern ${
                                errors.contactPhone ? "input-error" : ""
                              }`}
                              placeholder="Optional phone for applicants"
                            />

                            {errors.contactPhone && (
                              <p className="form-error">
                                {errors.contactPhone.message}
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="col-lg-12 col-md-12 col-12">
                          <div className="form-field">
                            <label htmlFor="companyDescription">
                              Company Description
                            </label>

                            <textarea
                              id="companyDescription"
                              {...register("companyDescription", {
                                required: "Company description is required",
                                onChange: () =>
                                  clearErrors("companyDescription"),
                              })}
                              className={`form-control-modern form-textarea ${
                                errors.companyDescription ? "input-error" : ""
                              }`}
                              rows="3"
                              placeholder="What does your company do?"
                              style={{ resize: "none" }}
                            ></textarea>

                            {errors.companyDescription && (
                              <p className="form-error">
                                {errors.companyDescription.message}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* COMPANY ACTIONS */}
                    <div className="add-job-tab-actions add-job-company-actions">
                      <button
                        type="button"
                        className="add-job-back-button"
                        onClick={handleBack}
                      >
                        <span className="back-arrow"><MoveLeft size={17} /></span>
                        <span>Back</span>
                      </button>

                      <button
                        className="add-job-submit"
                        type="submit"
                        disabled={isSubmitting}
                      >
                        <span>
                          {isSubmitting ? "Adding Job..." : "Add Job"}
                        </span>

                        {!isSubmitting && (
                          <span className="submit-arrow"><MoveRight size={17} /></span>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AddJobPage;
