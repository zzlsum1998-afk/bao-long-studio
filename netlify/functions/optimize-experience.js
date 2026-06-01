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

  const content = String(body.content || body.experience || "").trim();
  const sectionType = String(body.sectionType || "工作经历").trim();

  if (!content) {
    return { statusCode: 400, body: JSON.stringify({ error: "请先填写内容后再优化" }) };
  }

  if (content.length > 3000) {
    return { statusCode: 400, body: JSON.stringify({ error: "内容过长，请精简到3000字以内再优化" }) };
  }

  try {
    const response = await fetch("https://api.deepseek.com/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "deepseek-chat",
        max_tokens: 1000,
        messages: [
          {
            role: "system",
            content: `你是一位专业的简历优化师，擅长把平淡的简历经历描述改写成清晰、有重点、有岗位竞争力的表达。
规则：
1. 当前优化板块是：${sectionType}
2. 保留原有核心信息，不要编造学校、公司、证书、奖项、项目、数据或结果
3. 如果原文有数字，保留并突出；如果没有，不要凭空添加具体数字
4. 用更专业的动词和结果导向表达，体现职责、行动和成果
5. 每条内容保持简洁，尽量不超过2行
6. 保持原有格式结构，比如“标题｜时间｜角色｜描述”和换行分段
7. Detect the language of the input. If the input is English, output English. If the input is Chinese, output Chinese. Never translate unless the input mixes languages naturally.
8. 直接输出优化后的内容，不要加解释、标题或编号说明`
          },
          {
            role: "user",
            content: `请优化以下${sectionType}内容：\n\n${content}`
          }
        ]
      })
    });

    if (!response.ok) {
      return { statusCode: response.status, body: JSON.stringify({ error: "AI服务暂时不可用，请稍后重试" }) };
    }

    const data = await response.json();
    const result = data.choices?.[0]?.message?.content?.trim();

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
