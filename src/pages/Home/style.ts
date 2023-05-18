import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 100%;
  box-sizing: border-box;
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

export const Cards = styled.div`
  gap: 1rem;
  display: flex;
  box-sizing: border-box;
  justify-content: space-between;
  flex-wrap: wrap;
`;

export const Title = styled.h1`
  color: black;
`;

export const Card = styled.div`
  width: 10rem;
  height: 13rem;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-sizing: border-box;
  background-color: #f3f2f2;
  border-radius: 6px 36px;
  cursor: pointer;
`;

export const ImageBox = styled.div`
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-height: 3.5rem;
  border-radius: 5px;
  overflow: hidden;

  img {
    max-width: 100%;
    max-height: 100%;
    object-fit: cover;
  }
`;

export const TextBox = styled.div`
  width: 100%;
  max-height: 5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const DescriptionBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  overflow: hidden;
`;

export const FooterBox = styled.div`
  width: 100%;
  height: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
`;

export const CartBox = styled.button`
  all: unset;
  background: #4b2995;
  width: 2rem;
  height: 2rem;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;
