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
	var page = 1;
	var pageSize = 10;
	var totalPage = 0;
	//页面加载时获取所有二级分类信息
	$.ajax({
		url:'/category/querySecondCategoryPaging',
		type:'get',
		data:{
			page:page,
			pageSize:pageSize
		},
		success:function(result){
			var str = template('secondTpl',result);
			$('#secondBox').html(str);

		}
	})
	//页面加载时获取所有一级分类信息
	$.ajax({
		url:'/category/queryTopCategoryPaging',
		type:'get',
		data:{
			page:1,
			pageSize:50
		},
		success:function(result){
			console.log(result)
			var str = template('selectTpl',result);
			$('#selectBox').html(str);
		}
	});

	//上传图片并预览  利用插件
	var imgUrl = '';
	$('#fileUpload').fileupload({
	    dataType: 'json',
	    done: function (e, data) {
	        imgUrl= data._response.result.picAddr;
	        $("#imgPreview").attr("src",imgUrl);
	    }
	});

	//发送ajax请求新增二级分类
	$('#saveBtn').on('click',function(){
		var data={
			brandName:$.trim($('[name=brandName]').val()),
			categoryId:$.trim($('#selectBox').val()),
			brandLogo:imgUrl,
			hot:1
		}
		if(data.categoryId == -1){
			alert('请选择所属分类');
			return;
		}
		if(!data.brandName){
			alert('请输入品牌名称');
			return;
		}
		if(!data.brandLogo){
			alert('请上传品牌logo');
			return;
		}
		$.ajax({
			url:'/category/addSecondCategory',
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
	});
	//上传图片并显示
	// $('input[type=file]').on('change',function(){
	// 	readImageFile(this);
	// });
	// function readImageFile(obj){
	// 	var reader = new FileReader();
	// 	reader.readAsDataURL(obj.files[0]);
	// 	reader.onload = function(){
	// 		var oImg = new Image();
	// 		oImg.src = reader.result;
	// 		$('#addPic').append(oImg);
	// 	}
	// }
	// $.ajax({
	// 	url:'/category/addSecondCategoryPic',
	// 	type:'post',
	// 	data:{
	// 		pic:picName
	// 	},
	// 	success:function(result){
	// 		console.log(result)
	// 	}
	// });
})