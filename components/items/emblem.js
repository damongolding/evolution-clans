const Emblem = ({
  characterClass,
  characterLight,
  secondaryIcon,
  backgroundColor,
}) => {
  const emblemBackgroundColor = `rgba(${backgroundColor.red},${backgroundColor.green},${backgroundColor.blue},${backgroundColor.alpha})`;
  return (
    <div
      className="m-1 order-1"
      style={{ backgroundColor: emblemBackgroundColor }}
    >
      <div className="relative">
        <img src={`http://bungie.net${secondaryIcon}`} alt="" />
        <div className="absolute inset-0 flex flex-row">
          <div className="sm:w-10 sm:h-10 md:w-10 md:h-10 lg:w-16 lg:h-16 w-16 h-16"></div>
          <div className="p-4 flex flex-grow flex-row self-center items-center justify-between">
            <h2 className="sm:text-4xl md:text-xl xl:text-4xl text-4xl text-bold text-white">
              {characterClass === 0
                ? "Titan"
                : characterClass === 1
                ? "Hunter"
                : "Warlock"}
            </h2>
            <span className="text-yellow">✦{characterLight}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Emblem;
