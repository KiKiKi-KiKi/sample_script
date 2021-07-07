export {};

console.log('>>> Format Number');

const num1: number = 1234567890;
const num2: number = 1234567890.1235;
const num3: number = -1234567;
const num4: number = -1234567.89054321;
const data = [num1, num2, num3, num4];

console.log('Number.prototype.toLocaleString');
// https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Number/toLocaleString
const localeString = (n: number): string => {
  return n.toLocaleString();
};

console.log(data.map((num) => localeString(num)));
// => '1,234,567,890'
// => '1,234,567,890.124'
// => '-1,234,567'
// => '-1,234,567.891'

const localeStringWithOptions = (
  num: number,
  options?: Intl.NumberFormatOptions
) => {
  return num.toLocaleString(undefined, options);
};

console.log(
  data.map((num) => localeStringWithOptions(num, { maximumFractionDigits: 20 }))
);

// ~~maximumSignificantDigits option を使用することで丸める桁数を指定できる~~
// maximumSignificantDigits は有効桁数
// 小数点以下の桁数は maximumFractionDigits を使う
console.log(num2.toLocaleString(undefined, { maximumSignificantDigits: 6 }));
// => '1,234,570,000'

console.log('>>> Intl.NumberFormat');
// https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat
const numberFormat =
  (locales?: string | string[], options?: Intl.NumberFormatOptions) =>
  (n: number): string => {
    return new Intl.NumberFormat(locales, options).format(n);
  };

const formatEN = numberFormat();
console.log(data.map((num) => formatEN(num)));
// => '1,234,567,890'
// => '1,234,567,890.124'
// => '-1,234,567',
// => -1,234,567.891'

const formatJP = numberFormat('ja-JP');
console.log(data.map((num) => formatJP(num)));
// => '1,234,567,890'
// => '1,234,567,890.124'
// => '-1,234,567',
// => -1,234,567.891'

const formatDE = numberFormat('de-DE');
console.log(data.map((num) => formatDE(num)));
// => '1.234.567.890',
// => '1.234.567.890,124'
// => '-1.234.567',
// => '-1.234.567,891'

console.log('--------------------------------');
const numberFormatWithOptions =
  (options?: Intl.NumberFormatOptions) =>
  (locales?: string | string[]) =>
  (n: number): string => {
    return new Intl.NumberFormat(locales, options).format(n);
  };

const formatNumberWithDecimalMax = numberFormatWithOptions({
  maximumFractionDigits: 20,
});

const formatJP2 = formatNumberWithDecimalMax('ja-JP');
console.log(data.map((num) => formatJP2(num)));
// => '1,234,567,890',
// => '1,234,567,890.1235',
// => '-1,234,567',
// => '-1,234,567.89054321'

const formatDE2 = formatNumberWithDecimalMax('de-DE');
console.log(data.map((num) => formatDE2(num)));
// => 1.234.567.890',
// => '1.234.567.890,1235',
// => '-1.234.567',
// => '-1.234.567,89054321'

const formatFI = formatNumberWithDecimalMax('fi-FI');
console.log(data.map((num) => formatFI(num)));
// => '1 234 567 890',
// => '1 234 567 890,1235',
// => '−1 234 567',
// => '−1 234 567,89054321'

console.log('--------------------------------');
const formatNumberXXX =
  (options?: Intl.NumberFormatOptions) =>
  (locals?: string | string[]) =>
  (num: number | string): string => {
    const numStrs = String(num).split('.');
    return [
      Number(numStrs[0]).toLocaleString(locals, options),
      numStrs.slice(1).join(''),
    ]
      .filter(Boolean)
      .join('.');
  };

const formatX = formatNumberXXX({
  maximumFractionDigits: 20,
})('ja-JP');

// 数値にすると変数代入の時点で小数点 n位で丸められる
const num5 = '111111.098765432109876543210987';
const num6 = '-111111.098765432109876543210987';
console.log([num5, num6].map((num) => formatJP2(Number(num))));
console.log([num5, num6].map((num) => formatX(num)));

