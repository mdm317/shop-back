export interface User{
    id:String;
    userId:String;
    name:  String;
    point:number;
    email?:String;
    phone: String;
    isAdmin: Boolean;
    createdAt:number;
}
export interface Product{
    id:String;
    price:number;
    stock:number;
    description?:String;
    thumbnail?:String;
    imageUrl:String;
    willDelete:Boolean;
    createdAt:number;
}
export interface Address{

    address: String ;
    additional?: String;
    zipcode: String;
}
