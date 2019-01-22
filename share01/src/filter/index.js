import Vue from 'vue';

import {getDefaultCurrency, formatNum,isNotEmpty} from "../util/tool/index";
/**
 * 对图片按宽高进行剪切
 */
Vue.filter('getLazyImgSrc', function (_src, _width, _height) {
  if (!_src) return '';
  if (!_width || !_height) {
    return _src;
  }

  try {
    let dpr = window.devicePixelRatio ? (Math.ceil(window.devicePixelRatio) || 1) : 1;
    _width = Math.ceil(_width * dpr);
    _height = Math.ceil(_height * dpr);
    if (!/\/(s\d+x\d+_)?jfs\//.test(_src)) {
      return _src;
    }
    _src = _src.replace(/(!q\d+\.jpg)?$/, '!q80.jpg');
    _src = _src.replace(/\/(s\d+x\d+_)?jfs\//, '/s' + _width + 'x' + _height + '_jfs/');
    return _src;
  } catch (e) {
  }
  return _src;

});

Vue.filter('getDefaultCurrencyPrice', function(price) {
  let currency = 'USD';
  if(price && currency) {
    var symbolMap = {"USD" : "US ${amount}", "EUR" : "€ {amount}", "RUB" : "{amount} руб.", "CAD" : "C$ {amount}", "GBP" : "£{amount}", "CHF" : "CHF {amount}", "PLN" : "{amount} zł", "AUD" : "AU ${amount}", "MXN" : "{amount} MXN$", "BRL" : "R$ {amount}"};
    for(var key in symbolMap) {
      if(key != currency) continue;

      var result = formatNum(price, currency);
      return symbolMap[key].replace('{amount}', result);
    }
  }
})

Vue.filter('getCurrencyPrice', function(price) {
  let currency = getDefaultCurrency();
  if(price && currency) {
    var symbolMap = {"USD" : "US ${amount}", "EUR" : "€ {amount}", "RUB" : "{amount} руб.", "CAD" : "C$ {amount}", "GBP" : "£{amount}", "CHF" : "CHF {amount}", "PLN" : "{amount} zł", "AUD" : "AU ${amount}", "MXN" : "{amount} MXN$", "BRL" : "R$ {amount}"};
    for(var key in symbolMap) {
      if(key != currency) continue;

      var result = formatNum(price, currency);
      return symbolMap[key].replace('{amount}', result);
    }
  }
})

Vue.filter('getLabelIconImg', function(arr) {
   let imgSrc="";
  arr.forEach(function (value,index) {
       if(String(value.iconId)==="16"){
          imgSrc=value.iconUrl;
          return imgSrc;
       }
       imgSrc=value.iconUrl;
  });
  return imgSrc;
});

