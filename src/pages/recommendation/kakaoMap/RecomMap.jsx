import React from 'react';
import { useEffect } from 'react';
import './RecomMap.css';
import KakaoMap from './KakaoMap';

const RecomMap = ({ searchType, setSearchType ,  setKakaoStreetAddress , setKakaoLandAddress , searchData }) => {
    
    useEffect(() => {
        KakaoMap( searchType,setSearchType ,  setKakaoStreetAddress , setKakaoLandAddress ,searchData);
    }, [setSearchType ,  setKakaoStreetAddress , setKakaoLandAddress , searchData ]);

    return (
        <div>
            <div id="map" className={'maps'}></div>
        </div>
    );
};

export default RecomMap;