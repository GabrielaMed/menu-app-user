import styled from 'styled-components';

export const Container = styled.header`
  width: 100%;
  height: 6rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  box-sizing: border-box;
  border-bottom: 1px solid #e6e5e5;
`;

export const LogoImage = styled.div`
  max-width: 3rem;
  img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
  }
`;

export const CartBox = styled.button`
  all: unset;
  background: #ebe5f9;
  width: 2rem;
  height: 2rem;
  padding-inline: 0.5rem;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  position: relative;

  span {
    position: absolute;
    left: -4px;
    top: -4px;
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
    background: #4b2995;
    font-size: 14px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
  }
`;

export const LocationBox = styled.button`
  all: unset;
  padding-inline: 0.5rem;
  gap: 0.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 2rem;
  background: #ebe5f9;
  border-radius: 6px;
`;

export const HoldLocationAndCart = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1rem;
`;
