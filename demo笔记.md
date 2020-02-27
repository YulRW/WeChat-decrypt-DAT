

做demo遇到的难点和问题：

- 不知道哪个文件解密的思路和过程，获取那个异或值是干什么用的？：已解决：通过异或值的逆运算可以计算出源文件的十六进制值。所以我们只要找到一组对应的十六进制关系，计算出他的异或值映射关系，就可以通过这个映射关系来计算出源文件的所以十六进制值。而因为大部分jpg文件的十六进制开头都是一个固定的十六进制，因此可以先得出异或值，再用这个异或值来解密

- 想升级node到最新，看教程安装了`n` 但是使用不了，弹出`'bash' 不是内部或外部命令，也不是可运行的程序` [https://blog.csdn.net/guzhao593/article/details/81712016](https://blog.csdn.net/guzhao593/article/details/81712016)  

- node里面不知道怎么用fs.readFile把获取的二进制文件转换成十六进制的：解决---》在fs.readFile的第二个参数加`'hex'`就可以了

- 网站上搜索到了`Node.js使用Buffer类处理二进制数据` [https://www.jianshu.com/p/6d7060df1fb3](https://www.jianshu.com/p/6d7060df1fb3)

- 搜索了十六进制异或运算：https://blog.csdn.net/lixiwoaini/article/details/82179094

- 做出的失败：得到的结果是字符串，是原文，而不是真正的十六进制文件。而且计算结果也有错误：解决：=》异或值有问题，异或值应该是小写。。。

- 查如何生成十六进制文件：https://www.cnblogs.com/lalalagq/p/9908495.html-- Buffer转换成十六进制数据

- 发现原来大量的console.log()

- 优化：slice

  - https://www.cnblogs.com/yuan2333/p/8848413.html--》而如果是收集字符串，比如多次对同一个字符串进行+=操作的话，最好使用一个缓存，使用JavaScript数组来收集，最后使用join方法连接起来
  - https://www.jb51.net/article/40766.htm
  - https://www.cnblogs.com/liyunhua/p/4529086.html
  - https://www.cnblogs.com/wangpenghui522/p/5407388.html

- 优化问题：神奇，优化了for循环后效率大增，从2000ms左右优化到了350ms左右...太快了！

  - ```javascript
    //优化前
    for(let i=0;i<list.length;i++){
            for(let j=0;j<hex_array.length;j++){
                if(list[i]==hex_array[j].bin){
                    value = value.concat(hex_array[j].hex)
                    break
                }
            }
        }
    
    //优化后
    for (let i = 0; i < list.length; i++) {
    
            obj = hex_array.find(function (item) {
                return item.bin == list[i];
            });
            value += obj.hex;
    
     }
    ```

  - 而且，这个优化是在二进制转十六进制的for循环优化里面优化了效率才明显，在十六进制转二进制里面修改了没多大影响

  - 研究：

    - 在旧的for循环里面 ，测试了time时间，发现每50次产生一个时间花费比较多的for循环一次
    - 而在新的for循环里面，不仅每次for循环时间缩短了，而且没有产生延迟大的for循环，时间均匀

  - parseInt和toString的结合可以便捷地转换进制数

    - 问题：但是这个会把前面的0省略--》要写一个补0的函数

- node创建文件https://www.jianshu.com/p/a183845066e4

- console.time的使用

- 优化2：把多余的toString删除，优化到了260ms左右

- 微信图片文件夹里好像有些文件的开头不一样，可能是异或值变了？但是经我多个图片测试，每个固定后缀的文件他们的十六进制前面4个字符都是一样的

  - 在网页中找到了文件后缀对应的十六进制开头https://blog.csdn.net/a627428179/article/details/95485146

- 发现：如果把一次十六进制异或运算的的长度减小到2（原来是4），那么运算时间增加了1/5左右

  - 探究：如果把字符串改长会如何？--》长度变6，速度有效改善--》加了大概9%
  - ---->当长度变为10时，速度更快

- 如何打包node文件为exe？

  - 了解到了electron--》用js写桌面应用

