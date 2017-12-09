$(function(){
	//获取后台数据，显示购物车中的内容
	var dataObj = {};
	$.ajax({
		url:'/cart/queryCart',
		type:'get',
		success:function(result){
			if(result.error){
				if(result.error == 400){
					mui.toast('请先登录！')
					setTimeout(function(){
						localStorage.setItem('returnUrl',location.href);
						location.href = 'login.html';
					},2000);
				}else{
					mui.toast(result.message)
				}
			}
			var str = template('cartInfoTpl',{data:result});
			var total = 0;
			$('#cartInfoBox').html(str);
			mui('.mui-scroll-wrapper').scroll({
				deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
			});
			//动态获取页面中被点击的checkbox的数量和价钱计算的得到总额
			//当页面中的多选框状态改变时
			$('[name=select]').on('change',function(){
				$('[name=select]:checked').each(function(index,element){
					var id = $(element).data('id');
					//得到当前数据的id ，从result中找到对应的id，找到price和num,计算得到total
					for(var i in result){
						if(result[i].id == id){
							total += result[i].num*result[i].price;
							$('#priceBox').html(total.toFixed(2));
						}
					}

				});
				//当没有选中的商品时总额为0
				if($('[name=select]:checked').length == 0){
					$('#priceBox').html('0.00');
				}
				//在下一次事件触发之前将总和置零
				total = 0;
			});
		}
	});
	
	//点击删除按钮删除数据
	$('body').on('tap','.deleteBtn',function(){
		//获取当前物品的id
		var id = [];
		id.push($(this).data('id'))
		//提示是否确认删除
		toDelete(id);
	});
	//点击批量删除按钮删除多个数据
	$('#delManyBtn').on('tap',function(){
		var idArr = [];
		$('[name=select]:checked').each(function(index,element){
			idArr.push($(element).data('id'));
		})
		toDelete(idArr);
	});
	//点击编辑按钮修改数据
	$('body').on('tap','.modifyBtn',function(){
		//获取当前按钮的id，发送ajax请求获取尺码和库存量，利用模板引擎拼接字符串，可以在detail页面复制，点击确定按钮时发送ajax请求修改数据
		//注意，此时编辑按钮上携带的应该是商品的id，而不是商品加入购物车后的购物车数据id
		var productid = $(this).data('productid');
		var sizeArr = [];
		var stock = 0;
		$.ajax({
			url:'/product/queryProductDetail',
			type:'get',
			data:{id:productid},
			success:function(result){
				var temp = result.size.split('-');
				var startSize = Number(temp[0]);
				var endSize = Number(temp[1]);
				for(var i=startSize;i<=endSize;i++){
					sizeArr.push(i);
				}
				stock = result.num;
				//获取到数据以后显示在页面上
				var str = template('modifyTpl',{sizeArr:sizeArr});
				//给尺码绑定点击事件改变样式
				$('body').on('tap','.item',function(){
					$(this).addClass('active').siblings().removeClass('active');
				});
				//改变数量的功能
				$('body').on('tap','#sub',function(){
					var num = $('#numInp').val();
					num--;
					if(num < 1){
						mui.toast('不能再少啦~')
						num = 1;
					}
					$('#numInp').val(num);
				});
				$('body').on('tap','#add',function(){
					var num = $('#numInp').val();
					num++;
					if(num > stock){
						mui.toast('没有更多了Ծ‸Ծ')
						num = stock;
					}
					$('#numInp').val(num);
				});
				//点击确认发送ajax请求修改数据
				mui.confirm(str,'编辑商品',['确认','取消'],function(e){
					if(e.index == 0){
						//获取当前被选中的尺码
						var size = null;
						$('.item').each(function(index,element){
							if($(element).hasClass('active')){
								size = $(element);
							}
						});
						//获取当前选择的数量
						var num = $('#numInp').val();
						//获取当前这条购物车信息的id
						var id = $('.deleteBtn').data('id');
						$.ajax({
							url:'/cart/updateCart',
							type:'post',
							data:{
								id:id,
								size:size.html(),
								num:num
							},
							success:function(result){
								if(result.success){
									location.reload();
								}else{
									if(result.error == 400){
										localStorage.setItem('returnUrl',location.href);
										location.href = 'login.html';
									}else{
										mui.toast(result.message);
									}
								}
							}
						});
					}
				});
			}
		});
	});
	//发送删除请求，根据参数不同进行单个或多个数据的额删除
	function toDelete(data){
		mui.confirm('','确认删除？',['确认','取消'],function(e){
			//e.index为0时表示选择与数组中的第一项一致
			if(e.index == 0){
				$.ajax({
					url:'/cart/deleteCart',
					type:'get',
					data:{
						id:data
					},
					success:function(result){
						console.log(result)
						if(result.success){
							location.reload();
						}else{
							if(result.error == 400){
								localStorage.setItem('returnUrl',location.href);
								location.href = 'login.html';
							}else{
								mui.toast(result.message);
							}
						}
					}
				});
			}
		});
	}
});