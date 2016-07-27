module.exports = function (DatePicker) {
    var tpl = require('raw!./tpl.year.html');
    DatePicker.$html.find('.cal-box').append(tpl);
}