import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
//components
import { Navbar } from "./components/Navbar";
import { Shop } from "./Shop/Shop";
import styled from "styled-components";
import GlobalStyle from "./styles/GlobalStyle";
import { Checkout } from "./Shop/Checkout";

export const App = () => {
    return (
        <>
            <GlobalStyle />
            <div className="container-fluid m-0 p-0">
                <Router>
                    <div className="row m-0 p-0">
                        <div className="col-md-2 sidebar p-4">
                            <Navbar />
                        </div>
                        <div className="col-md-10 p-4">
                            <Switch>
                                <Route
                                    exact
                                    path={"/tienda"}
                                    component={Shop}
                                />
                                <Route
                                    exact
                                    path={"/tienda/ordenes"}
                                    component={About}
                                />
                                <Route
                                    exact
                                    path={"/tienda/checkout"}
                                    component={Checkout}
                                />
                            </Switch>
                        </div>
                    </div>
                </Router>
            </div>
        </>
    );
};

function About() {
    return <h2>About</h2>;
}
