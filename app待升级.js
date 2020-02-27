console.time('完成，耗时');
var fs = require('fs');

var xor = 'a4a4';   //异或值
xor = parseInt(xor,16).toString(2);

var dataPath = './1fda765abb59acccf6298691ea381c66.dat';    //要解密的文件路径

var resPath = './res.jpg';

//读取文件，获取到十六进制数据
fs.readFile(dataPath, { encoding: 'hex' }, function (err, data /** 加密后的十六进制数据*/) {
    if (err) {
        console.log(err);
    } else {
        var res = handleEncrypted(data, xor);   //解密后的十六进制数据
        var hex = Buffer.from(res, 'hex');  //转为十六进制
        fs.writeFile(resPath, hex, function (err) {
            if (err) {
                console.log('出错：', err);
            }
            console.timeEnd('完成，耗时');
        })
    }
})
function handleEncrypted(strEncrypted, xor) {
    let strLength = strEncrypted.length;
    var source = '';
    var list = [];
    for (var i = 0; i < strLength; i = i + 4) {
        var str = strEncrypted.substring(0,4);
        strEncrypted = strEncrypted.substring(4);
        var res = getXor(str);
        list.push(res);
    }
    source = list.join('');
    return source;
}

//十六进制转二进制
function hexToBin(str) {
    str = parseInt(str,16).toString(2);
    var len = str.length;
    if(len<)


    return value;
}

//二进制转十六进制
function binToHex(str) {
    
    return value;
}

function getXor(a) {
    let A = parseInt(a,16).toString(2);
    console.log(a,A);
    
    let B = xor;
    let d = ""
    for (let i = 0; i < A.toString().length; i++) {
        if (A.toString()[i] == B.toString()[i]) {
            let q = "0";
            d = d.concat(q);
        } else {
            let p = "1";
            d = d.concat(p);
        }
    }
    return binToHex(d);
}

