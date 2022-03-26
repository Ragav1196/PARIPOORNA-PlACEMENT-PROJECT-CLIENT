import { useFormik } from "formik";
import { useEffect, useState, useRef } from "react";
import * as yup from "yup";
import {
  AddApplicantDetails,
  EditApplicantDetails,
  uploadToCloudinary,
} from "../GlobalConstant";
import Button from "@mui/material/Button";
import { JobType } from "./Input Fields/JobType";
import "./Form.css";
import { PreferredLocation } from "./Input Fields/PreferredLocation";

export function Form({ editDetails, setFetchedDetails }) {
  // TO CHANGE THE COLOR OF THE RADIO BUTTON (JOB TYPE) WHEN CLICKED
  const [radioBtnClrChng, setRadioBtnClrChng] = useState({});

  // TO SHOW THE IMAGE CHOSE IN THE INPUT FIELD
  const [image, setImage] = useState("");

  // TO CHANGE THE ADD/UPDATE BUTTON TO SAVING... WHILE SAVING APPLICANT DETAILS
  const [editBtn, setEditBtn] = useState();

  const onImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage({
        URL: URL.createObjectURL(e.target.files[0]),
        isNewPicAdded: true,
      });
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
      setEditBtn(true);

      // EDITING APPLICANT DETAILS
      if (editDetails) {
        if (image.isNewPicAdded) {
          uploadToCloudinary(applicantDetails.picture)
            .then((data) => data.json())
            .then((data) => {
              applicantDetails.picture = data.secure_url;
              EditApplicantDetails(
                applicantDetails,
                resetForm,
                editDetails,
                setFetchedDetails,
                setImage,
                pictureRef,
                setRadioBtnClrChng,
                setEditBtn
              );
            })
            .catch((err) => console.log(err));
          return;
        } else {
          EditApplicantDetails(
            applicantDetails,
            resetForm,
            editDetails,
            setFetchedDetails,
            setImage,
            pictureRef,
            setRadioBtnClrChng,
            setEditBtn
          );
          return;
        }
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
              pictureRef,
              setEditBtn
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
          setImage({
            URL: editDetails[details],
            isNewPicAdded: false,
          });
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
                src={image ? image.URL : "https://i.stack.imgur.com/l60Hf.png"}
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
                  src={
                    image ? image.URL : "https://i.stack.imgur.com/l60Hf.png"
                  }
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

            <JobType
              errors={errors}
              touched={touched}
              values={values}
              handleChange={handleChange}
              setRadioBtnClrChng={setRadioBtnClrChng}
              radioBtnClrChng={radioBtnClrChng}
              handleBlur={handleBlur}
            />

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
            <PreferredLocation
              errors={errors}
              touched={touched}
              values={values}
              handleChange={handleChange}
              setRadioBtnClrChng={setRadioBtnClrChng}
              radioBtnClrChng={radioBtnClrChng}
              handleBlur={handleBlur}
              SetCheckboxValue={SetCheckboxValue}
            />
          </article>

          {/* SUBMIT BUTTON */}
          <Button
            type="submit"
            className="submit_btn btnAnim"
            variant="contained"
          >
            {editBtn && !Object.keys(errors).length
              ? "Saving...."
              : "ADD/UPDATE"}
          </Button>
        </fieldset>
      </form>
    </section>
  );
}
