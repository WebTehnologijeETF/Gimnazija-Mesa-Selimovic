<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <title>Jedna vijest</title>
  </head>
  <body>
    
    <?php
	 $id = $_GET["id"];
     $veza = new PDO("mysql:dbname=wt8;host=localhost;charset=utf8", "wt8user", "wt8pass");
     $veza->exec("set names utf8");
     $rezultat = $veza->query("select id, naslov, tekst, UNIX_TIMESTAMP(vrijeme) vrijeme2, autor from vijest where id =".$id);
	 
	if($_SERVER['REQUEST_METHOD'] == 'GET')
	 {
		 if(isset($_GET["name"]) && isset($_GET["comment"]) && $_GET["comment"] != "")
		 {
			
			$name = $_GET["name"];
			$comm = $_GET["comment"];
			$rezultat1 = $veza->query("INSERT INTO komentar SET vijest=".$id.", tekst='".$comm."', autor='".$name."'");
		 }
	 }
     
     if (!$rezultat) {
          $greska = $veza->errorInfo();
          print "SQL greška: " . $greska[2];
          exit();
     }


     foreach ($rezultat as $vijest) 
     {
          print "<h1>".htmlspecialchars($vijest['naslov'], ENT_QUOTES, 'UTF-8')."</h1>";
          print "<small>".htmlspecialchars($vijest['autor'], ENT_QUOTES, 'UTF-8')."</small>";
          print "<p>".htmlspecialchars($vijest['tekst'], ENT_QUOTES, 'UTF-8')."</p>";
          print "<small>".date("d.m.Y. (h:i)", $vijest['vrijeme2'])."</small>";

        $rezultat1 = $veza->query("select tekst, autor, UNIX_TIMESTAMP(vrijeme) vrijeme2 from komentar where vijest = ".$id);
      
		print "<form action = 'vijest.php' method='get'>";
		print "<input type='hidden' name='id' id='id' value='".htmlspecialchars($id, ENT_QUOTES, 'UTF-8')."'/>";
		print "Autor: <input type='text' name='name' id='name' value = ''/><br />
			Komentar:<br/>
			<textarea name='comment' id='comment'></textarea><br />
		  
		  <input type='submit' value='Submit' />  
		</form>";	  

      if (!$rezultat1) 
      {
        $greska = $veza->errorInfo();
        print "SQL greška: " . $greska[2];
        exit();
      }
      else
      {
          print "<h3>Komentari: </h3>";
          foreach ($rezultat1 as $komentar) 
          print "<h5>".htmlspecialchars($komentar['autor'], ENT_QUOTES, 'UTF-8')."</h5><small>".date("d.m.Y. (h:i)", $komentar['vrijeme2'])."</small><p>".htmlspecialchars($komentar['tekst'], ENT_QUOTES, 'UTF-8')."</p>";
      }
	 
    
     }
    ?>
  </body>
</html>