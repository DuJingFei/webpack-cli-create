
let arrayListTest = [
  1,
  2,
  [3, 4 , 5],
  [6, 7, 
    [ 8, 9, 
      [ 10, 11]
    ]
  ] 
]
  
let resultFlatten = _.flattenDeep(arrayListTest)
  
export default resultFlatten