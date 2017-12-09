// 登录拦截
// 判断用户是否登录
// 如果没有登录 跳转到登陆页面
// 如果已经登录 通过
// 登录拦截 需要页面一上来就开始执行 不需要让用户看到用界面 所以代码写在了 入口函数的外面
// 这个请求需要改成同步 如果默认是异步的 那么在请求的同时 下面的代码还是会执行
$.ajax({
	type:'get',
	async:false,
	url:'/employee/checkRootLogin',
	success:function(result){

		// 如果result对象里面有error属性 并且值为400 证明没有登录
		if(result.error && result.error == 400){

			location.href = "login.html";

		}

		// 如果用户已经登录 那么 让代码继续向下执行即可

	}
});

$(function(){

	// 当页面结构加载完成以后执行
	
	// 当前的页码
	var page = 1;
	// 每一页显示数据的条数
	var count = 10;

	// 总共有多少页
	var totalPage = 0;


	// 将乐淘移动端注册的用户 展示出来
	GetData();

	/*
		分页的核心 

			当点击上一页下一页按钮的时候 增加或减少当前的有页码 然后 重新发送请求 获取数据

			因为请求要重复调用 所以要将 请求 封装成一个函数
	*/

	// 上一页
	$('#prevBtn').on('click',function(){

		page--;

		if(page < 1){

			page = 1;

			alert('已经是第一页了');

			return;

		}

		GetData();

	});

	// 下一页
	$('#nextBtn').on('click',function(){

		page++;

		// 如果当前页 大于 总页数 就让当前页 等于总页数
		if(page > totalPage){

			page = totalPage;

			alert('已经是最后一页了');

			return;

		}

		GetData();

	});


	function GetData(){

		$.ajax({
			url:'/user/queryUser',
			type:'get',
			data:{
				page:page, // 当前的页码
				pageSize:count // 每一页显示数据的条数
			},
			success:function(result){

				// 如果请求没有失败
				if(!result.error){

					totalPage = Math.ceil(result.total/count);

					// 将数据显示在页面中
					var html = template('userTpl',result);

					// 将拼接好的数据现在页面中
					$('#userBox').html(html);

					console.log(result)

				}

			}

		});

	}



	// 停用 启用 账号
	$('body').on('click','.isDelete',function(){

		var id = $(this).attr('data-id');

		// 0 代表禁用状态  1 启用状态
		var isDelete = Number($(this).attr('data-isDelete')) == 1 ? 0 : 1 ;

		$.ajax({
			type:'post',
			url:'/user/updateUser',
			data:{
				id:id,
				isDelete:isDelete
			},
			success:function(result){

				if(result.success){

					location.reload();

				}else{

					alert(result.message);

				}
				console.log(result)

			}
		})




	});







});

// 当页面资源加载完成以后执行
window.onload = function(){}