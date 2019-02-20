<?php
    include_once "../conection/db.php";
    if($_POST){
        $db = new Database();
        $conn = $db->getConn();
        $sql="INSERT INTO personas (nombre, email, telefono, id_puesto) VALUES (:argname, :argemail, :argphone, :argid_puesto)";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(":argname", $_POST["name"]);
        $stmt->bindParam(":argemail", $_POST["email"]);
        $stmt->bindParam(":argphone", $_POST["phone"]);
        $stmt->bindParam(":argid_puesto", $_POST["puesto"]);
        if($stmt->execute()){
            echo "Añadido correctamente";
        }
        else{
            echo "No se ha añadido";
        }
    }
?>