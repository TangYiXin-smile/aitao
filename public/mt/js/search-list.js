$(function(){

	// 搜索的关键字
	var keyword = GetUrlParams(location.href,'keyword')

	// 如果搜索关键字不存在
	if(!keyword){

		// 跳转回搜索页面
		location.href = "search.html";

	}

	// 当前页
	var page = 1;
	// 总页数
	var totalPage = 0;

	// 每页显示的条数
	var pageSize = 5;

	// 当前是否是最后一页
	var isLast = false;

	// 数据
	var dataObj = {};

	var priceSort = 1;

	var This = null;

	mui.init({
	  pullRefresh : {
	    container:'#my-content',//待刷新区域标识，querySelector能定位的css选择器均可，比如：id、.class等
	    up : {
	      height:50,//可选.默认50.触发上拉加载拖动距离
	      auto:true,//可选,默认false.自动上拉加载一次
	      contentrefresh : "正在加载...",//可选，正在加载状态时，上拉加载控件上显示的标题内容
	      contentnomore:'没有更多数据了',//可选，请求完毕若没有更多数据时显示的提醒内容；
	      callback : getMoreData //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
	    }
	  }
	});

	// 当页面滚动到底部以后 执行的函数
	function getMoreData(){

		if(!This){

			This = this;

		}


		if(!isLast){

			// 获取搜索结果
			$.ajax({
				type:'get',
				url:'/product/queryProduct',
				data:{
					page:page,
					pageSize:pageSize,
					proName:keyword,
					price:priceSort
				},
				success:function(result){

					totalPage = Math.ceil(result.count/pageSize);

					console.log('result',result)

					// 循环结果对象
					for(var attr in result){

						// 如果当前的循环项不是data数据的时候 
						if(attr != 'data'){

							// 直接将普通的对象属性克隆到dataObj中
							dataObj[attr] = result[attr];

						}else{

							// 如果当前循环项是data数据的时候
							// 判断dataObj中data数组是否存在
							// 存在 push
							// 不存在 直接赋值
							if(!dataObj.data){

								dataObj.data = result[attr];

							}else{

								// 如果dataObj中已经有数据了 那么循环当前要添加的数据
								// 将数据push到dataObj中的data数组中
								for(var i=0;i<result[attr].length;i++){

									dataObj.data.push(result[attr][i]);

								}

							}

						}
						
					}

					console.log('dataObj',dataObj)

					var html = template('productTpl',dataObj);

					$('#productBox').html(html);

					page++;

					// 如果当前页大于了总页数
					if(page > totalPage){

						// 当前是最后一页
						isLast = true;

					}

					// 当数据加载完成以后 通知组件当前数据已经加载完成
					// 让组件知道到页面滚动到底部以后 可以再一次的去请求数据了
					This.endPullupToRefresh(false);
					

				}
			});		

		}else{

			// 如果当前已经是最后一页了 直接结果当前请求
			This.endPullupToRefresh(false);

		}
		

	}

	$('#priceSortBtn').on('tap',function(){

		priceSort = priceSort == 1 ? 2 : 1;

		// 当前页
		page = 1;
		// 总页数
		totalPage = 0;

		// 当前是否是最后一页
		isLast = false;

		// 数据
		dataObj = {};

		getMoreData()

	});



	function GetUrlParams(url,name){

		// 获取地址栏中问号后面的参数
		var params = url.substr(url.indexOf('?')+1);

		// 将多个参数分隔成数组 ['id=2','name=zhangsan']
		var arr1 = params.split('&');
		
		// 循环参数数组
		for(var i=0;i<arr1.length;i++){

			// 将每一个参数按照等号进行分割
			var arr2 = arr1[i].split('=');

			// 如果当前参数的键 等于传递进来的键
			if( arr2[0] == name){

				// 返回当前的键对应的值
				return arr2[1];

			}
			
		}

		return null;

	}

});