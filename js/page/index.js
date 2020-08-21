function divResize () {
    // $('.rightCont').css('width', '100%').css('width', '-=220px');
    // $('#mainIframe').css('height', '100%').css('height', '-=50px');
    // $('.menubox').css('overflow-y', 'scroll');
    // $('.menubox').css('height', '100%').css('height', '-=50px');
    // $('.menubox').css('width', '100%').css('width', '+=18px');
    // $('.headbox').css('width', '100%');
    // $('.head-left').css('width', '100%').css('width', '-=200px');
    menuWid();
}
divResize();
window.onresize = divResize;
function menuWid () {
    var liWid = $('.tab-li').eq(1).width();
    var liLen = $('.tab-li').length;
    $('.tab-ul').css('width', ((liLen - 1) * liWid + 88) + 'px');
    $('.menu-box-wid').css('width', ($('.tab-ul').width() + 20) + 'px');
    var maxbox = $('.head-left').width() - 40;
    if ($('.menu-box-wid').width() < maxbox) {
        $('.menu-box').css('width', $('.menu-box-wid').width() + 'px');
        $('.arrow-btn').html('');
    } else {
        $('.menu-box').css('width', maxbox + 'px')
        $('.arrow-l').html('<i class="iconfont">&#xe62b;</i>');
        $('.arrow-r').html('<i class="iconfont">&#xe62a;</i>');
    }
    // 滚动
    for (var i = 0; i < $('.tab-li').length; i++) {
        if ($('.tab-li').eq(i).hasClass('act-tab')) {
            $('.menu-box').scrollLeft(liWid * (i - 1) + 88);
        }
    }
}
// 左右滚动
$('.arrow-l').click(function () {
    var liWid = $('.tab-li').eq(1).width();
    var scL = $('.menu-box').scrollLeft();
    $('.menu-box').scrollLeft(scL - liWid);
})
$('.arrow-r').click(function () {
    var liWid = $('.tab-li').eq(1).width();
    var scL = $('.menu-box').scrollLeft();
    $('.menu-box').scrollLeft(scL + liWid);
})

