import React  from 'react';
import RecomInfoList from '../recomInfoList/RecomInfoList';
import './RecomInfoWindow.css'

const RecomInfoWindow = ({
    kakaoStreetAddress, kakaoLandAddress ,  setListClickRoadAddress ,setSearchType , searchType , searchData
}) => {

    return (
        <section className='infoWindowContainer'>
            <div className='leftInfo'>
                <div className='infoTitle'>
                    <h1>주소 창</h1>
                </div>
                <ul>
                    <li>
                        도로명 주소 
                        <br /> 
                        {searchType === "mapClick" && (kakaoStreetAddress ? kakaoStreetAddress : "주소가 없습니다.")}
                    </li>
                    <li>
                        지번 주소 
                        <br />
                        {searchType === "mapClick" && (kakaoLandAddress ? kakaoLandAddress : "주소가 없습니다.")}
                    </li>
                </ul>
                <hr />
                <div className='rightInfo'>
                    {/* 버튼 누르기 전 검색 하고 난 후 */}
                    {
                        ( searchData?.data ) ? 
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
                        : 
                        <>
                            <h1 className='rightInfoTitle'>검색어를 입력해주세요</h1>
                        </>
                    }
                </div>
            </div>
        </section>
    );
};

export default RecomInfoWindow;