import { MdAdd, MdArrowBack, MdRemove } from 'react-icons/md';
import {
  AdditionalEnd,
  AdditionalName,
  AdditionalPrice,
  Divider,
  AdditionalsList,
  AdditionalsListItem,
  Container,
  CounterBox,
  FinishedButton,
  Footer,
  FooterCounterBox,
  Navbar,
  ProductDescription,
  ProductInfoBox,
  ProductName,
  ProductPrice,
  ObservationBox,
  ObservationTextArea,
  ProductImage,
} from './style';
import { useNavigate, useParams } from 'react-router-dom';
import { api } from '../../services/api';
import { useContext, useEffect, useState } from 'react';
import { IToastType } from '../../utils/Interface/Toast';
import { IProduct } from '../../utils/Interface/Product';
import { AxiosError } from 'axios';
import { Carousel } from 'react-bootstrap';
import { IOrder } from '../../utils/Interface/Order';
import { OrderStatus } from '../../utils/Enum/OrderStatus';
import { ToastMessage } from '../../components/Toast';
import { GlobalContext } from '../../shared/GlobalContext';

export const Product = () => {
  const [productData, setProductData] = useState<IProduct>({});
  const { orderData, setOrderData, visitorUuid } = useContext(GlobalContext);
  const [orderExists, setOrderExists] = useState<IOrder>();
  const [showToast, setShowToast] = useState(false);
  const [toastMessageType, setToastMessageType] = useState<IToastType>(
    IToastType.unknow
  );
  const [toastMessage, setToastMessage] = useState('');
  const { productId, companyId } = useParams();
  const [productQuantity, setProductQuantity] = useState(1);
  const total = productData.additionals?.reduce(
    (acc, additional) =>
      acc + (additional?.price ? additional.price * additional.quantity : 0),
    0
  );
  const navigate = useNavigate();
  const [observation, setObservation] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(`product/${productId}`);

        if (response.data) {
          const { id, name, description, price, Additional_in_Product, Image } =
            response.data[0];
          const additionals = Additional_in_Product.map((item: any) => ({
            ...item.additional,
            quantity: 0,
          }));

          setProductData({ id, name, description, price, Image, additionals });
        }
      } catch (err) {
        if (err instanceof AxiosError) {
          setShowToast(true);
          setToastMessageType(IToastType.error);
          setToastMessage(`Error: ${err?.response?.data}`);
        }
      }
    };

    if (productId) {
      fetchData();
    }
  }, [productId]);

  const handleCreateOrder = async () => {
    try {
      const response = await api.post('order', {
        visitorUuid,
        statusOrder: OrderStatus.iniciado,
        companyId,
        observation,
      });
      if (response.data) {
        return setOrderData(response.data);
      }
    } catch (err) {
      if (err instanceof AxiosError) {
        setShowToast(true);
        setToastMessageType(IToastType.error);
        setToastMessage(`Error: ${err?.response?.data}`);
      }
    }
  };

  const handleRelateProductAndOrder = async (orderId: string) => {
    try {
      const additionals = productData?.additionals
        ?.filter((additional) => additional.quantity > 0)
        .map((additional) => {
          return {
            additionalId: additional.id,
            quantity: additional.quantity,
          };
        });

      const response = await api.post(`order/${orderId}`, {
        productId,
        observation,
        additionals,
        quantity: productQuantity,
      });

      if (response.data) {
        let order;

        if (response.data.order) {
          order = response.data.order;
        } else if (response.data.orderProduct) {
          order = response.data.orderProduct.order;
        }

        const products = order.Order_products.map((order: any) => ({
          id: order.id,
          product: {
            id: order.product.id,
            name: order.product.name,
            price: order.product.price,
            Image: order.product.Image,
          },
          observation: order.observation,
          quantity: order.quantity,
          additionals: Object.values(order.Order_additional).map(
            (item: any) => ({
              id: item.additional.id,
              name: item.additional.name,
              price: item.additional.price,
              quantity: item.quantity,
            })
          ),
        }));

        const { statusOrder, id } = order;

        const orderData: IOrder = {
          id,
          products,
          statusOrder,
        };

        setOrderData(orderData);
        navigate(`/${companyId}/cart`);
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

  const handleComplete = async () => {
    try {
      const response = await api.get(
        `order/visitor/${visitorUuid}/${companyId}`
      );

      if (response.data) {
        setOrderExists(response.data[0]);
      } else {
        await handleCreateOrder();
      }
    } catch (err) {
      if (err instanceof AxiosError) {
        setShowToast(true);
        setToastMessageType(IToastType.error);
        setToastMessage(`Error: ${err?.response?.data}`);
      }
    }
  };

  useEffect(() => {
    const relates = async () => {
      if (orderExists?.id) {
        await handleRelateProductAndOrder(orderExists?.id);
      }
    };

    relates();
  }, [orderExists]);

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
          <span>Detalhes do produto</span>
        </Navbar>
        <ProductInfoBox>
          <Carousel
            style={{
              background: 'black',
              marginBottom: '1rem',
              borderRadius: '6px',
            }}
          >
            {productData?.Image?.map((item, idx) => {
              return (
                <Carousel.Item key={idx}>
                  <ProductImage
                    className='d-block w-100'
                    src={process.env.REACT_APP_IMAGE_URL + item?.fileName}
                    alt=''
                  />
                </Carousel.Item>
              );
            })}
          </Carousel>
          <ProductName>{productData.name}</ProductName>
          <ProductDescription>{productData.description}</ProductDescription>
          <ProductPrice>
            {Number(productData.price).toLocaleString('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            })}
          </ProductPrice>
        </ProductInfoBox>
        {productData.additionals ? (
          <>
            <Divider>
              Deseja algum adicional?
              <span>
                Escolha até {productData?.additionals?.length} opções.
              </span>
            </Divider>
            <AdditionalsList>
              {productData.additionals?.map((item, idx) => (
                <AdditionalsListItem key={idx}>
                  <AdditionalName>{item.name}</AdditionalName>
                  <AdditionalEnd>
                    <AdditionalPrice>
                      {Number(item.price).toLocaleString('pt-BR', {
                        style: 'currency',
                        currency: 'BRL',
                      })}
                    </AdditionalPrice>
                    <CounterBox>
                      <MdRemove
                        style={{ cursor: 'pointer' }}
                        onClick={() =>
                          setProductData((state) => ({
                            ...state,
                            additionals: state?.additionals?.map((product) =>
                              item.id === product.id && item.quantity > 0
                                ? { ...item, quantity: item?.quantity - 1 }
                                : product
                            ),
                          }))
                        }
                      />
                      {item.quantity}
                      <MdAdd
                        style={{ cursor: 'pointer' }}
                        onClick={() =>
                          setProductData((state) => ({
                            ...state,
                            additionals: state?.additionals?.map((product) =>
                              item.id === product.id
                                ? { ...item, quantity: item?.quantity + 1 }
                                : product
                            ),
                          }))
                        }
                      />
                    </CounterBox>
                  </AdditionalEnd>
                </AdditionalsListItem>
              ))}
            </AdditionalsList>
          </>
        ) : null}

        <Divider>Alguma observação?</Divider>
        <ObservationBox>
          <ObservationTextArea
            placeholder=' Ex: tirar cebola, tirar tomate...'
            onChange={(e) => setObservation(e.target.value)}
          ></ObservationTextArea>
        </ObservationBox>
        <Footer>
          <FooterCounterBox>
            <MdRemove
              style={{ cursor: 'pointer' }}
              onClick={() => {
                setProductQuantity(
                  productQuantity - 1 < 1 ? 1 : productQuantity - 1
                );
              }}
            />
            {productQuantity}
            <MdAdd
              style={{ cursor: 'pointer' }}
              onClick={() => {
                setProductQuantity(productQuantity + 1);
              }}
            />
          </FooterCounterBox>
          <FinishedButton onClick={() => handleComplete()}>
            Concluir
            <span>
              {(
                Number(total || 0) +
                Number(productQuantity * (productData?.price ?? 0))
              ).toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              })}
            </span>
          </FinishedButton>
        </Footer>
      </Container>
    </>
  );
};