// 全部的tab标签的src
var tabSrc = [];
$('.menubox').on('click', '.menu-div', function () {
    // $('.yiji-ul').find('.menu-li').removeClass('erji-divact');
    $('.erji-ul').find('.menu-li').removeClass('erji-divact');
    var pf = $(this).parent('li').parent('ul');
    var urls = $(this).attr('src');
    if (pf.hasClass('erji-ul')) {
        // 二级菜单
        $(this).parent('li').addClass('erji-divact');
    } else {
        // 一级菜单
        $('.menu-li').removeClass('yiji-divact');
        $(this).parent('.menu-li').addClass('yiji-divact');
    }
    if (urls != undefined) {
        // 增加tab
        var $this = $(this);
        var menusrc = $this.attr('src');
        var menuName = $this.children('span').html();
        $('#mainIframe').attr('src', urls);
        if (tabSrc.join(',').indexOf(menusrc) < 0) {
            // 去掉补位li的act样式
            $('.mend-head').removeClass('mend-act');
            $('.mend-foot').addClass('mend-act');
            tabSrc.push(menusrc);
            // 底部圆角切换
            $('.tab-li').children('div').css('border-bottom-right-radius', '0px');
            $('.tab-li').children('div').css('border-bottom-left-radius', '0px');
            $('.tab-li').eq(tabSrc.length - 1).children('div').css('border-bottom-right-radius', '10px');
            $('.tab-li').removeClass('act-tab');
            $('.tab-ul').append(' <li class="tab-li act-tab" src="' + menusrc + '">' +
                '<div><span>' + menuName + '</span>' +
                '<i class="iconfont iconBtn">&#xe716;</i></div></li>');
        } else {
            $('.tab-li').removeClass('act-tab');
            // 清除底部圆角
            $('.tab-li').children('div').css('border-bottom-right-radius', '0px');
            $('.tab-li').children('div').css('border-bottom-left-radius', '0px');
            for (var i = 0; i < $('.tab-li').length; i++) {
                if ($('.tab-li').eq(i).attr('src').indexOf(urls) > -1) {
                    $('.tab-li').eq(i - 1).children('div').css('border-bottom-right-radius', '10px');
                    if (i == ($('.tab-li').length - 1)) {
                        $('.mend-foot').addClass('mend-act');
                    } else {
                        $('.mend-foot').removeClass('mend-act');
                        $('.tab-li').eq(i + 1).children('div').css('border-bottom-left-radius', '10px');
                    }
                    $('.tab-li').eq(i).addClass('act-tab');
                }
            }
        }
    }
    menuWid();
});
// 点击tab切换
$('.tab-ul').on('click', '.tab-li', function () {
    var urls = $(this).attr('src');
    $('.tab-li').removeClass('act-tab');
    $(this).addClass('act-tab');
    $('#mainIframe').attr('src', urls);
    $('.yiji-ul').find('.menu-li').removeClass('yiji-divact');
    $('.erji-ul').find('.menu-li').removeClass('erji-divact');
    for (var i = 0; i < $('.menu-div').length; i++) {
        var menui = $('.menu-div').eq(i);
        if (menui.attr('src') == urls) {
            if (menui.parent('li').parent('ul').hasClass('erji-ul')) {
                $('.erji-ul').find('.menu-li').removeClass('erji-divact');
                menui.parent('li').addClass('erji-divact');
                $('.menu-li').removeClass('yiji-divact');
                menui.parent().parent().parent('.menu-li').addClass('yiji-divact');
            } else {
                menui.parent('li').addClass('yiji-divact');
            }
        }
    }
    // 底部圆角切换
    var ind = $(this).index();
    var len = $('.tab-li').length;
    // 清除
    $('.mend-head').removeClass('mend-act');
    $('.mend-foot').removeClass('mend-act');
    $('.tab-li').children('div').css('border-bottom-right-radius', '0px');
    $('.tab-li').children('div').css('border-bottom-left-radius', '0px');
    // 只有首页，点击首页
    if (len == 1) {
        $('.mend-head').addClass('mend-act');
        $('.mend-foot').addClass('mend-act');
    } else {
        if (ind == 0) {
            $('.mend-head').addClass('mend-act');
            $('.tab-li').eq(ind + 1).children('div').css('border-bottom-left-radius', '10px');
            // $('.mend-foot').addClass('mend-act');
        } else if (ind == (len - 1)) {
            $('.tab-li').eq(ind - 1).children('div').css('border-bottom-right-radius', '10px');
            $('.mend-foot').addClass('mend-act');
        } else {
            $('.tab-li').eq(ind + 1).children('div').css('border-bottom-left-radius', '10px');
            $('.tab-li').eq(ind - 1).children('div').css('border-bottom-right-radius', '10px');
        }
    }
    menuWid();
});
// 关闭tab页签
$('.tab-ul').on('click', '.iconBtn', function (e) {
    if(e && e.stopPropagation) {
        e.stopPropagation();
    }
    // IE 浏览器
    window.event.cancelBubble = true;
    // 清除
    $('.mend-head').removeClass('mend-act');
    $('.mend-foot').removeClass('mend-act');
    var $this = $(this);
    var tabli = $this.parent().parent();
    var tabind = tabli.index();
    var pageUrl = $('#mainIframe').attr('src');
    if (tabli.hasClass('act-tab')) {
        if (tabSrc.length == 1) {
            pageUrl = 'home.html'
            $('.tab-li').eq(0).addClass('act-tab');
            $('.erji-ul').find('.menu-li').removeClass('erji-divact');
            $('.menu-li').removeClass('yiji-divact');
            $('.tab-ul').css('width', 'auto');
        } else {
            if (tabind == tabSrc.length) {
                pageUrl = tabli.prev().attr('src');
                tabli.prev().addClass('act-tab');
            } else {
                pageUrl = tabli.next().attr('src');
                $('.tab-li').removeClass('act-tab');
                tabli.next().addClass('act-tab');
            }
        }
        $('#mainIframe').attr('src', pageUrl);
    }
    // 删除数组，删除li
    tabSrc.splice(tabind - 1, 1);
    tabli.remove();
    if (tabli.hasClass('act-tab')) {
        $('.tab-li').children('div').css('border-bottom-right-radius', '0px');
        $('.tab-li').children('div').css('border-bottom-left-radius', '0px');
        if (tabSrc.length == 0) {
            $('.mend-head').addClass('mend-act');
            $('.mend-foot').addClass('mend-act');
        } else {
            if (tabind == tabSrc.length + 1) {
                $('.act-tab').prev().children('div').css('border-bottom-right-radius', '10px');
                $('.mend-foot').addClass('mend-act');
            }
        }
    } else {
        $('.tab-li').children('div').css('border-bottom-right-radius', '0px');
        $('.tab-li').children('div').css('border-bottom-left-radius', '0px');
        $('.act-tab').prev().children('div').css('border-bottom-right-radius', '10px');
        if (tabind == tabSrc.length) {
            $('.mend-foot').addClass('mend-act');
        } else {
            if ($('.act-tab').index() == tabSrc.length) {
                $('.mend-foot').addClass('mend-act');
            }
            $('.act-tab').next().children('div').css('border-bottom-left-radius', '10px');
        }
    }
    for (var i = 0; i < $('.menu-div').length; i++) {
        var menui = $('.menu-div').eq(i);
        if (menui.attr('src') == pageUrl) {
            if (menui.parent('li').parent('ul').hasClass('erji-ul')) {
                $('.erji-ul').find('.menu-li').removeClass('erji-divact');
                menui.parent('li').addClass('erji-divact');
                $('.menu-li').removeClass('yiji-divact');
                menui.parent().parent().parent('.menu-li').addClass('yiji-divact');
            } else {
                $('.yiji-ul').find('.menu-li').removeClass('yiji-divact');
                menui.parent('li').addClass('yiji-divact');
            }
        }
    }
    menuWid();
});
// 退出登录
$('.logout').click(function () {
    layui.use('layer', function(){
        var layer = layui.layer;
        layer.open({
            id: 'login',
            type: 1,
            title: '提示',
            skin: 'my-layui-layer', //样式类名
            area: ['360px', '180px'],
            shadeClose: true,
            shade: 0.2,
            content: '<div class="myMsg">确认退出系统吗</div>', //iframe的url
            btn: ['关闭', '确认'],
            btn2: function (win) {
                getAjax('/login/exit', {}, function (resultMsg) {
                    if (resultMsg.retCode == 0) {
                        localStorage.setItem('authToken', '');
                        window.location.href = '../login.html';
                        layer.close(win);
                    }
                });
                return false;
            }
        });
    });
});
//
$('.changePassword').click(function () {
    layui.use(['layer','form'], function(){
        var layer = layui.layer;
        var form = layui.form;
        // 密码验证
        form.verify({
            pass: [
                /^[0-9A-Za-z]{6,12}$/
                ,'密码为6~12位的英文、数字 或者他们的组合'
            ],
            req:function (value,item) {
                if(item.name == 'password_old'){
                    if(value.trim() == ''){
                        return '请输入原密码！';
                    }

                } else if(item.name == 'password'){
                    if(value.trim() == ''){
                        return '请输入新密码！';
                    }
                } else if(item.name == 'password_t'){
                    if(value.trim() == ''){
                        return '请输入确认密码！';
                    }
                }
            }
        });
        layer.open({
            type:1,
            title: '修改密码',
            skin: 'my-layui-layer', //样式类名
            area: ['450px', '330px'],
            content: $('#pwdPop'),
            btn: ['关闭', '确认'],
            btn1: function (index) {
                layer.close(index);
            },
            btn2: function (index) {
                $('#addBtn').click();
                return false;
            }
        });
        $('#addBtn').click(function () {
            form.on('submit(addBtn)', function(data){
                var oldPassword = data.field.password_old;
                var newPassword = data.field.password;
                var newPassword2 = data.field.password_t;
                if(oldPassword != localStorage.getItem('password')){
                    layer.msg('您输入的原密码不正确，请重新输入！',{
                        time:2000,
                        icon:5,
                        anim: 6
                    });
                }else{
                    if(newPassword !== newPassword2){
                        layer.msg('新密码与确认密码不符，请重新输入！',{
                            time:2000,
                            icon:5,
                            anim: 6
                        });
                        return false
                    }else {
                        var regL = /^[0-9A-Za-z]{6,}$/;
                        var regC = /^[0-9A-Za-z]{6,12}$/;
                        var reg =/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,12}$/;
                        if(!regL.test(newPassword)){
                            layer.msg('密码长度不能低于6位', {icon: 5, anim: 6});
                        }else if(!regC.test(newPassword)){
                            layer.msg('密码长度不能超过12位。', {icon: 5, anim: 6});
                        }else if(!reg.test(newPassword)){
                            layer.msg('密码只能为字母和数字的组合', {icon: 5, anim: 6});
                        }else{
                            var jsonParam = {
                                oldPsd: oldPassword,
                                newPsd: newPassword, // 新密码
                            };
                            getAjax('/sys/user/changePassword', jsonParam, function (resultMsg) {
                                localStorage.setItem('password',newPassword);
                                layer.open({
                                    title: '提示',
                                    icon: 1,
                                    content: '保存成功',
                                    skin: 'my-layui-layer',
                                    btn: ['关闭', '确认'],
                                    btn1: function () {
                                        layer.closeAll();
                                    },
                                    btn2: function () {
                                        layer.closeAll();
                                        $("#addform")[0].reset();
                                    }
                                })
                            });
                        }
                    }
                }
                return false
            });
        });
    });
});

