export function fullAddress(data) {
  const fullAddress =
    data.address +
    " " +
    data.city +
    " " +
    data.state +
    " " +
    data.zip +
    " " +
    data.country;
  return fullAddress;
}
