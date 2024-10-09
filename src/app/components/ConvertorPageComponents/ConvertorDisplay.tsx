const ConvertorDisplay = ({ symbol, price }) => {
  return (
    <div className="w-5/12 h-[150px] rounded-3xl p-5 bg-[#181825] flex justify-center items-center flex-col">
      <>
        {symbol && (
          <>
            {" "}
            1 {symbol} = ${price}
          </>
        )}
      </>
    </div>
  );
};

export default ConvertorDisplay;
