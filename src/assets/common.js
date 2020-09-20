
export const productInfoJudge = (currentUser) => {
    if (currentUser.currentOrg && currentUser.currentOrg.productInstances && currentUser.currentOrg.productInstances.length > 0) {
        let products = currentUser.currentOrg.productInstances;
        for (let i = 0; i < products.length; i++) {

            if (products[i].serviceEndeDate) {
                var EndDate = products[i].serviceEndeDate;
                if (products[i].serviceEndeDate.toString().indexOf('-') != -1) {
                    var EndDate = Date.parse(new Date(products[i].serviceEndeDate));
                }
            }

            if (products[i].productVersion && products[i].productVersion.product && products[i].productVersion.product.productCategory) {

                if (products[i].productVersion.product.productCategory.id === 1) {

                    if (EndDate && EndDate - Date.parse(new Date()) > 0) {
                        return { name: 'cloud', effective: true, sn: products[i].sn, productName: products[i].name, type: 'cloud' }
                    } else {
                        return { name: 'cloud', effective: false, sn: products[i].sn, productName: products[i].name, type: 'cloud' }
                    }
                } else if (products[i].productVersion.product.productCategory.id === 2) {
                    if (EndDate && EndDate - Date.parse(new Date()) > 0) {
                        return { name: 'k3cloud', effective: true, sn: products[i].sn, productName: products[i].name, type: 'k3cloud' }
                    } else {
                        return { name: 'k3cloud', effective: false, sn: products[i].sn, productName: products[i].name, type: 'k3cloud' }
                    }
                }

            }
        }

    }
}

export const timespanToTimeBefore = (timespan) => {
    var dateTime = new Date(timespan);

    var year = dateTime.getFullYear();
    var month = dateTime.getMonth() + 1;
    var day = dateTime.getDate();
    var hour = dateTime.getHours();
    var minute = dateTime.getMinutes();
    var second = dateTime.getSeconds();
    var now = new Date();
    var now_new = Date.parse(now);
    if (hour < 10) {
        hour = '0' + hour;
    }
    if (minute < 10) {
        minute = '0' + minute;
    }
    if (second < 10) {
        second = '0' + second;
    }

    var milliseconds = 0;
    var timeSpanStr;

    milliseconds = now_new - timespan;
    if (milliseconds <= 1000 * 60 * 1) {
        timeSpanStr = '刚刚';
    } else if (1000 * 60 * 1 < milliseconds && milliseconds <= 1000 * 60 * 60) {
        timeSpanStr = Math.round((milliseconds / (1000 * 60))) + '分钟前';
    } else if (1000 * 60 * 60 * 1 < milliseconds && milliseconds <= 1000 * 60 * 60 * 24) {
        timeSpanStr = Math.round(milliseconds / (1000 * 60 * 60)) + '小时前';
    } else if (1000 * 60 * 60 * 24 < milliseconds && milliseconds <= 1000 * 60 * 60 * 24 * 15) {
        timeSpanStr = Math.round(milliseconds / (1000 * 60 * 60 * 24)) + '天前';
    } else if (milliseconds > 1000 * 60 * 60 * 24 * 15 && year == now.getFullYear()) {
        timeSpanStr = month + '-' + day + ' ' + hour + ':' + minute;
    } else {
        timeSpanStr = year + '-' + month + '-' + day + ' ' + hour + ':' + minute;
    }
    return timeSpanStr;
}

export const toLocaleTimeStrng = (timespan) => {
    let date = new Date(timespan);
    let retDate = date.getFullYear() + '年' + (date.getMonth() + 1) + '月' + (date.getDate()) + '日';
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();
    if (hours < 10) {
        hours = '0' + hours;
    }
    if (minutes < 10) {
        minutes = '0' + minutes;
    }
    if (seconds < 10) {
        seconds = '0' + seconds;
    }
    retDate += ' ' + hours + ':' + minutes + ':' + seconds;
    return retDate;
}

export const dateSimpleVersion = function(date , symbal = '/') {
    if(typeof(date) == 'string') date = date.replace(/-/g, '/').replace('T',' ').substring(0,date.indexOf('.') == -1? date.length:date.indexOf('.'))
    date = new Date(date);
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var hour = date.getHours();
    var min = date.getMinutes();
    
    month = (month >= 1 && month <= 9) ? `0${month}`:month;
    day = (day >= 0 && day <= 9) ? `0${day}`:day;
    hour = (hour >= 0 && hour <= 9) ? `0${hour}`:hour;
    min = (min >= 0 && min <= 9) ? `0${min}`:min;

    return `${date.getFullYear()}${symbal}${month}${symbal}${day}` 
}

