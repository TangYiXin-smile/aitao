$(function(){


	/*
		退出登录
		1.获取登出按钮
		2.给登出按钮添加点击事件
		3.发送登出请求
		4.如果登出成功 跳转到登录页面
		5.如果登出失败 给出提示

	 */

	 $('.login_out_bot').on('click',function(){

	 	if(confirm('确定要退出登录吗')){

	 		$.ajax({
	 			type:'get',
	 			url:'/employee/employeeLogout',
	 			success:function(result){

	 				if(result.success){

	 					location.href = "login.html";

	 				}else{

	 					alert(result.message);

	 				}

	 			}
	 		})

	 	}

	 });







	var navLi = $('.navs li')

	navLi.on('click',function(){

		$(this).find('ul').slideToggle();

	});

});