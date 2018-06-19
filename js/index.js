var letao;
$(function() {
    letao = new Letao();
    letao.queryUser();
    letao.getPage();
    letao.userOption();
});

var Letao = function() {

}
var page = 1;
var pageSize = 5;
Letao.prototype = {
    //获取所有用户信息
    queryUser: function() {
        // 1. 请求获取用户信息的接口
        $.ajax({
            url: '/user/queryUser',
            data: { 'page': page, 'pageSize': pageSize },
            success: function(data) {
                console.log(data);
                 // 实现分页
                 // 1. 有当前页码数  page
                 // 2. 每页的条数 pageSize  
                 // 如果返回了的数据条数和pageSize一样就使用pageSize 
                 // 如果返回的条数不一样 取当前返回数组的长度
                 // 3. 所有数据的总的条数
                 data.pageTotal = data.rows.length;
                 // 4. pageCount是总的页码数 = 总条数 / 每页大小  向上取整
                 var arr = [];
                 // 第一个了一个按钮起点  当前页面开始
                 var pageMin = page;
                 // 按钮终点  默认为1
                 var pageMax = 5;
                 if(Math.ceil(data.total / data.size)> 5)
                 {
                    //如果总页码数大于5  当前最大终点为起点+5  比如总页码数有15条 当前点到第五5  第5-10页的数据
                    pageMax = pageMin+5;
                 }
                 for (var i = page; i <= pageMax; i++) {
                     arr.push(i);
                 }
                 data.pageCount = arr;//[1,2]
                 console.log(data);
                 var html1 = template('pagingTmp',data);
                 $('.paging').html(html1);
                // 2. 调用用户模板生成html
                var html = template('userTmp', data);
                $('.table-user tbody').html(html);
            }
        })
    },
    //分页跳转的函数
    getPage:function () {
      // 1. 给点击上一页添加事件
      // $('#main').on('click','.prev',function () {
      //     // 2. 获取当前要跳转到的上一页的页码数
      //     page = $(this).data('page');
      //     letao.queryUser();
      // });
      // // 1. 给点击下一页添加事件
      // $('#main').on('click','.next',function () {
      //     // 2. 获取当前要跳转到的上一页的页码数
      //     page = $(this).data('page');
      //     letao.queryUser();
      // });
      // // 1. 给每一页的按钮添加点击事件
      // $('#main').on('click','.page',function () {
      //     //2. 获取当前点击的每一页的页码数
      //     page = $(this).data('page');
      //     letao.queryUser();
      // })
      //给所有上一页 第几页 下一页按钮添加点击事件
      $('#main').on('click','.pagination a',function () {
            //获取当前要跳转到的页码数
           page = $(this).data('page');
           //调用查询方法
          letao.queryUser();
      })
    },
    //用户启用禁用操作
    userOption: function() {
        $('#main').on('click', '.btn-option', function() {
            //2.获取当前要修改的用户的isDelete值 和id
            var isDelete = $(this).data('is-delete');
            var id = $(this).data('id');
            //3. 判断当前isDelete 如果为0禁用 改成1启用 如果为1启用 改成0禁用
            if (isDelete == 0) {
                isDelete = 1;
            } else {
                isDelete = 0;
            }
            // 4. 调用更新用户的API更新用户的状态
            $.ajax({
                url: '/user/updateUser',
                data: { 'id': id, 'isDelete': isDelete },
                type: 'post',
                success: function(data) {
                    if(data.success){
                        //更新生成就刷新列表
                         letao.queryUser();
                    }else{
                        //如果失败表示未登录就去登录
                        window.location.href = 'login.html';
                    }
                }
            });
        });
    }
}
