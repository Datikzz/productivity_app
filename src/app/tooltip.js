import jQuery from 'jquery';

(function ($) {
  const toolTip = document.createElement('div');
  toolTip.className='tooltip';
  $(document.body).append(toolTip);

  $.fn.tooltip = function () {
    $('.tooltip').hide();
    this.mouseenter(function(event) {
      toolTip.innerText = event.target.dataset.tooltip;
      $('.tooltip').show();
    });
    this.mousemove(function () {
      $('.tooltip').css({'top': event.pageY + 35, 'left': event.pageX - 15});
    });
    this.mouseleave(function () {
      $('.tooltip').hide();
    });
  };
})(jQuery);
