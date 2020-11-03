import React from 'react';
import styled from 'styled-components';
import { Route } from 'react-router-dom';
import ForbiddenPage from '../Routes/ForbiddenPage';


export default ({component:Component, isAuth,path}:
    {component:React.ComponentType<any>,
    isAuth:boolean,
    path:string }) => {
    return (
      <Route
        path={path}
        render={
            props=>{
                if(isAuth){
                    return <Component/>
                }else{
                    return <ForbiddenPage/>
                }
            }
        }
      />
    )
  }
