import { MdAdd, MdArrowBack, MdRemove } from 'react-icons/md';
import {
  AdditionalEnd,
  AdditionalName,
  AdditionalPrice,
  AdditionalsDivider,
  AdditionalsList,
  AdditionalsListItem,
  Container,
  CounterBox,
  FinishedButton,
  Footer,
  Navbar,
  ProductDescription,
  ProductInfoBox,
  ProductName,
  ProductPrice,
} from './style';
import { useNavigate, useParams } from 'react-router-dom';
import { api } from '../../services/api';
import { useEffect, useState } from 'react';
import { IToastType } from '../../utils/Interface/Toast';
import { IProduct } from '../../utils/Interface/Product';
import { AxiosError } from 'axios';
import { Carousel } from 'react-bootstrap';

export const Product = () => {
  const [productData, setProductData] = useState<IProduct>({});
  const [showToast, setShowToast] = useState(false);
  const [toastMessageType, setToastMessageType] = useState<IToastType>(
    IToastType.unknow
  );
  const [toastMessage, setToastMessage] = useState('');
  const { productId, companyId } = useParams();
  const [count, setCount] = useState(0);
  const [countProduct, setCountProduct] = useState(1);

  const navigate = useNavigate();

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
            additional: responseAdditional.data.additionals,
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

  return (
    <Container>
      <Navbar>
        <span>
          <MdArrowBack size={24} onClick={() => navigate(`/${companyId}}`)} />
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
                <img
                  className='d-block w-100'
                  style={{ objectFit: 'cover', height: '15rem' }}
                  src={process.env.REACT_APP_IMAGE_URL + item?.fileName}
                  alt=''
                />
              </Carousel.Item>
            );
          })}
        </Carousel>
        <ProductName>{productData.name}</ProductName>
        <ProductDescription>{productData.description}</ProductDescription>
        <ProductPrice>R$ {productData.price}</ProductPrice>
      </ProductInfoBox>
      <AdditionalsDivider>
        Algum adicional?
        <span>Escolha até {productData?.additional?.length} opções.</span>
      </AdditionalsDivider>
      <AdditionalsList>
        {productData.additional?.map((item, idx) => {
          return (
            <AdditionalsListItem key={idx}>
              <AdditionalName>{item.name}</AdditionalName>
              <AdditionalEnd>
                <AdditionalPrice>+ R${item.price}</AdditionalPrice>
                <CounterBox>
                  <MdRemove
                    onClick={() => {
                      setCount(count - 1);
                    }}
                  />
                  {count}
                  <MdAdd
                    onClick={() => {
                      setCount(count + 1);
                    }}
                  />
                </CounterBox>
              </AdditionalEnd>
            </AdditionalsListItem>
          );
        })}
      </AdditionalsList>
      <Footer>
        <CounterBox>
          <MdRemove
            onClick={() => {
              setCountProduct(countProduct - 1);
            }}
          />
          {countProduct}
          <MdAdd
            onClick={() => {
              setCountProduct(countProduct + 1);
            }}
          />
        </CounterBox>
        <FinishedButton>Concluir</FinishedButton>
      </Footer>
    </Container>
  );
};
