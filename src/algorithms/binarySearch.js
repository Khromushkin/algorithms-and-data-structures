const BinarySearch = function(array, element) {
    let low = 0;
    let hight = array.length - 1;
    let middle;
    while (low <= hight) {
        middle = Math.round((low + hight) / 2);
        if (array[middle] > element) {
            hight = middle - 1;
        } else if (array[middle] < element) {
            low = middle + 1;
        } else {
            return middle;
        }
    }
};

export default BinarySearch;
