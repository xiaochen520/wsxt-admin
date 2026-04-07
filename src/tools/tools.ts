import { useRouter } from "vue-router";

/**判断字符串是否为空 空=true  */


export function isnull(val: any) {
    let str = typeof val == "string";
    let num = typeof val == "number";
    let und = typeof val == "undefined";
    let obj = typeof val == 'object';
    let data = str ? val.replace(/(^\s*)|(\s*$)/g, '') : val;//去除空格;
    if (str) {
        if (data == '' || data == 'null') {
            return true;
        } else {
            return false;
        }
    } else if (und) {
        return true;
    } else if (num) {
        if (val > 0) {
            return false;
        } else {
            return true;
        }
    } else if (obj) {
        if (data instanceof Array) {
            if (data.length > 0) {
                return false;
            } else {
                return true;
            }
        } else {
            if (data == null) {
                return true;
            } else {
                return false;
            }
        }
    } else {
        return true;
    }
}
//判断是否json字符串格式
export function isJSON(str) {
    if (typeof str == "string") {
        try {
            var obj = JSON.parse(str);


            if (typeof obj == "object" && obj) {
                return true;
            } else {
                return false;
            }
        } catch (e) {

            return false;
        }
    }
}
/**
 * 封装函数，传入参数第一个：图片的地址，第二个：转编码后的base64格式，第三个：可以不传
 * 图片转database64格式
 * */
export function convertImgToBase64(url, callback, outputFormat) {
    var canvas = document.createElement('canvas'), //创建画布
        ctx = canvas.getContext('2d'),
        img = new Image();
    img.crossOrigin = 'Anonymous';
    img.onload = function () {
        canvas.height = img.height;
        canvas.width = img.width;
        ctx.drawImage(img, 0, 0);
        var dataURL = canvas.toDataURL(outputFormat || 'image / png');
        console.log(dataURL, "dataURL")
        callback.call(this, dataURL);
        canvas = null;
    };
    img.src = url;

}

/**
 * fmt是返回时间格式 Y=年 m=月 d=日 H=时 M=分 S=秒
 * 假如要2022-10-02 19:50:12 = "YYYY-mm-dd HH:MM:SS"
 * 假如要2022/10/02 19/50 = "YYYY/mm/dd HH/MM"
 * time是时间格式或者精确到秒的时间戳
 */
export function dateFormat(fmt, time) {//转换时间格式
    let date = new Date(time);
    let ret;
    let opt = {
        "Y+": date.getFullYear().toString(),        // 年
        "m+": (date.getMonth() + 1).toString(),     // 月
        "d+": date.getDate().toString(),            // 日
        "H+": date.getHours().toString(),           // 时
        "M+": date.getMinutes().toString(),         // 分
        "S+": date.getSeconds().toString()          // 秒
        // 有其他格式化字符需求可以继续添加，必须转化成字符串
    };
    for (let k in opt) {
        ret = new RegExp("(" + k + ")").exec(fmt);
        if (ret) {
            fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
        };
    };
    return fmt;
}

// 格式化日期为 YYYYMMDDHHMMSS
export function formatDateTime(date) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  const seconds = String(date.getSeconds()).padStart(2, '0')
  return `${year}${month}${day}${hours}${minutes}${seconds}` 
}


/**
 * 随机字符串 
 * randomFlag是否生成随机长度,
 * 是的话会生成min和max中间随机的长度，
 * 否的话只需要传min值 
 * min最小的长度  
 * max最大长度
 */
export function randomWord(randomFlag, min, max) {
    let str = "",
        range = min,
        arr = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z",];

    // 随机产生
    if (randomFlag) {
        range = Math.round(Math.random() * (max - min)) + min;
    }
    for (var i = 0; i < range; i++) {
        let pos = Math.round(Math.random() * (arr.length - 1));
        str += arr[pos];
    }
    return str;
}

/**
 * 数字转成汉字
 * @params num === 要转换的数字
 * @return 汉字
 * */
