type Sale = {
  status: string;
  description: string;
};

type ISale = Sale & {
  id: number;
  client: IClient;
  orders: IOrder[];
  payments?: IPayment[];
};

type SaleFilters = {
  status?: number | string;
};
