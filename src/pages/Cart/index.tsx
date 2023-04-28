import { MdArrowBack } from 'react-icons/md';
import { Container, Navbar } from './style';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ToastMessage } from '../../components/Toast';
import { IToastType } from '../../utils/Interface/Toast';
import { api } from '../../services/api';
import { AxiosError } from 'axios';
import { IOrder } from '../../utils/Interface/Order';

interface Props {
  orderData?: string;
}

export const Cart = ({ orderData }: Props) => {
  const navigate = useNavigate();
  const { companyId } = useParams();
  const [showToast, setShowToast] = useState(false);
  const [toastMessageType, setToastMessageType] = useState<IToastType>(
    IToastType.unknow
  );
  const [toastMessage, setToastMessage] = useState('');

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
      </Container>
    </>
  );
};
