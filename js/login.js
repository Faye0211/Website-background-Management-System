var letao;
$(function() {
    letao = new Letao();
    letao.initPopover();
    letao.login();


});

var Letao = function() {

}

Letao.prototype = {
    initPopover: function() {
        $(function() {
            $('[data-toggle="popover"]').popover()
        });
    },
    //后台登录函数
    login: function() {
        // 1. 给登录按钮添加点击事件  PC 只有click
        $('.btn-login').on('click', function() {
            // 2. 获取用户输入用户名和密码
            var username = $('.username').val();
            if (!username) {
                $(this).attr('data-content', '请输入用户名!');
                return;
            }
            var password = $('.password').val();
            if (!password) {
                $(this).attr('data-content', '请输入密码!');
            }
            var that = this;
            //请求前隐藏
            $(that).popover('hide');
            // 3. 调用ajax实现登录的功能
            $.ajax({
                url: '/employee/employeeLogin',
                type: 'POST',
                data: { 'username': username, 'password': password },
                success: function(data) {
                    if (data.error == 1000) {
                        $(that).attr('data-content', '用户名不存在!');
                        $(that).popover('show');
                    } else if (data.error == 1001) {
                        $(that).attr('data-content', '密码错误!');
                        $(that).popover('show');
                    } else {
                        // ajax请求完毕后手动显示提示框
                        $(that).attr('data-content', '登录成功!');
                        $(that).popover('show');
                        // 如果登录成功跳转到首页 
                        window.location.href = 'index.html';
                    }
                }
            })
        });
    }
}
