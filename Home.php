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
		if($_SERVER['REQUEST_METHOD'] == 'POST')
		{
				$paket = json_decode($_POST["novost"], true);
				echo '<article><header><h1>'.$paket["naslov"].'</h1><p>Objavljenjo:'.$paket["datum"];
				echo '</p></header><img src='.$paket["link_slike"].' alt="Mountain View"><p>'.$paket["opsirno"].'</p>';				
				echo '<footer><p>Tekst objavio: '.$paket["autor"].'</p><a  onclick="loadPage('."'Home'".')">Nazad</a></footer>';	
				echo '</article>';
		}
		else
		{
	
		function Uporedi($file1, $file2)
		{
				$str1 = $str2 = "0000-00-00 00:00:00";
				
				$file_stream = fopen($file1, "r");
				
				if ($file_stream) 
				{
					$str1 = implode(file($file1, FILE_IGNORE_NEW_LINES));
					$str1 = substr($str1,9,4).'-'.substr($str1,6,2).'-'.substr($str1,3,2).' '.substr($str1,14,8);
					fclose($file_stream);
				}
				
				$file_stream = fopen($file2, "r"); 
				if ($file_stream) 
				{
					$str2 = implode(file($file2, FILE_IGNORE_NEW_LINES));
					$str2 = substr($str2,9,4).'-'.substr($str2,6,2).'-'.substr($str2,3,2).' '.substr($str2,14,8);
					fclose($file_stream);
				}
				
				return strtotime($str2) - strtotime($str1);
			}
			
			$all_news = array();
			
			foreach (glob("*.txt") as $file)
			{
				array_push($all_news, $file);
			}
			
			usort($all_news, "Uporedi");
	
			foreach ($all_news as $file) 
			{
				$file_stream = fopen($file, "r"); 
				if ($file_stream) 
				{
					$lines = file($file, FILE_IGNORE_NEW_LINES);
					fclose($file_stream);				
					
					$datum = $lines[0];
					$autor = $lines[1];
					$naslov = $lines[2][0].mb_strtolower(substr($lines[2],1), 'UTF-8');;
					$link = $lines[3];
					$opis_novosti = '';
					$opsirnije = false;
					$opsirno_novosti = '';
					
					for($i = 4; $i < count($lines); $i++)
					{
						if($lines[$i] == '--') 
						{
							$opsirnije = true;
							continue;
						}	
						
						if(!$opsirnije) $opis_novosti = $opis_novosti.' '.$lines[$i];
						else $opsirno_novosti = $opsirno_novosti.' '.$lines[$i];
					}
					
					echo '<article><header><h1>'.$naslov.'</h1><p>Objavljenjo:'.$datum;
					echo '</p></header><img src='.$link.' alt="Mountain View"><p>'.$opis_novosti.'</p>';
					if($opsirnije) 
					{
						$paket = json_encode(array("datum"=>$datum, "autor"=>$autor, "naslov"=>$naslov, "link_slike"=>$link, "opsirno"=>$opsirno_novosti));
						echo "<footer><a  onclick='loadNews(".$paket.")'>Opsirno</a></footer>";
					}	
					
					
					echo '</article>';
					
				} 
				else 
				{
					echo '<script>alert("Fajl nije validan")</script>';
				}
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
		