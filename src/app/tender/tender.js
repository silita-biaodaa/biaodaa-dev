app.controller('tenderIndex', ['$http', '$scope', 'utils', '$stateParams', '$state', 'userTemp', function ($http, $scope, utils, $stateParams, $state, userTemp) {
    var selt = this;
    if (userTemp != null) {
        selt.user = angular.fromJson(userTemp);
    } else {
        selt.user = null;
    }

    Array.prototype.indexOf = function (val) {
        for (var i = 0; i < this.length; i++) {
            if (this[i] == val) return i;
        }
        return -1;
    };
    Array.prototype.remove = function (val) {
        var index = this.indexOf(val);
        if (index > -1) {
            this.splice(index, 1);
        }
    };


    $http.get("/company/filter").success(function (result) {
        console.log(result.data.pbMode);
        console.log(result.data.area);


        var arr1 = [];
        var arr2 = [];
        if (result.code == 1) {
            selt.pbModeList = result.data.pbMode;

            for (var i = 0; i < result.data.area.length; i++) {
                var areaArr = result.data.area;
                if (i < 14) {
                    arr1.push(areaArr[i]);
                } else {
                    arr2.push(areaArr[i]);
                }
            }
            selt.areaList = arr1;
            console.log(arr1);
            selt.areaList2 = arr2;
            console.log(arr2);
            var arr1 = [];
            var arr2 = [];
            var companyQualList = result.data.companyQual;

            if (companyQualList != null && companyQualList.length > 0) {
                for (var i = 0; i < companyQualList.length; i++) {
                    if (i < 8) {
                        arr1.push(companyQualList[i]);
                    } else {
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
        selt.resetParam();
        selt.queryList();
    };


    //----省市----
    this.clickProvince = function (area) {
        selt.regions = area.name + "||";
        selt.province = area.name;
        selt.isCity = true;
        selt.cityList = area.list;
        selt.queryList();
    };
    this.clickCity = function (city) {
        selt.regions = selt.province + "||" + city;
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
        selt.regions = selt.province + "||";
        selt.city = "";
        selt.setPage();
    };
    //---省市----end

    //评标办法
    selt.isShowMore = false;
    this.showMore = function (isShowMore) {
        selt.isShowMore = !isShowMore;
    }


    //---资质----
    this.clickQual1 = function (qual) {
        selt.qual1 = qual;
        selt.qual2 = "";
        selt.qual3 = "";
        selt.zzType = qual.code + "||||";
        selt.queryList();
    };
    this.clickQual2 = function (qual2, quel1) {
        selt.qual1 = quel1;
        selt.qual2 = qual2;
        selt.qual3 = "";
        selt.zzType = quel1.code + "||" + qual2.code + "||";
        $("#bdd_second_menu").hide();
        selt.queryList();
    };
    this.clickQual3 = function (qual3, qual2, quel1) {
        selt.qual1 = quel1;
        selt.qual2 = qual2;
        selt.qual3 = qual3;
        selt.zzType = quel1.code + "||" + qual2.code + "||" + qual3.code;
        $("#bdd_second_menu").hide();
        selt.queryList();
    };
    this.cancelQUal = function () {
        this.zzType = null;
        this.qual1 = "";
        this.qual2 = "";
        this.qual3 = "";
        selt.queryList();
    };
    this.cancleEmQTwo = function () {
        selt.zzType = selt.qual1.code + "||||";
        selt.qual2 = "";
        selt.qual3 = "";
        selt.queryList();
    };
    this.cancleEmQThree = function () {
        selt.zzType = selt.qual1.code + "||" + selt.qual2.code + "||";
        selt.qual3 = "";
        selt.queryList();
    };

    this.zzList = [];
    this.zzOne = "";
    this.zzTwo = "";
    this.touchStart = function ($event, qual2, qual1) {
        var elem = $event.target;
        var grandFather = elem.parentNode.parentNode;
        var aArr = grandFather.getElementsByTagName("a");
        for (var i = 0; i < aArr.length; i++) {
            var aElem = aArr[i];
            aElem.parentNode.style.backgroundColor = '#fff';
            aElem.style.color = '#000';
        }
        elem.parentNode.style.backgroundColor = '#A7BC6D';
        elem.style.color = '#fff';
        var off = $($event.target).offset();
        var tocWidth = $($event.target).width();
        console.log(off.top);
        console.log(off.left);
        console.log(tocWidth);

        selt.zzList = qual2.list;
        selt.zzOne = qual1;
        selt.zzTwo = qual2;
        selt.setPage();
        selt.setPosition(qual2.list, off.left, off.top, tocWidth);
    };
    this.setPosition = function (arr, offX, offY, tocWidth) {
        var secondMenu = document.getElementById('bdd_second_menu');
        $('#bdd_second_menu').css('left', (offX + tocWidth + 45) + 'px');
        $('#bdd_second_menu').css('top', offY + 'px');
        if (arr != null && arr.length > 0) {
            $('#bdd_second_menu').css('border', '1px solid #ccc');
            $('#bdd_second_menu').show();
        } else {
            //secondMenu.style.display='none';
            $('#bdd_second_menu').hide();
        }
    };
    //----资质---end---


    this.morePro = false;
    this.moreProvince = function (morePro) {
        selt.morePro = !morePro;
    };
    this.moreZz = false;
    this.moreSelectZz = function (moreZz) {
        selt.moreZz = !moreZz;
    };


    //----注册资金---end


    //--翻页---例子
    this.noticeList = [];
    this.busy = false;
    this.page = 1;
    this.setPage = function () {
        selt.noticeList = [];
        selt.page = 1;
        selt.nextPage();
    };

    this.nextPage = function () {
        if (selt.busy) return;
        selt.busy = true;
        var paramsPage = {
            pageNo: selt.page,
            pageSize: 5,
            type: selt.type,
            kbDateStart:selt.kbDateStart,
            kbDateEnd:selt.kbDateEnd,
            projSumStart:selt.projSumStart,
            projSumEnd:selt.projSumEnd,
            regions:selt.regions,
            zzType:selt.zzType,
            projectType:selt.projectType
        };
        if (selt.pbModes && selt.pbModes instanceof Array) {
            paramsPage.pbModes = selt.pbModes.join("||");
        }
        if(selt.keyword){
            paramsPage.title=selt.keyword;
        }

        $http.post("/notice/queryList", angular.toJson(paramsPage)).success(function (result) {
            var noticeList = result.data;
            selt.totalCount = result.total;
            if (noticeList != null &&
                selt.page == result.pageNo) {
                angular.forEach(noticeList, function (notice) {
                    selt.noticeList.push(notice);
                });
                selt.pageSize = result.pageSize;
                selt.pageNo = result.pageNo;

                selt.page += 1;
            }
            selt.busy = false;
            console.log(paramsPage);
            console.log(result);
        }).error(function (data){
            console.log(data);
            selt.busy = false;
        });
    };

    this.setContentHeight = function (dataList) {
        var bdd_adver_header = document.getElementById("bdd_adver_header");
        if (dataList.length > 2) {
            bdd_adver_header.style.height = "auto";
        } else {
            bdd_adver_header.style.height = "500px";
        }
    };
    //------------翻页----end


    //#####公告请求开始

    //项目类型
    this.choiceProjectType = function (projectType) {
        selt.projectType = projectType;
        switch (projectType) {
            case '0':
                selt.projectTypeDesc = '施工';
                break;
            case '2':
                selt.projectTypeDesc = '监理';
                break;
            case '3':
                selt.projectTypeDesc = '采购';
                break;
            case '1':
                selt.projectTypeDesc = '设计';
                break;
            case '4':
                selt.projectTypeDesc = '勘察';
                break;
            default:
                selt.projectTypeDesc = null;
                break;
        }
        selt.queryList();
    };

    this.cancelProjectType = function () {
        selt.projectType = null;
        selt.projectTypeDesc = null;
        selt.queryList();
    };

    //评标办法
    this.pbModeChange = function (obj) {
        selt.pbModes = [];
        // selt.pbModes=selt.pbModes.concat(obj);
        if (selt.pb) {
            for (var item in selt.pb) {
                if (selt.pb[item]) {
                    selt.pbModes.push(selt.pb[item]);
                }

            }
            console.info(selt.pbModes);
            selt.queryList();
        }
        return true;
    }
    this.canclePbMode = function (obj) {
        console.log(selt.pbModes+'###'+obj);
        if (selt.pbModes) {
            selt.pbModes.remove(obj);
            for (var item in selt.pb) {
                if (obj == selt.pb[item]) {
                    // console.log(obj+'###'+selt.pb[item]);
                    var el = document.getElementById(obj);
                    el.setAttribute("class", "ng-pristine ng-untouched ng-valid ng-empty");
                    // console.log(el.getAttribute("class"));
                    selt.pb[item] = null;
                }
            }
        }
        console.log(selt.pbModes);
        selt.queryList();
    }

    this.updateChecked = function (str) {
        // console.log(str+'##'+selt.pbModes);
        for (var t in selt.pbModes) {
            if (selt.pbModes[t].toString() == str.toString()) {
                // console.log(selt.pbModes[t]+'@@@'+str);
                // console.log("true");
                return true;
            }
        }
        return false;
    }

    //项目金额
    this.clickProjSum = function (start, end) {
        console.log(start + "@@" + end);
        if (start != null && end != null) {
            selt.projSumStart = start;
            selt.projSumEnd = end;
        }
        selt.queryList();
    }
    this.canclePrice = function () {
        selt.projSumStart = null;
        selt.projSumEnd = null;
        selt.queryList();
    }

    //开标时间
    this.clickKbDate = function () {
        console.log(selt.kbDateStart + "##" + selt.kbDateEnd)
        selt.queryList();
    }
    this.cancelKbDate = function () {
        selt.kbDateStart = null;
        selt.kbDateEnd = null;
        selt.queryList();
    }


    //筛选条件
    this.pbModes = null;
    this.kbDateStart = null;
    this.kbDateEnd = null;
    this.projSumStart = null;
    this.projSumEnd = null;
    this.regions = null;
    this.zzType = null;
    this.projectType = null;
    this.type = 0;

    this.resetParam = function () {
        this.province = "";
        this.city = "";
        this.qual1 = "";
        this.qual2 = "";
        this.qual3 = "";
        this.pbModes = null;
        this.kbDateStart = null;
        this.kbDateEnd = null;
        this.projSumStart = null;
        this.projSumEnd = null;
        this.regions = null;
        this.zzType = null;
        this.projectType = null;
        this.totalCount = 0;
    };

/*    this.queryList = function (type) {
        if (type) {
            selt.type = type;
        }

        if (selt.type == 0) {
            selt.isTender = true;
        } else if (selt.type == 2) {
            selt.isTender = false;
        }
        var paramsPage = {
            pageNo: 1,
            pageSize: 20,
            type: selt.type
        };

        if (selt.pb) {
            if (selt.pbModes && selt.pbModes instanceof Array) {
                paramsPage.pbModes = selt.pbModes.join("||");
            }
        }
        if (selt.kbDateStart) {
            paramsPage.kbDateStart = selt.kbDateStart;
        }
        if (selt.kbDateEnd) {
            paramsPage.kbDateEnd = selt.kbDateEnd;
        }
        if (selt.projSumStart) {
            paramsPage.projSumStart = selt.projSumStart;
        }
        if (selt.projSumEnd) {
            paramsPage.projSumEnd = selt.projSumEnd;
        }
        if (selt.regions) {
            paramsPage.regions = selt.regions;
        }
        if (selt.zzType) {
            paramsPage.zzType = selt.zzType;
        }
        if (selt.projectType) {
            paramsPage.projectType = selt.projectType;
        }

        console.log(paramsPage);
        $http.post("/notice/queryList", angular.toJson(paramsPage)).success(function (result) {
            console.log(result);
            selt.dataList = result.data;
            selt.totalCount = result.total;
        });
    };*/
    this.keyword =  "";
    var keyword = utils.getUrlVar('keyword');
    var noticeType =  utils.getUrlVar('type');

    this.queryList = function (type) {
        if (type != undefined){
            selt.type = type;
        }
        selt.setPage();
    }

    if(keyword){
        selt.keyword = decodeURI(keyword);
        console.log(selt.keyword);
    }
    if(noticeType){
        selt.queryList(noticeType);
    }else{
        //页面初始化
        selt.queryList(0);
    }




    this.logout = function () {
        sessionStorage.removeItem("X-TOKEN");
        sessionStorage.removeItem("userTemp");
        userTemp = null;
        selt.user = null;
        window.location.href = "index.html#/home";
    };

}]);

