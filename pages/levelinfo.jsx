import React from 'react';
import { useSelector } from 'react-redux';
import { Container, Row, Col } from 'react-bootstrap';
import Header from '../components/Header';
import Footer from '../components/Footer';
import LevelInfo from '../components/LevelInfo';
import '../components/styles.css';
import Link from 'next/link';
import axios from "axios";
const LevelInfoPage = () => {

   const levelsData = [
    { level: 1, bonusGems: 10, normalDifficulty: 1, multiTapTiles: 2, starsNeeded: 100, achievements: 5 },
    { level: 2, bonusGems: 20, normalDifficulty: 2, multiTapTiles: 4, starsNeeded: 200, achievements: 10 },
    { level: 3, bonusGems: 30, normalDifficulty: 3, multiTapTiles: 6, starsNeeded: 300, achievements: 15 },
    { level: 4, bonusGems: 40, normalDifficulty: 4, multiTapTiles: 8, starsNeeded: 400, achievements: 20 },
    // Add more levels as needed
  ];

  const auth = useSelector((state) => state.auth);
  const { user_data } = auth;
  const currentLevel = user_data?.profile?.player?.level || 1;

  
  return (
    <>
      <Header />
      <Container className="mt-5">
        <Row className="justify-content-center">
          <Col md={8}>
             <div className="overflow-auto" style={{ maxHeight: '80vh' }}>
              {levelsData.map((levelInfo, index) => (
                <LevelInfo
                  key={index}
                  level={levelInfo.level}
                  bonusGems={levelInfo.bonusGems}
                  normalDifficulty={levelInfo.normalDifficulty}
                  multiTapTiles={levelInfo.multiTapTiles}
                  starsNeeded={levelInfo.starsNeeded}
                  achievements={levelInfo.achievements}
                  isCurrentLevel={levelInfo.level === currentLevel}
                />
              ))}
               <div className="text-center mt-3">
                <Link href="/">
                  <button className='bg-pink-500 text-white font-bold px-5 py-2 text-2xl mb-5'>
                    Back
                  </button>
                </Link>
              </div>
            </div>  
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
};

export default LevelInfoPage;