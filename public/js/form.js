
    $(document).ready(function(){

      var left = $(".left");
      var right = $(".right");
      var form = $(".form");
      var reverse = false;

      var formC = $(".formC");
      var reverseC = false;

      var formM = $(".formM");
      var reverseM = false;

      var formP = $(".formP");
      var reverseP = false;

      var ps = $("#ps");
      var mdp = $("#mdp");
      var a = $(".a");
      var hps = $("#hps");
      var hmdp = $("#hmdp");

      var displayForm = function (){
        if (reverse){
          right.animate({left: '+=1000px'}, "fast", function(){});
          left.animate({left: '-=1000px'}, "fast", function(){});
          form.slideToggle("fast");
          reverse = false;
        }
        else {
          form.slideToggle("fast", function(){});
          left.animate({left: '+=1000px'}, "fast", function(){});
          right.animate({left: '-=1000px'}, "fast");
          reverse = true;
        }
      }

      var displayFormC = function (){
        if (reverseC){
          formC.slideToggle("fast");
          reverseC = false;
        }
        else {
          formC.slideToggle("fast", function(){});
          reverseC = true;
        }
      }

      var displayFormM = function (){
        if (reverseM){
          formM.slideToggle("fast");
          reverseM = false;
        }
        else {
          formM.slideToggle("fast", function(){});
          reverseM = true;
        }
      }

      var displayFormP = function (){
        if (reverseP){
          formP.slideToggle("fast");
          reverseP = false;
        }
        else {
          formP.slideToggle("fast", function(){});
          reverseP = true;
        }
      }

      ps.hover(
        function(){ hps.fadeTo(120,1); },
        function(){ hps.fadeTo(120,0.0); }
      );

      mdp.hover(
        function(){ hmdp.fadeTo(120,1); },
        function(){ hmdp.fadeTo(120,0.0); }
      );

      a.hover(
        function(){
          fade(2000).slideDown(2000);
        }
      );


      $(".modifier").click(function(){
          $(".msg2").hide();
          $(".memo").hide();
          $(".new_memo").hide();
          $(this).parent().parent().parent().parent().show();
          $(this).parent().parent().find(".modifiable").removeAttr("readonly");
          $(this).parent().parent().append('<p><input class="valider" type="submit" value="Valider"></p>');
          $(this).parent().parent().find(".collabs").append('<p> Pseudonyme <emph>*</emph> :  <input type="text" name="collab"> </p>');
          $(this).parent().parent().find(".collabs").append('<input type="radio" name="wr" value=1 checked> Lecture et écriture <input type="radio" name="wr" value=0> Lecture seule');
          $(this).parent().parent().find(".collabs").append("<p><emph>*<i> Entrer le pseudonyme d'un contributeur pour l'ajouter ou pour mettre à jour ses droits en écriture</i></emph></p>");
          $(this).hide();
        });

      left.animate({left: '-=1000'}, "fast");
      right.animate({left: '+=1000'}, "fast");
      $("#btnConnexion").click(displayForm);
      $("#btnCreation").click(displayFormC);
      $("#btnMemos").click(displayFormM);
      $("#btnPartage").click(displayFormP);

      hmdp.fadeTo(1,0.0);
      hps.fadeTo(1,0.0);
      displayForm();
    });
