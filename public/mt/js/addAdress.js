$(function(){

	// 省市区弹出框
	var cityPicker = new mui.PopPicker({layer:3});

    cityPicker.setData(cityData);

	var showCityPickerButton = document.getElementById('showCityPicker');

	showCityPickerButton.addEventListener('tap', function(event) {

		cityPicker.show(function(items) {

			$('[name="address"]').val((items[0] || {}).text + (items[1] || {}).text + (items[2] || {}).text);

		});

	}, false);

	// 修改收货地址的ID
	var id = GetUrlParams(location.href,'id');

	if(id){

		// 修改操作
		// 接口地址
		var url = '/address/updateAddress';

		$('#addAdressBtn').html('修改');

		$.ajax({
			type:'get',
			url:'/address/queryAddress',
			success:function(result){

				console.log(result);

				for(var i=0;i<result.length;i++){

					if(result[i].id == id){

						$('[name="address"]').val(result[i].address);
						$('[name="addressDetail"]').val(result[i].addressDetail);
						$('[name="recipients"]').val(result[i].recipients);
						$('[name="postcode"]').val(result[i].postCode);

					}

				}
				
			}
		})
		

	}else{

		// 添加操作
		// 接口地址
		var url = '/address/addAddress';

		$('#addAdressBtn').html('添加');

	}


	$('#addAdressBtn').on('tap',function(){

		var data = {
			address:$.trim($('[name="address"]').val()),
			addressDetail:$.trim($('[name="addressDetail"]').val()),
			recipients:$.trim($('[name="recipients"]').val()),
			postcode:$.trim($('[name="postcode"]').val()),
		}

		if(!data.recipients){

			mui.toast('请输入收货人姓名');

			return;

		}

		if(!data.postcode){

			mui.toast('请输入邮编');

			return;

		}

		if(!data.address){

			mui.toast('请选择省市区');

			return;

		}

		if(!data.addressDetail){

			mui.toast('请输入详细地址');

			return;

		}

		if(id){
			// 修改操作
			data.id = id;
		}

		$.ajax({
			url:url,
			type:'post',
			data:data,
			success:function(result){

				if(result.success){

					location.href = "adress.html";

				}else{

					if(result.error == 400){

						localStorage.setItem('returnUrl',location.href);

						location.href ="login.html";

					}

					alert(result.message);

				}

			}
		})


	});

	/**
	 * 获取URL地址中的参数 name=zhangsan&age=20&sex=1
	 * @param {String} url    url地址
	 * @param {String} params 参数的名字
	 */
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