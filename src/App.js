import "./App.css";
import { useState } from "react";
import { Form } from "./Components/Form/Form";
import StickyHeadTable from "./Components/Table/Table";

function App() {
  const [editDetails, setEditDetails] = useState(""); //TO DISPLAY THE DETAILS OF SELECTED APPLICANT
  const [fetchedDetails, setFetchedDetails] = useState(null); //TO SAVE THE FETCHED APPLICANT DETAILS FROM DATABASE

  return (
    <div className="App">
      {/* REGISTRATION FORM */}
      <Form editDetails={editDetails} setFetchedDetails={setFetchedDetails} />

      {/* TABLE TO DISPLAY THE APPLIICANT DETAILS */}
      <StickyHeadTable
        setEditDetails={setEditDetails}
        fetchedDetails={fetchedDetails}
        setFetchedDetails={setFetchedDetails}
      />
    </div>
  );
}

export default App;
