$(function(){
	$('#logoutBtn').on('click',function(){
		$.ajax({
			url:'/employee/employeeLogout',
			type:'get',
			success:function(result){
				if(result.success){
					location.href = 'login.html';
				}else{
					alert(result);
				}
			}
		});
	});
	$('#showMore').on('click',function(){
		$(this).next().stop().slideToggle();
	});
});