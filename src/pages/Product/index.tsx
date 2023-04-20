import { MdArrowBack } from 'react-icons/md';
import { Header } from '../../components/Header';
import { Container, Navbar } from './style';
import { useParams } from 'react-router-dom';
import { api } from '../../services/api';
import { useEffect, useState } from 'react';
import { IToastType } from '../../utils/Interface/Toast';
import { IProduct } from '../../utils/Interface/Product';
import { AxiosError } from 'axios';

export const Product = () => {
  const [productData, setProductData] = useState<IProduct>({});
  const [showToast, setShowToast] = useState(false);
  const [toastMessageType, setToastMessageType] = useState<IToastType>(
    IToastType.unknow
  );
  const [toastMessage, setToastMessage] = useState('');
  const { productId } = useParams();

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
          <MdArrowBack size={24} />
        </span>
        <span>Detalhes do produto</span>
      </Navbar>
    </Container>
  );
};
