/** @format */

import { textColor } from "@/app/utils/utility";

export const SearchIcon = () => {
    return (
        <div>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="black"
                className="size-4 h-6 absolute left-1">
                <path
                    fillRule="evenodd"
                    d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                    clipRule="evenodd"
                />
            </svg>
        </div>
    );
};

export const LeftArrow = ({ handleClick, darkMode }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill={darkMode ? "white" : "black"}
            className="w-10"
            onClick={handleClick}>
            <path
                fillRule="evenodd"
                d="M7.28 7.72a.75.75 0 0 1 0 1.06l-2.47 2.47H21a.75.75 0 0 1 0 1.5H4.81l2.47 2.47a.75.75 0 1 1-1.06 1.06l-3.75-3.75a.75.75 0 0 1 0-1.06l3.75-3.75a.75.75 0 0 1 1.06 0Z"
                clipRule="evenodd"
            />
        </svg>
    );
};

export const RightArrow = ({ handleClick, darkMode }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill={darkMode ? "white" : "black"}
            className="w-10"
            onClick={handleClick}>
            <path
                fillRule="evenodd"
                d="M16.72 7.72a.75.75 0 0 1 1.06 0l3.75 3.75a.75.75 0 0 1 0 1.06l-3.75 3.75a.75.75 0 1 1-1.06-1.06l2.47-2.47H3a.75.75 0 0 1 0-1.5h16.19l-2.47-2.47a.75.75 0 0 1 0-1.06Z"
                clipRule="evenodd"
            />
        </svg>
    );
};

export const UpArrow = ({ handleClick, darkMode }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill={darkMode ? "white" : "black"}
            className="w-10"
            onClick={handleClick}>
            <path
                fillRule="evenodd"
                d="M11.47 2.47a.75.75 0 0 1 1.06 0l3.75 3.75a.75.75 0 0 1-1.06 1.06l-2.47-2.47V21a.75.75 0 0 1-1.5 0V4.81L8.78 7.28a.75.75 0 0 1-1.06-1.06l3.75-3.75Z"
                clipRule="evenodd"
            />
        </svg>
    );
};

export const DownArrow = ({ handleClick, darkMode }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill={darkMode ? "white" : "black"}
            className="w-10"
            onClick={handleClick}>
            <path
                fillRule="evenodd"
                d="M12 2.25a.75.75 0 0 1 .75.75v16.19l2.47-2.47a.75.75 0 1 1 1.06 1.06l-3.75 3.75a.75.75 0 0 1-1.06 0l-3.75-3.75a.75.75 0 1 1 1.06-1.06l2.47 2.47V3a.75.75 0 0 1 .75-.75Z"
                clipRule="evenodd"
            />
        </svg>
    );
};

export const GreenArrow = () => {
    return (
        <svg
            width="15"
            height="21"
            viewBox="0 0 20 21"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
                d="M16.6004 13.0415L11.1671 7.6082C10.5254 6.96654 9.47539 6.96654 8.83372 7.6082L3.40039 13.0415"
                stroke="green"
            />
        </svg>
    );
};

export const RedArrow = () => {
    return (
        <svg
            width="15"
            height="21"
            viewBox="0 0 20 21"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
                d="M16.6004 7.95801L11.1671 13.3913C10.5254 14.033 9.47539 14.033 8.83372 13.3913L3.40039 7.95801"
                stroke="red"
            />
        </svg>
    );
};

export const TrendingDown = () => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6">
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 6 9 12.75l4.286-4.286a11.948 11.948 0 0 1 4.306 6.43l.776 2.898m0 0 3.182-5.511m-3.182 5.51-5.511-3.181"
            />
        </svg>
    );
};

export const TrendingUp = () => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6">
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941"
            />
        </svg>
    );
};

export const Logo = ({darkMode}) => {
    return (
        <div className="flex space-x-2 items-center">
            <svg
                width="30"
                height="20"
                viewBox="0 0 36 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M12.3431 0C10.3124 0 8.36487 0.8067 6.92893 2.24264L2.24264 6.92893C0.8067 8.36487 0 10.3124 0 12.3431C0 16.5719 3.42809 20 7.65687 20C9.6876 20 11.6351 19.1933 13.0711 17.7573L16.3126 14.5158C16.3126 14.5157 16.3127 14.5159 16.3126 14.5158L25.7573 5.07107C26.4431 4.38527 27.3733 4 28.3431 4C29.9669 4 31.3435 5.05827 31.8207 6.52271L34.8015 3.54197C33.4417 1.41223 31.0573 0 28.3431 0C26.3124 0 24.3649 0.8067 22.9289 2.24264L10.2427 14.9289C9.55687 15.6147 8.62673 16 7.65687 16C5.63723 16 4 14.3628 4 12.3431C4 11.3733 4.38527 10.4431 5.07107 9.75733L9.75733 5.07107C10.4431 4.38527 11.3733 4 12.3431 4C13.9669 4 15.3435 5.05832 15.8207 6.52281L18.8015 3.54205C17.4417 1.41227 15.0574 0 12.3431 0Z"
                    fill="#6161D6"
                />
                <path
                    d="M10.0439 14.9289C9.35807 15.6147 8.42793 16 7.45807 16C5.83453 16 4.45807 14.942 3.98067 13.4778L1 16.4585C2.35987 18.5879 4.74406 20 7.45807 20C9.4888 20 11.4363 19.1933 12.8723 17.7573L25.5585 5.07107C26.2443 4.38527 27.1745 4 28.1443 4C30.164 4 31.8012 5.63723 31.8012 7.65687C31.8012 8.62673 31.4159 9.55687 30.7301 10.2427L26.0439 14.9289C25.3581 15.6147 24.4279 16 23.4581 16C21.8344 16 20.4579 14.9418 19.9805 13.4775L16.9999 16.4582C18.3597 18.5879 20.7439 20 23.4581 20C25.4888 20 27.4363 19.1933 28.8723 17.7573L33.5585 13.0711C34.9945 11.6351 35.8012 9.6876 35.8012 7.65687C35.8012 3.42809 32.3731 0 28.1443 0C26.1136 0 24.1661 0.8067 22.7301 2.24264L10.0439 14.9289Z"
                    fill="#6161D6"
                />
            </svg>
            <div className={textColor(darkMode)}>Crypto App</div>
        </div>
    );
};
