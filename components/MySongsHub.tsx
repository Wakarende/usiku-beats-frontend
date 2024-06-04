import React, { Component, useState } from "react";
import { Container, Row, Col, ListGroup, Button } from "react-bootstrap";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import featuredGames from "../services/mocks/featuredGames";
// import { WithRouterProps, withRouter } from './WithRouterProps';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as mainActions from "../redux/main/mainActions";
import { Tooltip } from "@mui/material";
import Image from "next/image";
import { withRouter } from "next/router";
import contentService from "../services/content.service";
import { baseUrl } from "../services/apiUrl";
// import axios from 'axios';
import ReactCountryFlag from "react-country-flag";
import { instance as axios } from "../services/axios.config";

interface Props {
  title: string;
  rubricId: any;
  items: any[];
}

interface State {
  index: number;
  items: any[];
  completed: boolean;
  rendererTime: string;
}

const pattern = [
  [1, 1],
  [1, 1],
  [2, 2],
  [1, 1],
  [1, 1],
];
class FeaturedGames extends Component<any, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      index: 0,
      items: [], //featuredGames,
      completed: false,
      rendererTime: new Date().getTime().toString(),
    };
  }

  componentDidMount() {
    this.getGames();
  }

  getGames = () => {
    var rubricId = this.props.rubricId;

    axios
      .get("song-list/?limit=3")
      .then((d: any) => {
        var games = d.data;

        games = games.map((game) => {
          return {
            ...game,
            banner_url: null,
            banner_file: null,
            filters: [],
            rubrics: [],
            tags: [
              {
                id: 6,
                tag: "All",
              },
              {
                id: 7,
                tag: "Fun",
              },
              "All",
            ],
          };
        });

        // Tags objects to array
        games.forEach((g) => {
          var tags = g.tags;
          var tagsKeys: any[] = [];
          tags.forEach((t) => {
            tagsKeys.push(t.tag);
          });

          g.tags = tagsKeys;
        });

        games.forEach((g) => {
          if (!g.tags.includes("All")) g.tags.push("All");
        });

        // games = games.filter(e=>e.attributes.published != false);

        //games = games.sort((a,b)=>b.attributes.priority - a.attributes.priority);

        this.setState({ items: games, completed: true });
        this.props.mainActions.setAllGames({ key: rubricId, games: games });

        // console.log(games)
      })
      .catch((e) => {
        console.log("Error while getting games", e);
      });
  };

  gotoGames = (_title: string) => {
    const { router } = this.props;
    router.push({
      pathname: "/games",
      query: { title: _title, rubricId: this.props.rubricId },
    });
  };

  gotoGameDetail = (_track: any, _index: number) => {
    const { router } = this.props;

    router.push({
      pathname: "/game",
      query: { track: JSON.stringify(_track) }, // for example
    });
  };

  render(): React.ReactNode {
    return (
      <Container>
        {/* <Row className='kayfo-block-header' onClick={()=>this.gotoGames(this.props.title)}> */}
        <Row className="kayfo-block-header">
          <div className="kayfo-block-title">
            <span>{this.props.title}</span>
          </div>
          {/* <div className='kayfo-block-arrow' ><Image  src={require("../assets/icons/arrow.png")} alt="" /></div> */}
        </Row>
        <Row>
          <Col
            className="kayfo-masonry-main"
            style={{ overflowX: "auto", overflowY: "hidden" }}
          >
            {this.state.items.length > 0 && (
              <div
                style={{
                  minWidth: "100%",
                  display: "flex",
                  flexDirection: "row",
                }}
              >
                {this.state.items.map((item, index) => {
                  return (
                    <div
                      key={index}
                      className="kayfo-masonry-container"
                      style={{
                        display: "flex",
                        minHeight: 234,
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        margin: "10px",
                      }}
                    >
                      <Col
                        className="kayfo-masonry-item"
                        style={{
                          width: "100%",
                          display: "flex",
                          justifyContent: "center",
                        }}
                        onClick={() => this.gotoGameDetail(item, index)}
                      >
                        <Tooltip placement="top" title={item.song_name}>
                          {/* Adjust the image styles here */}
                          <Image
                            src={item.thumbnail_file}
                            alt=""
                            width={250}
                            height={250}
                            style={{
                              maxWidth: "100%",
                              height: "auto",
                              objectFit: "contain",
                            }}
                          />
                        </Tooltip>
                      </Col>

                      <Button variant="default" style={{backgroundColor: "orange", color: "white", width: "200px"}} size='lg' onClick={() => this.gotoGameDetail(item, index)} >Play</Button>
                      {/* <div className="song-info" style={{ maxWidth: "250px" }}>
                        <div className="text-container">
                          <p>{item.song_name}</p>
                          <p>{item.artist_name}</p>
                        </div>
                        <ReactCountryFlag
                          countryCode={item.country_code} // Use the appropriate country code
                          svg
                          style={{
                            marginLeft: "15px",
                            width: "1.1em",
                            height: "1.1em",
                          }}
                        />
                      </div> */}
                    </div>
                  );
                })}
              </div>
            )}
            {this.state.items.length == 0 && (
              <Col className="kayfo-filter-no-result-box">
                {this.state.completed ? "No result" : "loading..."}
              </Col>
            )}
          </Col>
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
)(withRouter(FeaturedGames));
