$(function(){

	/*
		1.获取登录按钮(因为用户要通过点击登录按钮做登录操作)
		2.给登录按钮添加点击事件
		3.获取到用户输入的用户名和密码
		4.对用户输入的数据进行判断
		5.如果通过验证 调用接口
		6.根据接口的返回结果 做相应的操作
		7.如果登录成功 跳转到 用户管理界面
		8.如果登录失败 原地不动 给出失败提示
	*/


	$('#loginBtn').on('click',function(){

		var data = {
			username:$.trim($('[name="username"]').val()),
			password:$.trim($('[name="password"]').val())
		}

		if(!data.username){

			alert('请输入用户名');

			return;

		}

		if(!data.password){

			alert('请输入密码');

			return;

		}

		$.ajax({
			url:'/employee/employeeLogin',
			type:'post',
			data:data,
			beforeSend:function(){

				$('#loginBtn').html('登录中...');

			},
			success:function(result){

				if(result.success){

					location.href = "user.html";

				}else{

					alert(result.message);

				}

				$('#loginBtn').html('登录');

				console.log(result)

			}
		})
		



	});


})