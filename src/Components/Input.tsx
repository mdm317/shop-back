import React from 'react';
import styled from 'styled-components';

export interface InputProp{
    type?:string
    value:string
    onChange?:((e: React.ChangeEvent<HTMLInputElement>) => void) | undefined
    required?:boolean
    readOnly?:boolean
}
export default ({inputProp}:{inputProp:InputProp})=>{
    const inputprops:InputProp={
        type:inputProp.type?inputProp.type:'text',
        value:inputProp.value,
        onChange:inputProp.onChange?inputProp.onChange:undefined,
        readOnly:inputProp.readOnly?inputProp.readOnly:false
    }
    
    if(inputProp.required){//true  일떄만
        inputprops.required =inputProp.required;
    }else{//false null
        if(inputProp.required === undefined){
            inputprops.required =true;
        }
    }
    


    return(
        <input
            {...inputprops}
        ></input>
    )
}