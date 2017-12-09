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
	var pageSize =10;
	var totalPage = 0;
	var dataArr = [];
	//显示所有一级分类信息
	getData();
	//点击上一页按钮的操作
	$('#prevBtn').on('click',function(){
		page--;
		if(page < 1){
			page = 1;
			alert('已经是第一页咯~');
			return;
		}
		getData();
	});
	//点击下一页按钮的操作
	$('#nextBtn').on('click',function(){
		page++;
		if(page > totalPage){
			page = totalPage;
			alert('已经是最后一页咯~');
			return;
		}
		getData();
	});
	//点击添加分类中的保存按钮新增分类
	$('#saveBtn').on('click',function(){
		var Inp = $('#Inpval').val();
		if(!Inp || $.trim(Inp) == ""){
			alert('内容不能为空!');
			return;
		}
		$.ajax({
			url:'/category/addTopCategory',
			type:'post',
			data:{
				categoryName:Inp
			},
			success:function(result){
				if(result.success){
					location.reload();
				}else{
					alert(result.message);
				}
			}
		});
	});
	//点击修改按钮显示修改页面,默认显示修改之前的数据
	$('body').on('click','.modifyBtn',function(){
		var id = $(this).data('id');
		$('#m-myModal').modal('show');
		$('[name=id]').val(id);
		for(var i=0;i<dataArr.length;i++){
			if(dataArr[i].id == id){
				console.log(dataArr[i])
				$('[name=m-categoryName]').val(dataArr[i].categoryName)
				if(dataArr[i].isDelete == 1){
					$('#allow').prop('checked',true);//???prop('checked')不行
				}else{
					$('#prevent').prop('checked',true);
				}
			}
		}

	});
	//点击修改页面的确认按钮发送请求
	$('#m-saveBtn').on('click',function(){
		var statu = 0;
		$('.inpBox [name=statu]').each(function(index,element){
			if(element.checked){
				statu = element.value;
			}
		});
		var data = {
			id:$.trim($('[name=id]').val()),
			categoryName:$.trim($('[name=m-categoryName]').val()),
			isDelete:statu
		};
		$.ajax({
			url:'/category/updateTopCategory',
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
	//获取一级分类信息的函数
	function getData(){
		$.ajax({
			url:'/category/queryTopCategoryPaging',
			type:'get',
			data:{
				page:page,
				pageSize:pageSize
			},
			success:function(result){
				var str = template('firstTpl',result);
				$('#firstBox').html(str);
				totalPage = Math.ceil(result.total/pageSize);
				dataArr = result.rows;
			}
		});
	}
});