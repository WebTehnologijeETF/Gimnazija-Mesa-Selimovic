<?php

	function CrosScriptingDisable($input) 
    {
        return htmlspecialchars(stripslashes(trim($input)));
    }
	
	
	
	$name = $email = $web = $text = "bla";
	$crossradiobtn = false;
	
	
	session_start();
	
	
	if(isset($_POST["send"]))
	{
		echo "babo";
			echo '<h4>Provjerite da li ste ispravno popunili kontakt formu</h4>';		
			echo "Ime i prezime: ".$name."<br>";
			echo "Email: ".$email."<br>";
			echo "Website URL: ".$web."<br>";
			echo "Tekst poruke: ".$text."<br>";
			echo '<h4>Da li ste sigurni da želite poslati ove podatke?</h4>';
			echo '<button name="sure" type="submit" action="."&lt?php echo htmlspecialchars($_SERVER["PHP_SELF"]);?&gt".">Siguran&nbsp;sam</button>';
	}
	if(isset($_POST["sure"]))
	{

	}
?>

