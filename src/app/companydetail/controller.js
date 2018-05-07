app.controller('CompanyDetailCtrl', ['$http','$scope','utils','userTemp',function($http,$scope, utils,userTemp) {
	var selt = this;
    if (userTemp != null) {
        selt.user = angular.fromJson(userTemp);
    } else {
        selt.user = null;
    }

	var comId =  utils.getUrlVar('comId');
	console.log("=====comId:"+comId);

	var params = {};
    this.isFollow = true;
	$http.post("/company/"+comId,angular.toJson(params)).success(function (result) {
		selt.company=result.data;
		if(selt.company.collected){
		    selt.isFollow = false;
        }
	});

	//关注和取消关注

    this.cancelCollectionCompany = function (){
        var cancelParam = {companyid:comId};
        $http.post("/userCenter/cancelCollectionCompany", angular.toJson(cancelParam)).success(function (result) {
            console.log(result);
            if(result.code==1){//取消成功
                alert("取消收藏成功");
                selt.isFollow = true;
            }else{
                alert(result.msg);
            }
        });
    };

    this.collectionCompany = function (){
        var cancelParam = {companyid:comId};
        $http.post("/userCenter/collectionCompany", angular.toJson(cancelParam)).success(function (result) {
            console.log(result);
            if(result.code==1){//成功
                alert("收藏成功");
                selt.isFollow = false;
            }else{
                alert(result.msg);
            }
        });
    };





	this.showType = 1;
	selt.showTip = 1;
	var style00 = {
		"background-color":"#4d3a3a",
		"color": "white"
	};
	this.style01 = style00;
	this.changeType = function (type) {
		selt.showType = type;
		selt.style01 = "";
		selt.style02 = "";
		selt.style03 = "";
		selt.style04 = "";
		if(type==1){
			selt.style01 = style00;
		}else if(type==2){
			selt.style02 = style00;
		}else if(type==3){
			selt.style03 = style00;
		}else if(type==4){
			selt.style04 = style00;
		}
	};


	//reputation
	$http.post("/company/reputation/"+comId,angular.toJson(params)).success(function (result) {
		selt.repuMap=result.data;
		if( result.data!=null&& result.data.reputation!=null){
			var len = result.data.reputation.length;
			if(len!=null && len>0){
				selt.showTip = 0;
			}
		}
	});

	//undesirable
	$http.post("/company/undesirable/"+comId,angular.toJson(params)).success(function (result) {
		selt.undesMap=result.data;
	});

	this.showReputation = function (reputList) {
		selt.reputList = reputList;
		if(reputList!=null&&reputList.length>0){
			selt.showTip = 0;
		}
	};

	this.showUndesirable = function (undesList) {
		selt.undesList = undesList;
        selt.boo = true;
        selt.unshow = "收起"
	};
	this.changeOneMore = function (event) {
		var elem = event.target;

		var siblingElem = elem.parentNode.parentNode.nextSibling.nextSibling;
		if(elem.innerText=='收起'){
			elem.innerText='更多';
			siblingElem.style.display="none";
		}else{
			elem.innerText='收起';
			siblingElem.style.display="block";
		}

	};

    this.showUndesBoo = function () {
        selt.boo = !selt.boo;
        if(selt.boo){
            selt.unshow = "收起"
        }else{
            selt.unshow = "更多"
        }

    };
    this.logout = function () {
        sessionStorage.removeItem("X-TOKEN");
        sessionStorage.removeItem("userTemp");
        userTemp = null;
        selt.user = null;
        window.location.href = "index.html#/home";
    };

    /*分享*/
    this.shareShow = false;
    this.companyShare = function (type) {
        var url=document.location.href;
        var sharesinastring;
        var title = this.company.comName;
        switch (type) {
            case 'xinlang':
                sharesinastring = 'http://v.t.sina.com.cn/share/share.php?url='+url+'&title='+title+'&content=utf-8'
                break;
            case 'qq':
                sharesinastring='http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?summary='+title+'&url='+url+'&desc='+title+'&title='+title;
                break;
            case 'wechat':
                sharesinastring='http://pan.baidu.com/share/qrcode?w=150&h=150&url='+url;
                this.imgCodeUrlCompany = sharesinastring;
                this.shareShow = true;
                return;
        }
        this.shareShow = false;
        window.open(sharesinastring);
    }

    //企业资质
    this.qualList = [];
    this.qualSize = 0;
    $http.post("/company/qual/"+comId).success(function (result) {
        selt.qualTypeList = result.data;
        angular.forEach(selt.qualTypeList,function(item){
            angular.forEach(item.list,function(qual){
                selt.qualList.push(qual);
            });
        });
        selt.qualSize = selt.qualList.length;
    });

    this.allQual = function () {
        selt.qualList = [];
        angular.forEach(selt.qualTypeList,function(item){
            angular.forEach(item.list,function(qual){
                selt.qualList.push(qual);
            });
        });
        selt.qualSize = selt.qualList.length;
    };

    this.typeToQual = function (list) {
        selt.qualList = [];
        angular.forEach(list,function(qual){
            selt.qualList.push(qual);
        });
        selt.qualSize = selt.qualList.length;
    };
    //---------------------

    //企业注册人员
    this.personSize = 0;
    $http.post("/company/personCategory/"+comId).success(function (result) {
        selt.categoryList = result.data;

    });

    this.category = "";
    this.personList = [];
    this.busy = false;
    this.page = 1;
    this.selectCate = function (category) {
        selt.personList = [];
        selt.busy = false;
        selt.page = 1;
		selt.category = category;
        selt.nextPage();
    };

    this.setPage = function () {
        selt.personList = [];
        selt.busy = false;
        selt.page = 1;
        selt.category = "";
        selt.nextPage();
    };






    this.nextPage = function () {
        if (selt.busy) return;
        selt.busy = true;
        var paramsPage = {
            keyWord:"",
            comId:comId,
            category:selt.category,
            pageNo:selt.page,
            pageSize:5
        };

        $http.post("/company/person",angular.toJson(paramsPage)).success(function (result) {
        	var personList = result.data;
        	if(personList!=null&&
                selt.page==result.pageNum){
                angular.forEach(personList,function(person){
                    selt.personList.push(person);
                });
                selt.personSize = result.total;
                selt.pageSize = result.pageSize;;
                selt.pageNo = result.pageNum;
                selt.busy = false;
                selt.page += 1;
			}


        });
    };


}]);


