$(function(){
	var vCode = '';
	var check = true;
	//点击获取认证码文字时
	$('#getCodeBtn').on('tap',function(){
		//通过ajax请求获取认证码
		//
		$.ajax({
			url:'/user/vCode',
			type:'get',
			success:function(result){
				if(result.vCode){
					alert(result.vCode);
					//保存认证码以便之后匹配
					vCode = result.vCode;
				}
			}
		})
	});
	//点击注册按钮
	$('#regBtn').on('tap',function(){
		var username = $("#username").val();
		var mobile = $("#mobile").val();
		var pwd = $("#pwd").val();
		var confirmPwd = $("#confirmPwd").val();
		var inpvCode = $("#vCode").val();
		mui("#form input").each(function() {
		//若当前input为空，则提醒
			if(!this.value || this.value.trim() == "") {
			    var label = this.previousElementSibling;
		    	if(!/^1[34578]\d{9}$/.test(mobile)){
		        	mui.toast("手机号格式不正确");
		        	check = false;
		        	return false;
		        }
			    //判断：如果密码相同，则继续判断
			    if(pwd == confirmPwd){
			    	mui.toast( "请输入"+ label.innerText,{ duration:'long', type:'div' })
					check = false;
				}else{//如果密码不同，则提示
					check = false;
					mui.toast("两次输入的密码不相同",{ duration:'long', type:'div' })
				}
			    return false;
			}
		}); //校验通过，继续执行业务逻辑

		//匹配验证码
		if(vCode != inpvCode){
			check = false;
			mui.toast("认证码不正确",{ duration:'long', type:'div' })
		}
		if(check){//校验通过
		    //发送ajax请求，如果成功则提示成功，如果失败则提示错误信息
		    $.ajax({
		    	url:'/user/register',
		    	type:'post',
		    	data:{
		    		"username":username,
		    		"password":pwd,
		    		"mobile":mobile,
		    		"vCode":vCode
		    	},
		    	success:function(result){
		    		console.log(result)
		    		//判断第一个属性，成功显示成功，失败显示原因
		    		if(result.success != undefined){
		    			mui.toast("注册成功",{ duration:'long', type:'div' })
		    			location.href = 'login.html';
		    		}
		    		if(result.error != undefined){
		    			mui.toast(result.message,{ duration:'long', type:'div' })
		    		}
		    	}
		    })
		}
	})
})