/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by Administrator on 2016/7/19.
	 */
	
	module.exports = __webpack_require__(/*! ./src/g_datepicker */ 1);

/***/ },
/* 1 */
/*!*****************************!*\
  !*** ./src/g_datepicker.js ***!
  \*****************************/
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by Administrator on 2016/7/19.
	 */
	//module.exports = function () {
	//
	//}
	//(function($){
	//    $.fn.timePicker = function() {alert('time picker')}
	//})(jQuery)
	
	//var input_date_picker = $(".g-date-picker");
	
	__webpack_require__(/*! ../css/index.less */ 2);
	var dateTpl = __webpack_require__(/*! raw!../example/datepicker.html */ 6);
	var _this = this;
	var select_year_mode = __webpack_require__(/*! ./g_datepicker_select_year */ 7);
	var timepicker = __webpack_require__(/*! ./g_datepicker_time_picker */ 9);
	_this.$html = _this.$cal = $(dateTpl);
	select_year_mode(_this);
	timepicker(_this);
	var date_month = {
	    chinese: {"一月": "1", "二月": "2", "三月": "3", "四月": "4", "五月": "5", "六月": "6", "七月": "7", "八月": "8", "九月": "9", "十月": "10", "十一月": "11", "十二月": "12"},
	    english: {"January": "1", "February": "2", "March": "3", "April": "4", "May": "5", "June": "6", "July": "7", "August": "8", "September": "9", "October": "10", "November": "11", "December": "12"}
	};
	var date_month_language = date_month.chinese;
	
	var date = new Date(),
	    year = date.getFullYear(),
	    month = date.getMonth() + 1,
	    day = date.getDate();
	console.log(year+"-"+month+"-"+day);
	
	function valueToKey(obj,value){
	    for(var i in obj){
	        if(obj[i] == value){
	            return i;
	        }
	    }
	}
	
	//获取日期
	function getDate(){
	    var date = new Date();
	    return{
	        year:date.getFullYear(),
	        month:date.getMonth()+1,
	        day:date.getDate(),
	        hour:date.getHours(),
	        minute:date.getMinutes(),
	        seconds:date.getSeconds()
	    }
	}
	
	//初始化日历
	function initCal(yy,mm,dd){
	    //日历头部日期设置
	    var month_select = _this.$cal.find(".month-select-box");
	    month_select.empty();
	    $.each(date_month_language,function(n,value){
	        month_select.append($("<li></li>").text(n));
	    });
	    _this.$cal.find(".month-content").text(valueToKey(date_month_language,String(mm)));
	
	    var year_select = _this.$cal.find(".year-select-box");
	    var year_arr = [];
	    for(var i = yy-10; i < yy+10; i++){
	        year_arr.push(i);
	    }
	    year_select.empty();
	    $.each(year_arr,function(n,value){
	        year_select.append($("<li></li>").text(year_arr[n]+"年"));
	    });
	    _this.$cal.find(".year-content").text(yy+"年");
	
	    //年份模式设置当前月份背景
	    var content_year = parseInt(_this.$cal.find(".year-content").text());
	    var year_table = _this.$cal.find(".cal-box").find(".cal-year-table");
	    year_table.find("td").removeClass("month-choosed");
	    if(content_year == getDate().year){
	        year_table.find("td").eq(getDate().month-1).addClass("month-choosed");
	    }
	
	    var $td = _this.$cal.find(".cal-month-table").find('tbody').find('td');
	    _this.$cal.find(".year-content").data("year",yy);
	    _this.$cal.find(".month-content").data("month",mm);
	    var now_date = getDate();
	    var now_year = now_date.year;
	    var now_month = now_date.month;
	    var now_day = now_date.day;
	    var mm_pre = (mm == 1)? 12 : (mm-1);
	    var yy_pre = (mm_pre == 12)? (yy-1) : yy;
	    var mm_next = (mm == 12)? 1 : (mm+1);
	    var yy_next = (mm_next == 1)? (yy+1) : yy;
	    var calc_cal = calcCal(yy,mm);
	    var calc_cal_pre = calcCal(yy_pre,mm_pre);
	    var week_start = calc_cal.week;
	    //console.log("weekstart:"+week_start,'   ',calc_cal.days);
	    for(var i=0 ;i<42;i++){
	        $td.eq(i).text('');
	        $td.eq(i).removeAttr("class");
	        if(i < week_start){
	            $td.eq(i).text(calc_cal_pre.days - week_start + i + 1);
	            $td.eq(i).addClass("month-pre");
	        }
	        if(i >= week_start+calc_cal.days){
	            var num = i + 1 - calc_cal.days - week_start;
	            $td.eq(i).text(num<10?("0"+num):num);
	            $td.eq(i).addClass("month-next");
	        }
	        if(i >= week_start && i < (week_start+calc_cal.days)){
	            var num = i-week_start+1;
	            $td.eq(i).text(num<10?("0"+num):num);
	            if(yy == now_year && mm == now_month){
	                if((i-week_start+1) == now_day){
	                    $td.eq(i).addClass("day-choosed");
	                }
	            }
	            //else
	            //if((i-week_start+1) == dd){
	            //    $td.eq(i).addClass("day-choosed");
	            //}
	        }
	    }
	}
	
	//根据年份月份计算当月的天数与1号起始位置
	function calcCal(yy,mm){
	    var days;
	    if((mm ==2 && yy%4 == 0 && yy%100 !==0 )||(yy%100 == 0 && yy%400 == 0)){
	        days = 29;
	    }else if(mm == 1 || mm == 3 || mm == 5 || mm == 7 || mm == 8 || mm == 10 || mm == 12){
	        days = 31;
	    }else if(mm==4 || mm==6 || mm==9 || mm==11 ){
	        days = 30;
	    }else{
	        days = 28;
	    }
	    var m = mm < 3 ? (mm == 1 ? 13 : 14): mm;
	    yy = m > 12 ? yy - 1 : yy;
	    var c = Number(yy.toString().substring(0,2)),
	        y = Number(yy.toString().substring(2,4)),
	        d = 1;
	    //蔡勒公式
	    var week = y + parseInt(y/4) + parseInt(c/4) - 2*c + parseInt(26*(m+1)/10) + d - 1;
	    week = week < 0 ? (week%7+7)%7 : week%7;
	    return {
	        days:days,
	        week:week
	    }
	}
	
	//获取元素距离浏览器窗口周边的距离
	function getRect( elements ) {
	    var rect = elements.getBoundingClientRect();
	    var clientTop = document.documentElement.clientTop;
	    var clientLeft = document.documentElement.clientLeft;
	    return { // 兼容ie多出的两个px
	        top: rect.top - clientTop, // 距离顶部的位置
	        bottom: rect.bottom - clientTop, // 距离顶部加上元素本身的高度就等于bottom的位置
	        left: rect.left - clientLeft, // 距离左边的位置
	        right: rect.right - clientLeft // 距离右边的位置就是 距离左边的位置加上元素本身的宽度
	    };
	}
	
	var G_datepicker = {
	    init:function(that){
	        var __this = this;
	        initCal(year,month,day);
	        __this.date_pick = year+"-"+(month<10?"0"+month:month+"")+"-"+(day<10?"0"+day:day+"");
	        __this.time_pick = "00:00:00";
	        __this.render(that);
	        __this.blind();
	    },
	    render:function(that){
	        var __this = this;
	        __this.cal = that;
	        __this.cal_box = that.find(".cal-box");
	        __this.cal_head = that.find(".cal-head");
	        __this.year_add_plus = that.find(".cal-head").find(".year-add-plus");
	        __this.year_box = that.find(".cal-head").find(".year-box");
	        __this.month_box = that.find(".cal-head").find(".month-box");
	        __this.year_select_box = that.find(".cal-head").find(".year-box").find(".year-select-box");
	        __this.month_select_box = that.find(".cal-head").find(".month-box").find(".month-select-box");
	        __this.mode_box = that.find(".cal-head").find(".mode-box");
	        __this.cal_month_table = that.find(".cal-month-table");
	        __this.cal_year_table = that.find(".cal-year-table");
	    },
	    blind:function(){
	        var __this = this;
	        //点击在面板其他地方时收起日期选择
	        __this.cal.on("click",function(e){
	            if(!$(e.target).parent().hasClass("year-box")){
	                __this.year_box.removeClass("date-selected");
	                __this.year_box.find(".select-arrow").removeClass("arrow-drop-down");
	                __this.year_select_box.removeClass("select-box-show");
	            }
	            if(!$(e.target).parent().hasClass("month-box")){
	                __this.month_box.removeClass("date-selected");
	                __this.month_box.find(".select-arrow").removeClass("arrow-drop-down");
	                __this.month_select_box.removeClass("select-box-show");
	            }
	        });
	        //监听日期改变
	        __this.cal.on("datechange",function(){
	            var content_year = parseInt(__this.cal.find(".year-content").data("year"));
	            var content_month = parseInt(__this.cal.find(".month-content").data("month"));
	            initCal(content_year,content_month,0);
	            content_month = content_month<10?"0"+content_month:content_month+"";
	            __this.date_pick = content_year+"-"+content_month;
	            __this.dateOut();
	        });
	        //监听时间改变
	        __this.cal.on("timechange",function(e){
	            var target = $(e.target);
	            var time_picker_box = target.parent();
	            var hour_time = time_picker_box.find(".hour-picker").data("time_value");
	            var minute_time = time_picker_box.find(".minute-picker").data("time_value");
	            var second_time = time_picker_box.find(".second-picker").data("time_value");
	            __this.time_pick = hour_time+":"+minute_time+":"+second_time;
	            __this.dateOut();
	        });
	        //监听改变为现在时间
	        __this.cal.on("timechangetonow",function(e){
	            var target = $(e.target);
	            var dateNow = getDate();
	            initCal(dateNow.year,dateNow.month,0);
	            var time_picker_box = target.parent();
	            var hour_time = time_picker_box.find(".hour-picker").data("time_value");
	            var minute_time = time_picker_box.find(".minute-picker").data("time_value");
	            var second_time = time_picker_box.find(".second-picker").data("time_value");
	            __this.time_pick = hour_time+":"+minute_time+":"+second_time;
	            __this.dateOut();
	        });
	        __this.year_add_plus.on("click",">div", function (e) {
	            var target = $(e.target);
	            var _add = 0;
	            if(target.hasClass("year-add-box")){_add = 1;}
	            if(target.hasClass("year-plus-box")){_add = -1;}
	            var year_content = __this.year_box.find(".year-content");
	            year_content.text((parseInt(year_content.text())+_add)+"年");
	            year_content.data("year",parseInt(year_content.text()));
	            year_content.trigger("datechange");
	        })
	        //选择年份点击
	        __this.year_box.click(function(){
	            $(this).toggleClass("date-selected");
	            $(this).find(".select-arrow").toggleClass("arrow-drop-down");
	            __this.year_select_box.toggleClass("select-box-show");
	
	        });
	        //选择月份点击
	        __this.month_box.click(function(){
	            $(this).toggleClass("date-selected");
	            $(this).find(".select-arrow").toggleClass("arrow-drop-down");
	            __this.month_select_box.toggleClass("select-box-show");
	        });
	
	        //日期改变
	        __this.year_box.find(".year-select-box").on("click","li",function(e){
	            var year_content = __this.year_box.find(".year-content");
	            year_content.text($(e.target).text());
	            year_content.data("year",parseInt(year_content.text()));
	            year_content.trigger("datechange");
	        });
	        __this.month_box.find(".month-select-box").on("click","li",function(e){
	            var month_content = __this.month_box.find(".month-content");
	            month_content.text($(e.target).text());
	            month_content.data("month",date_month_language[month_content.text()]);
	            month_content.trigger("datechange");
	        });
	
	        //模式选择点击
	        __this.mode_box.on("click","span",function(e){
	            var target = $(e.target);
	            var mode = target.parent();
	            mode.parent().find("span").removeClass("mode-selected");
	            mode.addClass("mode-selected");
	            //月份模式
	            if(mode.hasClass("mode-month-box")){
	                __this.month_box.fadeIn();
	                __this.cal_box.removeClass("mode-year");
	            }
	            //年份模式
	            if(mode.hasClass("mode-year-box")){
	                __this.month_box.hide();
	                __this.cal_box.addClass("mode-year");
	            }
	        });
	
	        //具体日期选择
	        __this.cal_month_table.on("click","tbody td",function(e){
	            var target = $(e.target);
	            var _month = __this.cal.find(".month-content").data("month");
	            var _year = __this.cal.find(".year-content").data("year");
	            var _add = 0;
	            if(target.hasClass("month-pre")){
	                _add = -1;
	            }
	            if(target.hasClass("month-next")){
	                _add = 1;
	            }
	            _month += _add;
	            if(_month < 1){
	                _month = 12;
	                _year--;
	            }
	            if(_month > 12){
	                _month = 1;
	                _year++;
	            }
	            var month_pick = _month.toString();
	            __this.date_pick = _year+"-"+(month_pick.length==1?("0"+month_pick):month_pick)+"-"+target.text();
	            __this.dateOut();
	        });
	
	        //具体月份选择
	        __this.cal_year_table.on("click","td",function(e){
	            var _month = String($(e.target).data("month"));
	            var _year = __this.cal.find(".year-content").data("year");
	            _month = _month.length==1?"0"+_month:_month;
	            __this.date_pick = _year+"-"+_month;
	            var month_content = __this.month_box.find(".month-content");
	            month_content.text($(e.target).text());
	            month_content.data("month",date_month_language[month_content.text()]);
	            __this.mode_box.find("span.mode-month-box").find("input").trigger("click");
	            month_content.trigger("datechange");
	            __this.dateOut();
	        });
	
	        __this.cal.on("mouseleave",function(){
	            __this.leave = true;
	            console.log("leave");
	        });
	        __this.cal.on("mouseenter",function(){
	            __this.leave = false;
	            console.log("enter")
	        });
	
	    },
	    dateOut:function(){
	        var __this = this;
	        var whole_date = __this.date_pick+" "+__this.time_pick;
	        //var focus_input = $(document).find("input:focus");
	        //console.log(whole_date);
	
	        __this.input_target.val(whole_date);
	
	    }
	};
	
	G_datepicker.init(_this.$cal);
	
	$(document).on("focus",".g-date-picker",function(e){
	    _this.$cal.hide();
	    var rect = getRect(e.target);
	    _this.$cal.css("top",(rect.top+$(e.target).height()+10)+"px");
	    _this.$cal.css("left",rect.left+"px");
	    _this.$cal.fadeIn(200);
	    G_datepicker.input_target = $(e.target);
	});
	$(document).on("blur",".g-date-picker",function(e){
	    if(G_datepicker.leave){
	        _this.$cal.fadeOut();
	    }
	    console.log(G_datepicker.leave);
	});
	_this.$cal.hide();
	$("body").append(_this.$cal);