export const isScrolledToBottom = (element = document.documentElement) => {
  let scrollTop = element.scrollTop ||
    window.pageYOffset ||
    document.body.scrollTop;
  return (
    Math.ceil(element.clientHeight + scrollTop) >= element.scrollHeight
  );
}

export const hasScrollbar = () => {
    return document.body.scrollHeight > (window.innerHeight || document.documentElement.clientHeight);
}

export const getScrollbarWidth = () => {
    var scrollDiv = document.createElement("div");
    scrollDiv.style.cssText = 'width: 99px; height: 99px; overflow: scroll; position: absolute; top: -9999px;';
    document.body.appendChild(scrollDiv);
    var width = scrollDiv.offsetWidth - scrollDiv.clientWidth;
    document.body.removeChild(scrollDiv);
    return width;
}

export const fixModalShake = () => {
    if (hasScrollbar) {
        document.body.classList.add('modal-shake-fix-margin')
        document.getElementById('header-inner').classList.add('modal-homeheader-shift')
    }
}

export const removeFixModalShake = () => {
    document.body.classList.remove('modal-shake-fix-margin')
    document.getElementById('header-inner').classList.remove('modal-homeheader-shift')
}


export const getCookie = (name) => {
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    return (arr = document.cookie.match(reg)) ? unescape(arr[2]) : null;
}

export const hideMobile4 = (mobile) => {
    return String(mobile).replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
}

export const buildTagsInfo = (tags) => {
    let res = { tagIds: "", tagsDesc: "" }
    if (tags && tags.length) {
        for (let i = 0; i < tags.length; i++) {
            res.tagIds += tags[i].id;
            res.tagsDesc += tags[i].name;
            if (i < tags.length - 1) {
                res.tagIds += '&'
                res.tagsDesc += '&'
            }
        }
    }
    return res;
}

//草稿存储机制处理
export const draftHandler = {
    getDraft: function(title, resource, curDraftId, type) {
        if (type == 'articles') {
            if (!title || !resource.content) return
            let temDraft = {
                mainSourceType: "articles",
                sourceType: "articles",
                title: title,
                content: JSON.stringify(resource)
            }
            if (resource.id) {
                temDraft.sourceId = resource.id
                temDraft.mainSourceId = resource.id
            }
            if (curDraftId) {
                temDraft.id = curDraftId
            }
            return temDraft
        }
        if (type == 'answers' && resource && title) {
            let temDraft = {
                mainSourceType: "questions",
                mainSourceId: resource.mainSourceId,
                sourceType: "answers",
                title: title,
                content: JSON.stringify(resource)
            }
            if (resource.sourceId) {
                temDraft.sourceId = resource.sourceId
            }
            if (curDraftId) {
                temDraft.id = curDraftId
            }
            return temDraft
        }
    },
    storageDraft: function(draft, storageName) {
        let curStorage = Vue.prototype.localStorageHelper.get(storageName);
        if (curStorage && draft.content == curStorage.content) return;
        Vue.prototype.localStorageHelper.set(storageName, JSON.stringify(draft));
        return true
    },
    clearStorageDraft: function(storageName) {
        Vue.prototype.localStorageHelper.remove(storageName);
    }
}

/*
  取元素距离浏览器视图最顶端以及最左端的距离(包括滚动距离)
*/
export const offsetDis = function(domElement) {
    var l = 0,
        t = 0;  
    while (domElement) {
        l = l + domElement.offsetLeft + domElement.clientLeft;
        t = t + domElement.offsetTop + domElement.clientTop;
        domElement = domElement.offsetParent;  
    }  
    return { left: l, top: t };
}

/* 从组件中获取bottomTool子组件 */
export const getBottomTool = function(el) {
    if (!el.childNodes) return null
    for(let node of el.childNodes) {
        if(node.className == 'bottom-tool') {
            return node
        }
    }
 }

/**
  @param {Object} el 卡片钩子
  @param {String} boundaryVal 卡片沉底的边界高度
  判定卡片沉底的条件必须满足：
   2. 当前卡片进入浏览器操作区域，且超过卡片沉底边界高度;
   3. 当前卡片底部栏没有进入浏览器操作区域
*/
export const browserBottomLineInside = function(el , boundaryVal) {
    let scrollTop = document.documentElement.scrollTop !== 0 ? document.documentElement.scrollTop : document.body.scrollTop;
    let browserBottomLine = window.innerHeight + scrollTop;
    return browserBottomLine - offsetDis(el).top - boundaryVal > 0 && browserBottomLine - offsetDis(getBottomTool(el)).top < 0;
}


