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
    body = JSON.parse(event.body);
  } catch {
    return { statusCode: 400, body: JSON.stringify({ error: "请求格式错误" }) };
  }

  const { fields, targetLang } = body;
  if (!fields || !targetLang) {
    return { statusCode: 400, body: JSON.stringify({ error: "参数缺失" }) };
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
        max_tokens: 3000,
        messages: [
          {
            role: "system",
            content: `You are a professional resume translator. Translate the given resume fields into ${langLabel}.
Rules:
1. Translate ALL content into ${langLabel} only
2. Preserve the exact format structure (line breaks, separators like ｜, bullet points)
3. Keep proper nouns like company names, school names, software names as-is
4. Keep numbers, dates, and symbols unchanged
5. Return ONLY a valid JSON object with the same keys as input, no explanation, no markdown`
          },
          {
            role: "user",
            content: `Translate these resume fields to ${langLabel}:\n${JSON.stringify(fields)}`
          }
        ]
      })
    });

    const data = await response.json();
    let result = data.choices?.[0]?.message?.content;

    if (!result) {
      return { statusCode: 500, body: JSON.stringify({ error: "AI返回内容为空，请重试" }) };
    }

    // 清理可能的markdown代码块
    result = result.replace(/```json|```/g, "").trim();

    let parsed;
    try {
      parsed = JSON.parse(result);
    } catch {
      return { statusCode: 500, body: JSON.stringify({ error: "翻译结果解析失败，请重试" }) };
    }

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ result: parsed })
    };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: "请求失败，请稍后重试" }) };
  }
};
