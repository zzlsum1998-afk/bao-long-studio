Bao Long Studio｜图片性能优化 v73

本次优化内容：
1. 将 images/ 下的 JPG/PNG 图片统一转换为 WebP。
2. 更新网站内 HTML/CSS/JS 图片路径，避免出现断图。
3. 为页面中的非 Logo 图片补充 loading="lazy" 与 decoding="async"。
4. 保持原有页面结构、导航、Logo尺寸、Prompt弹窗、复制按钮、返回顶部逻辑不变。

上传说明：
- 建议直接上传完整 v73 包。
- 若只做最小替换，需要同步上传所有更新后的 HTML/JS/CSS 文件以及整个 images/ 文件夹。

检查结果：
- images 目录已无 JPG/PNG 原图。
- images 目录当前为 WebP + SVG。
- HTML/JS/CSS 内的 images 路径均已检查，没有缺失引用。
