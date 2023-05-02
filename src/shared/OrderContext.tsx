import { ReactNode, createContext, useState } from 'react';
import { IOrder } from '../utils/Interface/Order';
import { IToastType } from '../utils/Interface/Toast';
import { ToastMessage } from '../components/Toast';

type OrderContextData = {
  orderData?: IOrder;
  setOrderData: (orderData: any) => void;
};

export const OrderContext = createContext({} as OrderContextData);

type Props = {
  children: ReactNode;
};

export function OrderProvider({ children }: Props) {
  const [orderData, setOrderData] = useState<IOrder>();
  const [showToast, setShowToast] = useState(false);
  const [toastMessageType, setToastMessageType] = useState<IToastType>(
    IToastType.unknow
  );
  const [toastMessage, setToastMessage] = useState('');

  return (
    <OrderContext.Provider value={{ orderData, setOrderData }}>
      <ToastMessage
        setShowToast={setShowToast}
        showToast={showToast}
        toastMessage={toastMessage}
        toastMessageType={toastMessageType}
      />
      {children}
    </OrderContext.Provider>
  );
}
