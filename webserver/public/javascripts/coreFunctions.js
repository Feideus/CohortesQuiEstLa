//if((horraire === parseInt(horraire, 10)) && (semaine === parseInt(semaine, 10)) && salle !== "")
//basicApi?horraire="+horraire+"&semaine="+semaine+"&salle="+salle

var etudiantsEtPhotos = [{}]; //tableau de couple INE:nom:photo
var listePresence = [{}]; //tableau de couple nom:présence
//var indexEtudiantCourant = 0;

function identifierCohorte()
{
    var horraire = document.getElementById("horraire").innerHTML;
    var semaine =  document.getElementById("semaine").innerHTML;
    var salle = document.getElementById("salle").innerHTML;
    
    
        etudiantsEtPhotos = httpGetAsync("http://local.test:7001/listeElevesApi");
        if(etudiantsEtPhotos !== 'undefined')
        {
            buildhtml();
        }
    
    
}

function presentAbscent(bool)
{
    var nom = document.getElementById("nomEtudiant").innerHTML;

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
        httpGetAsync("local.test/responseApi?listePresence="+listePresence);
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
    for(x in etudiantsEtPhotos)
    {
        cpt++;
        addContent(x.photo,x.nom,cpt);
    }
}

function addContent(src_images,name,number){
        $('#tiles').append('<li><img src="'+ src_images +'" width="282" height="118"><div class="post-info" id="div'+number+'"><div class="post-basic-info"><h3>'+name+'</h3></div><div class="info"><div class="here"><span class="state">Absent</span></div><div class="away"><div class="ChekBoxes"><input type="checkbox" value="None" id="slide_div'+number+'" name="check" /><label class ="labelSlide" for="slide_div'+number+'"></label></div></div></div></div></li>');
      }

    console.log("script Core Ready");