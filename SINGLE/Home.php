<div id="lijevo">
			
		<h2>Galerije</h2>
		
		<ul id = "drop">
			<li id = "godisnjice">
				<a onclick = "kliknuto(this);">Godišnjice</a>
					<ul>
						<li><a href="#">2014/2015</a></li>
						<li><a href="#">2013/2014</a></li>
						<li><a href="#">2012/2013</a></li>
						<li><a href="#">2011/2012</a></li>
					</ul>
			</li>
			<li id = "mature">
				<a  onclick = "kliknuto(this);">Mature</a>
					<ul>
						<li><a href="#">2014/2015</a></li>
						<li><a href="#">2013/2014</a></li>
						<li><a href="#">2012/2013</a></li>
						<li><a href="#">2011/2012</a></li>
					</ul>
			</li>
			<li id = "ostalo">
				<a  onclick = "kliknuto(this);">Ostalo</a>
					<ul>
						<li><a href="#">2014/2015</a></li>
						<li><a href="#">2013/2014</a></li>
						<li><a href="#">2012/2013</a></li>
						<li><a href="#">2011/2012</a></li>
					</ul>
			</li>
			<li id = "sekcije">
				<a onclick = "kliknuto(this);">Sekcije</a>
					<ul>
						<li><a href="#">2014/2015</a></li>
						<li><a href="#">2013/2014</a></li>
						<li><a href="#">2012/2013</a></li>
						<li><a href="#">2011/2012</a></li>
					</ul>
			</li>
			<li id = "takmicenja">
				<a onclick = "kliknuto(this);">Takmičenja</a>
				<ul>
			
						<li><a href="#">2014/2015</a></li>
						<li><a href="#">2013/2014</a></li>
						<li><a href="#">2012/2013</a></li>
						<li><a href="#">2011/2012</a></li>
				
				</ul>
			</li>
		</ul>
</div>
		<div id="glavni">
		
		</div>
		
		<div id="desno">
			<h2>Provjera škole</h2>
				<form name = "ProvjeraSkole" class="form" onsubmit= "return ProvjeriSkoluAkcija()">			

						Naziv općine:<br>
						<input type="text" class="rounded" name="opcina" id="NazivOpcine"/><br><br>
					
						Naziv škole:<br>
						<input type="text" name="skola" class="rounded" id="NazivSkole"/><br><br>
						
						<p class = "prihvati">
							<input type="submit" value="Prihvati" onclick = "ProvjeriSkolu()"/>
						</p>
						
						<div id="greska_skola"></div>
				</form>
		</div>
		