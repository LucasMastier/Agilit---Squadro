var $pr1 = document.getElementById('piece_red1');
var pr1Position = 0;

console.log($pr1);




$(function()
{
  $('#piece_red1').click(function()
                      {
                        console.log('test');
                        //$(this).animate({'left' : '75px'}, {duration : 400});
                        $(this).css({top:'auto'});   
                        $(this).animate({bottom:'485px'}, 400);

                    
                      });
 });