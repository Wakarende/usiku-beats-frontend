import React from "react";
import Image from "next/image";

const AnimationSongCard = ({ song }) => {
  const getStarsFromScore = (score) => {
    let starsCount;
    if (score < 18000) {
      starsCount = 0;
    } else if (score >= 18000 && score < 36000) {
      starsCount = 1;
    } else if (score >= 36000 && score < 54000) {
      starsCount = 2;
    } else if (score >= 54000 && score < 72000) {
      starsCount = 3;
    } else if (score >= 72000 && score < 90000) {
      starsCount = 4;
    } else if (score >= 90000) {
      starsCount = 5;
    } else {
      starsCount = 0;
    }
    return starsCount;
  };

  const starCount = getStarsFromScore(song.high_score);

  const isNewSong = () => {
    return song.unlocked && (!song.high_score || song.high_score === 0);
  };

  return (
    <div className="w-[200px] h-[280px] relative overflow-hidden flex justify-center items-center">
       
      {/* Frame */}
      <Image
        src="./assets/img/hub/frame.png"
        width={240}
        height={200}
        alt="song-frame"
        className="z-2 w-[280px] h-[240px]"
      />
      
      {/* Artist Image Container */}
      <div className="absolute overflow-hidden left-[0.3rem] w-[192px] h-[180px] top-[1.5rem] rounded-t-lg">
        <Image
          src={song.thumbnail_file}
          alt="Artist Image"
          layout="fill"
          className="object-cover"
        />
      </div>
      
      {/* Star Rating Overlay */}
      <div className="absolute top-[1.5rem] left-0 w-full h-8 bg-gradient-to-b from-black/70 rounded-2xl to-transparent z-20">
        {isNewSong() ? (
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 flex items-center justify-center mt-2">
            <svg viewBox="0 0 100 30" className="w-20 h-6 animate-pulse">
              <text
                className="svgText uppercase tracking-widest font-bold text-[16px] text-yellow"
                x="50"
                y="20"
                textAnchor="middle"
                fontSize="12"
              >
                NEW SONG!
              </text>
            </svg>
          </div>
        ) : (
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 flex mt-2">
            {[...Array(5)].map((_, index) => (
              <div key={index} className="relative w-5 h-5">
                <Image
                  src={
                    starCount > 0 && index < starCount
                      ? "./assets/img/hub/Star_Active.png"
                      : "./assets/img/hub/Star_Inactive.png"
                  }
                  alt="star"
                  width={15}
                  height={15}
                  className="stars object-contain min-w-6 min-h-6"
                />
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="absolute w-full flex justify-start items-end z-20 bottom-[6.8rem] left-[-9px]">
        <svg viewBox="0 0 450 70" className="absolute left-[-1rem]">
          <text
            className="svgText uppercase tracking-widest text-yellow text-[10px]"
            x="1"
            y="45"
          >
            {song.country_name}
          </text>
        </svg>
        <svg viewBox="0 0 450 70" className="absolute left-[8rem]">
          <text
            className="svgText uppercase tracking-widest text-yellow text-[10px]"
            x="3"
            y="45"
          >
            {song.difficulty}
          </text>
        </svg>
      </div>
      <div className="absolute left-1/2 transform -translate-x-1/2 flex flex-col items-center z-2 leading-tight bottom-[2rem]">
        <p className="text-yellow text-nowrap text-lg leading-tight mb-1">
          {song.song_name}
        </p>
        <p className="text-white uppercase text-nowrap leading-tight text-[12px]">
          {song.artist_name}
        </p>
      </div>
        
    </div>
  );
};

export default AnimationSongCard;