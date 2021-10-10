//Pièces rouges

var $pr1 = document.getElementById('piece_red1');
var $pr2 = document.getElementById('piece_red2');
var $pr3 = document.getElementById('piece_red3');
var $pr4 = document.getElementById('piece_red4');
var $pr5 = document.getElementById('piece_red5');


var pr1Position = 0;
var pr2Position = 0;
var pr3Position = 0;
var pr4Position = 0;
var pr5Position = 0;

var verticalPositions = [620,540,423,305,187,69,0];
var horizontalPositions = [0,76,194,313,430,547,620];
//0-75-192-309-426-543-620

//Pièces jaunes

var $pj1 = document.getElementById('piece_yellow1');
var $pj2 = document.getElementById('piece_yellow2');
var $pj3 = document.getElementById('piece_yellow3');
var $pj4 = document.getElementById('piece_yellow4');
var $pj5 = document.getElementById('piece_yellow5');

var pj1Position = 0;
var pj2Position = 0;
var pj3Position = 0;
var pj4Position = 0;
var pj5Position = 0;




$(function()
{
  $($pr1).click(function()
                      { 
                        
                        switch(pr1Position){
                            case 0:
                            //$(this).animate({'left' : '75px'}, {duration : 400});
                            $(this).css({top:'auto'});   
                            $(this).animate({bottom: verticalPositions[1]+'px'}, 400);
                            pr1Position +=1;
                            break;
                        

                            case 1:
                            //$(this).animate({'left' : '75px'}, {duration : 400});
                            $(this).css({top:'auto'});   
                            $(this).animate({bottom:verticalPositions[2]+'px'}, 400);
                            pr1Position +=1;
                            break;


                            case 2:
                            //$(this).animate({'left' : '75px'}, {duration : 400});
                            $(this).css({top:'auto'});   
                            $(this).animate({bottom: verticalPositions[3]+'px'}, 400);
                            pr1Position +=1;
                            break;

                            case 3:
                            //$(this).animate({'left' : '75px'}, {duration : 400});
                            $(this).css({top:'auto'});   
                            $(this).animate({bottom: verticalPositions[4]+'px'}, 400);
                            pr1Position +=1;
                            break;

                            case 4:
                            //$(this).animate({'left' : '75px'}, {duration : 400});
                            $(this).css({top:'auto'});   
                            $(this).animate({bottom: verticalPositions[5]+'px'}, 400);
                            pr1Position +=1;
                            break;

                            case 5:
                            //$(this).animate({'left' : '75px'}, {duration : 400});
                            $(this).css({top:'auto'});   
                            $(this).animate({bottom: verticalPositions[6]+'px'}, 400, function() {
                              $($pr1).css("backgroundPosition","-33px -206px")
                            });
                            pr1Position +=1;
                            break;

                            case 6:
                            //$(this).animate({'left' : '75px'}, {duration : 400});
                            $(this).css({top:'auto'});   
                            $(this).animate({bottom: verticalPositions[3]+'px'}, 400);
                            pr1Position +=3;
                            break;


                            case 9:
                            //$(this).animate({'left' : '75px'}, {duration : 400});
                            $(this).css({top:'auto'});   
                            $(this).animate({bottom: verticalPositions[0]+'px'}, 400);
                            pr1Position +=3;
                            break;
                            
                        }
                        

                    
                      });
 });


 

//--------------------------------------------------------------------------------------------------
// Deuxième pièce rouge 

