import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import {
  addProduct,
  AddProductData,
  addImage,
  editProduct,
} from "../Redux/Product/thunk";
import { useInputNum, useInputStr } from "../Hooks/useInput";
import { Product } from "../Model/db";
import { RouteComponentProps } from "react-router-dom";
import { RootState } from "../Redux/index";
import { toast } from "react-toastify";

const Container = styled.div`
  margin-top: 10vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Column = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  &:not(:last-child) {
    margin-bottom: 7px;
  }
  input {
    height: 30px;
    width: 70%;
    min-width: 100px;
  }
  div {
    width: 120px;
  }
`;
const Form = styled.div`
  padding: 40px;
  padding-bottom: 30px;
  margin-bottom: 15px;
  width: 50vw;

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;

    button {
      margin-top: 10px;
    }
  }
`;

interface Props extends RouteComponentProps {
  product: Product | undefined;
}

export default function AddProduct(props: Props) {
  const dispatch = useDispatch();

  const { product } = props;
  const [name, setName] = useState("");
  const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const elem = e.target as HTMLInputElement;
    setName(elem.value);
  };
  const {
    value: price,
    setValue: setPrice,
    onChange: onChangePrice,
  } = useInputNum(""); //숫자만 넣을수 있는 input
  const {
    value: stock,
    setValue: setStock,
    onChange: onChangeStock,
  } = useInputNum("");
  const {
    value: description,
    setValue: setDescription,
    onChange: onChangeDescription,
  } = useInputStr("");

  const [imgUrls, setimgUrls] = useState<Array<{ url: string; idx: string }>>([
    { url: "", idx: "" }, //삼품이미지
    { url: "", idx: "" }, //썸네일
  ]);
  const imgList = useSelector((state: RootState) => state.product.imagesPath);

  useEffect(() => {
    //product 가 undifined 가 아닌 값이 매개변수에 있으면
    //product 를 수정하는 폼이다.
    //사진은 수정불가
    if (product) {
      setName(product.name);
      setPrice(product.price.toString());
      setStock(product.stock.toString());
      setDescription(product.description);
    }
  }, []);

  const onThumbnail = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const image = e.target.files[0];
      const formData = new FormData();
      formData.append("image", image);
      dispatch(addImage(formData, "0"));
    }
  };
  //사진을 불러오면 일단 s3에 저장을 한다.
  //그리고 redux product 에 이미지의 주소를 저장하고
  //useSelector 로 이미지의 주소를 가져와서
  //아래의 useEffect 코드로 컴포넌트의 state인 imgUrls 에 저장한다.
  //form 이 submit 될때 같이 보낸다
  useEffect(() => {
    const newArr = [...imgUrls];
    imgList.forEach((img) => {
      newArr[Number(img.idx)] = img;
    });
    setimgUrls(newArr);
  }, [imgList]);

  const addImgUrl = () => {
    setimgUrls([...imgUrls, { url: "", idx: "" }]);
  }; //제품 사진을 추가하게 input 을 늘린다.
  const onChangeUrl = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const image = e.target.files[0];
      const formData = new FormData();
      formData.append("image", image);
      dispatch(addImage(formData, e.target.id));
    }
  }; //사진을 불러오면 일단 s3에 저장을 한다.

  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!product) {
      for (let i = 1; i < imgUrls.length; ++i) {
        if (imgUrls[i].url === "") {
          toast.error("잠시후에 시도해주세요");
          return;
        }
      }
    }

    const productForm: AddProductData = {
      name,
      price: Number(price),
      stock: Number(stock),
      imgUrls,
      description,
    };
    if (product) {
      await dispatch(
        editProduct({
          id: product.id,
          name,
          price: Number(price),
          stock: Number(stock),
        })
      );
    } else {
      await dispatch(addProduct(productForm));
    }
    props.history.push("/");
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
                  id="name"
                  value={name}
                  onChange={onChangeName}
                  placeholder="Enter Product Name"
                  required={true}
                ></input>
              </Column>
              <Column>
                <div>상품 가격 : </div>
                <input
                  id="price"
                  value={price}
                  onChange={onChangePrice}
                  placeholder="Enter Price"
                  required={true}
                ></input>
              </Column>

              <Column>
                <div>상품 제고 : </div>

                <input
                  id="stock"
                  value={stock}
                  onChange={onChangeStock}
                  placeholder="Enter stock"
                  required={true}
                ></input>
              </Column>

              <Column>
                <div>상품 설명 : </div>

                <input
                  id="description"
                  value={description}
                  onChange={onChangeDescription}
                  placeholder="Enter description"
                ></input>
              </Column>

              {!product && (
                <>
                  {imgUrls.map((imgUrl, i) => {
                    if (i == 0) {
                      return;
                    }
                    return (
                      <Column key={i}>
                        <div>이미지 {`${i}번`}: </div>
                        <input
                          type="file"
                          id={i.toString()}
                          //  value={imgUrl.url}
                          onChange={onChangeUrl}
                          placeholder={`Enter imageUrl ${i}`}
                          required={true}
                          accept="image/*"
                        ></input>
                        {i == 1 && <p onClick={addImgUrl}>➕</p>}
                      </Column>
                    );
                  })}

                  <Column>
                    <div>썸네일 : </div>

                    <input
                      type="file"
                      id="thumnail"
                      onChange={onThumbnail}
                      placeholder="Enter thumnail"
                      required={false}
                      accept="image/*"
                    ></input>
                  </Column>
                </>
              )}
              <button>submit</button>
            </div>
          </form>
        </Form>
      </Container>
    </>
  );
}
