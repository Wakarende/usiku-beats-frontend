
// 'use client';

// import React, { Component, useState } from 'react';
// import Header from '../components/Header';
// import Footer from '../components/Footer';
// import CategoriesCards from '../components/CategoriesBanner';
// import MasonryGames from '../components/MasonryGames';
// import RectGamesList from '../components/RectGamesList';
// import BoxGamesList from '../components/BoxGamesList';
// import BottomTabNav from '../components/BottomTabNav';
// import CategoriesFooter from '../components/CategoriesFooter';
// import { connect } from 'react-redux';
// import { bindActionCreators} from 'redux';
// import * as mainActions from '../redux/main/mainActions'
// import storyGames from '../services/mocks/storyGames';
// import featuredGames from '../services/mocks/featuredGames';
// import contentService from '../services/content.service';
// import utils from '../services/common/utils';
// import { withRouter } from 'next/router';
// import axios from 'axios';


// interface State {
//    index : number,
//    rubrics : any[],
//    rendererTime : any
// }


// class HomePage extends Component<any, State> {
//   constructor(props: any) {
//     super(props);
//     this.state = {
//       index: 0,
//       rubrics: [],
//       rendererTime: new Date().getTime().toString(),
//     };
//   }

//   componentDidMount(): void {
    
//     this.getRubrics();

//     // this.getSubscription();

//     this.checkRedirect();
//   }

//   checkRedirect = () => {
//     const params = new URLSearchParams(window.location.search);
//     const trackParam = params.get("track"); // Get the 'track' parameter

//     const trackId =  params.get("id");

//     const { router } = this.props;

//     if (trackId){
//       axios.get(`https://api.usiku.games/song-detail/${trackId}/`)
//       .then((d:any)=>{

//         let trackObject = d.data

//         router.push({
//           pathname: "/game",
//           query: { track: JSON.stringify(trackObject) }, // for example
//         });
        
//       })
//     }
    

//     if (trackParam) {
//       try {
//         const trackObject = JSON.parse(decodeURIComponent(trackParam));

//         router.push({
//           pathname: "/game",
//           query: { track: JSON.stringify(trackObject) }, // for example
//         });
//       } catch (error) {
//         console.error("Error parsing track JSON:", error);
//       }
//     }
//   };

//   getRubrics = () => {
//     // Get Rubrics
//     // var currentRubrics: any[] = this.props.mainState.rubrics;
//     // if(!currentRubrics.length)

//     let rubrics = [
//       {
//         id: 1,
//         attributes: {
//           title: "Trending this week",
//           layout: "masonry",
//           createdAt: "2024-01-06T21:13:20.362Z",
//           updatedAt: "2024-01-17T14:11:25.437Z",
//           publishedAt: "2024-01-06T21:13:34.146Z",
//         },
//       },
//       // {
//       //   id: 2,
//       //   attributes: {
//       //     title: "Most Popular",
//       //     layout: "rect",
//       //     createdAt: "2024-01-06T21:13:58.767Z",
//       //     updatedAt: "2024-01-16T16:34:31.327Z",
//       //     publishedAt: "2024-01-06T21:14:00.352Z",
//       //   },
//       // },
//       {
//         id: 2,
//         attributes: {
//           title: "Most Popular",
//           layout: "box",
//           createdAt: "2024-01-06T21:14:40.551Z",
//           updatedAt: "2024-01-06T21:56:43.493Z",
//           publishedAt: "2024-01-06T21:14:42.469Z",
//         },
//       },

//       {
//         id: 3,
//         attributes: {
//           title: "Kenyan Songs",
//           layout: "box",
//           createdAt: "2024-01-06T21:14:40.551Z",
//           updatedAt: "2024-01-06T21:56:43.493Z",
//           publishedAt: "2024-01-06T21:14:42.469Z",
//         },
//       },
//     ];

//     this.setState({ rubrics });
//     // console.log("rubrics",rubrics);


//   };


//   render(): React.ReactNode {
//     return (
//       <div className="cmd-page">
//         <Header />
//         <CategoriesCards />
//         <div className="kayfo-body-content">
//           {this.state.rubrics.map((rubric, index) => {
//             var view: any = null;
//             switch (rubric.attributes.layout) {
//               case utils.layouts.MASONRY:
//                 view = (
//                   <MasonryGames
//                     key={index}
//                     rubricId={rubric.id}
//                     title={rubric.attributes.title}
//                   />
//                 );
//                 break;

//               case utils.layouts.BOX:
//                 view = (
//                   <BoxGamesList
//                     key={index}
//                     rubricId={rubric.id}
//                     title={rubric.attributes.title}
//                     items={storyGames}
//                   />
//                 );
//                 break;

//               case utils.layouts.RECT:
//                 view = (
//                   <RectGamesList
//                     key={index}
//                     rubricId={rubric.id}
//                     title={rubric.attributes.title}
//                   />
//                 );
//                 break;

//               default:
//                 break;
//             }
//             return view;
//           })}
//           {/* <MasonryGames />
//               <RectGamesList title="Jeux africains" />
//               <BoxGamesList title="Jeux Narratifs" items={storyGames} />
//               <BoxGamesList title="Classique" items={featuredGames} />
//               <RectGamesList title="Spécial Dakar" /> */}

//           <CategoriesFooter />

//           <Footer />
//         </div>

//         <BottomTabNav />
//       </div>
//     );
//   }
// };
// const mapStateToProps = (state:any) => {
//   return {
//     mainState: state.mainReducer
//   };
// };

// const mapDispatchToProps = (dispatch:any) => {
//   return {
//     mainActions: bindActionCreators(mainActions, dispatch)
//   };
// };


// export default connect(mapStateToProps, mapDispatchToProps)(withRouter(HomePage));