export const getAtPersonIds = function(htmltext) {
    let userIds = [];
    if (htmltext) {
        var atPersonReg = /<a(.*?)class=['"]vip-kingdee-at-person['"](.*?)<\/a>/g
        var userIdReg = /data-userid="(\d+)"/
        var atPersonLinks = htmltext.match(atPersonReg);
        if (atPersonLinks) {
            for (let i = 0; i < atPersonLinks.length; i++) {
                var userId = atPersonLinks[i].match(userIdReg)[1]
                if (userId) {
                    userIds.push(parseInt(userId));
                }
            }
            userIds = _.uniq(userIds);
        }
    }
    return userIds;
}

export const dynamicLoadJs = function(url, callback) {
    var script = document.createElement("script");
    script.type = "text/javascript";
    if (script.readyState) { //IE 
        script.onreadystatechange = function() {
            if (script.readyState == "loaded" || script.readyState == "complete") {
                script.onreadystatechange = null;
                if (callback) {
                    callback();
                }
                
            }
        };
    } else { //Others 
        script.onload = function() {
            if (callback) {
                callback();
            }
        };
    }
    script.src = url;
    document.getElementsByTagName("head")[0].appendChild(script);
}

export const dynamicLoadCss = function(url) {
    var head = document.getElementsByTagName('head')[0];
    var link = document.createElement('link');
    link.type = 'text/css';
    link.rel = 'stylesheet';
    link.href = url;
    head.appendChild(link);
}

export const propsToLowerCase = (obj) => {
    if (obj) {
        for (let field in obj) {
            obj[field.toLocaleLowerCase()] = obj[field];
        }
    }
    return obj;
}

export const filterHtml = (value) => {
    if(!value) return '';
    if(typeof value !== 'string') return
    value = value.replace(/<img[^>]+>/g, function(val) {
        if (val.indexOf('img.baidu.com') > -1) {
            return '[表情]'
        } else {
            return '[图片]'
        }
    });
    value = value.replace(/<[^>]*>/g, "");
    value = value.replace(/&nbsp;/g, "");
    value = value.replace(/&quot;/g, "");
    value = value.replace(/&amp;/g, "&");
    value = value.replace(/&#39;/g, "'");
    value = value.replace(/&lt;/g, "<");
    value = value.replace(/&gt;/g, ">");
    value = value.replace(/&laquo;/g, "？");
    value = value.replace(/&not;/g, "？");
    return value;
}

export const handleKnowledgeClassifiesOption = function (prod) {
    let product = { name: prod.name, id: prod.id };
    let result;
    if (prod.child) {
        var domain = { name: prod.child.name, id: prod.child.id };
    }
    if (prod.child && prod.child.child) {
        var moduleClass = { name: prod.child.child.name, id: prod.child.child.id };
    }
    if (prod.child && prod.child.child && prod.child.child.child) {
        var businessObj = { name: prod.child.child.child.name, id: prod.child.child.child.id };
    }

    if (!domain) {
        result = {
            pId: product.id,
            cId: product.id,
            title: `${product.name}`
        }
    }
    if (domain && !moduleClass) {
        result = {
            pId: product.id,
            cId: domain.id,
            title: `${product.name}/${domain.name}`
        }
    }
    if (moduleClass && !businessObj) {
        result = {
            pId: product.id,
            cId: moduleClass.id,
            title: `${product.name}/${domain.name}/${moduleClass.name}`
        }
    }
    if (businessObj) {
        result = {
            pId: product.id,
            cId: businessObj.id,
            title: `${product.name}/${domain.name}/${moduleClass.name}/${businessObj.name}`
        }
    }
    return result
}

export const recognizeAttachType = function (fileName) {
    if(!fileName&&fileName.indexOf('.')==-1){
        return 'default-attach-icon'
    }
    let arry = fileName.split('.')
    let type = arry[arry.length-1];
    if (type.indexOf('doc')>-1) {
        return 'word-attach-icon';
      } else if (type.indexOf('ppt')>-1) {
        return 'ppt-attach-icon';
      } else if (type.indexOf('xls')>-1) {
        return 'excel-attach-icon';
      } else if (type.indexOf('pdf')>-1) {
        return 'pdf-attach-icon';
      } else if (type.indexOf('zip')>-1) {
        return 'zip-attach-icon';
      } else {
        return 'default-attach-icon';
      }
}
export const fileterAttachment = function (attachment) {
    return attachment;
}

export const refreshCurrentProductlineCache = function (currentId) {
  this.localStorageHelper.set("currentProductLineId", currentId);
  //切换产品线清除本地产品分类缓存
  this.localStorageHelper.remove('productCategoryStorage');
  this.localStorageHelper.remove('categoryWithoutFilter');
}

export const getChromeVersion = function() {
    var arr = navigator.userAgent.split(' '); 
    var chromeVersion = '';
    for(var i=0;i < arr.length;i++){
        if(/chrome/i.test(arr[i]))
        chromeVersion = arr[i]
    }
    if(chromeVersion){
        return Number(chromeVersion.split('/')[1].split('.')[0]);
    } else {
        return false;
    }
}

export const getBrowserName = function(){
    if(!navigator || !window) return 
    let userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
    let isOpera = userAgent.indexOf('Opera') > -1;
    //判断是否Opera浏览器
    if (isOpera) {
        return 'Opera'
    };
    //判断是否Firefox浏览器
    if (userAgent.indexOf('Firefox') > -1) {
        return 'Firefox'
    } 
    //判断是否Chrome浏览器
    if (userAgent.indexOf('Chrome') > -1) {
        return 'Chrome'
    }
    //判断是否Safari浏览器
    if (userAgent.indexOf('Safari') > -1) {
        return 'Safari'
    }
    //判断是否IE浏览器
    if (!!window.ActiveXObject || 'ActiveXObject' in window) {
        return 'IE'
    }; 
}

export const logoutReady = {
  actions: [],
  ok() {
    return Promise.all(this.actions.map(action => (typeof action === "function") ? action() : action));
  }
}

export const initKeepAliveKey = (key) => {
  if (typeof key === "string" && typeof window != "undefined") {
    if (localStorage.getItem("keepAliveKeys")) {
        let keepAliveKeys = JSON.parse(localStorage.getItem("keepAliveKeys"));
        if (keepAliveKeys.indexOf(key) == -1) {
          localStorage.setItem("keepAliveKeys", JSON.stringify([...keepAliveKeys, key]));
        }
      } else {
        localStorage.setItem("keepAliveKeys", JSON.stringify(["keepAliveKeys", key]));
      }
  } else {
    console.error("the key isn't string or window object is undefined !")
  }
}
export const IdCodeValid = function(code){
  // 身份证号合法性验证
  // 支持15位和18位身份证号
  // 支持地址编码、出生日期、校验位验证
  let city = {
    11: "北京", 12: "天津", 13: "河北", 14: "山西", 15: "内蒙古",
    21: "辽宁", 22: "吉林", 23: "黑龙江 ",
    31: "上海", 32: "江苏", 33: "浙江", 34: "安徽", 35: "福建", 36: "江西", 37: "山东",
    41: "河南", 42: "湖北", 43: "湖南", 44: "广东", 45: "广西", 46: "海南",
    50: "重庆", 51: "四川", 52: "贵州", 53: "云南", 54: "西藏 ",
    61: "陕西", 62: "甘肃", 63: "青海", 64: "宁夏", 65: "新疆",
    71: "台湾",
    81: "香港", 82: "澳门",
    91: "国外"
  };
  let result = {
    'pass': true,
    'msg': '验证成功。'
  };
  if (!code || !/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|[xX])$/.test(code)) {
    result.pass = false;
    result.msg = "身份证号格式错误";
  } else if (!city[code.substr(0, 2)]) {
    result.pass = false;
    result.msg = "身份证号地址编码（前两位）错误，请重新输入。";
  } else {
    // 18位身份证需要验证最后一位校验位
    if (code.length == 18) {
      code = code.split('');
      // ∑(ai×Wi)(mod 11)
      // 加权因子
      let factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
      // 校验位
      let parity = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2];
      let sum = 0;
      let ai = 0;
      let wi = 0;
      for (let i = 0; i < 17; i++) {
        ai = code[i];
        wi = factor[i];
        sum += ai * wi;
      }
      if (parity[sum % 11] != code[17].toUpperCase()) {
        result.pass = false;
        result.msg = "身份证号校验位（末位）错误，检查其他位是否输入正确。";
      }
    }
  }
  return result;
}













