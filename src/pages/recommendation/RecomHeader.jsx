import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useRef } from 'react';
import './RecomHeader.css'

const RecomHeader = ({setKeyword ,   setSearchType}) => {
    const keywordRef = useRef();

    const kakaoSearchBtn = () => {
        if(keywordRef.current.value === '') {
            return alert("검색어를 입력해주세요");
        }
        // 클릭 버튼 클릭 후 Map 컴포넌트에 검색어와 검색 타입 전달
        setKeyword(keywordRef.current.value);
        // 타입을 search로 설정해 다른 이벤트들을 조절한다.
        setSearchType('search')
    }

    const inputKeyPress = (e) => {
        if(e.charCode === 13) {
            if(keywordRef.current.value === '') {
                alert("검색어를 입력해주세요");
                return;
            }
            // 엔터 눌렀을때 버튼 클릭함수를 불러온다.
            kakaoSearchBtn()
        }
    };
    const searchFoucs = () =>{
        // 검색 input 클릭했을때 타입을 mapclick값으로 줘서 검색 목록을 없애준다.
        setSearchType('mapClick')
    }

    return (
        <header className='recomeHeader'>
            <section id={'search'}>
                <div className='inputBox' onClick={searchFoucs}>
                    <input type="text" ref={keywordRef} id="keyword" size="15" maxLength='35'  onKeyPress={inputKeyPress} className='inputText'/> 
                </div> 
                <button type="submit" className='searchIcon' onClick={kakaoSearchBtn}>
                    <FontAwesomeIcon icon={faSearch} className="searchSvg"/>
                </button>
            </section>
            <ul id="placesList"></ul>
            <div id="pagination"></div>
        </header>
    );
};

export default RecomHeader;