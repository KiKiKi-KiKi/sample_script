<?php
/**
 * refs. http://carbon.nesbot.com/docs/
 */
require 'vendor/autoload.php';
use Carbon\Carbon;

/*
$dt = Carbon::now();

// 月のうちの何週目か
echo $dt->weekOfMonth . "\n";
*/


$weekCalenderData = getWeekCalender(true, "2017-02-27");
var_dump($weekCalenderData);
$th = '';
$td = '';
foreach($weekCalenderData as $val) {
  $th .= "<th>{$val['week']}</th>\n";
  $td .= "<th>{$val['day']}</th>\n";
}
echo "<table><tr>${th}</tr><tr>{$td}</tr></table>";

// ----------------------------------------------------------------

// @param $isStartSun(Boolean)
//        true ... week start Sun
//        false ... week start Mon
function getWeekCalender($isStartSun = false, $date = "") {
  $today = new Carbon( $date );
  $todayDay = $today->day;
  $startDate = getStartDay( $today->toDateString("Y-m-d"), $isStartSun );
  $startDay = $startDate->day;
  // 週の最終日を取得
  // note. コピーを作成しないと元のインスタンスの値が変更される
  $lastDay = $startDate->copy()->addDay(7)->day;

  // 開始日のある月の最終日を取得
  $limitDay = $startDate->copy()->endOfMonth()->day;

  // echo $startDate . ' - ' . $lastDate;

  $month = $startDate->month;
  $offset = $limitDay - $startDay;
  $day = $startDay;
  $weekArr = [];
  $i = 0;
  while($i < 7) {
    $day = $startDay + $i;
    // 月を跨いだ時
    if( $day > $limitDay ) {
      $day = $i - $offset;
      if($day === 1) {
        $month += 1;
      }
      if($month > 12) {
        $month = 1;
      }
    }
    if($isStartSun) {
      $week = getWeekByIndex($i);
    } else {
      $week = getWeekByIndex($i+1);
    }
    $weekArr[] = [
      'month' => $month,
      'day'   => $day,
      'week'  => $week,
      'today' => $todayDay === $day? true : false,
    ];
    $i++;
  }

  return $weekArr;
}

// 週の最初の日を取得
// @param $today(:String) 'Y-m-d'
function getStartDay($today, $isStartSun) {
  $dt = new Carbon( $today );

  // $today が週の内何日目か (Sun = 0)
  $w = $dt->dayOfWeek;

  // 月曜始まりのとき
  if( !$isStartSun ) {
    // 今日が日曜なら前の月曜
    if($w === 0) {
      $w = 7;
    }
    $w -= 1;
  }

  return $dt->subDay( $w );
}

function getWeekByIndex($i) {
  $arr = ['Sun.', 'Mon.', 'Tue.', 'Wed.', 'Thu.', 'Fri.', 'Sat.'];
  $len = count($arr);
  if($i >= $len) {
    $i -= $len;
  }
  return $arr[$i];
}
