
var etudiantsEtPhotos = [{}]; //tableau de couple nom:photo
var listePrésence = [{}]; //tableau de couple nom:présence
var indexEtudiantCourant = 0;

function identifierCohorte(horraire,semaine)
{
    //horraire,semaine peuvent etre optionnels selon l'api
    //appel à l'api et initialisation de etudiantsEtPhotos et des zones html appropriées
}

function presentAbsent(bool)
{
    var nom = document.getElementById("nomEtudiant").innerHTML;
    
    if(bool === true)
    {
        listePrésence.push({nom:nom,presence:"présent"});
    }
    else if(bool === false)
    {
        listePrésence.push({nom:nom,presence:"abscent"});
    }
    else
    {
        listePrésence.push({nom:nom,presence:"erreur"});
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
    //envoyer listePresence à l'api
}