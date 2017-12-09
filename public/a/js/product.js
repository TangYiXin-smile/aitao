$.ajax({
	url:'/employee/checkRootLogin',
	type:'get',
	success:function(result){
		if(result.error){
			location.href = "login.html";
		}
	}
});
$(function(){
	//设置当前页面默认为1
	var page = 1;
	//设置每页显示的页数
	var pageSize = 10;
	//设置总页数，在获取所有商品信息时计算得到
	var totalPage = 0;
	//设置一个数组存放查询的所有商品的信息
	var infoArr = [];
	//查询所有商品的信息
	getProductInfo();
	//点击按钮切换页数，上一页
	$('#prevBtn').on('click',function(){
		page--;
		if(page < 1){
			page = 1;
			alert('已经是第一页啦~~');
			return;
		}
		getProductInfo();
	});
	//下一页功能
	$("#nextBtn").on('click',function(){
		page++;
		if(page > totalPage){
			page = totalPage;
			alert('这是最后一页哦~');
			return;
		}
		getProductInfo();
	});
	//查询所有品牌的名称，二级分类中
	$.ajax({
		url:'/category/querySecondCategoryPaging',
		type:'get',
		data:{
			page:1,
			pageSize:50
		},
		success:function(result){
			if(!result.error){
				var str = template('brandTpl',result);
				$('#brandBox').html(str);
				$('#m-brandBox').html(str);
			}
		}
	});
	//上传图片
	var imgArr = [];
	$('#fileUpload').fileupload({
	    dataType: 'json',
	    done: function (e, data) {
	        imgUrl= data._response.result;
	        imgArr.push(imgUrl);
	        var str = template('imgTpl',{data:imgArr});
	        $('#showImg').html(str);
	    }
	});

	//发送ajax请求添加新商品数据
	$('#saveBtn').on('click',function(){
		var data = {
			proName:$.trim($('[name=proName]').val()),
			oldPrice:$.trim($('[name=oldPrice]').val()),
			price:$.trim($('[name=price]').val()),
			proDesc:$.trim($('[name=proDesc]').val()),
			size:$.trim($('[name=size]').val()),
			statu:1,
			num:$.trim($('[name=num]').val()),
			brandId:$.trim($('#brandBox').val()),
			pic:imgArr
		};
		//判断是否选择品牌
		if(data.brandId == -1){
			alert('请选择品牌');
			return;
		}
		//判断是否有为空的内容，有则提示
		$('#formBox input').each(function(index,element){
			if(!element.value && element.name != 'pic1'){
				alert($(this).attr('placeholder'));
				return false;
			}
		});
		//判断是否上传了图片
		if(data.pic.length == 0){
			alert('请上传图片');
			return;
		}
		//判断上传图片的数量，不能超过三张
		if(data.pic.length > 3){
			alert('图片数量不能超过3张');
			return;
		}
		//发送请求增加商品信息
		$.ajax({
			url:'/product/addProduct',
			type:'post',
			data:data,
			success:function(result){
				if(result.success){
					location.reload();
				}else{
					alert(result.message);
				}
			}
		});
	});

	//点击修改按钮弹出修改页面
	$('body').on('click','.modifyBtn',function(e){
		//点击按钮显示模态框
		$('#m-myModal').modal('show');
		//获取此条数据的id
		var id = $(this).data('id');
		var data = {};
		for(var i=0;i<infoArr.length;i++){
			if(infoArr[i].id == id){
				data = infoArr[i];
			}
		}
		console.log(data);
		$('#m-brandBox').val(data.brandId);
		$('[name=id]').val(id);
		$('[name=m-proName]').val(data.proName);
		$('[name=m-proDesc]').val(data.proDesc);
		$('[name=m-num]').val(data.num);
		$('[name=m-size]').val(data.size);
		$('[name=m-oldPrice]').val(data.oldPrice);
		$('[name=m-price]').val(data.price);
	});

	//修改页面的上传图片
	var modifyImgArr = [];
	$('#m-fileUpload').fileupload({
	    dataType: 'json',
	    done: function (e, data) {
	        imgUrl= data._response.result;
	        modifyImgArr.push(imgUrl);
	        var str = template('imgTpl',{data:modifyImgArr});
	        $('#m-showImg').html(str);
	    }
	});

	//点击修改页面的确认发送请求
	$('#m-saveBtn').on('click',function(){
		var data = {
			id:$.trim($('[name=id]').val()),
			proName:$.trim($('[name=m-proName]').val()),
			oldPrice:$.trim($('[name=m-oldPrice]').val()),
			price:$.trim($('[name=m-price]').val()),
			proDesc:$.trim($('[name=m-proDesc]').val()),
			size:$.trim($('[name=m-size]').val()),
			statu:1,
			num:$.trim($('[name=m-num]').val()),
			brandId:$.trim($('#m-brandBox').val()),
			pic:modifyImgArr
		};
		//判断是否选择品牌
		if(data.brandId == -1){
			alert('请选择品牌');
			return;
		}
		//判断是否有为空的内容，有则提示
		$('#m-formBox input').each(function(index,element){
			if(!element.value && element.name != 'pic1' &&  element.name!='id'){
				alert($(this).attr('placeholder'));
				return false;
			}
		});
		console.log(data.pic)
		//判断是否上传了图片
		if(data.pic.length == 0){
			alert('请上传图片');
			return;
		}
		//判断上传图片的数量，不能超过三张
		if(data.pic.length > 3){
			alert('图片数量不能超过3张');
			return;
		}
		//发送修改请求
		$.ajax({
			url:'/product/updateProduct',
			type:'post',
			data:data,
			success:function(result){
				if(result.success){
					location.reload();
				}else{
					alert(result.message);
				}
			}
		})
	})
	//获取所有商品信息的函数
	function getProductInfo(){
		$.ajax({
			url:'/product/queryProductDetailList',
			type:'get',
			data:{
				page:page,
				pageSize:pageSize
			},
			success:function(result){
				if(!result.error){
					var str = template('productTpl',result);
					$('#productBox').html(str);
					totalPage = Math.ceil(result.total/pageSize);
					infoArr = result.rows;

				}
			}
		});
	}
});