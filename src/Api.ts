export const getCoinList = () => {
  return fetch("https://api.coinpaprika.com/v1/tickers").then((res) =>
    res.json()
  );
};
export const getCoinInfo = (coinId: string) => {
  return fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`).then((res) =>
    res.json()
  );
};

export const getCoinPrice = (coinId: string) => {
  return fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`).then((res) =>
    res.json()
  );
};

// const getCoinInfo = async () => {
//   const response = await fetch(
//     `https://api.coinpaprika.com/v1/coins/${coinId}`
//   );
//   const data = await response.json();
//   setCoinData(data);
//   setIsLoading(false);
// };
// const getCoinPrice = async () => {
//   const response = await fetch(
//     `https://api.coinpaprika.com/v1/tickers/${coinId}`
//   );
//   const data = await response.json();
//   setCoinPrice(data);
//   setIsLoading(false);
// };
