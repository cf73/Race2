const reorder = (arr, order) => {
  const newArr = new Array(arr.length);
  order && order.forEach((item, i) => {
    newArr[i] = arr[item];
  })
  return newArr;
}

export default reorder
