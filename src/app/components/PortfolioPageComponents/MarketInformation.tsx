/** @format */

const MarketInformation = ({coinMarketData}) => {
    return (
        <div className="flex flex-col justify-around h-1/2">
            <div>Market Information</div>
            <div className="flex justify-between text-xs">
                <div className="flex justify-center items-center flex-col">
                    <div>Current Price</div>
                    <div>${coinMarketData.current_price}</div>
                </div>
                <div className="flex justify-center items-center flex-col">
                    <div>Price Change (24h)</div>
                    <div>{coinMarketData.price_change_percentage_24h?.toFixed(2)}%</div>
                </div>
                <div className="flex justify-center items-center flex-col">
                    <div>All Time High</div>
                    <div>${coinMarketData.ath}</div>
                </div>
                <div className="flex justify-center items-center flex-col">
                    <div>All Time Low</div>
                    <div>${coinMarketData.atl}</div>
                </div>
            </div>
        </div>
    );
};

export default MarketInformation;
