
export const numberFormat = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
export const numberToKorean = (number) => {
            let inputNumber  = number < 0 ? false : Math.ceil(number);
            let unitWords    = ['', '만', '억', '조']
            let splitUnit = 10000;
            let splitCount   = unitWords.length;
            let resultArray  = [];
            let resultString = '';
        
            for (let i = 0; i < splitCount; i++){
                let unitResult = (inputNumber % Math.pow(splitUnit, i + 1)) / Math.pow(splitUnit, i);
                //inputNumber 에는 가격 정보들이 전부 포함되어있다. i의 개수는 splitCount의 개수 즉 조까지의 자리수만큼 나눠줌.   
                unitResult = Math.floor(unitResult);
                if (unitResult > 0){
                    resultArray[i] = unitResult;
                }
            }
            
            for (let i = 0; i < resultArray.length; i++){
                if(!resultArray[i]) continue;
                resultString = String(numberFormat(resultArray[i])) + unitWords[i] + resultString;
            }
            return resultString;
    }