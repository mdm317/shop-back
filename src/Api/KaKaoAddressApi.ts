import { useDispatch } from 'react-redux';
import { action } from 'typesafe-actions';
export const findAddress = (
    setzip:React.Dispatch<React.SetStateAction<string>>,
    setaddress:React.Dispatch<React.SetStateAction<string>>)=>{
    new window.daum.Postcode({
        oncomplete: function(data:any) {
            const {address, zonecode}= data;
            setzip(zonecode);
            setaddress(address);
            // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분입니다.
            // 예제를 참고하여 다양한 활용법을 확인해 보세요.
        }
    }).open();
}

