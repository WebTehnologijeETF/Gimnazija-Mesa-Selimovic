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
		<?php		
		$veza = new PDO("mysql:dbname=gmstz;host=127.5.86.130;charset=utf8", "admintQTwqSu", "4jc2v8FRfAVI");
		$veza->exec("set names utf8");
		$sve_vijesti = true;
	
		if($_SERVER['REQUEST_METHOD'] == 'POST')
		{
			$sve_vijesti = false;
			$paket = json_decode($_POST["novost"], true);
			$id = $paket["id"];
			$autor = $paket["autor"];
			$komentar = $paket["komentar"];
			$email = $paket["email"];
			if($id == "X" && $komentar == "X" && $autor == "X" && $email = "X") $sve_vijesti = true;
		}
		
		if(!$sve_vijesti)
		{
			$paket = json_decode($_POST["novost"], true);
			$id = $paket["id"];
			$autor = $paket["autor"];
			$komentar = $paket["komentar"];
			$email = $paket["email"];
		

			$jedna_vijest = $veza->query("select id, naslov, opsirno, link, UNIX_TIMESTAMP(vrijeme) vrijeme2, autor from vijest where id = ".$id);
			
			foreach ($jedna_vijest as $vijest) 
			{
		  			$naslov = $vijest['naslov'];
					$link = $vijest['link'];
					$autor1 = $vijest['autor'];
					$opsirno_novosti = $vijest['opsirno'];
					$datum = date("d.m.Y. (h:i)", $vijest['vrijeme2']);
					$paket_return = json_encode(array("id"=>"X", "autor"=>"X", "komentar"=>"X", "email"=>"X"));
					
					echo '<article><header><h1>'.htmlspecialchars($naslov, ENT_QUOTES, 'UTF-8').'</h1><p>Objavljenjo: '.htmlspecialchars($datum, ENT_QUOTES, 'UTF-8');
					echo '</p></header><img src='.htmlspecialchars($link, ENT_QUOTES, 'UTF-8').' alt="Mountain View"><p>'.htmlspecialchars($opsirno_novosti, ENT_QUOTES, 'UTF-8').'</p>';
					echo "<footer><a  onclick='loadNews(".$paket_return.")'>Nazad</a></footer></article>";	
			}
			
			if($komentar != "" && $autor != "")
			{
				$rezultat2 = $veza->query("INSERT INTO komentar SET vijest=".$id.", tekst='".$komentar."', autor='".$autor."', email='".$email."'");
				
				if (!$rezultat2) 
				{
					$greska = $veza->errorInfo();
					print "SQL greška: " . $greska[2];
					exit();
				}
			}
	
			print "<h3>Dodaj komentar: </h3>";
			print "<br/>Autor(*):<br/> <input type='text' name='autor' id='autor'/><br/>";
			print "<br/>Email:<br/> <input type='text' name='email' id='email'/><br/>";
			print "<br/>Komentar(*):<br/> <textarea name='koment' id='koment'></textarea><br/><br/>";
			$komentarPaket = json_encode(array("id"=>$id, "autor"=>"a", "komentar"=>"a", "email"=>""));
			print "<input type='button' value='Pošalji' onclick = 'loadComment(".$komentarPaket.")'/>";
			  
			$rezultat1 = $veza->query("select tekst, autor, email, UNIX_TIMESTAMP(vrijeme) vrijeme2 from komentar where vijest = ".$id." order by vrijeme desc");

			  if (!$rezultat1) 
			  {
				$greska = $veza->errorInfo();
				print "SQL greška: " . $greska[2];
				exit();
			  }
			  else
			  {
				   $rezultat3 = $veza->query("select COUNT(*) broj_komentara from komentar where vijest = ".$id);
          
					  if (!$rezultat3)
					  {
						$greska = $veza->errorInfo();
						print "SQL greška: " . $greska[2];
						exit();
					  }
					  else
					  {
						  $rezultat3 = $rezultat3->fetchColumn(0);
						  if($rezultat3 == 0) print "<h3>Nema komentara<h3>";
						  else print "<h3>Komentari(".$rezultat3."):</h3>";  
					  }
					  
				  
				foreach ($rezultat1 as $komentar)
				{
					if($komentar["email"] != "")
					{
						 print "<div id = 'komentar'><h5><a href='mailto:".htmlspecialchars($komentar['email'], ENT_QUOTES, 'UTF-8')."'>";
						 print htmlspecialchars($komentar['autor'], ENT_QUOTES, 'UTF-8')."</a></h5><small>".date("d.m.Y. (h:i)", htmlspecialchars($komentar['vrijeme2'], ENT_QUOTES, 'UTF-8'))."</small><p>".htmlspecialchars($komentar['tekst'], ENT_QUOTES, 'UTF-8')."</p></div>";						
					}
					else print "<div id = 'komentar'><h5>".htmlspecialchars($komentar['autor'], ENT_QUOTES, 'UTF-8')."</h5><small>".date("d.m.Y. (h:i)", $komentar['vrijeme2'])."</small><p>".htmlspecialchars($komentar['tekst'], ENT_QUOTES, 'UTF-8')."</p></div>";
				}				
			  }
	
		}
		else
		{
			$rezultat = $veza->query("select id, naslov, opis, link, UNIX_TIMESTAMP(vrijeme) vrijeme2, autor from vijest order by vrijeme desc");
		 
			 if (!$rezultat) 
			 {
				  $greska = $veza->errorInfo();
				  print "SQL greška: " . $greska[2];
				  exit();
			 }


			foreach ($rezultat as $vijest) 
			{
		 
					$id = $vijest['id'];
		  			$naslov = $vijest['naslov'];
					$link = $vijest['link'];
					$autor = $vijest['autor'];
					$opis_novosti = $vijest['opis'];
					//$opsirno_novosti = $vijest['opsirno'];
					$datum = date("d.m.Y. (h:i)", $vijest['vrijeme2']);
					
					echo '<article><header><h1>'.htmlspecialchars($naslov, ENT_QUOTES, 'UTF-8').'</h1><p>Objavljenjo:'.$datum;
					echo '</p></header><img src='.htmlspecialchars($link, ENT_QUOTES, 'UTF-8').' alt="Mountain View"><p>'.$opis_novosti.'</p>';
					$paket = json_encode(array("id"=>$id, "autor"=>"", "komentar"=>"", "email"=>""));
					echo "<footer><a  onclick='loadNews(".$paket.")'>Opsirno</a></footer></article>";	
			}	
		}
		?>	
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
		