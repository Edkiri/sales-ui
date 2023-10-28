type Client = {
  name: string;
  identityCard?: string;
  phoneNumber: string;
  email?: string;
};
type IClient = Client & {
  id: number;
};
type ClientFilters = {
  name?: string;
  limit?: number;
  offset?: number;
};
