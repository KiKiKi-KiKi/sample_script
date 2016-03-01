!function(w, d) {
  var mapID = 'my-map',  // 地図を表示するdivのID
      lat   = 35.681382, // 地図の初期表示の中心となる 緯度
      lng   = 139.76389, // 地図の初期表示の中心となる 経度
      zoom  = 13;        // 地図の初期表示時の拡大率

  /**
   * マーカーのデータを下記フォーマットで作成
   *  {
   *    position: {lat: 緯度, lng: 経度}, // マーカーの表示位置
   *    title:   'クリック時に表示されるタイトル',
   *    content: 'クリック時に表示されるウィンドウのコンテンツ'
   *  }
   * マーカーを使用しない場合は変数を削除 または
   * myMarkers = false とする
   */
  var myMarkers = [
    {
      position: {lat: 35.680345, lng: 139.768446},
      title: '東京駅',
      content: '東京駅八重洲中央口'
    },
    {
      position: {lat: 35.689573, lng: 139.700545},
      title: '新宿駅',
      content: '新宿駅南口'
    },
    {
      position: {lat: 35.690217, lng: 139.697194},
      title: 'COMIC ZIN 新宿店',
      content: '<a href="http://www.comiczin.jp/" target="_blank">店舗webサイト</a>'
    },
    {
      position: {lat: 35.703849, lng: 139.793402},
      title: 'Nui. HOSTEL & BAR LOUNGE',
      content: ''
    }
  ];

  /**
   * マップのデザインを変更する
   *   myMapStyleにスタイルを記述する
   *   デフォルトのスタイルを使用する時は変数を削除 または
   *   myMapStyle = false とする
   */
  var myMapStyle = [
    {
      stylers: [
        {hue: '#86D7E2'},
        {visibility: 'simplified'},
        {gamma: 0.5},
        {weight: 0.5}
      ]
    },
    {
      elementType: 'labels',
      stylers: [{visibility: 'off'}]
    },
    {
      featureType:'landscape',
      elementType: 'all',
      stylers: [{color: '#f2f2f2'}]
    },
    {
      featureType: 'water',
      stylers: [{color: '#46bcec'}]
    }
  ];

  function initialize() {
    var map, isCustomStyle, customMapType, customMapTypeId, infowindow;
    var mapOptions = {
      center: {lat: lat, lng: lng},
      zoom: zoom,
      mapTypeControl: false, // 地図タイプの切り替えボタン
      scaleControl: false,  // 拡大縮小のボタン
      streetViewControl: false // ストリートビューのコントローラー
    };

    if(typeof(myMapStyle) !== 'undefined' && myMapStyle) {
      isCustomStyle = true;
      customMapType = new google.maps.StyledMapType(myMapStyle, {
        name: 'Custom Style'
      });
      customMapTypeId = 'custom_style';
      mapOptions.mapTypeControlOptions = {
        mapTypeIds: [
          google.maps.MapTypeId.ROADMAP,
          customMapTypeId
        ]
      };
    }

    map = new google.maps.Map(d.getElementById( mapID ), mapOptions);

    if(isCustomStyle) {
      map.mapTypes.set(customMapTypeId, customMapType);
      map.setMapTypeId(customMapTypeId);
    }
    // info window
    var showInfoWindow = function(marker) {
      if(infowindow) {
        infowindow.close();
      }
      var contentHTML = '<div class="infowindow"><header class="infowindow-header"><b>' +
        marker.title +
        '</b></header>' +
        '<div class="infowindow-body">' +
        marker.content +
        '</div></div>';
      infowindow = new google.maps.InfoWindow({
        content: contentHTML
      });
      return infowindow.open(map, marker);
    };

    // add markers
    if(typeof(myMarkers) !== 'undefined' && myMarkers && myMarkers.length) {
      for(var i=0, l=myMarkers.length; i<l; i+=1) {
        var markerData = myMarkers[i],
            marker = new google.maps.Marker({
              map: map,
              draggable: false,
              position: markerData.position,
              title: markerData.title,
              content: markerData.content,
              animation: google.maps.Animation.DROP
            });
        marker.addListener('click', function() {
          showInfoWindow(this);
        });
      }
    }
  }
  google.maps.event.addDomListener(w, 'load', initialize);
}(window, document);
