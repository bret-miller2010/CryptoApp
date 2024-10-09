const CoinDescription = ({ coinData }) => {
  const description = coinData.description.en;

  return (
    <div className="flex justify-center items-center">
      <div
        className="text-white w-[800px] text-sm"
        dangerouslySetInnerHTML={{ __html: description }}
      ></div>
    </div>
  );
};

export default CoinDescription;
