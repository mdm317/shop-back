import React,{useCallback, useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { addProduct, AddProductData, addImage } from '../Redux/Product/thunk';
import { useInputNum, useInputStr, UseInputStr } from '../Hooks/useInput';
import { Product } from '../Model/db';
import { RouteComponentProps } from 'react-router-dom';
import { RootState } from '../Redux/index';


const Container = styled.div`
    margin-top:10vh;
    display:flex;
    flex-direction:column;
    align-items:center;
`;
const Column = styled.div`
    display:flex;
    align-items:center;
    width:100%;
    &:not(:last-child) {
            margin-bottom: 7px;
        }
    input{
        height:30px;
        width: 70%;
        min-width: 100px;
    }
    div{
        width:120px;
    }

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
    
    button {
      margin-top: 10px;
    }
  }
`;

interface Props extends RouteComponentProps {
    product:Product|undefined
}

export default function(props:Props) {
    const {product} = props;
    const makeArr = useCallback(
        (length) => {
            const ar=[];
            for(let i=0;i<length;++i){
                ar.push({url:"", idx:""});
            }
            return ar;
        },
        [],
    )
    useEffect(() => {
        if(product){
            setName(product.name);
            setPrice(product.price.toString());
            setStock(product.stock.toString());
            setDescriptopn(product.description);
            setThumbnail(product.thumbnail?product.thumbnail:"");
        }
    }, [product]);
    const imgList = useSelector((state:RootState) => state.product.imagesPath);
    
    const dispatch = useDispatch();
    // const {value:name, onChange:onChangeName} = useInput<string>("");
    const [name, setName] = useState("");
    const onChangeName = (e:any)=>{
        setName(e.target.value);
    }
    const {value:price,setValue:setPrice,  onChange:onChangePrice} = useInputNum("");
    const {value:stock,setValue:setStock , onChange:onChangeStock} = useInputNum("");
    const {value:description,setValue:setDescriptopn,  onChange:onChangeDescription} = useInputStr("");
    const {value:thumbnail, setValue:setThumbnail, onChange:onThumbnail} = useInputStr("");
    const [imgUrls, setimgUrls] = useState<Array<{url:string,idx:string}>>([{url:"", idx:""}]);

    const addImgUrl = (e:React.MouseEvent<HTMLDivElement, MouseEvent>)=>{
        setimgUrls([...imgUrls, {url:"", idx:""}]);
    };
    useEffect(() => {
        const newArr = [...imgUrls];
        imgList.forEach(img=>{
            newArr[Number(img.idx)] = img;
        });
        // const newArr = makeArr(imgUrls.length);
        // imgList.forEach(img=>{
        //     newArr[Number(img.idx)] = img;
        // });
        // console.log(newArr);
        setimgUrls(newArr);

    }, [imgList])
    const onChangeUrl = (e: React.ChangeEvent<HTMLInputElement>)=>{
        if(e.target.files){
            const image = e.target.files[0];
            const formData = new FormData();
            console.log(formData);
            formData.append("image", image);
            console.log(formData);
            dispatch(addImage(formData,e.target.id));
        }
        // console.log();
        // const inputId = Number(e.target.id);
        // const value = e.target.value;
        // setimgUrls(imgUrls.map((imgUrl, i)=>{
        //     if(i===inputId){
        //         return value;
        //     }
        //     return imgUrl;
        // }));
    }

    


    const submitForm = async(e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        console.log(imgUrls);
        const product:AddProductData = {
            name,
            price:Number(price),
            stock:Number(stock),
            imgUrls,
            description,
            thumbnail
        }
        await dispatch(addProduct(product));
        props.history.push('/');
    };
    const clickAddImage = (e:React.MouseEvent<HTMLButtonElement, MouseEvent>)=>{

    }
    return (
        <>
            <Container>
                ADD PRODUCT
                <Form>
                <form encType="multipart/form-data" onSubmit={submitForm}>
                <div>
                    <Column>
                    <div>상품이름: </div>
                    <input
                    id='name'
                    value={name}
                    onChange= {onChangeName}
                    placeholder='Enter Product Name'
                    required={true}
                ></input>
                    </Column>
                <Column>
                <div>상품 가격 : </div>
                <input
                    id='price'
                    value={price}
                    onChange= {onChangePrice}
                    placeholder='Enter Price'
                    required={true}
                ></input> 
                </Column>
              
                <Column>
                <div>상품 제고 : </div>
               
                <input
                    id='stock'
                    value={stock}
                    onChange= {onChangeStock}
                    placeholder='Enter stock'
                    required={true}
                ></input>
                </Column>

                <Column>
                <div>상품 설명 : </div>

                 <input
                    id='description'
                    value={description}
                    onChange= {onChangeDescription}
                    placeholder='Enter description'
                ></input> 
                </Column>
     

              
                {imgUrls.map((imgUrl,i)=>(
                     <Column key={i}>
                        <div>이미지 {`${i+1}번`}: </div>
                        <input 
                        multiple 
                        type="file"
                        
                     id={i.toString()}
                    //  value={imgUrl.url}
                     onChange={onChangeUrl}
                     placeholder={`Enter imageUrl ${i}`}
                     required={true}
                    ></input>
                    {i==0 && <p onClick={addImgUrl}>➕</p>}
                 </Column>
                ))}
  
                <Column>
                <div>썸네일 : </div>

                   <input
                    id='thumnail'
                    value={thumbnail}
                    onChange= {onThumbnail}
                    placeholder='Enter thumnail'
                    required={false}
                ></input>
                  </Column>
                <button>submit</button> 
                </div>
                  </form>
                </Form>
            </Container>
            
        </>
    );
}
