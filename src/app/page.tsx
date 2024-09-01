"use client";
import {
  Title,
  MainWrapper,
  GraphWrapper,
  CoinHeaderWrapper,
  CoinStatsWrapper,
} from "./styles";

export default function Home() {
  return (
    <main>
      <div>
        <MainWrapper>
          <CoinHeaderWrapper>
            This will be where the coin header goes
          </CoinHeaderWrapper>
          <GraphWrapper>
            <Title>This will be where the graphs go</Title>
          </GraphWrapper>
          <CoinStatsWrapper>
            This is where the full list of coins will go
          </CoinStatsWrapper>
        </MainWrapper>
      </div>
    </main>
  );
}
