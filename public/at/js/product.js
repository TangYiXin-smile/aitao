$(function(){

	// 获取商品列表
	$.ajax({
		type:'get',
		url:'/product/queryProductDetailList',
		data:{
			page:1,
			pageSize:10
		},
		success:function(result){

			if(!result.error){

				var html = template('productTpl',result)

				$('#productBox').html(html);

			}
			console.log(result)

		}
	});


	// 获取品牌列表
	$.ajax({
		type:'get',
		url:'/category/querySecondCategoryPaging',
		data:{
			page:1,
			pageSize:100
		},
		success:function(result){

			if(!result.error){

				var html = template('brandTpl',result);

				$('#brandBox').html(html);

			}

			// console.log(result);

		}
	});

	var imgArr = [];

	$('#fileupload').fileupload({
		dataType: 'json',
		done: function (e, data) {

			imgArr.push(data._response.result)

			var html = template('imgTpl',{data:imgArr});

			$('#imgBox').html(html);

		  	console.log(data._response.result)
		}
	});



	// 添加商品
	$('#addProduct').on('click',function(){

		var data = {
			proName:$.trim($('[name="proName"]').val()),
			oldPrice:$.trim($('[name="oldPrice"]').val()),
			price:$.trim($('[name="price"]').val()),
			proDesc:$.trim($('[name="proDesc"]').val()),
			size:$.trim($('[name="size"]').val()),
			statu:1,
			num:$.trim($('[name="num"]').val()),
			brandId:$.trim($('#brand').val()),
			pic:imgArr
		}

		console.log(data.pic)
		return;

		if(!data.proName){

			alert('请输入产品名称');

			return;

		}

		if(!data.oldPrice){

			alert('请输入产品原价');

			return;

		}

		if(!data.price){

			alert('请输入产品折扣价');

			return;

		}


		if(!data.proDesc){

			alert('请输入产品描述');

			return;

		}

		if(!data.size){

			alert('请输入产品尺寸');

			return;

		}

		if(!data.num){

			alert('请输入产品数量');

			return;

		}

		if(data.brandId == -1){

			alert('请选择产品品牌');

			return;

		}

		if(data.pic.length == 0){

			alert('请上传产品图片');

			return;

		}


		$.ajax({
			url:'/product/addProduct',
			type:'post',
			data:data,
			success:function(result){

				if(result.success){

					location.reload()

				}else{

					alert(result.message)

				}

			}
		})



	});

})