import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import Link from "next/link";
import Image from "next/image";

import Header from "../components/header/Header";
import LevelInfo from "../components/levelinfo/LevelInfo";

import "./pages.css";
const LevelInfoPage = () => {
  const levelsData = [
    {
      level: 1,
      bonusGems: 10,
      normalDifficulty: 0,
      multiTapTiles: 2,
      starsNeeded: 5,
      unlockSongs: 20,
    },
    {
      level: 2,
      bonusGems: 20,
      normalDifficulty: 2,
      multiTapTiles: 4,
      starsNeeded: 200,
      unlockSongs: 20,
    },
    {
      level: 3,
      bonusGems: 30,
      normalDifficulty: 3,
      multiTapTiles: 6,
      starsNeeded: 300,
      unlockSongs: 20,
    },
    {
      level: 4,
      bonusGems: 40,
      normalDifficulty: 4,
      multiTapTiles: 8,
      starsNeeded: 400,
      unlockSongs: 20,
    },
    {
      level: 5,
      bonusGems: 40,
      normalDifficulty: 4,
      multiTapTiles: 8,
      starsNeeded: 400,
      unlockSongs: 20,
    },
  ];

  const auth = useSelector((state) => state.auth);
  const { user_data } = auth;
  const currentLevel = user_data?.profile?.player?.level || 1;

  const scrollContainerRef = useRef(null);

  useEffect(() => {
    // Scroll to the current level on mount
    const currentIndex = levelsData.findIndex(
      (level) => level.level === currentLevel
    );
    if (scrollContainerRef.current && currentIndex !== -1) {
      const child = scrollContainerRef.current.children[currentIndex];
      const childWidth = child.offsetWidth;
      const containerWidth = scrollContainerRef.current.offsetWidth;
      const scrollPosition =
        child.offsetLeft - containerWidth / 2 + childWidth / 2;
      scrollContainerRef.current.scrollTo({
        left: scrollPosition,
        behavior: "smooth",
      });
    }
  }, [currentLevel, levelsData]);

  return (
    <div className="gradient-bg flex flex-col">
      <Header />
      <div className="items-center justify-center">
        <div className="main-container">
          <div className="level-info-container ">
            {/* Horizontal Scroll Container */}
            <div ref={scrollContainerRef} className="scroll-snap-container">
              {levelsData.map((levelInfo) => {
                const isActive = levelInfo.level === currentLevel;
                const isCompleted = levelInfo.level < currentLevel;
                const isNextLevel = levelInfo.level === currentLevel + 1;
                const isInactive = levelInfo.level > currentLevel + 1;
                return (
                  <LevelInfo
                    key={levelInfo.level} // Using 'level' as a unique key
                    level={levelInfo.level}
                    currentLevel={currentLevel}
                    bonusGems={levelInfo.bonusGems}
                    normalDifficulty={levelInfo.normalDifficulty}
                    multiTapTiles={levelInfo.multiTapTiles}
                    starsNeeded={levelInfo.starsNeeded}
                    achievements={levelInfo.unlockSongs}
                    isActive={isActive}
                    isNextLevel={isNextLevel}
                    isCompleted={isCompleted}
                    isInactive={isInactive}
                  />
                );
              })}
            </div>
            <Link href="/hub" passHref>
              <div className="relative">
                <Image
                  src="/assets/img/levelinfo/Back_Button.png"
                  alt="Back"
                  width={300}
                  height={300}
                />
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LevelInfoPage;
