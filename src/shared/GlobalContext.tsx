import { ReactNode, createContext, useState } from 'react';
import { IOrder } from '../utils/Interface/Order';
import { IToastType } from '../utils/Interface/Toast';
import { ToastMessage } from '../components/Toast';
import { IProduct } from '../utils/Interface/Product';

type GlobalContextData = {
  orderData?: IOrder;
  setOrderData: (orderData: any) => void;
  productsData?: IProduct[];
  setProductsData: (productsData: IProduct[]) => void;
};

export const GlobalContext = createContext({} as GlobalContextData);

type Props = {
  children: ReactNode;
};

export function GlobalProvider({ children }: Props) {
  const [orderData, setOrderData] = useState<IOrder>();
  const [productsData, setProductsData] = useState<IProduct[]>([]);
  const [showToast, setShowToast] = useState(false);
  const [toastMessageType, setToastMessageType] = useState<IToastType>(
    IToastType.unknow
  );
  const [toastMessage, setToastMessage] = useState('');

  return (
    <GlobalContext.Provider
      value={{ orderData, setOrderData, productsData, setProductsData }}
    >
      <ToastMessage
        setShowToast={setShowToast}
        showToast={showToast}
        toastMessage={toastMessage}
        toastMessageType={toastMessageType}
      />
      {children}
    </GlobalContext.Provider>
  );
}
