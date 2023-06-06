# sd-prompt-digger

解析图片中的 stable diffusion 咒文。

仅能解析 stable diffusion 生成图的咒文，功能类似 webui 中的 PNG INFO tag。

demo: [传送门](https://ajccom.github.io/sd-prompt-digger/)

## 用法

```
// 引入 digger.js
document.getElementById('file-input').addEventListener('change', function (e) {
  diggerPrompts(e.target.files[0]).then(data => { 
    console.log(data)
  });
})
```

## 原理

从实践（就是把文件格式从png改成txt）看，sd 生成的图中含有文本内容，内容就是生成参数。

所以只要按文本中关键字进行匹配即可获得 prompt。

大致步骤如下：

1. 按文本形式读取图片文件（FileReader 的 `readAsText` 方法）
2. 匹配 `parameters`、`Negative prompt` 等关键字
3. 组装数据返回

## THANKS
