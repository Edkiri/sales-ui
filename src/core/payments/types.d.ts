type Payment = {
  amount: number | string;
  rate: number | string;
  paymentMethodId: number;
  currencyId: number;
  temporaryId?: string;
};
type IPayment = Payment & {
  id: number;
  saleId: number;
  method: IPaymentMethod;
  currency: ICurrency;
};

type PaymentMethod = {
  name: string;
  currencyId: number;
};
type IPaymentMethod = PaymentMethod & {
  id: number;
};
