//判断用户是否登录
//同步判断，没有登录直接不加载之后的代码
$.ajax({
	url:'/employee/checkRootLogin',
	type:'get',
	async:false,
	success:function(result){
		if(result.error && result.error == 400){
			location.href = 'login.html';
		}
	}
})


$(function(){
	var page = 1;
	var pageSize = 1;
	var totalPage = 0;
	getData();
	$('#prevBtn').on('click',function(){
		page--;
		if(page<1){
			page = 1;
			alert('已经第一页咯~');
			return;
		}
		getData();
	});
	$('#nextBtn').on('click',function(){
		page++;
		if(page>totalPage){
			page = totalPage;
			alert('这是最后一页啦！');
			return;
		}
		getData();
	})
	function getData(){
		$.ajax({
			url:'/user/queryUser',
			type:'get',
			data:{
				page:page,
				pageSize:pageSize
			},
			success:function(result){
				if(!result.error){
					var str = template('userInfoTpl',{data:result.rows});
					$('#userInfoBox').html(str);
					totalPage = Math.ceil(result.total/pageSize);
				}
			}
		});
	}
	//isdel=1表示已启用，则按钮应该显示禁用
	//可以直接在模板中显示相反的状态值
	$('body').on('click','#delBtn',function(){
		var isdel = $(this).attr('data-isdel');
		var id = $(this).attr('data-id');
		var This = $(this);
		isdela = (isdel==1)?0:1;
		// $(this).attr('data-isdel',isdel)
		$.ajax({
			url:'/user/updateUser',
			type:'post',
			data:{
				id:id,
				isDelete:isdela
			},
			success:function(result){
				if(result.success){
					console.log(result)
					This.attr('data-isdel',isdel);
					//不刷新页面
					if(isdela==0){
						This.parent().parent().find('#status').html('已'+This.html());
						This.attr('data-isdel',0)
						This.removeClass('btn-danger').addClass('btn-success').html('启用');
					}else{
						This.parent().parent().find('#status').html('已'+This.html());
						This.attr('data-isdel',1)
						This.removeClass('btn-success').addClass('btn-danger').html('禁用');
					}
					// location.reload();
				}else{
					if(result.error == 400){
						localStorage.setItem('returnUrl',location.href);
						location.href = 'login.html';
					}else{
						alert(result.message);
					}
				}
			}
		});
	});
});