/***/ },
/* 2 */
/*!************************!*\
  !*** ./css/index.less ***!
  \************************/
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(/*! !./../~/css-loader!./../~/less-loader!./index.less */ 3);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(/*! ./../~/style-loader/addStyles.js */ 5)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../node_modules/css-loader/index.js!./../node_modules/less-loader/index.js!./index.less", function() {
				var newContent = require("!!./../node_modules/css-loader/index.js!./../node_modules/less-loader/index.js!./index.less");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 3 */
/*!*******************************************************!*\
  !*** ./~/css-loader!./~/less-loader!./css/index.less ***!
  \*******************************************************/
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(/*! ./../~/css-loader/lib/css-base.js */ 4)();
	// imports
	
	
	// module
	exports.push([module.id, ".cal-container {\n  position: absolute;\n  width: 261px;\n  top: 0px;\n  left: 0px;\n  border: 1px solid #d9d9d9;\n  border-radius: 5px;\n  overflow-x: hidden;\n  background: #fff;\n}\n.cal-container .cal-head {\n  position: relative;\n  width: 100%;\n  padding: 10px 0;\n}\n.cal-container .cal-head .cal-head-content:after {\n  content: '';\n  display: block;\n  clear: both;\n}\n.cal-container .cal-head .cal-head-content .year-add-plus {\n  position: relative;\n  width: 20px;\n  top: 5px;\n  left: 10px;\n}\n.cal-container .cal-head .cal-head-content .year-add-plus > div {\n  width: 100%;\n  cursor: pointer;\n}\n@media screen and (min-width: 901px) {\n  .cal-container .cal-head .cal-head-content .year-add-plus .year-add-box:hover:before {\n    border-bottom: 6px solid #5ec8f7;\n  }\n}\n@media screen and (max-width: 900px) {\n  .cal-container .cal-head .cal-head-content .year-add-plus .year-add-box:active:before {\n    border-bottom: 6px solid #5ec8f7;\n  }\n}\n.cal-container .cal-head .cal-head-content .year-add-plus .year-plus-box {\n  margin-top: 5px;\n}\n@media screen and (min-width: 901px) {\n  .cal-container .cal-head .cal-head-content .year-add-plus .year-plus-box:hover:before {\n    border-top: 6px solid #5ec8f7;\n  }\n}\n@media screen and (max-width: 900px) {\n  .cal-container .cal-head .cal-head-content .year-add-plus .year-plus-box:active:before {\n    border-top: 6px solid #5ec8f7;\n  }\n}\n.cal-container .cal-head .cal-head-content .year-add-plus .year-add-box:before,\n.cal-container .cal-head .cal-head-content .year-add-plus .year-plus-box:before {\n  content: '';\n  display: block;\n  width: 0;\n  height: 0;\n  border-right: 8px solid transparent;\n  border-left: 8px solid transparent;\n  -webkit-transition: 0.2s ease-out;\n  -moz-transition: 0.2s ease-out;\n  -o-transition: 0.2s ease-out;\n  transition: 0.2s ease-out;\n}\n.cal-container .cal-head .cal-head-content .year-add-plus .year-add-box:before {\n  border-top: 0;\n  border-bottom: 6px solid #c0c0c0;\n}\n.cal-container .cal-head .cal-head-content .year-add-plus .year-plus-box:before {\n  border-bottom: 0;\n  border-top: 6px solid #c0c0c0;\n}\n.cal-container .cal-head .cal-head-content .year-box .year-content,\n.cal-container .cal-head .cal-head-content .month-box .month-content {\n  padding-left: 5px;\n  padding-right: 27px;\n  overflow: hidden;\n}\n.cal-container .cal-head .cal-head-content .year-box,\n.cal-container .cal-head .cal-head-content .month-box {\n  text-align: left;\n  position: relative;\n  float: right;\n  font-size: 13px;\n  color: #666;\n  border: 1px solid #d9d9d9;\n  border-radius: 4px;\n  cursor: pointer;\n  transition: 0.2s ease-out;\n  margin-right: 5px;\n  line-height: 25px;\n  min-height: 27px;\n  /*选择框下拉出现*/\n}\n.cal-container .cal-head .cal-head-content .year-box:hover,\n.cal-container .cal-head .cal-head-content .month-box:hover {\n  border: 1px solid #2db7f5;\n}\n.cal-container .cal-head .cal-head-content .year-box ul,\n.cal-container .cal-head .cal-head-content .month-box ul {\n  visibility: hidden;\n  height: 0;\n  opacity: 0;\n  position: absolute;\n  list-style: none;\n  padding: 0;\n  width: 100px;\n  background: #fff;\n  border: 1px solid #d9d9d9;\n  top: 19px;\n  left: 0;\n  border-radius: 4px;\n  max-height: 250px;\n  overflow: auto;\n  -webkit-transition: 0.2s ease-out;\n  -moz-transition: 0.2s ease-out;\n  -o-transition: 0.2s ease-out;\n  transition: 0.2s ease-out;\n}\n.cal-container .cal-head .cal-head-content .year-box ul li,\n.cal-container .cal-head .cal-head-content .month-box ul li {\n  padding: 4px 10px;\n  margin: 0;\n}\n.cal-container .cal-head .cal-head-content .year-box ul li:hover,\n.cal-container .cal-head .cal-head-content .month-box ul li:hover {\n  background: #f0fafe;\n}\n.cal-container .cal-head .cal-head-content .year-box ul.select-box-show,\n.cal-container .cal-head .cal-head-content .month-box ul.select-box-show {\n  opacity: 1;\n  visibility: visible;\n  height: 250px;\n}\n.cal-container .cal-head .cal-head-content .year-box.date-selected,\n.cal-container .cal-head .cal-head-content .month-box.date-selected {\n  border: 1px solid #2db7f5;\n}\n.cal-container .cal-head .cal-head-content .select-arrow {\n  position: absolute;\n  top: 50%;\n  right: 10px;\n  display: block;\n  font-size: 13px;\n  margin-top: -15px;\n  -webkit-transform: rotate(-90deg);\n  -moz-transform: rotate(-90deg);\n  -o-transform: rotate(-90deg);\n  transform: rotate(-90deg);\n  -webkit-transition: 0.2s ease-out;\n  -moz-transition: 0.2s ease-out;\n  -o-transition: 0.2s ease-out;\n  transition: 0.2s ease-out;\n}\n.cal-container .cal-head .cal-head-content .select-arrow.arrow-drop-down {\n  -webkit-transform: rotate(90deg);\n  -moz-transform: rotate(90deg);\n  -o-transform: rotate(90deg);\n  transform: rotate(90deg);\n}\n.cal-container .cal-head .cal-head-content .mode-box {\n  float: right;\n  width: 65px;\n  margin-right: 13px;\n  /*模式选中*/\n}\n.cal-container .cal-head .cal-head-content .mode-box > span {\n  position: relative;\n  display: block;\n  float: left;\n  text-align: center;\n  border: 1px solid #d9d9d9;\n  border-radius: 50%;\n  width: 27px;\n  height: 27px;\n  margin-left: 5px;\n  box-sizing: border-box;\n  -webkit-transition: 0.2s ease-out;\n  -moz-transition: 0.2s ease-out;\n  -o-transition: 0.2s ease-out;\n  transition: 0.2s ease-out;\n}\n.cal-container .cal-head .cal-head-content .mode-box > span .mode-radio {\n  position: absolute;\n  left: -5px;\n  top: -4px;\n  cursor: pointer;\n  width: 100%;\n  height: 100%;\n  opacity: 0;\n}\n.cal-container .cal-head .cal-head-content .mode-box > span:hover {\n  border: 1px solid #2db7f5;\n}\n.cal-container .cal-head .cal-head-content .mode-box > span > label {\n  display: block;\n  line-height: 27px;\n  font-size: 13px;\n  color: #666;\n  cursor: pointer;\n}\n.cal-container .cal-head .cal-head-content .mode-box span.mode-selected {\n  border: 1px solid #2db7f5;\n}\n.cal-container .cal-head .cal-head-content .mode-box span.mode-selected label {\n  color: #2db7f5;\n}\n.cal-container .cal-box {\n  margin-left: 0px;\n  box-sizing: border-box;\n  width: 200%;\n  padding: 8px;\n  border-top: 1px solid #d9d9d9;\n  -webkit-transition: 0.2s ease-out;\n  -moz-transition: 0.2s ease-out;\n  -o-transition: 0.2s ease-out;\n  transition: 0.2s ease-out;\n}\n.cal-container .cal-box table {\n  display: inline-block;\n  border-collapse: collapse;\n}\n.cal-container .cal-box table thead td,\n.cal-container .cal-box table tbody td {\n  width: 35px;\n  height: 35px;\n  margin: 0;\n  padding: 0px;\n  line-height: 35px;\n  text-align: center;\n  font-family: Arial;\n  font-size: 14px;\n}\n.cal-container .cal-box table thead td {\n  color: #666;\n}\n.cal-container .cal-box table thead td.sun,\n.cal-container .cal-box table thead td.sta {\n  color: #2db7f5;\n}\n.cal-container .cal-box table tbody td {\n  color: #666;\n  cursor: pointer;\n}\n.cal-container .cal-box table tbody td:hover {\n  background: #f0fafe;\n}\n.cal-container .cal-box table tbody td.today {\n  background: #666;\n  color: #fff;\n}\n.cal-container .cal-box table tbody td.day-choosed {\n  background: #2db7f5;\n  color: #fff;\n}\n.cal-container .cal-box table tbody td.month-pre,\n.cal-container .cal-box table tbody td.month-next {\n  color: #ccc;\n}\n.cal-container .cal-box table.cal-year-table tbody td {\n  box-sizing: border-box;\n  font-size: 12px;\n  width: 83px;\n  height: 60px;\n}\n.cal-container .cal-box table.cal-year-table tbody td.month-choosed {\n  background: #2db7f5;\n  color: #fff;\n}\n.cal-container .cal-box.mode-year {\n  margin-left: -254px;\n}\n.cal-container .time-picker-box {\n  position: relative;\n  margin-top: 10px;\n  height: 80px;\n}\n.cal-container .time-picker-box .hour-picker,\n.cal-container .time-picker-box .minute-picker,\n.cal-container .time-picker-box .second-picker {\n  position: relative;\n  border-radius: 5px;\n  width: 112px;\n  height: 7px;\n  background: #fff;\n  margin-bottom: 15px;\n  margin-left: 25px;\n  border: 1px solid #d9d9d9;\n  cursor: pointer;\n  /*滚动按钮*/\n}\n.cal-container .time-picker-box .hour-picker .picker-btn,\n.cal-container .time-picker-box .minute-picker .picker-btn,\n.cal-container .time-picker-box .second-picker .picker-btn {\n  position: absolute;\n  width: 12px;\n  height: 12px;\n  border-radius: 50%;\n  background: #fff;\n  border: 1px solid #a6a6a6;\n  top: 50%;\n  margin-top: -7px;\n  left: 0px;\n  cursor: pointer;\n  /*时间值*/\n}\n.cal-container .time-picker-box .hour-picker .picker-btn .time-value,\n.cal-container .time-picker-box .minute-picker .picker-btn .time-value,\n.cal-container .time-picker-box .second-picker .picker-btn .time-value {\n  opacity: 0;\n  visibility: hidden;\n  position: absolute;\n  display: block;\n  padding: 0 2px;\n  left: -3px;\n  top: -25px;\n  width: 15px;\n  height: 15px;\n  font-size: 13px;\n  border: 1px solid #2db7f5;\n  text-align: center;\n  line-height: 15px;\n  color: #2db7f5;\n  background: #fff;\n  -webkit-transition: 0.2s ease-out;\n  -moz-transition: 0.2s ease-out;\n  -o-transition: 0.2s ease-out;\n  transition: 0.2s ease-out;\n}\n.cal-container .time-picker-box .hour-picker .picker-btn .time-value.time-show,\n.cal-container .time-picker-box .minute-picker .picker-btn .time-value.time-show,\n.cal-container .time-picker-box .second-picker .picker-btn .time-value.time-show {\n  visibility: visible;\n  opacity: 1;\n}\n.cal-container .time-picker-box .hour-picker .picker-btn .time-value:after,\n.cal-container .time-picker-box .minute-picker .picker-btn .time-value:after,\n.cal-container .time-picker-box .second-picker .picker-btn .time-value:after {\n  content: '';\n  display: block;\n  position: absolute;\n  top: 15px;\n  left: 50%;\n  margin-left: -10px;\n  width: 0;\n  height: 0;\n  border-top: 6px solid #2db7f5;\n  border-bottom: 6px solid transparent;\n  border-left: 10px solid transparent;\n  border-right: 10px solid transparent;\n}\n.cal-container .time-picker-box .hour-picker .picker-btn:hover,\n.cal-container .time-picker-box .minute-picker .picker-btn:hover,\n.cal-container .time-picker-box .second-picker .picker-btn:hover {\n  border: 1px solid #2db7f5;\n}\n.cal-container .time-picker-box .hour-picker .picker-btn:hover .time-value,\n.cal-container .time-picker-box .minute-picker .picker-btn:hover .time-value,\n.cal-container .time-picker-box .second-picker .picker-btn:hover .time-value {\n  opacity: 1;\n  visibility: visible;\n}\n.cal-container .time-picker-box .time-picker-name {\n  position: absolute;\n  top: -4px;\n  left: 125px;\n  font-size: 13px;\n  color: #666;\n}\n.cal-container .time-picker-box .time-now-box {\n  position: absolute;\n  top: 0px;\n  width: 50px;\n  height: 50px;\n  border: 1px solid #b3b3b3;\n  color: #666;\n  border-radius: 50%;\n  left: 186px;\n  letter-spacing: 3px;\n  text-align: center;\n  line-height: 50px;\n  cursor: pointer;\n  -webkit-transition: 0.1s ease-out;\n  -moz-transition: 0.1s ease-out;\n  -o-transition: 0.1s ease-out;\n  transition: 0.1s ease-out;\n}\n.cal-container .time-picker-box .time-now-box:hover {\n  border: 1px solid #2db7f5;\n  color: #2db7f5;\n}\n", ""]);
	
	// exports


