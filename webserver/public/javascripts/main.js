$(document).ready(function(){
  // This will work for dynamically created element
  $('body').on('click', ".labelSlide[for^='slide_div'], .labelSlide[htmlFor^='slide_div']", function(e){
     var temp = $(this).attr('for');
     var temp2 = temp.split('_');
     var val = temp2[1];
     console.log(val);

     var text = $('#'+ val +"  .state").text();
     console.log(text);
     if (text == 'Absent'){
       presentAbscent($('#'+ val +"  h3").text(),true);
       $('#'+ val +"  .state").empty();
       $('#'+ val +"  .state").append('Present');
     }
     if(text == 'Present'){
       presentAbscent($('#'+ val +"  h3").text(),false);
       $('#'+ val +"  .state").empty();
       $('#'+ val +"  .state").append('Absent');
     }
  });

});
