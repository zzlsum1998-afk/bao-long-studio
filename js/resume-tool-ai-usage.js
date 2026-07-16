
(function(){
  const DAILY_FREE_LIMIT = 3;
  const STORAGE_KEY = "baoLongResumeAiUsage_" + new Date().toISOString().slice(0, 10);
  const AI_ENDPOINTS = [
    "/.netlify/functions/optimize-experience",
    "/.netlify/functions/generate-summary",
    "/.netlify/functions/translate-resume",
    "/.netlify/functions/optimize-by-job"
  ];

  function getUsedCount(){
    return Number(localStorage.getItem(STORAGE_KEY) || "0");
  }

  function setUsedCount(count){
    localStorage.setItem(STORAGE_KEY, String(count));
    updateUsageBadge();
  }

  function isAiRequest(url){
    const text = typeof url === "string" ? url : (url && url.url) || "";
    return AI_ENDPOINTS.some(endpoint => text.includes(endpoint));
  }

  function updateUsageBadge(){
    const left = Math.max(0, DAILY_FREE_LIMIT - getUsedCount());
    let badge = document.getElementById("resumeAiUsageBadge");
    if(!badge){
      badge = document.createElement("div");
      badge.id = "resumeAiUsageBadge";
      badge.style.cssText = `
        position: fixed;
        right: 22px;
        bottom: 22px;
        z-index: 9999;
        background: #111;
        color: #fff;
        border-radius: 999px;
        padding: 11px 16px;
        font-size: 13px;
        box-shadow: 0 12px 28px rgba(0,0,0,.18);
        letter-spacing: .02em;
      `;
      document.body.appendChild(badge);
    }
    badge.textContent = "AI free uses today: " + left + " / " + DAILY_FREE_LIMIT;
  }

  const originalFetch = window.fetch.bind(window);
  window.fetch = async function(input, init){
    if(isAiRequest(input)){
      const used = getUsedCount();
      if(used >= DAILY_FREE_LIMIT){
        alert("今天的免费 AI 优化次数已用完。你可以明天继续使用。");
        return new Response(JSON.stringify({
          error: "Daily free AI limit reached"
        }), {
          status: 429,
          headers: {"Content-Type": "application/json"}
        });
      }

      const response = await originalFetch(input, init);

      // 只有请求成功才扣次数，避免接口报错也消耗次数
      if(response.ok){
        setUsedCount(used + 1);
      }

      return response;
    }

    return originalFetch(input, init);
  };

  document.addEventListener("DOMContentLoaded", updateUsageBadge);
})();
