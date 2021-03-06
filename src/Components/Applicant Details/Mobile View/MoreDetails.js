import { DeleteApplicantDetails } from "../../GlobalConstant";
import Button from "@mui/material/Button";
import "./MoreDetails.css";

export function MoreDetails({
  details,
  show,
  i,
  setEditDetails,
  editDetails,
  setFetchedDetails,
}) {
  const styles = { height: show === i ? "160px" : "0px" }; //STYLE FOR HIDE/ SHOW THE MORE DETAILS CONTAINER

  // TO EMPTY THE FORM FIELDS AFTER DELETING THE APPLICANT DETAILS WHICH IS STILL HAVING EDIT FORM ACTIVE
  const ApplicantDetails = {
    name: "",
    countryCode: "",
    mobileNum: "",
    email: "",
    jobType: "",
    dob: "",
    prefLocation: [],
  };

  const ScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section style={styles} className="moreDetailsCntr">
      <article>
        <p>{details.email}</p>
        <p>{details.mobileNum}</p>
        <p>{details.dob}</p>
        <p>{details.jobType}</p>
      </article>

      <article>
        <div>
          <img src={details.picture} alt="Profile" />
        </div>

        <div className="buttonsCntr">
          <Button
            onClick={() => {
              ScrollToTop();
              setEditDetails(details);
            }}
            className="editBtn btnAnim"
            variant="contained"
          >
            Edit
          </Button>

          <Button
            onClick={() => {
              if (editDetails) {
                setEditDetails(ApplicantDetails);
              }
              DeleteApplicantDetails(details._id, setFetchedDetails);
            }}
            className="deleteBtn btnAnim"
            variant="contained"
          >
            Delete
          </Button>
        </div>
      </article>
    </section>
  );
}
