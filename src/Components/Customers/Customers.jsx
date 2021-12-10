import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import HOC from "../../Common/Hoc";
import { Card, Grid } from "@material-ui/core";
//pagination
import TablePagination from "@material-ui/core/TablePagination";
import { blankValidator, showNotificationMsz } from "../utils/Validation";
import axios from "axios";
//css
import "./Catagories.css";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function Customers(props) {
  // for pagination hadler
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [page, setPage] = React.useState(0);

  const handleChangePage = (event, newPage) => {
    window.scrollTo(0, 0);
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const [titlename, settitlename] = useState("");
  const [isloading, setisloading] = useState(false);
  const [isUpdated, setisUpdated] = useState(false);
  const [ShowAlluserDataArry, setShowAlluserDataArry] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    //to get data of All users
    const getAlluserData = () => {
      try {
        setisloading(true);
        let url = "https://afternoon-bayou-76409.herokuapp.com/showAllUser";
        axios.get(url).then(
          (res) => {
            console.log("resgetall user data", res);
            setShowAlluserDataArry(res.data);
            setisloading(false);
          },
          (error) => {
            setisloading(false);
            showNotificationMsz(error, "danger");
          }
        );
      } catch (error) {
        setisloading(false);
        showNotificationMsz(error, "danger");
      }
    };
    getAlluserData();
  }, [isUpdated]);

  const filterData = ShowAlluserDataArry.filter((event) => {
    return event.username.toLowerCase().indexOf(titlename.toLowerCase()) !== -1;
  });

  const classes = useStyles();

  return (
    <>
      <div>
        <div className="content_padding">
          <Grid className="Component_main_grid mb-3">
            <Grid item md={9}>
              {" "}
              <h3 className="mb-2">User Details</h3>
            </Grid>
            <Grid item md={3}>
              <div className="d-flex">
                <span className="p-2">
                  <i class="fa fa-search"></i>
                </span>
                <span>
                  <input
                    value={titlename}
                    onChange={(e) => {
                      settitlename(e.target.value);
                    }}
                    type="text"
                    class="form-control"
                    placeholder="Search by Name"
                  />
                </span>
              </div>
            </Grid>
          </Grid>

          <Card classname="main_card p-3">
            <TableContainer>
              <Table className={classes.table} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>IMAGE</TableCell>
                    <TableCell>NAME</TableCell>
                    <TableCell>EMAIL</TableCell>

                    <TableCell>PHONE</TableCell>

                    <TableCell>STATUS</TableCell>
                    {/* <TableCell>OPERATIONS</TableCell> */}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {(rowsPerPage > 0
                    ? filterData.slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                    : filterData
                  ).map((row) => (
                    <TableRow key={row.name}>
                      <TableCell>
                        <img
                          src={`https://afternoon-bayou-76409.herokuapp.com/${row.image}`}
                          style={{ height: "60px", width: "80px" }}
                        />
                      </TableCell>
                      <TableCell>{row.username}</TableCell>
                      <TableCell>{row.email}</TableCell>
                      <TableCell>{row.phone}</TableCell>

                      <TableCell>Active</TableCell>
                      {/* <TableCell>
                        <span
                          className="mr-3 ml-3 background_icon_padding"
                          onClick={() => props.history.push("/edit1")}
                        >
                          <i class="fa fa-edit"></i>
                        </span>
                        <span className="background_icon_delete">
                          <i class="fa fa-trash"></i>
                        </span>
                      </TableCell> */}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <TablePagination
                true
                rowsPerPageOptions={false}
                component="div"
                count={filterData.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
              />
            </TableContainer>
          </Card>

          <br />
        </div>
      </div>
    </>
  );
}
export default HOC(Customers);
