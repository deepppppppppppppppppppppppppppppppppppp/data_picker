/**
 * Created by Administrator on 2016/7/22.
 */
module.exports = function (DatePicker) {
    var tpl = require('raw!./tpl.year.html');
    DatePicker.$html.find('.cal-box').append(tpl);
    DatePicker.$html.on('click', '.mode-year-box', function () {
        //DatePicker.$html.find('.cal-box').find(".")
    })
}