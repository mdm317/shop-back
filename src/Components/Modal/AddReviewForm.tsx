import React from 'react';
import styled from 'styled-components';
import { useState } from 'react';
import StarReview from '../StarReview';
import { StarFill, StarEmpty } from '../Icons';

const Container = styled.div`
    position:fixed;
    top:20%;
    left:20%;
    display:flex;
`;
const StarContainer = styled.div`
    display:flex;
`


export default ()=>{
    const [temprating, settemprating] = useState(0);
    const [rating, setrating] = useState(3);
    const mouseEnterStar = (e:React.MouseEvent<HTMLDivElement, MouseEvent>)=>{
        const elem = e.currentTarget as HTMLElement;
        settemprating(Number(elem.id));
    }
    const mouseOutStars = (e:React.MouseEvent<HTMLDivElement, MouseEvent>)=>{
        settemprating(Number(0));
    }
    const clickStar = (e:React.MouseEvent<HTMLDivElement, MouseEvent>)=>{
        const elem = e.currentTarget as HTMLElement;
        console.log(elem.id);
        setrating(Number(elem.id));
    }
    
    return(
    <Container>
        {temprating>0?
        <StarContainer  onMouseLeave={mouseOutStars}>
            {new Array(0,0,0,0,0).map((i,index)=>{
            if(index<temprating){
                return (<div id={(index+1).toString()} onClick={clickStar}  onMouseEnter={mouseEnterStar}><StarFill/></div>)
            }else{
                return (<div id={(index+1).toString()} onClick={clickStar}  onMouseEnter={mouseEnterStar}><StarEmpty/></div>)
            }
            })}
        </StarContainer>
        
        :
        new Array(0,0,0,0,0).map((i,index)=>{
            if(index<rating){
                return (<div id={(index+1).toString()} onClick={clickStar} onMouseEnter={mouseEnterStar}><StarFill/></div>)
            }else{
                return (<div id={(index+1).toString()} onClick={clickStar} onMouseEnter={mouseEnterStar}><StarEmpty/></div>)
            }
        })
        }
        
        
    </Container>)
}