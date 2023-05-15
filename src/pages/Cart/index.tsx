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
import { GlobalContext } from '../../shared/GlobalContext';
import { OrderStatus } from '../../utils/Enum/OrderStatus';
import { IOrderProduct } from '../../utils/Interface/OrderProduct';

export const Cart = () => {
  const navigate = useNavigate();
  const { companyId } = useParams();
  const [showToast, setShowToast] = useState(false);
  const [toastMessageType, setToastMessageType] = useState<IToastType>(
    IToastType.unknow
  );
  const [toastMessage, setToastMessage] = useState('');
  const { orderData, setOrderData, visitorUuid, clearVisitorUuid } =
    useContext(GlobalContext);
  const total = orderData?.products?.reduce((acc, orderProducts) => {
    const productTotal =
      (orderProducts?.product?.price ?? 0) * (orderProducts?.quantity ?? 0);

    const additionalTotal = orderProducts?.additionals
      ? Object.values(orderProducts.additionals).reduce(
          (acc, additional) =>
            acc +
            (additional?.price ? additional.price * additional.quantity : 0),
          0
        )
      : 0;

    return acc + productTotal + (additionalTotal ?? 0);
  }, 0);

  const handleRemoveOneProductQuantity = (productId: string | undefined) => {
    if (!productId) return;
    const updatedProducts = orderData?.products?.map((product) => {
      if (product.product.id === productId && product.quantity > 0) {
        return {
          ...product,
          quantity: product.quantity - 1,
        };
      } else {
        return product;
      }
    });

    setOrderData({
      ...orderData,
      products: updatedProducts,
    });
  };

  const handleAddOneProductQuantity = (productId: string | undefined) => {
    if (!productId) return;
    const updatedProducts = orderData?.products?.map((product) => {
      if (product.product.id === productId) {
        return {
          ...product,
          quantity: product.quantity + 1,
        };
      } else {
        return product;
      }
    });

    setOrderData({
      ...orderData,
      products: updatedProducts,
    });
  };

  const handleRemoveAllProductQuantity = (productId: string | undefined) => {
    if (!productId) return;
    setOrderData((prevOrderData: IOrder) => ({
      ...prevOrderData,
      products: prevOrderData?.products?.map((item) => {
        if (item.product.id === productId) {
          return {
            ...item,
            quantity: 0,
          };
        }
        return item;
      }),
      productsQuantity:
        prevOrderData?.productsQuantity !== undefined &&
        prevOrderData?.productsQuantity > 0
          ? prevOrderData?.productsQuantity - 1
          : 0,
    }));

    handleDeleteProduct(productId);
  };

  const handleDeleteProduct = async (orderProductId: string | undefined) => {
    if (!orderProductId || !orderData) return;

    try {
      const response = await api.delete(`order/${orderData?.id}`, {
        data: {
          orderProductId,
          visitorUuid,
          companyId,
        },
      });

      if (response.status === 200) {
        const orderIniciado = response.data.filter(
          (item: IOrder) => item.statusOrder === OrderStatus.iniciado
        )[0];

        setOrderData({
          id: orderIniciado.id,
          products: [...orderIniciado.Order_products],
          statusOrder: orderIniciado.statusOrder,
          productsQuantity: orderIniciado._count.Order_products,
        });

        setShowToast(true);
        setToastMessageType(IToastType.warning);
        setToastMessage(`Produto excluido!`);
      }
    } catch (err) {
      console.log('ERRO', err);
      if (err instanceof AxiosError) {
        setShowToast(true);
        setToastMessageType(IToastType.error);
        setToastMessage(`Error: ${err?.response?.data}`);
      }
    }
  };

  const handleConfirmOrder = async () => {
    const { products } = orderData || {};

    const updatedProducts = products
      ?.filter((item: any) => item.quantity > 0)
      .map((item: IOrderProduct) => ({
        orderProductId: item.id,
        quantity: item.quantity,
      }));

    const allProductsZeroQuantity = products?.every(
      (item: any) => item.quantity === 0
    );

    const newStatusOrder = allProductsZeroQuantity
      ? OrderStatus.canceladoCliente
      : OrderStatus.enviado;

    try {
      const response = await api.put(`order/${orderData?.id}`, {
        newStatusOrder,
        products: updatedProducts,
      });

      if (response.status === 200 && newStatusOrder === OrderStatus.enviado) {
        setShowToast(true);
        setToastMessageType(IToastType.success);
        setToastMessage(`Pedido enviado com sucesso!`);

        //clearVisitorUuid();

        setTimeout(() => {
          navigate(`/${companyId}`);
        }, 4000);
      } else if (
        response.status === 200 &&
        newStatusOrder === OrderStatus.canceladoCliente
      ) {
        setShowToast(true);
        setToastMessageType(IToastType.warning);
        setToastMessage(`Pedido cancelado!`);

        //clearVisitorUuid();

        setTimeout(() => {
          navigate(`/${companyId}`);
        }, 4000);
      }
    } catch (err) {
      console.log('ERRO', err);
      if (err instanceof AxiosError) {
        setShowToast(true);
        setToastMessageType(IToastType.error);
        setToastMessage(`Error: ${err?.response?.data}`);
      }
    }
  };

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
          {orderData
            ? orderData?.products
                ?.filter((order) => order.quantity > 0)
                .map((order, idx) => (
                  <Card key={idx}>
                    <Order>
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
                        {(order?.additionals?.length ?? 0) > 0 ? (
                          <OrderInfoAdditionals>
                            <strong>Adicionais: </strong>
                            {Array.isArray(order.additionals)
                              ? order.additionals.map((additional, idx) => (
                                  <span key={idx}>
                                    <span>
                                      {additional.quantity} - {additional.name}
                                    </span>
                                    <span>
                                      {Number(
                                        additional.quantity *
                                          (additional.price ?? 0)
                                      ).toLocaleString('pt-BR', {
                                        style: 'currency',
                                        currency: 'BRL',
                                      })}
                                    </span>
                                  </span>
                                ))
                              : null}
                          </OrderInfoAdditionals>
                        ) : null}

                        {order.observation ? (
                          <OrderInfoObservation>
                            Observação: {order.observation}
                          </OrderInfoObservation>
                        ) : null}
                        <OrderInfoButtonsBox>
                          <OrderInfoButtons>
                            <MdRemove
                              color='#8047F8'
                              onClick={() =>
                                handleRemoveOneProductQuantity(
                                  order?.product?.id
                                )
                              }
                            />
                            {order.quantity}
                            <MdAdd
                              color='#8047F8'
                              onClick={() =>
                                handleAddOneProductQuantity(order?.product?.id)
                              }
                            />
                          </OrderInfoButtons>
                          <OrderInfoButtons
                            onClick={() =>
                              handleRemoveAllProductQuantity(order?.id)
                            }
                          >
                            <MdDeleteOutline color='#8047F8' />
                            Remover
                          </OrderInfoButtons>
                        </OrderInfoButtonsBox>
                      </OrderInfo>
                    </Order>
                  </Card>
                ))
            : // <GoBack>
              //   <span onClick={() => navigate(`/${companyId}}`)}>
              //     Voltar para página inicial
              //   </span>
              // </GoBack>
              null}

          <Footer>
            <OrderTotalPrice>
              <strong>Total:</strong>
              <strong>
                <span>
                  {Number(total).toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  })}
                </span>
              </strong>
            </OrderTotalPrice>
            <ConfirmButton onClick={() => handleConfirmOrder()}>
              Confirmar pedido
            </ConfirmButton>
          </Footer>
        </Content>
      </Container>
    </>
  );
};
