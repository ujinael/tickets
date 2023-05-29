export interface IOrder {
    id?:string
    age: string;
    birthDate: Date;
    cardNumber: string;
    tourId: string;
    userId: string;
    firstName: string;
    lastName: string;
  }
  export class Order{
    constructor(
    public age: string = "20",
    public birthDate: Date = new Date(),
    public cardNumber: string = "",
    public tourId: string = "",
    public userId: string = "",
    public firstName: string = "",
    public lastName: string = "",
    ){}
  }