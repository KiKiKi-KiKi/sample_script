<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
</head>
<body>
<b>init</b>
<form id="myForm" action="./fileupload.php" method="post" enctype="multipart/form-data">
  <input id="js-inputFile" type="file" name="upfile[]" size="30" multiple accept="image/jpeg" />
  <input id="submitBtn" type="button" value="アップロード" />
</form>
<ul id="file_list"></ul>
<hr/>
<b>init2</b>
<form id="myForm2" action="./fileupload.php" method="post" enctype="multipart/form-data">
  <ul id="file_list2">
    <li class="js-file">
      <input class="js-inputFile" type="file" name="upfile[]" size="30" accept="image/jpeg" />
    </li>
  </ul>
  <input type="submit" value="アップロード" />
</form>

<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js"></script>
<script>
$(function() {
  var init2 = function() {
    // idはhtmlに1つなので $(#id名) とした方が高速
    var $fileList = $('#file_list2');

    $fileList
    // ファイル削除イベント
    .on('click.deleteFile', '.js-deleteBtn', function(evt) {
      var $li = $(this).closest('.js-file');
      // input[type="file"]が1つ以上の場合は該当のinpuタグを削除する
      if($fileList.find('.js-file').length > 1) {
        $li.remove();
      } else {
        $li.find('.js-thumb').remove();
      }
      return false;
    })
    // ファイル選択時のイベント
    .on('change.inputFile', '.js-inputFile', function(evt) {
      var $input = $(this),
          fileID = $input.data('fid'),
          $li = $input.closest('.js-file'),
          $newLi;

      if(evt.target.files.length) {
        $newLi = $li.clone();
        $newLi.find('.js-inputFile').val(null);
        // 新しくinputタグを追加する
        $fileList.append($newLi);

        $.each(evt.target.files, function(i, elm) {
          var file = this,
              fileName = file.name,
              reader;

          // サムネイル画像生成
          reader = new FileReader();
          reader.readAsDataURL(file);

          // ファイルアップロード時の処理
          reader.onloadend = function(evt) {
            var fileReader = this;
            if(fileReader.result) {
              var thumb = '<div class="js-thumb"><img src="' + fileReader.result + '" width="150px" height="150px" style="max-width:100%;height:auto;">' + fileName + '<button class="js-deleteBtn">削除</button></div>';
              $li.append(thumb);
            }
            return this;
          };
        });
        $input.hide();
      } else {
        // ファイルが選択がキャンセルされた時 既にサムネイルが表示されてるなら削除する
        $li.find('.js-deleteBtn').trigger('click');
      }
      return this;
    });
  };
  init2();

  var init = function() {
    var $form = $('#myForm'),
        $fileList = $('#file_list'),
        filesObj;

    // サムネイル削除時
    $fileList.on('click.deleteFile', '.js-deleteBtn', function(evt) {
      var $li = $(this).closest('.js-thumb'),
          fileID = $li.data('img-id');
      $li.remove();
      // ファイルリストから削除
      delete filesObj[fileID];
      return false;
    });

    $form
    // ファイル選択時
    .on('change.selectFiles', '#js-inputFile', function(evt) {
      // ファイルリスト・ファイルリストを初期化
      $fileList.html('');
      filesObj = {};
      jQuery.each(evt.target.files, function(i, elm) {
        var file = this,
              fileName = file.name,
              fileIndex = i,
              reader;
        // ファイルリストに追加
        filesObj[i] = file.name;

        // サムネイル画像生成
        reader = new FileReader();
        reader.readAsDataURL(file);

        // サムネイルを表示させる処理
        reader.onloadend = function(evt) {
          var fileReader = this;
          if(fileReader.result) {
            var html = '<li class="js-thumb" data-img-id="' + fileIndex + '"><img src="' + fileReader.result + '" width="150px" height="150px" style="max-width:100%; height: auto;">' + fileName + '<button class="js-deleteBtn">削除</button></li>';
            $fileList.append(html);
          }
          return this;
        };
        return this;
      });
    })
    // フォーム送信時の処理
    .on('click.formSubmit', '#submitBtn', function(evt) {
      var formData = new FormData(),
          files = $('#js-inputFile').prop("files");

      for(var i=0, l=files.length; i<l; i+=1) {
        // 削除されていないファイルだけを送信するように整形
        if( filesObj[i] ) {
          formData.append("upfile[]", files[i]);
        }
      }
      // その他のデータもある場合は formData に追加する

      $.ajax({
        url: 'fileupload_api.php',
        method: 'post',
        dataType: 'json',
        data: formData,
        processData: false,
        contentType: false,
      })
      .done(function( res ) {
        console.log('送信成功', res);
      })
      .fail(function(jqXHR, textStatus, errorThrown) {
        console.log('送信失敗', jqXHR, textStatus, errorThrown);
      });
      return false;
    });
  };
  init();
});
</script>
</body>
</html>