$(function()
{
  $($pr2).click(function()
                      { 
                        
                        switch(pr2Position){
                            case 0:
                            //$(this).animate({'left' : '75px'}, {duration : 400});
                            $(this).css({top:'auto'});   
                            $(this).animate({bottom: verticalPositions[3]+'px'}, 400);
                            pr2Position +=3;
                            break;
                        

                            case 3:
                            //$(this).animate({'left' : '75px'}, {duration : 400});
                            $(this).css({top:'auto'});   
                            $(this).animate({bottom:verticalPositions[6]+'px'}, 400,function(){
                              $($pr2).css("backgroundPosition","-33px -206px")
                            });
                            pr2Position +=3;
                            break;

                            case 6:
                            //$(this).animate({'left' : '75px'}, {duration : 400});
                            $(this).css({top:'auto'});   
                            $(this).animate({bottom: verticalPositions[5]+'px'}, 400);
                            pr2Position +=1;
                            break;

                            case 7:
                            //$(this).animate({'left' : '75px'}, {duration : 400});
                            $(this).css({top:'auto'});   
                            $(this).animate({bottom: verticalPositions[4]+'px'}, 400);
                            pr2Position +=1;
                            break;

                            case 8:
                            //$(this).animate({'left' : '75px'}, {duration : 400});
                            $(this).css({top:'auto'});   
                            $(this).animate({bottom: verticalPositions[3]+'px'}, 400);
                            pr2Position +=1;
                            break;


                            case 9:
                            //$(this).animate({'left' : '75px'}, {duration : 400});
                            $(this).css({top:'auto'});   
                            $(this).animate({bottom: verticalPositions[2]+'px'}, 400);
                            pr2Position +=1;
                            break;
                            

                            case 10:
                            //$(this).animate({'left' : '75px'}, {duration : 400});
                            $(this).css({top:'auto'});   
                            $(this).animate({bottom: verticalPositions[1]+'px'}, 400);
                            pr2Position +=1;
                            break;

                            case 11:
                            //$(this).animate({'left' : '75px'}, {duration : 400});
                            $(this).css({top:'auto'});   
                            $(this).animate({bottom: verticalPositions[0]+'px'}, 400);
                            pr2Position +=1;
                            break;
                        }
                        

                    
                      });
 });


//----------------------------------------------------------------------------------------
//Troisième pièce rouge 
$(function()
{
  $($pr3).click(function()
                      { 
                        
                        switch(pr3Position){
                            case 0:
                            //$(this).animate({'left' : '75px'}, {duration : 400});
                            $(this).css({top:'auto'});   
                            $(this).animate({bottom: verticalPositions[2]+'px'}, 400);
                            pr3Position +=2;
                            break;
                        

                            case 2:
                            //$(this).animate({'left' : '75px'}, {duration : 400});
                            $(this).css({top:'auto'});   
                            $(this).animate({bottom:verticalPositions[4]+'px'}, 400);
                            pr3Position +=2;
                            break;

                            case 4:
                            //$(this).animate({'left' : '75px'}, {duration : 400});
                            $(this).css({top:'auto'});   
                            $(this).animate({bottom: verticalPositions[6]+'px'}, 400, function(){
                              $($pr3).css("backgroundPosition","-33px -206px")
                            });
                            pr3Position +=2;
                            break;

                            case 6:
                            //$(this).animate({'left' : '75px'}, {duration : 400});
                            $(this).css({top:'auto'});   
                            $(this).animate({bottom: verticalPositions[4]+'px'}, 400);
                            pr3Position +=2;
                            break;

                            case 8:
                            //$(this).animate({'left' : '75px'}, {duration : 400});
                            $(this).css({top:'auto'});   
                            $(this).animate({bottom: verticalPositions[2]+'px'}, 400);
                            pr3Position +=2;
                            break;


                            case 10:
                            //$(this).animate({'left' : '75px'}, {duration : 400});
                            $(this).css({top:'auto'});   
                            $(this).animate({bottom: verticalPositions[0]+'px'}, 400);
                            pr3Position +=2;
                            break;
                            

                        }
                        

                    
                      });
 });

//---------------------------------------------------------------------------------------------
//Quatrième pièce rouge 

