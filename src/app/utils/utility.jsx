export function addCommas(number, num_decimals, include_comma) {
   return number.toLocaleString("en-US", {
      useGrouping: include_comma,
      minimumFractionDigits: num_decimals,
      maximumFractionDigits: num_decimals,
   });
}

export function reduceNumber(value) {
   let loops = 0;
   let sentValue = value;
   const char = ["", "t", "M", "B", "T", "ERR"];
   while (sentValue > 1000) {
      sentValue = sentValue / 1000;
      loops += 1;
   }

   return `${sentValue.toFixed(3)}${char[loops]}`;
}

export function primaryColor(darkMode) {
   return darkMode ? "bg-[#13121a]" : "bg-[#bfbfbf]";
}

export function secondaryColor(darkMode) {
   return darkMode ? "bg-[#181825]" : "bg-white";
}

export function textColor(darkMode) {
   return darkMode ? "text-white" : "text-black";
}

export function priceColor(value) {
   return Number(value) > 0 ? "text-green-500" : "text-red-500";
}

export function navBarColors(darkMode) {
  return darkMode ? "bg-[#181825] hover:bg-[#38386e]" : "text-black bg-[#ffffff] hover:bg-[#8c8c8c]";
}
