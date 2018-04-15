(function() {
	angular
		.module('SocietyController',['ui.bootstrap','ngTouch'])
		.controller('SocietyCtrl', ['$http','$uibModal','$log','$scope','$document',function($http,$uibModal, $log, $scope,$document) {

		}]);

})();

function setPosition(arr,offX,offY,tocWidth){
	var secondMenu = document.getElementById('bdd_second_menu');
	if(offX>1200){
		secondMenu.style.left = (offX- 152) + 'px';
	}else {
		secondMenu.style.left = (offX + tocWidth + 40) + 'px';
	}
	secondMenu.style.top = (offY)+'px';
	if(arr!=null && arr.length>0) {
		secondMenu.style.display='block';
		secondMenu.style.border = '1px solid #ccc';
	}else{
		secondMenu.style.display='none';
	}
}


(function ($) {
	document.addEventListener('click',function (e) {
		var parent=$(e.target).parents('#bdd_second_menu');
		if(parent.length===0){
			$('#bdd_second_menu').hide();

		}
	})
})(jQuery);



$('.bdd_drop_scroll').hover(
	function(){
		$('body').css('overflow', 'hidden');
	},
	function(){
		$('body').css('overflow', 'auto');
	});
function mourseMoveIn(){
	document.getElementsByTagName("html")[0].style.overflow="hidden";
	document.getElementsByTagName("html")[0].style.height="100%";
	document.getElementsByTagName("body")[0].style.overflow="hidden";
	document.getElementsByTagName("body")[0].style.height="100%";
}
function mourseMoveOut(){
	document.getElementsByTagName("html")[0].style.overflow="visible";
	document.getElementsByTagName("html")[0].style.height="auto";
	document.getElementsByTagName("body")[0].style.overflow="visible";
	document.getElementsByTagName("body")[0].style.height="auto";
}

function setContentHeight(dataList){
	var bdd_adver_header = document.getElementById("bdd_adver_header");
	if(dataList.length>0){
	bdd_adver_header.style.height="auto";
	}else{
		bdd_adver_header.style.height="200px";
	}

}

function changeStaus(obj){
	var text = obj.innerText;
	var morePro = document.getElementById("more-pro");
	var moreCity = document.getElementById("bdd_dev_city");

	if(text=="更多"){

		$("#to-pro-more").html('<div class="to_more">收起</div><div class="to_more to_top"></div>');
		morePro.style.display="block";
		moreCity.style.display="block";
	}else{
		$("#to-pro-more").html('<div class="to_more">更多</div><div class="to_more to_bottom"></div>');
		morePro.style.display="none";
		moreCity.style.display="none";
	}
}

function changeSelectStaus(obj){

	var text = obj.innerText;
	var morePro = document.getElementById("more-select-zz");
	if(text=="更多"){
		$('#more_select_zz').html('<div class="to_more">收起</div><div class="to_more to_top"></div>');
		morePro.style.display="block";
	}else{
		$('#more_select_zz').html('<div class="to_more">更多</div><div class="to_more to_bottom"></div>');
		morePro.style.display="none";
	}
}

