const CoinLinks = ({ coinData }) => {
  const firstLink = coinData.links.blockchain_site[2];
  const secondLink = coinData.links.blockchain_site[3];
  const thirdLink = coinData.links.blockchain_site[4];

  return (
    <div className="text-white space-y-5 text-center">
      {firstLink && (
        <div className="flex justify-center items-center bg-[#1e1932] p-3 w-[500px] rounded-lg h-[75px]">
          {firstLink}
        </div>
      )}
      {secondLink && (
        <div className="flex justify-center items-center bg-[#1e1932] p-3 w-[500px] rounded-lg h-[75px]">
          {secondLink}
        </div>
      )}
      {thirdLink && (
        <div className="flex justify-center items-center bg-[#1e1932] p-3 w-[500px] rounded-lg h-[75px]">
          {thirdLink}
        </div>
      )}
    </div>
  );
};

export default CoinLinks;
