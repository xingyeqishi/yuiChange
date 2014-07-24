$('.left').mouseover(function() {
    $(this).css('overflow', 'scroll');
});
$('.left').mouseout(function() {
    $(this).css('overflow', 'hidden');
});
$(window).resize(function() {
    changeLeftH();
});
$('body').delegate('.J-module', 'click', function() {
    $('.selected').removeClass('selected');
    $(this).addClass('selected');
    $.ajax({
        url: "/" + $(this).data('name'),
        type: 'get'
    })
    .done(function( data ) {
        $('.J-detail-info').html(data);
    });
});
changeLeftH();
function changeLeftH() {
    var bh = $(window).height();
    $('.left').height(bh - 50 + 'px');
}
