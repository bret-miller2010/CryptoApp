/** @format */

const CoinLinks = ({ coinData, darkMode }) => {
    if (!coinData) {
        return null;
    }
    const firstLink = coinData.links.blockchain_site[2];
    const secondLink = coinData.links.blockchain_site[3];
    const thirdLink = coinData.links.blockchain_site[4];

    return (
        <div className="text-white space-y-5 text-center hidden">
            {firstLink && <div className={`flex justify-center items-center ${darkMode ? "duration-300 bg-[#1e1932]" : "duration-300 bg-[#5492f7]"} p-3 w-[500px] rounded-lg h-[75px]`}>{firstLink}</div>}
            {secondLink && <div className={`flex justify-center items-center ${darkMode ? "duration-300 bg-[#1e1932]" : "duration-300 bg-[#5492f7]"} p-3 w-[500px] rounded-lg h-[75px]`}>{secondLink}</div>}
            {thirdLink && (
                <div className={`flex justify-center items-center ${darkMode ? "duration-300 bg-[#1e1932]" : "duration-300 bg-[#5492f7]"} p-3 w-[500px] rounded-lg h-[75px]`}>
                    {thirdLink}
                    {thirdLink}
                </div>
            )}
        </div>
    );
};

export default CoinLinks;
