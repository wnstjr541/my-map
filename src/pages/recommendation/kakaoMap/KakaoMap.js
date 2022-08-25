const { kakao } = window; 

// 주소-좌표 변환 객체를 생성합니다
let geocoder = new kakao.maps.services.Geocoder();

export default function kakaoMap(searchType ,setSearchType , setKakaoStreetAddress , setKakaoLandAddress , searchData , keyword) {
    let container = document.getElementById('map'); // 지도를 표시할 div 
   // 카카오맵을 로드하기전 카카오맵을 세팅할 태그의 자식 요소들을 모두 제거한다.
    while(container.firstChild) {
        container.removeChild(container.firstChild);
    }
    // 카카오맵 초기값
    const options = {
        center: new kakao.maps.LatLng(37.48647151051701, 127.02065165954758),
        // 지도 확대 정도
        level: 2
    };
    let map = new kakao.maps.Map(container, options);
    
    // map 기본타입을 위성사진으로
    map.setMapTypeId(kakao.maps.MapTypeId.HYBRID);
    var mapTypeControl = new kakao.maps.MapTypeControl();
    map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);
        

    var marker = new kakao.maps.Marker() // 클릭한 위치를 표시할 마커입니다


    // 지도를 클릭했을 때 클릭 위치 좌표에 대한 주소정보를 표시하도록 이벤트를 등록합니다
    kakao.maps.event.addListener(map, 'click', function(mouseEvent) {
        searchDetailAddrFromCoords(mouseEvent.latLng, function(result, status) {
            setSearchType("mapClick")

                // 포커싱해주는 함수
                kakaoMapPanTo(map, mouseEvent?.latLng?.Ma , mouseEvent?.latLng?.La )
            if (status === kakao.maps.services.Status.OK) {
                setKakaoStreetAddress(result[0]?.road_address?.address_name)
                setKakaoLandAddress(result[0]?.address?.address_name)
                
                // 마커를 클릭한 위치에 표시합니다 
                marker.setPosition(mouseEvent.latLng);
                marker.setMap(map);
            }   
        });
    });

    if(keyword !== '' && searchData?.data ){
        kakaoMapPanTo(map, searchData?.data?.length  ? Number(searchData?.data[0]?.y) :  Number(searchData?.data?.y) , searchData?.data?.length ? Number(searchData?.data[0]?.x) :  Number(searchData?.data?.x));
    }

    if(searchData?.data?.length ){    
        for (var i=0; i<searchData?.data?.length; i++) {
            displayMarker(searchData?.data[i] , map , keyword);    
        }   
    }else{
        displayMarker(searchData?.data , map , keyword);
    }    
}

// 지도에 마커를 표시하는 함수입니다
function displayMarker(place,  map , keyword) {

    var iwContent = place?.place_name, // 인포윈도우에 표시할 내용
        iwRemoveable = true;

    // 인포윈도우를 생성합니다
    var infowindow = new kakao.maps.InfoWindow({
        content: iwContent,
        removable: iwRemoveable
    });


    // 마커를 생성하고 지도에 표시합니다
    var markers = new kakao.maps.Marker({
        map: map,
        position: new kakao.maps.LatLng(place?.y , place?.x)
    });
    if(keyword !== ""){
        markers.setMap(map)
    }else {
        markers.setMap(null)
    }

    // 마커에 클릭이벤트를 등록합니다
    kakao.maps.event.addListener(markers, 'click', function () {
        // 마커를 클릭하면 장소명이 인포윈도우에 표출됩니다
        infowindow.setContent('<div style="padding:5px;font-size:12px;">' + place?.place_name + '</div>');
        infowindow.open(map, markers);
    });

}

function searchDetailAddrFromCoords(coords, callback) {
    // 좌표로 법정동 상세 주소 정보를 요청합니다
    geocoder.coord2Address(coords.getLng(), coords.getLat(), callback);
}


// 해당 위도 경도값에 포커싱해주는 로직
const kakaoMapPanTo = (map, lat, lng ) => {
    let moveLatLng = new kakao.maps.LatLng(lat , lng );
    map.panTo(moveLatLng);
};