var menuObj = [
    {
        name: '转出管理',
        icon: '&#xe607;',
        children: [
            {
                name: '转出管理',
                icon: '',
                src: 'outTransfer.html'
            },
            {
                name: '回转列表',
                icon: '',
                src: 'rotaryList.html'
            }
        ]
    },
    {
        name: '转入管理',
        icon: '&#xe607;',
        children: [
            {
                name: '接收转入',
                icon: '',
                src: 'acceptTransfer.html'
            },
            {
                name: '回转列表',
                icon: '',
                src: 'rotaryTransfer.html'
            }
        ]
    }
]

// 获取登录的详细信息
var loginUserInfo = {};

getUserInfo();
function getUserInfo() {
    layui.use('layer', function() {
        var layer = layui.layer;
        getAjax('/sys/user/getLoginInfo',{}, function (resultMsg) {
            console.log(resultMsg.data);
           localStorage.setItem('roleType', resultMsg.data.role.roleType);
            loginUserInfo = resultMsg.data;
            $('#username').html(resultMsg.data.name);
            localStorage.setItem('yhId',resultMsg.data.id);
            localStorage.setItem('orgName',resultMsg.data.orgName);
            localStorage.setItem('roleType',resultMsg.data.role.roleType);
            getMenu(resultMsg.data.id)
        });
    });
}

