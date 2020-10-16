import React from 'react';
import { StarFill, StarEmpty } from './Icons';


export default function({rating}:{rating:number}){
    const liFill = [];
    const liEmpty  =[];
    for(let i=0;i<5;++i){
        if(i<rating){
            liFill.push(1);
        }else{
            liEmpty.push(0);
        }
    }
    return(
        <>
            {liFill.map(i=>
               ( <StarFill/>)
            )}
              {liEmpty.map(i=>
               ( <StarEmpty/>)
            )}
        </>
    )

    
}