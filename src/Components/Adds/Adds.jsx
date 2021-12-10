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
import axios from "axios";
import { blankValidator, showNotificationMsz } from "../utils/Validation";
import Loder from "../Loder/Loder";
//css
import "./Adds.css";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function Adds() {
  const [addsshowArry, setaddsshowArry] = useState([]);
  const [isUpdated, setisUpdated] = useState(false);
  const [isloading, setisloading] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    //to get data of ads

    const Adscodedata = () => {
      try {
        //  setisloading(true);
        let url = "https://afternoon-bayou-76409.herokuapp.com/getAdDetail";

        axios.get(url).then(
          (res) => {
            setaddsshowArry(res.data);
            //  setisloading(false);
            console.log("adsgetdatacode", res);
          },
          (error) => {
            // setisloading(false);
            //showNotificationMsz(error, "danger");
          }
        );
      } catch (error) {
        // setisloading(false);
        // showNotificationMsz(error, "danger");
      }
    };
    Adscodedata();
  }, []);

  const ApproveAdds = (data) => {
    //auction id
    let id = data._id;
    try {
      setisloading(true);
      let url = `https://afternoon-bayou-76409.herokuapp.com/approveAd/${id}`;
      axios.get(url).then(
        (res) => {
          setisloading(false);
          setisUpdated(!isUpdated);
          showNotificationMsz(res.data.msg, "success");
          console.log("resdelete", res);
        },
        (error) => {
          showNotificationMsz(error, "danger");
          setisloading(false);
        }
      );
    } catch (error) {
      showNotificationMsz(error, "danger");
      setisloading(false);
    }
  };

  const RejectAdds = (data) => {
    //auction id
    let id = data._id;
    try {
      setisloading(true);
      let url = `https://afternoon-bayou-76409.herokuapp.com/rejectAd/${id}`;
      axios.get(url).then(
        (res) => {
          setisloading(false);
          setisUpdated(!isUpdated);
          showNotificationMsz(res.data.msg, "success");
          console.log("resdelete", res);
        },
        (error) => {
          showNotificationMsz(error, "danger");
          setisloading(false);
        }
      );
    } catch (error) {
      showNotificationMsz(error, "danger");
      setisloading(false);
    }
  };

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

  const filterData = addsshowArry.filter((event) => {
    return event.title.toLowerCase().indexOf(titlename.toLowerCase()) !== -1;
  });

  const classes = useStyles();

  return (
    <>
      <div>
        <div className="content_padding">
          <Grid className="Component_main_grid mb-3">
            <Grid item md={9}>
              {" "}
              <h3 className="mb-2">Ads Details</h3>
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
                    placeholder="Search by Title Name"
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
                    <TableCell>ID</TableCell>
                    <TableCell>IMAGE</TableCell>
                    <TableCell>TITLE</TableCell>

                    <TableCell>CATEGORIES</TableCell>
                    <TableCell>FEATURES</TableCell>

                    <TableCell>AD TYPE</TableCell>
                    <TableCell>PRICE</TableCell>
                    <TableCell className="text-center">ACTION</TableCell>
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
                      <TableCell component="th" scope="row">
                        {row._id}
                      </TableCell>
                      <TableCell className="">
                        <img
                          style={{ height: "30px", width: "50px" }}
                          src={`https://afternoon-bayou-76409.herokuapp.com/${row.image}`}
                        />
                      </TableCell>
                      <TableCell>{row.title}</TableCell>
                      <TableCell>{row.category}</TableCell>
                      <TableCell>{row.features}</TableCell>
                      <TableCell>{row.adType}</TableCell>
                      <TableCell>{row.price}</TableCell>
                      <TableCell>
                        <div className="d-flex">
                          <button
                            type="button"
                            class="btn btn-info mr-2"
                            onClick={() => ApproveAdds(row)}
                          >
                            Approve
                          </button>

                          <button
                            type="button"
                            class="btn btn-danger"
                            onClick={() => RejectAdds(row)}
                          >
                            Reject
                          </button>
                        </div>
                      </TableCell>
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
      <Loder loading={isloading} />
    </>
  );
}
export default HOC(Adds);
