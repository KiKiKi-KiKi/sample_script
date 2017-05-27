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


$weekCalenderData = getWeekCalender(false);
// var_dump($weekCalenderData);
$th = '';
$td = '';
foreach($weekCalenderData as $val) {
  $th .= "<th>{$val['week']}</th>\n";
  $td .= "<th>{$val['day']}</th>\n";
}
echo "<table><tr>${th}</tr><tr>{$td}</tr></table>";

// ----------------------------------------------------------------

// @param $startSun(Boolean)
//        true ... week start Sun
//        false ... week start Mon
function getWeekCalender($startSun = true, $date = "") {
  $today = getToday( $date );
  if($startSun) {
    $startDate = getThisSunday( $today );
  } else {
    $startDate = getThisMonday( $today );
  }
  $startDay = $startDate->day;
  // 月末日を取得
  $limitDay = getLastDayOfMonth();
  // note. コピーを作成しないと元のインスタンスの値が変更される
  $lastDate = $startDate->copy()->addDay(7);
  $lastDay = $lastDate->day;

  // echo $startDate . ' - ' . $lastDate;

  $month = $startDate->month;
  $offset = $limitDay - $startDay;
  $day = $startDay;
  $weekArr = [];
  $i = 0;
  while($i < 7) {
    $day = $startDay + $i;
    if( $day > $limitDay ) {
      $day = $i - $offset;
      if($day === 1) {
        $month += 1;
      }
      if($month > 12) {
        $month = 1;
      }
    }
    if($startSun) {
      $week = getWeekByNum($i);
    } else {
      $week = getWeekByNum($i+1);
    }
    $weekArr[] = [
      'month' => $month,
      'day'   => $day,
      'week'  => $week,
    ];
    $i++;
  }

  return $weekArr;
}

// @param $date(String) ex "2017-05-01"
function getToday($date = "") {
  $dt = new Carbon( $date );
  return $dt->toDateString("Y-m-d");
}

// 今週の月曜日を取得
// @param $date(String) ex "2017-05-01"
function getThisMonday($date = "") {
  $dt = new Carbon( $date );

  // 週の内何日目か Sun = 0
  $w = $dt->dayOfWeek;
  if($w === 0) {
    $w = 7;
  }

  $monday = $dt->subDay( $w-1 );

  return $monday;
}

// 今週の日曜日を取得
// @param $date(String) ex "2017-05-01"
function getThisSunday($date = "") {
  $dt = new Carbon( $date );

  // 週の内何日目か Sun = 0
  $w = $dt->dayOfWeek;

  $sunday = $dt->subDay( $w );

  return $sunday;
}

// 今月の最終日を取得
// @param $date(String) ex "2017-05-01"
function getLastDayOfMonth($date ="") {
  $dt = new Carbon( $date );
  $lastDate = $dt->modify("last day of next month");
  return $lastDate->day;
}

function getWeekByNum($i) {
  $arr = ['Sun.', 'Mon.', 'Tue.', 'Wed.', 'Thu.', 'Fri.', 'Sat.'];
  $len = count($arr);
  if($i >= $len) {
    $i -= $len;
  }
  return $arr[$i];
}
