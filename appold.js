console.time('完成，耗时');
var fs = require('fs');

var xor = 'a4a4';
xor = hex_to_bin(xor);

var dataPath = './1fda765abb59acccf6298691ea381c66.dat';
// var dataPath = './test.txt';

var resPath = './res.js';

//读取文件，获取到二进制数据
fs.readFile(dataPath, { encoding: 'hex' }, function (err, data /** 加密后的十六进制数据*/) {
    if (err) {
        console.log(err);
    } else {
        var res = handleEncrypted(data, xor);   //解密后的十六进制数据
        var hex = Buffer.from(res, 'hex');
        fs.writeFile(resPath, hex, function (err) {
            if (err) {
                console.log('出错！！！：', err);
            }
            // console.log('解密成功！！！');
            console.timeEnd('完成，耗时');
        })
    }
})

// 测试代码
function test() {
    var res = handleEncrypted('5b7c', xor);
    var hex = Buffer.from(res, 'hex');
    fs.writeFile(resPath, hex, function (err) {
        if (err) {
            console.log('出错！！！：', err);
        }
        console.log('解密成功！！！');

    })
    console.log(res);
}

function handleEncrypted(strEncrypted, xor) {
    let strLength = strEncrypted.length;
    var source = '';
    var temp = [];
    for (var i = 0; i < strLength; i = i + 4) {
        var str = strEncrypted.slice(i, i + 4);
        var res = getXor(str);
        temp.push(res);
    }
    source = temp.join('');
    return source;
}

function hex_to_bin(str) {
    let hex_array = [{ key: 0, val: "0000" }, { key: 1, val: "0001" }, { key: 2, val: "0010" }, { key: 3, val: "0011" }, { key: 4, val: "0100" }, { key: 5, val: "0101" }, { key: 6, val: "0110" }, { key: 7, val: "0111" },
    { key: 8, val: "1000" }, { key: 9, val: "1001" }, { key: 'a', val: "1010" }, { key: 'b', val: "1011" }, { key: 'c', val: "1100" }, { key: 'd', val: "1101" }, { key: 'e', val: "1110" }, { key: 'f', val: "1111" }]

    let value = ""
    for (let i = 0; i < str.length; i++) {
        for (let j = 0; j < hex_array.length; j++) {
            if (str.charAt(i) == hex_array[j].key) {
                value = value.concat(hex_array[j].val)
                break
            }
        }
    }
    return value
}

function bin_to_hex(str) {
    let hex_array = [{ key: 0, val: "0000" }, { key: 1, val: "0001" }, { key: 2, val: "0010" }, { key: 3, val: "0011" }, { key: 4, val: "0100" }, { key: 5, val: "0101" }, { key: 6, val: "0110" }, { key: 7, val: "0111" },
    { key: 8, val: "1000" }, { key: 9, val: "1001" }, { key: 'a', val: "1010" }, { key: 'b', val: "1011" }, { key: 'c', val: "1100" }, { key: 'd', val: "1101" }, { key: 'e', val: "1110" }, { key: 'f', val: "1111" }]
    let value = ''
    let list = []
    while (str.length > 4) {
        list.push(str.substring(0, 4))
        str = str.substring(4);
    }
    list.push(str)
    for (let i = 0; i < list.length; i++) {
        for (let j = 0; j < hex_array.length; j++) {
            if (list[i] == hex_array[j].val) {
                value = value.concat(hex_array[j].key)
                break
            }
        }
    }
    return value
}

function getXor(a) {
    let A = hex_to_bin(a)
    let B = xor;

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
    return bin_to_hex(d)
}

