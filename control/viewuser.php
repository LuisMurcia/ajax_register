<?php
    include_once "../conection/db.php";
    $db = new Database();
    $conn=$db->getConn();
    if($_POST){
        $search = $_POST["searchinp"];
        $sql="SELECT personas.nombre, personas.email, personas.telefono, departamentos.nombre as departamento, puestos.nombre as puesto FROM personas JOIN puestos ON (personas.id_puesto = puestos.id) JOIN departamentos ON(puestos.id_departamento = departamentos.id) WHERE personas.nombre LIKE ?";
        $stmt = $conn->prepare($sql);
        $stmt->bindValue(1,"%$search%",PDO::PARAM_STR);
        $stmt->execute();
        $json =  array();
        while($row = $stmt->fetch(PDO::FETCH_ASSOC)){
            $json[]= array(
                'nombre' => $row["nombre"],
                'email' => $row["email"],
                'telefono' => $row["telefono"],
                "departamento" => $row["departamento"],
                "puesto" => $row["puesto"]
            );
        }
        $jsonstring = json_encode($json);
        echo $jsonstring;
    }
    else{
        $sql="SELECT personas.nombre, personas.email, personas.telefono, departamentos.nombre as departamento, puestos.nombre as puesto FROM personas JOIN puestos ON (personas.id_puesto = puestos.id) JOIN departamentos ON(puestos.id_departamento = departamentos.id)";
        $stmt = $conn->prepare($sql);
        $stmt->execute();
        $json =  array();
        while($row = $stmt->fetch()){
            $json[]= array(
                'nombre' => $row["nombre"],
                'email' => $row["email"],
                'telefono' => $row["telefono"],
                "departamento" => $row["departamento"],
                "puesto" => $row["puesto"]
            );
        }
        $jsonstring = json_encode($json);
        echo $jsonstring;
    }
?>