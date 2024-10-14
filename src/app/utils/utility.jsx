export function addCommas(number, num_decimals, include_comma) {
  return number.toLocaleString("en-US", {
    useGrouping: include_comma,
    minimumFractionDigits: num_decimals,
    maximumFractionDigits: num_decimals,
  });
}
