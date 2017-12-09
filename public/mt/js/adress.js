$(function(){

	$.ajax({
		url:'/address/queryAddress',
		type:'get',
		success:function(result){
			console.log(result);
			var html = template('addressTpl',{data:result});

			$('#addressBox').html(html)
		}
	});


	$('#addressBox').on('tap','.deleteBtn',function(){

		if(confirm('确定要删除这个收货地址吗?')){

			var id = $(this).attr('data-id');

			$.ajax({
				url:'/address/deleteAddress',
				type:'post',
				data:{
					id:id
				},
				success:function(result){

					if(result.success){

						// 刷新当前的页面
						location.reload();

					}else{

						if(result.error == 400){

							// 存储当前页面地址 用于登录成功之后返回当前页面
							localStorage.setItem('returnUrl',location.href);

							location.href = "login.html";

						}

						alert(result.message);

					}

				}
			})

		}

	})

})