/***/ },
/* 4 */
/*!**************************************!*\
  !*** ./~/css-loader/lib/css-base.js ***!
  \**************************************/
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];
	
		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};
	
		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },
/* 5 */
/*!*************************************!*\
  !*** ./~/style-loader/addStyles.js ***!
  \*************************************/
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];
	
	module.exports = function(list, options) {
		if(true) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}
	
		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();
	
		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";
	
		var styles = listToStyles(list);
		addStylesToDom(styles, options);
	
		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}
	
	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}
	
	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}
	
	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}
	
	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}
	
	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}
	
	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}
	
	function addStyle(obj, options) {
		var styleElement, update, remove;
	
		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}
	
		update(obj);
	
		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}
	
	var replaceText = (function () {
		var textStore = [];
	
		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();
	
	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;
	
		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}
	
	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;
	
		if(media) {
			styleElement.setAttribute("media", media)
		}
	
		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}
	
	function updateLink(linkElement, obj) {
		var css = obj.css;
		var sourceMap = obj.sourceMap;
	
		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}
	
		var blob = new Blob([css], { type: "text/css" });
	
		var oldSrc = linkElement.href;
	
		linkElement.href = URL.createObjectURL(blob);
	
		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ },
/* 6 */
/*!************************************************!*\
  !*** ./~/raw-loader!./example/datepicker.html ***!
  \************************************************/
