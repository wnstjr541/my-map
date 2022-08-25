import RecomMap from './kakaoMap/RecomMap';
import RecomHeader from './RecomHeader';
import KakaoClickModal from './recomModal/KakaoClickModal'
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import RecomInfoWindow from './recomInfoWindow/RecomInfoWindow';
import './RecomHome.css'
import { searchAddressList } from './kakaoMap/addressListUtil';

const RecomHome = () => {

    // 도로명 주소
    const [kakaoStreetAddress , setKakaoStreetAddress] = useState()
    // 지번 주소
    const [kakaoLandAddress , setKakaoLandAddress] = useState()
    // 검색 키워드
    const [keyword, setKeyword] = useState("")
    // 검색 데이터
    const [searchData, setSearchData] = useState()

    // 검색 타입
    const [searchType, setSearchType] = useState(null);

    useEffect(  ()=>{
        // 카카오에 키워드를 보내서 검색하는 기능 해당 데이터는 page에 담긴다.
        const paginationCallbcak = (data) => {
            setSearchData(data);
        };
        if(searchType === 'search'){
            // 주소 보내서 카카오 api를 이용해 검색목록을 얻어온다.
            searchAddressList(keyword , paginationCallbcak );
        }
    },[keyword ])

    useEffect(()=>{
        if(keyword !== '' && searchData?.data && searchType=== 'mapClick'){
            setKeyword("")
        }
    },[searchData])


    return (
        <section className='recomHomeContainer'>
            <article className='mapRegistWarp'>
                {/* 검색시 맵클릭했을때 받아온 주소 초기화 */}
                <RecomHeader setKeyword={setKeyword} setSearchType={setSearchType} ></RecomHeader>
                    <RecomMap
                        setKakaoStreetAddress={setKakaoStreetAddress} 
                        setKakaoLandAddress={setKakaoLandAddress}
                        setSearchType={setSearchType}
                        searchType={searchType}
                        searchData={searchData}
                        keyword={keyword}
                    >
                    </RecomMap>
            </article>

            <article className='recomInfoWarp'>
                <div>
                    <RecomInfoWindow 
                        // 클릭 주소
                        kakaoStreetAddress = {kakaoStreetAddress}
                        kakaoLandAddress = {kakaoLandAddress}

                        // 검색시 받는값
                        setSearchType={setSearchType}
                        searchType={searchType}
                        searchData={searchData}
                    >
                    </RecomInfoWindow>
                </div>
                {/* {
                    (registModal === true ) && 
                    <>
                        <KakaoClickModal 
                            registModal={registModal} 
                            setRegistModal={setRegistModal}
                            keyword={keyword}
                            searchType={searchType}
                        >
                        </KakaoClickModal>
                    </>
                } */}
            </article>
        </section>
    );
};

export default RecomHome;