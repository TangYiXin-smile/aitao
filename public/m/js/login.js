$(function(){


	$('#loginBtn').on('click',function(){
		var username = $.trim($('#username').val());
		var password = $.trim($('#password').val());
		if(!username){
			mui.toast("用户名不能为空");
			return;
		}
		if(!password){
			mui.toast("密码不能为空");
			return;
		}
		$.ajax({
			url:'/user/login',
			type:'post',
			data:{
				"username":username,
				"password":password
			},
			beforesend:function(){
				$('#loginBtn').html("正在登录中...");
			},
			success:function(result){
				if(result.error != undefined){
					mui.toast(result.message,{ duration:'long', type:'div' })
				}
				if(result.success != undefined){
					$('#loginBtn').html("登录成功");
					var returnUrl = localStorage.getItem('returnUrl');
					console.log(localStorage.getItem('returnUrl'));
					if(returnUrl){
						setTimeout(function(){
							localStorage.removeItem('returnUrl');
							location.href = returnUrl;
						},2000);
					}else{
						setTimeout(function(){
							location.href = 'user.html';
						},1000);
					}
				}
			}
		})
	});
});