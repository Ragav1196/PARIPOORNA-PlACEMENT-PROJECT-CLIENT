import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import "./Table.css";
import { API_URL } from "../GlobalConstant";
import { useEffect } from "react";

export default function StickyHeadTable({
  setEditDetails,
  fetchedDetails,
  setFetchedDetails,
}) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  // TO GET THE APPLICANT DETAILS EVERY TIME THE PAGE RELOADS
  useEffect(() => {
    fetch(`${API_URL}/details`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((response) => setFetchedDetails(response.data));
  }, []);

  // TO DELETE APPLICANT DETAILS
  const DeleteApplicantDetails = async (id) => {
    console.log(id);
    await fetch(`${API_URL}/details/${id}`, {
      method: "DELETE",
    });

    // TO REFRESH THE APPLICANT DETAILS TABLE AFTER DELETING
    await fetch(`${API_URL}/details`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((response) => setFetchedDetails(response.data));
  };

  const columns = [
    { id: "name", label: "Name", align: "center", minWidth: 100 },
    { id: "email", label: "E-Mail", align: "center", minWidth: 100 },
    {
      id: "mobileNum",
      label: "MobileNum",
      minWidth: 110,
      align: "center",
    },
    {
      id: "dob",
      label: "DOB",
      minWidth: 100,
      align: "center",
    },
    {
      id: "jobType",
      label: "Job Type",
      minWidth: 50,
      align: "center",
    },

    {
      id: "action",
      label: "Action",
      minWidth: 120,
      align: "center",
    },
  ];

  // ADDING FETCHED DETAILS OF APPLICANT FROM DATABASE TO THE TABLE
  const rows = fetchedDetails ? [...fetchedDetails] : [];

  return (
    <section className="table_mainCntr">
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column, i) => (
                  <TableCell
                    key={i}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, i) => {
                  return (
                    <TableRow
                      id={row._id}
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={i}
                    >
                      {columns.map((column, i) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={i} align={column.align}>
                            {column.id === "action" ? (
                              <div>
                                <button onClick={() => setEditDetails(row)}>
                                  Edit
                                </button>
                                <button
                                  onClick={() =>
                                    DeleteApplicantDetails(row._id)
                                  }
                                  style={{ marginLeft: "10px" }}
                                >
                                  Delete
                                </button>
                              </div>
                            ) : (
                              value
                            )}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </section>
  );
}
