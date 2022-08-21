const { kakao } = window;

/**
 * 주소 목록 검색
 * keyword 검색 키워드
 * callback 검색 후 콜백함수
 */
const searchAddressList = (keyword, callback) => {
    const kw = !keyword ? ' ' : keyword;
    const kakaoMapPlace = new kakao.maps.services.Places();
    
    // keywordSearch 는 kakao에서 제공하는 함수, keyword를 입력시 결과를 받는다
    // data, status, pagination 값은 받은 값, 이값을 객체화 시켜서 callback의 값으로 넣는다.
    kakaoMapPlace.keywordSearch(kw, (data, status) => {
        if(callback && status) {
            const returnParams = {
                data: (data[0]?.address_name === data[1]?.address_name) ? data[0] : data,
                status: status
            };

            callback(returnParams);
        }
    });
};

export { searchAddressList };