import { MdShoppingCart } from 'react-icons/md';
import { CartBox, Container, HoldLocationAndCart } from './style';
import { useNavigate, useParams } from 'react-router-dom';
import { useContext } from 'react';
import { GlobalContext } from '../../shared/GlobalContext';

export const Header = () => {
  const { orderData } = useContext(GlobalContext);
  const navigate = useNavigate();
  const { companyId } = useParams();

  return (
    <Container>
      <span>LOGO</span>

      <HoldLocationAndCart>
        {
          // eslint-disable-next-line
          orderData?.productsQuantity ?? 0 > 0 ? (
            <CartBox
              onClick={() => {
                navigate(`/${companyId}/cart`);
              }}
            >
              <span>{orderData?.productsQuantity}</span>
              <MdShoppingCart />
            </CartBox>
          ) : (
            <CartBox onClick={() => navigate(`/${companyId}/cart`)}>
              <MdShoppingCart />
            </CartBox>
          )
        }
      </HoldLocationAndCart>
    </Container>
  );
};
