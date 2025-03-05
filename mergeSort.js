function mergeSort( nums ) {
    let length = nums.length;
    const hold = [];
    if( length === 1 ) {
        return nums;
    } else {
        let leftLength = Math.floor( length / 2 );
        let rightLength = length - leftLength;
        let leftCounter = 0;
        let rightCounter = 0; 

        //split array in half
        let leftArr = mergeSort(nums.slice(0, leftLength));
        let rightArr = mergeSort(nums.slice(leftLength, length));

        while( ( leftLength !== leftCounter ) || ( rightLength !== rightCounter ) ) {
            //Left or right half finished? append the remainder of the other half
            if ( ( leftLength === leftCounter ) && ( rightLength !== rightCounter ) ) {
                for (let n = rightCounter; n < rightLength; n++ ) {
                    hold.push( rightArr[n]);
                }
                return hold;
            } else if ( ( rightLength === rightCounter ) && ( leftLength !== leftCounter ) ) {
                for (let m = leftCounter; m < rightLength; m++ ) {
                    hold.push( leftArr[m]);
                }
                return hold;

                //Else compare the elements and append the smallest
            } else if ( leftArr[ leftCounter ] < rightArr[ rightCounter ] ) {
                hold.push( leftArr[leftCounter] );
                leftCounter++;
            } else {
                hold.push( rightArr[rightCounter] );
                rightCounter++;
            }
        }

        return hold;

    }
}

export { mergeSort };