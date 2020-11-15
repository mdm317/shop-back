export const findAddress = (
  setzip: React.Dispatch<React.SetStateAction<string>>,
  setaddress: React.Dispatch<React.SetStateAction<string>>
) => {
  new window.daum.Postcode({
    oncomplete: function (data: any) {
      const { address, zonecode } = data;
      setzip(zonecode);
      setaddress(address);
      //cacao 도로명  api 에서 결과를 반환하면 setzip과 setaddress로
      // ordersheet 컴포넌트에 주소를 설정함
    },
  }).open();
};
