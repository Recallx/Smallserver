//发送ajax请求

let tbody = document.querySelector('#tbody')
//拿到所有的英雄数据
const xhr = new XMLHttpRequest();
//准备发送请求，因为我们搭建的服务器没有规定get还是post
xhr.open('get', 'http://127.0.0.1:8080/getAllHeros')
//发送请求
xhr.send();
//监听事件
xhr.onreadystatechange = function () {
    //判断
    if (xhr.readyState === 4 && xhr.status === 200) {
        //转换格式
        let res = JSON.parse(xhr.responseText)
        let html = '';
        //循环这个数组
        res.forEach(e => {
            html += `<tr>
            <td>${e.id}</td>
            <td>${e.name}</td>
            <td>${e.gender}</td>
            <td><img src="${e.img}"></td>
            <td><a href="./edit.html?id=${e.id}">修改</a> 
              <a data-id="${e.id}" href="javascript:void(0);">删除</a>
            </td>
          </tr>`;
        });
        tbody.innerHTML = html;
    }
}