import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { getCoinInfo } from "../Api";
import styled from "styled-components";
import { Link } from "react-router-dom";
import {
  AiFillFacebook,
  AiFillRedditSquare,
  AiFillYoutube,
  AiFillCode,
  AiFillHome,
} from "react-icons/ai";

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

const Overview = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 10px 20px;
  border-radius: 10px;
  margin-bottom: 10px;
`;

const Links = styled.a`
  color: "white",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  textDecoration: "none",
`;
const Price = () => {
  const { coinId } = useParams();
  const { isLoading, data: coinData } = useQuery<ICoinInfo>("getCoinInfo", () =>
    getCoinInfo(coinId!)
  );

  return (
    <>
      <Overview style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ marginBottom: "5px" }}>FOUNDERS</div>
        <div>
          {coinData?.team.map((item, index) => (
            <li key={index} style={{ fontSize: "11px", padding: "2px" }}>
              {item.name} - {item.position}
            </li>
          ))}
        </div>
      </Overview>
      <Overview style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ marginBottom: "5px" }}>WHITE PATER</div>
        <a href={coinData?.whitepaper.link!}>
          <img
            src={coinData?.whitepaper.thumbnail}
            width={"50%"}
            alt="whitepaper"
          />
        </a>
      </Overview>
      <Overview style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ marginBottom: "5px" }}>LINKS EXTENDED</div>
        <div>
          {coinData?.links_extended.map((item, index) => (
            <a href={item.url} key={index}>
              <div
                style={{
                  color: "white",
                  fontSize: "12px",
                  padding: "2px",
                }}
              >
                {item.url}
              </div>
            </a>
          ))}
        </div>
      </Overview>
      <Overview
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>
          {coinData?.links.facebook ? (
            <Links
              href={coinData?.links.facebook}
              style={{
                color: "white",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div>
                <AiFillFacebook style={{ fontSize: "24px" }} />
              </div>
              <div style={{ fontSize: "10px" }}>facebook</div>
            </Links>
          ) : null}
        </div>
        <div>
          {coinData?.links.youtube && (
            <Links
              href={coinData?.links.youtube}
              style={{
                color: "white",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <AiFillYoutube style={{ fontSize: "24px" }} />
              <div style={{ fontSize: "10px" }}>youtube</div>
            </Links>
          )}
        </div>
        <div>
          {coinData?.links.reddit && (
            <Links
              href={coinData?.links.reddit}
              style={{
                color: "white",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <AiFillRedditSquare style={{ fontSize: "24px" }} />
              <div style={{ fontSize: "10px" }}>reddit</div>
            </Links>
          )}
        </div>

        <div>
          {coinData?.links.source_code && (
            <Links
              href={coinData?.links.source_code}
              style={{
                color: "white",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <AiFillCode style={{ fontSize: "24px" }} />
              <div style={{ fontSize: "10px" }}>source_code</div>
            </Links>
          )}
        </div>
        <div>
          {coinData?.links.website && (
            <Links
              href={coinData?.links.website}
              style={{
                color: "white",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <AiFillHome style={{ fontSize: "24px" }} />
              <div style={{ fontSize: "10px" }}>website</div>
            </Links>
          )}
        </div>
      </Overview>
    </>
  );
};
export default Price;
