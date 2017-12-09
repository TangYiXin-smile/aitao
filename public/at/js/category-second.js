$(function(){

	var page = 1;
	var count = 2;
	var totalPage = 0;

	GetData();

	function GetData(){

		$.ajax({
			type:'get',
			url:'/category/querySecondCategoryPaging',
			data:{
				page:page,
				pageSize:count
			},
			success:function(result){

				if(!result.error){

					totalPage = Math.ceil(result.total/count);

					var html = template('categoryTpl',result);

					$('#categoryBox').html(html)

				}

			}
		});

	}

	$('#prevBtn').on('click',function(){

		page--;

		if(page < 1){

			page = 1;

			alert('已经是第一页了');

			return;

		}

		GetData();

	});

	$('#nextBtn').on('click',function(){

		page++;

		if(page > totalPage){

			page = totalPage;

			alert('已经是最后一页了');

			return;

		}

		GetData();

	});



	/* 获取一级分类 */
	$.ajax({
		type:'get',
		url:'/category/queryTopCategoryPaging',
		data:{
			page:1,
			pageSize:100
		},
		success:function(result){

			if(!result.error){

				var html = template('categoryFirstTpl',result);

				$('#categoryFirstBox').html(html);

			}
			console.log(result)

		}
	})

	var picAddr = "";

	$('#fileUpload').fileupload({
	    dataType: 'json',
	    done: function (e, data) {

	    	picAddr = data._response.result.picAddr;

	    	$('#imgPreview').attr('src',picAddr);

	    }
	});

	// 添加二级分类
	$('#save').on('click',function(){

		var data = {
			brandName:$.trim($('[name="categoryName"]').val()),
			categoryId:$.trim($('#categoryId').val()),
			brandLogo:picAddr,
			hot:1
		}

		
		if(data.categoryId == -1){

			alert('请选择一级分类');

			return;

		}

		if(!data.brandName){

			alert('请输入二级分类名称');

			return;

		}

		if(!data.brandLogo){

			alert('请上传图片');

			return;

		}


		$.ajax({
			type:'post',
			url:'/category/addSecondCategory',
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





});