// getSysName();
function getSysName() {
    $.ajax({
        type: 'get',
        dataType: "jsonp",
        jsonp: "callback",//服务端用于接收
        async: false,
        contentType: 'application/json',
        url: noLoghin + '/sys/platform/show',
        data: {},
        success: function (resultMsg) {
            $('#sysBox').find('img').attr('src', resultMsg.data.logo);
            $('#sysBox').find('span').html(resultMsg.data.name);
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            console.log(XMLHttpRequest);
            console.log(textStatus);
            console.log(errorThrown);
            alert('加载资源失败');
        }
    });
}
// allMenu();
var menuList = [];
var menuXTXX = []; // 系统消息
var menuLBGL = []; // 类别管理
var menuZXGL = []; // 资讯管理
var menuFGGL = []; // 法规管理
var menuLMGL = []; // 栏目管理
var menuBSZN = []; // 办事指南
var menuJGYH = []; // 机构用户
var menuYHGL = []; // 用户管理
var html = '';
function getMenu (id) {
    getAjax('/sys/role/queryRoleSomeFunctions',{userId:id},function (resultMsg) {
            menuList = resultMsg.data;
            if (menuList) {
                $.each(menuList, function (i, menuItem) {
                    if (menuItem.name=='系统消息') {
                        $.each(menuItem.sysFunctionList, function (p, pItem) {
                            menuXTXX.push(pItem.name);
                        });
                    }else if(menuItem.name=='健康资讯'){
                        $.each(menuItem.sysFunctionList, function (i, pageItem) {
                            if(pageItem.name=='类别管理'){
                                $.each(pageItem.sysFunctionList, function (i, pItem) {
                                    menuLBGL.push(pItem.name);
                                })
                            }else if(pageItem.name=='资讯管理'){
                                $.each(pageItem.sysFunctionList, function (i, pItem) {
                                    menuZXGL.push(pItem.name);
                                })
                            }
                        })
                    }else if(menuItem.name=='法规管理'){
                        $.each(menuItem.sysFunctionList, function (p, pItem) {
                            menuFGGL.push(pItem.name);
                        });
                    }else if(menuItem.name=='指南管理'){
                        $.each(menuItem.sysFunctionList, function (i, pageItem) {
                            if(pageItem.name=='栏目管理'){
                                $.each(pageItem.sysFunctionList, function (i, pItem) {
                                    menuLMGL.push(pItem.name);
                                })
                            }else if(pageItem.name=='办事指南'){
                                $.each(pageItem.sysFunctionList, function (i, pItem) {
                                    menuBSZN.push(pItem.name);
                                })
                            }
                        })
                    }else if(menuItem.name=='机构管理'){
                        $.each(menuItem.sysFunctionList, function (i, pageItem) {
                            if(pageItem.name=='机构用户'){
                                $.each(pageItem.sysFunctionList, function (i, pItem) {
                                    menuJGYH.push(pItem.name);
                                })
                            }
                        })
                    }else if(menuItem.name=='系统管理'){
                        $.each(menuItem.sysFunctionList, function (i, pageItem) {
                            if(pageItem.name=='用户管理'){
                                $.each(pageItem.sysFunctionList, function (i, pItem) {
                                    menuYHGL.push(pItem.name);
                                })
                            }
                        })
                    }
                    if(menuItem.url){
                        html += '<li class="menu-li">' +
                            '<div class="menu-div" src="'+menuItem.url+'">' +
                            '<i class="iconfont">' + menuItem.icon + '</i>' +
                            '<span>' + menuItem.name + '</span>' +
                            '</div>' +
                            '</li>'

                    }else{
                        html += '<li class="menu-li">' +
                            '<div class="menu-div">' +
                            '<i class="iconfont">' + menuItem.icon + '</i>' +
                            '<span>' + menuItem.name + '</span>' +
                            '</div>';
                        // if(menuItem.name=='系统管理'){
                        //     html += '<ul class="menu-ul erji-ul">'+
                        //         '<li class="menu-li">'+
                        //         '<div class="menu-div" src="changePassword.html">'+
                        //         '<i class="iconfont"></i>'+
                        //         '<span>修改密码</span>'+
                        //         '</div>'+
                        //         '</li>';
                        //     $.each(menuItem.sysFunctionList, function (i, pageItem) {
                        //         if(pageItem.type == 1){
                        //             html += '<li class="menu-li">' +
                        //                 '<div class="menu-div" src="' + pageItem.url + '">' +
                        //                 '<i class="iconfont"></i>' +
                        //                 '<span>' + pageItem.name + '</span>' +
                        //                 '</div></li>';
                        //         }
                        //     });
                        //     html += '</ul>';
                        // }else{
                            $.each(menuItem.sysFunctionList, function (i, pageItem) {
                                if(pageItem.type == 1){
                                    html += '<ul class="menu-ul erji-ul">';
                                    html += '<li class="menu-li">' +
                                        '<div class="menu-div" src="' + pageItem.url + '">' +
                                        '<i class="iconfont"></i>' +
                                        '<span>' + pageItem.name + '</span>' +
                                        '</div></li>';
                                    html += '</ul>';
                                }
                            });
                        // }
                    }
                });
                    $('#menuUlBox').html(html);
            }
    })
}
// layer打开问题,未解决
// var layerAdd = null;
// function layerOpen(obj) {
//     layui.use(['form','layer'], function(){
//         var form = layui.form;
//         layerAdd = layer.open({
//             type: 1,
//             skin: 'my-layui-layer', //加上边框
//             title: '添加类别',
//             // area: ['460px', '270px'], //宽高
//             area: [obj.wid + 'px', obj.hei + 'px'], //宽高
//             // content: $('#mainIframe').contents().find('#' + ele),
//             // content: 'categoryManage.html#'+ ele,
//             content: obj.ele,
//             btn: ['关闭', '确认'],
//             btn1: function (index) {
//                 layer.close(layerAdd);
//                 // obj.fun(form);
//                 return false;
//             },
//             btn2: function () {
//                 // $('#addBtn').click();
//                 obj.fun(form);
//                 return false;
//             }
//         });
//     })
// }