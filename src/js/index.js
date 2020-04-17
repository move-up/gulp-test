$(document).ready(function(){
  $('body').on('click', 'h1', function(){
    console.log('h1');
    alert($(this).text());
  })
})