// import React, { useEffect, useRef } from 'react';
// import { useState } from 'react';
// import { numberToKorean } from '../../number';
// import './KakaoClickModal.css'

// const KakaoClickModal = ({retouch, registModal , setRetouch , setRegistModal ,  listClickAddress , rendData , kakaoSearchAddress ,keyword , searchType , setKakaoModalLoading}) => {
//     // 파일 담는곳.
//     const [fileImage, setFileImage] = useState()
//     // javascript 파일 담는곳.
//     const [originFileImage, setOriginFileImage] = useState()
//     // 클릭과 검색시 최상단 지번주소, 목록 클릭시 지번주소가 담겨있는 state
//     const [kakaoModalAddress, setKakaoModalAddress] = useState()
//     //전체지분
//     const [totalUnitS , setTotalUnit] = useState(); //총 100개의 지분으로 판매하겠다고 설정 함.
//     //기간 시작
//     const [startDateS , setStartDate] = useState()
//     //기간 종료
//     const [endDateS , setEndDate] = useState()
//     //1인당 구매한도(개수)
//     const [quantityLimitPerPersonS , setQuantityLimitPerPerson] = useState()
//     //성격
//     const [rRecommendationTypeNameS , setRRecommendationTypeName] = useState()
//     //마케팅 문구
//     const [oneSentenceS , setOneSentence] = useState()
//     //소개문구
//     const [descriptionS , setDescription] = useState()
//     //건물이름
//     const [buildingAliasS , setBuildingAlias] = useState()

//     // 할인율 포커스
//     const [saleBlur , setSaleBlur] = useState(false)
//     // 할인율 텍스트
//     const [offRatioS , setOffRatio] = useState("")

//     // 할인가 포커스
//     const [discountFocus, setDiscountFocus] = useState(false)
//     // 할인가 텍스트
//     const [disCountPriceText , setDisCountPriceText] = useState("")

//     const saleInputBlur = () => {
//         setSaleBlur(false)
//         // if(offRatioS?.indexOf('%') === -1){
//         //     setOffRatio(offRatioS + "%")
//         // }
//         if(Number(offRatioS) >= 100){
//             alert("할인율이 100% 이상입니다. 100% 미만으로 설정해주세요.")
//         }
//     }
//     const saleInputFocus = () => {
//         setSaleBlur(true)
//         if(typeof(offRatioS) === "string" && offRatioS?.indexOf('%') !== -1){
//             setOffRatio(offRatioS?.replace('%' , ""))
//         }
//     }

//     const discountPriceFocus = () => {
//         setOffRatio("")
//         setDiscountFocus(true)
//     }
//     const discountPriceBlur = () => {
//         setDiscountFocus(false)
//     }

//     // 
//     useEffect(()=>{
//         // 할인율 포커스시
//         if(saleBlur === true){
//             // 할인가 텍스트 빈값
//             setDisCountPriceText("")
//         }else if(offRatioS !== "" && disCountPriceText === ""){
//             // 메타렉스 가격
//             let metaPrice = rendData?.estimated_price?.estimated_lot_price && Math.ceil((rendData?.estimated_price?.estimated_lot_price) * 0.00003);
//             let priceRatioUrl = (offRatioS,metaPrice) => `api/item-management/add-item/price-by-ratio?offRatio=${encodeURI(offRatioS)}&priceBeforeDiscount=${encodeURI(metaPrice)}`
//             .then(res=> setDisCountPriceText(res.data.data))
//             .catch(e => {
//                 console.log(`request item error : ${e}`);
//             });   
//         }
//     },[offRatioS , saleBlur,discountFocus])


//     // 전체지분 숫자만 
//     useEffect(()=>{
//         if(totalUnitS !== ""){
//             setTotalUnit(totalUnitS?.replace(/[^0-9]/g, '')?.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, ""))
//         }
//     },[totalUnitS , quantityLimitPerPersonS])

