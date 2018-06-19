var letao;
$(function() {
    letao = new Letao();
    letao.initPopover();
    letao.login();


});

var Letao = function() {

}

Letao.prototype = {
    // bootstrap的弹出框初始化
    initPopover: function() {
        $(function() {
            $('[data-toggle="popover"]').popover()
        });
    },
    login:function () {  
        $('.btn').on('click',function () { 
            var username=$('.username').val();
            console.log(username);
            if(!username){
                $(this).attr('data-content','请输入用户名');
                return;
            }
            var password=$('.password').val();
            if(!password){
                $(this).attr('data-content','请输入密码');
                
            }
            var that =this;
            // 弹出框的方法
            $(this).popover('hide');
            $.ajax({
                url: '/employee/employeeLogin',
                type: 'get',
                data:{
                    'username':username,
                    'password':password
                },
                success:function (data) { 
                    if(data.error=='1000'){
                        $(this).attr('data-content','用户名不存在');
                        $(this).popover('show');
                    }else if(data.error=='1001'){
                        $(this).attr('data-content','密码有问题');
                        $(this).popover('show');
                    }else{
                        $(this).attr('data-content','登录成功');
                        $(this).popover('show');
                        window.location.href="index.html";
                    }
                 }
            })
         })
    }


}



