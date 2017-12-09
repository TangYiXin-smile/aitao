$(function(){
	$.ajax({
		url:'/user/queryUserMessage',
		type:'get',
		success:function(result){
			if(result.error){
				setTimeout(function(){
					location.href = "login.html";
				});
			}else{
				var str = template('userInfoTpl',result);
				$('#userInfo').html(str);
			}
		}
	});
	$('#logoutBtn').on('click',function(){
		$.ajax({
			url:'/user/logout',
			type:'get',
			success:function(result){
				if(result.success != undefined){
					location.href = 'index.html';
				}
			}
		});
	});
});