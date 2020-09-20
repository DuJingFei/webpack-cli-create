let arrayList = [ 
    { id: 1, name: '那撸多'},
    { id: 2, name: '啥是gay'},
    { id: 3, name: '卡卡西' },
    { id: 4, name: '继来耶' }
  ]
  
  let aimObj = _.findIndex(arrayList, { id: 3 })
  
  if (arrayList[aimObj]) {
    console.log('最终结果是：', arrayList[aimObj].name);
  }

  export default arrayList[aimObj]