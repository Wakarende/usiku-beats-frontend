import React, { Component, useState } from 'react';
import { Container, Row, Col, ListGroup, Button } from 'react-bootstrap';
import featuredGames from '../services/mocks/featuredGames';
// import { WithRouterProps, withRouter } from './WithRouterProps';
import { connect } from 'react-redux';
import { bindActionCreators} from 'redux';
import * as mainActions from '../redux/main/mainActions'
import { Tooltip } from '@mui/material';
import Image from 'next/image';
import { withRouter } from 'next/router';
import contentService from '../services/content.service';
import { baseUrl } from '../services/apiUrl';
import ReactCountryFlag from "react-country-flag";
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

class BoxGamesList extends Component<any,
State> {

  constructor(props: {}) {
    super(props);
    this.state = {
      index : 0,
      items :[],
      completed : false
    };

  }

  componentDidMount(): void {
 
    // this.applyFilter();
    this.getGames();
  }

  getGames = ()=>{

    var rubricId = this.props.rubricId;


    axios.get("song-list/?limit=3")
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

      this.setState({items : games, completed : true})
       this.props.mainActions.setAllGames({key:rubricId, games : games})
      
      //  console.log(games)

    })
    .catch((e)=>{console.log("Error while getting games", e)})

  }

  applyFilter = () =>{

    var tag = this.props.mainState.filterTag;

    var _items = [...this.state.items];
    
    if(tag != "")
        _items = _items.filter(item => item.tags.includes(tag));

  }

  gotoGames = (_title:string)=>{
    const { router } = this.props;
    router.push({pathname:"/games", query : {title : _title, rubricId : this.props.rubricId} })
  }

  gotoGameDetail = (_track:any, _index:number)=>{
    const { router } = this.props;

    router.push({
      pathname: "/game",
      query: { track: JSON.stringify(_track) } // for example
    });

    // this.props.mainActions.setGame(_game);
    // localStorage.setItem("game", JSON.stringify(_game))
    // router.push({pathname:"/gamedetail"})

    // this.createStat("viewed", _game.id)
    
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
             {/* <div className='kayfo-block-title'><span>{this.props.title}</span></div> */}
             {/* <div className='kayfo-block-arrow' ><Image src={require("../assets/icons/arrow.png")} alt="" /></div> */}
            </Row>
            <Row>
             <Col className='kayfo-masonry-main' style={{overflowX:'auto', overflowY:'hidden',maxHeight:160}}>

                <div style={{minWidth:"100%", display:'flex', flexDirection:'row'}}>

                    {this.state.items.map((item,index)=>

                        
                        <div className='kayfo-masonry-container' key={index} style={{display:'flex', maxHeight:110, flexDirection:'column'}}>
                            <Col className='kayfo-masonry-item' style={{maxHeight:110, minWidth:110, }}  onClick={()=>this.gotoGameDetail(item,index)} >
                              <Tooltip placement='top' title={item.song_name}>
                                <Image src={item.thumbnail_file} alt="" width={110} height={110} style={{width:110, height:'100%', objectFit:'cover', borderRadius:6}}/>
                              </Tooltip>
                            </Col>
                            <div className="song-info" style={{maxWidth:"120px"}}>
                              
                              <div className="text-container">
                              <p>UNLOCKING</p>
                                <p>{item.song_name}</p>
                                {/* <p>{item.artist_name}</p> */}
                              </div>
                              {/* <ReactCountryFlag 
                              countryCode={item.country_code} // Use the appropriate country code
                              svg
                              style={{
                                width: '1.1em',
                                height: '1.1em',
                              }}
                            /> */}
                            </div>

                        </div>



                      

                    )}
                    
                    {this.state.items.length == 0 &&
                      <Col className='kayfo-filter-no-result-box'>
                        {this.state.completed ? 'No result' : 'loading...'}
                      </Col>
                    }

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


export default connect(mapStateToProps, mapDispatchToProps)(withRouter(BoxGamesList));
