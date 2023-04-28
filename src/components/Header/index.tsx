import { MdLocationOn, MdShoppingCart } from 'react-icons/md';
import { CartBox, Container, HoldLocationAndCart, LocationBox } from './style';
import { IOrder } from '../../utils/Interface/Order';
import { useNavigate, useParams } from 'react-router-dom';

interface Props {
  orderData?: IOrder;
}

export const Header = ({ orderData }: Props) => {
  const navigate = useNavigate();
  const { companyId } = useParams();

  const options = {
    pathname: `/${companyId}/cart`,
    state: { orderId: orderData?.id },
  };

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
            <MdShoppingCart
              onClick={() => navigate(options, { replace: true })}
            />
          </CartBox>
        ) : (
          <CartBox onClick={() => navigate(options, { replace: true })}>
            <MdShoppingCart />
            <span
              style={{
                width: '1rem',
                height: '1rem',
                borderRadius: '50%',
                background: 'red',
                fontSize: '14px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                color: 'white',
              }}
            >
              {orderData?.productsQuantity}
            </span>
          </CartBox>
        )}
      </HoldLocationAndCart>
    </Container>
  );
};
