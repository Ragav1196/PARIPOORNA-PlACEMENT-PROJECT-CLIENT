// PREFERREFD LOCATION
export function PreferredLocation({
  errors,
  touched,
  handleChange,
  handleBlur,
  SetCheckboxValue,
}) {
  return (
    <div className="pref_location">
      <p>Pref. Location</p>

      <div>
        <div
          className={
            errors.prefLocation && touched.prefLocation ? "errorsSpl" : ""
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
            errors.prefLocation && touched.prefLocation ? "errorsSpl" : ""
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
            errors.prefLocation && touched.prefLocation ? "errorsSpl" : ""
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
  );
}
