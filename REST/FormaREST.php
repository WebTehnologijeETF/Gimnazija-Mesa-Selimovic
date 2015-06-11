<?php
	function zag() 
	{
		header("{$_SERVER['SERVER_PROTOCOL']} 200 OK");
		header('Content-Type: text/html');
		header('Access-Control-Allow-Origin: *');
	}
	
	function rest_get($request, $data) 
	{
		/*$veza = new PDO("mysql:dbname=gmstz;host=127.5.86.130;charset=utf8", "admintQTwqSu", "4jc2v8FRfAVI");
		$veza->exec("set names utf8");
		
		if(isset($data['br']))
		{
			$rezultat3 = $veza->query("select COUNT(*) broj from vijest");
			$rezultat3 = $rezultat3->fetchColumn(0);
			print json_encode(array("broj" => $rezultat3));
		
		}
		else if(isset($data['id']))
		{
			$id = $data["id"];
			$rezultat = $veza->prepare("select id, naslov, opis, opsirno, link, UNIX_TIMESTAMP(vrijeme) vrijeme2, autor from vijest where id = :id");
			$rezultat->bindParam(':id', $id, PDO::PARAM_INT);
			$rezultat->execute();
			
			if (!$rezultat) 
			{
				$greska = $veza->errorInfo();
				print json_encode(array("error" => $greska));
				die();
			}
			
			$results=$rezultat->fetchAll(PDO::FETCH_ASSOC);
			if(!count($results)) $results = array("error" => "Nema vijest sa tim IDem"); 
			print json_encode($results);
		}
		else
		{
			$rezultat = $veza->query("select id, naslov, opis, opsirno, link, UNIX_TIMESTAMP(vrijeme) vrijeme2, autor from vijest order by vrijeme desc");
     
			if (!$rezultat) 
			{
				$greska = $veza->errorInfo();
				print "SQL greška: " . $greska[2];
				exit();
			}
	 
			$results=$rezultat->fetchAll(PDO::FETCH_ASSOC);
			if(!count($results)) $results = array("error" => "Nema vijesti"); 
			print json_encode($results);
		}*/
	
	}
	function rest_post($request, $data)
	{ 
		$veza = new PDO("mysql:dbname=gmstz;host=127.5.86.130;charset=utf8", "admintQTwqSu", "4jc2v8FRfAVI");
		$veza->exec("set names utf8");
		$naslov = $data["naslov"];
		$tekst = $data["tekst"];
		$autor = "anonimaus";//CE BITI $_SESSION["username"];
		
		$rezultat = $veza->prepare("INSERT INTO vijest SET naslov = :naslov, tekst = :tekst, autor= :autor");
		$rezultat->bindParam(':naslov', $naslov, PDO::PARAM_STR);
		$rezultat->bindParam(':tekst', $tekst, PDO::PARAM_STR);
		$rezultat->bindParam(':autor', $autor, PDO::PARAM_STR);
		$rezultat->execute();
		
		if (!$rezultat) 
		{
			$greska = $veza->errorInfo();
			print json_encode(array("izvjestaj" => $greska[2]));
			exit();
		}
		
		print json_encode(array("izvjestaj" => "Uspijeh!"));
	}
	
	function rest_delete($request) 
	{ 
	/*	$veza = new PDO("mysql:dbname=gmstz;host=127.5.86.130;charset=utf8", "admintQTwqSu", "4jc2v8FRfAVI");
		$veza->exec("set names utf8");
		$id = $_GET["id"];
		$rezultat = $veza->prepare("DELETE FROM vijest WHERE id = :id");
		$rezultat->bindParam(':id', $id, PDO::PARAM_INT);
		$rezultat->execute();
		print json_encode(array("izvjestaj" => "Uspijeh! "));*/
	}
	
	function rest_put($request, $data)
	{
	/*	$veza = new PDO("mysql:dbname=gmstz;host=127.5.86.130;charset=utf8", "admintQTwqSu", "4jc2v8FRfAVI");
		$veza->exec("set names utf8");
		
		$vijest = json_decode($_GET["vijest"], true);
		$id = $_GET["id"];
		$autor = htmlentities($vijest["autor"]);
		$naslov = htmlentities($vijest["naslov"]);
		$tekst = htmlentities($vijest["tekst"]);
		print $autor;
		
		$rezultat = $veza->prepare("UPDATE vijest SET naslov = :naslov, tekst = :tekst, autor= :autor WHERE id = :id");
		$rezultat->bindParam(':naslov', $naslov, PDO::PARAM_STR);
		$rezultat->bindParam(':tekst', $tekst, PDO::PARAM_STR);
		$rezultat->bindParam(':autor', $autor, PDO::PARAM_STR);
		$rezultat->bindParam(':id', $id, PDO::PARAM_INT);
		$rezultat->execute();*/
	}
	
	function rest_error($request) { }

	$method  = $_SERVER['REQUEST_METHOD'];
	$request = $_SERVER['REQUEST_URI'];
	
	
	switch($method) {
		case 'PUT':
			parse_str(file_get_contents('php://input'), $put_vars);
			zag(); $data = $put_vars; rest_put($request, $data); break;
		case 'POST':
			zag(); $data = $_POST; rest_post($request, $data); break;
		case 'GET':
			zag(); $data = $_GET; rest_get($request, $data); break;
		case 'DELETE':
			zag(); rest_delete($request); break;
		default:
			header("{$_SERVER['SERVER_PROTOCOL']} 404 Not Found");
			rest_error($request); break;
	}
?>