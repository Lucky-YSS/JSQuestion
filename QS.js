// GAMES 1 START
/*
黑板上写着一个非负整数数组numsi]。Alice和 Bob 轮流从黑板上擦掉一个数字，Alice 先手如果擦除一个数字后，剩余的所有数字按位异或运算得出的结果等于0的话，当前玩家游戏失败。 另外，如果只剩一个数字，按位异或运算得到它本身;如果无数字剩余，按位异或运算结果为 0。
并且，轮到某个玩家时，如果当前黑板上所有数字按位异或运算结果等于0，这个玩家获胜。假设两个玩家每步都使用最优解，当且仅当Aice 获胜时返回 true。
示例 1:输入: nums =[1,1,2]输出: false
解释:
Alice有两个选择:擦掉数字1或2如果擦掉1数组变成[12]。剩余数字按位异或得到1XOR 2=3。那么 Bob 可以擦掉任意数字，因为Alice会成为擦掉最后一个数字的人，她总是会输。如果Alice 擦掉2，那么数组变成[1，1]。剩余数字按位异或得到1XOR1=0。Alice 仍然会输掉游戏。示例 2:输入: nums = [0,1]输出: true
示例 3:
输入: nums =[1,2,3]输出: true 
 */
{
  let dataSource = [1,1,0,5,1]
  let role = ''
  // 按位异或运算
  const fn_1 = (arr) => {
    let res = 0;
    arr.forEach(i => {
      res = res ^ i
    })
    return res
  }
  // 改变角色
  const changeRole = () => {
    role == 'Alice' ? role = 'Bob' : role = 'Alice'
  }
  // 获取最优解
  const getBestResult = (val) => {
    let _arr = JSON.parse(JSON.stringify(val));
    let key = 0;
    _arr.forEach((i, k) => {
      let new_arr = _arr.filter(m => m != i);
      let res = fn_1(new_arr)
      if(res != 0) {
        key = k
      }
    })
    return val.splice(key, 1)
  }
  const gameRule = (val) => {
    let result = false;
    if(val.length == 1) {
      result = false
    } else if (val.length == 0) {
      result = 0
    } else {
      changeRole();
      let res_arr = getBestResult(val);
      result = gameRule(res_arr);
    }
    return result;
  }
  let res = gameRule([1,2,3]);
  if((role == 'Alice' && res === 0) || (role == 'Blob' && res === false)) {
    console.log(true, `role:${role}-------result:${res}`)
  } else {
    console.log(false)
  }
  
}

// GAMES 1 END


// GAMES 2 START
/*
在一个古老的传说中，存在一种神秘的数字序列，这个数字序列的第一个数字是1”，后面的每个数字都是前面所有数字出现的次数的排列。例如，开始是1’，然后是11’(因为前面有一个1)，接着是21’(因为前面有两个1)，然后是1211’(因为前面有一个2
和一个1) .....
这个序列开始的几个数字是:“1，11，21，1211，111221，...
您的任务是: 给定序列中的一个数字 (字符串形式)，找到它在序列中的位置
输入:
一个字符串~s’，表示序列中的一个数字。(长度1< s < 1000)
输出
整数，表示该数字在序列中的位置 
 */
{
  const countNum = (num) => {
    let _num = num.toString();
    let res_num = '';
    let obj = {
      text: '',
      num: 0
    };
    for(let i = 0;i < _num.length;i++) {
      let d = _num[i];
      if (!obj.text) {
        obj.text = d;
        obj.num = 1;
      } else if (obj.text == d) {
        obj.num++;
      } else {
        res_num += obj.num + obj.text;
        obj.text = d;
        obj.num = 1;
      }
    }
    res_num += obj.num + obj.text;
    return parseInt(res_num);
  }
  // 生成数列
  const Generate = (val) => {
    let arr = [];
    for(let i = 0;i < val;i++) {
      if(i == 0) {
        arr.push(1);
      } else {
        let num = arr[i-1];
        arr.push(countNum(num));
      }
    }
    return arr;
  }
  // 获取位置
  const getIndex = (list, val) => {
    return list.indexOf(val) + 1;
  }
  let numList = Generate(8);
  let index = getIndex(numList, 1211);
  console.log(index)
}

// GAMES 2 END

// GAMES 3 STRAT
/*
题目：浏览器标签之困
描述：
你正在使用一个特殊的浏览器，这个浏览器只有两种类型的标签页：文档和视频。你注意到，这个浏览器有一个奇怪的限制：在任何时候，连续打开的文档标签数或连续打开的视频标签数都不能超过n个。
你从一个空的浏览器开始，现在你有一个计划，想要打开x个文档标签和y个视频标签。
请你计算：按照这个浏览器的限制，至少需要多少个标签页才能放下你的所有文档和视频标签？请记住，你可以随时关闭任何标签页，但你想最大化保留打开的标签页数量。
输入:
三个整数 x, y, n，分别代表想要打开的文档标签数、视频标签数和浏览器的限制。
输出:
一个整数，表示最少需要的标签页数。
示例:
输入: x = 5, y = 3, n = 2
输出: 8
解释: 一种可能的最优方式是这样打开标签页的：文档, 文档, 视频, 视频, 文档, 文档, 视频, 文档。
约束:
1 <= x, y <= 10^4
1 <= n <= 10 
 */

{
  const getTagNum = (x, y, n) => {
    let x_num = x % n != 0 ? (parseInt(x / n) * n) + 1 : parseInt(x / n) * n;
    let y_num = y % n != 0 ? (parseInt(y / n) * n) + 1 : parseInt(y / n) * n;
    return x_num + y_num
  }

  console.log(getTagNum(5,3,2))
}
// GAMES 3 END