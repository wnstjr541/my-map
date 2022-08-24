import React , {useEffect, useState} from 'react';
import RecomInfoList from '../recomInfoList/RecomInfoList';
import './RecomInfoWindow.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight ,  faInfoCircle} from "@fortawesome/free-solid-svg-icons";
import { numberToKorean } from '../../number';

const RecomInfoWindow = ({
    kakaoStreetAddress, kakaoLandAddress ,  keyword , setListClickRoadAddress , kakaoSearchAddress , setKakaoSearchAddress ,setRegistModal, setKakaoModalToggle, setSearchType , searchType , searchData
}) => {
    const [infoToggle, setInfoToggle] = useState(false)

    const recomModal = (e) =>{
        setRegistModal(true)
        setKakaoModalToggle(false)
    }
    const recomBtn = () => {
        setInfoToggle(!infoToggle)
    }

    // // 검색목록 첫번째 주소값 담는 로직
    // useEffect(() => {
    //     // 검색목록이 배열일때
    //     if(Array.isArray(searchData?.data) === true){
    //         // 목록의 첫번째 값을 state에 담기.
    //         setKakaoSearchAddress(searchData?.data[0])
    //     }else {
    //         // 검색목록이 배열이 아닌 경우기에 직접 값을 담음.
    //         setKakaoSearchAddress(searchData?.data)
    //     }
    // } , [searchData , searchType , keyword])


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
                <div className={( searchType === "search") ? 'rightInfo' : 'rightInfoNone'}>
                    {/* 버튼 누르기 전 검색 하고 난 후 */}
                    {
                        <>
                            <ul>
                                {  
                                    Array.isArray(searchData?.data) === true ?
                                        searchData?.data?.map((data,idx) =>
                                            <RecomInfoList data={data} key={idx} setListClickRoadAddress={setListClickRoadAddress}  setSearchType={setSearchType}></RecomInfoList>)
                                            :
                                            <RecomInfoList data={searchData?.data} setListClickRoadAddress={setListClickRoadAddress} setSearchType={setSearchType} searchType={searchType}
                                            >

                                            </RecomInfoList>
                                }
                            </ul>
                        </>
                    } 
                </div>
            </div>
        </section>
    );
};

export default RecomInfoWindow;