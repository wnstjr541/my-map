import React , {useEffect, useState} from 'react';
import RecomInfoList from '../recomInfoList/RecomInfoList';
import './RecomInfoWindow.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight ,  faInfoCircle} from "@fortawesome/free-solid-svg-icons";
import { numberToKorean } from '../../number';

const RecomInfoWindow = ({
    kakaoStreetAddress, kakaoLandAddress ,listClickAddress , address , kakaoSearchAddress , setListClickAddress , keyword , setListClickRoadAddress , listClickRoadAddress ,  setRegistModal , setKakaoModalToggle , page , setKakaoSearchAddress , setSearchType , searchType
}) => {
    const [infoToggle, setInfoToggle] = useState(false)

    const recomModal = (e) =>{
        setRegistModal(true)
        setKakaoModalToggle(false)
    }
    const recomBtn = () => {
        setInfoToggle(!infoToggle)
    }

    // 검색목록 첫번째 주소값 담는 로직
    useEffect(() => {
        // 검색목록이 배열일때
        if(Array.isArray(page?.data) === true){
            // 목록의 첫번째 값을 state에 담기.
            setKakaoSearchAddress(page?.data[0])
        }else {
            // 검색목록이 배열이 아닌 경우기에 직접 값을 담음.
            setKakaoSearchAddress(page?.data)
        }
    } , [page , searchType , keyword])

    return (
        <section className='infoWindowContainer'>
            <div className='leftInfo'>
                <ul>
                    <li>도로명 주소 : 
                        {searchType === "mapClick" && (kakaoStreetAddress ? kakaoStreetAddress : "주소가 없습니다.")}</li>
                    <li>지번 주소 : {searchType === "mapClick" && (kakaoLandAddress ? kakaoLandAddress : "주소가 없습니다.")}</li>
                </ul>
                <h2>
                </h2>
                <button onClick={recomModal} className="infoSendBtn">등록</button>
            </div>
            <div className={(kakaoSearchAddress !== undefined && searchType === "search") ? 'rightInfo' : 'rightInfoNone'}>
                {/* 버튼 누르기 전 검색 하고 난 후 */}
                {(infoToggle === false && (kakaoSearchAddress !== undefined)) === true ?
                    <>
                        <ul>
                            {/* 배열인지 확인후 배열일때만 map처리, 이렇게 한 이유는 상세한 주소값(1339-1)처럼 했을때 받아오는 값이 하나이므로 그때 map돌리면 버그, 하나일때는 하나만 출력되게*/}
                            {  
                                Array.isArray(page.data) === true ?
                                    page && page.data?.map((data,idx) => 
                                        <RecomInfoList data={data} key={idx} setListClickAddress={setListClickAddress} setListClickRoadAddress={setListClickRoadAddress}  setSearchType={setSearchType} searchType={searchType}></RecomInfoList>)
                                        :
                                        <RecomInfoList data={page.data}setListClickAddress={setListClickAddress} setListClickRoadAddress={setListClickRoadAddress} setSearchType={setSearchType} searchType={searchType}></RecomInfoList>
                            }
                        </ul>
                        <button type="submit" className="historyLeftBtn" onClick={recomBtn}>
                            <FontAwesomeIcon icon={faChevronLeft}/>
                        </button> 
                    </>
                    :
                    (infoToggle === true && (kakaoSearchAddress !== undefined)) === true &&
                    <button type="submit" className="historyRightBtn" onClick={recomBtn}>
                        <FontAwesomeIcon icon={faChevronRight}/>
                    </button>
                } 
            </div>
        </section>
    );
};

export default RecomInfoWindow;