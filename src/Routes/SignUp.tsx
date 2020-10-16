import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import { useInputStr } from '../Hooks/useInput';
import { signUp, SignUpData, checkId } from '../Redux/User/thunk';
import { RootState } from '../Redux/index';
const Container = styled.div`
    margin-top:10vh;
    display:flex;
    flex-direction:column;
    align-items:center;
`;
const Line = styled.div`
    height:1.5px;
    width:100%;
    background-color:black;
`;
const Text =  styled.p`
    font-size:0.8em;
    padding-bottom:10px;
`;
const Form = styled.div`
  padding: 40px;
  padding-bottom: 30px;
  margin-bottom: 15px;
  width: 50vw;

  form {
    display:flex;
    flex-direction:column;
    align-items:center;
    width: 100%;
    input {
        height:30px;
        width: 100%;
        min-width: 100px;
        &:not(:last-child) {
            margin-bottom: 7px;
    }
    
    }
    button {
      margin-top: 10px;
    }
  }
`;
interface Props extends RouteComponentProps {}
function SignUp(props:Props){

    const checkIdState = useSelector((state:RootState) => state.user.checkId.possible);
    const dispatch = useDispatch();
    const userId =useInputStr("");
    const name =useInputStr("");
    const password =useInputStr("");
    const passwordCheck =useInputStr("");
    const email =useInputStr("");
    const phone =useInputStr("");
    
    useEffect(() => {
        if(checkIdState){
            dispatchSignup();
        }

        
    }, [checkIdState]);
    const checkIdPossible = async()=>{
        const a= await dispatch(checkId(userId.value));

    }
    const onSubmit=async(e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        if(password.value!== passwordCheck.value){
            toast.error('check your password');
            return;
        }
        checkIdPossible();
    }
    const dispatchSignup = ()=>{
        let newUser:SignUpData = {
            userId:userId.value,
            name:name.value,
            password:password.value,
        };
        if(email.value){
            newUser.email = email.value;
        }
        if(phone.value){
            newUser.phone = phone.value;
        }
        dispatch(signUp(newUser,props) ); 
    }
    return (
        <Container>
        SIGN UP 
        
        <Form>
        <form onSubmit={onSubmit}>
        <input
            id='userId'
            value={userId.value}
            onChange= {userId.onChange}

            placeholder='Enter id'
            required={true}
        ></input>
        <input
            id='name'
            value={name.value}
            onChange= {name.onChange}
            placeholder='Enter name'
            required={true}
        ></input>
        <input
            id='password'
            type='password'
            value={password.value}
            onChange= {password.onChange}
            placeholder='Enter password'
            required={true}
        ></input>
        <input
            id='passwordCheck'
            type='password'
            value={passwordCheck.value}
            onChange= {passwordCheck.onChange}
            placeholder='Enter password again'
            required={true}
        ></input>
        <Line></Line>
        <Text>이 밑의 항목은 선택사항 입니다.</Text>
        <input
            id='email'
            type='email'
            value={email.value}
            onChange= {email.onChange}
            placeholder='Enter email'
            required={false}
        ></input>
        <input
            id='phone'
            value={phone.value}
            onChange= {phone.onChange}
            placeholder='Enter phone'
            required={false}
        ></input>
        <button>submit</button> 
        </form>
        </Form>
    </Container>
    );
}
export default SignUp;