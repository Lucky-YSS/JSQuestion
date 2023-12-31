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
    // console.log(false)
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
  // console.log(index)
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

  // console.log(getTagNum(5,3,2))
}
// GAMES 3 END

// GAMES 4 START
{
  /* 
  桌子上有n堆硬币，每堆的数量保存在数组coins中。我们每次可以选择任意一堆，拿走其中的一枚或者两枚，求拿完所有硬币的最少数
  */
 const getCounts = (coins) => {
  let num = 0;
  coins.forEach(i => i % 2 > 0 ? (num += parseInt(i / 2) + 1) : (num += parseInt(i / 2)))
  return num;
 }
//  let res = getCounts([2,3,10])
//  console.log('NO.4:',res)
}
// GAMES 4 END
// GAMES 5 START
{
  /* 
  给你一个下标从0开始的字符串word，字符串只包含小写英文字母，你需要选择一个下标并删除下标处的字符，是的word中剩余每个字母出现频率想同
  如果删除一个字母后，word中剩余所有字母的出现频率都相同，那么返回true，否则返回false。
  注意 字母x的频率是这个字母出现在字符串的次数；你必须恰好删除一个字母，不能一个字母都不删除。
   */
  const formatNums = (nums) => {
    nums = nums.sort((a, b) => a - b)
    let arr_f = [], arr_ = [];
    nums.forEach(i => {
      if(arr_f.length == 0 || arr_f[0] == i) {
        arr_f.push(i);
      } else {
        arr_.push(arr_f)
        arr_f = [i];
      }
    })
    arr_.push(arr_f)
    if (arr_.length > 2 || arr_.length == 1) {
      return false;
    } else {
      let max, min, min_index;
      if((arr_[0].length == 1 && arr_[0] == 1) || (arr_[1].length == 1 && arr_[1] == 1)) return true;
      arr_[0][0] > arr_[1][0] ? (max = arr_[0][0],min = arr_[1][0], min_index = 1) : (max = arr_[1][0],min = arr_[0][0], min_index = 0)
      if(max - min == 1) {
        let res_0 = arr_[0].length == 1 && min_index == 1;
        let res_1 = arr_[1].length == 1 && min_index == 0;
        if(res_0 || res_1) {
          return true
        } else {
          return false
        }
      } else {
        return false;
      }
    }
  }
  const checkCharts = (word) => {
    let obj = {};
    for(let i in word) {
      obj.hasOwnProperty(word[i]) ? (obj[word[i]] += 1) : (obj[word[i]] = 1)
    }
    return formatNums(Object.values(obj));
  }
  // console.log('NO.5:', checkCharts('aacbbee'))
}
// GAMES 5 END
// GAMES 6 START
/*
  给你两个下标从 0开始的整数数组 nums 和 divisors 。
  divisors[i] 的 可整除性得分 等于满足 nums[j] 能被 divisors[i] 整除的下标 j 的数量
  返回 可整除性得分 最大的整数 divisors[i] 。如果有多个整数具有最大得分，则返回数值最小的一个
  示例 1:
    输入: nums = [4,7,9,3,9]， divisors = [5,2,3]
    输出: 3
    解释: divisors 中每个元素的可整除性得分为:divisors[0] 的可整除性得分为 0 ，因为 nums 中没有任何数字能被 5 整除divisors[1] 的可整除性得分为 1 ，因为 nums [0] 能被 2 整除。divisors[2] 的可整除性得分为 3 ，因为 nums[2]、nums[3] 和 nums[4] 都能被 3 整除因此，返回 divisors [2] ，它的可整除性得分最大。
  示例 2:
    输入: nums = [20,14,21,10]， divisors = [5,7,5]
    输出: 5
    解释: divisors 中每个元素的可整除性得分为:divisors[0] 的可整除性得分为 2 ，因为 nums[0] 和 nums[3] 都能被 5 整除divisors[1] 的可整除性得分为 2 ，因为 nums[1] 和 nums[2] 都能被 7 整除divisors[2] 的可整除性得分为 2 ，因为 nums[0] 和 nums[3] 都能被5整除由于 divisors[0]、divisors[1] 和 divisors 2] 的可整除性得分都是最大的，因此，我们返回数值最小的一个，即divisors[2] 。
  示例 3:
    输入: nums = [12]， divisors = [10,16]
    输出: 10
    解释: divisors 中每个元素的可整除性得分为:divisors[0] 的可整除性得分为 0 ，因为 nums 中没有任何数字能被 10 整除.divisors [1] 的可整除性得分为 0 ，因为 nums 中没有任何数字能被 16 整除由于 divisors[0] 和 divisors[1] 的可整除性得分都是最大的，因此，我们返回数值最小的一个，即 divisors[0] 。
 */
{
  const getMinNum = (nums, divisors) => {
    let min_d,max_score = 0;
    divisors.forEach(d => {
      let score = 0
      nums.forEach(n => {
        n % d == 0 ? score++ : ''
      })
      console.log(score)
      max_score < score ? (min_d = d) : (max_score == score ? (isNaN(min_d) || min_d > d ? min_d = d : '') : '')
    })
    return min_d;
  }
  console.log('No.6', getMinNum([12], [10,16]))
}
// GAMES 6 END