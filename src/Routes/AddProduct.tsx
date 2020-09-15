import React,{useState} from 'react';
import { useDispatch } from 'react-redux';


export default function() {
    const dispatch = useDispatch();
    const addProductBtn = ()=>{
        console.log('hello?');
    }
    const [id, setId] = useState<string>("");
    const handleChange = (e:any)=>{
        console.log(id);
        setId(e.target.value);
    }
    return (
        <>
            <form>
                <input id="userId" type="text" placeholder="id" value={id} onChange={handleChange}></input>
            </form>
            
        </>
    );
}
