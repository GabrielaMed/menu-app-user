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
import { useEffect, useState } from 'react';
import { IToastType } from '../../utils/Interface/Toast';
import { IProduct } from '../../utils/Interface/Product';
import { AxiosError } from 'axios';
import { Carousel } from 'react-bootstrap';
import { IAdditional } from '../../utils/Interface/Additional';
import { IOrder } from '../../utils/Interface/Order';
import { OrderStatus } from '../../utils/Enum/OrderStatus';
import { ToastMessage } from '../../components/Toast';

export const Product = () => {
  const [productData, setProductData] = useState<IProduct>({});
  const [orderData, setOrderData] = useState<IOrder>();
  const [orderExists, setOrderExists] = useState<IOrder>();
  const [showToast, setShowToast] = useState(false);
  const [toastMessageType, setToastMessageType] = useState<IToastType>(
    IToastType.unknow
  );
  const [toastMessage, setToastMessage] = useState('');
  const { productId, companyId } = useParams();
  const [productQuantity, setProductQuantity] = useState(1);
  const total = productData.additional?.reduce(
    (acc, product) =>
      acc + (product?.price ? product.price * product.quantity : 0),
    0
  );
  const navigate = useNavigate();
  const [observation, setObservation] = useState('');
  let visitorUuid = localStorage.getItem('visitorUuid');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(`product/${productId}`);

        if (response.data) {
          const { name, description, price } = response.data[0];

          setProductData({ name, description, price });
        }
      } catch (err) {
        if (err instanceof AxiosError) {
          setShowToast(true);
          setToastMessageType(IToastType.error);
          setToastMessage(`Error: ${err?.response?.data}`);
        }
      }

      try {
        const responseAdditional = await api.get(
          `product/${productId}/additionals`
        );

        if (responseAdditional.data.additionals) {
          setProductData((prevState: IProduct) => ({
            ...prevState,
            additional: responseAdditional.data.additionals.map(
              (additional: IAdditional) => ({ ...additional, quantity: 0 })
            ),
          }));
        }
      } catch (err) {
        if (err instanceof AxiosError) {
          setShowToast(true);
          setToastMessageType(IToastType.error);
          setToastMessage(`Error: ${err?.response?.data}`);
        }
      }

      try {
        const responseImages = await api.get(`product/${productId}/image`);

        if (responseImages.data) {
          setProductData((state: any) => ({
            ...state,
            image: responseImages.data,
          }));
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
      const response = await api.post(`order/${orderId}`, {
        productId,
        observation,
        quantity: productQuantity,
      });
      if (response.data) {
        const { order } = response.data;

        const products = order.Order_products.map((product: IProduct) => ({
          id: product.id,
          name: product.name,
          price: product.price,
          image: product?.image?.[0]?.fileName,
          observation: product.observation,
          quantity: product.quantity,
        }));

        const additionals = order.Order_additional.map(
          (additional: IAdditional) => ({
            id: additional.id,
            name: additional.name,
            price: additional.price,
          })
        );

        const { statusOrder, id } = order;

        const orderData: IOrder = {
          id,
          products,
          additionals,
          statusOrder,
        };

        setOrderData(orderData);
      }
    } catch (err) {
      if (err instanceof AxiosError) {
        setShowToast(true);
        setToastMessageType(IToastType.error);
        setToastMessage(`Error: ${err?.response?.data}`);
      }
    }

    const options = {
      pathname: `/${companyId}/cart`,
      state: { orderId: orderData?.id },
    };

    navigate(options, { replace: true });
  };

  const handleComplete = async () => {
    try {
      const response = await api.get(
        `order/visitor/${visitorUuid}/${companyId}`
      );

      if (response.data) {
        const orderIniciado = response.data.filter(
          (item: IOrder) => item.statusOrder === OrderStatus.iniciado
        )[0];
        setOrderExists(orderIniciado);
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
            {productData?.image?.map((item, idx) => {
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
        {productData.additional ? (
          <>
            <Divider>
              Deseja algum adicional?
              <span>Escolha até {productData?.additional?.length} opções.</span>
            </Divider>
            <AdditionalsList>
              {productData.additional?.map((item, idx) => (
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
                            additional: state?.additional?.map((product) =>
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
                            additional: state?.additional?.map((product) =>
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
        ) : (
          <span></span>
        )}

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