$(function()
{
  $($pr4).click(function()
                      { 
                        
                        switch(pr4Position){
                            case 0:
                            //$(this).animate({'left' : '75px'}, {duration : 400});
                            $(this).animate({bottom:verticalPositions[3]+'px'}, 400);
                            $(this).css({top:'auto'});   
                            
                            pr4Position +=3;
                            break;
                        

                            case 3:
                            //$(this).animate({'left' : '75px'}, {duration : 400});
                            $(this).css({top:'auto'});   
                            $(this).animate({bottom:verticalPositions[6]+'px'}, 400, function(){
                              $($pr4).css("backgroundPosition","-33px -206px");
                            });
                            pr4Position +=3;
                            break;

                            case 6:
                            //$(this).animate({'left' : '75px'}, {duration : 400});
                            $(this).css({top:'auto'});   
                            $(this).animate({bottom: verticalPositions[5]+'px'}, 400);
                            pr4Position +=1;
                            break;

                            case 7:
                            //$(this).animate({'left' : '75px'}, {duration : 400});
                            $(this).css({top:'auto'});   
                            $(this).animate({bottom: verticalPositions[4]+'px'}, 400);
                            pr4Position +=1;
                            break;

                            case 8:
                            //$(this).animate({'left' : '75px'}, {duration : 400});
                            $(this).css({top:'auto'});   
                            $(this).animate({bottom: verticalPositions[3]+'px'}, 400);
                            pr4Position +=1;
                            break;


                            case 9:
                            //$(this).animate({'left' : '75px'}, {duration : 400});
                            $(this).css({top:'auto'});   
                            $(this).animate({bottom: verticalPositions[2]+'px'}, 400);
                            pr4Position +=1;
                            break;
                            

                            case 10:
                            //$(this).animate({'left' : '75px'}, {duration : 400});
                            $(this).css({top:'auto'});   
                            $(this).animate({bottom: verticalPositions[1]+'px'}, 400);
                            pr4Position +=1;
                            break;

                            case 11:
                            //$(this).animate({'left' : '75px'}, {duration : 400});
                            $(this).css({top:'auto'});   
                            $(this).animate({bottom: verticalPositions[0]+'px'}, 400);
                            pr4Position +=1;
                            break;
                        }
                        

                    
                      });
 });


//------------------------------------------------------------------------------------------
//Cinquième pièce rouge

$(function()
{
  $($pr5).click(function()
                      { 
                        
                        switch(pr5Position){
                            case 0:
                            //$(this).animate({'left' : '75px'}, {duration : 400});
                            $(this).css({top:'auto'});   
                            $(this).animate({bottom: verticalPositions[1]+'px'}, 400);
                            pr5Position +=1;
                            break;
                        

                            case 1:
                            //$(this).animate({'left' : '75px'}, {duration : 400});
                            $(this).css({top:'auto'});   
                            $(this).animate({bottom:verticalPositions[2]+'px'}, 400);
                            pr5Position +=1;
                            break;


                            case 2:
                            //$(this).animate({'left' : '75px'}, {duration : 400});
                            $(this).css({top:'auto'});   
                            $(this).animate({bottom: verticalPositions[3]+'px'}, 400);
                            pr5Position +=1;
                            break;

                            case 3:
                            //$(this).animate({'left' : '75px'}, {duration : 400});
                            $(this).css({top:'auto'});   
                            $(this).animate({bottom: verticalPositions[4]+'px'}, 400);
                            pr5Position +=1;
                            break;

                            case 4:
                            //$(this).animate({'left' : '75px'}, {duration : 400});
                            $(this).css({top:'auto'});   
                            $(this).animate({bottom: verticalPositions[5]+'px'}, 400);
                            pr5Position +=1;
                            break;

                            case 5:
                            //$(this).animate({'left' : '75px'}, {duration : 400});
                            $(this).css({top:'auto'});   
                            $(this).animate({bottom: verticalPositions[6]+'px'}, 400, function(){
                              $($pr5).css("backgroundPosition","-33px -206px")
                            });
                            pr5Position +=1;
                            break;

                            case 6:
                            //$(this).animate({'left' : '75px'}, {duration : 400});
                            $(this).css({top:'auto'});   
                            $(this).animate({bottom: verticalPositions[3]+'px'}, 400);
                            pr5Position +=3;
                            break;


                            case 9:
                            //$(this).animate({'left' : '75px'}, {duration : 400});
                            $(this).css({top:'auto'});   
                            $(this).animate({bottom: verticalPositions[0]+'px'}, 400);
                            pr5Position +=3;
                            break;
                            
                        }
                        

                    
                      });
 });


