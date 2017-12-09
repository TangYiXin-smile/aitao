$(function(){

	$('#getCheckCode').on('tap',function(){

		$.ajax({
			url:'/user/vCodeForUpdatePassword',
			type:'get',
			success:function(result){

				if(result.vCode){
					alert(result.vCode);
				}else{
					alert(result.message);
				}

			}
		})

	});


	$('#modifyBtn').on('tap',function(){

		var data = {
			oldPassword:$.trim($('[name="oldPassword"]').val()),
			newPassword:$.trim($('[name="newPassword"]').val()),
			vCode:$.trim($('[name="vCode"]').val()),
			againPassword:$.trim($('[name="againPassword"]').val())
		}

		if(!data.oldPassword){

			mui.toast('请输入原密码');

			return;

		}

		if(!data.newPassword){

			mui.toast('请输入新密码');

			return;

		}


		if(!data.againPassword){

			mui.toast('请再次输入新密码');

			return;

		}

		if(data.newPassword != data.againPassword){

			mui.toast('两次密码输入不一致');

			return;

		}

		if(!(/^\d{6}$/.test(data.vCode))){

			mui.toast('请输入正确格式的验证码');

			return;

		}

		var This = $(this);


		$.ajax({
			type:'post',
			url:'/user/updatePassword',
			data:data,
			beforeSend:function(){
				This.html('修改中...');
			},
			success:function(result){

				if(result.success){

					location.href = "login.html";

				}else{

					if(result.error == 400){

						localStorage.setItem('returnUrl',location.href);

						location.href = "login.html";

					}

					alert(result.message);

				}

				This.html('修改');

			}
		})


	});

})