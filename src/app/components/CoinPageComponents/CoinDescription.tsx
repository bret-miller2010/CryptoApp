/** @format */

const CoinDescription = ({ coinData, darkMode }) => {
    if (!coinData) {
        return null;
    }
    const description = coinData.description.en;

    return (
        <div className="hidden min-[700px]:flex justify-center items-center text-[9px] w-[600px] mt-5">
            <div
                className={`duration-300 ${darkMode ? " text-white" : " text-[#1e1932]"}`}
                dangerouslySetInnerHTML={{ __html: description }}></div>
        </div>
    );
};

export default CoinDescription;
