
import React, { useEffect } from 'react';
import styled from 'styled-components';
import AddressForm from '../Components/Address/AddressForm';
import Payment from '../Components/Payment';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../Redux/index';
import FatProductCard from '../Components/FatProductCard';
import { useState } from 'react';
import { useInputNumMaxLen, useInputStr2 } from '../Hooks/useInput';
import { toast } from 'react-toastify';
import { addOrder } from '../Redux/User/thunk';
import { RouteComponentProps } from 'react-router-dom';


const Container = styled.div`
    margin-left:10%;
`;
const Title = styled.div`
    margin:10px 0;
    font-size:2rem;
    font-weight:600;
`;

const CartItemList = styled.div`
    border: 0.5rem solid lightgray;
    padding:10px;
`;
const ProductColumn = styled.div`
    display:flex;
    align-items:center;
    input{
        width:70px;
    }
`;
const Count = styled.input`
    
`;


const Section = styled.div`
    margin-top:20px;
`;
const Button = styled.button`
    height:30px;
    width:100px;
    background-color:blueviolet;
    color:white;
    margin:30px 0;
    margin-left:300px;
    border-radius:5px;
`;
interface ProductQuantity{
    productId:string
    quantity:number
    price:number
}
export interface AddressFormProp{
    name:ReturnType<typeof useInputStr2>
    zip:string
    setzip:React.Dispatch<React.SetStateAction<string>>
    address:string
    setaddress:React.Dispatch<React.SetStateAction<string>>
    address2:ReturnType<typeof useInputStr2>
    phone1:ReturnType<typeof useInputNumMaxLen>
    phone2:ReturnType<typeof useInputNumMaxLen>
    phone3:ReturnType<typeof useInputNumMaxLen>
    delivermessage:ReturnType<typeof useInputStr2>
}


export default (props:RouteComponentProps)=>{
    const dispatch = useDispatch();
    const products = useSelector((state:RootState) => state.user.cart);
    const [quantityList, setQuantityList] = useState<ProductQuantity[]>([]);
    const [totalPrice, settotalPrice] = useState(0);
    const [paymentPossible, setpaymentPossible] = useState(false);
    // setQuantityList(newQuantityList);
    //addressForm
    const name = useInputStr2("1"); //초기화 해야함
    const [zip, setzip] = useState("1");    //초기화 해야함
    const [address, setaddress] = useState("1");    //초기화 해야함
    const address2 = useInputStr2("1"); //초기화 해야함
    const phone1 = useInputNumMaxLen("1",4);    //초기화 해야함
    const phone2 = useInputNumMaxLen("1",4);    //초기화 해야함
    const phone3 = useInputNumMaxLen("1",4);    //초기화 해야함
    const delivermessage = useInputStr2("");
    const addressFormProp = {name,zip, setzip, address, setaddress,
        address2,
        phone1,
        phone2,
        phone3,
        delivermessage};

    useEffect(() => {
        const newQuantityList = products.map((product)=>(
            {productId:product.id,price:product.price, quantity:1}
        ));
        const price = newQuantityList.reduce((ac,cu)=>{
            return ac+cu.quantity*cu.price;
        },0);
        setQuantityList(newQuantityList);
        settotalPrice(price);
    }, [products]);
    const onQuantity = (e:React.ChangeEvent<HTMLInputElement>)=>{
        
        const idx = Number(e.target.id);
        const elem = quantityList[idx];
        const changedElem:ProductQuantity = {
            ...elem,
            quantity:Number(e.target.value)
        }
        const newQuantityList= [...quantityList.slice(0,idx),changedElem,...quantityList.slice(idx+1)];

        setQuantityList(newQuantityList)
        const newPrice = newQuantityList.reduce((ac,cu)=>{
            return ac+cu.quantity*cu.price;
        },0);
        settotalPrice(newPrice);
    }
    const onSubmit = (e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        if(!paymentPossible){
            toast.error('잔액 부족');
            return;
        }
/*         interface addOrderParam{
            productIdAndCount:{  
              id:string
              count:number}[]
            cash:number
        } */
        
        const productIdAndCount = quantityList.map(item=>({
            id:item.productId,
            count:item.quantity
         }));
         const phone = phone1.value+'-'+phone2.value+'-'+phone3.value;
         dispatch(addOrder({
             productIdAndCount, 
             cash:totalPrice,
             address1:address,
             address2:address2.value,
             zipcode:zip,
             name:name.value,
             message:delivermessage.value,
             phone
            }, props));
    }
    return(
        <Container>
            <Title>결제창</Title>
            <div>장바구니 목록</div>
            <form onSubmit={onSubmit}>
            <Section>
            <CartItemList>
                {products.map((product,i)=>(
                    <ProductColumn  key = {product.id}>
                        <FatProductCard
                        product={product}
                        />
                        <input id={i.toString()} onChange={onQuantity} type="number" defaultValue={1}></input>
                    </ProductColumn>
                ))}
            </CartItemList>
            </Section>
            <Section>
            <Payment
            setpaymentPossible={setpaymentPossible}
            price={totalPrice}
            />
            </Section>
            <Section>
            <AddressForm
            addressFormProp={addressFormProp}
            />
            </Section>
            <Button>주문하기</Button>
            </form>
        </Container>

    );
}