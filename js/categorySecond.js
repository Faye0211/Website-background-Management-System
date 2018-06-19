var letao;
$(function() {
    letao = new Letao();
    letao.getCategorySecond();
    letao.getCategoryFirst();
    letao.addBrand();
    letao.getPage();
});

var Letao = function() {

}
var page = 1;
var pageSize = 5;
Letao.prototype = {
    //获取二级分类列表数据
    getCategorySecond: function() {
        // 1. 请求二级分类列表API
        $.ajax({
            url: '/category/querySecondCategoryPaging',
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
                var html = template('categorySecondTmp', data);
                // 3. 把html渲染到表格tbody里面
                $('.category-second tbody').html(html);
            }
        })
    },
    // 获取一级分类的分类数据 绑定到模态框的选择分类里面
    getCategoryFirst: function() {
        // 1. 请求一级分类的API
        $.ajax({
            url: '/category/queryTopCategoryPaging',
            data: { page: page, pageSize: 100 },
            success: function(data) {
                console.log(data);
                // 2. 调用模板生成option
                var html = template('selectCategoryTmp', data);
                // 3. 把生成的select和option放到
                $('.select-category-box').html(html);
            }
        })
    },
    //添加品牌
    addBrand: function() {
        // 1.给添加品牌按钮添加点击事件
        $('#main').on('click', '.btn-add', function() {
            //获取品牌名称
            var brandName = $('.input-brandName').val();
            //获取分类的id
            var categoryId = $('.select-category').val();
            //获取图片地址
            // var brandLogo = ''; 使用\写\\
            var arr = $('.brand-logo').val().split('\\');
            // console.log();           
            var brandLogo = '/mobile/images/' + arr[arr.length - 1];
            // console.log(brandLogo);
            // $('.brand-logo-img').attr('src',brandLogo);
            $.ajax({
                url: '/category/addSecondCategory',
                data: { 'brandName': brandName, 'brandLogo': brandLogo, 'categoryId': categoryId, 'hot': 1 },
                type: 'POST',
                success: function(data) {
                    if(data.success){
                        //重新刷新列表
                        letao.getCategorySecond();
                    }else{
                        //跳转到登录
                        window.location.href = 'login.html';
                    }
                }
            });
        });
    },
    //分页跳转的函数
    getPage: function() {
        //给所有上一页 第几页 下一页按钮添加点击事件
        $('#main').on('click', '.pagination a', function() {
            //获取当前要跳转到的页码数
            page = $(this).data('page');
            //调用查询方法
            letao.getCategorySecond();
        })
    }
}
