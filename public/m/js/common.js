$(function(){
	$('body').on('tap','a',function(){
		location.href = $(this).attr('href');
	});

	$('#reloadBtn').on('tap',function(){
		location.reload();
	});
	$('#leftBackBtn').on('tap',function(){
		history.go(-1);
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