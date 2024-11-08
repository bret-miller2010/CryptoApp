const CoinDescription = ({ coinData, darkMode }) => {
   const description = coinData.description.en;

   return (
      <div className="flex justify-center items-center ">
         <div
            className={`${darkMode ? "duration-300 text-white" : "duration-300 text-[#1e1932]"} w-[800px] text-sm`}
            dangerouslySetInnerHTML={{ __html: description }}
         ></div>
      </div>
   );
};

export default CoinDescription;
