export interface User{
    id:String
    userId:String
    name:  String
    point:number
    email?:String
    phone?: String
    isAdmin: Boolean
    createdAt:number
    basket:Basket
}
export interface Basket{
    id:string
    products:Product[]
    userId:string

}
//product 안에 리뷰와 질문 포함
export interface Product{
    id:string
    name:string
    price:number
    stock:number
    productImage:Image[]
    description:string
    thumbnail?:string
    willDelete?:Boolean
    createdAt?:number
    qnas: Qna[]
    reviews: Review[]
}
export interface Image{
    id:string,
    url:string
}
export interface Address{
    address: String 
    additional?: String
    zipcode: String
}
export interface Review{
    id: String;
    content: String;
    rating: number;
    image?: string;
    orderId:string
    productId:string
}


export interface Qna{
    id:string;
    content:String;
    user:User;
    product?:Product;
    answer?:Qna;
    question?:Qna;
    createdAt:string;
    userId:string;
}
interface ProductInOrder extends Product{
    existReview:boolean
    count:number
}
export interface Order{
    id:string
    products:ProductInOrder[]
    name:string
    address1:string
    address2:string
    zipcode:string
    phone:string
    message?:string
    orderNumber:string
    createdAt:string
    user?:{
        userId:string
    }

}