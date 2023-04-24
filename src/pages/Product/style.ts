import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 100%;
  box-sizing: border-box;
`;

export const Navbar = styled.div`
  width: 100%;
  height: 4rem;
  border-bottom: 1px solid #dddddd;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;

  span {
    width: 100%;
    display: flex;
    justify-content: center;
    font-size: 24px;
    color: #5c5b5b;
  }

  span:first-child {
    position: absolute;
    display: flex;
    justify-content: start;
    padding: 1rem;
  }
`;

export const ProductInfoBox = styled.div`
  width: 100%;
  padding: 1rem;
`;

export const ProductName = styled.h4``;

export const ProductDescription = styled.p`
  font-size: 16px;
  color: gray;
`;

export const ProductPrice = styled.h6``;

export const AdditionalsDivider = styled.div`
  width: 100%;
  height: 5rem;
  display: flex;
  flex-direction: column;
  justify-content: left;
  padding: 1rem;
  font-size: 18px;
  color: #7a7979;
  background-color: #f3f2f2;

  span {
    font-size: 14px;
    color: #999898;
  }
`;

export const AdditionalsList = styled.div`
  height: 100%;
  width: 100%;
`;

export const AdditionalsListItem = styled.div`
  font-size: 16px;
  padding: 1rem;
  border-bottom: 1px solid #f3f2f2;
  display: flex;
  justify-content: space-between;
`;

export const AdditionalName = styled.div`
  width: 100%;
`;

export const AdditionalEnd = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  gap: 1rem;
`;

export const AdditionalPrice = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;

export const CounterBox = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const Footer = styled.footer`
  background-color: #ebe5f9;
  height: 5rem;
  display: flex;
  justify-content: space-between;
  position: fixed;
  bottom: 0;
  width: 100%;
  padding: 1rem;
`;

export const FinishedButton = styled.button`
  all: unset;
  background-color: #4b2995;
  width: 10rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 6px;
  font-size: 18px;
  color: white;
`;
