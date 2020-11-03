import React, { useEffect } from 'react';
import styled from 'styled-components';
import Header from '../Components/Header';
import { Product } from '../Model/db';
import { useDispatch, useSelector } from 'react-redux';
import { addCart } from '../Redux/User/thunk';
import { RouteComponentProps } from 'react-router-dom';
import { withRouter} from 'react-router'
import { RootState } from '../Redux/index';
import { getPrdQueList } from '../Redux/Product/thunk';
import { toast } from 'react-toastify';
import QnaContainer from '../Components/Qna/QnaContainer';
import ReviewContainer from '../Components/Review/ReviewContainer';


const Wrapper = styled.div`
    width:100%;

`;
const Container = styled.div`
    margin: 0 auto;
    padding:0 20px;
    display:block;
    max-width:960px;
`;
const ProductWrapper = styled.div`

`;
const ProductHeader = styled.div`
    display:flex;
    border-bottom: 2px solid black;
`;
const ProductPreview= styled.div`
    width:50%;
`;

const ProductBuy = styled.div`
    width:50%;
    margin-left:15%;
`;
const Row = styled.div`
    margin-top:20px;
`;
const ProductDescriptions = styled.div`
    display:flex;
    align-items:center;
    flex-direction:column;
`;
const Strong = styled.div`
    font-size:2rem;
    font-weight:700;
`;
const Stock = styled.div`
    color:blueviolet;
`;
const Price = styled.div`
    color:coral;
`;
const BuyButton = styled.div`
    width: 80%;
    color:white;

    background-color:coral;
    border-radius: 10% / 50%;
    text-align:center;
    padding: 20px 0;
    &:hover{
        cursor: pointer;
    }
`;
const TextAlign = styled.div`
    margin-top:100px;
`;
const AddCartBtn = styled.div`
     width: 80%;
    color:white;
&:hover{
    cursor: pointer;
}
    background-color:black;
    border-radius: 10% / 50%;
    text-align:center;
    padding: 20px 0;
`;
const NaverPay = styled.div`
`;



type LocationState = {
    product: Product;
};
interface MatchParams {
    productIndex:string
}
const ProductDetail: React.SFC<RouteComponentProps<MatchParams>> = ({match})=>{
    
    const {productIndex} = match.params;
    const user = useSelector((state:RootState) => state.user.user);
    const productList = useSelector((state:RootState) => state.product.products);
    const product = productList[Number(productIndex)];
    // const reviews = product.reviews;
   
    const dispatch = useDispatch();
    useEffect(() => {
        if(product){
            dispatch(getPrdQueList(product.id));//랜더링이 무조건 2번발생 1번으로 줄이는 훅없나?
        }
    }, [product]);
    if(!product){
        return(<div></div>)
    }
  
    const clickAddCart = (e:React.MouseEvent<HTMLDivElement, MouseEvent>)=>{
        dispatch(addCart(product.id))
    }
    const clickAddQna =(e: React.MouseEvent<HTMLButtonElement, MouseEvent>)=>{
        if(!user){
            toast.error('you need to login');
            return;
        }
        const key = window.open(`/qnaform/${product.id}`,"PopupWin","width=500,height=600");

    }

    return(
        <Wrapper>
            <Container>
            <ProductWrapper>
            <ProductHeader>
                <ProductPreview>
                    <img width={400} height={400}src={product.thumbnail}></img>
                </ProductPreview>
                <ProductBuy>
                    <Row>
                        <Strong>{product.name}</Strong>
                    </Row>
                    <Row>
                        <Stock>재고 {product.stock} 개</Stock>
                    </Row>
                    <Row>
                        <Price>{product.price} 원</Price>
                    </Row>
                    <Row>
                        <AddCartBtn onClick={clickAddCart}>장바구니</AddCartBtn>
                    </Row>
                    <Row>
                        <NaverPay/>
                    </Row>
                </ProductBuy>
            </ProductHeader>
            <ProductDescriptions>
                <p>
                    {product.description}
                </p>
                {product.productImage.map((image,i)=>(
                    <div key={i}><img width={"100%"} src={image.url}/></div>
                ))}
            </ProductDescriptions>
            {/* <ReviewContainer
                reviews={product.reviews}
            /> */}

            <QnaContainer
                productId={product.id}
                qnaList={product.qnas}
            />
        </ProductWrapper>
            </Container> 
        </Wrapper>

    );
}

export default withRouter(ProductDetail);