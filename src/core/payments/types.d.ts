type Payment = {
  amount: number;
  rate: number;
  method: number;
  currency: number;
};
type IPayment = Payment & {
  id: number;
  saleId: number;
};
