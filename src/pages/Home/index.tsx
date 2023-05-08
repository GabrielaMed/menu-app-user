import { useNavigate } from 'react-router-dom';
import {
  Card,
  Cards,
  CartBox,
  Container,
  Content,
  DescriptionBox,
  FooterBox,
  ImageBox,
  TextBox,
  Title,
} from './style';
import { Header } from '../../components/Header';
import { AxiosError } from 'axios';
import { useEffect, useState, useContext } from 'react';
import { IProduct } from '../../utils/Interface/Product';
import { IToastType } from '../../utils/Interface/Toast';
import { api } from '../../services/api';
import ReactLoading from 'react-loading';
import { MdShoppingCart } from 'react-icons/md';
import { v4 as uuidv4 } from 'uuid';
import { IOrder } from '../../utils/Interface/Order';
import { OrderStatus } from '../../utils/Enum/OrderStatus';
import { OrderContext } from '../../shared/OrderContext';

export const Home = () => {
  const companyId = `${process.env.REACT_APP_COMPANY_ID}`;
  const [loading, setLoading] = useState(false);
  const [productsData, setProductsData] = useState<IProduct[]>([]);
  const [productsWImageData, setProductsWImageData] = useState<IProduct[]>([]);
  const [showToast, setShowToast] = useState(false);
  const [toastMessageType, setToastMessageType] = useState<IToastType>(
    IToastType.unknow
  );
  const [toastMessage, setToastMessage] = useState('');
  const { setOrderData } = useContext(OrderContext);

  const navigate = useNavigate();
  let visitorUuid = localStorage.getItem('visitorUuid');

  if (!visitorUuid) {
    visitorUuid = uuidv4();
    localStorage.setItem('visitorUuid', visitorUuid);
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(`${companyId}/product`);
        if (response.data) {
          setProductsData(response.data);
        }
      } catch (err) {
        if (err instanceof AxiosError) {
          setShowToast(true);
          setToastMessageType(IToastType.error);
          setToastMessage(`Error: ${err?.response?.data}`);
        }
      }
    };

    if (companyId) {
      fetchData();
    }
  }, [companyId]);

  useEffect(() => {
    const updateData = async () => {
      const productsWithImages = [];

      for (let i = 0; i < productsData.length; i++) {
        const product = productsData[i];
        const productId = product.id;

        try {
          const responseImages = await api.get(`product/${productId}/image`);
          if (responseImages.data) {
            product.Image = responseImages.data;
          }
        } catch (err) {
          console.log(err);
          if (err instanceof AxiosError) {
            setShowToast(true);
            setToastMessageType(IToastType.error);
            setToastMessage(`Error: ${err?.response?.data}`);
          }
        }

        productsWithImages.push(product);
      }

      setProductsWImageData(productsWithImages);
    };

    updateData();
  }, [productsData]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(
          `order/visitor/${visitorUuid}/${companyId}`
        );

        if (response.data) {
          const orderIniciado = response.data.filter(
            (item: IOrder) => item.statusOrder === OrderStatus.iniciado
          )[0];

          setOrderData({
            id: orderIniciado.id,
            products: [...orderIniciado.Order_products],
            statusOrder: orderIniciado.statusOrder,
            productsQuantity: orderIniciado._count.Order_products,
          });
        }
      } catch (err) {
        if (err instanceof AxiosError) {
          setShowToast(true);
          setToastMessageType(IToastType.error);
          setToastMessage(`Error: ${err?.response?.data}`);
        }
      }
    };

    if (visitorUuid) {
      fetchData();
    }
  }, [visitorUuid]);

  return (
    <Container>
      <Header />
      {loading && (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <ReactLoading
            type={'cylon'}
            color={'#1b4332'}
            height={'150px'}
            width={'150px'}
          />
        </div>
      )}
      {!loading && (
        <Content>
          <Title>Produtos</Title>
          <Cards>
            {productsWImageData.length > 0 &&
              productsWImageData?.map((product) => (
                <Card key={product.id}>
                  {product?.Image ? (
                    <ImageBox>
                      <img
                        className='d-block w-100'
                        style={{ objectFit: 'contain', height: '15rem' }}
                        src={
                          process.env.REACT_APP_IMAGE_URL +
                          product?.Image[0]?.fileName
                        }
                        alt=''
                      />
                    </ImageBox>
                  ) : (
                    <ImageBox></ImageBox>
                  )}

                  <TextBox>
                    <span>
                      <strong>{product.name}</strong>
                    </span>
                    <DescriptionBox>{product.description}</DescriptionBox>
                  </TextBox>
                  <FooterBox>
                    <span>
                      <strong>
                        {Number(product.price).toLocaleString('pt-BR', {
                          style: 'currency',
                          currency: 'BRL',
                        })}
                      </strong>
                    </span>
                    <CartBox
                      onClick={() =>
                        navigate(`/${companyId}/product/${product.id}`)
                      }
                    >
                      <MdShoppingCart color='white' />
                    </CartBox>
                  </FooterBox>
                </Card>
              ))}
          </Cards>
        </Content>
      )}
    </Container>
  );
};
