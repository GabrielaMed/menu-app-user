import { ReactNode, createContext, useState, useEffect } from 'react';
import { IOrder } from '../utils/Interface/Order';
import { IToastType } from '../utils/Interface/Toast';
import { ToastMessage } from '../components/Toast';
import { IProduct } from '../utils/Interface/Product';
import { v4 as uuidv4 } from 'uuid';

type GlobalContextData = {
  orderData?: IOrder;
  setOrderData: (orderData: any) => void;
  productsData?: IProduct[];
  setProductsData: (productsData: IProduct[]) => void;
  visitorUuid?: string;
  clearVisitorUuid?: () => void;
  companyId: string;
  setCompanyId: (companyId: string) => void;
  tableNumber: number;
  setTableNumber: (tableNumber: number) => void;
};

export const GlobalContext = createContext({} as GlobalContextData);

type Props = {
  children: ReactNode;
};

export const GlobalContextProvider = ({ children }: Props) => {
  const [companyId, setCompanyId] = useState('');
  const [tableNumber, setTableNumber] = useState(0);
  const [orderData, setOrderData] = useState<IOrder>();
  const [productsData, setProductsData] = useState<IProduct[]>([]);
  const [visitorUuid, setVisitorUuid] = useState<string>(() => {
    let uuid = localStorage.getItem('visitorUuid');
    if (!uuid) {
      uuid = uuidv4();
      localStorage.setItem('visitorUuid', uuid);
    }
    return uuid;
  });

  const clearVisitorUuid = () => {
    localStorage.removeItem('visitorUuid');
    setVisitorUuid('');
  };

  return (
    <GlobalContext.Provider
      value={{
        orderData,
        setOrderData,
        productsData,
        setProductsData,
        visitorUuid,
        clearVisitorUuid,
        companyId,
        setCompanyId,
        tableNumber,
        setTableNumber,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
