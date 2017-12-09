$(function(){

	// 当用户点击搜索按钮的时候
	$('#searchBtn').on('tap',function(){

		/*
			1.获取用户输入的搜索关键字 并判断是否为空
			2.将搜索关键字存储在本地
				1.由于搜索关键字有多个 所以要将搜索历史存储在一个数组中
				2.如果本地存储中有搜索历史 追加
				3.如果本地存储中没有搜索历史 直接存储

		*/
	
		var keyword = $('[name="keyword"]').val();

		if(!keyword){

			mui.toast('请输入搜索关键字');

			return;

		}

		// 看一下本地存储中有没有搜索历史
		if(localStorage.getItem('keywords')){

			// JSON.parse() 可以将JSON字符串转换为对象
			var keywords = JSON.parse(localStorage.getItem('keywords'));

			// 将当前搜索的关键字添加到搜索关键字数组中
			keywords.push(keyword);

			// 重新将搜索历史关键字存储到本地存储中
			localStorage.setItem('keywords',JSON.stringify(keywords))

		}else{

			// 本地中没有搜索历史
			// JSON.stringify() 可以将对象转换成JSON字符串
			localStorage.setItem('keywords',JSON.stringify([keyword]));

		}


		location.href = "search-list.html?keyword=" + keyword;



	});


	// 在页面一上来的时候 去本地存储中取搜索历史 并显示在页面中
	if(localStorage.getItem('keywords')){

		// 将搜索关键字从本地存储中取出
		var keywords = JSON.parse(localStorage.getItem('keywords'));

		// 编译模板 返回拼接好的模板
		var html = template('keywordsTpl',{data:keywords});

		// 将拼接好的模板显示在页面中
		$('#keywordsBox').html(html);

	}

	// 当点击清空历史按钮的时候
	$('#clearKeywords').on('tap',function(){

		// 清空本地存储
		localStorage.removeItem('keywords');

		// 清空页面
		$('#keywordsBox').html('');

	});


})