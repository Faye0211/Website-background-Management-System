var letao;
$(function() {
    letao = new Letao();
    letao.getCategoryFirst();
    letao.addCategoryFirst();
    letao.getPage();    
});

var Letao = function() {

}
var page = 1;
var pageSize = 5;
Letao.prototype = {
    //查询一级分类列表的数据并渲染
    getCategoryFirst: function() {
        // 1. 请求查询一级分类的API
        $.ajax({
            url: '/category/queryTopCategoryPaging',
            data: { page: page, pageSize: pageSize },
            success: function(data) {
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
                 var html1 = template('pagingTmp',data);
                 $('.paging').html(html1);
                // 2. 调用模板生成html
                var html = template('categoryFirstTmp', data);
                $('.category-first tbody').html(html);
            }
        })
    },
    //添加分类的函数
    addCategoryFirst: function() {
        // 1. 获取模态框里面的添加按钮添加点击事件
        $('#main').on('click', '.btn-add', function() {
            // 2. 获取当前要添加分类的内容
            var categoryName = $('.input-category').val();
            // 3. 调用添加一级分类的API实现添加一级分类
            $.ajax({
                url: '/category/addTopCategory',
                data: { 'categoryName': categoryName },
                type: 'post',
                success: function(data) {
                    //4.判断是否添加成功
                    if (data.success) {
                        //如果成功就重新查询分类
                        letao.getCategoryFirst();
                    } else {
                        //失败未登录跳转到登录
                        window.location.href = 'login.html';
                    }
                }
            })
        });
    },
    //分页跳转的函数
    getPage:function () {
      //给所有上一页 第几页 下一页按钮添加点击事件
      $('#main').on('click','.pagination a',function () {
            //获取当前要跳转到的页码数
           page = $(this).data('page');
           //调用查询方法
          letao.getCategoryFirst();
      })
    }
}
