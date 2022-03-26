// JOB TYPE
export function JobType({
  errors,
  touched,
  values,
  handleChange,
  setRadioBtnClrChng,
  radioBtnClrChng,
  handleBlur,
}) {
  return (
    <div className="JobType">
      <p>Job Type</p>

      <div className={errors.jobType && touched.jobType ? "errorsSpl" : ""}>
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
                radioBtnClrChng.value === "Full Time" ? "#1576f563" : "initial",
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
                radioBtnClrChng.value === "Part Time" ? "#1576f563" : "initial",
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
  );
}
