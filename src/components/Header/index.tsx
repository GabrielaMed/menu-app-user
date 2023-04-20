import { MdLocationOn, MdShoppingCart } from 'react-icons/md';
import { CartBox, Container, HoldLocationAndCart, LocationBox } from './style';

export const Header = () => {
  return (
    <Container>
      <span>LOGO</span>

      <HoldLocationAndCart>
        <LocationBox>
          <MdLocationOn />
          Campo Grande, MS
        </LocationBox>
        <CartBox>
          <MdShoppingCart />
        </CartBox>
      </HoldLocationAndCart>
    </Container>
  );
};
