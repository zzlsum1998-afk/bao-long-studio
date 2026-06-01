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

  const jobRequirement = String(body.jobRequirement || "").trim();
  const fields = body.fields || {};

  if (!jobRequirement) {
    return { statusCode: 400, body: JSON.stringify({ error: "请先粘贴岗位要求 / JD" }) };
  }

  const resumeText = JSON.stringify(fields);
  if (jobRequirement.length > 5000) {
    return { statusCode: 400, body: JSON.stringify({ error: "岗位要求过长，请精简到5000字以内" }) };
  }
  if (resumeText.length > 10000) {
    return { statusCode: 400, body: JSON.stringify({ error: "简历内容过长，请先精简后再优化" }) };
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
        max_tokens: 1800,
        response_format: { type: "json_object" },
        messages: [
          {
            role: "system",
            content: `你是一位专业简历优化师。你的任务是根据目标岗位要求，对简历内容做“匹配度优化”。
重要规则：
1. 只能基于用户已有简历信息改写和排序重点，不能编造经历、项目、证书、公司、学校、奖项、年份、技能或具体数字。
2. 可以增强与岗位相关的关键词，但必须与用户原经历有关。
3. 优先优化 summary、experience、projects、awards、skills；education 和 languages 一般保持不变。
4. 保持原有字段格式，尤其是经历类内容的“标题｜时间｜角色｜描述”和换行结构。
5. Detect resume language and keep the same language. Do not translate the resume.
6. 必须只返回 JSON，不要 Markdown，不要解释。
返回格式：
{
  "role": "优化后的职业/求职方向，可选",
  "summary": "优化后的个人简介",
  "experience": "优化后的工作经历",
  "projects": "优化后的项目经历",
  "awards": "优化后的证书/获奖/其他经历",
  "skills": "优化后的技能/工具"
}`
          },
          {
            role: "user",
            content: `目标岗位要求 / JD：\n${jobRequirement}\n\n当前简历字段 JSON：\n${JSON.stringify(fields, null, 2)}`
          }
        ]
      })
    });

    if (!response.ok) {
      return { statusCode: response.status, body: JSON.stringify({ error: "AI服务暂时不可用，请稍后重试" }) };
    }

    const data = await response.json();
    let result = data.choices?.[0]?.message?.content || "";
    result = result.replace(/```json|```/g, "").trim();

    let parsed;
    try {
      parsed = JSON.parse(result);
    } catch {
      return { statusCode: 500, body: JSON.stringify({ error: "AI返回格式异常，请重试" }) };
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
