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

require("../css/index.less");
var dateTpl = require("raw!../example/datepicker.html");
var _this = this;
var select_year_mode = require("./g_datepicker_select_year");
var timepicker = require("./g_datepicker_time_picker");
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