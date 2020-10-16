import React from 'react';
import styled from 'styled-components';
import { Review } from '../../Model/db';
import StarReview from '../StarReview';
import { useDispatch } from 'react-redux';

const Container = styled.div`

`;
const ReviewList = styled.div`

`;
const ReviewBox= styled.div`
    border-bottom: 1px solid gray;
    display : flex;
    
`;
const ReviewHeader = styled.div`
    border-bottom:1px solid black;
    padding-bottom:10px;
`;
const TextMedium = styled.div`
    margin-top:10px;
    font-size:1.5rem;
`;
const ReviewTitle = styled.div`
    font-size:2em;
    font-weight:700;
`;
export default ({reviews}:{reviews:Review[]})=>{

    return(            
        <Container>
            <ReviewHeader>
                <ReviewTitle>상품 리뷰</ReviewTitle>
                <TextMedium>리뷰 {reviews.length}건</TextMedium>
            </ReviewHeader>
            <ReviewList>     
                {reviews && reviews.map((review,i)=>(
                    <ReviewBox key={i}>
                        <div>
                        <StarReview rating={review.rating}/>
                        <p>
                            {review.content}
                        </p>
                        </div>
                        {review.image && <img width={100} height={100} src={review.image}/>}
                    </ReviewBox>
                ))}
            </ReviewList>
    </Container>)
}