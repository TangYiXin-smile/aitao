$(function(){
	$.ajax({
		url:'/address/queryAddress',
		type:'get',
		success:function(result){
			if(result)
			var str = template('addressTpl',{data:result});
			$('#addressBox').html(str);
		}
	});
	$('body').on('tap','.deleteAdress',function(){
		if(confirm("确认删除")){
			$.ajax({
				url:'/address/deleteAddress',
				type:'post',
				data:{id:$(this).data('id')},
				success:function(result){
					if(result.success){
						location.reload();
					}else{
						if(result.error == 400){
							mui.toast('您还未登录，请先登录',{ duration:'long', type:'div' })
							setTimeout(function(){
								localStorage.setItem('returnUrl',location.href);
								location.href = 'login.html';
							},1000);
						}else{
							mui.toast(result.message,{ duration:'long', type:'div' })
						}
					}
				}
			});
		}
	});
});