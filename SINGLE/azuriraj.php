	<form name = "AzurirajKnjigu" class="form" onsubmit= "return ValidirajUnosKnjige()" >			
		ID knjige:<br> 
		<input type="text" name="naziv" class="rounded"  id="p_id_knjige"/><br><br>
		
		Naziv:<br> 
		<input type="text" name="naziv" class="rounded"  id="p_naziv_knjige"/><br><br>

		Opis:<br>
		<input type="text" name="opis" class="rounded" id="p_opis_knjige"/><br><br>

		Kolicina:<br> 
		<input type="text" name="kolicina" class="rounded" id="p_kolicina_knjiga"/><br><br>

		Link slike:<br>
		<input type="text" name="link" class="rounded" id="p_link_slike"/><br><br>

		<p class = "prihvati">
			<input type="submit" value="Prihvati" onclick = "azurirajKnjigu()"/>
		</p>			
	</form>
