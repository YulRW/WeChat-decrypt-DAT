/*
 * @Author: your name
 * @Date: 2020-02-01 17:52:01
 * @LastEditTime : 2020-02-01 17:56:40
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \dat-demo\test.js
 */

function hex_to_bin(str) {
    let hex_array = [{key:0,val:"0000"},{key:1,val:"0001"},{key:2,val:"0010"},{key:3,val:"0011"},{key:4,val:"0100"},{key:5,val:"0101"},{key:6,val:"0110"},{key:7,val:"0111"},
        {key:8,val:"1000"},{key:9,val:"1001"},{key:'a',val:"1010"},{key:'b',val:"1011"},{key:'c',val:"1100"},{key:'d',val:"1101"},{key:'e',val:"1110"},{key:'f',val:"1111"}]

    let value=""
    for(let i=0;i<str.length;i++){
        for(let j=0;j<hex_array.length;j++){
            if(str.charAt(i)== hex_array[j].key){
                value = value.concat(hex_array[j].val)
                break
            }
        }
    }
    // console.log(value)
    return value
}



function bin_to_hex(str) {
    let hex_array = [{key:0,val:"0000"},{key:1,val:"0001"},{key:2,val:"0010"},{key:3,val:"0011"},{key:4,val:"0100"},{key:5,val:"0101"},{key:6,val:"0110"},{key:7,val:"0111"},
        {key:8,val:"1000"},{key:9,val:"1001"},{key:'a',val:"1010"},{key:'b',val:"1011"},{key:'c',val:"1100"},{key:'d',val:"1101"},{key:'e',val:"1110"},{key:'f',val:"1111"}]
    let value = ''
    let list=[]
    // console.log(str)
    if(str.length%4!==0){
        let a = "0000"
        let b=a.substring(0,4-str.length%4)
        str = b.concat(str)
    }
    // console.log(str)
    while (str.length > 4) {
        list.push(str.substring(0, 4))
        str = str.substring(4);
    }
    list.push(str)
    // console.log(list)
    for(let i=0;i<list.length;i++){
        for(let j=0;j<hex_array.length;j++){
            if(list[i]==hex_array[j].val){
                value = value.concat(hex_array[j].key)
                break
            }
        }
    }
    // console.log(value)
    return value
}


function xor(a, b) {
    let A = hex_to_bin(a)
    let B = hex_to_bin(b)
    // console.log(a + "   a的二进制:" + A)
    // console.log(b + "   b的二进制:" + B)
    let o = "00000000000000000000000000000000000"
    if (A.toString().length > B.toString().length) {
        let c = A.toString().length - B.toString().length
        B = o.substr(0, c).concat(B)
    } else if (A.toString().length < B.toString().length) {
        let c = B.toString().length - A.toString().length
        A = o.substr(0, c).concat(A)
    }
    // console.log('B:' + B)
    // console.log('A:' + A)
    let d = ""
    for (let i = 0; i < A.toString().length; i++) {
        if (A.toString()[i] == B.toString()[i]) {
            let q = "0"
            d = d.concat(q)
        } else {
            let p = "1"
            d = d.concat(p)
        }
    }
    // console.log(bin_to_hex(d))
    return bin_to_hex(d)
}

var res = xor('5b7c','a4a4');
console.log(res);
