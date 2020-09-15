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
//product 안에 리뷰와 질문 포함
export interface Product{
    id:String;
    price:number;
    stock:number;
    description?:String;
    thumbnail?:String;
    imageUrl:String;
    willDelete:Boolean;
    createdAt:number;
    qnas?: Qna[];
    reviews?: Review[];
}
export interface Address{
    address: String ;
    additional?: String;
    zipcode: String;
}
export interface Review{
    id: String;
    content: String;
    rating: number;
    image?: String;
}
export interface Qna{
    id:String;
    title:String;
    content:String;
}
