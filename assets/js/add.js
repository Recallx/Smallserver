

/**
 * 
 * 
 * 思路：给新增按钮注册点击事件
 * 手机表单所有的数据然后，发送ajax请求
 * 我们没有用jq，所以自己封装一个获取表单数据的方法
 */

//封装一个获取表单数据的方法
//思路：设置一个获取表单的选择器
function serialize(formSelector) {
    //准备一个空数组，用join的方法存key和value
    let arr = [];
    //获取form表单
    let form = document.querySelector(formSelector)
    //获取form表单里面name
    let eless = form.querySelectorAll('[name]')
    //拿到的是一个伪数组，可以用forrach
    eless.forEach(e => {
        //判断如果是选中的radio，就获取name属性和value值
        if (e.type === 'radio' && e.checked) {
            //key存键，value存值
            let key = e.name;
            let value = e.value;
            //存到数组里面,格式是键=值
            arr.push(key + '=' + value)
        }
        if (e.type !== 'radio') {
            //key存键，value存值
            let key = e.name;
            let value = e.value;
            //存到数组里面,格式是键=值
            arr.push(key + '=' + value)
        }
    });
    //要join一个分割符
    return arr.join('&')
}



//获取按钮注册点击事件
let btn = document.querySelector('#sub');
btn.onclick = function () {
    //收集表单所有的数据
    let data = serialize('#myform');
    //发送ajax请求
    let xhr = new XMLHttpRequest();
    xhr.open('get','http://127.0.0.1:8080/addHero?'+ data)
    xhr.send();
    xhr.onreadystatechange = function(){
        if(xhr.readyState === 4 && xhr.status === 200){
            //转换格式，弹窗给用户看
            let res = JSON.parse(xhr.responseText);
            if(res.code === 200){
                alert(res.msg);
                location.href = '../../views/index.html'
            }
        }
    }
}