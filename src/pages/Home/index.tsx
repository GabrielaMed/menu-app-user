import { useNavigate, useParams } from 'react-router-dom';
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
import { GlobalContext } from '../../shared/GlobalContext';

export const Home = () => {
  const { companyIdURL, tableNumberURL } = useParams();
  const [loading, setLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessageType, setToastMessageType] = useState<IToastType>(
    IToastType.unknow
  );
  const [toastMessage, setToastMessage] = useState('');
  const {
    setOrderData,
    productsData,
    setProductsData,
    visitorUuid,
    companyId,
    setCompanyId,
    tableNumber,
    setTableNumber,
  } = useContext(GlobalContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (companyIdURL && tableNumberURL) {
      setCompanyId(companyIdURL ?? '');
      setTableNumber(Number(tableNumberURL) ?? 0);

      navigate('/');
    }
  }, [companyIdURL, tableNumberURL]);

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
            {productsData?.map((product) => (
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