//-------------------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------------
//Fonctions permettant le déplacement des pièces Jaunes


//Première pièce jaune

$(function()
{
  $($pj1).click(function()
                      { 
                        
                        switch(pj1Position){
                            case 0:
                            
                              
                            $(this).animate({'left' : horizontalPositions[3]}, {duration : 400});
                            pj1Position +=3;
                            break;
                        

                            case 3:
                            
                            
                            $(this).animate({'left' : horizontalPositions[6]}, 400, function(){
                              $($pj1).css("background-position","112px 280px")
                            });
                            pj1Position +=3;
                            break;


                            case 6:
                            
                            
                            $(this).animate({'left' : horizontalPositions[5]}, {duration : 400});
                            pj1Position +=1;
                            break;

                            case 7:
                            
                            
                            $(this).animate({'left' : horizontalPositions[4]}, {duration : 400});
                            pj1Position +=1;
                            break;

                            case 8:
                            
                            
                            $(this).animate({'left' : horizontalPositions[3]}, {duration : 400});
                            pj1Position +=1;
                            break;

                            case 9:
                            
                            
                            $(this).animate({'left' : horizontalPositions[2]}, {duration : 400});
                            pj1Position +=1;
                            break;

                            case 10:
                            
                            
                            $(this).animate({'left' : horizontalPositions[1]}, {duration : 400});
                            pj1Position +=1;
                            break;


                            case 11:
                            
                            
                            $(this).animate({'left' : horizontalPositions[0]}, {duration : 400});
                            pj1Position +=1;
                            break;
                            
                        }
                        

                    
                      });
 });


//--------------------------------------------------------------------------------------------
//Deuxième pièce jaune

$(function()
{
  $($pj2).click(function()
                      { 
                        
                        switch(pj2Position){
                            case 0:
                            
                              
                            $(this).animate({'left' : horizontalPositions[1]}, {duration : 400});
                            pj2Position +=1;
                            break;

                            case 1:
                            
                              
                            $(this).animate({'left' : horizontalPositions[2]}, {duration : 400});
                            pj2Position +=1;
                            break;

                            case 2:
                            
                              
                            $(this).animate({'left' : horizontalPositions[3]}, {duration : 400});
                            pj2Position +=1;
                            break;
                        

                            case 3:
                            
                            
                            $(this).animate({'left' : horizontalPositions[4]}, {duration : 400});
                            pj2Position +=1;
                            break;

                            case 4:
                            
                            
                            $(this).animate({'left' : horizontalPositions[5]}, {duration : 400});
                            pj2Position +=1;
                            break;

                            case 5:
                            
                              
                            $(this).animate({'left' : horizontalPositions[6]}, 400, function(){
                              $($pj2).css("background-position","112px 280px")
                            });
                            pj2Position +=1;
                            break;


                            case 6:
                            
                            
                            $(this).animate({'left' : horizontalPositions[3]}, {duration : 400});
                            pj2Position +=3;
                            break;


                            case 9:
                            
                            
                            $(this).animate({'left' : horizontalPositions[0]}, {duration : 400});
                            pj2Position +=3;
                            break;
                            
                        }
                        

                    
                      });
 });


//-----------------------------------------------------------------------------------------------------
//Troisième pièce jaune

