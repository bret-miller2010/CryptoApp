import PropTypes from "prop-types";
import Image from "next/image";

const CoinDetails = ({ data, spot }) => {
  const coinName = data.name;
  const currentPrice = Number(data.current_price).toFixed(2);
  const oneHourChange = Number(
    data.price_change_percentage_1h_in_currency
  ).toFixed(2);
  const oneDayChange = Number(data.price_change_percentage_24h).toFixed(2);
  const sevenDayChange = Number(
    data.price_change_percentage_7d_in_currency
  ).toFixed(2);
  const coinImage = data.image;

  return (
    <div className="flex justify-between text-white mt-2.5 mx-2 p-2 rounded-2xl  bg-[#181825]">
      <div className="flex justify-between items-center w-1/4">
        <div className="w-10">{spot + 1}</div>
        <div className="w-40 flex justify-center">
          <Image src={coinImage} width={40} height={40} alt="coin image" />
        </div>

        <div className="w-60 flex justify-center">{coinName}</div>
      </div>
      <div className="flex justify-between items-center w-1/4">
        <div className="w-1/4">${currentPrice}</div>
        <div className="w-1/4">{oneHourChange}%</div>
        <div className="w-1/4">{oneDayChange}%</div>
        <div className="w-1/4">{sevenDayChange}%</div>
      </div>
      <div className="flex justify-around items-center w-1/4">
        <div className = "w-1/3">24h Volume</div>
        <div className = "w-1/2">Circulating/Total Supply</div>
        <div>Graph</div>
      </div>
    </div>
  );
};

CoinDetails.propTypes = {
  data: PropTypes.object,
  spot: PropTypes.number,
  index: PropTypes.number,
};

export default CoinDetails;
