//
//basicApi?horraire="+horraire+"&semaine="+semaine+"&salle="+salle

var etudiantsEtPhotos = []; //tableau de couple INE:nom:photo
var listePresence = []; //tableau de couple nom:présence
//var indexEtudiantCourant = 0;

function identifierCohorte()
{
    var horraire = document.getElementById("horraire").innerHTML;
    var semaine =  document.getElementById("semaine").innerHTML;
    var salle = document.getElementById("salle").innerHTML;
    
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

    alert(listePresence);
}

//function setNextEtudiant()
//{
  //  indexEtudiantCourant++;
   // document.getElementById("nomEtudiant").innerHTML = etudiantsEtPhotos[indexEtudiantCourant].nom;
   // document.getElementById("imageEtudiant").src = etudiantsEtPhotos[indexEtudiantCourant].image;
//}

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
        addContent(etudiantsEtPhotos[cpt.toString()].Photo,etudiantsEtPhotos[cpt.toString()].INE,cpt);
        cpt++;
    }
}

function addContent(src_images,name,number){
        console.log("construction du block eleve");
        $('#tiles').append('<li><img src="'+ src_images +'" width="282" height="118"><div class="post-info" id="div'+number+'"><div class="post-basic-info"><h3>'+name+'</h3></div><div class="info"><div class="here"><span class="state">Absent</span></div><div class="away"><div class="ChekBoxes"><input type="checkbox" value="None" id="slide_div'+number+'" name="check" /><label class ="labelSlide" for="slide_div'+number+'"></label></div></div></div></div></li>');
      }

    console.log("script Core Ready");
    
    function getProperty(INE)
    {
        return etudiantsEtPhotos[INE];
    }