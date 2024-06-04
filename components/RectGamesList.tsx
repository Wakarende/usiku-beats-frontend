import React, { Component, useState } from 'react';
import { Container, Row, Col, ListGroup, Button } from 'react-bootstrap';
import africanGames from '../services/mocks/africanGames';
// import { WithRouterProps, withRouter } from './WithRouterProps';
import { connect } from 'react-redux';
import { bindActionCreators} from 'redux';
import * as mainActions from '../redux/main/mainActions'
import { Tooltip } from '@mui/material';
import Image from 'next/image';
import { withRouter } from 'next/router';
import { baseUrl } from '../services/apiUrl';
import contentService from '../services/content.service';
import {instance as axios} from '../services/axios.config';


interface Props {

  title:string,
  rubricId:any,
  items : any[]
}

interface State {

  index : number,
  items : any[],
  completed : boolean
}
 
const pattern = [[1,1],[1,1],[2,2],[1,1],[1,1]]


class RectGamesList extends Component<any,
State> {

  constructor(props: {}) {
    super(props);
    this.state = {
      index : 0,
      items : [],
      completed : false,
    };
  }


  componentDidMount(): void {
 
    this.getGames();

  }

  getGames = ()=>{

    var rubricId = this.props.rubricId;

    axios.get("song-list/?limit=10")
    .then((d:any)=>{

      var games = d.data

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
      games.forEach(g => {
        var tags = g.tags;
        var tagsKeys : any[] = []
        tags.forEach(t => {
          tagsKeys.push(t.tag)
        });

        g.tags = tagsKeys;
        
      });

      games.forEach(g => {
        if(!g.tags.includes("All")) g.tags.push("All")
      });

      // games = games.filter(e=>e.attributes.published != false);
      //games = games.sort((a,b)=>b.attributes.priority - a.attributes.priority);

      this.setState({items : games, completed:true})
       this.props.mainActions.setAllGames({key:rubricId, games : games})
      // console.log(games)

    })
    .catch((e)=>{console.log("Error while getting games",e)})

  }

  gotoGames = (_title:string)=>{
    const { router } = this.props;
    router.push({pathname:"/games", query : {title : _title, rubricId : this.props.rubricId} })
  }

  gotoGameDetail = ()=>{
    const { router } = this.props;

    router.push({
      pathname: "/",
    });

  }
 
  createStat(_type, _gameId){

    var stat = 
      {data:{
        type: _type,
        game : _gameId
      }}

    contentService.createStat(stat)
    .then(d=>{
      console.log("Created stat")
    })
    .catch(e=>{
      console.log(e)
    })

  }

   render(): React.ReactNode {
     return(
<Container>
    <Row className='kayfo-block-header'>
        <div className='kayfo-block-title'><span>{this.props.title}</span></div>
        {/* Code for the arrow icon, if needed */}
    </Row>
    <Row>
        <Col className='kayfo-masonry-main' style={{ width: '100%', overflowX: 'auto', overflowY: 'hidden' }}>
            <div style={{ width: '100%', display: 'flex', flexDirection: 'row' }}>
                <div className='kayfo-masonry-container' style={{ width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <Col className='kayfo-masonry-item' style={{ width: '100%' }} onClick={() => this.gotoGameDetail()}>
                        <div style={{
                            width: '100%', // Changed to 100% to span the entire screen width
                            height: 110,
                            backgroundColor: 'yourColor',
                            borderRadius: 6,
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <span style={{
                                color: 'white',
                                fontSize: '20px',
                                fontWeight: 'bold'
                            }}>Go to all songs</span>
                        </div>
                    </Col>
                </div>
            </div>
        </Col>
    </Row>
</Container>



    )
  };
};


const mapStateToProps = (state:any) => {
  return {
    mainState: state.mainReducer
  };
};

const mapDispatchToProps = (dispatch:any) => {
  return {
    mainActions: bindActionCreators(mainActions, dispatch)
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(withRouter(RectGamesList));
