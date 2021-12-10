import React, { useState, useEffect } from "react";
import HOC from "../../Common/Hoc";
import { Card, Grid } from "@material-ui/core";
import axios from "axios";
import { blankValidator, showNotificationMsz } from "../utils/Validation";
import Loder from "../Loder/Loder";

const CreateCatagories = (props) => {
  const [isloading, setisloading] = useState(false);
  const [isUpdated, setisUpdated] = useState(false);
  const [optionCategory, setoptionCategory] = useState("");
  const [subcategory, setsubcategory] = useState("");
  const [Iconimage, setIconimage] = useState(null);

  const [parentCategory, setparentCategory] = useState([]);
  const [CategoryDataarry, setCategoryDataarry] = useState([]);
  //////dropdown
  useEffect(() => {
    window.scrollTo(0, 0);
    //to get data of subscription
    const getFreeAuctionData = () => {
      try {
        setisloading(true);
        let url = "https://afternoon-bayou-76409.herokuapp.com/getSubCategory";
        axios.get(url).then(
          (res) => {
            console.log("res", res);
            setparentCategory(res.data);
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
    getFreeAuctionData();
  }, [isUpdated]);

  useEffect(() => {
    const getFreeAuctionData = () => {
      try {
        setisloading(true);
        let url = "https://afternoon-bayou-76409.herokuapp.com/getCategory";
        axios.get(url).then(
          (res) => {
            console.log("resimagepath", res);
            setCategoryDataarry(res.data);
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
    getFreeAuctionData();
  }, [isUpdated]);

  //error
  const [ErroroptionCategory, setErroroptionCategory] = useState(false);
  const [Errorsubcategory, setErrorsubcategory] = useState(false);
  const [ErrorIconimage, setErrorIconimage] = useState(false);

  //to add Category
  const CreateSubCategory = () => {
    try {
      if (!blankValidator(optionCategory)) {
        setErroroptionCategory(true);
        return;
      }
      if (!blankValidator(subcategory)) {
        setErrorsubcategory(true);
        return;
      }
      if (!blankValidator(Iconimage)) {
        setErrorIconimage(true);
        return;
      }

      setisloading(true);
      let url = "https://afternoon-bayou-76409.herokuapp.com/addSubCategory";
      const fd = new FormData();
      fd.append("parentCategory", optionCategory);
      fd.append("name", subcategory);

      //********* HERE IS THE CHANGE ***********

      fd.append("myField", Iconimage);

      axios.post(url, fd).then(
        (res) => {
          //showNotificationMsz(res.data.msg, "success");
          console.log("categoriesdata", res);
          props.history.goBack();
          setisUpdated(!isUpdated);
          setisloading(false);
        },
        (error) => {
          //  showNotificationMsz(error, "danger")
          setisloading(false);
        }
      );
    } catch (error) {
      //showNotificationMsz(error, "danger")
      setisloading(false);
    }
  };

  return (
    <>
      <div className="content_padding">
        <span className="pr-3">
          <h4>Add Sub Categories</h4>
        </span>

        <Card classname="main_card  m-5 p-2">
          <Grid className="Component_main_grid mb-3">
            <Grid item md={6}>
              <div className="mr-3">
                <label for="inputEmail4">PARENT CATEGORIES</label>

                <select
                  class="form-control"
                  id="exampleFormControlSelect1"
                  value={optionCategory}
                  onChange={(e) => {
                    setErroroptionCategory(false);
                    setoptionCategory(e.target.value);
                    console.log("option", e.target.value);
                  }}
                >
                  <option value="">Select </option>
                  {CategoryDataarry.map((item) => (
                    <option value={item._id}>{item.name}</option>
                  ))}
                </select>
                {ErroroptionCategory && (
                  <span className="text-danger">Select Category</span>
                )}
              </div>
            </Grid>
            <Grid item md={6}>
              <label for="inputEmail4">SUB CATEGORIES</label>
              <input
                type="text"
                class="form-control"
                id="inputEmail4"
                placeholder="Enter Categories"
                value={subcategory}
                onChange={(e) => {
                  setsubcategory(e.target.value);
                  setErrorsubcategory(false);
                }}
              />
              {Errorsubcategory && (
                <span className="text-danger">Enter Categories</span>
              )}
            </Grid>
          </Grid>
          <Grid className="Component_main_grid mb-3">
            <Grid item md={12}>
              <div class=" col-md-4 mb-3 mt-3">
                <label for="inputPassword4">IMAGE</label>
                <div class=" col-md-12">
                  <input
                    type="file"
                    class=""
                    onChange={(e) => {
                      setErrorIconimage(false);
                      setIconimage(e.target.files[0]);
                    }}
                  />
                  {ErrorIconimage && (
                    <span className="text-danger">Select Image</span>
                  )}
                </div>
              </div>

              <span className="ml-3 ">
                <button
                  type="submit"
                  class="btn btn-primary mb-3 mt-3"
                  onClick={CreateSubCategory}
                >
                  Create
                </button>
              </span>
            </Grid>
          </Grid>
        </Card>
      </div>
      <Loder loading={isloading} />
    </>
  );
};

export default HOC(CreateCatagories);
