import React from "react";
import Image from "next/image";
import classNames from "classnames";

const LevelInfo = ({
  level,
  bonusGems,
  normalDifficulty,
  unlockSongs,
  starsNeeded,
  isActive,
  isCompleted,
  isInactive,
}) => {
  const containerClasses = classNames(
    "min-w-full snap-center scale-90",
    "flex flex-col items-center justify-center"
  );

  const getBackgroundImage = () => {
    if (isActive) return "url('/assets/img/levelinfo/Tile_Active.png')";
    if (isCompleted) return "url('/assets/img/levelinfo/Tile_completed.png')";
    return "url('/assets/img/levelinfo/Tile_Inactive.png')";
  };

  const cardClasses = classNames(
    " overflow-hidden relative",
    "bg-no-repeat bg-cover bg-center",
    "flex flex-col"
  );

  const getLevelText = () => {
    if (isActive) return "CURRENT LEVEL";
    if (isInactive) return "NEXT LEVEL";
    return "PREVIOUS LEVEL";
  };

  return (
    <div className={containerClasses}>
      {/* Level Header */}
      <div className="text-center mb-2">
        <h1
          className={classNames("text-xl tracking-wide", {
            "text-yellow-300": isActive,
            "text-gray-300": !isActive,
          })}
        >
          {getLevelText()}
        </h1>
        <h1
          className={classNames("text-6xl tracking-wide", {
            "text-yellow-300": isActive,
            "text-gray-300": !isActive,
          })}
        >
          LEVEL {level}
        </h1>
      </div>

      {/* Main Card */}
      <div
        className={cardClasses}
        style={{
          backgroundImage: getBackgroundImage(),
          width: "387px",
          height: "481px",
        }}
      >
        {/* Card Content Container */}
        <div className="flex-1 flex flex-col">
          {/* Center Content Section */}
          <div className="flex-1 flex flex-col justify-center items-center px-6">
            {/* "YOU GET" Section */}
            <p
              className={classNames("text-5xl text-center mb-8", {
                "text-yellow-300": !isInactive,
                "text-gray-300": isInactive,
              })}
            >
              YOU GET
            </p>

            {/* Rewards List */}
            <div className="space-y-4">
              {/* Bonus Gems */}
              <div className="flex items-center">
                <div className="flex items-center flex-1">
                  <div className="w-6 h-6 relative mr-3">
                    <Image
                      src="/assets/img/levelinfo/Gem.png"
                      alt="Gems"
                      layout="fill"
                      objectFit="contain"
                    />
                  </div>
                  <span className="text-gray-300 text-sm">Bonus gems</span>
                </div>
                <span className="text-yellow-400 text-lg font-bold ml-4">
                  {bonusGems}
                </span>
              </div>

              {/* Normal Difficulty */}
              <div className="flex items-center">
                <div className="w-6 h-6 relative mr-3">
                  <Image
                    src="/assets/img/levelinfo/Unlock.png"
                    alt="Difficulty"
                    layout="fill"
                    objectFit="contain"
                  />
                </div>
                <span className="text-gray-300 text-sm">Pro difficulty</span>
              </div>

              {/* Held Tiles */}
              <div className="flex items-center">
                <div className="w-6 h-6 relative mr-3">
                  <Image
                    src="/assets/img/levelinfo/Unlock.png"
                    alt="Tiles"
                    layout="fill"
                    objectFit="contain"
                  />
                </div>
                <span className="text-gray-300 text-sm">Held tiles</span>
              </div>

              {/* New Songs */}
              <div className="flex items-center">
                <div className="w-6 h-6 relative mr-3">
                  <Image
                    src="/assets/img/levelinfo/Disc.png"
                    alt="Songs"
                    layout="fill"
                    objectFit="contain"
                  />
                </div>
                <span className="text-gray-300 text-sm">
                  {unlockSongs} New songs to unlock
                </span>
              </div>
            </div>
          </div>

          {/* Stars Needed Footer */}
          <div className="w-full">
            <div className=" flex flex-col items-center justify-center">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 relative">
                  <Image
                    src="/assets/img/levelinfo/Star.png"
                    alt="Star"
                    layout="fill"
                    objectFit="contain"
                  />
                </div>
                <h1 className="text-gray text-6xl">{starsNeeded}</h1>
              </div>
              <p className="text-yellow-300 text-lg tracking-wide">
                Stars needed
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LevelInfo;
