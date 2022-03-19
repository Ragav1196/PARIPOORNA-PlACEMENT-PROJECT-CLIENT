import "./Form.css";

export function Form() {
  return (
    <section className="form_mainCntr">
      <form>
        <fieldset>
          <legend>REGISTRATION</legend>

          <article className="inputFields">
            <label htmlFor="name">
              Full Name
              <input type="text" id="name" />
            </label>

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

            <label className="mobileNum" htmlFor="mobile">
              Mobile
              <div>
                <input type="number" id="countryCode" />
                <input type="number" id="mobile" />
              </div>
            </label>

            <label htmlFor="email">
              Email ID
              <input type="email" id="email" />
            </label>

            <div className="JobType">
              <p>Job Type</p>

              <div>
                <input type="radio" id="ft" name="jobType" value="Full Time" />
                <label htmlFor="ft">FT</label>
                <input type="radio" id="pt" name="jobType" value="Part Time" />
                <label htmlFor="pt">PT</label>
                <input
                  type="radio"
                  id="consultant"
                  name="jobType"
                  value="Consultant"
                />
                <label htmlFor="consultant">Consultant</label>
              </div>
            </div>

            <label htmlFor="dob">
              DOB
              <input type="date" id="dob" />
            </label>

            <div className="pref_location">
              <p>Pref. Location</p>

              <div>
                <div>
                  <input
                    type="checkbox"
                    id="chennai"
                    name="chennai"
                    value="Chennai"
                  />
                  <label htmlFor="chennai">Chennai</label>
                </div>
                <div>
                  <input
                    type="checkbox"
                    id="bangalore"
                    name="bangalore"
                    value="Bangalore"
                  />
                  <label htmlFor="bangalore">Bangalore</label>
                </div>
                <div>
                  <input type="checkbox" id="pune" name="pune" value="Pune" />
                  <label htmlFor="pune">Pune</label>
                </div>
              </div>
            </div>
          </article>

          <button className="submit_btn">ADD/UPDATE</button>
        </fieldset>
      </form>
    </section>
  );
}
