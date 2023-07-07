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
import { IToastType } from '../../utils/Interface/Toast';
import { api } from '../../services/api';
import ReactLoading from 'react-loading';
import { MdShoppingCart } from 'react-icons/md';
import { GlobalContext } from '../../shared/GlobalContext';

export const Home = () => {
  const { companyIdURL, tableNumberURL } = useParams();
  // eslint-disable-next-line
  const [showToast, setShowToast] = useState(false);
  // eslint-disable-next-line
  const [toastMessageType, setToastMessageType] = useState<IToastType>(
    IToastType.unknow
  );
  // eslint-disable-next-line
  const [toastMessage, setToastMessage] = useState('');
  const {
    setOrderData,
    productsData,
    setProductsData,
    visitorUuid,
    companyId,
    setCompanyId,
    setTableNumber,
    setProductId,
    tableNumber,
  } = useContext(GlobalContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    if (companyIdURL && tableNumberURL) {
      setCompanyId(companyIdURL ?? '');
      setTableNumber(Number(tableNumberURL) ?? 0);

      navigate('/');
    }
    // eslint-disable-next-line
  }, [companyIdURL, tableNumberURL]);

  useEffect(() => {
    if (companyId) {
      setLoading(false);
    }
  }, [companyId]);

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
      setLoading(false);
    }
    // eslint-disable-next-line
  }, [companyId]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(
          `order/visitor/${visitorUuid}/${companyId}`
        );

        if (response.data[0]) {
          setOrderData({
            id: response.data[0].id,
            products: [...response.data[0].Order_products],
            statusOrder: response.data[0].statusOrder,
            productsQuantity: response.data[0]._count.Order_products,
          });
        } else {
          try {
            const response = await api.post(`orders_cart/${visitorUuid}`, {
              tableNumber,
              companyId,
            });

            if (response.data) {
              return setOrderData(response.data.relates);
            }
          } catch (err) {
            if (err instanceof AxiosError) {
              setShowToast(true);
              setToastMessageType(IToastType.error);
              setToastMessage(`Error: ${err?.response?.data}`);
            }
          }
        }
      } catch (err) {
        if (err instanceof AxiosError) {
          setShowToast(true);
          setToastMessageType(IToastType.error);
          setToastMessage(`Error: ${err?.response?.data}`);
        }
      }
    };

    if (visitorUuid && companyId) {
      fetchData();
    }
    // eslint-disable-next-line
  }, [visitorUuid, companyId]);

  return (
    <Container>
      <Header />
      {loading && (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <ReactLoading
            type={'cylon'}
            color={'#4B2995'}
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
              <Card
                key={product.id}
                onClick={() => {
                  setProductId(String(product.id));
                  navigate(`/product`);
                }}
              >
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
                  <CartBox>
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
