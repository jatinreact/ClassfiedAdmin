import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Expand from "react-expand-animated";
import HOC from "../../Common/Hoc";
import { Card, Grid } from "@material-ui/core";
//pagination
import TablePagination from "@material-ui/core/TablePagination";
import axios from "axios";
import { blankValidator, showNotificationMsz } from "../utils/Validation";
import Loder from "../Loder/Loder";

//DIALOG BOX
import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
} from "@material-ui/core";

//css

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function AddPackage(props) {
  const [EditDailogOpen, setEditDailogOpen] = useState("");
  const [isUpdated, setisUpdated] = useState(false);
  const [isloading, setisloading] = useState(false);
  const [addMangeopen, setaddMangeopen] = useState(false);
  const [packageDataArry, setpackageDataArry] = useState([]);
  const [startdate, setstartdate] = useState("");
  const [enddate, setenddate] = useState("");
  const [price, setprice] = useState("");

  ///get Package
  useEffect(() => {
    window.scrollTo(0, 0);

    const getPackagedata = () => {
      try {
        setisloading(true);
        let url = "https://afternoon-bayou-76409.herokuapp.com/getPackage";
        axios.get(url).then(
          (res) => {
            console.log("resgetpackage data Arry", res);
            setpackageDataArry(res.data);
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
    getPackagedata();
  }, [isUpdated]);

  ///add Packages

  const addPackageData = () => {
    setisloading(true);
    let url = "https://afternoon-bayou-76409.herokuapp.com/addPackage";

    let temp = {
      start_date: startdate,
      end_date: enddate,
      price: price,
    };
    axios
      .post(url, temp)
      .then(
        (res) => {
          console.log("packageadd:::", res);
          startdate("");
          enddate("");
          price("");
          setEditDailogOpen(false);
          setisUpdated(!isUpdated);
          setisloading(false);
          showNotificationMsz(res.data.msg, "success");
        },

        (error) => {
          setisloading(false);
          showNotificationMsz(error, "danger");
        }
      )
      .catch((e) => {
        setisloading(false);
        showNotificationMsz(e, "danger");
      });
  };

  //to delete the auction

  const Deletepackages = (data) => {
    let id = data._id;

    try {
      setisloading(true);
      let url = `https://afternoon-bayou-76409.herokuapp.com/deletePackage/${id}`;
      axios.delete(url).then(
        (res) => {
          setisloading(false);
          setisUpdated(!isUpdated);
          showNotificationMsz(res.data.msg, "success");
          console.log("resdeletedata", res);
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

  const [Editstartdate, setEditstartdate] = useState("");
  const [Editenddate, setEditenddate] = useState("");
  const [Editprice, setEditprice] = useState("");
  const [Editid, setEditid] = useState("");

  const Handlebanner = (item) => {
    setEditDailogOpen(!EditDailogOpen);

    setEditstartdate(item.start_date);
    setEditenddate(item.end_date);
    setEditprice(item.price);
    setEditid(item._id);
    console.log("Editstartdate");
  };

  //to update the package

  const updatepackage = (ID) => {
    let id = ID;

    try {
      setisloading(true);
      let url = `https://afternoon-bayou-76409.herokuapp.com/updatePackage/${id}`;

      let temp = {
        start_date: Editstartdate,
        end_date: Editenddate,
        price: Editprice,
      };

      axios.patch(url, temp).then(
        (res) => {
          setisloading(false);
          setisUpdated(!isUpdated);
          showNotificationMsz(res.data.msg, "success");
          console.log("resdeletedata", res);
          setEditDailogOpen(!EditDailogOpen);
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

  const filterData = packageDataArry.filter((event) => {
    return event.price.toLowerCase().indexOf(titlename.toLowerCase()) !== -1;
  });

  const classes = useStyles();

  return (
    <>
      <div>
        <div className="content_padding">
          <Grid className="Component_main_grid mb-3">
            <Grid item md={9}>
              <h3 className="mb-2">Add Package</h3>
              <button
                class="btn btn-secondary MTB-2"
                type="button"
                // onClick={() => props.history.push("/addEvent")}
                onClick={() => setaddMangeopen(!addMangeopen)}
              >
                <span>
                  <span data-action="create">
                    <i class="fa fa-plus"></i> Create
                  </span>
                </span>
              </button>
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
                    placeholder="Search by Price"
                  />
                </span>
              </div>
            </Grid>
          </Grid>

          <Expand open={addMangeopen}>
            <Card className=" mb-2 Card_shadow p-3">
              <span className="pr-3">
                <h4>Add Packages</h4>
              </span>

              <Grid className="Component_main_grid mb-3">
                <Grid item md={6} className="title_form">
                  <div className="mr-1">
                    <label>Start Date</label>
                    <input
                      type="date"
                      class="form-control "
                      value={startdate}
                      onChange={(e) => {
                        setstartdate(e.target.value);
                      }}
                    />
                  </div>
                </Grid>
                <Grid item md={6} className="title_form">
                  <div className="mr-1">
                    <label>End Date</label>
                    <input
                      type="date"
                      class="form-control"
                      value={enddate}
                      onChange={(e) => {
                        setenddate(e.target.value);
                      }}
                    />
                  </div>
                </Grid>
              </Grid>

              <Grid className="Component_main_grid mb-3">
                <Grid item md={6} className="title_form">
                  <div className="mr-1">
                    <label>Price</label>
                    <input
                      type="number"
                      class="form-control"
                      placeholder="Enter Price"
                      value={price}
                      onChange={(e) => {
                        setprice(e.target.value);
                      }}
                    />
                  </div>
                </Grid>

                <Grid item md={6} className="title_form">
                  <div className="mr-1">
                    <label>Title</label>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Enter Title"
                    />
                  </div>
                </Grid>
              </Grid>

              <Button
                variant="contained"
                className="button_formatting"
                onClick={addPackageData}
              >
                Create
              </Button>
            </Card>
          </Expand>

          <Card classname="main_card p-3">
            <TableContainer>
              <Table className={classes.table} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Start Date</TableCell>
                    <TableCell>End Date</TableCell>
                    <TableCell>Price</TableCell>
                    <TableCell className="text-center">Action</TableCell>
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
                      <TableCell>{row.start_date}</TableCell>
                      <TableCell>{row.end_date}</TableCell>

                      <TableCell>{row.price}</TableCell>

                      <TableCell className="text-center">
                        <span
                          className="mr-3 ml-3 background_icon_padding"
                          onClick={() => Handlebanner(row)}
                        >
                          <i class="fa fa-edit"></i>
                        </span>
                        <span
                          className="background_icon_delete"
                          onClick={() => Deletepackages(row)}
                        >
                          <i class="fa fa-trash"></i>
                        </span>
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

          <Dialog
            open={EditDailogOpen}
            onClose={() => setEditDailogOpen(!EditDailogOpen)}
            aria-labelledby="form-dialog-title"
            maxWidth="sm"
            fullWidth="fullWidth"
          >
            <DialogTitle>
              <span className="float-right icon_color"></span>
            </DialogTitle>
            <DialogContent>
              <span className="pr-3">
                <h4>Add Packages</h4>
              </span>

              <Grid className="Component_main_grid mb-3">
                <Grid item md={6} className="title_form">
                  <div className="mr-1">
                    <label>Start Date</label>
                    <input
                      type="date"
                      class="form-control "
                      value={Editstartdate}
                      onChange={(e) => {
                        setEditstartdate(e.target.value);
                      }}
                    />
                  </div>
                </Grid>
                <Grid item md={6} className="title_form">
                  <div className="mr-1">
                    <label>End Date</label>
                    <input
                      type="date"
                      class="form-control"
                      value={Editenddate}
                      onChange={(e) => {
                        setEditenddate(e.target.value);
                      }}
                    />
                  </div>
                </Grid>
              </Grid>

              <Grid className="Component_main_grid mb-3">
                <Grid item md={12} className="title_form">
                  <div className="mr-1">
                    <label>Price</label>
                    <input
                      type="number"
                      class="form-control"
                      placeholder="Enter Price"
                      value={Editprice}
                      onChange={(e) => {
                        setEditprice(e.target.value);
                      }}
                    />
                  </div>
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button
                className="button_formatting"
                onClick={() => setEditDailogOpen(!EditDailogOpen)}
              >
                Cancel
              </Button>
              <Button
                className="button_formatting"
                onClick={() => updatepackage(Editid)}
              >
                Create
              </Button>
            </DialogActions>
          </Dialog>

          <br />
        </div>
        <Loder loading={isloading} />
      </div>
    </>
  );
}
export default HOC(AddPackage);