/***/ function(module, exports) {

	module.exports = "<div class=\"cal-container\">\r\n    <div class=\"cal-head\">\r\n        <div class=\"cal-head-content\">\r\n            <div class=\"mode-box\">\r\n                <span class=\"mode-month-box mode-selected\">\r\n                    <input type=\"radio\" name=\"cal-mode\" class=\"mode-radio\"/>\r\n                    <label class=\"mode-month\">月</label>\r\n                </span>\r\n                <span class=\"mode-year-box\">\r\n                    <input type=\"radio\" name=\"cal-mode\" class=\"mode-radio\"/>\r\n                    <label class=\"mode-year\">年</label>\r\n                </span>\r\n            </div>\r\n            <div class=\"month-box\">\r\n                <div class=\"month-content\">七月</div>\r\n                <span class=\"select-arrow\">&lt;</span>\r\n                <ul class=\"month-select-box\">\r\n                    <!--<li>一月</li>-->\r\n                </ul>\r\n            </div>\r\n            <div class=\"year-box\">\r\n                <div class=\"year-content\">2016年</div>\r\n                <span class=\"select-arrow\">&lt;</span>\r\n                <ul class=\"year-select-box\">\r\n                    <!--<li>1995年</li>-->\r\n                </ul>\r\n            </div>\r\n            <div class=\"year-add-plus\">\r\n                <div class=\"year-add-box\"></div>\r\n                <div class=\"year-plus-box\"></div>\r\n            </div>\r\n            <!--<div class=\"go-today\">今-->\r\n\r\n            <!--</div>-->\r\n        </div>\r\n    </div>\r\n    <div class=\"cal-box\">\r\n        <table cellspacing=\"0\" cellpadding=\"0\" class=\"cal-month-table\">\r\n            <thead>\r\n            <tr>\r\n                <td class=\"sun\">日</td>\r\n                <td>一</td>\r\n                <td>二</td>\r\n                <td>三</td>\r\n                <td>四</td>\r\n                <td>五</td>\r\n                <td class=\"sta\">六</td>\r\n\r\n            </tr>\r\n            </thead>\r\n            <tbody>\r\n            <tr>\r\n                <td></td>\r\n                <td></td>\r\n                <td></td>\r\n                <td></td>\r\n                <td></td>\r\n                <td></td>\r\n                <td></td>\r\n            </tr>\r\n            <tr>\r\n                <td></td>\r\n                <td></td>\r\n                <td></td>\r\n                <td></td>\r\n                <td></td>\r\n                <td></td>\r\n                <td></td>\r\n            </tr>\r\n            <tr>\r\n                <td></td>\r\n                <td></td>\r\n                <td></td>\r\n                <td></td>\r\n                <td></td>\r\n                <td></td>\r\n                <td></td>\r\n            </tr>\r\n            <tr>\r\n                <td></td>\r\n                <td></td>\r\n                <td></td>\r\n                <td></td>\r\n                <td></td>\r\n                <td></td>\r\n                <td></td>\r\n            </tr>\r\n            <tr>\r\n                <td></td>\r\n                <td></td>\r\n                <td></td>\r\n                <td></td>\r\n                <td></td>\r\n                <td></td>\r\n                <td></td>\r\n            </tr>\r\n            <tr>\r\n                <td></td>\r\n                <td></td>\r\n                <td></td>\r\n                <td></td>\r\n                <td></td>\r\n                <td></td>\r\n                <td></td>\r\n            </tr>\r\n            </tbody>\r\n        </table>\r\n        <!--<table cellspacing=\"0\" cellpadding=\"0\" class=\"cal-year-table\">-->\r\n            <!--<tbody>-->\r\n            <!--<tr>-->\r\n                <!--<td data-month=\"1\">一月</td>-->\r\n                <!--<td data-month=\"2\">二月</td>-->\r\n                <!--<td data-month=\"3\">三月</td>-->\r\n            <!--</tr>-->\r\n            <!--<tr>-->\r\n                <!--<td data-month=\"4\">四月</td>-->\r\n                <!--<td data-month=\"5\">五月</td>-->\r\n                <!--<td data-month=\"6\">六月</td>-->\r\n\r\n            <!--</tr>-->\r\n            <!--<tr>-->\r\n                <!--<td data-month=\"7\" class=\"month-choosed\">七月</td>-->\r\n                <!--<td data-month=\"8\">八月</td>-->\r\n                <!--<td data-month=\"9\">九月</td>-->\r\n            <!--</tr>-->\r\n            <!--<tr>-->\r\n                <!--<td data-month=\"10\">十月</td>-->\r\n                <!--<td data-month=\"11\">十一月</td>-->\r\n                <!--<td data-month=\"12\">十二月</td>-->\r\n            <!--</tr>-->\r\n            <!--</tbody>-->\r\n        <!--</table>-->\r\n    </div>\r\n\r\n</div>"

/***/ },
/* 7 */
/*!*****************************************!*\
  !*** ./src/g_datepicker_select_year.js ***!
  \*****************************************/
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by Administrator on 2016/7/22.
	 */
	module.exports = function (DatePicker) {
	    var tpl = __webpack_require__(/*! raw!./tpl.year.html */ 8);
	    DatePicker.$html.find('.cal-box').append(tpl);
	    DatePicker.$html.on('click', '.mode-year-box', function () {
	        //DatePicker.$html.find('.cal-box').find(".")
	    })
	}

