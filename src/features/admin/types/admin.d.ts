export type ShopType = {
  shopId: string;
  shopName: string;
  shopGroup: string;
  shopNo: string;
  postalCode: string;
  prefecture: string;
  city: string;
  address: string;
  building: string;
  isOwn: boolean;
  isDelete: boolean;
  createDateTime: datetime;
  createUserId: string;
  updateDateTime: datetime;
  updateUserId: string;
  chargePersons: ChargePersonType[];
};

export type ChargePersonType = {
  chargePersonId: string;
  shop: ShopType;
  user: UserType;
  isDelete: boolean;
  createDateTime: datetime;
  createUserId: string;
  updateDateTime: datetime;
  updateUserId: string;
};

export type UserType = {
  userId: string;
  password: string;
  userName: string;
  userNameKana: string;
  allowLogin: boolean;
  roleId: string;
  isDelete: boolean;
  createDateTime: datetime;
  createUserId: string;
  updateDateTime: datetime;
  updateUserId: string;
  shop?: ShopType;
};
