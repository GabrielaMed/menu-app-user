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
  padding: 1rem;
  box-sizing: border-box;
  border-bottom: 1px solid #e6e5e5;
  gap: 1rem;

  &:last-child {
    border-bottom: none;
  }

  @media (max-width: 390px) {
    flex-wrap: wrap;
  }
`;

export const ImageBox = styled.div`
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 5rem;
  max-height: 3.5rem;
  border-radius: 5px;
  overflow: hidden;

  img {
    max-width: 100%;
    max-height: 100%;
    object-fit: cover;
  }
`;

export const OrderInfo = styled.div`
  width: 12rem;
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

  justify-content: space-between;
  align-items: center;
  background-color: #e6e5e5;
  border-radius: 6px;
`;

export const OrderInfoAdditionals = styled.div`
  width: 100%;
  font-size: 0.8rem;
`;

export const OrderInfoObservation = styled.div`
  width: 100%;
  font-size: 0.9rem;
  text-align: justify;
`;

export const ProductInfo = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
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

export const Footer = styled.footer`
  background-color: #f3f2f2;
  height: 7rem;
  gap: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: fixed;
  bottom: 0;
  width: 100%;
  padding: 1rem;
`;

export const OrderTotalPrice = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  font-size: 1rem;
`;

export const ConfirmButton = styled.button`
  all: unset;
  background-color: #4b2995;
  min-width: 10rem;
  gap: 1rem;
  padding: 0.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 6px;
  font-size: 18px;
  color: white;
`;
