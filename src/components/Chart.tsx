import { useQuery } from "react-query";
import { getCoinOHLC } from "../Api";
// import { useLocation } from "react-router-dom";
import ApexChart from "react-apexcharts";
import { useRecoilValue } from "recoil";
import { isDarkAtom } from "../Atoms";

interface IcoinId {
  coinId: string;
}

interface ICoinOHLCType {
  time_open: string;
  time_close: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  market_cap: number;
}
const Chart = ({ coinId }: IcoinId) => {
  // const { state } = useLocation();
  // const { coinId } = state as IcoinId;
  // console.log(coinId);
  const { isLoading, data } = useQuery<ICoinOHLCType[]>("getCoinOHLC", () =>
    getCoinOHLC(coinId)
  );
  const isDark = useRecoilValue(isDarkAtom);

  return (
    <div>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <ApexChart
          type="candlestick"
          series={[
            {
              data: data?.map((item) => ({
                x: new Date(item.time_close),
                y: [item.open, item.high, item.low, item.close],
              })),
            },
          ]}
          options={{
            theme: {
              mode: isDarkAtom ? "light" : "dark",
            },
            chart: {
              height: "500px",
              type: "candlestick",
              toolbar: { show: true },
            },
            title: {
              text: "CandleStick Chart",
              align: "left",
              style: {
                fontSize: "14px",
                fontFamily: "Helvetica, Arial, sans-serif",
                fontWeight: "light",
                color: "#dbdbdb",
              },
            },
            xaxis: {
              type: "datetime",
              labels: {
                style: {
                  colors: "#dbdbdb",
                  fontSize: "12px",
                  fontFamily: "Helvetica, Arial, sans-serif",
                  fontWeight: 400,
                  cssClass: "apexcharts-xaxis-label",
                },
              },
            },
            yaxis: {
              show: true,
              tooltip: {
                enabled: true,
              },
              labels: {
                show: true,
                style: {
                  colors: "#dbdbdb",
                },
                formatter: (value) => {
                  return value.toFixed(1);
                },
              },
            },
          }}
        />
      )}
    </div>
  );
};
export default Chart;
