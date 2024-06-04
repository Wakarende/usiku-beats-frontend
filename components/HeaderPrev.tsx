import { Avatar } from "@mui/material";
import { deepOrange } from "@mui/material/colors";
import Image from "next/image";
import { withRouter } from "next/router";
import React, { Component, useState } from "react";
import { Dropdown } from "react-bootstrap";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as mainActions from "../redux/main/mainActions";

import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import userService from "../services/user.service";
import SettingsIcon from "@mui/icons-material/Settings";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import StarIcon from "@mui/icons-material/Star";
import DiamondIcon from '@mui/icons-material/Diamond';
// or 
// import EmeraldIcon from '@mui/icons-material/Emerald'; // if it exists

class Header extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      index: 0,
      user: null,
      dev: false,

      user_data: null,
    };
  }

  componentDidMount(): void {
    var user =
      localStorage.getItem("user") &&
      localStorage.getItem("user") != "undefined"
        ? JSON.parse(localStorage.getItem("user") || "{}")
        : null;

    let user_data = localStorage.getItem("user_data");
    if (user_data !== null) {
      user_data = JSON.parse(user_data);
    }

    this.setState({ user_data });

    const { router } = this.props;
    if (router.asPath.includes("?dev")) this.setState({ dev: true });

    this.setState({ user });
  }

  gotoLogin = () => {
    const { router } = this.props;
    router.push({ pathname: "/login" });
  };

  myaccount = () => {
    const { router } = this.props;
    router.push({ pathname: "/account" });
  };

  logout = () => {
    const { router } = this.props;

    // var user = null;

    // setTimeout(() => {

    //   this.props.mainActions.setUser(user);
    //   localStorage.removeItem("user")
    //   // router.reload()
    //   router.push({pathname:"/"})

    // }, 50);

    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    localStorage.removeItem("user_data");

    router.push({ pathname: "/" }).then(() => {
      window.location.reload();
    });
  };

  render(): React.ReactNode {
    return (
      <Navbar expand="lg" className="bg-body-tertiary kayfo-header">
        <Container fluid className="flex items-center">
          {/* <Navbar.Brand href="/">
            <Image
              src={require("../assets/icons/beats_logo.png")}
              className="beats-logo"
              width={150}
              alt="Beats"
            />
          </Navbar.Brand> */}
          <div className="flex flex-col items-center mr-4">
            <div className="flex items-center">
              <StarIcon className="text-yellow-500 text-xl" />
              <span className="text-base text-white ml-2">100 stars</span>
            </div>
            <div className="flex items-center">
              {/* Replace this with your gem icon */}
              <DiamondIcon className="text-blue-500 text-xl" />
              <span className="text-base text-white ml-2">100 gems</span>
            </div>
          </div>

          {/* <>
            {!this.props.hidebtn && !this.state.user_data &&
              <Button variant="default kayfo-connexion-btn" size='lg' onClick={this.gotoLogin} >Login</Button>
            }
          </> */}
          <div className="flex items-center justify-center flex-grow">
            <StarIcon className="text-red-500 text-6xl" />
          </div>
          <div className="header-icons">
            <EmojiEventsIcon
              style={{ fontSize: "36px", color: "gold", marginRight: "10px" }}
            />
            <SettingsIcon style={{ fontSize: "36px", color: "white" }} />
          </div>

          {/* {this.state.user_data && (
            <Dropdown drop={"start"}>
              <Dropdown.Toggle
                variant="default"
                style={{ color: "#fff", border: "none" }}
                id="dropdown-basic"
              >
                <span style={{ position: "absolute", right: "150%" }}>
                  {this.state.user_data?.user.username}
                </span>
                <Avatar
                  style={{ position: "absolute", top: 0, left: -5 }}
                  sx={{ bgcolor: deepOrange[500] }}
                ></Avatar>
              </Dropdown.Toggle>
              <Dropdown.Menu>

                <Dropdown.Item onClick={() => this.logout()}>
                  Logout
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          )} */}

        </Container>
      </Navbar>
    );
  }
}

// const mapStateToProps = (state: any) => {
//   return {
//     mainState: state.mainReducer,
//   };
// };

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.auth.error,
});

const mapDispatchToProps = (dispatch: any) => {
  return {
    mainActions: bindActionCreators(mainActions, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Header));
