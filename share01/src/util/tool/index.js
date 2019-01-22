import axios from 'axios';
import jsonpAdapter from 'axios-jsonp';

// 写一些公共的处理函数

export function getCookie(name) {
  name = name.replace(/([\.\[\]\$])/g, '\\\$1');
  var rep = new RegExp(name + '=([^;]*)?;', 'i');
  var co = document.cookie + ';';
  var res = co.match(rep);
  if (res) {
    return unescape(res[1]) || "";
  }
  else {
    return "";
  }
}

export function setCookie(key, value, domain) {
  let exp = new Date();
  exp.setTime(exp.getTime() + 60 * 24 * 60 * 60 * 1000);//60天
  let cookieValue = key + "=" + escape(value) + ";expires=" + exp.toGMTString();
  if(domain){
    cookieValue += ";domain=" + domain + ";path='/'"
  }
  document.cookie = cookieValue;
}

export function setExpCookie(name, value, expire, path, domain, secure) {
  let cstr = [];
  cstr.push(name + '=' + escape(value));
  if (expire) {
    let dd = new Date();
    let expires = dd.getTime() + expire * 3600000;
    dd.setTime(expires);
    cstr.push('expires=' + dd.toGMTString());
  }
  if (path) {
    cstr.push('path=' + path);
  }
  if (domain) {
    cstr.push('domain=' + domain);
  }
  if (secure) {
    cstr.push(secure);
  }
  document.cookie = cstr.join(';');
}

//判断是否为空
export function isEmpty(str) {
  if (type(str) === 'object') {
    if (str !== null && Object.keys(str).length > 0) {
      return false;
    }
  } else if (type(str) !== 'undefined' && type(str) !== 'error' && type(str) !== 'null') {
    str = '' + str;
    if (str.length > 0) {
      return false;
    }
  }
  return true;
}

export function isNotEmpty(str) {
  return !isEmpty(str);
}

//输入框是否为空(包含全为空格)
export function isNull(str) {
  if (str === "" || str === undefined || str === null) return true;
  let resultStr = "^[ ]+$";
  let re = new RegExp(resultStr);
  return re.test(str);
}

export function type(o) {
  let TYPES = {
    'undefined': 'undefined',
    'number': 'number',
    'boolean': 'boolean',
    'string': 'string',
    '[object String]': 'string',
    '[object Number]': 'number',
    '[object Function]': 'function',
    '[object RegExp]': 'regexp',
    '[object Array]': 'array',
    '[object Date]': 'date',
    '[object Error]': 'error'
  };
  let TOSTRING = Object.prototype.toString;

  return TYPES[typeof o] || TYPES[TOSTRING.call(o)] || (o ? 'object' : 'null');
}

/**
 *  getValue(list,'a.b');
 * @param obj 需要取值的对象
 * @param exp  取值表达式
 */
export function getValue(obj, exp) {
  if (exports.isEmpty(obj)) {
    return undefined;
  }
  if (exports.isEmpty(exp)) {
    return undefined;
  }
  if (exports.type(exp) !== 'string') {
    return undefined;
  }
  let exps = exp.split('.');
  let passedObj = {};
  let len = exps.length;
  let passed = exps.every(function (t, num) {
    if (num === 0) {
      passedObj = obj[t];
      if (exports.isEmpty(passedObj)) {
        return false;
      }
    } else if (num < len) {
      passedObj = passedObj[t];
      if (exports.isEmpty(passedObj)) {
        return false;
      }
    }
    return true;
  });
  if (passed) {
    let returnObj = {};
    exps.forEach(function (t, num) {
      if (num === 0) {
        returnObj = obj[t];
      } else if (num < len) {
        returnObj = returnObj[t];
      }
    });
    return returnObj;
  } else {
    return undefined;
  }
}

//屏蔽滚动条
export function forbidScroll(isForbid) {
  let bodyElement = document.getElementsByTagName("body");
  if (isForbid) {
    let currentScroll = ModalHelper('modal-open').afterOpen();
    window.newIndexScroll = currentScroll;
    // htmlElement[0].classList.add('hideScroll');
    // bodyElement[0].style.overflowY = '';
    // bodyElement[0].classList.add('hideScroll');
  } else {
    let currentScroll = window.newIndexScroll?window.newIndexScroll:0;
    ModalHelper('modal-open').beforeClose(currentScroll);
    // htmlElement[0].classList.remove('hideScroll');
    // bodyElement[0].style.overflowY = 'auto';
    // bodyElement[0].classList.remove('hideScroll');
  }
}

