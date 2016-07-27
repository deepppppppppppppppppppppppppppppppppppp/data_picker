

module.exports = function (DatePicker) {
    var tpl = require('raw!./tpl.timepicker.html');
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
