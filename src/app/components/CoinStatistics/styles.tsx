"use client";
import styled from "styled-components";

export const MainWrapper = styled.div`
  margin-left: 15px;
  margin-right: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const MainGraphWrapper = styled.div`
  margin-top: 15px;
  display: flex;
  justify-content: space-around;
  width: 100%;
`;

export const GraphWrapper = styled.div`
  color: red;
  height: 500px;
  width: 1000px;
`;

export const CoinCarousel = styled.div`
  display: flex;
  overflow: scroll;
  width: 1200px;
`;

export const CoinWrapper = styled.div`
  background-color: black;
  color: white;
  height: 100px;
  width: 225px;
  border-radius: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 5px;
  padding-right: 5px;
  margin-right: 5px;
`;

export const LeftSection = styled.div`
  width: 55px;
  display: flex;
  justify-content: center;
`;

export const MiddleSection = styled.div`
  text-align: center;
  width: 115px;
`;

export const RightSection = styled.div`
  text-align: center;
  width: 55px;
`;
