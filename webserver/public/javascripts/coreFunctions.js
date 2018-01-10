//
//basicApi?horraire="+horraire+"&semaine="+semaine+"&salle="+salle

var etudiantsEtPhotos = []; //tableau de couple INE:nom:photo
var listePresence = []; //tableau de couple nom:présence
//var indexEtudiantCourant = 0;
var flagToCohorte = false; // set if Cohorte is loaded or not
function getTextSelect(string){
  var e = document.getElementById(string);
  var f = e.options[e.selectedIndex].text;
  return f;
}
document.addEventListener('DOMContentLoaded', function() {
  function loadingHSS(){
    var content = [];
    content = JSON.parse(httpGet("http://local.test:7001/HSS"));
    console.log(content);
    fillOptionHorraire(content[0]);
    fillOptionSemaine(content[1]);
    fillOptionSalle(content[2]);
  }
  function fillOptionHorraire(content){
    for (var i = 0; i<content.length; i++) {
        $('#horraire').append('<option value="'+content[i]+'">'+content[i]+'</option>');
    }
  }
  function fillOptionSemaine(content){
    for (var i = 0; i<content.length; i++) {
          $('#semaine').append('<option value="'+content[i]+'">'+content[i]+'</option>');
    }
  }
  function fillOptionSalle(content){
    for (var i = 0; i<content.length; i++) {
          $('#salle').append('<option value="'+content[i]+'">'+content[i]+'</option>');
    }
  }
  document.getElementById('idCohorte').onclick = function (e){
    if (flagToCohorte == false){
    flagToCohorte = true;
    identifierCohorte();
    }
  }
  document.getElementById('validationButton').onclick = function(){
    if (flagToCohorte == true){
      validerListePresence();
      flagToCohorte = false;
    }
    else{
      alert('Veuillez Charger une Cohorte !');
    }
  };

  loadingHSS();
});

function identifierCohorte()
{
    var horraire = getTextSelect("horraire");
    var semaine = getTextSelect("semaine");
    var salle = getTextSelect("salle");

    var content = document.getElementById("wait");
    if ( content != null){
      content.remove();
    }
        if(salle !== "")
        {
            etudiantsEtPhotos = JSON.parse(httpGet("http://local.test:7001/listeElevesApi"));
            console.log(etudiantsEtPhotos);
            if(etudiantsEtPhotos !== 'undefined')
            {
                buildhtml();
            }
        }


}
function presentAbscent(nom,bool)
{
    //var nom = document.getElementById("nomEtudiant").innerHTML;
    var flag = false;
    for (var i in listePresence) {
      if (listePresence[i].nom == nom) {
        flag = true;
        if(bool === true)
        {
          listePresence[i].presence = "present";

        }
        else if(bool === false)
        {
           listePresence[i].presence = "absent";
        }

         break; //Stop this loop, we found it!
      }
    }
    if (flag ==false){
      if(bool === true)
      {
          listePresence.push({nom:nom,presence:"present"});
      }
      else if(bool === false)
      {
          listePresence.push({nom:nom,presence:"absent"});
      }
      else
      {
          listePresence.push({nom:nom,presence:"erreur"});
      }
    }


    console.log(listePresence);
}

function validerListePresence()
{
    var erreur = 0;

    for(var i in listePresence)
    {
     if(listePresence[i].presence !== "present" || listePresence[i].presence !== "absent")
     {
         erreur = 1;
     }
    }

    if(erreur === 0)
    {
        httpGet("local.test/responseApi?listePresence="+listePresence);
    }
    else
    {
        alert("certaines présences/absences n'ont pas étées relevées ! ");
    }
}

function buildhtml()
{
    var cpt = 0;
    var x;
    console.log("remplissage");
    for(x in etudiantsEtPhotos)
    {
        console.log(etudiantsEtPhotos[cpt.toString()].INE,etudiantsEtPhotos[cpt.toString()].Photo);
        listePresence.push({nom:etudiantsEtPhotos[cpt.toString()].INE,presence:"absent"});
        addContent(etudiantsEtPhotos[cpt.toString()].Photo,etudiantsEtPhotos[cpt.toString()].INE,cpt);
        cpt++;
    }
}

function addContent(src_images,name,number){
        console.log("construction du block eleve");
        $('#tiles').append('<li><img src="'+ src_images +'" width="282" height="118"><div class="post-info" id="div'+number+'"><div class="post-basic-info"><h3>'+name+'</h3></div><div class="info"><div class="here"><span class="state">Absent</span></div><div class="away"><div class="ChekBoxes"><input type="checkbox" value="None" id="slide_div'+number+'" name="check" /><label class ="labelSlide" for="slide_div'+number+'"></label></div></div></div></div></li>');
        //$('#tiles').append('<li><h2>COucou</h2></li>');
}

    console.log("script Core Ready");

function getProperty(INE){
        return etudiantsEtPhotos[INE];
}
