import React from "react";
import Image from "next/image";
import classNames from "classnames";
import "../styles.css"; // Ensure this imports any necessary custom CSS

const LevelInfo = ({
  level,
  bonusGems,
  normalDifficulty,
  heldTiles,
  unlockSongs,
  starsNeeded,
  isActive,
  isCompleted,
  isInactive,
}) => {
  // Determine the background class based on the level state
  const backgroundClass = classNames("bg-level", {
    "bg-level-active": isActive,
    "bg-level-completed": isCompleted,
    "bg-level-inactive": isInactive,
  });

  // Define a consistent scaling factor
  const scalingClass = isActive ? "scale-10" : "scale-10";

  const levelText = isActive
    ? "Current Level"
    : isInactive
    ? "Next Level"
    : "Previous Level";

  const textColorClass = isActive ? "text-yellow-300" : "text-white";
  const youGetTextColorClass = isInactive ? "text-white" : "text-yellow-300";

  return (
    <div
      className={classNames(
        "flex-shrink-0 flex flex-col items-center justify-center snap-center",
        {
          "w-full sm:w-3/4 md:w-1/2 lg:w-1/1": !isActive,
          "w-full sm:w-3/4 md:w-3/4 lg:w-2/3": isActive,
        }
      )}
    >
      <div className="text-center uppercase mb-1">
        <p className={classNames("text-md uppercase", textColorClass)}>
          {levelText}
        </p>
        <h1 className={classNames("text-5xl", textColorClass)}>
          Level {level}
        </h1>
      </div>
      <div
        className={classNames(
          "transition-transform duration-200 w-full overflow-visible px-2",
          scalingClass
        )}
      >
        <div
          className={classNames(
            "relative bg-contain bg-center bg-no-repeat",
            backgroundClass,
            "aspect-w-3 aspect-h-4"
          )}
        >
          <div className="absolute inset-0 flex flex-col justify-between">
            <div className="text-white text-center px-5 pt-4">
              <p
                className={classNames(
                  "text-5xl mb-4 mt-4 font-body carlito-bold",
                  youGetTextColorClass
                )}
              >
                You Get
              </p>
              <div className="reward-list space-y-4">
                {/* Bonus Gems */}
                <div className="reward-item flex items-center justify-start gap-2 w-full">
                  <div className="icon-wrapper flex items-center justify-center">
                    <Image
                      src="/assets/img/levelinfo/Gem.png"
                      alt="Gem"
                      width={28}
                      height={28}
                    />
                  </div>
                  <div className="label-wrapper flex-grow text-left">
                    <p className="text-base font-medium">Bonus Gems</p>
                  </div>
                  <div className="value-wrapper text-right">
                    <h3 className="text-3xl text-yellow-300">{bonusGems}</h3>
                  </div>
                </div>

                {/* Normal Difficulty */}
                <div className="reward-item flex items-center justify-start gap-2 w-full">
                  <div className="icon-wrapper flex items-center justify-center">
                    <Image
                      src="/assets/img/levelinfo/Unlock.png"
                      alt="Unlock"
                      width={28}
                      height={28}
                    />
                  </div>
                  <div className="label-wrapper flex-grow text-left">
                    <p className="text-base font-medium">
                      {normalDifficulty} Normal
                    </p>
                  </div>
                </div>

                {/* Held Tiles */}
                <div className="reward-item flex items-center justify-start gap-2 w-full">
                  <div className="icon-wrapper flex items-center justify-center">
                    <Image
                      src="/assets/img/levelinfo/Unlock.png"
                      alt="Unlock"
                      width={28}
                      height={28}
                    />
                  </div>
                  <div className="label-wrapper flex-grow text-left">
                    <p className="text-base font-medium">
                      {heldTiles} Held Tiles
                    </p>
                  </div>
                </div>

                {/* New Songs to Unlock */}
                <div className="reward-item flex items-center justify-start gap-2 w-full">
                  <div className="icon-wrapper flex items-center justify-center">
                    <Image
                      src="/assets/img/levelinfo/Disc.png"
                      alt="Disc"
                      width={28}
                      height={28}
                    />
                  </div>
                  <div className="label-wrapper flex-grow text-left">
                    <p className="text-base font-medium">
                      {unlockSongs} New Songs to Unlock
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Stars Needed Section */}
            <div className="card-bottom-section">
              <div className="stars-needed-container flex flex-col items-center justify-center">
                <div className="flex items-center justify-center space-x-2 mb-1">
                  <Image
                    src="/assets/img/levelinfo/Star.png"
                    alt="Star"
                    width={25}
                    height={25}
                    className="p-0"
                  />
                  <h2 className="text-5xl text-black">{starsNeeded}</h2>
                </div>
                <p className="text-yellow-200 text-xl">Stars Needed</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="z-0"></div> */}
    </div>
  );
};

export default LevelInfo;
