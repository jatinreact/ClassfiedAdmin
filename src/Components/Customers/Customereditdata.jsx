import React from "react";
import HOC from "../../Common/Hoc";
import { Grid, Card, Button } from "@material-ui/core";

const Customereditdata = () => {
  return (
    <>
      <div className="content_padding">
        <Grid className="Component_main_grid p-2 ">
          <Grid item md={12} className="">
            <div>
              <Card className=" mb-2 Card_shadow p-3 mr-5">
                <form>
                  <div class="form-row">
                    <div class="form-group col-md-6">
                      <label for="inputPassword4">Name</label>
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Name"
                      />
                    </div>
                    <div class="form-group col-md-6">
                      <label for="inputEmail4">Email</label>
                      <input
                        type="email"
                        class="form-control"
                        id="inputEmail4"
                        placeholder="Email"
                      />
                    </div>
                  </div>
                  <div class="form-group">
                    <label for="inputAddress">Created</label>
                    <input type="date" class="form-control" />
                  </div>

                  <div class="form-row">
                    <div class="form-group col-md-4">
                      <label for="inputAddress2">Phone</label>
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Enter Phone no"
                      />
                    </div>

                    <div class="form-group col-md-4">
                      <div class="mb-3">
                        <div class="form-group col-md-12">
                          <label for="inputCity">Status</label>
                          <div class=" form-group">
                            <select
                              class="form-control  "
                              id="status"
                              name="status"
                              aria-invalid="false"
                            >
                              <option value="activated" selected="selected">
                                Activated
                              </option>
                              <option value="locked">Locked</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="form-group col-md-4">
                      <div class="mb-3">
                        <label for="formGroupExampleInput2" class="form-label">
                          Add image
                        </label>
                        <input
                          type="file"
                          class="form-control-file"
                          id="exampleFormControlFile1"
                        />
                      </div>
                    </div>
                  </div>

                  <button type="submit" class="btn btn-primary">
                    Update
                  </button>
                </form>
              </Card>
            </div>
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default HOC(Customereditdata);
