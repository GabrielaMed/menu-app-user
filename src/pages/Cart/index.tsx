import {
  MdAdd,
  MdArrowBack,
  MdDelete,
  MdDeleteOutline,
  MdRemove,
} from 'react-icons/md';
import {
  Card,
  ConfirmButton,
  Container,
  Content,
  Footer,
  GoBack,
  ImageBox,
  Navbar,
  Order,
  OrderInfo,
  OrderInfoAdditionals,
  OrderInfoButtons,
  OrderInfoButtonsBox,
  OrderInfoObservation,
  OrderTotalPrice,
  ProductInfo,
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
  // const total = orderData.additional?.reduce(
  //   (acc, product) =>
  //     acc + (product?.price ? product.price * product.quantity : 0),
  //   0
  // );

  console.log('>>>>>>', orderData);

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
                  {order?.product?.Image ? (
                    <ImageBox>
                      <img
                        src={
                          process.env.REACT_APP_IMAGE_URL! +
                          order.product.Image[0].fileName
                        }
                        alt=''
                      />
                    </ImageBox>
                  ) : null}
                  <OrderInfo>
                    <ProductInfo>
                      {order.product.name}
                      <strong>
                        {Number(
                          order.quantity * (order?.product?.price ?? 0)
                        ).toLocaleString('pt-BR', {
                          style: 'currency',
                          currency: 'BRL',
                        })}
                      </strong>
                    </ProductInfo>
                    {order.additionals ? (
                      <OrderInfoAdditionals></OrderInfoAdditionals>
                    ) : null}
                    {order.observation ? (
                      <OrderInfoObservation>
                        Observação: {order.observation}
                      </OrderInfoObservation>
                    ) : null}
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

          <Footer>
            <OrderTotalPrice>
              Total:
              <span>{}</span>
            </OrderTotalPrice>
            <ConfirmButton>Confirmar pedido</ConfirmButton>
          </Footer>
        </Content>
      </Container>
    </>
  );
};
