import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding-bottom: 5rem;
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

export const Content = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-top: 1rem;
  padding-inline: 2rem;
  gap: 1rem;
`;

export const Card = styled.div`
  width: 100%;
  height: fit-content;
  padding: 1rem;
  background-color: #f3f2f2;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  border-radius: 6px 44px;
`;

export const Order = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 1rem;
`;

export const OrderInfo = styled.div`
  width: 100%;
  height: fit-content;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const OrderInfoButtonsBox = styled.div`
  width: 100%;
  display: flex;
  gap: 1rem;
`;

export const OrderInfoButtons = styled.button`
  all: unset;
  max-width: 6rem;
  height: 2rem;
  padding-inline: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  background-color: #e6e5e5;
  border-radius: 6px;
`;

export const OrderInfoObservation = styled.div`
  width: 100%;
  font-size: 1rem;
`;

export const ProductPrice = styled.p`
  font-weight: bold;
`;

export const GoBack = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  span {
    text-decoration: underline;
    cursor: pointer;
  }
`;
