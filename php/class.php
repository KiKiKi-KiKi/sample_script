<?php
ini_set( 'error_reporting', E_ALL );
class Destroyer {
  private $CLASS = 'Destroyer';
  private $name;

  function __construct($name = null) {
    $this->name = $name;
  }
  /*
  protected function getClass() {
    return $this->class;
  }

  public function getName() {
    return $this->name;
  }
  */
  protected function call() {
    $class = $this->CLASS;
    $name = $this->name;
    // echo "{$class} {$name}";
    return "{$class} {$name}";
  }
}

class Akastuki extends Destroyer {
  public function myName() {
    //$this->name;
    $p = $this->call();
    echo $p;
  }
}

$akastuki = new Akastuki('暁');
$akastuki->myName();
?>
