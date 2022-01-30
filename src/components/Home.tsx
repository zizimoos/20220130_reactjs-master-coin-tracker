import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { getCoinList } from "../Api";
import { useQuery } from "react-query";

const Container = styled.div`
  max-width: 480px;
  margin: 0 auto;
  padding: 0 20px;
`;
const Header = styled.header`
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Title = styled.h1`
  font-size: 2.5rem;
  color: ${(props) => props.theme.colors.accentColor};
`;
const Loader = styled.div`
  display: block;
  text-align: center;
`;

const CoinList = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Coin = styled.div`
  width: 360px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  padding: 15px;
  border-radius: 5px;
  background-color: ${(props) => props.theme.colors.bgColor2};
  color: ${(props) => props.theme.colors.textColor};
  &:hover {
    background-color: ${(props) => props.theme.colors.textColor};
    color: ${(props) => props.theme.colors.bgColor};
  }
  transition: all 0.2s ease-in-out;
`;
const CoinImg = styled.img`
  width: 36px;
  margin-right: 10px;
`;

interface ICoinType {
  id: string;
  name: string;
  rank: number;
  symbol: string;
  quotes: { [key: string]: { price: number; market_cap: number } };
}

const Home = () => {
  const { isLoading, data } = useQuery<ICoinType[]>("getCoinList", getCoinList);

  return (
    <Container>
      <Header>
        <Title>Crypto Tracker</Title>
      </Header>
      <CoinList>
        {isLoading ? (
          <Loader>Loading...</Loader>
        ) : (
          data?.slice(0, 100).map((coin) => (
            <Link
              to={`/${coin.id}`}
              state={{ name: coin.name, rank: coin.rank, symbol: coin.symbol }}
              key={coin.id}
            >
              <Coin>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <CoinImg
                    src={`https://cryptoicon-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`}
                    alt={coin.name}
                  />
                  <div>
                    {coin.rank} : {coin.symbol}
                  </div>
                </div>
                <div> {coin.quotes.USD.price.toFixed(3)} USD</div>
              </Coin>
            </Link>
          ))
        )}
      </CoinList>
    </Container>
  );
};
export default Home;
