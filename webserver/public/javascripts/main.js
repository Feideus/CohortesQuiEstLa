$(document).ready(function(){
  var $tiles = $('#tiles'),
      $handler = $('li', $tiles),
      $main = $('#main'),
      $window = $(window),
      $document = $(document),
      options = {
        autoResize: true,
        container: $main,
        offset: 20,
        itemWidth:280
      };
  var listeElevePresent= [];
  var listeEleveAbsent = [];
  $("h3").each(function(){
    listeEleveAbsent.push($(this).text());
  });
    function addContent(src_images,name,number){
        $('#tiles').append('<li><img src="'+ src_images +'" width="282" height="118"><div class="post-info" id="div'+number+'"><div class="post-basic-info"><h3>'+name+'</h3></div><div class="info"><div class="here"><span class="state">Absent</span></div><div class="away"><div class="ChekBoxes"><input type="checkbox" value="None" id="slide_div'+number+'" name="check" /><label class ="labelSlide" for="slide_div'+number+'"></label></div></div></div></div></li>');
      }

    $(".labelSlide[for^='slide_div'], .labelSlide[htmlFor^='slide_div']").click(function(){
        console.log("coucou");
        var temp = $(this).attr('for');
        var temp2 = temp.split('_');
        var val = temp2[1];
        console.log(val);

        var text = $('#'+ val +"  .state").text();
        console.log(text);
        if (text == 'Absent'){
          listeElevePresent.push($('#'+ val +"  h3").text());
          listeEleveAbsent.splice( $.inArray($('#'+ val +"  h3").text(), listeEleveAbsent), 1 );
          $('#'+ val +"  .state").empty();
          $('#'+ val +"  .state").append('Present');
        }
        if(text == 'Present'){
          listeElevePresent.splice( $.inArray($('#'+ val +"  h3").text(), listeElevePresent), 1 );
          listeEleveAbsent.push($('#'+ val +"  h3").text());
          $('#'+ val +"  .state").empty();
          $('#'+ val +"  .state").append('Absent');
        }
    });
    $("#buttonV").click(function(){
      console.log("coucou");
      console.log(listeElevePresent);
      console.log(listeEleveAbsent);
      //addContent("images/img1.jpg","Jean Dujardin",10);

    });

    function applyLayout() {
      $tiles.imagesLoaded(function() {
        if ($handler.wookmarkInstance) {
          $handler.wookmarkInstance.clear();
        }
        $handler = $('li', $tiles);
        $handler.wookmark(options);
      });
    }
    applyLayout();

});
