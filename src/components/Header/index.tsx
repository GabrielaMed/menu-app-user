import { MdShoppingCart } from 'react-icons/md';
import { CartBox, Container, HoldLocationAndCart, LogoImage } from './style';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { GlobalContext } from '../../shared/GlobalContext';
import icon192 from '../../../public/icon-192.png';
export const Header = () => {
  const { orderData } = useContext(GlobalContext);
  const navigate = useNavigate();

  return (
    <Container>
      <LogoImage>
        <img src={icon192} alt='Logo' />
      </LogoImage>

      <HoldLocationAndCart>
        {
          // eslint-disable-next-line
          orderData?.productsQuantity ?? 0 > 0 ? (
            <CartBox
              onClick={() => {
                navigate(`/cart`);
              }}
            >
              <span>{orderData?.productsQuantity}</span>
              <MdShoppingCart />
            </CartBox>
          ) : (
            <CartBox onClick={() => navigate(`/cart`)}>
              <MdShoppingCart />
            </CartBox>
          )
        }
      </HoldLocationAndCart>
    </Container>
  );
};
