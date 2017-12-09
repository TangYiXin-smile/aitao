$(function(){

	$('#getCheckCode').on('tap',function(){

		$.ajax({
			url:'/user/vCode',
			type:'get',
			success:function(result){

				if(result.vCode){
					alert(result.vCode)
				}else{
					alert('获取验证码失败');
				}
				
			}
		});

	});

	$('#registerBtn').on('tap',function(){

		// 注册功能要提交的数据
		var data = {
			username:$.trim($('[name="username"]').val()),
			password:$.trim($('[name="password"]').val()),
			againPassword:$.trim($('[name="againPassword"]').val()),
			mobile:$.trim($('[name="mobile"]').val()),
			vCode:$.trim($('[name="vCode"]').val())
		}

		
		if(!data.username){

			// 弹出用户提示
			mui.toast('请输入用户名');

			return;

		}
			
		// 手机号码的验证规则	
		var reg = /^1[4578]\d{9}$/;
		
		if(!reg.test(data.mobile)){

			mui.toast('请输入正确格式的手机号码');

			return;

		}

		if(!data.password){

			mui.toast('请输入密码');

			return;

		}

		if(data.password != data.againPassword){

			mui.toast('两次输入的密码不一致');

			return;

		}

		if(!(/^\d{6}$/.test(data.vCode))){

			mui.toast('请输入符合格式的验证码');

			return;

		}

		var This = $(this);

		// 调用注册接口 注册账号
		$.ajax({
			url:'/user/register',
			type:'post',
			data:data,
			beforeSend : function(){

				This.html('注册中...');

			},
			success:function(result){

				if(result.success){

					location.href = "login.html";

				}else{

					alert(result.message);

				}

				This.html('注册');

			}
		})
		

	});
	

});