//     // 1인당 구매한도 숫자만
//     useEffect(()=>{
//         if(quantityLimitPerPersonS !== " "){
//             setQuantityLimitPerPerson(quantityLimitPerPersonS?.replace(/[^0-9]/g, '')?.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, ""))
//         }
//     },[ quantityLimitPerPersonS])

//     // 배경이미지 담는 변수
//     const recomFile = (e) => {
//         // 10mb보다 클시 alert창 띄우고 해당 값을 비워준다. 그로써 같은 파일을 클릭했을때 alert창이 뜨도록 변경. 
//         if(e.target.files[0].size >= 1e+7){
//             alert("파일 용량을 10mb이하인 것으로 업로드 해주세요")
//             e.target.value=""
//             return;
//         }
//         backgroundLoading(e.target.files[0])
//         // 이미지 전송위해 파일을 통째로 담는다.
//         setOriginFileImage(e.target.files[0]) 
//     }

//     // 배경 이미지 로딩
//     const backgroundLoading = (imgData) => {
//         // 이미지가 로드되기전 로딩활성화
//         setKakaoModalLoading(true)
//         let imgEle = new Image;
//         imgEle.setAttribute('src', '/');

//         // 이미지가 로드 된 후에 설정할 로직
//         imgEle.onload = function() {
//             // 이미지가 로드되었기에 로딩을 비활성화
//             setKakaoModalLoading(false)
//             // 배경이미지에 이미지를 띄우기 위해 url로 따로 담음
//             setFileImage(URL.createObjectURL(imgData));
//         };
//         imgEle.src = URL.createObjectURL(imgData);
//     }

//     // 닫기 버튼
//     const recomModalToggle = () => {
//         if(retouch === true){
//             setRetouch(false)
//         }else if(registModal === true){
//             setRegistModal(false)
//         }
//     }

//     useEffect(()=>{
//         // 맵 클릭안했을때
//         if(searchType !== 'mapClick'){
//             // 검색어가 있고, 검색목록 클릭 안했을때 주소 담는 로직
//             if(keyword !== "" && !listClickAddress && address === ""){
//                 setKakaoModalAddress(kakaoSearchAddress && kakaoSearchAddress?.address_name)
//             // 검색목록 클릭했을때 주소 담는 로직
//             }else if(listClickAddress && listClickAddress !== ""){
//                 setKakaoModalAddress(listClickAddress)
//             }
//         }else{
//             // 맵클릭했을때 주소 담김
//             setKakaoModalAddress(address.address?.address_name)
//         }
//     },[listClickAddress ,  searchType , address])

