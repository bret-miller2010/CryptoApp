const CoinDescription = ({ coinData }) => {
  const description = coinData.description.en;

  return (
    <div
      className="text-white w-[800px]"
      dangerouslySetInnerHTML={{ __html: description }}
    ></div>
  );
};

export default CoinDescription;
