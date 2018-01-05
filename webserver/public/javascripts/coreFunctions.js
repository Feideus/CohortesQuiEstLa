

var etudiantsEtPhotos = [{}]; //tableau de couple nmEtudiant:nom:photo
var listePresence = [{}]; //tableau de couple nom:présence
var indexEtudiantCourant = 0;

function identifierCohorte()
{
    var horraire = document.getElementById("horraire").innerHTML;
    var semaine =  document.getElementById("semaine").innerHTML;
    var salle = document.getElementById("salle").innerHTML;
    
    if((horraire === parseInt(horraire, 10)) && (semaine === parseInt(semaine, 10)) && salle !== "")
    {
        etudiantsEtPhotos = httpGetAsync("local.test/basicApi?horraire="+horraire+"&semaine="+semaine+"&salle="+salle);
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

    setNextEtudiant();
}

function setNextEtudiant()
{
    indexEtudiantCourant++;
    document.getElementById("nomEtudiant").innerHTML = etudiantsEtPhotos[indexEtudiantCourant].nom;
    document.getElementById("imageEtudiant").src = etudiantsEtPhotos[indexEtudiantCourant].image;
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
        httpGetAsync("local.test/responseApi?listePresence="+listePresence);
    }
    else
    {
        alert("certaines présences/absences n'ont pas étées relevées ! ");
    }
}