//     // 기본값은 추천매물, 일반매물 클릭시 일반매물 === General값이 담김
//     const [selectData, setSelectData] = useState({ "추천매물" : 'suggestion'});

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setSelectData({
//             [name]: value,
//         });
//     };

//     return (
//         <article className='recomModalContainer'>
//             <button onClick={recomModalToggle}>x</button>
//             <div action="">
//                 <div className='saleToggle'>
//                     <div>
//                         <label htmlFor="General">일반매물</label> 
//                         <input
//                             type="radio"
//                             id="General"
//                             name="일반매물"
//                             value="General"
//                             onChange={handleChange}
//                             checked={selectData['일반매물'] === "General"}
//                         >
//                         </input>
//                     </div>
//                     <div>
//                         <label htmlFor="suggestion">추천매물</label>
//                         <input
//                             type="radio"
//                             name="추천매물"
//                             id="suggestion"
//                             value="suggestion"
//                             onChange={handleChange}
//                             checked={selectData['추천매물'] === "suggestion"}
//                         >
//                         </input>
//                     </div>
//                 </div>
//                 {
//                     // 추천매물 선택시
//                     selectData['추천매물'] === "suggestion"  ?
//                         <>
//                             <div>
//                                 <span>전체지분</span>
//                                 <input name="totalUnit" min="0" type="text" onChange={(e) => setTotalUnit(e.target.value)} value={totalUnitS ? totalUnitS : ""}/>
//                             </div>
//                             <div className='dateContainer'>
//                                 <span>기간</span>
//                                 <input name="startDate" type="date" onChange={(e) => setStartDate(e.target.value)}/> ~ <input name="endDate" type="date" onChange={(e) => setEndDate(e.target.value)}/> 
//                             </div>
//                             <div>
//                                 <span>1인당 구매 한도</span>
//                                 <input name="quantityLimitPerPerson" min="0" type="text" onChange={(e) => setQuantityLimitPerPerson(e.target.value)} value={quantityLimitPerPersonS ? quantityLimitPerPersonS : ""}/>
//                             </div>
//                             <div>
//                                 <span>배경이미지</span>
//                                     {
//                                         fileImage &&
//                                         <img src={fileImage} alt="이미지" className='fileImg'/>
//                                     }
//                                     <input name="배경이미지" type="text" defaultValue={fileImage?.[0].name} readOnly/>
//                                     <label className='imageSearchBtn' htmlFor="bg-image" >찾아보기</label>
//                                 <form>
//                                     <input type='file' id="bg-image" onChange={recomFile} style={{display:"none"}}></input>
//                                 </form>
//                             </div>
//                             <div>
//                                 <span>성격</span>
//                                 <input name="rRecommendationTypeName" type="text" onChange={(e) => setRRecommendationTypeName(e.target.value)}/>
//                             </div>
//                             <div>
//                                 <span>마케팅 문구</span>
//                                 <input name="oneSentence" type="text" onChange={(e) => setOneSentence(e.target.value)}/>
//                             </div>
//                             <div>
//                                 <span>소개 문구</span>
//                                 <input name="description" type="text" onChange={(e) => setDescription(e.target.value)}/>
//                             </div>
//                             <div>
//                                 <span>건물이름</span>
//                                 <input name="buildingAlias" type="text" onChange={(e) => setBuildingAlias(e.target.value)}/>
//                             </div>
//                             <div>
//                                 <span>할인율 (%)</span>
//                                 <input name="offRatio" type="text" maxLength={5} onChange={(e) => setOffRatio(e.target.value.replace(/[^0-9.-]/g, ''))} onFocus={saleInputFocus} onBlur={saleInputBlur} value={offRatioS !== "" ? (saleBlur === false ? offRatioS + '%': offRatioS) : "" } />
//                             </div>
//                             <div>
//                                 <span>할인가</span>
//                                 {/* numberToKorean이 함수는 숫자를 억 만 단위로 변환해줌 */}
//                                 <input name="할인가" type="text" onFocus={discountPriceFocus} onBlur={discountPriceBlur} onChange={(e) => setDisCountPriceText(e.target.value.replace(/[^0-9.-]/g, ''))} value={disCountPriceText  !== "" ? numberToKorean(disCountPriceText) + "원": ""}/>
//                             </div>
//                         </>
//                         :
//                         ""
//                 }
                
//             </div>
//             <ul>
//                 <li>
//                     <span>주소</span><input type="text" value= {kakaoModalAddress ? kakaoModalAddress : ""} readOnly/>
//                 </li>
//                 <li>
//                     <span>면적</span><input type="text" name="전체 지분" value={
//                         rendData?.parcel_info?.area ?
//                         Math.round(rendData?.parcel_info?.area / 3.3) + "평" : ""} readOnly/>
//                 </li>
//                 <li>
//                     <span>매입가</span><input type="text" name="전체 지분" value={
//                         rendData?.estimated_price?.estimated_lot_price ? 
//                         numberToKorean((rendData?.estimated_price?.estimated_lot_price) * 0.00003)+"원" : ""} readOnly/>
//                 </li>
//             </ul>
//             {
//                 (retouch === true && registModal === false) ?
//                 <button>
//                     수정 완료
//                 </button>
//                 : 
//                 (retouch === false && registModal === true) &&
//                 <button >
//                     신규 매물 등록
//                 </button>
//             }
//         </article>
//     );
// };

// export default KakaoClickModal;