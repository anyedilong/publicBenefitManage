var sysManageName = '公众惠民管理平台';

// var roadPath = 'http://192.168.1.81:8084'; // 田振
// var roadPath = 'http://192.168.1.201:8084'; // 聂亚威
// var roadPath = 'http://192.168.1.80:8084'; // 张伟
// var roadPath = 'http://192.168.1.51:8084'; // 李家峰
// var roadPath = 'http://192.168.1.78:8084';  //刘今
// var roadPath = 'http://192.168.1.230:8084';
// var roadPath = 'http://192.168.1.230:8084';
// var roadPath = 'http://192.168.1.206:8084';
// var roadPath = 'http://192.168.1.238:8084';
var roadPath = 'http://192.168.10.254:8010/hcplatform';

//设置cookie
function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";path=/;" + expires;
}
//获取cookie
function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1);
        if (c.indexOf(name) != -1) return c.substring(name.length, c.length);
    }
    return "";
}
//清除cookie  
function clearCookie(name) {
    setCookie(name, "", -1);
}
//操作cookie
function optionCookie(authorToke){
	if(authorToke != null && authorToke != '' && authorToke != undefined){
		clearCookie("author");
	    setCookie("author", authorToke, '1');
	}
}

var authorCookie = localStorage.getItem('authTokenTreat');
// 公共ajax
function getAjax (url, jsonParam, success, fail) {
    if (authorCookie) {
        var ajaxLoad;
        $.ajax({
            url: roadPath + url,
            type: 'POST',
            dataType: 'json',
            // jsonp: "callback",//服务端用于接收
            contentType: 'application/json',
            timeout: 5000,
            async: false,
            data: JSON.stringify(jsonParam),
            beforeSend: function (XMLHttpRequest) {
                XMLHttpRequest.setRequestHeader("authToken", authorCookie);
                layui.use('layer', function () {
                    ajaxLoad = layer.load(1, {
                        shade: [0.1,'#fff'] //0.1透明度的白色背景
                    });
                });
            },
            success: function (resultMsg) {
                layer.close(ajaxLoad);
                if (resultMsg.retCode == 20001 || resultMsg.retCode == 1003 || resultMsg.retCode == 1004) {
                    // 登录状态失效, 重新授权
                    // 跳转登录页
                    parent.location.href = '../login.html';
                    return false;
                } else if (resultMsg.retCode == 0) {
                    success && success(resultMsg);
                    return false;
                } else {
                    fail && fail(resultMsg);
                    layer.msg(resultMsg.retMsg, {icon: 5,time:1500,anim: 6});
                    // var errorLayer=layer.open({
                    //     id: 'login',
                    //     type: 1,
                    //     title: '提示',
                    //     skin: 'my-layui-layer', //样式类名
                    //     area: ['360px', '180px'],
                    //     shadeClose: true,
                    //     shade: 0.2,
                    //     content: '<div class="myMsg">' + resultMsg.retMsg + '</div>', //iframe的url
                    //     btn: ['关闭']
                    // });
                    return false;
                }
            },
            error: function (error) { // 请求失败处理
                layer.close(ajaxLoad);
                layer.open({
                    id: 'login',
                    type: 1,
                    title: '提示',
                    skin: 'my-layui-layer', //样式类名
                    area: ['360px', '180px'],
                    shadeClose: true,
                    shade: 0.2,
                    content: '<div class="myMsg">后台走丢了</div>', //iframe的url
                    btn: ['关闭']
                });
                // fail && fail(resultMsg.msg);
            }
        });
    } else {
        parent.location.href = '../login.html';
    }
}

// ajax上传文件流
function imgAjax (url, jsonParam, success, fail) {
    $.ajax({
        url: roadPath + url,
        type: 'POST',
        contentType: false,
        processData: false,
        data: jsonParam,
        beforeSend: function (XMLHttpRequest) {
            XMLHttpRequest.setRequestHeader("authToken", authorCookie);
        },
        success: function (resultMsg) {
            if (resultMsg.retCode == 0) {
                success && success(resultMsg);
            }else{
                layer.msg(resultMsg.retMsg, {icon: 5,time:1500,anim: 6});
            }

        },
        error: function (resultMsg) { // 请求失败处理
            fail && fail(resultMsg.msg);
        }
    });
}

// 地址栏取值
function GetQueryString(name) {
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if(r!=null)return  unescape(r[2]); return null;
}

// 删除数组元素
function delArr (arr, item) {
    $.each(arr, function (i, arrItem) {
        if (item == arrItem) {
            arr.splice(i, 1);
        }
    });
}

// 身份证号取年龄、生日、性别
function IdCard (UUserCard,num){
    if (num == 1) {
        //获取出生日期
        var birth = UUserCard.substring(6, 10) + '-' + UUserCard.substring(10, 12) + '-' + UUserCard.substring(12, 14);
        return birth;
    }
    if (num == 2) {
        //获取性别
        if (parseInt(UUserCard.substr(16, 1)) % 2 == 1) {
            return "男";
        } else {
            return "女";
        }
    }
    if (num == 3) {
        //获取年龄
        var myDate = new Date();
        var month = myDate.getMonth() + 1;
        var day = myDate.getDate();
        var age = myDate.getFullYear() - UUserCard.substring(6, 10) - 1;
        if (UUserCard.substring(10, 12) < month || UUserCard.substring(10, 12) == month && UUserCard.substring(12, 14) <= day) {
            age++;
        }
        return age;
    }
}

function getObjectURL (value) {
    if (value) {
        var url = null ;
        if (window.createObjectURL !== undefined) { // basic
            url = window.createObjectURL(value) ;
        } else if (window.URL!=undefined) { // mozilla(firefox)
            url = window.URL.createObjectURL(value) ;
        } else if (window.webkitURL!=undefined) { // webkit or chrome
            url = window.webkitURL.createObjectURL(value) ;
        }
        return url;
    }
}
function getBtnPower (btnarr, graystr, powerarr) {
    var html = '';
    $.each(btnarr,function (i, item) {
        if (powerarr.join(',').indexOf(item) > -1) {
            var abtn = ''
            if (graystr.indexOf(item) > -1) {
                abtn = '<a class="m-gray4" lay-event="' + item + '">' + item + '</a>'
            } else {
                abtn = '<a class="m-green1" lay-event="' + item + '">' + item + '</a>'
            }
            html += abtn + '\n';
        }
    });
    return html;
}
function getText(str) {
    return $(str).text().trim();
}