export const productInfoJudge1 = (currentUser) => {
    if (currentUser.currentOrg && currentUser.currentOrg.productInstances && currentUser.currentOrg.productInstances.length > 0) {
        let products = currentUser.currentOrg.productInstances;
        for (let i = 0; i < products.length; i++) {

            if (products[i].serviceEndeDate) {
                var EndDate = products[i].serviceEndeDate;
                if (products[i].serviceEndeDate.toString().indexOf('-') != -1) {
                    var EndDate = Date.parse(new Date(products[i].serviceEndeDate));
                }
            }

            if (products[i].productVersion && products[i].productVersion.product && products[i].productVersion.product.productCategory) {

                if (products[i].productVersion.product.productCategory.id === 1) {

                    if (EndDate && EndDate - Date.parse(new Date()) > 0) {
                        return { name: 'cloud', effective: true, sn: products[i].sn, productName: products[i].name, type: 'cloud' }
                    } else {
                        return { name: 'cloud', effective: false, sn: products[i].sn, productName: products[i].name, type: 'cloud' }
                    }
                } else if (products[i].productVersion.product.productCategory.id === 2) {
                    if (EndDate && EndDate - Date.parse(new Date()) > 0) {
                        return { name: 'k3cloud', effective: true, sn: products[i].sn, productName: products[i].name, type: 'k3cloud' }
                    } else {
                        return { name: 'k3cloud', effective: false, sn: products[i].sn, productName: products[i].name, type: 'k3cloud' }
                    }
                }

            }
        }

    }
}

