$(function(){

	$('#loginBtn').on('tap',function(){

		var data = {
			username:$.trim($('[name="username"]').val()),
			password:$.trim($('[name="password"]').val())
		}

		if(!data.username){

			mui.toast('请输入用户名');

			return;

		}

		if(!data.password){

			mui.toast('请输入密码');

			return;

		}

		var This = $(this);

		$.ajax({
			type:'post',
			url:'/user/login',
			data:data,
			beforeSend:function(){
				This.html('登录中...')
			},
			success:function(result){

				if(result.success){

					// 如果本地存储中有returnUrl 就跳转到returnUrl
					if(localStorage.getItem('returnUrl')){

						var returnUrl = localStorage.getItem('returnUrl');

						localStorage.removeItem('returnUrl');

						location.href = returnUrl;

					}else{

						// 如果没有跳转到个人中心
						location.href = "user.html";

					}

					

				}else{

					mui.toast(result.message);

				}

				This.html('登录');

			}
		})


	});

})