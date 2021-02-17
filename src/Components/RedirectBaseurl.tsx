import React, { useEffect } from 'react';
import { useHistory } from "react-router-dom";
import baseurl from "../baseurl";
// link에 match.url 을 쓰지 않아서 일일히 baseurl 을 적는대신 새로움 컴포넌트를 만듬
export default function RedirectBaseurl() {
    console.log('redirect com');
    
    const history =useHistory();
    if(baseurl===''){
        history.push('/');
    }
    
    const exitBaseurl = history.location.pathname.indexOf(baseurl);

    //여기서는 error 가 나는 이유는????
    // if(exitBaseurl===-1){
    //     const newPath  = baseurl+ history.location.pathname;
    //     history.replace(newPath);
    // }
    // else{
    //     history.push(baseurl);
    // }
    useEffect(() => {
        if(exitBaseurl===-1){
            const newPath  = baseurl+ history.location.pathname;
            history.replace(newPath);
        }
        else{
            history.push(baseurl);
        }
    }, []);
    return <></>
}