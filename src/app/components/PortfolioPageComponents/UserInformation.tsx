/** @format */

const UserInformation = ({ coinMarketData, data }) => {
    const findBalance = () => {
        const totalPurchase = data.total_coins * data.initial_value;
        const currentValue = coinMarketData.current_price * data.total_coins;
        return currentValue - totalPurchase;
    };

    return (
        <div className="flex flex-col justify-around h-1/2">
            <div>Your Information</div>
            <div className="flex justify-between text-xs">
                <div className="flex justify-center items-center flex-col">
                    <div>Total Coins</div>
                    <div>{data.total_coins}</div>
                </div>
                <div className="flex justify-center items-center flex-col">
                    <div>Original Price</div>
                    <div>${data.initial_value}</div>
                </div>
                <div className="flex justify-center items-center flex-col">
                    <div>Current Valuation</div>
                    <div>${data.total_coins * coinMarketData.current_price}</div>
                </div>
                <div className="flex justify-center items-center flex-col">
                    <div>Gain/Loss</div>
                    <div>${findBalance()}</div>
                </div>
            </div>
        </div>
    );
};

export default UserInformation;
