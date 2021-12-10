import React, { useState } from "react";
import HOC from "../../Common/Hoc";
import { Card, Grid } from "@material-ui/core";
import axios from "axios";
import { blankValidator, showNotificationMsz } from "../utils/Validation";
import Loder from "../Loder/Loder";

const CreateCatagories = (props) => {
  const [AddCategories, setAddCategories] = useState("");
  const [Categoriesimage, setCategoriesimage] = useState(null);
  const [isloading, setisloading] = useState(false);
  const [isUpdated, setisUpdated] = useState(false);

  //error
  const [ErrorAddCategories, setErrorAddCategories] = useState(false);
  const [ErrorCategoriesimage, setErrorCategoriesimage] = useState(false);

  //to add Category
  const CreateCategory = () => {
    try {
      if (!blankValidator(AddCategories)) {
        setErrorAddCategories(true);
        return;
      }
      if (!blankValidator(Categoriesimage)) {
        setErrorCategoriesimage(true);
        return;
      }

      let url = "https://afternoon-bayou-76409.herokuapp.com/addCategory";
      const fd = new FormData();
      fd.append("name", AddCategories);

      //********* HERE IS THE CHANGE ***********

      fd.append("myField", Categoriesimage);

      axios.post(url, fd).then(
        (res) => {
          showNotificationMsz(res.data.msg, "success");
          console.log("categoriesdata", res);
          props.history.goBack();
          setisUpdated(!isUpdated);
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

  return (
    <>
      <div className="content_padding">
        <span className="pr-3">
          <h4>Add Categories</h4>
        </span>
        <Card classname="main_card  m-5">
          <Grid className="Component_main_grid mb-3">
            <Grid item md={12}>
              <div class=" col-md-12">
                <label for="inputEmail4">CATEGORIES</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Enter Categories"
                  value={AddCategories}
                  onChange={(e) => {
                    setErrorAddCategories(false);
                    setAddCategories(e.target.value);
                  }}
                />
                {ErrorAddCategories && (
                  <span className="text-danger">Enter Categories</span>
                )}
              </div>

              <div class=" col-md-4 mb-3 mt-3">
                <label for="inputPassword4">IMAGE</label>
                <div class=" col-md-12">
                  <input
                    type="file"
                    class=""
                    onChange={(e) => {
                      setErrorCategoriesimage(false);
                      setCategoriesimage(e.target.files[0]);
                    }}
                  />
                  {ErrorCategoriesimage && (
                    <span className="text-danger">Select Image</span>
                  )}
                </div>
              </div>

              <span className="ml-3 ">
                <button
                  type="submit"
                  class="btn btn-primary mb-3 mt-3"
                  onClick={CreateCategory}
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
