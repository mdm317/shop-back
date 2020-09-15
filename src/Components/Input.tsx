import React, { PureComponent } from 'react'

interface onChange {

}
export default function(
    id:string,
    type:string, 
    value:string,
    required:boolean,
    onChange:()=>void,
    placeholder?:string,
    ){
    return (
        <input    
            placeholder={placeholder}
            required={required}
            value={value}
            onChange={onChange}
            type={type}>

        </input>
    )
}