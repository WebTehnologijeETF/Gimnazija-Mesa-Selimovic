var periodic;
var coments_open = false;

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
function dajDatum(timestamp)
{
	var pubDate = new Date(timestamp * 1000);
	var weekday=new Array("Nedjelja","Ponedjeljak","Utorak","Srijeda","Četvrtak","Petak","Subota");
	var monthname=new Array("Jan","Feb","Mar","Apr","Maj","Jun","Jul","Aug","Sep","Okt","Nov","Dec");
	var formattedDate = weekday[pubDate.getDay()] + ' ' 
		+ monthname[pubDate.getMonth()] + ' ' 
		+ pubDate.getDate() + ', ' + pubDate.getFullYear()
		+ " u " + pubDate.getHours() + " : " +
		pubDate.getMinutes();

	return formattedDate;
}
			

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
	fcn();

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
			if(path === "Home")  firstload();
			else clearTimeout(periodic);
			if(path === "Biblioteka") ucitajKnjige();
		}	
	}
	xmlhttp.open("GET", "SINGLE/" + path + ".php", true);
	xmlhttp.send();
}

function loadNews(paket)
{
	
	var xmlhttp = new XMLHttpRequest();
	var objekat = JSON.stringify(paket);
		
	xmlhttp.onreadystatechange = function()
	{
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) 
		{		
			 document.getElementById("ostatak").innerHTML = xmlhttp.responseText;
			 firstload();
		}
	}
	
	xmlhttp.open("POST", "Home.php", true);
	xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
	xmlhttp.send("novost=" + objekat);
}

function loadComment(paket)
{
	paket["autor"] = document.getElementById("autor").value;
	paket["komentar"] = document.getElementById("koment").value;
	paket["email"] = document.getElementById("email").value;

	var xmlhttp = new XMLHttpRequest();
	var objekat = JSON.stringify(paket);

	xmlhttp.onreadystatechange = function()
	{
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) 
		{		
			 document.getElementById("ostatak").innerHTML = xmlhttp.responseText;
			 firstload();
		}
	}
	
	xmlhttp.open("POST", "Home.php", true);
	xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
	xmlhttp.send("novost=" + objekat);
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
			document.getElementById("greska_skola").innerHTML = " ";
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
	if(opcina != "" && skola != "" && greska === " ") return true;
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
			var knjige = JSON.parse(xmlhttp.responseText);
			for(var i = 0; i < knjige.length; i++) 
			document.getElementById("knjige").innerHTML += 
			('<tr><td>' + knjige[i].id + '</td><td>' + knjige[i].naziv + '</td><td>' + knjige[i].opis + '</td><td>' + knjige[i].kolicina + '</td><td><img src="' + knjige[i].slika + '" alt="nesto" style="width:128px;height:128px" ></td> </tr>');
		}
	}
	
	xmlhttp.open("GET","http://zamger.etf.unsa.ba/wt/proizvodi.php?brindexa=16401",true);
	document.getElementById("knjige").innerHTML = "";
	xmlhttp.send();
}


function ucitajNovosti()
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
			var vijesti = JSON.parse(xmlhttp.responseText);
			for(var i = 0; i < vijesti.length; i++)
			{

			document.getElementById("glavni").innerHTML += 
			('<article><header><h1>' + vijesti[i].naslov + '</h1><p>Objavljenjo: ' + dajDatum(vijesti[i].vrijeme2) +
			'</p></header><img src= ' + vijesti[i].link + ' alt="Mountain View"><p>' + vijesti[i].opis + '</p>'
			+ '<footer><a href = "#" onclick = "dajNovost('+ vijesti[i].id+')">Opširno</a></footer></article>');

			}				
		}
	}
	
	xmlhttp.open("GET","REST/NovostiREST.php",true);
	document.getElementById("glavni").innerHTML = "";
	xmlhttp.send();
}

