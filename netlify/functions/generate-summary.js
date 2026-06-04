exports.handler = async function(event) {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  const apiKey = process.env.DEEPSEEK_API_KEY;
  if (!apiKey) {
    return { statusCode: 500, body: JSON.stringify({ error: "API key未配置" }) };
  }

  let body;
  try {
    body = JSON.parse(event.body || "{}");
  } catch {
    return { statusCode: 400, body: JSON.stringify({ error: "请求格式错误" }) };
  }

  const { name, role, education, experience, skills, targetLang } = body;
  if (!role && !experience) {
    return { statusCode: 400, body: JSON.stringify({ error: "请先填写求职意向和工作经历" }) };
  }
  const langLabel = targetLang === "en" ? "English" : "中文";

  try {
    const response = await fetch("https://api.deepseek.com/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "deepseek-chat",
        max_tokens: 500,
        messages: [
          {
            role: "system",
            content: `You are a professional resume writer. Generate an attractive personal summary based on the candidate's information.
Rules:
1. Write 3-4 sentences, around 80-120 words
2. First sentence: identity background and years of experience
3. Second sentence: core skills and expertise
4. Third sentence: personal value and career goal
5. Professional and confident tone, avoid clichés
6. MUST write entirely in ${langLabel}
7. Output the summary directly, no title or explanation`
          },
          {
            role: "user",
            content: `请根据以下信息生成个人简介：
求职意向：${role || "未填写"}
教育经历：${education || "未填写"}
工作经历：${experience || "未填写"}
技能：${skills || "未填写"}`
          }
        ]
      })
    });

    if (!response.ok) {
      return { statusCode: response.status, body: JSON.stringify({ error: "AI服务暂时不可用，请稍后重试" }) };
    }

    const data = await response.json();
    const result = data.choices?.[0]?.message?.content;

    if (!result) {
      return { statusCode: 500, body: JSON.stringify({ error: "AI返回内容为空，请重试" }) };
    }

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ result })
    };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: "请求失败，请稍后重试" }) };
  }
};
