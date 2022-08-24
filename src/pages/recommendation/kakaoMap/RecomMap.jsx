import React from 'react';
import { useEffect } from 'react';
import './RecomMap.css';
import KakaoMap from './KakaoMap';

const RecomMap = ({ searchType, setSearchType ,  setKakaoStreetAddress , setKakaoLandAddress , searchData , keyword }) => {

    useEffect(() => {
        KakaoMap( searchType,setSearchType ,  setKakaoStreetAddress , setKakaoLandAddress ,searchData , keyword);
    }, [  keyword , searchData , setSearchType]);

    return (
        <div>
            <div id="map" className={'maps'}></div>
        </div>
    );
};

export default RecomMap;