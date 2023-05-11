import { MdLocationOn, MdShoppingCart } from 'react-icons/md';
import { CartBox, Container, HoldLocationAndCart, LocationBox } from './style';
import { IOrder } from '../../utils/Interface/Order';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useContext } from 'react';
import { GlobalContext } from '../../shared/GlobalContext';

export const Header = () => {
  const { orderData } = useContext(GlobalContext);
  const navigate = useNavigate();
  const { companyId } = useParams();

  return (
    <Container>
      <span>LOGO</span>

      <HoldLocationAndCart>
        <LocationBox>
          <MdLocationOn />
          Campo Grande, MS
        </LocationBox>
        {orderData?.productsQuantity ?? 0 > 0 ? (
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
        )}
      </HoldLocationAndCart>
    </Container>
  );
};