export const timespanToTimeBefore1 = (timespan) => {
    var dateTime = new Date(timespan);

    var year = dateTime.getFullYear();
    var month = dateTime.getMonth() + 1;
    var day = dateTime.getDate();
    var hour = dateTime.getHours();
    var minute = dateTime.getMinutes();
    var second = dateTime.getSeconds();
    var now = new Date();
    var now_new = Date.parse(now);
    if (hour < 10) {
        hour = '0' + hour;
    }
    if (minute < 10) {
        minute = '0' + minute;
    }
    if (second < 10) {
        second = '0' + second;
    }

    var milliseconds = 0;
    var timeSpanStr;

    milliseconds = now_new - timespan;
    if (milliseconds <= 1000 * 60 * 1) {
        timeSpanStr = '刚刚';
    } else if (1000 * 60 * 1 < milliseconds && milliseconds <= 1000 * 60 * 60) {
        timeSpanStr = Math.round((milliseconds / (1000 * 60))) + '分钟前';
    } else if (1000 * 60 * 60 * 1 < milliseconds && milliseconds <= 1000 * 60 * 60 * 24) {
        timeSpanStr = Math.round(milliseconds / (1000 * 60 * 60)) + '小时前';
    } else if (1000 * 60 * 60 * 24 < milliseconds && milliseconds <= 1000 * 60 * 60 * 24 * 15) {
        timeSpanStr = Math.round(milliseconds / (1000 * 60 * 60 * 24)) + '天前';
    } else if (milliseconds > 1000 * 60 * 60 * 24 * 15 && year == now.getFullYear()) {
        timeSpanStr = month + '-' + day + ' ' + hour + ':' + minute;
    } else {
        timeSpanStr = year + '-' + month + '-' + day + ' ' + hour + ':' + minute;
    }
    return timeSpanStr;
}

export const toLocaleTimeStrng1 = (timespan) => {
    let date = new Date(timespan);
    let retDate = date.getFullYear() + '年' + (date.getMonth() + 1) + '月' + (date.getDate()) + '日';
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();
    if (hours < 10) {
        hours = '0' + hours;
    }
    if (minutes < 10) {
        minutes = '0' + minutes;
    }
    if (seconds < 10) {
        seconds = '0' + seconds;
    }
    retDate += ' ' + hours + ':' + minutes + ':' + seconds;
    return retDate;
}

export const dateSimpleVersion1 = function(date , symbal = '/') {
    if(typeof(date) == 'string') date = date.replace(/-/g, '/').replace('T',' ').substring(0,date.indexOf('.') == -1? date.length:date.indexOf('.'))
    date = new Date(date);
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var hour = date.getHours();
    var min = date.getMinutes();
    
    month = (month >= 1 && month <= 9) ? `0${month}`:month;
    day = (day >= 0 && day <= 9) ? `0${day}`:day;
    hour = (hour >= 0 && hour <= 9) ? `0${hour}`:hour;
    min = (min >= 0 && min <= 9) ? `0${min}`:min;

    return `${date.getFullYear()}${symbal}${month}${symbal}${day}` 
}

