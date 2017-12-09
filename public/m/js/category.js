$(function(){
	//滑动模块
	mui('.mui-scroll-wrapper').scroll({
		deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
	});
	//获取左边盒子的信息
	$.ajax({
		url:'/category/queryTopCategory',
		type:'get',
		success:function(result){
			//获得信息后通过模板引擎拼接字符串
			var str = template('leftListTpl',{data:result.rows});
			//将字符串内容添加到左边盒子中
			$('#leftListBox').html(str);
			//判断：如果获取到了一级分类信息，则显示二级分类信息，并默认选中第一项
			if(result.rows[0].total != 0){
				//调用获取二级分类信息的函数，传入参数
				getSecondData(result.rows[0].id);
				$('#leftListBox li').eq(0).addClass('active');
			}
		}
	});

	//给左边的li绑定事件，点击时获取对应的二级分类信息
	$('#leftListBox').on('click','li',function(){
		//通过自定义属性的方式获得当前点击li的id值，用于传入后台查询对应的二级分类信息
		var id = $(this).data('id');//$(this).attr('data-id');
		//获取二级分类信息 并显示在页面上
		getSecondData(id);
		$(this).addClass('active').siblings().removeClass('active');
	});
	//获取二级分类型信息的函数，需要对应的id值
	function getSecondData(id){
		$.ajax({
			url:'/category/querySecondCategory',
			type:'get',
			data:{
				id:id
			},
			success:function(result){
				var str = template('rightListTpl',{data:result.rows});
				$('#rightListBox').html(str);
			}
		});
	}
})