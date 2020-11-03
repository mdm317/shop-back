import React,{useCallback, useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { addProduct, AddProductData, addImage, editProduct } from '../Redux/Product/thunk';
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
    const [name, setName] = useState("");
    const onChangeName = (e:any)=>{
        setName(e.target.value);
    }
    const {value:price,setValue:setPrice,  onChange:onChangePrice} = useInputNum("");
    const {value:stock,setValue:setStock , onChange:onChangeStock} = useInputNum("");
    const {value:description,setValue:setDescriptopn,  onChange:onChangeDescription} = useInputStr("");
    // const {value:thumbnail, setValue:setThumbnail, onChange:onThumbnail} = useInputStr("");
    // const [thumbnail, setthumbnail] = useState({url:"", idx:""});
    const [imgUrls, setimgUrls] = useState<Array<{url:string,idx:string}>>([{url:"", idx:""},{url:"", idx:""}]);
    const imgList = useSelector((state:RootState) => state.product.imagesPath);
    useEffect(() => {
        if(product){
            setName(product.name);
            setPrice(product.price.toString());
            setStock(product.stock.toString());
            setDescriptopn(product.description);
        }
    }, []);
   
    const onThumbnail = (e: React.ChangeEvent<HTMLInputElement>)=>{
        if(e.target.files){
            const image = e.target.files[0];
            const formData = new FormData();
            formData.append("image", image);
            dispatch(addImage(formData,"0"));
        }
    }
    const dispatch = useDispatch();
    // const {value:name, onChange:onChangeName} = useInput<string>("");

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
            formData.append("image", image);
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
        const productForm:AddProductData = {
            name,
            price:Number(price),
            stock:Number(stock),
            imgUrls,
            description,
        }
        if(product){
            await dispatch(editProduct({
                id:product.id,
                name,
                price:Number(price),
                stock:Number(stock),}))
        }else{

            await dispatch(addProduct(productForm));
        }
        props.history.push('/');
    };
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
     
                {!product &&
                <>
                {imgUrls.map((imgUrl,i)=>{
                    if(i==0){
                        return ;
                    }
                    return (
                    <Column key={i}>
                        <div>이미지 {`${i}번`}: </div>
                        <input 
                        type="file"
                        id={(i).toString()}
                        //  value={imgUrl.url}
                        onChange={onChangeUrl}
                        placeholder={`Enter imageUrl ${i}`}
                        required={true}
                        accept="image/*"
                    ></input>
                    {i==1 && <p onClick={addImgUrl}>➕</p>}
                 </Column>
                )})}
  
                <Column>
                <div>썸네일 : </div>

                   <input
                    type="file"
                    id='thumnail'
                    onChange= {onThumbnail}
                    placeholder='Enter thumnail'
                    required={false}
                    accept="image/*"
                ></input>
                  </Column>
                </>
                }
                <button>submit</button> 
                </div>
                  </form>
                </Form>
            </Container>
            
        </>
    );
}
