import { MdLocationOn, MdShoppingCart } from 'react-icons/md';
import { CartBox, Container, HoldLocationAndCart, LocationBox } from './style';
import { IOrder } from '../../utils/Interface/Order';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useContext } from 'react';
import { OrderContext } from '../../shared/OrderContext';

export const Header = () => {
  const { orderData } = useContext(OrderContext);
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
        {orderData?.productsQuantity === 0 ? (
          <CartBox>
            <MdShoppingCart onClick={() => navigate(`/${companyId}/cart`)} />
          </CartBox>
        ) : (
          <CartBox
            onClick={() => {
              navigate(`/${companyId}/cart`);
            }}
          >
            <span>{orderData?.productsQuantity}</span>
            <MdShoppingCart />
          </CartBox>
        )}
      </HoldLocationAndCart>
    </Container>
  );
};