console.log('>>> 整数部分と小数部分に数値のまま分割する');

const splitIntAndDecimal = (num: number): [number, number] => {
  const numStr = String(num);
  const decimalPointIndex = numStr.indexOf('.');
  if (decimalPointIndex < 0) {
    return [num, 0];
  }

  const initPart = Math.floor(num);
  const decimalPartStr = `0.${numStr.slice(decimalPointIndex + 1)}`;
  const decimalPart = parseFloat(decimalPartStr);

  return [initPart, num < 0 ? -decimalPart : decimalPart];
};

const splitIntAndDecimalBySplit = (num: number): [number, number] => {
  const isNegative = num < 0;
  const numStr = String(Math.abs(num));
  const splitNumStr = numStr.split('.');
  const initPartStr = splitNumStr[0];
  const decimalPartStr = splitNumStr.length > 1 ? splitNumStr[1] : '0';
  const initAndDecimalStr: [string, string] = [initPartStr, decimalPartStr];

  return initAndDecimalStr.map((n, i) => {
    const num = i === 0 ? Number(n) : parseFloat(`0.${n}`);
    return isNegative ? -num : num;
  }) as [number, number];
};

console.log('>>> split number');
console.log(data.map((num) => splitIntAndDecimal(num)));
console.log(data.map((num) => splitIntAndDecimalBySplit(num)));

console.log('>>> 正規表現');
const formatRegExp = (num: number): string => {
  const numStrings = String(num).split('.');
  return [
    numStrings[0].replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,'),
    numStrings.slice(1).join(''),
  ]
    .filter(Boolean)
    .join('.');
};
console.log(data.map((num) => formatRegExp(num)));
// => '1,234,567,890',
// => '1,234,567,890.1235',
// => '-1,234,567',
// => '-1,234,567.89054321'

console.log('>>> optional');
const formatRegExpWithOption = (
  num: number,
  options?: FormatOption
): string => {
  const numStrs = String(num).split('.');
  return [
    numStrs[0].replace(
      /(\d)(?=(\d\d\d)+(?!\d))/g,
      `$1${options?.separator || ','}`
    ),
    numStrs.slice(1).join(''),
  ]
    .filter(Boolean)
    .join(options?.decimalPoint || '.');
};

console.log(
  data.map((num) =>
    formatRegExpWithOption(num, { separator: '.', decimalPoint: ',' })
  )
);
// => '1.234.567.890',
// => '1.234.567.890,1235',
// => '-1.234.567',
// => '-1.234.567,89054321'

console.log('>>> 再帰関数');

const separate = (numStr: string, separator: string = ','): string => {
  const length = numStr.length;

  if (length > 3) {
    const splitIndex = length - 3;
    return [
      separate(numStr.substring(0, splitIndex), separator),
      numStr.substring(splitIndex),
    ].join(separator);
  }

  return numStr;
};

const formatNumber = (num: number): string => {
  const numStr = String(num).split('.');
  return [separate(numStr[0], ' '), numStr.slice(1).join('')]
    .filter(Boolean)
    .join('.');
};
console.log(data.map((num) => formatNumber(num)));
// => '1 234 567 890',
// =>  '1 234 567 890.1235',
// =>  '-1 234 567',
// =>  '-1 234 567.89054321'

console.log('>>> optional');
type FormatOption = {
  separator?: string;
  decimalPoint?: string;
};

const formatNumberX = (num: number, options?: FormatOption): string => {
  const numStrs = String(num).split('.');
  return [separate(numStrs[0], options?.separator), numStrs.slice(1).join('')]
    .filter(Boolean)
    .join(options?.decimalPoint || '.');
};

console.log(data.map((num) => formatNumberX(num)));
// => '1 234 567 890',
// =>  '1 234 567 890.1235',
// =>  '-1 234 567',
// =>  '-1 234 567.89054321'
