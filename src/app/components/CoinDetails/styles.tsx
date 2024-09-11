"use client";
import styled from "styled-components";

export const MainWrapper = styled.div`
  margin-left: 15px;
  margin-right: 15px;
  display: flex;
  justify-content: space-between;
  border: 1px solid black;
  height: 50px;
`;

export const LeftSection = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 300px;
`;

export const CenterSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 500px;
`;

export const RightSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
