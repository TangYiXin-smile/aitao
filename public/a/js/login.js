$(function(){
	$('#loginBtn').on('click',function(){
		var username = $("#username").val();
		var password = $("#password").val();
		if(!username || $.trim(username)=="" ){
			alert('请填写用户名');
			return;
		}
		if(!password || $.trim(password)==""){
			alert('请填写密码');
			return;
		}
		$.ajax({
			url:'/employee/employeeLogin',
			type:'post',
			data:{
				username:username,
				password:password
			},
			success:function(result){
				if(result.success){
					location.href = 'user.html';
				}else{
					if(result.error == 1000){
						alert('用户名不存在!');
					}else{
						alert('密码错误');
					}
				}
			}
		})
	});
});