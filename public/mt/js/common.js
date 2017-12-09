$(function(){

	$('body').on('tap','a',function(){

		location.href = $(this).attr('href');

	});

})