import {
  MdAdd,
  MdArrowBack,
  MdDelete,
  MdDeleteOutline,
  MdRemove,
} from 'react-icons/md';
import {
  Card,
  Container,
  Content,
  GoBack,
  Navbar,
  Order,
  OrderInfo,
  OrderInfoButtons,
  OrderInfoButtonsBox,
  OrderInfoObservation,
  ProductPrice,
} from './style';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';
import { ToastMessage } from '../../components/Toast';
import { IToastType } from '../../utils/Interface/Toast';
import { api } from '../../services/api';
import { AxiosError } from 'axios';
import { IOrder } from '../../utils/Interface/Order';
import { OrderContext } from '../../shared/OrderContext';

export const Cart = () => {
  const navigate = useNavigate();
  const { companyId } = useParams();
  const [showToast, setShowToast] = useState(false);
  const [toastMessageType, setToastMessageType] = useState<IToastType>(
    IToastType.unknow
  );
  const [toastMessage, setToastMessage] = useState('');
  const { orderData, setOrderData } = useContext(OrderContext);
  console.log(orderData);
  return (
    <>
      <ToastMessage
        setShowToast={setShowToast}
        showToast={showToast}
        toastMessage={toastMessage}
        toastMessageType={toastMessageType}
      />
      <Container>
        <Navbar>
          <span>
            <MdArrowBack
              size={24}
              style={{ cursor: 'pointer' }}
              onClick={() => navigate(`/${companyId}}`)}
            />
          </span>
          <span>Carrinho</span>
        </Navbar>
        <Content>
          <Card>
            {orderData ? (
              orderData?.products?.map((order, idx) => (
                <Order key={idx}>
                  {order?.product?.image?.[0] ? (
                    <img
                      src={
                        process.env.REACT_APP_IMAGE_URL! +
                        order.product.image[0]
                      }
                      alt=''
                    />
                  ) : (
                    <span></span>
                  )}
                  <OrderInfo>
                    <span>{order.product.name}</span>
                    {order.observation ? (
                      <OrderInfoObservation>
                        Observação: {order.observation}
                      </OrderInfoObservation>
                    ) : (
                      <span></span>
                    )}
                    <OrderInfoButtonsBox>
                      <OrderInfoButtons>
                        <MdRemove color='#8047F8' />
                        {order.quantity}
                        <MdAdd color='#8047F8' />
                      </OrderInfoButtons>
                      <OrderInfoButtons>
                        <MdDeleteOutline color='#8047F8' />
                        Remover
                      </OrderInfoButtons>
                    </OrderInfoButtonsBox>
                  </OrderInfo>
                  <ProductPrice>{order.product.price}</ProductPrice>
                </Order>
              ))
            ) : (
              <GoBack>
                <span onClick={() => navigate(`/${companyId}}`)}>
                  Voltar para página inicial
                </span>
              </GoBack>
            )}
          </Card>
        </Content>
      </Container>
    </>
  );
};
