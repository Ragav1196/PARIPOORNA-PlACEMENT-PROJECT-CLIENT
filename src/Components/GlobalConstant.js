export const API_URL = "https://paripoorna-placement-project.herokuapp.com";
// export const API_URL = "http://localhost:9000";

const ScrollToBottom = () => {
  window.scrollTo({
    top: document.body.offsetHeight,
    left: 0,
    behavior: "smooth",
  });
};

export async function GetApplicantDetails(setFetchedDetails) {
  await fetch(`${API_URL}/details`, {
    method: "GET",
  })
    .then((response) => response.json())
    .then((response) => setFetchedDetails(response.data));
}

// // TO ADD NEW APPLICANT TO THE DATABASE
export async function AddApplicantDetails(
  applicantDetails,
  resetForm,
  setFetchedDetails,
  setImage,
  setRadioBtnClrChng,
  pictureRef
) {
  await fetch(`${API_URL}/details`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(applicantDetails),
  });

  resetForm(); // TO RESET THE FORM ONCE NEW APPLICANT ADDED
  setImage(""); // TO DELETE THE IMAGE  SHOWN IN THE FORM
  setRadioBtnClrChng(""); // TO CHANGE THE COLOR OF THE RADIO BUTTON BACK TO NORMAL
  pictureRef.current.value = ""; // TO CHANGE THE INPUT FIELD OF PROFILE PICTURE BACK TO DEFAUL STATE

  // TO GET THE NEW APPLICANT DETAILS LIST FROM THE DATABASE AFTER ADDING
  GetApplicantDetails(setFetchedDetails);
  ScrollToBottom();
}

// TO EDIT THE SELECTED APPLICANT DETAILS AND PUSH TO THE DATABSE
export async function EditApplicantDetails(
  applicantDetails,
  resetForm,
  editDetails,
  setFetchedDetails,
  setImage
) {
  delete applicantDetails._id;
  await fetch(`${API_URL}/details/${editDetails._id}`, {
    method: "PUT",
    body: JSON.stringify(applicantDetails),
    headers: { "Content-Type": "application/json" },
  });

  resetForm(); // TO RESET THE FORM ONCE APPLICANT DETAILS EDITED AND SAVED
  setImage(""); // TO DELETE THE IMAGE  SHOWN IN THE FORM

  // TO GET THE NEW APPLICANT DETAILS LIST FROM THE DATABASE AFTER EDITING
  await fetch(`${API_URL}/details`, {
    method: "GET",
  })
    .then((response) => response.json())
    .then((response) => {
      setFetchedDetails(response.data);
      ScrollToBottom();
    });
}

// TO DELETE APPLICANT DETAILS
export async function DeleteApplicantDetails(id, setFetchedDetails) {
  await fetch(`${API_URL}/details/${id}`, {
    method: "DELETE",
  });

  // TO REFRESH THE APPLICANT DETAILS TABLE AFTER DELETING
  GetApplicantDetails(setFetchedDetails);
}

// TO UPLOAD IMAGE TO THE CLOUDINARY PLATFORM
export const uploadToCloudinary = (picture) => {
  const data = new FormData();
  data.append("file", picture);
  data.append("upload_preset", "v8ffqqp5");
  data.append("cloud_name", "dyi6asb8c");

  return fetch("https://api.cloudinary.com/v1_1/dyi6asb8c/image/upload", {
    method: "POST",
    body: data,
  });
};
