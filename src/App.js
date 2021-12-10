import { Switch, Route, Redirect } from "react-router-dom";
import React from "react";
import "./App.css";
import Home from "./Components/Home/Home";
import AdminLogin from "./Components/AdminLogin/AdminLogin";
import EmailVerify from "./Components/AdminLogin/EmailVerify";
import Resetpassword from "./Components/AdminLogin/Resetpassword";
import Adds from "./Components/Adds/Adds";
import Customers from "./Components/Customers/Customers";
import Customereditdata from "./Components/Customers/Customereditdata";
import Categories from "./Components/Categories/Categories";
import CreateCatagories from "./Components/Categories/CreateCatagories";
import Subcategory from "./Components/Customers/Subcategory";
import CreateSubcategory from "./Components/Categories/CreateSubcategory";
import AddPackage from "./Components/Package/AddPackage";

//for notification
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import ProtectedRoute from "./Components/utils/ProtectedRoute";

function App() {
  return (
    <>
      <ReactNotification />
      <Switch>
        <Route exact path="/" component={AdminLogin} />
        <Route exact path="/emailverify" component={EmailVerify} />
        <Route exact path="/resetpassword" component={Resetpassword} />

        {/* ProtectedRoute */}

        <ProtectedRoute exact path="/home" component={Home} />
        <ProtectedRoute exact path="/adds" component={Adds} />
        <ProtectedRoute exact path="/customer" component={Customers} />
        <ProtectedRoute exact path="/edit1" component={Customereditdata} />
        <ProtectedRoute exact path="/categories" component={Categories} />
        <ProtectedRoute
          exact
          path="/createcategories"
          component={CreateCatagories}
        />
        <ProtectedRoute exact path="/subcategory" component={Subcategory} />
        <ProtectedRoute
          exact
          path="/createSubcategory"
          component={CreateSubcategory}
        />

        <ProtectedRoute exact path="/addpackage" component={AddPackage} />
      </Switch>
    </>
  );
}

export default App;