/***/ },
/* 8 */
/*!******************************************!*\
  !*** ./~/raw-loader!./src/tpl.year.html ***!
  \******************************************/
/***/ function(module, exports) {

	module.exports = "<table cellspacing=\"0\" cellpadding=\"0\" class=\"cal-year-table\">\r\n    <tbody>\r\n    <tr>\r\n        <td data-month=\"1\">一月</td>\r\n        <td data-month=\"2\">二月</td>\r\n        <td data-month=\"3\">三月</td>\r\n    </tr>\r\n    <tr>\r\n        <td data-month=\"4\">四月</td>\r\n        <td data-month=\"5\">五月</td>\r\n        <td data-month=\"6\">六月</td>\r\n\r\n    </tr>\r\n    <tr>\r\n        <td data-month=\"7\">七月</td>\r\n        <td data-month=\"8\">八月</td>\r\n        <td data-month=\"9\">九月</td>\r\n    </tr>\r\n    <tr>\r\n        <td data-month=\"10\">十月</td>\r\n        <td data-month=\"11\">十一月</td>\r\n        <td data-month=\"12\">十二月</td>\r\n    </tr>\r\n    </tbody>\r\n</table>"

/***/ },
/* 9 */
/*!*****************************************!*\
  !*** ./src/g_datepicker_time_picker.js ***!
  \*****************************************/
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by Administrator on 2016/7/22.
	 */
	
	module.exports = function (DatePicker) {
	    var tpl = __webpack_require__(/*! raw!./tpl.timepicker.html */ 10);
	    var _this = this;
	    var time_picker_value;
	    _this.hour_btn = {
	        hour:0,
	        hour_down:false
	    };
	    _this.minute_btn = {
	        minute:0,
	        minute_down:false
	    };
	    _this.second_btn = {
	        second:0,
	        second_down:false
	    };
	    _this.mouse_x = 0;
	
	    DatePicker.$html.append(tpl);
	    //鼠标按下滑动按钮
	    DatePicker.$html.on('mousedown', '.picker-btn', function (e) {
	        var target = $(e.target);
	        var btn_left = parseInt(target.css("left"));
	        if(target.hasClass("hour-picker-btn")){_this.hour_btn.hour = btn_left; _this.hour_btn.hour_down = true;}
	        if(target.hasClass("minute-picker-btn")){_this.minute_btn.minute = btn_left; _this.minute_btn.minute_down = true;}
	        if(target.hasClass("second-picker-btn")){_this.second_btn.second = btn_left; _this.second_btn.second_down = true;}
	        _this.mouse_x = e.clientX;
	    });
	
	    //鼠标放下滑动按钮
	    DatePicker.$html.on('mouseup', '', function (e) {
	        _this.hour_btn.hour_down = false;
	        _this.minute_btn.minute_down = false;
	        _this.second_btn.second_down = false;
	    });
	
	    //鼠标在滑动条上移动
	    DatePicker.$html.on("mousemove","",function(e){
	        var mouse_cur_x = e.clientX;
	        if(_this.hour_btn.hour_down == true){btnMove("hour");}
	        if(_this.minute_btn.minute_down == true){btnMove("minute");}
	        if(_this.second_btn.second_down == true){btnMove("second");}
	        function btnMove(which){
	            var cur_left = mouse_cur_x - _this.mouse_x + _this[which+"_btn"][which] + $(e.target).find(".picker-btn").width()/2;
	            cur_left = cur_left<0?0:(cur_left>100?100:cur_left);
	            linear_gradient(DatePicker.$html.find(".time-picker-box").find("."+which+"-picker"),cur_left);
	            DatePicker.$html.find(".time-picker-box").find("."+which+"-picker-btn").css("left",cur_left+"px");
	        }
	    });
	
	    //滚动条点击
	    DatePicker.$html.on("click",".time-picker-box>div",function(e){
	        var target = $(e.target);
	        if(target.parent().hasClass("time-picker-box")){
	            var length_left = getRect(e.target).left;
	            var new_left = e.clientX-length_left-target.find(".picker-btn").width()/2;
	            new_left = new_left<0?0:(new_left>100?100:new_left);
	            linear_gradient(target,new_left);
	
	            target.find(">div").css("left",(new_left)+"px");
	        }
	    });
	    DatePicker.$html.on("click",".time-now-box",function(){
	        var nowdate  = getDate();
	        var nowhour = nowdate.hour;
	        var nowminute = nowdate.minute;
	        var nowsecond = nowdate.seconds;
	        var hour_picker = DatePicker.$html.find(".hour-picker");
	        var minute_picker = DatePicker.$html.find(".minute-picker");
	        var second_picker = DatePicker.$html.find(".second-picker");
	        var hour_left = parseInt(nowhour/23*(hour_picker.width()-12));
	        var minute_left = parseInt(nowminute/59*(minute_picker.width()-12));
	        var second_left = parseInt(nowsecond/59*(second_picker.width()-12));
	        linear_gradient(hour_picker,hour_left);
	        linear_gradient(minute_picker,minute_left);
	        linear_gradient(second_picker,second_left);
	        hour_picker.find(".picker-btn").css("left",hour_left+"px");
	        minute_picker.find(".picker-btn").css("left",minute_left+"px");
	        second_picker.find(".picker-btn").css("left",second_left+"px");
	        DatePicker.$html.find(".time-value").addClass("time-show");
	        setTimeout(function(){DatePicker.$html.find(".time-value").removeClass("time-show");},1000);
	        hour_picker.trigger("timechangetonow");
	    });
	    //监听时刻改变事件
	    //DatePicker.$html.on("timechange",">div",function(e){
	    //    var target = $(e.target);
	    //    var time_picker_box = target.parent();
	    //    var hour_time = time_picker_box.find(".hour-picker").data("time_value");
	    //    var minute_time = time_picker_box.find(".minute-picker").data("time_value");
	    //    var second_time = time_picker_box.find(".second-picker").data("time_value");
	    //    time_picker_value = hour_time+":"+minute_time+":"+second_time;
	    //});
	
	};
	
	//获取元素距离浏览器窗口周边的距离
	function getRect( elements ) {
	    var rect = elements.getBoundingClientRect();
	    var clientTop = document.documentElement.clientTop;
	    var clientLeft = document.documentElement.clientLeft;
	    return { // 兼容ie多出的两个px
	        top: rect.top - clientTop, // 距离顶部的位置
	        bottom: rect.bottom - clientTop, // 距离顶部加上元素本身的高度就等于bottom的位置
	        left: rect.left - clientLeft, // 距离左边的位置
	        right: rect.right - clientLeft // 距离右边的位置就是 距离左边的位置加上元素本身的宽度
	    };
	}
	
	//设置渐变改变滑动条进度，计算时间值
	function linear_gradient(target,width){
	    var progress = (width/(target.width()-target.find(".picker-btn").width())).toFixed(2);
	    var value = "";
	    target.data("progress",progress);
	    if(target.hasClass("hour-picker")){
	        value = (23*progress).toFixed(0);
	    }else{
	        value = (59*progress).toFixed(0);
	    }
	    value = value<10?"0"+value : value+"";
	    target.data("time_value",value);
	    target.find(".time-value").text(value);
	    target.trigger("timechange");
	    width = width + target.find(".picker-btn").width()/2;
	    target.css("background","-webkit-linear-gradient(left,#2db7f5 "+width+"px,#fff 0px)");
	    target.css("background","-moz-linear-gradient(left,#2db7f5 "+width+"px,#fff 0px)");
	    target.css("background","-o-linear-gradient(left,#2db7f5 "+width+"px,#fff 0px)");
	}
	//获取日期
	function getDate(){
	    var date = new Date();
	    return{
	        year:date.getFullYear(),
	        month:date.getMonth()+1,
	        day:date.getDate(),
	        hour:date.getHours(),
	        minute:date.getMinutes(),
	        seconds:date.getSeconds()
	    }
	}


