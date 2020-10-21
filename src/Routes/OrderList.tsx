import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Order } from '../Model/db';
import { RootState } from '../Redux/index';
import { useSelector, useDispatch } from 'react-redux';
import FatProductCard from '../Components/FatProductCard';
import { getOrder, addReview } from '../Redux/User/thunk';


const Wrapper = styled.div`
    
`;

const Container = styled.div`

`;
const Top = styled.div`
    display:flex;
    div{
        color:lightsalmon;
        font-size:2em;
        font-weight:500;
        margin-right:1em;
    }
    margin : 10px 0;
`;
const TopProductCard = styled.div`
    display:grid;
    grid-template-columns: 100px 300px 100px 100px;
    border-top:3px solid black;
    height:2em;
    padding-top:0.5em;
    margin-bottom:20px;

    
`;


const Column = styled.div`
    text-align:center;
`;
const OrderCard = styled.div`
    margin-top:1.5em;
    border: 1px solid lightgray;

`;
const ProductCard = styled.div`
    margin-bottom:1em;

        display:grid;
    grid-template-columns: 100px 300px 100px 100px;

`;
const ProductCardColumn = styled.div`
    display:flex;
    justify-content:center;

`;

const ShipmentCard = styled.div`
    section{
        display:flex;
        
        label{
            width: 100px;
            background-color:lightgray;
            text-align:center;
            margin-top:5px;
        }
        p{
            margin-left:10px;
            margin-top:5px;

        }
        
    }
`;

const Strong = styled.div`
    font-weight:700;
    font-size:1.5em;
`;
const ProductInfo = styled.div`
    display:flex;
`;

const ProductDescription = styled.div`
    
`;
const Image = styled.div`
    width:100%;
`;
const Button = styled.button`
    height:1.5em;
`
export default ()=>{
    const orders = useSelector((state:RootState) => state.user.orders);
    const user = useSelector((state:RootState) => state.user.user);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getOrder());
    }, []);
    const clickWrapper = (e:React.MouseEvent<HTMLDivElement, MouseEvent>)=>{
        const element = e.target as HTMLElement
        const curElement = e.currentTarget as HTMLElement
        if(element.tagName==='BUTTON'){
            const productId = element.id;
            const orderId = curElement.id;
            console.log(productId, orderId);
        }
    }
    const clickAddReviewBtn= (e:React.MouseEvent<HTMLButtonElement, MouseEvent>)=>{
 
    }
    return (
        <Wrapper>
            <Container>
            {orders.map(order=>(
            <OrderCard onClick={clickWrapper} id={order.id}  key={order.id}>
                <Top>
                    <div>
                        <span>주문일자 : </span>
                        <span>{order.createdAt.slice(0,10)}</span> 
                    </div>
                    {user?.isAdmin &&
                    <div>
                    <span>주문자 : </span>
                    <span>{order.user?.userId}</span> 
                </div>
                    }
                    
                </Top>
                <TopProductCard>
                    <Column>상품주문번호</Column>
                    <Column>상품정보</Column>
                    <Column><div>상품금액</div><div>(수량)</div></Column>
                    <Column>진행상태</Column>
                </TopProductCard>
                {order.products.map((product)=>(
                    <ProductCard  key={product.id}>
                        <ProductCardColumn> 
                            <div>{order.orderNumber}</div>
                        </ProductCardColumn>
                        <ProductCardColumn>
                            <ProductInfo>
                                <Image><img width={150} height={150}src = {product.thumbnail}></img></Image>
                                <ProductDescription>
                                    <Strong>{product.name}</Strong>
                                    <p>{product.description}</p>
                                </ProductDescription>
                            </ProductInfo>
                        </ProductCardColumn>
                        <ProductCardColumn>
                            <div><div>{product.price} 원</div><div>{`(${product.count})`} 개</div></div>
                        </ProductCardColumn>
                        <ProductCardColumn>  
                            <div>구매완료</div>
                        </ProductCardColumn>
                      
                        
                    </ProductCard>
                ))}
                <ShipmentCard>
                    <Strong>배송지 정보</Strong>
                    <section>
                        <label>수령인</label>
                        <p>{order.name}</p>
                    </section>
                    <section>
                        <label>연락처</label>
                        <p>{order.phone}</p>
                    </section>
                    <section>
                        <label>배송지</label>
                        <p>{order.zipcode}</p>
                        <p>{order.address1}</p>
                        <p>{order.address2}</p>
                    </section>
                    <section>
                        <label>배송 메모</label>
                        <p>{order.message}</p>
                    </section>
                </ShipmentCard>
            </OrderCard>

            ))}
            </Container>
        </Wrapper>
    )
}