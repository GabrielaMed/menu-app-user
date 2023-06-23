import { ReactNode, createContext, useState, useEffect } from 'react';
import { IOrder } from '../utils/Interface/Order';
import { IProduct } from '../utils/Interface/Product';
import { v4 as uuidv4 } from 'uuid';

type GlobalContextData = {
  orderData?: IOrder;
  setOrderData: (orderData: any) => void;
  productsData?: IProduct[];
  setProductsData: (productsData: IProduct[]) => void;
  clearOrderData: () => void;
  visitorUuid?: string;
  clearVisitorUuid: () => void;
  companyId: string;
  setCompanyId: (companyId: string) => void;
  productId: string;
  setProductId: (productId: string) => void;
  tableNumber: number;
  setTableNumber: (tableNumber: number) => void;
};

export const GlobalContext = createContext({} as GlobalContextData);

type Props = {
  children: ReactNode;
};

export const GlobalContextProvider = ({ children }: Props) => {
  const [companyId, setCompanyId] = useState(() => {
    const storedCompanyId = localStorage.getItem('companyId');
    return storedCompanyId ? storedCompanyId : '';
  });

  const [productId, setProductId] = useState('');
  const [tableNumber, setTableNumber] = useState(() => {
    const storedTableNumber = localStorage.getItem('tableNumber');
    return storedTableNumber ? parseInt(storedTableNumber) : 0;
  });
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
    let uuid = uuidv4();
    localStorage.setItem('visitorUuid', uuid);
    const visitorUuid = localStorage.getItem('visitorUuid');
    setVisitorUuid(String(visitorUuid));
  };

  useEffect(() => {
    localStorage.setItem('orderData', JSON.stringify(orderData));
  }, [orderData]);

  useEffect(() => {
    const savedOrderData = localStorage.getItem('orderData');
    if (savedOrderData !== null && savedOrderData !== 'undefined') {
      try {
        const parsedData = JSON.parse(savedOrderData);

        setOrderData(parsedData);
      } catch (error) {
        console.error('Error parsing orderData from local storage:', error);
      }
    }
  }, []);

  const clearOrderData = () => {
    localStorage.removeItem('orderData');
    setOrderData(undefined);
  };

  useEffect(() => {
    localStorage.setItem('companyId', companyId);
  }, [companyId]);

  useEffect(() => {
    localStorage.setItem('tableNumber', tableNumber.toString());
  }, [tableNumber]);

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
        productId,
        setProductId,
        clearOrderData,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