function dajNovost(id)
{
	clearTimeout(periodic);
	
	var getstring = "REST/NovostiREST.php?id=" + id;
	
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
			
			var vijesti = JSON.parse(xmlhttp.responseText);
			for(var i = 0; i < vijesti.length; i++) 
			{
			document.getElementById("glavni").innerHTML += 
			('<article><header><h1>' + vijesti[i].naslov + '</h1><p>Objavljenjo: ' + dajDatum(vijesti[i].vrijeme2) +
			'</p></header><img src = ' + vijesti[i].link + ' alt="Mountain View"><p>' + vijesti[i].opsirno + '</p>'
			+ '<a href = "#" id = "komentari_broj" onclick = "ucitajKomentare('+ vijesti[i].id+')"> Komentara</a>' +
			 '<footer><a href = "#" onclick = "fcn()">Nazad</a></footer></article>');
			 dajBrojKomentara(vijesti[i].id);
			 }
		}
	}
	
	xmlhttp.open("GET", getstring,true);
	document.getElementById("glavni").innerHTML = "";
	xmlhttp.send();
}

function dajBrojKomentara(id)
{
	
	var getstring = 'REST/KomentariREST.php?vijest=' + id;
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
			var komentari = JSON.parse(xmlhttp.responseText);
			var broj = 0;
			if(typeof komentari.error === 'undefined')
			broj = komentari.length;
			document.getElementById("komentari_broj").innerHTML = "Komentara (" + broj + ")";
		}
	}
	
	xmlhttp.open("GET", getstring,true);
	xmlhttp.send();
}

function ucitajKomentare(id)
{
	if(coments_open) 
	{
		dajNovost(id);
		coments_open = false;
		return;
	}
	
	
	formaZaKomentar(id);
	var getstring = 'REST/KomentariREST.php?vijest=' + id;
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
			var komentari = JSON.parse(xmlhttp.responseText);
			
			for(var i = 0; i < komentari.length; i++) 
			if(komentari[i].email != "")
			{
				 document.getElementById("glavni").innerHTML += 
				 ("<div id = 'komentar'><h5><a href= 'mailto:" + komentari[i].email + "'>"
				 + komentari[i].autor + "</a></h5><small>" + dajDatum(komentari[i].vrijeme2) + "</small><p>" + komentari[i].tekst + "</p></div>");						
			}
			else
			document.getElementById("glavni").innerHTML += ("<div id = 'komentar'><h5>" + komentari[i].autor + "</h5><small>" + dajDatum(komentari[i].vrijeme2) + "</small><p>"
		    + komentari[i].tekst + "</p></div>");
			
			coments_open = true;
		}
	}
	
	xmlhttp.open("GET", getstring,true);
	xmlhttp.send();
}

function formaZaKomentar(id)
{
	document.getElementById("glavni").innerHTML += ("<h3>Dodaj komentar: </h3>" + 
	 "<form><br/>Email:<br/> <input type='text' name='email' id='email'/><br/>" +
	 "<br/>Komentar(*):<br/> <textarea name='koment' id='koment'></textarea><br/><br/>"+
	 "<input type='button' value='Posalji' onclick = 'posaljiKomentar(" + id + ")' ></form>");
}

function posaljiKomentar(id)
{
	coments_open = false;
    var email = document.getElementById("email").value;
    var koment = document.getElementById("koment").value;
	
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function(event) {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) 
		{
			var us = JSON.parse(xmlhttp.responseText);
			if(us.izvjestaj === "Uspijeh!") 
			{
				document.getElementById("glavni").innerHTML = "";
				dajNovost(id);
			}	
				

		}

    }
	
    xmlhttp.open("POST", "REST/KomentariREST.php", true);
    xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    xmlhttp.send("&email=" + email + "&tekst=" + koment + "&vijest=" + id)
}

function fcn()
{
	ucitajNovosti();
	periodic = setInterval(periodicCheckNUpdate, 2000);
}

function periodicCheckNUpdate()
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
			var n = JSON.parse(xmlhttp.responseText);
			var list = document.getElementsByTagName("article");
			if(list.length != n.broj) ucitajNovosti();
		}
	}
	
	xmlhttp.open("GET","REST/NovostiREST.php?br=1",true);
	xmlhttp.send();
}

function periodicCheckNUpdate()
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
			var n = JSON.parse(xmlhttp.responseText);
			var list = document.getElementsByTagName("article");
			if(list.length != n.broj) ucitajNovosti();
		}
	}
	
	xmlhttp.open("GET","REST/NovostiREST.php?br=1",true);
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
	xmlhttp.open("GET", "SINGLE/" + path + ".php", true);
	xmlhttp.send();
}

