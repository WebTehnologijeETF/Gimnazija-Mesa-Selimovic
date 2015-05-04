//Validacija kontakt forme
function myFunction(){
    var regImePrezime = /\w\w\w+\s\w\w\w+/;
    var regEmail = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/;
    var testAll = true;
    
    if(!regImePrezime.test(document.getElementById("name").value))
    {
        document.getElementById("name_error").innerHTML = "<pre>   Ime i prezime moraju sadržavati bar po tri znaka sa razmakom između</pre>";
        testAll = false;  
    }
    else document.getElementById("name_error").innerHTML = '';

    if(!regEmail.test(document.getElementById("email").value))
    {
        document.getElementById("email_error").innerHTML = "<pre>   Nevalidna email adresa!</pre>";
        testAll = false;
    }
    else document.getElementById("email_error").innerHTML = '';

    if(document.getElementById("input").value.length < 15)
    {
        document.getElementById("text_error").innerHTML = "<pre>   Poruka mora imati preko 15 karaktera</pre>";
        testAll = false;
    }
    else document.getElementById("text_error").innerHTML = '';


    return testAll;
};

//Omogućavanje unosa web stranice u zavisnosti od kliknutog radio buttona
function Enable() {
    document.getElementById("web").disabled = !(document.getElementById("web").disabled);
}

//Proširivanje(expand) liste galerija
function kliknuto(lista) 
{
	var lis = document.getElementById(lista.parentNode.id).getElementsByTagName("li");
	var prikaz = "none";
	if(lis[0].style.display === "none") prikaz = "block";
	for(var i = 0; i < lis.length; i++)
	{
		lis[i].onmouseover = function() { this.style.backgroundColor = "#F1F1F1"; }
		lis[i].onmouseout = function() { this.style.backgroundColor = "#267794"; }
		lis[i].style.display = prikaz;
	}			
}

//Prvo pokretanje liste galerija
function firstload()
{
	var parents = document.getElementById("drop").getElementsByTagName("li");
	for(var i = 0; i < parents.length; i++)
	{
		if(parents[i].id === '') parents[i].style.display = "none";
	}
}

//Funkcija za singlepage
function loadPage(path)
{
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function()
	{
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) 
		{
			document.getElementById("ostatak").innerHTML=xmlhttp.responseText;
			//Deexpand galerije :)
			if(path === "Home") firstload();
			if(path === "Biblioteka") ucitajKnjige();
		}	
	}
	xmlhttp.open("GET", path + ".html", true);
	xmlhttp.send();
}

//Asinhrona provjera postojanja skole u opcini
function ProvjeriSkolu()
{
	var xmlhttp = new XMLHttpRequest();
	var opcina = document.getElementById("NazivOpcine").value;
	var skola = document.getElementById("NazivSkole").value;
	
	xmlhttp.onreadystatechange = function()
	{
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) 
		{
			var objekat = JSON.parse(xmlhttp.responseText);

			document.getElementById("greska_skola").innerHTML = "";
			if(typeof objekat.ok === "undefined" && typeof objekat.greska !== "undefined") document.getElementById("greska_skola").innerHTML = objekat.greska;
		}
		
	}

	xmlhttp.open("GET", "http://zamger.etf.unsa.ba/wt/srednja_skola.php?opcina=" + opcina + "&skola=" + skola  ,true);
	xmlhttp.send();
}


function ProvjeriSkoluAkcija()
{
	var opcina = document.getElementById("NazivOpcine").value;
	var skola = document.getElementById("NazivSkole").value;
	var greska = document.getElementById("greska_skola").innerHTML;
	if(opcina != "" && skola != "" && greska === "") return true;
	return false;
}


