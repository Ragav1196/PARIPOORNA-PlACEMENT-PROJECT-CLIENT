import { useFormik } from "formik";
import { useEffect, useState, useRef } from "react";
import * as yup from "yup";
import {
  AddApplicantDetails,
  EditApplicantDetails,
  uploadToCloudinary,
} from "../GlobalConstant";
import Button from "@mui/material/Button";
import "./Form.css";

export function Form({ editDetails, setFetchedDetails }) {
  // TO CHANGE THE COLOR OF THE RADIO BUTTON (JOB TYPE) WHEN CLICKED
  const [radioBtnClrChng, setRadioBtnClrChng] = useState({});

  // TO SHOW THE IMAGE CHOSE IN THE INPUT FIELD
  const [image, setImage] = useState("");

  const onImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  const pictureRef = useRef(); // REF HOOK FOR THE INPUT FIELD OF THE PROFILE PICTURE

  // FORM VALIDATION
  const formValidationSchema = yup.object({
    name: yup.string().required(),
    picture: yup.string().required(),
    countryCode: yup.number().required(),
    mobileNum: yup.number().required(),
    email: yup.string().required(),
    jobType: yup.string().required(),
    dob: yup.string().required(),
    prefLocation: yup.array().min(1),
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
      picture: "",
      countryCode: "+91",
      mobileNum: "",
      email: "",
      jobType: "",
      dob: "",
      prefLocation: [],
    },
    validationSchema: formValidationSchema,
    onSubmit: (applicantDetails, { resetForm }) => {
      // EDITING APPLICANT DETAILS
      if (editDetails) {
        return EditApplicantDetails(
          applicantDetails,
          resetForm,
          editDetails,
          setFetchedDetails,
          setImage
        );
      }

      // ADDING APPLICANT DETAILS
      uploadToCloudinary(applicantDetails.picture)
        .then((data) => data.json())
        .then((data) => {
          if (data.secure_url) {
            applicantDetails.picture = data.secure_url;
            AddApplicantDetails(
              applicantDetails,
              resetForm,
              setFetchedDetails,
              setImage,
              setRadioBtnClrChng,
              pictureRef
            );
          }
        })
        .catch((err) => console.log(err));
    },
  });

  // TO ADD THE SELECTED APPLICANT DETAILS TO THE FORM FIELDS
  useEffect(() => {
    if (editDetails) {
      setImage(""); // TO DELETE THE IMAGE  SHOWN IN THE FORM
      for (let details in editDetails) {
        if (details === "picture") {
          setImage(editDetails[details]);
        }

        if (details === "jobType") {
          setRadioBtnClrChng({ value: editDetails[details] });
        }
        setFieldValue(details, editDetails[details]);
      }
    }
  }, [editDetails, setFieldValue]);

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

          <article className="inputFields">
            {/* PROFILE PICTURE - MOBILE VIEW */}
            <div className="applicant_img_cntr mobileView applicant_img_cntr_MV">
              <img
                className="applicant_img"
                src={image ? image : "https://i.stack.imgur.com/l60Hf.png"}
                alt="Profile"
              />

              <input
                type="file"
                ref={pictureRef}
                name="picture"
                onChange={(e) => {
                  setFieldValue("picture", e.target.files[0]);
                  onImageChange(e);
                }}
                className={errors.picture && touched.picture ? "errorsSpl" : ""}
              />
            </div>

            {/* FULL NAME */}
            <label htmlFor="name">
              Full Name
              <input
                type="text"
                id="name"
                name="name"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.name}
                className={errors.name && touched.name ? "errors" : ""}
              />
            </label>

            {/* PROFILE PICTURE - DESKTOP VIEW */}
            <div className="applicant_img_cntr desktopView">
              <p>Profile Pic</p>

              <div>
                <img
                  className="applicant_img"
                  src={image ? image : "https://i.stack.imgur.com/l60Hf.png"}
                  alt="Profile"
                />

                <input
                  type="file"
                  ref={pictureRef}
                  name="picture"
                  onChange={(e) => {
                    setFieldValue("picture", e.target.files[0]);
                    onImageChange(e);
                  }}
                  className={
                    errors.picture && touched.picture ? "errorsSpl" : ""
                  }
                />
              </div>
            </div>

            {/* MOBILE NUMBER */}
            <label className="mobileNum" htmlFor="mobile">
              Mobile
              <div>
                <input
                  type="text"
                  id="countryCode"
                  name="countryCode"
                  onChange={handleChange}
                  value={values.countryCode}
                  disabled
                />

                <input
                  type="number"
                  id="mobileNum"
                  name="mobileNum"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.mobileNum}
                  className={
                    errors.mobileNum && touched.mobileNum ? "errors" : ""
                  }
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
                className={errors.email && touched.email ? "errors" : ""}
              />
            </label>

            {/* JOB TYPE */}
            <div className="JobType">
              <p>Job Type</p>

              <div
                className={errors.jobType && touched.jobType ? "errorsSpl" : ""}
              >
                <label htmlFor="ft">
                  <input
                    type="radio"
                    id="ft"
                    name="jobType"
                    value="Full Time"
                    checked={values.jobType === "Full Time"}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    onClick={() => setRadioBtnClrChng({ value: "Full Time" })}
                  />

                  <span
                    style={{
                      backgroundColor:
                        radioBtnClrChng.value === "Full Time"
                          ? "#1576f563"
                          : "initial",
                    }}
                    className="RadioBtnBox"
                  >
                    FT
                  </span>
                </label>

                <label htmlFor="pt">
                  <input
                    type="radio"
                    id="pt"
                    name="jobType"
                    value="Part Time"
                    checked={values.jobType === "Part Time"}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    onClick={() => setRadioBtnClrChng({ value: "Part Time" })}
                  />

                  <span
                    style={{
                      backgroundColor:
                        radioBtnClrChng.value === "Part Time"
                          ? "#1576f563"
                          : "initial",
                    }}
                    className="RadioBtnBox"
                  >
                    PT
                  </span>
                </label>

                <label htmlFor="consultant">
                  <input
                    type="radio"
                    id="consultant"
                    name="jobType"
                    value="Consultant"
                    checked={values.jobType === "Consultant"}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    onClick={() => setRadioBtnClrChng({ value: "Consultant" })}
                  />

                  <span
                    style={{
                      backgroundColor:
                        radioBtnClrChng.value === "Consultant"
                          ? "#1576f563"
                          : "initial",
                    }}
                    className="RadioBtnBox"
                  >
                    Consultant
                  </span>
                </label>
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
                className={errors.dob && touched.dob ? "errors" : ""}
              />
            </label>

            {/* PREFERREFD LOCATION */}
            <div className="pref_location">
              <p>Pref. Location</p>

              <div>
                <div
                  className={
                    errors.prefLocation && touched.prefLocation
                      ? "errorsSpl"
                      : ""
                  }
                >
                  <input
                    type="checkbox"
                    id="chennai"
                    name="prefLocation"
                    value="Chennai"
                    checked={SetCheckboxValue("Chennai") === "Chennai"}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <label htmlFor="chennai">Chennai</label>
                </div>
                <div
                  className={
                    errors.prefLocation && touched.prefLocation
                      ? "errorsSpl"
                      : ""
                  }
                >
                  <input
                    type="checkbox"
                    id="bangalore"
                    name="prefLocation"
                    value="Bangalore"
                    checked={SetCheckboxValue("Bangalore") === "Bangalore"}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <label htmlFor="bangalore">Bangalore</label>
                </div>
                <div
                  className={
                    errors.prefLocation && touched.prefLocation
                      ? "errorsSpl"
                      : ""
                  }
                >
                  <input
                    type="checkbox"
                    id="pune"
                    name="prefLocation"
                    value="Pune"
                    checked={SetCheckboxValue("Pune") === "Pune"}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <label htmlFor="pune">Pune</label>
                </div>
              </div>
            </div>
          </article>

          {/* SUBMIT BUTTON */}
          <Button
            type="submit"
            className="submit_btn btnAnim"
            variant="contained"
          >
            ADD/UPDATE
          </Button>
        </fieldset>
      </form>
    </section>
  );
}
