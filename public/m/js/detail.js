$(function(){
	//获取得到的id值
	var id = getUrlData(location.href,'id');

	//定义一个变量用于存放库存量
	var stock = 0;
	//发送ajax请求获取数据显示详情页面
	$.ajax({
		url:'/product/queryProductDetail',
		type:'get',
		data:{
			id:id
		},
		success:function(result){
			//保存库存量
			stock = result.num;
			//result中得到的尺码结果为一个字符串（例'35-56')，需要进行处理
			result.spanArr = [];
			//将字符串分割
			var arr = result.size.split('-');
			var startSize = Number(arr[0]);
			var endSize = Number(arr[1]);
			//将两者之间的值全部变成数组的元素方便拼接为html结构
			for(var i=startSize;i<=endSize;i++){
				result.spanArr.push(i);
			}
			var str = template('detailTpl',result);
			$('#detailBox').html(str);
			//因为内容都是通过模板引擎添加的，所以需要在数据添加之后初始化图片轮播和滑动效果
			mui('.mui-scroll-wrapper').scroll({
				deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
			});
			var gallery = mui('.mui-slider');
			gallery.slider({
			  interval:5000//自动轮播周期，若为0则不自动播放，默认为0；
			});
		}
	});

	
	//增加减少购买数量，因为都是模板添加上的结构，在页面刚加载时还不存在
	//所有需要通过事件委托的方式添加事件
	$('body').on('tap','#sub',function(){
		var numInp = $('#numInp');
		var num = numInp.val();
		num--;
		if(num < 1){
			num = 1;
		}
		numInp.val(num);
	});
	$('body').on('tap','#add',function(){
		var numInp = $('#numInp');
		var num = numInp.val();
		num++;
		if(num > stock){
			num = stock;
		}
		numInp.val(num);
	});
	$('body').on('blur','#numInp',function(){
		var num = $(this).val();
		if(num > stock || num < 1){
			mui.toast('输入数量不合法');
			$(this).val(1);
		}
	});
	//选中尺码时有样式
	$('body').on('tap','.item',function(){
		$(this).addClass('active').siblings().removeClass('active');
	});

	//点击加入购物车按钮时提交数据并且有弹出提示
	$('body').on('tap','#addCartBtn',function(){
		var size = null;
		$('.item').each(function(index,element){
			if($(element).hasClass('active')){
				size = $(element);
			}
		});
		if(!size){
			mui.toast('请选择尺码');
			return;
		}

		$.ajax({
			url:'/cart/addCart',
			type:'post',
			data:{
				productId:id,
				num:$('#numInp').val(),
				size:size.html()
			},
			success:function(result){
				if(result.success){
					mui.confirm('添加成功，去购物车看看？','温馨提示',['确定','取消'],function(message){
						if(message.index == 0){
							location.href = 'cart.html';
						}
					});
				}else{
					if(result.error == 400){
						localStorage.setItem('returnUrl',location.href);
						location.href = 'login.html';
					}else{
						mui.toast(result.message);
					}
				}
			}
		})
	})
	
	function getUrlData(url,name){
		var arr1 = url.substr(url.indexOf('?')+1).split('&');
		for(var i=0;i<arr1.length;i++){
			var arr2 = arr1[i].split('=');
			if(arr2[0] == name){
				return arr2[1];
			}
		}
		return null;
	}
});