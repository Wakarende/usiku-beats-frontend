import React, { Component, useState } from "react";
import {
  Container,
  Row,
  Col,
  ListGroup,
  Button,
  Pagination,
  Carousel,
  Card,
} from "react-bootstrap";
import gameslistGames from "../services/mocks/gameslistGames";
import Image from "next/image";
import { baseUrl } from "../services/apiUrl";
import contentService from "../services/content.service";
import { withRouter } from "next/router";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as mainActions from "../redux/main/mainActions";
import userService from "../services/user.service";
import { Alert, Snackbar } from "@mui/material";
import moment from "moment";
import axios from "axios";
import ReactCountryFlag from "react-country-flag";

interface Props {
  title: string;
}

interface State {
  index: number;
  item: any;
  cardWidth: any;
  user: any;
  success: boolean;

  dev: boolean;
}

class GamesDetailComp extends Component<any, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      index: 0,
      item: null,
      cardWidth: 600,
      user: null,
      success: false,
      dev: false,
    };
  }

  componentDidMount(): void {
    const { router } = this.props;
    const { id } = router.query;

    axios
      .get(`https://api.usiku.games/song-detail/${id}`)
      .then((d: any) => {
        let track = d.data;

        this.setState({ item: track });

        let scores = JSON.parse(localStorage.getItem("scores") || "{}");
        let savedScore = scores[track.song_name] || 0;

        this.setState({
          item: {
            ...track,
            my_score: savedScore,
          },
        });
      })
      .catch((e) => {
        console.log("Error while getting track", e);
      });

    var card = document.querySelector(".kayfo-game-detail-container");
    var cardWidth = card?.getBoundingClientRect().width;

    this.setState({ cardWidth });

    setTimeout(() => {
      window?.scrollTo(0, 0);
    }, 500);
  }

  gotoGame = () => {
    const { router } = this.props;

    router.push({
      pathname: "/game",
      query: { track: JSON.stringify(this.state.item) }, // for example
    });
  };

  render(): React.ReactNode {
    return (
      <Container className="" style={{ padding: 0, position: "relative" }}>
        <Row
          className=""
          style={{
            width: "100%",
            marginLeft: "auto",
            marginRight: "auto",
            marginTop: 5,
          }}
        >
          <Col>
            {this.state.item && (
              <Card className="kayfo-game-detail-container">
                <div style={{ position: "relative" }}>
                  <Image
                    src={this.state.item?.thumbnail_file}
                    className="kayfo-game-detail-img"
                    width={this.state.cardWidth || 600}
                    height={600}
                    style={{
                      objectFit: "cover",
                      width: "100%",
                      minHeight: 250,
                    }}
                    alt=""
                  />

                  <Button
                    onClick={() => this.gotoGame()}
                    className="kayfo-playnow-btn"
                    style={{
                      fontFamily: "Righteous-Regular",
                      fontSize: "22px",
                    }}
                  >
                    Play Now
                  </Button>
                </div>
                <Card.Body>
                  <Card.Title>
                    <Row>
                      <Col
                        style={{
                          fontWeight: "bolder",
                          width: "500px",
                          overflow: "hidden",
                        }}
                      >
                        {" "}
                        -------------------------------{" "}
                      </Col>
                    </Row>
                  </Card.Title>
                  <Card.Text style={{ fontWeight: 400, fontSize: "larger" }}>
                    <div className="song-detail-text">
                      <div className="detail">
                        <span className="title">Song:</span>
                        <span className="content">
                          {this.state.item.song_name}
                        </span>
                      </div>
                      <div className="detail">
                        <span className="title">Artist:</span>
                        <span className="content">
                          {this.state.item.artist_name}
                        </span>{" "}
                        {/* Assuming artist information is stored in this.state.item.artist */}
                      </div>
                      <div className="detail">
                        <span className="title">Country:</span>
                        <span className="content">
                          {this.state.item.country_name}
                        </span>{" "}
                        {/* Assuming country information is stored in this.state.item.country */}
                        <ReactCountryFlag
                          countryCode={this.state.item.country_code} // Use the appropriate country code
                          svg
                          style={{
                            marginLeft: "15px",
                            width: "1.3em",
                            height: "1.3em",
                          }}
                        />
                      </div>
                      <div className="detail">
                        <span className="title">My High Score:</span>
                        <span className="content">
                          {Math.round(this.state.item.my_score)}
                        </span>{" "}
                        {/* Assuming high score information is stored in this.state.item.high_score */}
                      </div>
                    </div>
                  </Card.Text>

                  <Col style={{ display: "flex", alignItems: "center" }}>
                    <Row style={{ flex: 1 }}>
                      {/* {this.props.game.externals[0] &&
                              <Col style={{display:'flex', alignItems:'center', justifyContent:'center'}}>
                                <a href="#" className='kayfo-social-link'>
                                    <Image style={{width:'100%'}} src={require('../assets/icons/gplay-icon.png')} alt="" />
                                </a>
                            </Col>
                            }
                            {this.props.game.externals[1] &&
                              <Col style={{display:'flex', alignItems:'center', justifyContent:'center'}}>
                                <a href="#" className='kayfo-social-link'>
                                    <Image style={{width:'100%'}} src={require('../assets/icons/appstore-icon.png')} alt="" />
                                </a>
                            </Col>
                            } */}
                    </Row>
                  </Col>

                  <Col
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginTop: 20,
                    }}
                  >
                    {/* <Button variant="default kayfo-progress-btn" size='lg'>Suivre votre progression</Button> */}
                  </Col>
                </Card.Body>
              </Card>
            )}
          </Col>

          {this.state.success && (
            <Snackbar
              open={true}
              anchorOrigin={{ vertical: "top", horizontal: "center" }}
              autoHideDuration={5000}
            >
              <Alert severity="success" sx={{ width: 200 }}>
                Demande envoyée avec succés !
              </Alert>
            </Snackbar>
          )}
          {/* <Carousel>
                <Carousel.Item>
                  <Image style={{width:'100%', maxHeight:300 ,objectFit:'cover'}} src={this.props.game.media} alt="" />
                  <Carousel.Caption>
                    <Button className='kayfo-playnow-btn'>Jouer maintenant</Button>
                  </Carousel.Caption>
                </Carousel.Item>
              </Carousel> */}
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = (state: any) => {
  return {
    mainState: state.mainReducer,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    mainActions: bindActionCreators(mainActions, dispatch),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(GamesDetailComp));
