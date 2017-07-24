<?php
function split_a($str) {
  $reg = '/<a .*?>(.*?)<\/a>/';
  echo preg_replace($reg, "$1", $str);
  echo '<br>';
  preg_match($reg, $str, $match);
  var_dump($match);
  echo '<hr>';
}
$str = <<< EOM
<p>出力されるHTMLです。
<a id="foo" href="#" data="hoge" class="abc" target="_blank">ここにリンクが有ります。</a>
ここからはリンクではありません。</p>
EOM;

split_a($str);
/*
rray(2) {
  [0]=>
  string(101) "<a id="foo" href="#" data="hoge" class="abc" target="_blank">ここにリンクが有ります。</a>"
  [1]=>
  string(36) "ここにリンクが有ります。"
}
*/

$str = <<< EOM
<address>addressタグ出力されるHTMLです。
<a id="foo" href="#" data="hoge" class="abc" target="_blank">ここにリンクが有ります。</a>
ここからはリンクではありません。</address>
EOM;

split_a($str);
/*
array(2) {
  [0]=>
  string(101) "<a id="foo" href="#" data="hoge" class="abc" target="_blank">ここにリンクが有ります。</a>"
  [1]=>
  string(36) "ここにリンクが有ります。"
}
*/

$str = <<< EOM
出力されるHTMLです。
<a id="foo" href="#" data="hoge" class="abc" target="_blank">ここにリンクが有ります。<address>addressタグ</address></a>
ここからはリンクではありません。
EOM;

split_a($str);
/*
array(2) {
  [0]=>
  string(133) "<a id="foo" href="#" data="hoge" class="abc" target="_blank">ここにリンクが有ります。<address>addressタグ</address></a>"
  [1]=>
  string(68) "ここにリンクが有ります。<address>addressタグ</address>"
}
*/

$str = <<< EOM
<abbr>出力されるHTMLです。</abbr>
<a id="foo" href="#" data="hoge" class="abc" target="_blank">ここにリンクが有ります。</a>
ここからはリンクではありません。
EOM;

split_a($str);
/*
array(2) {
  [0]=>
  string(101) "<a id="foo" href="#" data="hoge" class="abc" target="_blank">ここにリンクが有ります。</a>"
  [1]=>
  string(36) "ここにリンクが有ります。"
}
*/

$str = <<< EOM
出力されるHTMLです。
<a id="foo" href="#" data="hoge" class="abc" target="_blank"><abbr>ここにaddrタグに囲まれたリンクが有ります。</abbr>続きのテキスト</a>
ここからはリンクではありません。
EOM;

split_a($str);
/*
array(2) {
  [0]=>
  string(160) "<a id="foo" href="#" data="hoge" class="abc" target="_blank"><abbr>ここにaddrタグに囲まれたリンクが有ります。</abbr>続きのテキスト</a>"
  [1]=>
  string(95) "<abbr>ここにaddrタグに囲まれたリンクが有ります。</abbr>続きのテキスト"
}
*/
