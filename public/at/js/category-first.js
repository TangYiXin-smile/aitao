$(function(){

	var page = 1;
	var count = 2;
	var totalPage = 0;

	GetData();

	function GetData(){

		$.ajax({
			type:'get',
			url:'/category/queryTopCategoryPaging',
			data:{
				page:page,
				pageSize:count
			},
			success:function(result){

				if(!result.error){

					totalPage = Math.ceil(result.total/count);

					var html = template('categoryTpl',result);

					$('#categoryBox').html(html);

				}

				console.log(result);

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

	})

	$('#nextBtn').on('click',function(){

		page++;

		if(page > totalPage){

			page = totalPage;

			alert('已经是最后一页了');

			return;

		}

		GetData();

	})


	/* 
		添加一级分类

	*/

	$('#save').on('click',function(){

		var categoryName = $('[name="categoryName"]').val();

		if(!categoryName){

			alert('请输入分类名称');

			return;

		}

		$.ajax({
			type:'post',
			url:'/category/addTopCategory',
			data:{
				categoryName:categoryName
			},
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