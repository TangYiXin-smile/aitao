$(function(){
	$('#searchBtn').on('tap',function(){
		//获取搜索的内容
		var content = $(this).next().val();
		//判断搜索内容是否为空
		if(!content || $.trim(content)==''){
			alert("请输入关键字");
			return;
		}
		//将搜索的内容存入本地，如果有keys就存，没有就新创建一个
		if(localStorage.getItem('keys')){
			var current = JSON.parse(localStorage.getItem('keys'));
			current.push(content);
			localStorage.setItem('keys',JSON.stringify(current));
		}else{
			localStorage.setItem('keys',JSON.stringify([content]));
		}
		location.href = 'search-list.html?key='+content;
	});
	//如果本地中有搜索历史则取出显示
	if(localStorage.getItem('keys')){
		var history = JSON.parse(localStorage.getItem('keys'));
		var newArr = [];
		//去除搜索历史中重复的数据
		for(var i=0;i<history.length;i++){
			if(newArr.indexOf(history[i]) == -1){
				newArr.push(history[i]);
			}
		}
		var str = template('historyTpl',{data:newArr});
		$('#historyBox').html(str);
	}
	//点击清空历史删除本地存储数据
	$('#clearBtn').on('tap',function(){
		localStorage.removeItem('keys');
		location.reload();
	});
	$('body').on('tap','.title',function(){
		$('#searchCon').val($(this).html());
	})
});
