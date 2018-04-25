app.controller('tenderIndex', ['$http', '$scope', 'utils', '$stateParams', '$state','username', function ($http, $scope, utils, $stateParams, $state,username) {
    var selt = this;
    if(username != null && username != '') {
        selt.user = {
            username : username
        };
    } else {
        selt.user = null;
    }

    this.isCity = false;
    this.projectTypeDesc=null;
    this.projectType=null;//分类

    //0:施工,2:监理,3:采购,1:设计,4:勘察
    this.changeProjectType = function(projectType){
        this.projectType=projectType;
        switch(projectType){
            case '0':this.projectTypeDesc='施工';break;
            case '2':this.projectTypeDesc='监理';break;
            case '3':this.projectTypeDesc='采购';break;
            case '1':this.projectTypeDesc='设计';break;
            case '4':this.projectTypeDesc='勘察';break;
            default:this.projectTypeDesc=null;break;
        }
        console.log(this.projectType+"###"+this.projectTypeDesc);
    };

    this.cancleProjectTypeDesc = function () {
        this.projectTypeDesc=null;
        this.projectType=null;
    };

    function setContentHeight(dataList){
        var bdd_adver_header = document.getElementById("bdd_adver_header");
        if(dataList.length>2){
            bdd_adver_header.style.height="auto";
        }else{
            bdd_adver_header.style.height="500px";
        }

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

    this.setPage = function (pageNo) {
        var paramsPage = {
            regisAddress:selt.regisAddress,
            qualCode:selt.qualCode,
            minCapital:selt.minCapital,
            maxCapital:selt.maxCapital,
            pageNo:pageNo,
            pageSize:5
        };
        $http.post("/company/query/filter",angular.toJson(paramsPage)).success(function (result) {
            selt.companyList = result.data;
            selt.totalCount = result.total;
            selt.pageSize = result.pageSize;;
            selt.pageNo = result.pageNum;
            setContentHeight(result.data);
        });
    };

    this.clickProvince = function (area) {
        selt.regisAddress = area.name+"||";
        selt.province = area.name;
        selt.isCity = true;
        selt.cityList = area.list;
        var moreCity = document.getElementById("bdd_dev_city");
        moreCity.style.display="block";

        selt.setPage(1);

    };

    this.moreProvince=function($event){
        var elem = $event.target;
        changeStaus(elem);
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

    this.clickCity = function (city) {
        selt.regisAddress = selt.province+"||"+city;
        selt.city = city;
        selt.isCity = true;
        selt.setPage(1);
    };

    this.cancelArea = function () {
        this.regisAddress = "";
        this.province = "";
        this.city = "";
        selt.setPage(1);
    };
    this.cancleEmProvince = function () {

        selt.province="";
        selt.setPage(1);
    };
    this.cancleEmCity = function () {

        selt.city="";
        selt.setPage(1);
    };
    this.cancleEmQone = function () {

        selt.qual1="";
        selt.setPage(1);
    };
    this.cancleEmQTwo = function () {

        selt.qual2="";
        selt.setPage(1);
    };
    this.cancelQUal = function () {
        this.qualCode = "";
        this.qual1 = "";
        this.qual2 = "";
        this.qual3 = "";
        selt.setPage(1);
    };
    this.clickQual1 = function (qual) {
        selt.qual1 = qual.name;
        selt.qual2 = "";
        selt.qual3 = "";
        selt.qualCode = qual.code+"||||";
        selt.setPage(1);
    };

    this.clickQual2 = function ($event,qual2,quel1) {

        // 获取到当前点击元素在页面中的坐标
        var off = $($event.target).offset();
        console.log(off.top);
        console.log(off.left);
        selt.qual2 = qual2.name;
        selt.qualCode = quel1.code+"||"+qual2.code+"||";
        selt.qual=quel1.name;
        selt.setPage(1);
    };

    this.cancleEmProvince = function () {
        selt.province="";
        selt.setPage(1);
    };
    this.cancelFilter = function () {
        this.regisAddress = "";
        this.qualCode = "";
        this.province = "";
        this.city = "";
        this.qual1 = "";
        this.qual2 = "";
        this.qual3 = "";
        this.priceArea = "";
        this.projectTypeDesc=null;
        this.projectType=null;
        selt.setPage(1);
    };


    //#####公告请求开始
    var paramsPage = {
        pageNo:1,
        pageSize:20,
        type: 0
    };
    selt.paramsPage=paramsPage;

    this.queryList= function (type){
        paramsPage.type=type;
        if(type==0){
            $scope.isTender =true;
        }else if(type==2){
            $scope.isTender =false;
        }
        $http.post("/notice/queryList", angular.toJson(paramsPage),
            {headers: {'X-TOKEN':  sessionStorage.getItem('X-TOKEN')}})
            .success(function (result) {
            console.log(result);
            $scope.dataList = result.data;
        });
    };

    //页面初始化
    this.queryList(2);

    //
    // var id = $stateParams.id;
    // var dataArray = [];
    // var resArray = [];
    // $scope.currentNum = 0;
    // $scope.bdSize = 0;
    //
    // var his = function () {
    //     var paramsPage = {
    //         type: 0
    //     }
    //     $http.post("/notice/queryRelNotice/" + id, angular.toJson(paramsPage)).success(function (result) {
    //         //console.log(result);
    //         dataArray = result.data;
    //         $scope.tenderArrayData = dataArray;
    //         $scope.firstTender = dataArray[0];
    //
    //     })
    //     $http.post("/notice/detail/" + id, angular.toJson(paramsPage), {
    //         headers: {'X-TOKEN': sessionStorage.getItem('X-TOKEN')}
    //     }).success(function (result) {
    //         //console.log(result);
    //
    //         $scope.projSum = result.projSum;
    //         $scope.mSize = result.data.length;
    //         $scope.dataArrayList = result.data;
    //         $scope.currentTender = result.data[0];
    //         $scope.bdSize = result.data.length;
    //         $scope.fileCount = result.fileCount;
    //         $scope.relNoticeCount = result.data[0].relNoticeCount;
    //         if (result.data.length > 0) {
    //             $scope.currentNum = 1;
    //         }
    //
    //         $("#bdd_follow_info_one").html(result.data[0].content);
    //         resArray = result.data;
    //     });
    //     $http.post("/notice/queryCompanyList/" + id, {
    //         headers: {'X-TOKEN': sessionStorage.getItem('X-TOKEN')}
    //     }).success(function (result) {
    //         console.log(result);
    //         $scope.copanyResultArr = result.data;
    //
    //     });
    //     $scope.toCurrentTender = function (index) {
    //         $scope.currentTender = resArray[index];
    //         $scope.relNoticeCount = resArray[index].relNoticeCount;
    //         $("#bdd_follow_info_one").html(resArray[index].content);
    //         $scope.currentNum = index + 1;
    //     };
    //     $scope.toTenderSayList = function (id, type) {
    //         $state.go('TenderSay', {id: id, type: type});
    //     };
    // }
    this.logout = function() {
        sessionStorage.removeItem("X-TOKEN");
        sessionStorage.removeItem("username");
        username = "";
        selt.user = null;
        window.location.href="index.html#/home";
    };

}]);

