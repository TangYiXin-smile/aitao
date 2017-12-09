$(function(){
	var proName = getUrlData(location.href,'key');
	var page = 1;
	var pageSize = 5;
	var total = 0;
	var dataObj = {};
	var This = null;
	var price = 1;
	var num = 1;
	//总页数
	var total = 0;
	if(!proName){
		location.href = 'search.html';
	}

	$('#priceBtn').on('tap',function(){
		if($(this).data('sort') == 1){
			$(this).data('sort','2');
		}else{
			$(this).data('sort','1');
		}
		price = $(this).data('sort');
		page = 1;
		dataObj = {};
		mui('#content').pullRefresh().refresh(true);
		console.log(price)
		getData();
	});
	$('#saleBtn').on('tap',function(){
		if($(this).data('sort') == 1){
			$(this).data('sort','2');
		}else{
			$(this).data('sort','1');
		}
		num = $(this).data('sort');
		page = 1;
		dataObj = {};
		mui('#content').pullRefresh().refresh(true);
		getData();
	});
	//外层盒子需要定位在固定的位置，里面的盒子才能滑动
	mui.init({
	  pullRefresh : {
	    container:'#content',//待刷新区域标识，querySelector能定位的css选择器均可，比如：id、.class等
	    up : {
	      height:50,//可选.默认50.触发上拉加载拖动距离
	      auto:true,//可选,默认false.自动上拉加载一次
	      contentrefresh : "正在加载...",//可选，正在加载状态时，上拉加载控件上显示的标题内容
	      contentnomore:'没有更多数据了',//可选，请求完毕若没有更多数据时显示的提醒内容；
	      callback :getData //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
	    }
	  }
	});

	//在页面滑到底部之后发送ajax请求得到某一页的数据，然后更改页码，得到下一页的数据，当达到总页数时显示没有更多数据
	function getData(){
		if(!This){
			This = this;
		}
		$.ajax({
			url:'/product/queryProduct',
			type:'get',
			data:{
				proName:proName,
				page:page,
				pageSize:pageSize,
				price:price,
				num:num
			},
			success:function(result){
				if(result.data.length>0){
					console.log('chenggong')
					total = Math.ceil(result.count/pageSize);
					for(var attr in result){
						if(attr != 'data'){
							dataObj[attr] = result[attr];
						}else{
							if(dataObj[attr]){
								for(var i=0;i<result[attr].length;i++){
									dataObj[attr].push(result[attr][i]);
								}
							}else{
								dataObj[attr] = result[attr];
							}
						}
					}
					var str = template('productTpl',dataObj);
					$('#productBox').html(str);
					page++;
					if(page > total){
						This.endPullupToRefresh(true);
						return;
					}
					This.endPullupToRefresh(false);
				}else{
					console.log(result);
				}
			}
		});
	}
	
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