/***/ },
/* 10 */
/*!************************************************!*\
  !*** ./~/raw-loader!./src/tpl.timepicker.html ***!
  \************************************************/
/***/ function(module, exports) {

	module.exports = "<div class=\"time-picker-box\">\r\n    <div class=\"hour-picker\" data-progress=\"0\" data-time_value=\"00\">\r\n        <div class=\"hour-picker-btn picker-btn\">\r\n            <span class=\"hour-value time-value\">00</span>\r\n        </div>\r\n        <span class=\"hour-name time-picker-name\">时</span>\r\n    </div>\r\n    <div class=\"minute-picker\" data-progress=\"0\" data-time_value=\"00\">\r\n        <div class=\"minute-picker-btn picker-btn\">\r\n            <span class=\"minute-value time-value\">00</span>\r\n        </div>\r\n        <span class=\"minute-name time-picker-name\">分</span>\r\n    </div>\r\n    <div class=\"second-picker\" data-progress=\"0\" data-time_value=\"00\">\r\n        <div class=\"second-picker-btn picker-btn\">\r\n            <span class=\"second-value time-value\">00</span>\r\n        </div>\r\n        <span class=\"second-name time-picker-name\">秒</span>\r\n    </div>\r\n    <a class=\"time-now-box\">此刻</a>\r\n</div>"

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map