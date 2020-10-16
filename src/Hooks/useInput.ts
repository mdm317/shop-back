import { ChangeEvent, useState } from "react";

import { toast } from "react-toastify";
export interface UseInputStr{
    value:string
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    setValue:React.Dispatch<React.SetStateAction<string>>
}
export const useInputStr2 =  (defaultValue:string)=>{
    const [value,setValue] = useState(defaultValue);
    const onChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
        const {value}=e.target;
        setValue(value );
    }
    return {value, onChange};
}
export const useInputStr =  (defaultValue:string)=>{
    const [value,setValue] = useState(defaultValue);
    const onChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
        const {value}=e.target;
        setValue(value );
    }
    return {value, onChange,setValue};
}

export const useInputNum =  (defaultValue:string)=>{
    const [value,setValue] = useState(defaultValue);
    const onChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
        const {value}=e.target;
        if(value===""){
            return setValue(value);
        }
        const isNum = Number(value);
        if(isNum){
            setValue(value);
        }else{
            toast.error('enter only number ');
        }
    }
    return {value, onChange,setValue};
}
export const useInputNum2 =  (defaultValue:string)=>{
    const [value,setValue] = useState(defaultValue);
    const onChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
        const {value}=e.target;
        if(value===""){
            return setValue(value);
        }
        const isNum = Number(value);
        if(isNum){
            setValue(value);
        }else{
            toast.error('enter only number ');
        }
    }
    return {value, onChange};
}
export const useInputNumMaxLen =  (defaultValue:string,maxlen:number)=>{
    const [value,setValue] = useState(defaultValue);
    const onChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
        const {value}=e.target;
        if(value===""){
            return setValue(value);
        }
        if(value.length>maxlen){
            return toast.error(`enter only ${maxlen} number `);

        }
        const isNum = Number(value);
        if(isNum){
            setValue(value);
        }else{
            toast.error('enter only number ');
        }
    }
    return {value, onChange};
}

export const useInput =  (defaultValue:any)=>{
    const [value,setValue] = useState(defaultValue);
    const onChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
        const {value}=e.target;
        setValue(value );
    }
    return {value, onChange,setValue};
}