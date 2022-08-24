import React , {useEffect} from 'react';
import './RecomInfoList.css'

const RecomInfoList = ({ data,  setListClickRoadAddress ,  setSearchType }) => {
    const test = (e) => {
        if(e.target.className.indexOf('recomAddress') < 0) {
            return;
        }
        // dom 의 부모 요소를 찾기 위해 closest 사용
        const li = e.target.closest('li');
        // 도로명
        const roadSplit = li.innerText.split("지번 주소 : ")[0]
        setListClickRoadAddress(roadSplit)
        // setListClickRoadAddress(li.innerText.split("도로명 주소 : ")[0])
        // 지번
        // setListClickAddress(li.innerText.split("지번 주소 : ")[1])
        setSearchType('list')
    }
    return (
            <li>
                <span onClick={test} className="recomAddress" >
                    {data?.address_name}
                </span> 
            </li>
    );
};

export default RecomInfoList;