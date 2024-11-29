const CoinDescription = ({ coinData, darkMode }) => {
   const description = coinData.description.en;

   return (
      <div className="flex absolute md:relative justify-center items-center invisible md:visible">
         <div
            className={`duration-300 ${darkMode ? " text-white" : " text-[#1e1932]"} w-[800px] text-sm`}
            dangerouslySetInnerHTML={{ __html: description }}
         ></div>
      </div>
   );
};

export default CoinDescription;
