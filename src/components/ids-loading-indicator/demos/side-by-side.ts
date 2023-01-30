import '../ids-loading-indicator.ts';

// Initialize the 4.x
$('body').initialize();
$(() => {
  $('#submit').click(() => {
    $('#busy-form').trigger('start.busyindicator');
  });
});
