import React from 'react';
import { useEffect } from 'react';
import './RecomMap.css';
import KakaoMap from './KakaoMap';

const RecomMap = ({ keyword, setSearchType ,  setKakaoStreetAddress , setKakaoLandAddress , setSearchData }) => {
    
    useEffect(() => {
        KakaoMap(keyword, setSearchType ,  setKakaoStreetAddress , setKakaoLandAddress , setSearchData);
    }, [keyword, setSearchType ,  setKakaoStreetAddress , setKakaoLandAddress , setSearchData ]);

    return (
        <div>
            <div id="map" className={'maps'}></div>
        </div>
    );
};

export default RecomMap;