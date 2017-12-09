$(function(){

	$.ajax({
		type:'get',
		url:'/user/queryUserMessage',
		success:function(result){

			if(result.error == 400){

				location.href = "login.html";

			}

			// console.log(result);
			var html = template('userTpl',result);

			$('#userBox').html(html);

		}
	});


	// 退出登录
	$('#logoutBtn').on('tap',function(){

		if(confirm('确定要退出登录吗?')){

			$.ajax({
				url:'/user/logout',
				type:'get',
				success:function(result){

					if(result.success){

						location.href = "index.html";

					}else{

						alert(result.message);

					}

				}
			})

		}		

	});

});