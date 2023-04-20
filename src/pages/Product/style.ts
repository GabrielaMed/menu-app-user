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
  }

  span:first-child {
    position: absolute;
    display: flex;
    justify-content: start;
    padding: 1rem;
  }
`;
