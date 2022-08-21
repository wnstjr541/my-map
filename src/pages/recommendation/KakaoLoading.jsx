import React from 'react';
import './KakaoLoading.css'
import ReactLoading from 'react-loading';

const KakaoLoading = () => {
    return (
        // 로딩창 뒤에 검은배경 스타일주기위해 div로 감쌈
        <div className='LoadingContainer'>
            <div>
                {/* react-loading 라이브러리 사용, 라이센스는 readme에 기록. */}
                <ReactLoading type={'spin'} color={'red'} height={'100%'} width={'100%'}/>
            </div>
        </div>
    );
};

export default KakaoLoading;