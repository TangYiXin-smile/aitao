$(function(){

	// 初始化区域滚动插件
	mui('.mui-scroll-wrapper').scroll({
		deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
	});


	// 获取一级分类
	$.ajax({
		url:'/category/queryTopCategory',
		type:'get',
		success:function(result){

			// 利用模板引擎帮我们拼接字符串
			// template('模板ID',{})
			var html = template('leftListTpl',{ data:result.rows });

			// 将数据展示到页面中
			$('#leftListBox').html(html);

			// 如果一级分类有数据的话
			if(result.total != 0){

				// 获取第一个一级分类对应的二级分类
				GetSecondData(result.rows[0].id);

				// 让第一个元素拥有选中状态
				$('#leftListBox li').eq(0).addClass('active');

			}

			/*
				var str = "";

				for(var i=0;i<result.rows.length;i++){

					str += "<li><span>" + result.rows[i].categoryName + "</span></li>";

				}

				$('#leftListBox').html(str);
			
			*/

		}
	});

	/*
		由于li是模板引擎渲染出来的 所以在页面上一开始是没有的
		所以要用事件委托来为li绑定事件	
	*/

	// 点击一级分类获取对应的二级分类
	$('#leftListBox').on('click','li',function(){

		// 获取到一级分类的ID 用来调用接口
		var id = $(this).attr('data-id');

		$(this).addClass('active').siblings().removeClass('active');

		GetSecondData(id)

	});

	// 根据一级分类的ID获取二级分类数据
	function GetSecondData(id){

		// 根据一级分类的ID获取对应的二级分类数据
		$.ajax({
			url:'/category/querySecondCategory',
			type:'get',
			data:{
				id:id
			},
			success:function(result){

				// 利用模板引擎帮我们拼接字符串
				var html = template('rightListTpl',{ data:result.rows });

				// 将二级分类的数据展示在页面中
				$('#rightListBox').html(html);

				console.log(result)

			}
		})

	}


});
