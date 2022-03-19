import { useFormik } from "formik";
import { useEffect } from "react";
import * as yup from "yup";
import { API_URL } from "../GlobalConstant";
import "./Form.css";

export function Form({ editDetails, setFetchedDetails }) {
  // TO ADD NEW APPLICANT TO THE DATABASE
  async function AddApplicantDetails(applicantDetails, resetForm) {
    await fetch(`${API_URL}/details`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(applicantDetails),
    });

    resetForm(); //TO RESET THE FORM ONCE NEW APPLICANT ADDED

    // TO GET THE NEW APPLICANT DETAILS LIST FROM THE DATABASE AFTER ADDING
    await fetch(`${API_URL}/details`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((response) => setFetchedDetails(response.data));
  }

  // TO EDIT THE SELECTED APPLICANT DETAILS AND PUSH TO THE DATABSE
  async function EditApplicantDetails(applicantDetails, resetForm) {
    delete applicantDetails._id;
    await fetch(`${API_URL}/details/${editDetails._id}`, {
      method: "PUT",
      body: JSON.stringify(applicantDetails),
      headers: { "Content-Type": "application/json" },
    });

    resetForm(); //TO RESET THE FORM ONCE APPLICANT DETAILS EDITED AND SAVED

    // TO GET THE NEW APPLICANT DETAILS LIST FROM THE DATABASE AFTER EDITING
    await fetch(`${API_URL}/details`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((response) => setFetchedDetails(response.data));
  }

  // FORM VALIDATION
  const formValidationSchema = yup.object({
    name: yup.string().required("Please Provide Your Fullname"),
    countryCode: yup.number().required("Please Provide YOur Country Code"),
    mobileNum: yup.number().required("Please Provide Your Mobile Number"),
    email: yup.string().required("Please Provide Your E-Mail"),
    jobType: yup.string().required("please provide your Job Type"),
    dob: yup.string().required("please provide your Date Of Birth"),
    prefLocation: yup.array().min(1, "Please provide your Preferred Location"),
  });

  // FORMIK
  const {
    handleSubmit,
    handleChange,
    handleBlur,
    touched,
    errors,
    values,
    setFieldValue,
  } = useFormik({
    initialValues: {
      name: "",
      countryCode: "",
      mobileNum: "",
      email: "",
      jobType: "",
      dob: "",
      prefLocation: [],
    },
    validationSchema: formValidationSchema,
    onSubmit: (applicantDetails, { resetForm }) => {
      if (editDetails) {
        return EditApplicantDetails(applicantDetails, resetForm);
      }
      AddApplicantDetails(applicantDetails, resetForm);
    },
  });

  // TO ADD THE SELECTED APPLICANT DETAILS TO THE FORM FIELDS
  useEffect(() => {
    if (editDetails) {
      for (let details in editDetails) {
        setFieldValue(details, editDetails[details]);
      }
    }
  }, [editDetails]);

  // TO SELECT THE APPLICANT PREFERRED LOCATION DETAILS DYNAMICALLY DURING EDITING
  const prefLocation = values.prefLocation;
  function SetCheckboxValue(placeName) {
    if (prefLocation.length) {
      const foundPlaceName = prefLocation.find((data) => data === placeName);
      return foundPlaceName;
    }
  }

  return (
    <section className="form_mainCntr">
      <form onSubmit={handleSubmit}>
        <fieldset>
          <legend>REGISTRATION</legend>

          {/* FULL NAME */}
          <article className="inputFields">
            <label htmlFor="name">
              Full Name
              <input
                type="text"
                id="name"
                name="name"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.name}
              />
            </label>

            {/* PROFILE PICTURE */}
            <div className="applicant_img_cntr">
              <p>Profile Pic</p>

              <div>
                <img
                  className="applicant_img"
                  src="https://avatars.githubusercontent.com/u/91084155?v=4"
                  alt="Profile"
                />

                <input type="file" />
              </div>
            </div>

            {/* MOBILE NUMBER */}
            <label className="mobileNum" htmlFor="mobile">
              Mobile
              <div>
                <input
                  type="number"
                  id="countryCode"
                  name="countryCode"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.countryCode}
                />
                <input
                  type="number"
                  id="mobileNum"
                  name="mobileNum"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.mobileNum}
                />
              </div>
            </label>

            {/* EMAIL ID */}
            <label htmlFor="email">
              Email ID
              <input
                type="email"
                id="email"
                name="email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
              />
            </label>

            {/* JOB TYPE */}
            <div className="JobType">
              <p>Job Type</p>

              <div>
                <input
                  type="radio"
                  id="ft"
                  name="jobType"
                  value="Full Time"
                  checked={values.jobType === "Full Time"}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <label htmlFor="ft">FT</label>
                <input
                  type="radio"
                  id="pt"
                  name="jobType"
                  value="Part Time"
                  checked={values.jobType === "Part Time"}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <label htmlFor="pt">PT</label>
                <input
                  type="radio"
                  id="consultant"
                  name="jobType"
                  value="Consultant"
                  checked={values.jobType === "Consultant"}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <label htmlFor="consultant">Consultant</label>
              </div>
            </div>

            {/* DATE OF BIRTH */}
            <label htmlFor="dob">
              DOB
              <input
                type="date"
                id="dob"
                name="dob"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.dob}
              />
            </label>

            {/* PREFERREF LOCATION */}
            <div className="pref_location">
              <p>Pref. Location</p>

              <div>
                <div>
                  <input
                    type="checkbox"
                    id="chennai"
                    name="prefLocation"
                    value="Chennai"
                    checked={SetCheckboxValue("Chennai") == "Chennai"}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <label htmlFor="chennai">Chennai</label>
                </div>
                <div>
                  <input
                    type="checkbox"
                    id="bangalore"
                    name="prefLocation"
                    value="Bangalore"
                    checked={SetCheckboxValue("Bangalore") == "Bangalore"}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <label htmlFor="bangalore">Bangalore</label>
                </div>
                <div>
                  <input
                    type="checkbox"
                    id="pune"
                    name="prefLocation"
                    value="Pune"
                    checked={SetCheckboxValue("Pune") == "Pune"}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <label htmlFor="pune">Pune</label>
                </div>
              </div>
            </div>
          </article>

          {/* SUBMIT BUTTON */}
          <button type="submit" className="submit_btn">
            ADD/UPDATE
          </button>
        </fieldset>
      </form>
    </section>
  );
}
