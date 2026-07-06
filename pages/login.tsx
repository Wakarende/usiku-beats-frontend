import React, { Component, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as mainActions from "../redux/main/mainActions";
import { loginSuccess} from "../redux/main/authActions";
import { withRouter } from "next/router";
import {
  Button,
  Col,
  Container,
  Dropdown,
  Form,
  Row,
  Spinner,
} from "react-bootstrap";

import countries from "../services/mocks/countries.json";
import Image from "next/image";
import userService from "../services/user.service";
import { Alert, Snackbar } from "@mui/material";
import accountErrors from "../services/mocks/accountErrors";
import { instance as axios } from "../services/axios.config";
import { nanoid } from "nanoid";
import packs from "../services/mocks/packs";
import { BASE_URL } from "../services/config";
import { Navigate } from 'react-router-dom';

interface Props {
  title: string;
}

class LoginPage extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      index: 0,
      navState: "signin",
      countries: countries, //.sort((a, b) => parseInt(a.dial_code) - parseInt(b.dial_code)),
      processing: false,
      error: false,
      errorMessage: "An unexpected error has occurred",
      success: false,
      dialCode: "+221",
      flag: "SN.svg",

      username: "",
      password: "",
      repassword: "",
    };
  }

  componentDidMount(): void {
    const { router } = this.props;
    if (this.props.isAuthenticated) {
      router.push('/');
      return;
    }
    // Arriving here because the stored session expired (see _app.jsx)
    if (
      typeof window !== "undefined" &&
      new URLSearchParams(window.location.search).get("session") === "expired"
    ) {
      this.setState({
        error: true,
        errorMessage: "Your session has expired. Please log in again to continue.",
      });
    }
    // this.getUserCountry()
  }

  // getUserCountry = async () => {
  //   try {
  //     const response = await fetch("https://ipapi.co/json");
  //     const data = await response.json();
  //     var countryName = data.country_name;

  //     var country = countries.find(c=>c.name == countryName) || countries.find(c=>c.name == "Senegal") // senegal by default

  //     this.setState({dialCode : country?.dial_code, flag : country?.image})

  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  switchNavstate = (state: string) => {
    this.setState({ navState: state });
  };

  updateInput = (key, value) => {
    this.setState({ [key]: value });
  };

  getRandomNumberWithPadding = () => {
    const randomNumber = Math.floor(Math.random() * 9999) + 1;
    const paddedNumber = randomNumber.toString().padStart(4, "0"); // Adjust the padStart value as needed
    return paddedNumber;
  };

  submitForm = (e) => {
    e.preventDefault();

    // const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (
      !this.state.username.trim().length ||
      !emailRegex.test(this.state.username)
    ) {
      alert("Please enter a valid email address.");
      return;
    }

    if (!this.state.username.trim().length) return;
    if (!this.state.password.trim().length) return;

    if (this.state.navState == "signup") {
      if (this.state.password != this.state.repassword) {
        // console.log('here');
        return;
      }
    }

    this.setState({ processing: true });

    var phone = this.state.dialCode + this.state.username;

    if (this.state.navState == "signup") {
      // const shortId = this.getRandomNumberWithPadding();

      var signupData = {
        email: this.state.username,
        password: this.state.password,
      };

      axios.post(`${BASE_URL}signup/`, signupData)
        .then((data: any) => {
          this.setState({ success: true });

          this.loginUser(data.data);
        })
        .catch((e) => {
          console.log(e);
          this.setState({ error: true, errorMessage: e });
        });
    } else if (this.state.navState == "signin") {
      var signinData = {
        email: this.state.username,
        password: this.state.password,
      };

      axios.post(`${BASE_URL}login/`, signinData)
        .then((data: any) => {
          this.setState({ success: true });

          this.loginUser(data.data);
        })
        .catch((e) => {
          console.log(e);
          this.setState({ error: true, errorMessage: e });
        });
    }
  };

  loginUser = (authData: any) => {
    // this.setState({navState : 'signin', processing : true})
    const { router } = this.props;

    this.props.loginSuccess(authData.access, authData.refresh, authData.data)

    // console.log(authData);
    
    localStorage.setItem("access", authData.access);
    localStorage.setItem("refresh", authData.refresh);
    localStorage.setItem("user_data", JSON.stringify(authData.data));

    // var to = this.props.mainState.pageOrigin
    //   ? this.props.mainState.pageOrigin
    //   : "/";

    // this.props.mainActions.setPageOrigin(null);

    router.push({ pathname: "/" });
  };

  requestPassword = () => {
    const { router } = this.props;

    router.push({ pathname: "/forgotpassword" });
  };

  render(): React.ReactNode {

    return (
      <div className="cmd-page">
        {/* <Header hidebtn={true} /> */}
        <div className="kayfo-body-content">
          <div
            className="kayfo-block-title"
            style={{
              textAlign: "center",
              marginTop: 15,
              textTransform: "uppercase",
            }}
          >
            <span>{this.state.navState == "signup" ? "Sign Up" : "Login"}</span>
          </div>

          <Container>
            <Row
              style={{ justifyContent: "center", marginTop: 15, color: "#fff" }}
            >
              <Col lg="4" sm="8" xs="11" className="kayfo-signin-box">
                {!this.state.processing && (
                  <Form>
                    <Form.Group
                      className="mb-3"
                      controlId="formBasicTel"
                      style={{ display: "flex" }}
                    >
                      {/* <Dropdown>
                          <Dropdown.Toggle variant="default" style={{color:'#fff'}} id="dropdown-basic">
                            <Image src={`https://country-code-au6g.vercel.app/${this.state.flag}`} width={20} height={20}  alt="flag"  />
                            <span>{this.state.dialCode}</span>
                          </Dropdown.Toggle>
                          <Dropdown.Menu style={{maxHeight:200, overflowY:'scroll'}}>
                            {countries.map((c:any,i:number)=>{
                              return  <Dropdown.Item key={i} onClick={()=>{this.setState({dialCode:c.dial_code, flag:c.image})}}>
                                  <Image src={`https://country-code-au6g.vercel.app/${c.image}`} width={20} height={20}  alt="flag"  />
                                   <span>{c.dial_code}</span>
                                   <span> - {c.name}</span>
                                </Dropdown.Item>
                            })
                            }
                          </Dropdown.Menu>
                        </Dropdown> */}
                      <Form.Control
                        required
                        className="kayfo-signin-input"
                        value={this.state.username}
                        onChange={(e) =>
                          this.updateInput("username", e.target.value)
                        }
                        type="email"
                        placeholder="Email Address"
                        style={{
                          border: "none",
                          borderBottom: "solid 1px #fff",
                          backgroundColor: "transparent",
                          borderRadius: 0,
                        }}
                      />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                      <Form.Control
                        required
                        className="kayfo-signin-input"
                        value={this.state.password}
                        onChange={(e) =>
                          this.updateInput("password", e.target.value)
                        }
                        type="password"
                        placeholder="Password"
                        style={{
                          border: "none",
                          borderBottom: "solid 1px #fff",
                          backgroundColor: "transparent",
                          borderRadius: 0,
                        }}
                      />

                      {/* {this.state.navState == "signin" &&
                          <Form.Text className="text-muted" style={{float:'right', marginTop:15}}>
                            <span style={{color:"#fff"}}>Oups ! </span><a onClick={()=>this.requestPassword()} style={{color:"#FF7A00"}}>Mot de passe oublié ?</a>
                          </Form.Text>
                        } */}
                    </Form.Group>

                    {this.state.navState == "signup" && (
                      <>
                        <Form.Group
                          className="mb-3"
                          controlId="formBasicPassword2"
                        >
                          <Form.Control
                            required
                            className="kayfo-signin-input"
                            onChange={(e) =>
                              this.updateInput("repassword", e.target.value)
                            }
                            type="password"
                            placeholder="Confirm password"
                            style={{
                              border: "none",
                              borderBottom: "solid 1px #fff",
                              backgroundColor: "transparent",
                              borderRadius: 0,
                            }}
                          />
                        </Form.Group>

                        {this.state.password != this.state.repassword && (
                          <Form.Text
                            className="text-muted"
                            style={{
                              display: "flex",
                              flex: 1,
                              marginTop: 10,
                              justifyContent: "flex-end",
                              textAlign: "right",
                            }}
                          >
                            <a style={{ color: "tomato" }}>
                              {" "}
                              Passwords do not match
                            </a>
                          </Form.Text>
                        )}
                      </>
                    )}

                    <Button
                      variant="default kayfo-signin-btn"
                      style={{ width: "100%", marginTop: 45 }}
                      onClick={this.submitForm}
                      type="submit"
                      size="lg"
                    >
                      {this.state.navState == "signup" ? "Sign Up" : "Log In"}
                    </Button>

                    {this.state.navState == "signin" && (
                      <Form.Text
                        className="text-muted"
                        style={{
                          display: "flex",
                          flex: 1,
                          marginTop: 10,
                          justifyContent: "center",
                          textAlign: "center",
                          cursor: "pointer",
                        }}
                      >
                        <span style={{ color: "#fff", marginRight: 10 }}>
                          No account?{" "}
                        </span>{" "}
                        <a
                          onClick={() => this.switchNavstate("signup")}
                          style={{ color: "#FF7A00" }}
                        >
                          {" "}
                          Create my account
                        </a>
                      </Form.Text>
                    )}

                    {this.state.navState == "signup" && (
                      <Form.Text
                        className="text-muted"
                        style={{
                          display: "flex",
                          flex: 1,
                          marginTop: 10,
                          justifyContent: "center",
                          textAlign: "center",
                          cursor: "pointer",
                        }}
                      >
                        <span style={{ color: "#fff", marginRight: 10 }}>
                          Already registered ?{" "}
                        </span>{" "}
                        <a
                          onClick={() => this.switchNavstate("signin")}
                          style={{ color: "#FF7A00" }}
                        >
                          {" "}
                          Go to login
                        </a>
                      </Form.Text>
                    )}
                  </Form>
                )}

                {this.state.processing && !this.state.error && (
                  <div
                    style={{
                      position: "relative",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    {this.state.navState == "signup" && (
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                        }}
                      >
                        <Spinner
                          animation="grow"
                          style={{ marginBottom: 15 }}
                        />
                        <span>Creating your account ... </span>
                      </div>
                    )}
                    {this.state.navState == "signin" && (
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                        }}
                      >
                        <Spinner
                          animation="grow"
                          style={{ marginBottom: 15 }}
                        />
                        <span>Logging In ... </span>
                      </div>
                    )}

                    <Image
                      src={require("../assets/icons/kayfo-icon-white.png")}
                      width={50}
                      style={{
                        position: "relative",
                        bottom: -40,
                        opacity: 0.15,
                      }}
                      alt="Kayfo"
                    />
                  </div>
                )}

                {this.state.error && (
                  <div
                    style={{
                      position: "relative",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    {this.state.navState == "signup" && (
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                        }}
                      >
                        <span>{this.state.errorMessage}</span>
                        <a
                          onClick={() => {
                            this.setState({
                              navState: "signup",
                              processing: false,
                              error: false,
                            });
                          }}
                          style={{ color: "#FF7A00" }}
                        >
                          go back
                        </a>
                      </div>
                    )}
                    {this.state.navState == "signin" && (
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                        }}
                      >
                        <span>{this.state.errorMessage}</span>
                        <a
                          onClick={() => {
                            this.setState({
                              navState: "signin",
                              processing: false,
                              error: false,
                            });
                          }}
                          style={{ color: "#FF7A00" }}
                        >
                          go back
                        </a>
                      </div>
                    )}
                  </div>
                )}
                {this.state.success && (
                  <Snackbar
                    open={true}
                    anchorOrigin={{ vertical: "top", horizontal: "center" }}
                    autoHideDuration={5000}
                  >
                    <Alert severity="success" sx={{ width: "100%" }}>
                      {this.state.navState == "signup"
                        ? "Registered Successfully!"
                        : "Connected Successfully!"}
                    </Alert>
                  </Snackbar>
                )}
              </Col>
            </Row>
          </Container>
        </div>
      </div>
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
    loginSuccess
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(LoginPage));
