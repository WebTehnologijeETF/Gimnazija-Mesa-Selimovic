var parents = document.getElementById("drop").getElementsByTagName("li");
for(var i = 0; i < parents.length; i++)
{
	if(parents[i].id === '') parents[i].style.display = "none";
}

function kliknuto(lista) {
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