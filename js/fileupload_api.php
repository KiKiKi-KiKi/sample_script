<?php
if($_FILES && count($_FILES)) {
  $data = json_encode($_FILES);
  header("Content-Type: application/json; charset=utf-8");
  echo $data;
  exit();
} else {
  header('HTTP', true, 403);
  exit();
}
?>
