/**
 * 
 * 
 * 
 * 自己搭建一个服务器，我们的数据存在json格式里面
 * 
 */
//先引入模块
const http = require('http');
const fs = require('fs');
const template = require('art-template')
const url = require('url')
//创建服务器
const server = http.createServer();
//绑定ip和端口
server.listen(8080,()=>{
    console.log('服务器已搭建好，可通过 http://127.0.0.1:8080 访问 ')
})
//注册request事件
server.on('request',(req,res)=> {
    //判断用户输入的文件名开头是什么
    if(req.url.startsWith('/assets')){
        //判断url结尾是什么
        if(req.url.endsWith('.css')){
            //设置一个响应头
            res.setHeader('Content-Type','text/css')
        }
        //读取文件
        fs.readFile('.' + req.url,(err,data)=> {
            //我们这里不适用throw，因为不是严谨的地方
            // if(err) console.log(err)
            //返回data
            res.end(data);
        });
    }else{
        //用url.parse，获取url后面的所有内容
        //里面放了true就会自动帮我们把内容转换为对象，我们拿出来用就可以了
        let result = url.parse(req.url,true)
        //取消一次ajax请求
        //我们直接处理主页
        if(req.url === '/views/index.html'){
            //读取json文件
            fs.readFile(__dirname + '/data/heros.json','utf-8',(err,data)=> {
                //判断
                if(err) console.log(err);
                //因为数据是字符串，我们要转换
                let arr = JSON.parse(data);
                //template替换掉结构里面的数据
                let html = template(__dirname + '/views/index.html',{arr})
                //返回给浏览器
                res.end(html)
            })
        }else 
        //判断url后面是不是add.html
        if(req.url === '/views/add.html'){
            //返回一个静态的add页面
            fs.readFile(__dirname + '/views/add.html','utf-8',(err,data)=>{
                res.end(data)
            })
        }else
        //根据url模块获取回来的地址判断
        //我们约定好用addHero判断
        //方法必须是get，用&&两个条件成立就执行
        if(result.pathname === '/addHero' && req.method === 'GET'){
            //把旧数据读取出来，转换为数组，添加到数组里面，再转换格式，写入到json
            fs.readFile('./data/heros.json',(err,data)=>{
                if(err) console.log(err);
                // 转换
                let shu = JSON.parse(data);
                //发现没有id，拿到旧数据里面的最大的id，给它+1
                let id = 0;
                shu.forEach(e => {
                    if(e.id > id){
                        id = e.id
                    }
                });
                //给id加1
                result.query.id = id + 1;
                //把新数据放到数组里面
                shu.push(result.query);
                //把数组转换为json格式
                let jsonStr = JSON.stringify(shu);
                //写到json文件里面
                fs.writeFile('./data/heros.json',jsonStr,'utf-8',(err)=> {
                    if(err) console.log(err);
                    //返回给浏览器
                    //因为是字符串，我们要转换
                    res.end(JSON.stringify({code : 200 , msg : '操作成功'}))
                })
            });
        }
    }
})