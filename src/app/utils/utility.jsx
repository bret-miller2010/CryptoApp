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
