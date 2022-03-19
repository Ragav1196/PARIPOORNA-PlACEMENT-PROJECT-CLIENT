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

const columns = [
  { id: "name", label: "Name", align: "center", minWidth: 100 },
  { id: "email", label: "E-Mail", align: "center", minWidth: 100 },
  {
    id: "mobile",
    label: "Mobile",
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

function createData(name, email, mobile, dob, jobType, action) {
  return { name, email, mobile, dob, jobType, action };
}

const rows = [
  createData(
    "Ragavendiran Panchatsharam",
    "ragavinrap@gmail.com",
    "+91-9444249040",
    "01-10-1996",
    "Part Time"
  ),
  createData(
    "Ragavendiran",
    "ragavinrap@gmail.com",
    "+91-9444249040",
    "01-10-1996",
    "Part Time"
  ),
  createData(
    "Ragavendiran",
    "ragavinrap@gmail.com",
    "+91-9444249040",
    "01-10-1996",
    "Part Time"
  ),
  createData(
    "Ragavendiran",
    "ragavinrap@gmail.com",
    "+91-9444249040",
    "01-10-1996",
    "Part Time"
  ),
  createData(
    "Ragavendiran",
    "ragavinrap@gmail.com",
    "+91-9444249040",
    "01-10-1996",
    "Part Time"
  ),
  createData(
    "Ragavendiran",
    "ragavinrap@gmail.com",
    "+91-9444249040",
    "01-10-1996",
    "Part Time"
  ),
  createData(
    "Ragavendiran",
    "ragavinrap@gmail.com",
    "+91-9444249040",
    "01-10-1996",
    "Part Time"
  ),
  createData(
    "Ragavendiran",
    "ragavinrap@gmail.com",
    "+91-9444249040",
    "01-10-1996",
    "Part Time"
  ),
  createData(
    "Ragavendiran",
    "ragavinrap@gmail.com",
    "+91-9444249040",
    "01-10-1996",
    "Part Time"
  ),
  createData(
    "Ragavendiran",
    "ragavinrap@gmail.com",
    "+91-9444249040",
    "01-10-1996",
    "Part Time"
  ),
  createData(
    "Ragavendiran",
    "ragavinrap@gmail.com",
    "+91-9444249040",
    "01-10-1996",
    "Part Time"
  ),
  createData(
    "Ragavendiran",
    "ragavinrap@gmail.com",
    "+91-9444249040",
    "01-10-1996",
    "Part Time"
  ),
  createData(
    "Ragavendiran",
    "ragavinrap@gmail.com",
    "+91-9444249040",
    "01-10-1996",
    "Part Time"
  ),
  createData(
    "Ragavendiran",
    "ragavinrap@gmail.com",
    "+91-9444249040",
    "01-10-1996",
    "Part Time"
  ),
  createData(
    "Ragavendiran",
    "ragavinrap@gmail.com",
    "+91-9444249040",
    "01-10-1996",
    "Part Time"
  ),
  createData(
    "Ragavendiran",
    "ragavinrap@gmail.com",
    "+91-9444249040",
    "01-10-1996",
    "Part Time"
  ),
  createData(
    "Ragavendiran",
    "ragavinrap@gmail.com",
    "+91-9444249040",
    "01-10-1996",
    "Part Time"
  ),
  createData(
    "Ragavendiran",
    "ragavinrap@gmail.com",
    "+91-9444249040",
    "01-10-1996",
    "Part Time"
  ),
  createData(
    "Ragavendiran",
    "ragavinrap@gmail.com",
    "+91-9444249040",
    "01-10-1996",
    "Part Time"
  ),
  createData(
    "Ragavendiran",
    "ragavinrap@gmail.com",
    "+91-9444249040",
    "01-10-1996",
    "Part Time"
  ),
  createData(
    "Ragavendiran",
    "ragavinrap@gmail.com",
    "+91-9444249040",
    "01-10-1996",
    "Part Time"
  ),
  createData(
    "Ragavendiran",
    "ragavinrap@gmail.com",
    "+91-9444249040",
    "01-10-1996",
    "Part Time"
  ),
  createData(
    "Ragavendiran",
    "ragavinrap@gmail.com",
    "+91-9444249040",
    "01-10-1996",
    "Part Time"
  ),
  createData(
    "Ragavendiran",
    "ragavinrap@gmail.com",
    "+91-9444249040",
    "01-10-1996",
    "Part Time"
  ),
  createData(
    "Ragavendiran",
    "ragavinrap@gmail.com",
    "+91-9444249040",
    "01-10-1996",
    "Part Time"
  ),
  createData(
    "Ragavendiran",
    "ragavinrap@gmail.com",
    "+91-9444249040",
    "01-10-1996",
    "Part Time"
  ),
  createData(
    "Ragavendiran",
    "ragavinrap@gmail.com",
    "+91-9444249040",
    "01-10-1996",
    "Part Time"
  ),
  createData(
    "Ragavendiran",
    "ragavinrap@gmail.com",
    "+91-9444249040",
    "01-10-1996",
    "Part Time"
  ),
  createData(
    "Ragavendiran",
    "ragavinrap@gmail.com",
    "+91-9444249040",
    "01-10-1996",
    "Part Time"
  ),
  createData(
    "Ragavendiran",
    "ragavinrap@gmail.com",
    "+91-9444249040",
    "01-10-1996",
    "Part Time"
  ),
  createData(
    "Ragavendiran",
    "ragavinrap@gmail.com",
    "+91-9444249040",
    "01-10-1996",
    "Part Time"
  ),
  createData(
    "Ragavendiran",
    "ragavinrap@gmail.com",
    "+91-9444249040",
    "01-10-1996",
    "Part Time"
  ),
];

export default function StickyHeadTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <section className="table_mainCntr">
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
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
                .map((row) => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row.code}
                    >
                      {columns.map((column) => {
                        const value = row[column.id];
                        console.log(value);
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.id === "action" ? (
                              <div>
                                <button>Edit</button>
                                <button style={{ marginLeft: "10px" }}>
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
