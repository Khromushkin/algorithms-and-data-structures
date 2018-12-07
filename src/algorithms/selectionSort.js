const SelectionSort = function(array) {
    let newArray = [];
    let arrayLenght = array.length;
    const findSmallest = function(array) {
        let smallestValue = array[0];
        let smallestIndex = 0;
        for (const [index, value] of array.entries()) {
            if (value < smallestValue) {
                smallestValue = value;
                smallestIndex = index;
            }
        }

        return smallestIndex;
    };
    for (let i = 0; i < arrayLenght; i++) {
        let smallestIndex = findSmallest(array);
        let smallestValue = array[smallestIndex];
        array.splice(smallestIndex, 1);
        newArray.push(smallestValue);
    }

    return newArray;
};
export default SelectionSort;
