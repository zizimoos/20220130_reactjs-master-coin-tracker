import { useEffect, useState } from "react";
import { useMatch, useLocation, useParams } from "react-router-dom";
import { Route, Routes, Link } from "react-router-dom";
import styled from "styled-components";
import { useQuery } from "react-query";
import { getCoinInfo, getCoinPrice } from "../Api";
import Chart from "./Chart";
import Price from "./Price";
import { HiArrowCircleLeft } from "react-icons/hi";

const Container = styled.div`
  max-width: 480px;
  margin: 0 auto;
  padding: 0 20px;
`;
const Header = styled.header`
  height: 10vh;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const Title = styled.h1`
  font-size: 2.5rem;
  color: ${(props) => props.theme.colors.accentColor};
`;
const CoinImg = styled.img`
  width: 36px;
  margin-right: 10px;
`;
const Loader = styled.div`
  display: block;
  text-align: center;
`;

const Overview = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 10px 20px;
  border-radius: 10px;
`;
const OverviewItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  span:first-child {
    font-size: 10px;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: 5px;
  }
`;
const Description = styled.p`
  margin: 20px 0px;
`;

const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 25px 0px;
  gap: 10px;
`;

const Tab = styled.span<{ isActive: boolean }>`
  text-align: center;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 400;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 7px 0px;
  border-radius: 10px;
  color: ${(props) =>
    props.isActive
      ? props.theme.colors.accentColor
      : props.theme.colors.textColor};

  a {
    display: block;
    color: inherit;
  }
`;

interface ICoinInfo {
  id: string;
  rank: number;
  symbol: string;
  description: string;
  open_source: boolean;
  hardwareWallet: boolean;
  links: { [key: string]: string };
  links_extended: [{ url: string }];
  team: [{ id: string; name: string; position: string }];
  whitepaper: { link: string; thumbnail: string };
}
interface ICoinPrice {
  id: string;
  symbol: string;
  total_supply: number;
  max_supply: number;
  quotes: {
    [key: string]: { price: number; market_cap: number; ath_price: number };
  };
}

interface IRouteState {
  state: { name: string; rank: number; symbol: string };
}

const Coin = () => {
  const { coinId } = useParams();

  // const location = useLocation();
  // const {
  //   state: { name, rank, symbol },
  // } = location as IRouteState;

  const priceMatch = useMatch("/:coinId/price");
  const chartMatch = useMatch("/:coinId/chart");

  const { isLoading: dataLoading, data: coinPrice } = useQuery<ICoinPrice>(
    "getCoinPrice",
    () => getCoinPrice(coinId!),
    { refetchInterval: 10000 }
  );

  const { isLoading, data: coinData } = useQuery<ICoinInfo>("getCoinInfo", () =>
    getCoinInfo(coinId!)
  );

  return (
    <Container>
      <Header>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CoinImg
            src={`https://cryptoicon-api.vercel.app/api/icon/${coinData?.symbol.toLowerCase()}`}
            alt={coinData?.symbol}
          />
          <Title>{coinData?.symbol}</Title>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
          }}
        >
          <Link to="/" style={{ fontSize: "24px", color: "white" }}>
            <HiArrowCircleLeft />
          </Link>
        </div>
      </Header>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Overview>
            <OverviewItem>
              <span>Rank:</span>
              <span>{coinData?.rank}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Symbol:</span>
              <span>${coinData?.symbol}</span>
            </OverviewItem>
            <OverviewItem>
              <span>PRICE:</span>
              <span>{coinPrice?.quotes.USD.price.toFixed(4)} USD</span>
            </OverviewItem>
          </Overview>
          <Description>{coinData?.description}</Description>
          <Overview>
            <OverviewItem>
              <span>Total Suply:</span>
              <span>{coinPrice?.total_supply}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Max Supply:</span>
              <span>{coinPrice?.max_supply}</span>
            </OverviewItem>
          </Overview>

          <Tabs>
            <Tab isActive={chartMatch !== null}>
              <Link to={`/${coinId}/chart`} state={{ coinId }}>
                Chart
              </Link>
            </Tab>
            <Tab isActive={priceMatch !== null}>
              <Link to={`/${coinId}/price`}>Information</Link>
            </Tab>
          </Tabs>

          <Routes>
            <Route path="chart" element={<Chart coinId={coinId!} />} />
            <Route path="price" element={<Price />} />
          </Routes>
        </>
      )}
    </Container>
  );
};
export default Coin;