export const isScrolledToBottom1 = (element = document.documentElement) => {
  let scrollTop = element.scrollTop ||
    window.pageYOffset ||
    document.body.scrollTop;
  return (
    Math.ceil(element.clientHeight + scrollTop) >= element.scrollHeight
  );
}

export const hasScrollbar1 = () => {
    return document.body.scrollHeight > (window.innerHeight || document.documentElement.clientHeight);
}

export const getScrollbarWidth1 = () => {
    var scrollDiv = document.createElement("div");
    scrollDiv.style.cssText = 'width: 99px; height: 99px; overflow: scroll; position: absolute; top: -9999px;';
    document.body.appendChild(scrollDiv);
    var width = scrollDiv.offsetWidth - scrollDiv.clientWidth;
    document.body.removeChild(scrollDiv);
    return width;
}

export const fixModalShake1 = () => {
    if (hasScrollbar) {
        document.body.classList.add('modal-shake-fix-margin')
        document.getElementById('header-inner').classList.add('modal-homeheader-shift')
    }
}

export const removeFixModalShake1 = () => {
    document.body.classList.remove('modal-shake-fix-margin')
    document.getElementById('header-inner').classList.remove('modal-homeheader-shift')
}


export const getCookie1 = (name) => {
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    return (arr = document.cookie.match(reg)) ? unescape(arr[2]) : null;
}

export const hideMobile41 = (mobile) => {
    return mobile.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
}



export const buildTagsInfo1 = (tags) => {
    let res = { tagIds: "", tagsDesc: "" }
    if (tags && tags.length) {
        for (let i = 0; i < tags.length; i++) {
            res.tagIds += tags[i].id;
            res.tagsDesc += tags[i].name;
            if (i < tags.length - 1) {
                res.tagIds += '&'
                res.tagsDesc += '&'
            }
        }
    }
    return res;
}

//草稿存储机制处理
export const draftHandler1 = {
    getDraft: function(title, resource, curDraftId, type) {
        if (type == 'articles') {
            if (!title || !resource.content) return
            let temDraft = {
                mainSourceType: "articles",
                sourceType: "articles",
                title: title,
                content: JSON.stringify(resource)
            }
            if (resource.id) {
                temDraft.sourceId = resource.id
                temDraft.mainSourceId = resource.id
            }
            if (curDraftId) {
                temDraft.id = curDraftId
            }
            return temDraft
        }
        if (type == 'answers' && resource && title) {
            let temDraft = {
                mainSourceType: "questions",
                mainSourceId: resource.mainSourceId,
                sourceType: "answers",
                title: title,
                content: JSON.stringify(resource)
            }
            if (resource.sourceId) {
                temDraft.sourceId = resource.sourceId
            }
            if (curDraftId) {
                temDraft.id = curDraftId
            }
            return temDraft
        }
    },
    storageDraft: function(draft, storageName) {
        let curStorage = Vue.prototype.localStorageHelper.get(storageName);
        if (curStorage && draft.content == curStorage.content) return;
        Vue.prototype.localStorageHelper.set(storageName, JSON.stringify(draft));
        return true
    },
    clearStorageDraft: function(storageName) {
        Vue.prototype.localStorageHelper.remove(storageName);
    }
}

/*
  取元素距离浏览器视图最顶端以及最左端的距离(包括滚动距离)
*/
export const offsetDis1 = function(domElement) {
    var l = 0,
        t = 0;  
    while (domElement) {
        l = l + domElement.offsetLeft + domElement.clientLeft;
        t = t + domElement.offsetTop + domElement.clientTop;
        domElement = domElement.offsetParent;  
    }  
    return { left: l, top: t };
}

/* 从组件中获取bottomTool子组件 */
export const getBottomTool1 = function(el) {
    if (!el.childNodes) return null
    for(let node of el.childNodes) {
        if(node.className == 'bottom-tool') {
            return node
        }
    }
 }

/**
  @param {Object} el 卡片钩子
  @param {String} boundaryVal 卡片沉底的边界高度
  判定卡片沉底的条件必须满足：
   2. 当前卡片进入浏览器操作区域，且超过卡片沉底边界高度;
   3. 当前卡片底部栏没有进入浏览器操作区域
*/
export const browserBottomLineInside1 = function(el , boundaryVal) {
    let scrollTop = document.documentElement.scrollTop !== 0 ? document.documentElement.scrollTop : document.body.scrollTop;
    let browserBottomLine = window.innerHeight + scrollTop;
    return browserBottomLine - offsetDis(el).top - boundaryVal > 0 && browserBottomLine - offsetDis(getBottomTool(el)).top < 0;
}


