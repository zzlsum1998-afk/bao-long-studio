(function(){
  'use strict';

  var MOBILE_UA = /Android|iPhone|iPad|iPod|Windows Phone|Mobile|HarmonyOS|ArkWeb/i;

  function isMobileDevice(){
    return MOBILE_UA.test(navigator.userAgent || '') ||
      ((window.matchMedia && window.matchMedia('(max-width: 900px)').matches) && ('ontouchstart' in window || navigator.maxTouchPoints > 0));
  }

  function toAbsoluteUrl(url){
    try{
      return new URL(url, window.location.href);
    }catch(err){
      return null;
    }
  }

  function isTaobaoUrl(url){
    var parsed = toAbsoluteUrl(url);
    if(!parsed) return false;
    var host = parsed.hostname.toLowerCase();
    return host === 'tb.cn' || host.endsWith('.tb.cn') || host === 'taobao.com' || host.endsWith('.taobao.com') || host === 'tmall.com' || host.endsWith('.tmall.com');
  }

  function getTaobaoItemId(url){
    var parsed = toAbsoluteUrl(url);
    if(!parsed) return '';
    return parsed.searchParams.get('id') || parsed.searchParams.get('itemId') || '';
  }

  function buildTaobaoSchemeUrl(webUrl){
    var parsed = toAbsoluteUrl(webUrl);
    if(!parsed) return webUrl;
    var itemId = getTaobaoItemId(parsed.href);
    if(itemId){
      return 'taobao://item.taobao.com/item.htm?id=' + encodeURIComponent(itemId);
    }
    return 'taobao://m.taobao.com/tbopen/index.html?h5Url=' + encodeURIComponent(parsed.href);
  }

  function buildAndroidIntentUrl(webUrl){
    var parsed = toAbsoluteUrl(webUrl);
    if(!parsed) return webUrl;
    var itemId = getTaobaoItemId(parsed.href);
    var fallback = encodeURIComponent(parsed.href);
    if(itemId){
      return 'intent://item.taobao.com/item.htm?id=' + encodeURIComponent(itemId) + '#Intent;scheme=taobao;package=com.taobao.taobao;S.browser_fallback_url=' + fallback + ';end';
    }
    return 'intent://m.taobao.com/tbopen/index.html?h5Url=' + encodeURIComponent(parsed.href) + '#Intent;scheme=taobao;package=com.taobao.taobao;S.browser_fallback_url=' + fallback + ';end';
  }

  function openNormal(url){
    window.open(url, '_blank', 'noopener,noreferrer');
  }

  window.openTaobaoSmart = function(url){
    if(!url) return false;
    var parsed = toAbsoluteUrl(url);
    if(!parsed) return false;
    var webUrl = parsed.href;

    if(!isTaobaoUrl(webUrl) || !isMobileDevice()){
      openNormal(webUrl);
      return true;
    }

    var hasLeftPage = false;
    var markLeftPage = function(){ hasLeftPage = true; };
    document.addEventListener('visibilitychange', function onVisibilityChange(){
      if(document.hidden){
        hasLeftPage = true;
        document.removeEventListener('visibilitychange', onVisibilityChange);
      }
    });
    window.addEventListener('pagehide', markLeftPage, { once:true });
    window.addEventListener('blur', markLeftPage, { once:true });

    window.location.href = /Android|HarmonyOS|ArkWeb/i.test(navigator.userAgent || '')
      ? buildAndroidIntentUrl(webUrl)
      : buildTaobaoSchemeUrl(webUrl);

    window.setTimeout(function(){
      if(!hasLeftPage && !document.hidden){
        window.location.href = webUrl;
      }
    }, 1200);

    return true;
  };

  document.addEventListener('click', function(event){
    var target = event.target;
    if(!target || !target.closest) return;
    var link = target.closest('a[href]');
    if(!link) return;
    if(event.defaultPrevented || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    var href = link.getAttribute('href');
    if(!href || !isTaobaoUrl(href) || !isMobileDevice()) return;
    event.preventDefault();
    window.openTaobaoSmart(href);
  });
})();
