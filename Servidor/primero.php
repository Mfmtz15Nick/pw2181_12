<?php
$p1 = $_GET["PARAMETRO1"];
    for ($i=0; $i < 10; $i++) { 
    
            print("Hola PHP ".$i."<br>");
    }
?>
<!DOCTYPE html>
<html>
<head>
    
    <title>Page Title</title>
    
</head>
<body>
    <?php print($p1);?>
    
</body>
</html>