import RecomMap from './kakaoMap/RecomMap';
import RecomHeader from './RecomHeader';
import KakaoClickModal from './recomModal/KakaoClickModal'
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import RecomInfoWindow from './recomInfoWindow/RecomInfoWindow';
import './RecomHome.css'
import { searchAddressList } from './kakaoMap/addressListUtil';
import KakaoLoading from './KakaoLoading';


const RecomHome = () => {

    // 도로명 주소
    const [kakaoStreetAddress , setKakaoStreetAddress] = useState()
    // 지번 주소
    const [kakaoLandAddress , setKakaoLandAddress] = useState()
    // 검색 키워드
    const [keyword, setKeyword] = useState("")
    // 검색 데이터
    const [searchData, setSearchData] = useState()

    // 랜드북 데이터
    // const [rendData, setRendData] = useState()
    // 검색 타입
    const [searchType, setSearchType] = useState(null);
    // 검색시 최상단 주소값
    const [kakaoSearchAddress , setKakaoSearchAddress ] = useState()
    // 등록 눌렀을때
    const [registModal, setRegistModal] = useState(false)
    // 모달 등록버튼 눌렀을때만 나오고, 나머지 조건은 전부 true
    const [kakaoModalToggle, setKakaoModalToggle] = useState(false)
    
    console.log(searchData) 

    // 로딩
    const [kakaoModalLoading,setKakaoModalLoading] = useState(false)

    useEffect(()=>{
            // 카카오에 키워드를 보내서 검색하는 기능 해당 데이터는 page에 담긴다.
        const paginationCallbcak = (data) => {
            setSearchData(data);
        };
        if(searchType === 'search'){
            // // 주소 보내서 카카오 api를 이용해 검색목록을 얻어온다.
            searchAddressList(keyword , paginationCallbcak);
        }
    },[keyword ])

    return (
        <section className='recomHomeContainer'>
            <article className='mapRegistWarp'>
                {/* 검색시 맵클릭했을때 받아온 주소 초기화 */}
                <RecomHeader setKeyword={setKeyword} setSearchType={setSearchType} setKakaoModalToggle ={setKakaoModalToggle }></RecomHeader>
                    <RecomMap
                        setKakaoStreetAddress={setKakaoStreetAddress} 
                        setKakaoLandAddress={setKakaoLandAddress}
                        keyword={keyword}
                        setSearchType={setSearchType}
                        searchType={searchType}
                        // setSearchData={setSearchData}
                    >
                    </RecomMap>
            </article>

            <article className='recomInfoWarp'>
                <div>
                    <RecomInfoWindow 
                        // 클릭 주소
                        kakaoStreetAddress = {kakaoStreetAddress}
                        kakaoLandAddress = {kakaoLandAddress}

                        keyword={keyword}
                        kakaoSearchAddress={kakaoSearchAddress}

                        setKakaoSearchAddress={setKakaoSearchAddress}

                        // 등록 눌렀을때
                        setRegistModal={setRegistModal}
                        // 카카오 모달 toggle
                        setKakaoModalToggle={setKakaoModalToggle}

                        // 검색시 받는값
                        setSearchType={setSearchType}
                        searchType={searchType}
                    >
                    </RecomInfoWindow>
                </div>
                {
                    ((registModal === true ) && kakaoModalToggle=== false) && 
                    <>
                        {/* <KakaoClickModal 
                            registModal={registModal} 
                            setRegistModal={setRegistModal}
                            retouch={retouch}
                            setRetouch={setRetouch}
                            keyword={keyword}
                            searchType={searchType}
                            setKakaoModalLoading={setKakaoModalLoading}
                        >
                        </KakaoClickModal> */}
                    </>
                    
                }      
                {
                    kakaoModalLoading === true ? 
                    <KakaoLoading>
                    </KakaoLoading>
                    :
                    ""
                }
            </article>
        </section>
    );
};

export default RecomHome;