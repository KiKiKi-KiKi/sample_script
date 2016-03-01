# Google Map v3 カスタマイズセット

## 初めに
google mapのapiを読み込むスクリプトの`<YOUR_KEY>`部分を自身のAPIキーに変更してください。
```html
<script src="http://maps.googleapis.com/maps/api/js?key=<YOUR_KEY>&v=3.22"></script>
```

[参考]
[Google Maps JavaScript API  &nbsp;|&nbsp; Google Developers](https://developers.google.com/maps/documentation/javascript/)

### 地図のサイズ
スタイルシートで地図を表示する`div`のサイズを指定してください。

### custommap.js

- `mapID` ... 地図を表示するdivのIDを指定
- `lat` ... 地図デフォルト表示時の中心となる緯度を指定
- `lng` ... 地図デフォルト表示時の中心となる経度を指定
- `zoom` ... 地図デフォルト表示時の拡大率を指定
- `myMarkers` ... 表示させたいマーカーを配列に下記オブジェクト形式で追加
```javascript
{
  position: {lat: 緯度, lng: 経度}, // マーカーの表示位置
  title:    'クリック時に表示されるタイトル',
  content:  'クリック時に表示されるウィンドウのコンテンツ'
}
```
- `myMapStyle` ... 地図のデザインを変更する場合、スタイルを変更するコードを与える
