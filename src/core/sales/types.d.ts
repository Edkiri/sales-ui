type Sale = {
  description: string;
  payments: Payment[];
  orders: Order[];
  clientId?: number | undefined;
};

type ISale = Sale & {
  id: number;
  client?: IClient;
  orders: IOrder[];
  payments?: IPayment[];
  status: string;
};

type SaleFilters = {
  status?: number | string;
};
