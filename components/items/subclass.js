const Subclass = ({ data }) => (
  <div className="mb-2 order-3">
    <div className={`flex flex-row`}>
      <div>
        <img
          className="w-16 h-16"
          src={`https://bungie.net/${data.icon}`}
          alt={data.name}
        />
      </div>
      <div className="p-4 text-white flex-grow self-center">
        <h3 className="text-xl">
          {data.name}
        </h3>
      </div>
    </div>
  </div>
);

export default Subclass;
