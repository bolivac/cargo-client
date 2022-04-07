export interface Sender {
  id: number;
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  embs: number;
  phone: number;
}

export interface User {
  id: string,
  username: string,
}

export interface AuthenticateResponse {
  success: boolean,
  msg: string,
  token: string,
  user: User
}

export interface ShipmentCount {
  count: number;
}

export interface AuthenticatePayload {
  username: string,
  password: string
}

export interface Recipient {
  id: number;
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  additionalInformation: string;
  phone: number;
}

export interface Courier {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: number;
}

export interface DeliveryAttempts {
  courierId: number;
  date: string;
  successfulDelivery: boolean;
  notFoundAtTheAddress: boolean;
  refuseToSign: boolean;
  refuseToAccept: boolean;
  incorrectAddress: boolean;
  illiterate: boolean;
  noPersonAtThatAddress: boolean;
  leftInWorkspace: boolean;
  givenNotice: boolean,
  deceased: boolean,
  evicted: boolean,
  recipientDidNotPickedUp: boolean;
  additionalInformation: boolean;
}

export interface Shipment {
  senderId: number;
  uid: number;
  senderFullName: string;
  recipient: Recipient;
  shipmentPostage: number;
  deliveryType: string;
  deliveryAttempts: DeliveryAttempts[];
  shipmentDate: string;
  subjectOfShipment: string;
  recommendedShipment: boolean;
  personalShipment: boolean;
  withReturnShipment: boolean;
  _id: string;
}
