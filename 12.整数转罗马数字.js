/*
 * @lc app=leetcode.cn id=12 lang=javascript
 * @lcpr version=20004
 *
 * [12] 整数转罗马数字
 */

// @lcpr-template-start

// @lcpr-template-end
// @lc code=start
/**
 * @param {number} num
 * @return {string}
 */
var intToRoman = function (num) {
  const map = {
    1: 'I',
    2: 'II',
    3: 'III',
    4: 'IV',
    5: 'V',
    6: 'VI',
    7: 'VII',
    8: 'VIII',
    9: 'IX',
    10: 'X',
    20: 'XX',
    30: 'XXX',
    40: 'XL',
    50: 'L',
    60: 'LX',
    70: 'LXX',
    80: 'LXXX',
    90: 'XC',
    100: 'C',
    200: 'CC',
    300: 'CCC',
    400: 'CD',
    500: 'D',
    600: 'DC',
    700: 'DCC',
    800: 'DCCC',
    900: 'CM',
    1000: 'M',
    2000: 'MM',
    3000: 'MMM'
  }
  let temp = num // 3794
  let res = ''
  while (temp > 0) {
    let _n = (temp + '').length - 1, // 3
      _p = Math.pow(10, _n), // 1000
      _t = ~~(temp / _p) // 3 向下取整
    temp = temp % _p
    res += map[_t * _p]
  }
  return res
}
// @lc code=end

/*
// @lcpr case=start
// 3749\n
// @lcpr case=end

// @lcpr case=start
// 58\n
// @lcpr case=end

// @lcpr case=start
// 1994\n
// @lcpr case=end

 */
