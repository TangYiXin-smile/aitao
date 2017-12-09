$(function(){
	// 省市区弹出框
	var cityPicker = new mui.PopPicker({layer:3});

    cityPicker.setData(cityData);

	var showCityPickerButton = document.getElementById('address');

	showCityPickerButton.addEventListener('tap', function(event) {

		cityPicker.show(function(items) {

			$('#address').val((items[0] || {}).text + (items[1] || {}).text + (items[2] || {}).text);

		});

	}, false);

	var id = getUrlData(location.href,'id');
	var theUrl = '';
	if(id){// 带参数
		//修改
		theUrl = '/address/updateAddress';
		$.ajax({
			url:'/address/queryAddress',
			type:'get',
			success:function(result){
				console.log(result)
				for(var i=0;i<result.length;i++){
					if(result[i].id == id){
						$('#recipients').val(result[i].recipients);
						$('#postcode').val(result[i].postCode);
						$('#address').val(result[i].address);
						$('#addressDetail').val(result[i].addressDetail);
						$('#title').html("修改收货地址");
					}
				}
			}
		})
	}else{//不带参数
		//添加
		theUrl = '/address/addAddress';
	}

	$('#addAddressBtn').on('tap',function(){
		//获取元素内容，发送请求
		var check = true;
		var data = {
			recipients:$.trim($('#recipients').val()),
			postcode:$.trim($('#postcode').val()),
			address:$.trim($('#address').val()),
			addressDetail:$.trim($('#addressDetail').val()),
			id:id
		}
		$('.my-content input').each(function(){
			if(!this.value){
				mui.toast('请输入'+this.getAttribute('placeholder'),{ duration:'long', type:'div' });
				check = false;
				return false;
			}
		});
		if(check){
			$.ajax({
				url:theUrl,
				type:'post',
				data:data,
				success:function(result){
					if(result.success){
						var str = '';
						if(id){
							str = '修改';
						}else{
							str = '添加';
						}
						mui.toast(str+'成功',{ duration:'long', type:'div' })
						setTimeout(function(){
							location.href = 'address.html';
						},1000);
					}else{
						if(result.error == 400){
							mui.toast('您还未登录，请先登录',{ duration:'long', type:'div' })
							setTimeout(function(){
								localStorage.setItem('returnUrl',location.href);
								location.href = 'login.html';
							},1000);
						}else{
							mui.toast(result.message,{ duration:'long', type:'div' })
						}
					}
				}
			});
		}
	});
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