const Weapon = ({ data }) => (
  <div className="mb-2 order-5 bg-darkblue">
    <div className={`flex flex-row`}>
      <div>
        <img
          className="w-16 h-16"
          src={`https://bungie.net/${data.displayProperties.icon}`}
          alt={data.displayProperties.name}
        />
      </div>
      <div className="px-4 py-1 flex-grow flex flex-col">
        <span className="text-white">{data.displayProperties.name}</span>
        <span className="text-white text-opacity-50 text-xs">
          {data.itemTypeAndTierDisplayName}
        </span>
      </div>
    </div>
  </div>
);

export default Weapon;
