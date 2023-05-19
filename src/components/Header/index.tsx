import { MdShoppingCart } from 'react-icons/md';
import { CartBox, Container, HoldLocationAndCart, LogoImage } from './style';
import { useNavigate, useParams } from 'react-router-dom';
import { useContext } from 'react';
import { GlobalContext } from '../../shared/GlobalContext';

export const Header = () => {
  const { orderData } = useContext(GlobalContext);
  const navigate = useNavigate();
  const { companyId } = useParams();

  return (
    <Container>
      <LogoImage>
        <img src={process.env.PUBLIC_URL + '/logo192.png'} alt='Logo' />
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
