const DummyItem = ({ order }) => (
  <div className={`mb-2 order-${order} bg-darkblue`}>
    <div className={`flex flex-row animate-pulse`}>
      <div className="w-16 h-16 bg-gray-700"></div>
      <div className="px-4 py-1 flex-grow flex flex-col">
        <div className="flex-1 space-y-3 py-1">
          <div className="h-3 bg-gray-700 rounded w-3/4"></div>
          <div className="h-3 bg-gray-700 rounded w-2/4"></div>
        </div>
      </div>
    </div>
  </div>
);

export default DummyItem;
