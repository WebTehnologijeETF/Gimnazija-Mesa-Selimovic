<?php include('ValidacijaForme.php'); ?>

	<form method="post"  action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]);?>" name = "InputForm" class="form">
		
		<p class="name">
			<input type="text" name="name" id="name" placeholder="Ime prezime" value="<?php echo $name; ?>"/>
			<label for="name">Ime i prezime</label>
			<p id = "name_error"><p>
		</p>
		

		<p class="email">
			<input type="text" name="email" id="email" placeholder="mail@example.com" value="<?php echo $email; ?>"/>
			<label for="email">Email</label>
			<p id = "email_error"><p>
		</p>
		
		<p class="webcheck">
			<label for="web">Da li zelite ostaviti svoju web adresu: </label><br>
			<input type="radio" id="webradioDA" name = "webradio" value="DA" onchange = "Enable();">DA
			<input type="radio" id="webradioNE" name = "webradio"  value="NE" onchange = "Enable();"  checked>NE		
		</p>

		<p class="web">
			<input type="text" name="web" id="web" placeholder="www.example.com" value="<?php echo $web; ?>" disabled/>
		</p>		
	
		<p class="text">
			<textarea id="input" name="text" placeholder="Napiši nešto" value="<?php echo $text; ?>"></textarea>
			<p id = "text_error"><p>
		</p>
		
		<p class="submit">
			<input name="send" type="submit" value="Pošalji" />
		</p>
	</form>