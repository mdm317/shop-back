import React from 'react';
import styled from 'styled-components';
import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const Wrapper = styled.div`

`;


const Container = styled.div`
    position:fixed;
    top:20%;
    left:20%;
    width:60%;
    height:60%;
    background-color:white;
    z-index:10;
    border: 0.5rem solid lightgray;
`;
const Header = styled.div`
    background-color:burlywood;
    padding:5px;
    display:flex;
	justify-content: space-between;
    div{

    }
`;
const SelectorBox = styled.div`
    display:flex;
    width:100%;
    margin: 20px 0;
    div{
        width:50%;
        text-align:center;
        font-size:1.5em;
    }
`;
const InputBox = styled.div`
    position:relative;
    width:100%; 
    input{
        margin-left:10px;
    }
    button{
        background-color:black;
        color:white;
        border-radius: 5px;
        position:absolute;
        right:0;
    }
`;
const ResultBox = styled.div`
    height:50%;
    overflow:auto;
`;
const ResultItem = styled.div`
margin-top:6px;
`;
const ItemColumn = styled.div`
display:flex;
    margin-top:2px;
    div{
        width:60px;
    }
`;

interface Zip{
    address:{
        address_name:string|null
    }|null
    road_address:{
        address_name:string|null
    }|null
}
const REST_API_KEY = "567a54c47eee23ddba2c989729d213d9";
const kakaoUrl = "https://dapi.kakao.com/v2/local/search/address.json?page=1&size=10"
export default ({setmodalVisible,setAddressValueToInput}:
    {setmodalVisible:React.Dispatch<React.SetStateAction<boolean>>,setAddressValueToInput:(adress:string)=>void})=>{
    const [addressInput, setaddressInput] = useState("");
    const [zipList, setzipList] = useState<Zip[]>([]);

    const onAddressInput =(e:React.ChangeEvent<HTMLInputElement>)=>{
        setaddressInput(e.target.value);
    }
    const submitForm = (e:React.FormEvent<HTMLFormElement>)=>{
        
        e.preventDefault();
        addressFindAPI();
    }
    const clickCloseBtn = ()=>{
        setmodalVisible(false);
    }
    const clickAddress = (e:React.MouseEvent<HTMLSpanElement, MouseEvent>)=>{
        const inputcast = e.target as HTMLElement;
        setAddressValueToInput(inputcast.innerText);
        setmodalVisible(false);
    }
    const addressFindAPI = async()=>{
        let response = await axios.get(kakaoUrl+`&query=${addressInput}`,{
            headers:{
                Authorization:`KakaoAK ${REST_API_KEY}`
            }
        });
        /* 
        "meta":{3 items
        "total_count":int1
        "pageable_count":int1
        "is_end":booltrue
        } */
        let list = [];
        let meta = response.data.meta;
        if(meta.total_count===0){
            return toast.error('검색결과가 없습니다. 다른 검색어로 검색해주세요')
        }
        if(meta.total_count>50){
            return toast.error('조금더 자세히 검색해보세요');
        }else{
            list = response.data.documents;

            for(let t=0;t<10;++t){
                if(meta.is_end){
                    break;
                }
                response = await axios.get(kakaoUrl+`&query=${addressInput}`,{
                    headers:{
                        Authorization:`KakaoAK ${REST_API_KEY}`
                    }
                });
                list = [...list, ...response.data.documents];
                meta = response.data.meta;
      
            }
        }
        setzipList(list);
    }
    return(
        // <Wrapper>
            <Container>
                <Header><div>우편번호 검색</div><div onClick={clickCloseBtn}>❌</div></Header>

                <InputBox>
                    <form onSubmit={submitForm}>
                    <label>지번/도로명</label>
                    <input onChange={onAddressInput}></input>
                    <button>검색</button>
                    </form>
                </InputBox>
                <ResultBox>
                    {
                        zipList.map((addr,i)=>(
                            <ResultItem key={i}>
                            <ItemColumn>
                                <div>지번  </div><span onClick={clickAddress}>{addr.address && addr.address.address_name}</span>
                            </ItemColumn>
                            <ItemColumn>
                                <div>도로명 </div><span onClick={clickAddress}>{addr.road_address && addr.road_address.address_name}</span>
                            </ItemColumn>
                            </ResultItem>
                        ))
                    }
                </ResultBox>
            </Container>
        // </Wrapper>
    )
}