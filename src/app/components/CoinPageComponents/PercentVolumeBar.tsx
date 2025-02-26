/** @format */

const PercentVolumeBar = ({percentVPM}) => {
    return (
        <div className="justify-center mt-12 flex-col flex">
            <div className="flex justify-between mb-1">
                <div>{percentVPM.toFixed(2)}%</div>
                <div>{(100 - percentVPM).toFixed(2)}%</div>
            </div>
            <div className="w-full h-[15px] bg-[#f8d2a6]">
                <div
                    className={"h-[15px] bg-red-500"}
                    style={{
                        width: `${percentVPM}%`,
                    }}></div>
            </div>
        </div>
    );
};

export default PercentVolumeBar;
