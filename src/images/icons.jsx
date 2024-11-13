export const SearchIcon = () => {
   return (
      <div>
         <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="black"
            className="size-4 h-6 absolute">
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
         className="duration-300 w-20 mr-5 hover:scale-125"
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
         className="duration-300 mr-5 hover:scale-125 w-20"
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
         className="duration-300 mr-5 hover:scale-125 w-20"
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
         className="duration-300 mr-5 hover:scale-125 w-20"
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
         width="20"
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
         width="20"
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
