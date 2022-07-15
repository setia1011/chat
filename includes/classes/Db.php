<?php

// session start
if (session_id() == '' || !isset($_SESSION) || session_status() === PHP_SESSION_NONE) {
    session_start();
}

// require '../../vendor/autoload.php';
// require '../config.php';

use Respect\Validation\Validator as v;

class Db {
    public $db_hostname = DATABASE_HOST;
    public $db_username = DATABASE_USERNAME;
    public $db_password = DATABASE_PASSWORD;
    public $db_name = DATABASE_DB;

    public $link;
    public $error;

    public function __construct() {
        $this->connectDb();        
    }

    private function connectDb() {
        $this->link = new \MySQLi($this->db_hostname, $this->db_username, $this->db_password, $this->db_name);
        if (!$this->link) {
            $this->error = 'Connection failed'.$this->link->connect_error;
            return false;
        }
    }

    public function login($username) {
        if (!v::alnum()->validate($username)) {
            return "Username tidak valid!";
            die();
        }

        $result = $this->link->query("SELECT * FROM user WHERE username = '$username'") or die($this->link->error.__LINE__);
        if ($result) {
            return $result;
        } else {
            return false;
        }
    }
}

$db = new Db();
$login = $db->login('gon');

// if (mysqli_num_rows($login) > 0) {
//     while ($row = mysqli_fetch_assoc($login)) {
//         echo $row['username'];
//     }
// } else {
//     return "Username tidak ditemukan";
// }