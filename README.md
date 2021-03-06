﻿# G_datePicker 

> jQuery日期选择器


+ 使用前需先引入jQuery。

+ 引入./output下的`g_datepicker.js`（未压缩版）或者`g_datepicker.min.js`（压缩版）。
+ 给需要作为日期输入框的input标签加上"g-date-picker"的类，默认日期格式为 yy-mm-dd XX:XX:XX。

+ 为该标签增加"g-day-picker"类，可作为只含年月日的日期选择器。

+ 为该标签增加"g-time-picker"类，可作为时间选择器，输出时分秒。

+ 为该标签增加自定义属性data-fomat="yy/mm/dd"，可指定日期的年月日输出格式为yy/mm/dd。


### 示例：

\<input class="g-date-picker"/><br/>


![](https://raw.githubusercontent.com/youngdro/G_datePicker/master/img/g-date-picker.png "时间日期选择器")


\<input class="g-date-picker g-day-picker"/><br/>


![](https://raw.githubusercontent.com/youngdro/G_datePicker/master/img/g-day-picker.png "日期选择器")


\<input class="g-date-picker g-time-picker"/><br/>

![](https://raw.githubusercontent.com/youngdro/G_datePicker/master/img/g-time-picker.png "时间选择器")


\<input class="g-date-picker g-day-picker" data-fomat="yy/mm/dd"/><br/>

![](https://raw.githubusercontent.com/youngdro/G_datePicker/master/img/g-day-picker2.png "日期选择器")