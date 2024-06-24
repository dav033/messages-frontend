export default function ChatItemSkeleton() {
  return (
    <div>
      <div className="flex items-center p-3 hover:bg-gray-800 cursor-pointer w-full rounded ">
        <div className="w-9 h-9 rounded-full mr-1 bg-green-500 flex justify-center items-center">
          <div className="text-xl bg-white w-5 h-5 rounded-full"></div>
        </div>
        <div className="h-9 flex-col justify-center p-1">
          <h4 className="text-xs leading-none mb-1 bg-white w-20 h-3 rounded"></h4>
          <h5 className="text-xs text-gray-400 bg-purple- leading-none w-20 h-3 rounded"></h5>
        </div>
      </div>

      <div className="flex items-center p-3 hover:bg-gray-800 cursor-pointer w-full rounded ">
        <div className="w-9 h-9 rounded-full mr-1 bg-green-500 flex justify-center items-center">
          <div className="text-xl bg-white w-5 h-5 rounded-full"></div>
        </div>
        <div className="h-9 flex-col justify-center p-1">
          <h4 className="text-xs leading-none mb-1 bg-white w-20 h-3 rounded"></h4>
          <h5 className="text-xs text-gray-400 bg-purple- leading-none w-20 h-3 rounded"></h5>
        </div>
      </div>

      <div className="flex items-center p-3 hover:bg-gray-800 cursor-pointer w-full rounded ">
        <div className="w-9 h-9 rounded-full mr-1 bg-green-500 flex justify-center items-center">
          <div className="text-xl bg-white w-5 h-5 rounded-full"></div>
        </div>
        <div className="h-9 flex-col justify-center p-1">
          <h4 className="text-xs leading-none mb-1 bg-white w-20 h-3 rounded"></h4>
          <h5 className="text-xs text-gray-400 bg-purple- leading-none w-20 h-3 rounded"></h5>
        </div>
      </div>
    </div>
  );
}