$(function()
{
  $($pj3).click(function()
                      { 
                        
                        switch(pj3Position){
                            case 0:
                            
                              
                            $(this).animate({'left' : horizontalPositions[2]}, {duration : 400});
                            pj3Position +=2;
                            break;


                            case 2:
                            
                              
                            $(this).animate({'left' : horizontalPositions[4]}, {duration : 400});
                            pj3Position +=2;
                            break;
                        

                            case 4:
                            
                            
                            $(this).animate({'left' : horizontalPositions[6]}, 400, function(){
                              $($pj3).css("background-position","112px 280px")
                            });
                            pj3Position +=2;
                            break;



                            case 6:
                            
                            
                            $(this).animate({'left' : horizontalPositions[4]}, {duration : 400});
                            pj3Position +=2;
                            break;


                            case 8:
                            
                            
                            $(this).animate({'left' : horizontalPositions[2]}, 400, function(){
                              $($pj3).css("background-position","112px 280px")
                            });
                            pj3Position +=2;
                            break;

                            case 10:
                            
                            
                            $(this).animate({'left' : horizontalPositions[0]}, {duration : 400});
                            pj3Position +=2;
                            break;
                            
                        }
                        

                    
                      });
 });


//---------------------------------------------------------------------------------------------------
//Quatrième pièce jaune



$(function()
{
  $($pj4).click(function()
                      { 
                        
                        switch(pj4Position){
                            case 0:
                            
                              
                            $(this).animate({'left' : horizontalPositions[1]}, {duration : 400});
                            pj4Position +=1;
                            break;

                            case 1:
                            
                              
                            $(this).animate({'left' : horizontalPositions[2]}, {duration : 400});
                            pj4Position +=1;
                            break;

                            case 2:
                            
                              
                            $(this).animate({'left' : horizontalPositions[3]}, {duration : 400});
                            pj4Position +=1;
                            break;
                        

                            case 3:
                            
                            
                            $(this).animate({'left' : horizontalPositions[4]}, {duration : 400});
                            pj4Position +=1;
                            break;

                            case 4:
                            
                            
                            $(this).animate({'left' : horizontalPositions[5]}, {duration : 400});
                            pj4Position +=1;
                            break;

                            case 5:
                            
                              
                            $(this).animate({'left' : horizontalPositions[6]}, 400, function(){
                              $($pj4).css("background-position","112px 280px")
                            });
                            pj4Position +=1;
                            break;


                            case 6:
                            
                            
                            $(this).animate({'left' : horizontalPositions[3]}, {duration : 400});
                            pj4Position +=3;
                            break;


                            case 9:
                            
                            
                            $(this).animate({'left' : horizontalPositions[0]}, {duration : 400});
                            pj4Position +=3;
                            break;
                            
                        }
                        

                    
                      });
 });

//---------------------------------------------------------------------------------------
//Cinquième pièce jaune

$(function()
{
  $($pj5).click(function()
                      { 
                        
                        switch(pj5Position){
                            case 0:
                            
                              
                            $(this).animate({'left' : horizontalPositions[3]}, {duration : 400});
                            pj5Position +=3;
                            break;
                        

                            case 3:
                            
                            
                            $(this).animate({'left' : horizontalPositions[6]}, 400, function(){
                              $($pj5).css("background-position","112px 280px")
                            });
                            pj5Position +=3;
                            break;


                            case 6:
                            
                            
                            $(this).animate({'left' : horizontalPositions[5]}, {duration : 400});
                            pj5Position +=1;
                            break;

                            case 7:
                            
                            
                            $(this).animate({'left' : horizontalPositions[4]}, {duration : 400});
                            pj5Position +=1;
                            break;

                            case 8:
                            
                            
                            $(this).animate({'left' : horizontalPositions[3]}, {duration : 400});
                            pj5Position +=1;
                            break;

                            case 9:
                            
                            
                            $(this).animate({'left' : horizontalPositions[2]}, {duration : 400});
                            pj5Position +=1;
                            break;

                            case 10:
                            
                            
                            $(this).animate({'left' : horizontalPositions[1]}, {duration : 400});
                            pj5Position +=1;
                            break;


                            case 11:
                            
                            
                            $(this).animate({'left' : horizontalPositions[0]}, {duration : 400});
                            pj5Position +=1;
                            break;
                            
                        }
                        

                    
                      });
 });