export const getAtPersonIds1 = function(htmltext) {
    let userIds = [];
    if (htmltext) {
        var atPersonReg = /<a(.*?)class=['"]vip-kingdee-at-person['"](.*?)<\/a>/g
        var userIdReg = /data-userid="(\d+)"/
        var atPersonLinks = htmltext.match(atPersonReg);
        if (atPersonLinks) {
            for (let i = 0; i < atPersonLinks.length; i++) {
                var userId = atPersonLinks[i].match(userIdReg)[1]
                if (userId) {
                    userIds.push(parseInt(userId));
                }
            }
            userIds = _.uniq(userIds);
        }
    }
    return userIds;
}

export const dynamicLoadJs1 = function(url, callback) {
    var script = document.createElement("script");
    script.type = "text/javascript";
    if (script.readyState) { //IE 
        script.onreadystatechange = function() {
            if (script.readyState == "loaded" || script.readyState == "complete") {
                script.onreadystatechange = null;
                if (callback) {
                    callback();
                }
                
            }
        };
    } else { //Others 
        script.onload = function() {
            if (callback) {
                callback();
            }
        };
    }
    script.src = url;
    document.getElementsByTagName("head")[0].appendChild(script);
}

export const dynamicLoadCss1 = function(url) {
    var head = document.getElementsByTagName('head')[0];
    var link = document.createElement('link');
    link.type = 'text/css';
    link.rel = 'stylesheet';
    link.href = url;
    head.appendChild(link);
}

export const propsToLowerCase1 = (obj) => {
    if (obj) {
        for (let field in obj) {
            obj[field.toLocaleLowerCase()] = obj[field];
        }
    }
    return obj;
}

export const filterHtml1 = (value) => {
    if(!value) return '';
    if(typeof value !== 'string') return
    value = value.replace(/<img[^>]+>/g, function(val) {
        if (val.indexOf('img.baidu.com') > -1) {
            return '[表情]'
        } else {
            return '[图片]'
        }
    });
    value = value.replace(/<[^>]*>/g, "");
    value = value.replace(/&nbsp;/g, "");
    value = value.replace(/&quot;/g, "");
    value = value.replace(/&amp;/g, "&");
    value = value.replace(/&#39;/g, "'");
    value = value.replace(/&lt;/g, "<");
    value = value.replace(/&gt;/g, ">");
    value = value.replace(/&laquo;/g, "？");
    value = value.replace(/&not;/g, "？");
    return value;
}

export const handleKnowledgeClassifiesOption1 = function (prod) {
    let product = { name: prod.name, id: prod.id };
    let result;
    if (prod.child) {
        var domain = { name: prod.child.name, id: prod.child.id };
    }
    if (prod.child && prod.child.child) {
        var moduleClass = { name: prod.child.child.name, id: prod.child.child.id };
    }
    if (prod.child && prod.child.child && prod.child.child.child) {
        var businessObj = { name: prod.child.child.child.name, id: prod.child.child.child.id };
    }

    if (!domain) {
        result = {
            pId: product.id,
            cId: product.id,
            title: `${product.name}`
        }
    }
    if (domain && !moduleClass) {
        result = {
            pId: product.id,
            cId: domain.id,
            title: `${product.name}/${domain.name}`
        }
    }
    if (moduleClass && !businessObj) {
        result = {
            pId: product.id,
            cId: moduleClass.id,
            title: `${product.name}/${domain.name}/${moduleClass.name}`
        }
    }
    if (businessObj) {
        result = {
            pId: product.id,
            cId: businessObj.id,
            title: `${product.name}/${domain.name}/${moduleClass.name}/${businessObj.name}`
        }
    }
    return result
}

export const recognizeAttachType1 = function (fileName) {
    if(!fileName&&fileName.indexOf('.')==-1){
        return 'default-attach-icon'
    }
    let arry = fileName.split('.')
    let type = arry[arry.length-1];
    if (type.indexOf('doc')>-1) {
        return 'word-attach-icon';
      } else if (type.indexOf('ppt')>-1) {
        return 'ppt-attach-icon';
      } else if (type.indexOf('xls')>-1) {
        return 'excel-attach-icon';
      } else if (type.indexOf('pdf')>-1) {
        return 'pdf-attach-icon';
      } else if (type.indexOf('zip')>-1) {
        return 'zip-attach-icon';
      } else {
        return 'default-attach-icon';
      }
}
export const fileterAttachment1 = function (attachment) {
    return attachment;
}

export const refreshCurrentProductlineCache1 = function (currentId) {
  this.localStorageHelper.set("currentProductLineId", currentId);
  //切换产品线清除本地产品分类缓存
  this.localStorageHelper.remove('productCategoryStorage');
  this.localStorageHelper.remove('categoryWithoutFilter');
}

export const getChromeVersion1 = function() {
    var arr = navigator.userAgent.split(' '); 
    var chromeVersion = '';
    for(var i=0;i < arr.length;i++){
        if(/chrome/i.test(arr[i]))
        chromeVersion = arr[i]
    }
    if(chromeVersion){
        return Number(chromeVersion.split('/')[1].split('.')[0]);
    } else {
        return false;
    }
}

export const getBrowserName1 = function(){
    if(!navigator || !window) return 
    let userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
    let isOpera = userAgent.indexOf('Opera') > -1;
    //判断是否Opera浏览器
    if (isOpera) {
        return 'Opera'
    };
    //判断是否Firefox浏览器
    if (userAgent.indexOf('Firefox') > -1) {
        return 'Firefox'
    } 
    //判断是否Chrome浏览器
    if (userAgent.indexOf('Chrome') > -1) {
        return 'Chrome'
    }
    //判断是否Safari浏览器
    if (userAgent.indexOf('Safari') > -1) {
        return 'Safari'
    }
    //判断是否IE浏览器
    if (!!window.ActiveXObject || 'ActiveXObject' in window) {
        return 'IE'
    }; 
}

export const logoutReady1 = {
  actions: [],
  ok() {
    return Promise.all(this.actions.map(action => (typeof action === "function") ? action() : action));
  }
}

export const initKeepAliveKey1 = (key) => {
  if (typeof key === "string" && typeof window != "undefined") {
    if (localStorage.getItem("keepAliveKeys")) {
        let keepAliveKeys = JSON.parse(localStorage.getItem("keepAliveKeys"));
        if (keepAliveKeys.indexOf(key) == -1) {
          localStorage.setItem("keepAliveKeys", JSON.stringify([...keepAliveKeys, key]));
        }
      } else {
        localStorage.setItem("keepAliveKeys", JSON.stringify(["keepAliveKeys", key]));
      }
  } else {
    console.error("the key isn't string or window object is undefined !")
  }
}
export const IdCodeValid1 = function(code){
  // 身份证号合法性验证
  // 支持15位和18位身份证号
  // 支持地址编码、出生日期、校验位验证
  let city = {
    11: "北京", 12: "天津", 13: "河北", 14: "山西", 15: "内蒙古",
    21: "辽宁", 22: "吉林", 23: "黑龙江 ",
    31: "上海", 32: "江苏", 33: "浙江", 34: "安徽", 35: "福建", 36: "江西", 37: "山东",
    41: "河南", 42: "湖北", 43: "湖南", 44: "广东", 45: "广西", 46: "海南",
    50: "重庆", 51: "四川", 52: "贵州", 53: "云南", 54: "西藏 ",
    61: "陕西", 62: "甘肃", 63: "青海", 64: "宁夏", 65: "新疆",
    71: "台湾",
    81: "香港", 82: "澳门",
    91: "国外"
  };
  let result = {
    'pass': true,
    'msg': '验证成功。'
  };
  if (!code || !/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|[xX])$/.test(code)) {
    result.pass = false;
    result.msg = "身份证号格式错误";
  } else if (!city[code.substr(0, 2)]) {
    result.pass = false;
    result.msg = "身份证号地址编码（前两位）错误，请重新输入。";
  } else {
    // 18位身份证需要验证最后一位校验位
    if (code.length == 18) {
      code = code.split('');
      // ∑(ai×Wi)(mod 11)
      // 加权因子
      let factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
      // 校验位
      let parity = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2];
      let sum = 0;
      let ai = 0;
      let wi = 0;
      for (let i = 0; i < 17; i++) {
        ai = code[i];
        wi = factor[i];
        sum += ai * wi;
      }
      if (parity[sum % 11] != code[17].toUpperCase()) {
        result.pass = false;
        result.msg = "身份证号校验位（末位）错误，检查其他位是否输入正确。";
      }
    }
  }
  return result;
}