function ucitajKnjige()
{
	var xmlhttp;
	if (window.XMLHttpRequest)
	{// code for IE7+, Firefox, Chrome, Opera, Safari
		xmlhttp=new XMLHttpRequest();
	}
	else
	{// code for IE6, IE5
		xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
	}
	
	
	xmlhttp.onreadystatechange=function()
	{
		
		if (xmlhttp.readyState==4 && xmlhttp.status==200)
		{
			var studenti = JSON.parse(xmlhttp.responseText);
			for(var i = 0; i < studenti.length; i++) 
			document.getElementById("knjige").innerHTML += 
			('<tr><td>' + studenti[i].naziv + '</td><td>' + studenti[i].opis + '</td><td>' + studenti[i].kolicina + '</td><td><img src="' + studenti[i].slika + '" alt="nesto" style="width:128px;height:128px" ></td> </tr>');
		}
	}
	
	xmlhttp.open("GET","http://zamger.etf.unsa.ba/wt/proizvodi.php?brindexa=16401",true);
	document.getElementById("knjige").innerHTML = "";
	xmlhttp.send();
}

function dodajKnjigu(){
	
    var naziv_knjige = document.getElementById("naziv_knjige").value;
    var opis_knjige = document.getElementById("opis_knjige").value;
    var kolicina_knjiga = document.getElementById("kolicina_knjiga").value;
	var link_slike = document.getElementById("link_slike").value;
    
	var knjiga = {
        naziv: naziv_knjige,
		opis: opis_knjige,
        kolicina: kolicina_knjiga,
        slika: link_slike
    };
	
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function(event) {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) 
		{
			ucitajKnjige();
			document.getElementById("opcije_za_knjige").innerHTML = "";
		}	

    }
	
    xmlhttp.open("POST", "http://zamger.etf.unsa.ba/wt/proizvodi.php?brindexa=16401", true);
    xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    xmlhttp.send("akcija=dodavanje" + "&brindexa=16401&proizvod=" + JSON.stringify(knjiga));
}

function brisiKnjigu(){
		
    var id_knjige = document.getElementById("id_knjige").value;
    if(id_knjige == "undefined" || id_knjige == ""){
        alert('Unesite id knjige');
        return;
    }
	
    var knjiga = {
        id: id_knjige
    };
	
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function(event) {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) 
		{			
			ucitajKnjige();
			document.getElementById("opcije_za_knjige").innerHTML = "";
		}	
    }
	
    xmlhttp.open("POST", "http://zamger.etf.unsa.ba/wt/proizvodi.php?brindexa=16401", true);
    xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    xmlhttp.send("akcija=brisanje" + "&proizvod=" + JSON.stringify(knjiga));
}


function azurirajKnjigu()
{
	
	var id_knjige = document.getElementById("p_id_knjige").value;
	
	var naziv_knjige = document.getElementById("p_naziv_knjige").value;
    
	var opis_knjige = document.getElementById("p_opis_knjige").value;
    var kolicina_knjiga = document.getElementById("p_kolicina_knjiga").value;
	var link_slike = document.getElementById("p_link_slike").value;
    
	if(id_knjige == "undefined" || id_knjige == ""){
        alert('Unesite id knjige');
        return;
    }
	var knjiga = {
		id: id_knjige,
        naziv: naziv_knjige,
		opis: opis_knjige,
        kolicina: kolicina_knjiga,
        slika: link_slike
    };
	
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function(event) {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) 
		{
			ucitajKnjige();
			document.getElementById("opcije_za_knjige").innerHTML = "";
		}

    }
	
    xmlhttp.open("POST", "http://zamger.etf.unsa.ba/wt/proizvodi.php?brindexa=16401", true);
    xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    xmlhttp.send("akcija=promjena" + "&brindexa=16401&proizvod=" + JSON.stringify(knjiga));
}


function ValidirajUnosKnjige()
{
	return false;
}

function prikaziFormu(path)
{
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function()
	{
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) 
		{
			document.getElementById("opcije_za_knjige").innerHTML = xmlhttp.responseText;
		}	
	}
	xmlhttp.open("GET", path + ".html", true);
	xmlhttp.send();
}