//判断滚动方向
export function scrollFunc(scrollAction) {
  let scrollDirection;
  if (typeof scrollAction.x === 'undefined') {
    scrollAction.x = window.pageXOffset;
    scrollAction.y = window.pageYOffset;
  }
  let diffX = scrollAction.x - window.pageXOffset;
  let diffY = scrollAction.y - window.pageYOffset;
  if (diffX < 0) {
    // Scroll right
    scrollDirection = 'right';
  } else if (diffX > 0) {
    // Scroll left
    scrollDirection = 'left';
  } else if (diffY < 0) {
    // Scroll down
    scrollDirection = 'down';
  } else if (diffY > 0) {
    // Scroll up
    scrollDirection = 'up';
  } else {
    // First scroll event
  }
  scrollAction.x = window.pageXOffset;
  scrollAction.y = window.pageYOffset;
  return scrollDirection
};

//公共参数混合
export function mixinParam(param) {
  let commonParam = {
    currencyCode: 1,
    locale: 1,
    source: 4,
    userAgent: navigator.userAgent
  };
  return Object.assign(param, commonParam);
}

export function errorHandler(err) {
  console.log('全局异常处理组件异常===', err);
  // router.replace({path: '/'});
}

//千位符处理
//US $1,527.48   € 1,527.48   1 287,53 руб.   C$ 1,527.48    £1,527.48  CHF 1,527.48   1 287,53 zł   AU $1,527.48  R$ 1.287,53   4,366.66MXN$
export function formatNum(number, currency) {
  if(isEmpty(number)) return number;
  function toDecimal2(x) {
    var f = parseFloat(x);
    if (isNaN(f)) {
      return false;
    }
    var f = parseFloat(x*10000000000)/10000000000;
    f = f.toFixed(2);
    var s = f.toString();
    var rs = s.indexOf('.');
    if (rs < 0) {
      rs = s.length;
      s += '.';
    }
    while (s.length <= rs + 2) {
      s += '0';
    }
    return s;
  };
  var sym = ",";
  if(currency == 'RUB' || currency == 'PLN') sym = " ";
  if(currency == 'BRL') sym=".";
  var res = toDecimal2(number);

  //小数点修改
  if(isNotEmpty(res) ) {
    if(currency == 'RUB' || currency == 'PLN' || currency == 'BRL'){
      res = res.replace(".", ",");
      return res.replace(/(\d)(?=(\d{3})+\,)/g, "$1" + sym);
    }else{
      return res.replace(/(\d)(?=(\d{3})+\.)/g, "$1" + sym);
    }
  }
}

export function getAllCurrency() {
  return "USD,EUR,RUB,CAD,GBP,CHF,PLN,AUD,MXN,BRL";
}

var symbolMap = {"USD" : "US ${amount}", "EUR" : "€ {amount}", "RUB" : "{amount} руб.", "CAD" : "C$ {amount}", "GBP" : "£{amount}", "CHF" : "CHF {amount}", "PLN" : "{amount} zł", "AUD" : "AU ${amount}", "MXN" : "{amount} MXN$", "BRL" : "R$ {amount}"}
export function getCurrencySymbolValue(currency, amount) {
  for(var key in symbolMap) {
    if(key != currency) continue;

    var result = formatNum(amount, currency);
    return symbolMap[key].replace('{amount}', result);
  }
}

export function getPriceSymbolValue(amount) {
  let currency = getDefaultCurrency();
  return getCurrencySymbolValue(currency, amount);
}


export function getLang() {
  //根据域名判断
  let host = window.location.host;
  if("m.jd.ru" == host) return "ru";
  if("m.joybuy.com" == host) return "en";
  if("m.joybuy.es" == host) return "es";
  return "en";
}
//用于价格刷新
export function getSite() {
  let lang = getLang();
  if(lang == "en") {
    return 1;
  } else if (lang == "ru") {
    return 2;
  } else if (lang == "es"){
    return 4;
  } else {
    return 1;
  }
}

export function getDefaultCurrency() {
  //从cookie里面取
  let cur = getCookie("eptCur");

  if(cur) {
    if(cur) {
      cur = JSON.parse(unescape(cur));
      if(typeof cur  == 'string') {
        cur = JSON.parse(unescape(cur));
      }
      return cur.currency;
    }
  }
  //默认美元
  let currency = 'USD';
  let domain = 'joybuy.com';
  if (/\.ru$/.test(window.location.host)) {
    domain = 'jd.ru';
    currency = "RUB";
  }
  if (/\.es$/.test(window.location.host)) {
    domain = 'joybuy.es';
    currency = "EUR";
  }
  // setCookie('eptCur', JSON.stringify({"currency":""+currency}), domain);


  return currency;
}

