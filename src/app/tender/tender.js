app.controller('tenderIndex', ['$http', '$scope', 'utils', '$stateParams', '$state','userTemp', function ($http, $scope, utils, $stateParams, $state,userTemp) {
    var selt = this;
    if (userTemp != null) {
        selt.user = angular.fromJson(userTemp);
    } else {
        selt.user = null;
    }

    $http.get("/company/filter").success(function (result) {
        console.log(result.data.area);
        var arr1 = [];
        var arr2 = [];
        if(result.code==1){
            for(var i=0;i<result.data.area.length;i++){
                var areaArr = result.data.area;
                if(i<14){
                    arr1.push(areaArr[i]);
                }else{
                    arr2.push(areaArr[i]);
                }
            }
            selt.areaList = arr1;
            console.log(arr1);
            selt.areaList2 = arr2;
            console.log(arr2);
            var arr1=[];
            var arr2=[];
            var companyQualList= result.data.companyQual;

            if(companyQualList!=null &&companyQualList.length>0){
                for(var i=0;i<companyQualList.length;i++){
                    if(i<8){
                        arr1.push(companyQualList[i]);
                    }else{
                        arr2.push(companyQualList[i]);
                    }
                }
            }
            selt.companyQualList = arr1;
            selt.companyQualList2 = arr2;
        }
    });

    this.isCity = false;
    this.regisAddress = "";
    this.province = "";
    this.city = "";
    this.qual1 = "";
    this.qual2 = "";
    this.qual3 = "";
    this.minCapital = 0;
    this.maxCapital = null;
    this.priceArea = "";
    this.cancelFilter = function () {
        this.regisAddress = "";
        this.zzType = "";
        this.province = "";
        this.city = "";
        this.qual1 = "";
        this.qual2 = "";
        this.qual3 = "";
        this.minCapital = 0;
        this.maxCapital = null;
        this.priceArea = "";
        selt.resetParam();
        selt.queryList();
    };



    //----省市----
    this.clickProvince = function (area) {
        selt.regions = area.name+"||";
        selt.province = area.name;
        selt.isCity = true;
        selt.cityList = area.list;
        selt.queryList();
    };
    this.clickCity = function (city) {
        selt.regions = selt.province+"||"+city;
        selt.city = city;
        selt.isCity = true;
        selt.queryList();

    };
    this.cancelArea = function () {
        this.regions = "";
        this.province = "";
        this.city = "";
        selt.setPage();
    };
    this.cancleEmCity = function () {
        selt.regions = selt.province+"||";
        selt.city="";
        selt.setPage();
    };
    //---省市----end

    //评标办法
    selt.isShowMore = false;
    this.showMore = function(isShowMore){
        selt.isShowMore = !isShowMore;
    }

















    //---资质----
    this.clickQual1 = function (qual) {
        selt.qual1 = qual;
        selt.qual2 = "";
        selt.qual3 = "";
        selt.zzType = qual.code+"||||";
        selt.queryList();
    };
    this.clickQual2 = function (qual2,quel1) {
        selt.qual1 = quel1;
        selt.qual2 = qual2;
        selt.qual3 = "";
        selt.zzType = quel1.code+"||"+qual2.code+"||";
        $("#bdd_second_menu").hide();
        selt.queryList();
    };
    this.clickQual3 = function (qual3,qual2,quel1) {
        selt.qual1 = quel1;
        selt.qual2 = qual2;
        selt.qual3 = qual3;
        selt.zzType = quel1.code+"||"+qual2.code+"||"+qual3.code;
        $("#bdd_second_menu").hide();
        selt.queryList();
    };
    this.cancelQUal = function () {
        this.zzType =null;
        this.qual1 = "";
        this.qual2 = "";
        this.qual3 = "";
        selt.queryList();
    };
    this.cancleEmQTwo = function () {
        selt.zzType = selt.qual1.code+"||||";
        selt.qual2="";
        selt.qual3="";
        selt.queryList();
    };
    this.cancleEmQThree = function () {
        selt.zzType = selt.qual1.code+"||"+selt.qual2.code+"||";
        selt.qual3="";
        selt.queryList();
    };

    this.zzList = [];
    this.zzOne = "";
    this.zzTwo = "";
    this.touchStart = function($event,qual2,qual1){
        var elem = $event.target;
        var grandFather = elem.parentNode.parentNode;
        var aArr = grandFather.getElementsByTagName("a");
        for(var i=0;i<aArr.length;i++){
            var aElem = aArr[i];
            aElem.parentNode.style.backgroundColor='#fff';
            aElem.style.color='#000';
        }
        elem.parentNode.style.backgroundColor='#A7BC6D';
        elem.style.color='#fff';
        var off = $($event.target).offset();
        var tocWidth = $($event.target).width();
        console.log(off.top);
        console.log(off.left);
        console.log(tocWidth);

        selt.zzList = qual2.list;
        selt.zzOne = qual1;
        selt.zzTwo = qual2;
        selt.setPage();
        selt.setPosition(qual2.list,off.left,off.top,tocWidth);
    };
    this.setPosition = function(arr,offX,offY,tocWidth){
        var secondMenu = document.getElementById('bdd_second_menu');
        $('#bdd_second_menu').css('left',(offX + tocWidth +45) + 'px');
        $('#bdd_second_menu').css('top',offY + 'px');
        if(arr!=null && arr.length>0) {
            $('#bdd_second_menu').css('border', '1px solid #ccc');
            $('#bdd_second_menu').show();
        }else{
            //secondMenu.style.display='none';
            $('#bdd_second_menu').hide();
        }
    };
    //----资质---end---





    this.morePro = false;
    this.moreProvince=function(morePro){
        selt.morePro = !morePro;
    };
    this.moreZz = false;
    this.moreSelectZz=function(moreZz){
        selt.moreZz = !moreZz;
    };

 //----注册资金---
    this.clickCapital = function (min,max) {
        selt.minCapital = min;
        selt.maxCapital = max;
        selt.priceArea = min+"-"+max+"万";
        selt.setPage();
    };
    this.clickPrice = function () {
        selt.priceArea = "";
        if(selt.minPrice&&selt.minPrice!=""){
            selt.minCapital = selt.minPrice;
        }else{
            selt.minCapital = 0;
        }
        if(selt.maxPrice&&selt.maxPrice!=""){
            selt.maxCapital = selt.maxPrice;
        }else{
            this.maxCapital = null;
        }
        selt.setPage();
    };
    this.canclePrice = function () {
        selt.priceArea = "";
        selt.minPrice="";
        selt.maxPrice="";
        this.minCapital = 0;
        this.maxCapital = null;
        selt.setPage();
    };
    //----注册资金---end








    //--翻页---例子
    this.companyList = [];
    this.busy = false;
    this.page = 1;
    this.setPage = function () {
        selt.companyList = [];
        selt.busy = false;
        selt.page = 1;
        selt.nextPage();
    };

    this.nextPage = function () {
        if (selt.busy) return;
        selt.busy = true;
        // var paramsPage = {
        //     regisAddress:selt.regisAddress,
        //     qualCode:selt.qualCode,
        //     minCapital:selt.minCapital,
        //     maxCapital:selt.maxCapital,
        //     pageNo:selt.page,
        //     pageSize:5
        // };
        //
        // $http.post("/company/query/filter", angular.toJson(paramsPage)).success(function (result) {
        //     var companyList = result.data;
        //     if(companyList!=null&&selt.page==result.pageNum){
        //         angular.forEach(companyList,function(company){
        //             selt.companyList.push(company);
        //         });
        //         selt.totalCount = result.total;
        //         selt.pageSize = result.pageSize;;
        //         selt.pageNo = result.pageNum;
        //         selt.busy = false;
        //         selt.page += 1;
        //         setContentHeight(result.data);
        //     }else{
        //         selt.totalCount = 0;
        //     }
        // });
    };
    //------------翻页----end














    function setContentHeight(dataList){
        var bdd_adver_header = document.getElementById("bdd_adver_header");
        if(dataList.length>2){
            bdd_adver_header.style.height="auto";
        }else{
            bdd_adver_header.style.height="500px";
        }

    }

    //#####公告请求开始
    //筛选条件
    this.pbModes=null;
    this.kbDateStart=null;
    this.kbDateEnd=null;
    this.projSumStart=null;
    this.projSumEnd=null;
    this.regions=null;
    this.zzType=null;
    this.projectType=null;
    this.type=0;

    this.resetParam =function () {
        this.pbModes=null;
        this.kbDateStart=null;
        this.kbDateEnd=null;
        this.projSumStart=null;
        this.projSumEnd=null;
        this.regions=null;
        this.zzType=null;
        this.projectType=null;
    }

    this.queryList= function (type){
        if(type){
            selt.type=type;
        }

        if(selt.type==0){
            selt.isTender =true;
        }else if(selt.type==2){
            selt.isTender =false;
        }
        var paramsPage = {
            pageNo:1,
            pageSize:20,
            type: selt.type
        };

        selt.pbModes='合理定价评审抽取法||综合评估法Ⅰ';
        selt.kbDateStart="2018-04-20";
        selt.kbDateEnd="2018-04-30";
        selt.projSumStart="0";
        selt.projSumEnd="500";
        // if(selt.province){
        //     selt.regions=selt.province+"||"+selt.city;
        // }


        if(selt.pbModes){
            paramsPage.pbModes=selt.pbModes;
        }
        if(selt.kbDateStart){
            paramsPage.kbDateStart=selt.kbDateStart;
        }
        if(selt.kbDateEnd){
            paramsPage.kbDateEnd=selt.kbDateEnd;
        }
        if(selt.projSumStart){
            paramsPage.projSumStart=selt.projSumStart;
        }
        if(selt.projSumEnd){
            paramsPage.projSumEnd=selt.projSumEnd;
        }
        if(selt.regions){
            paramsPage.regions=selt.regions;
        }
        if(selt.zzType){
            paramsPage.zzType=selt.zzType;
        }
        if(selt.projectType){
            paramsPage.projectType=selt.projectType;
        }

        console.log(paramsPage);
        $http.post("/notice/queryList", angular.toJson(paramsPage)).success(function (result) {
            console.log(result);
            selt.dataList = result.data;
        });
    };

    //页面初始化
    this.queryList(0);


    this.logout = function () {
        sessionStorage.removeItem("X-TOKEN");
        sessionStorage.removeItem("userTemp");
        userTemp = null;
        selt.user = null;
        window.location.href = "index.html#/home";
    };

}]);

