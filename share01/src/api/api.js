import axios from 'axios';

import jsonpAdapter from 'axios-jsonp';

import {getTechPageId,getRankPageId} from '../util/tool/index';

const apiHost =
  (process.env.NODE_ENV === 'development' ? ('//mstone-api.jd.com/ept/page?id=') : (location.protocol + '//mstone-api.jd.com/ept/page?id='));
const httpHost = "http://localhost:8080";
const promotionHost = '//ipromo.jd.com';
const mainHost = '//' + location.host;
const techId = getTechPageId();
const mjoybuy='//m.joybuy.com';

const rankId=getRankPageId();
/**
 * api方法声明。
 * type：Get, Post
 * url: 请求的url
 */
const apiUrl = {
  // 科技频道首页
  getHomeData:{
    type: 'get',
    url: apiHost + techId
  },
  // 打标接口
  getLabelInfo:{
    type: 'get',
    url: mjoybuy + '/product/queryIconByWareIds',
  },
  getPriceInfos: {
    type: 'get',
    url: promotionHost + '/api/promoinfo/getPriceInfos.html',
    urlTest: '/src/util/mock/homeIndex/recommendSkus.json'
  },
  getPromoStateAndPrices: {
    type: 'get',
    url: promotionHost + '/api/promoinfo/getPromoStateAndPrices.html',
    urlTest: '/src/util/mock/homeIndex/getPromoStateAndPrices.json'
  },
  // 星级评价 和评论
  getCommentAndScoreInfo: {
    type: 'get',
    url: mjoybuy + '/comment/getCommentArgAndNums.html'
  },
  // 秒杀标签 、优惠券标签、赠品标签
  getThreeLabelInfo:{
    type: 'get',
    url: mjoybuy+'/search/queryAddition', //mjoybuy + '/search/queryAddition',
  },
  getLoginInfo: {
    type: 'get',
    url: mainHost + '/common/islogin'
  },
  // 排行榜首页数据
  getRankHomeData:{
    type: 'get',
    url: apiHost + rankId,
    urlTest: '/src/mock/query.json'
  },
  getCountryById: {
    type: 'get',
    url: '//m.joybuy.com/common/getCountryLangById.json',
  },
  // 获取系统时间参数
  queryServerTimes: {
    type: 'get',
    url: mainHost + '/superDeal/sysTimeForIndex.html'
  },
  getRuSuggestList: {
    type: 'get',
    url: '//suggest-russia.jd.com/?terminal=russia'
  },
  syncSps: {
    type: 'get',
    url: mainHost.replace('m.', 'www.') + '/sync/sps.html',
    urlTest: '//www.joybuy.com/sync/sps.html'
  }
};
let apis = {};
let CancelToken = axios.CancelToken;
apis.isCancel = axios.isCancel; // 判断是否是取消
Object.keys(apiUrl).forEach((item) => {
  /**
   * 创建api请求function，返回promise对象
   */
  apis[item] = function apiFunc(response) {
    let obj = apiUrl[item];
    let promise;
    //let dataTmp = data;
    promise = axios({
      adapter: process.env.mock === 'true' ? null : jsonpAdapter,
      method: obj.type,
      url: process.env.mock === 'true' ? obj.urlTest : obj.url,
      timeout: 20000,
      params:response,
      cancelToken: new CancelToken(function executor(c) {
        apis[item + 'Cancel'] = c;
      })
    }).then(response => {
      return response.data;
    }).catch((e)=>{
      console.log(e)
    });
    return promise;
  }
});

export default apis;