//历史搜索词新增key
export function addRecentSearchKey(key) {
  if (!isSupportLocalStorage()) {
    return;
  }

  if (!key || key.trim() == '') {
    return;
  }

  let searchHistory = JSON.parse(localStorage.getItem('searchHistory'));
  if (!searchHistory) {
    searchHistory = {};
    searchHistory.keys = [];
  }

  key = key.trim();
  for (var i = 0; i < searchHistory.keys.length; i++) {
    if (searchHistory.keys[i] == key) {
      return;
    }
  }

  searchHistory.keys.push(key);
  localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
}

//历史搜索词删除key
export function delRecentSearchKey(delKey) {
  if (!isSupportLocalStorage()) {
    return;
  }
  if (!delKey || delKey.trim() == '') {
    return;
  }

  let searchHistory = JSON.parse(localStorage.getItem('searchHistory'));
  if (!searchHistory) {
    return;
  }

  delKey = delKey.trim();
  let tempSearchKeys = {};
  tempSearchKeys.keys = [];
  for (var i = 0; i < searchHistory.keys.length; i++) {
    if (searchHistory.keys[i] != delKey) {
      tempSearchKeys.keys.push(searchHistory.keys[i])
    }
  }

  localStorage.setItem('searchHistory', JSON.stringify(tempSearchKeys));
}

export function isSupportLocalStorage() {
  try {
    const win = typeof window !== 'undefined' ? window : global;
    return ('localStorage' in win && win['localStorage'])
  } catch (err) {
    return false
  }

}

/**
 * 数组分组
 * @param data
 * @param cols
 * @returns {Array}
 */
export function groupArray(data, cols) {
  const list = [];
  let current = [];

  // for (t of data) {
  data.forEach(t => {
    current.push(t);
    if (current.length === cols) {
      list.push(current);
      current = [];
    }
  });
  // }    // for (t of data)

  if (current.length) {
    list.push(current);
  }
  return list;
}

export function ModalHelper(bodyCls) {
  return {
    afterOpen: function() {
      let scrollTop = document.scrollingElement.scrollTop;
      document.body.classList.add(bodyCls);
      document.body.style.top = -scrollTop + 'px';
      return scrollTop
    },
    beforeClose: function(scrollTop) {
      document.body.classList.remove(bodyCls);
      // scrollTop lost after set position:fixed, restore it back.
      document.scrollingElement.scrollTop = scrollTop;
    }
  };
}

export function GetQueryString(name) {
  var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
  var r = window.location.search.substr(1).match(reg);
  if(r!=null) {
    return  unescape(r[2]);
  }
  return null;
}

export function getTechPageId() {
  let pageId = GetQueryString("p") || 504;
  if (getLang() == 'ru') {
    pageId=(pageId||534);
  } else if (getLang() == 'es') {
    pageId=(pageId||571);
  }
  return pageId;
}

export function getRankPageId() {
  let pageId = GetQueryString("p") || 1939;
  if (getLang() == 'ru') {
    pageId=(pageId||1987 );
  } else if (getLang() == 'es') {
    pageId=(pageId||1988 );
  }
  return pageId;
}

//取得跳转app参数
export function getAppParam() {
  //若app内嵌h5科技频道页，且app版本>4.2.2则跳转到app native科技频道页
  let appParam = {};
  if (navigator.userAgent.indexOf('eptApp.mobile') > -1 && typeof(isTechGotoApp)!='undefined' && isTechGotoApp==1) {
    let techId = getTechPageId();
    appParam.appPageId = techId;
    return appParam;
  }

  return null;
}

//西语站初始展示EUR货币，俄文站展示RUB货币，其他默认展示USD
export function getDefaultSymbolBySite() {
  let lang = getLang();
  if (lang == 'ru') return 'RUB';
  if (lang == 'es') return 'EUR';
  return 'USD';
}

//初始展示默认货币，价格刷新后展示cookie对应货币符号价格
export function getSkuPrice(price, priceFlag) {
  if (!priceFlag) {//若为魔法石初始价格，则货币符号默认为USD
    return getCurrencySymbolValue(getDefaultSymbolBySite(), price);
  } else {
    return getPriceSymbolValue(price);
  }
}
