<?php /* https://teratail.com/questions/18031 */?>
<?php
if(isset($_GET['f1']) && $_GET['f1']){
  $f1 = $_GET["f1"];
  $f2 = $_GET["f2"];
  $ct = count($f1);

  // $f1, $f2の配列の長さが違うと死ぬ
  for($i=0; $i<$ct; $i++) {
    echo $f1[$i]."／".$f2[$i]."<br>";
  }
} else {
?>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js"></script>
<script>
  var f1 = [];
  var f2 = [];

  //(配列f1、f2に種々の値を入れる処理)
  f1 = [10,20,30,40,50];
  f2 = [1,2,3,4,5];

$(function() {
  $.ajax({
    url: "b.php",
    type: "get",
    datatype: 'html',
    data: {
      f1 : f1,
      f2 : f2
    }
  })
  .done(function(res) {
    // Ajaxでb.phpの読み込みが成功した
    console.log(res);
    // body に 返されたecho の内容を追加
    $('body').append(res);
  })
  .fail(function() {
    // Ajaxでb.phpの読み込みが失敗した
    console.log('Error', arguments);
  });
});
</script>
<?php } ?>