export function toChinesNum(num) {
    let changeNum = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九']
    let unit = ['', '十', '百', '千', '万']
    num = parseInt(num)
    let getWan = (temp) => {
        let strArr = temp.toString().split('').reverse()
        let newNum = ''
        let newArr = []
        strArr.forEach((item, index) => {
            newArr.unshift(item === '0' ? changeNum[item] : changeNum[item] + unit[index])
        })
        let numArr = []
        newArr.forEach((m, n) => {
            if (m !== '零') numArr.push(n)
        })
        if (newArr.length > 1) {
            newArr.forEach((m, n) => {
                if (newArr[newArr.length - 1] === '零') {
                    if (n <= numArr[numArr.length - 1]) {
                        newNum += m
                    }
                } else {
                    newNum += m
                }
            })
        } else {
            newNum = newArr[0]
        }

        return newNum
    }
    let overWan = Math.floor(num / 10000)
    let noWan:any = num % 10000
    if (noWan.toString().length < 4) {
        noWan = '0' + noWan
    }
    return overWan ? getWan(overWan) + '万' + getWan(noWan) : getWan(num)
}
//导出报表
export function exportTableData(result, keyName) {
    try {
        let a = document.createElement("a");
        let blob = new Blob([result], { type: "application/vnd.ms-excel" });
        let url = window.URL.createObjectURL(blob);
        a.setAttribute("href", url)
        a.download = keyName;
        document.body.appendChild(a);
        a.click()
        document.body.removeChild(a);
    } catch (error) {
        console.log('error', error);

    }

}
// 匹配手机号
// var res = /^[1][3,4,5,6.7,8,9][0-9]{9}$/
// let num = 18045216903
// console.log(res.test(num))




// 匹配用户名6-8位（纯数字）
// var res = /^[^0]\d{5,7}$/
// var user=12345678
//

// 匹配密码6-8位（数字加字符）
// var res=/^\w{5,7}$/
// var pwd='12345d_'
//

// 匹配QQ号码
// var res = /^[^0]\d{4,9}$/  //  /^[1-9][0-9]{4,9}$/
// var q = '0848514604'
//

// 取掉前后空格
// var res =/(^\s*)|(\s*$)/g
// let str = '  dsf sdfs fsdf 第三方  '
// console.log(str.replace(res,""))

// 取掉所有空格
// var res =/\s/g
// let str = '  dsf sdfs fsdf 第三方  '
// console.log(str.replace(res,""))

// 匹配邮箱
// var res = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
// var email='2384591034@gamil.com'
//  

//时间戳转成年月日时分秒
export function timestampToTime(timestamp){
	// 创建一个Date对象，参数为时间戳乘以1000（转换为毫秒，是毫秒就不用再乘1000）
	let date=new Date(timestamp)
	// 或let date=new Date(timestamp)
	// 使用Date对象的各种方法获取年、月、日、时、分、秒等信息
	let year=date.getFullYear()
	let month=date.getMonth()+1//月份是从0开始计数的，所以要加1
	let day=date.getDate()
	let hour=date.getHours()<10?"0"+date.getHours():date.getHours()
	let minute=date.getHours()<10?"0"+date.getMinutes():date.getMinutes()
	let second=date.getSeconds()<10?"0"+date.getSeconds():date.getSeconds()
	// 拼成需要的时间格式
	let time=year+"-"+month+"-"+day+" "+hour+"-"+minute+"-"+second
	return time
}
//中国时间转成年月日时分秒
export function getTime(timestamp:string){
    console.log(`output->timestamp`,timestamp)
    let arrTime=timestamp.split('-');
    let time="";
    arrTime.forEach((value,index)=>{
        if(index==0){
            time=timestampToTime(value);
        }else{
            time=`${time}~${timestampToTime(value)}`
        }
    })
	return time
}
export const returnFloat = (val: any) => {
    let value: any = Math.round(parseFloat(val) * 100) / 100;
    let xsd: any = value.toString().split(".");
    if (xsd.length == 1) {
        value = value.toString() + ".00";
        return value;
    }
    if (xsd.length > 1) {
        if (xsd[1].length < 2) {
            value = value.toString() + "0";
        }
        return value;
    }
}
//缓存列表查询条件方法
export const setOldQuery = (arr,query) => {
    const routers=useRouter();
    routers.beforeEach((to:any,from,next) =>{
        console.log(to.name,"to");
        if(arr.includes(to.name)){
            window.sessionStorage.setItem("toName",to.name);
            window.sessionStorage.setItem("querydata",JSON.stringify(query));
        }
        next();
    })
}
//获取缓存列表查询条件方法
export const getOldQuery = (arr) => {
    if(arr.includes(window.sessionStorage.getItem('toName'))){
        let json=JSON.parse(window.sessionStorage.getItem('querydata'));
        window.sessionStorage.removeItem('toName');
        window.sessionStorage.removeItem('querydata');
        return json;
    }
}