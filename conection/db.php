<?php
 class Database{
     private $usu = "root";
     private $pass = "";
     private $host = "localhost";
     private $db = "ajax";
     private $conn;  
    public function getConn(){
        try {
            $this->conn = new PDO("mysql:host={$this->host}; dbname={$this->db};", $this->usu , $this->pass);
            $this->conn->query("set names 'utf8'");
        }catch (PDOException $exception) {
            echo "Connection error: ".$exception->getMessage();
        }
        return $this->conn;
    }
 }
?>