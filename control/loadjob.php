<?php
    include_once "../conection/db.php";
    if(isset($_GET)){
        $db = new Database();
        $conn = $db->getConn();
        $sql="SELECT id,nombre FROM puestos WHERE id_departamento =:argid_departamento";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(":argid_departamento", $_GET["departamento"]);
        if($stmt->execute()){
            while($row = $stmt->fetch()){
                echo "<option value=".$row["id"].">".$row["nombre"]."</option>";
            }
        }
    }
?>