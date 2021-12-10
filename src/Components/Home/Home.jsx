import React from "react";
import HOC from "../../Common/Hoc";
import { withRouter } from "react-router-dom";
import { Card, Grid } from "@material-ui/core";

import "./Home.css";
const Home = (props) => {
  //local array
  const home = [
    { show: "Total Ads", link: "adds" },
    { show: " Customers ", link: "customer" },
    { show: "Categries Ads", link: "categories" },
    { show: "Package", link: "addpackage" },
  ];
  return (
    <div>
      <div className="main_div ">
        <div className="container">
          <div className="row">
            {home.map((item, index) => (
              <div className="col-md-4  col-lg-4">
                <Card
                  className="main_card Card_shadow "
                  onClick={() => props.history.push(`${item.link}`)}
                >
                  <Grid className="Component_main_grid">
                    <Grid item md={10}>
                      <div className="main_content ">
                        <p>
                          <span className="">
                            <i class="fa fa-plus pr-1" aria-hidden="true"></i>
                          </span>
                          {item.show}
                        </p>
                      </div>
                    </Grid>
                    <Grid item md={2}>
                      <div className="main_content ">
                        <p>
                          <span className="">{item.total}</span>
                        </p>
                      </div>
                    </Grid>
                  </Grid>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(HOC(Home));
