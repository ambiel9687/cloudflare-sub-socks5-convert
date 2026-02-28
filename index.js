var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// src/utils/cors.js
function handleCORS() {
  return new Response(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
      "Access-Control-Max-Age": "86400"
    }
  });
}
__name(handleCORS, "handleCORS");
function addCORSHeaders(response) {
  response.headers.set("Access-Control-Allow-Origin", "*");
  response.headers.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  response.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
  return response;
}
__name(addCORSHeaders, "addCORSHeaders");

// src/static/index.html.js
var indexHTML = `<!doctype html>
<html>
<head>
<meta charset="utf-8">
<title>Clash2Socks5 \u8F6C\u6362\u5DE5\u5177</title>
<link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><defs><linearGradient id='bg' x1='0%25' y1='0%25' x2='100%25' y2='100%25'><stop offset='0%25' stop-color='%23667eea'/><stop offset='100%25' stop-color='%23764ba2'/></linearGradient></defs><rect width='100' height='100' fill='url(%23bg)' rx='20'/><circle cx='25' cy='35' r='8' fill='%23fff' opacity='0.9'/><circle cx='75' cy='35' r='8' fill='%23fff' opacity='0.9'/><circle cx='25' cy='65' r='8' fill='%23fff' opacity='0.9'/><circle cx='75' cy='65' r='8' fill='%23fff' opacity='0.9'/><path d='M33 35 Q50 20 67 35' stroke='%23fff' stroke-width='3' fill='none' opacity='0.8'/><path d='M33 65 Q50 50 67 65' stroke='%23fff' stroke-width='3' fill='none' opacity='0.8'/><path d='M25 43 Q50 50 75 43' stroke='%23fff' stroke-width='3' fill='none' opacity='0.8'/><text x='50' y='85' text-anchor='middle' fill='%23fff' font-family='Arial,sans-serif' font-size='12' font-weight='bold'>C2S</text></svg>" type="image/svg+xml">
<style>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    min-height: 100vh;
    color: #333;
}

.bg {
    min-height: 100vh;
    padding: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.layout {
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    border-radius: 20px;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
    padding: 40px;
    max-width: 900px;
    width: 100%;
    margin: 0 auto;
}

h1 {
    color: #2c3e50;
    text-align: center;
    margin-bottom: 30px;
    font-size: 2.2em;
    font-weight: 300;
    line-height: 1.4;
}

h2 {
    color: #34495e;
    margin: 30px 0 20px 0;
    font-size: 1.5em;
    font-weight: 400;
    border-left: 4px solid #3498db;
    padding-left: 15px;
}

.content {
    background: #f8f9fa;
    border-radius: 10px;
    padding: 25px;
    margin-bottom: 30px;
    line-height: 1.8;
    border: 1px solid #e9ecef;
}

.content strong {
    color: #2c3e50;
    font-weight: 600;
}

.content a {
    color: #3498db;
    text-decoration: none;
    border-bottom: 1px solid transparent;
    transition: all 0.3s ease;
}

.content a:hover {
    color: #2980b9;
    border-bottom-color: #2980b9;
}

.form-group {
    margin-bottom: 20px;
}

.form-row {
    display: flex;
    gap: 15px;
    margin-bottom: 20px;
    flex-wrap: wrap;
}

.form-col {
    flex: 1;
    min-width: 200px;
}

label {
    display: block;
    margin-bottom: 8px;
    font-weight: 500;
    color: #2c3e50;
    font-size: 0.95em;
}

textarea, input[type="number"], input[type="text"], input[type="password"], input[type="url"] {
    width: 100%;
    padding: 12px 16px;
    border: 2px solid #e9ecef;
    border-radius: 10px;
    font-size: 14px;
    font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
    transition: all 0.3s ease;
    background: #fff;
}

#inputYAML.drag-over {
    border-color: #3498db;
    background: rgba(52, 152, 219, 0.05);
    box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.2);
}

#outputYAML[readonly], #subscriptionPreview[readonly] {
    background: #f8f9fa;
    color: #495057;
}

textarea:focus, input:focus {
    outline: none;
    border-color: #3498db;
    box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.1);
    transform: translateY(-1px);
}

textarea::placeholder, input::placeholder {
    color: #adb5bd;
    font-style: italic;
}

textarea {
    resize: vertical;
    min-height: 120px;
}

.btn {
    background: linear-gradient(135deg, #3498db 0%, #2980b9 100%);
    color: white;
    border: none;
    padding: 15px 30px;
    border-radius: 25px;
    font-size: 16px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 4px 15px rgba(52, 152, 219, 0.3);
    text-transform: uppercase;
    letter-spacing: 0.5px;
    width: 100%;
    margin: 20px 0;
}

.btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(52, 152, 219, 0.4);
    background: linear-gradient(135deg, #2980b9 0%, #3498db 100%);
}

.btn:active {
    transform: translateY(0);
}

.result-section {
    margin-top: 30px;
    padding: 25px;
    background: #f8f9fa;
    border-radius: 15px;
    border: 1px solid #e9ecef;
}

.result-section h3 {
    color: #2c3e50;
    margin: 0 0 20px 0;
    font-size: 1.3em;
    font-weight: 500;
    border-left: 4px solid #27ae60;
    padding-left: 15px;
}

#infoDiv {
    color: #e74c3c;
    font-weight: 500;
    margin-bottom: 10px;
    padding: 12px;
    background: rgba(231, 76, 60, 0.1);
    border-radius: 8px;
    border-left: 4px solid #e74c3c;
    line-height: 1.5;
    min-height: 20px;
}

#infoDiv:empty {
    display: none;
}

#infoDiv.success {
    color: #27ae60;
    background: rgba(39, 174, 96, 0.1);
    border-left-color: #27ae60;
}

#outputDiv {
    margin-top: 15px;
}

#outputDiv a {
    display: inline-block;
    background: linear-gradient(135deg, #27ae60 0%, #2ecc71 100%);
    color: white;
    padding: 12px 25px;
    border-radius: 25px;
    text-decoration: none;
    font-weight: 500;
    transition: all 0.3s ease;
    box-shadow: 0 4px 15px rgba(39, 174, 96, 0.3);
}

#outputDiv a:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(39, 174, 96, 0.4);
}

.auth-section {
    background: #fff3cd;
    border: 1px solid #ffeaa7;
    border-radius: 10px;
    padding: 20px;
    margin-bottom: 20px;
}

.auth-section h3 {
    color: #856404;
    margin-bottom: 15px;
    font-size: 1.1em;
}

.tooltip {
    position: relative;
    display: inline-block;
    margin-left: 5px;
    color: #6c757d;
    cursor: help;
}

.tooltip:hover::after {
    content: attr(data-tooltip);
    position: absolute;
    bottom: 125%;
    left: 50%;
    transform: translateX(-50%);
    background: #333;
    color: white;
    padding: 8px 12px;
    border-radius: 6px;
    font-size: 12px;
    white-space: nowrap;
    z-index: 1000;
    opacity: 1;
    transition: opacity 0.3s;
}

.tooltip::before {
    content: "?";
    font-size: 12px;
    font-weight: bold;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: #6c757d;
    color: white;
    display: inline-flex;
    align-items: center;
    justify-content: center;
}

.input-tabs {
    display: flex;
    margin-bottom: 20px;
    border-bottom: 2px solid #e9ecef;
    background: #f8f9fa;
    border-radius: 10px 10px 0 0;
    overflow: hidden;
}

.tab-button {
    flex: 1;
    padding: 12px 20px;
    background: transparent;
    border: none;
    color: #6c757d;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s ease;
    position: relative;
}

.tab-button:hover {
    background: rgba(52, 152, 219, 0.1);
    color: #3498db;
}

.tab-button.active {
    background: #3498db;
    color: white;
}

.tab-button.active::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    right: 0;
    height: 2px;
    background: #3498db;
}

.tab-content {
    display: none;
}

.tab-content.active {
    display: block;
}

.subscription-input-group {
    margin-bottom: 20px;
}

.input-with-button {
    display: flex;
    gap: 10px;
    align-items: flex-end;
}

.input-with-button input {
    flex: 1;
}

.fetch-button {
    background: linear-gradient(135deg, #e67e22 0%, #d35400 100%);
    color: white;
    border: none;
    padding: 12px 20px;
    border-radius: 10px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s ease;
    white-space: nowrap;
    min-width: 100px;
}

.fetch-button:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 15px rgba(230, 126, 34, 0.3);
}

.fetch-button:disabled {
    background: #95a5a6;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
}

.loading-spinner {
    display: inline-block;
    width: 16px;
    height: 16px;
    border: 2px solid #ffffff;
    border-radius: 50%;
    border-top-color: transparent;
    animation: spin 1s ease-in-out infinite;
    margin-right: 8px;
}

@keyframes spin {
    to { transform: rotate(360deg); }
}

/* \u8BA2\u9605URL\u533A\u57DF\u6837\u5F0F */
.subscribe-section {
    margin-top: 25px;
    padding: 20px;
    background: #f0f8ff;
    border-radius: 12px;
    border: 1px solid #b3d9ff;
    border-left: 4px solid #2196f3;
}

.subscribe-section h4 {
    color: #1976d2;
    margin: 0 0 15px 0;
    font-size: 1.2em;
    font-weight: 500;
}

.subscribe-url-container {
    margin-top: 10px;
}

.url-display {
    display: flex;
    gap: 10px;
    align-items: center;
    margin-bottom: 15px;
}

.subscribe-url-input {
    flex: 1;
    padding: 12px 16px;
    border: 2px solid #e1f5fe;
    border-radius: 8px;
    font-size: 13px;
    font-family: 'Monaco', 'Consolas', monospace;
    background: #ffffff;
    color: #424242;
    word-break: break-all;
    line-height: 1.4;
}

.subscribe-url-input:focus {
    outline: none;
    border-color: #2196f3;
    box-shadow: 0 0 0 3px rgba(33, 150, 243, 0.1);
}

.copy-url-btn {
    background: linear-gradient(135deg, #2196f3 0%, #1976d2 100%);
    color: white;
    border: none;
    padding: 12px 20px;
    border-radius: 8px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s ease;
    white-space: nowrap;
    font-size: 14px;
    min-width: 80px;
}

.copy-url-btn:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(33, 150, 243, 0.3);
    background: linear-gradient(135deg, #1976d2 0%, #2196f3 100%);
}

.copy-url-btn:active {
    transform: translateY(0);
}

.copy-url-btn.copied {
    background: linear-gradient(135deg, #4caf50 0%, #388e3c 100%);
    transform: scale(0.98);
}

.subscribe-usage-hint {
    background: rgba(33, 150, 243, 0.05);
    border-radius: 8px;
    padding: 15px;
    font-size: 13px;
    line-height: 1.6;
    color: #424242;
    border: 1px solid rgba(33, 150, 243, 0.1);
}

.subscribe-usage-hint strong {
    color: #1976d2;
    font-weight: 600;
}

@media (max-width: 768px) {
    .url-display {
        flex-direction: column;
        align-items: stretch;
    }
    
    .copy-url-btn {
        margin-top: 8px;
        width: 100%;
    }
    
    .subscribe-section {
        padding: 15px;
    }
}

.config-name-preview {
    margin-top: 8px;
    padding: 8px 12px;
    background: #f8f9fa;
    border: 1px solid #e9ecef;
    border-radius: 6px;
    font-size: 13px;
}

.config-name-preview small {
    color: #6c757d !important;
    font-family: 'Monaco', 'Consolas', monospace;
}

@media (max-width: 768px) {
    .layout {
        padding: 20px;
        margin: 10px;
    }
    
    h1 {
        font-size: 1.8em;
    }
    
    .form-row {
        flex-direction: column;
    }
    
    .form-col {
        min-width: unset;
    }
}

@media (max-width: 480px) {
    .bg {
        padding: 10px;
    }
    
    .layout {
        padding: 15px;
    }
    
    h1 {
        font-size: 1.5em;
    }
    
    .input-with-button {
        flex-direction: column;
        align-items: stretch;
    }
    
    .fetch-button {
        margin-top: 10px;
    }
}
</style>
</head>

<body>
<div class="bg">
<div class="layout">
<h1>Clash2Socks5 \u8F6C\u6362\u5DE5\u5177</h1>
<p class="content">
<strong>\u4E3A\u4EC0\u4E48\u8981\u5C06\u8282\u70B9\u8F6C SOCKS 5 \uFF1F</strong><br>

\u7531\u4E8E\u5927\u5BB6\u4F7F\u7528\u7684\u8282\u70B9\u7C7B\u578B\u975E\u5E38\u591A\uFF0C\u6BD4\u5982\uFF1AVMess,VLess,SS,SSR,Trojan,Clash,\u673A\u573A\u548C\u81EA\u5EFA\u8282\u70B9\u7B49\u3002\u6709\u4E9B\u8F6F\u4EF6\u4E0D\u652F\u6301\u4F7F\u7528\u8FD9\u4E9B\u8282\u70B9\uFF0C\u53EA\u652F\u6301 Socks5\u548Chttp\u4EE3\u7406\uFF0C\u6240\u4EE5\u9700\u8981\u5C06\u8FD9\u4E9B\u5E38\u7528\u7684\u8282\u70B9\u8F6C\u6210 Socks5\u4EE3\u7406\u5C31\u80FD\u4F7F\u7528\u4E86\u3002<br><br>

\u8282\u70B9\u8F6CSocks5\u4F7F\u7528\u6559\u7A0B\uFF1A\u25B6 <a href="https://youtu.be/Wm4JsJdvcXs" target="_blank">https://youtu.be/Wm4JsJdvcXs</a><br>
v2rayN\u8F6F\u4EF6\uFF1A<a href="https://github.com/2dust/v2rayN/releases/latest" target="_blank" rel="nofollow">\u70B9\u51FB\u4E0B\u8F7D>></a> \uFF0C <a href="https://github.com/2dust/v2rayN/releases/download/6.43/zz_v2rayN-With-Core-SelfContained.7z" target="_blank">\u65E7\u7248\u4E0B\u8F7D>></a><br>

\u672C\u5730\u8BA2\u9605\u8F6C\u6362\u5DE5\u5177\uFF1A<a href="dingyue.html" target="_blank">\u70B9\u51FB\u67E5\u770B>></a>\uFF08\u652F\u6301\u5176\u5B83\u8282\u70B9\u8F6CClash\u8BA2\u9605\uFF0C\u652F\u6301\u591A\u4E2AClash\u8BA2\u9605\u5408\u5E76\u4E3A\u4E00\u4E2AClash\u8BA2\u9605\uFF09

</p>

<h2>Clash2Socks5 \u8F6C\u6362\u5DE5\u5177</h2>

<!-- Tab \u5207\u6362\u754C\u9762 -->
<div class="input-tabs">
    <button class="tab-button active" data-tab="manual">\u{1F4DD} \u624B\u52A8\u8F93\u5165</button>
    <button class="tab-button" data-tab="subscription">\u{1F517} \u8BA2\u9605\u94FE\u63A5</button>
</div>

<!-- \u624B\u52A8\u8F93\u5165Tab -->
<div class="tab-content active" id="manual-tab">
    <div class="form-group">
        <label for="inputYAML">Clash\u914D\u7F6E\u6587\u4EF6 <span class="tooltip" data-tooltip="\u652F\u6301\u62D6\u62FD\u6587\u4EF6\u6216\u76F4\u63A5\u7C98\u8D34YAML\u5185\u5BB9"></span></label>
        <textarea id="inputYAML" rows="12" placeholder="\u5C06Clash\u914D\u7F6E\u6587\u4EF6\u62D6\u5230\u6B64\u5904\u6216\u5728\u6B64\u5904\u7C98\u8D34YAML\u5185\u5BB9..."></textarea>
    </div>
</div>

<!-- \u8BA2\u9605\u94FE\u63A5Tab -->
<div class="tab-content" id="subscription-tab">
    <div class="subscription-input-group">
        <label for="subscriptionUrl">\u8BA2\u9605\u94FE\u63A5 <span class="tooltip" data-tooltip="\u8F93\u5165Clash\u8BA2\u9605\u94FE\u63A5\u5730\u5740\uFF0C\u81EA\u52A8\u83B7\u53D6\u914D\u7F6E\u5185\u5BB9"></span></label>
        <div class="input-with-button">
            <input type="url" id="subscriptionUrl" placeholder="https://example.com/subscription" value="">
            <button type="button" id="fetchButton" class="fetch-button">
                <span class="fetch-text">\u{1F4E5} \u83B7\u53D6\u914D\u7F6E</span>
            </button>
        </div>
        <div style="margin-top: 10px; font-size: 12px; color: #666; line-height: 1.4;">
            \u{1F4A1} <strong>\u83B7\u53D6\u7B56\u7565\uFF1A</strong>\u670D\u52A1\u7AEF\u76F4\u63A5\u83B7\u53D6\uFF0C\u65E0CORS\u9650\u5236\uFF0C\u66F4\u7A33\u5B9A\u5FEB\u901F\u3002<br>
            \u{1F527} <strong>\u652F\u6301\u683C\u5F0F\uFF1A</strong>\u81EA\u52A8\u8BC6\u522BYAML\u3001Base64\u3001URL\u7F16\u7801\u7B49\u591A\u79CD\u683C\u5F0F\u3002
        </div>
    </div>
    <div class="form-group">
        <label for="subscriptionPreview">\u8BA2\u9605\u5185\u5BB9\u9884\u89C8</label>
        <textarea id="subscriptionPreview" rows="12" placeholder="\u83B7\u53D6\u8BA2\u9605\u5185\u5BB9\u540E\u5C06\u5728\u6B64\u5904\u663E\u793A..." readonly></textarea>
    </div>
</div>

<div class="auth-section">
    <h3>\u{1F510} Socks5\u8BA4\u8BC1\u914D\u7F6E</h3>
    <div class="form-row">
        <div class="form-col">
            <label for="socksUsername">\u7528\u6237\u540D</label>
            <input type="text" id="socksUsername" value="" placeholder="\u7559\u7A7A\u5219\u65E0\u9700\u8BA4\u8BC1">
        </div>
        <div class="form-col">
            <label for="socksPassword">\u5BC6\u7801</label>
            <input type="password" id="socksPassword" value="" placeholder="\u7559\u7A7A\u5219\u65E0\u9700\u8BA4\u8BC1">
        </div>
    </div>
</div>

<div class="form-group">
    <label for="configName">\u914D\u7F6E\u540D\u79F0 (\u53EF\u9009) <span class="tooltip" data-tooltip="\u81EA\u5B9A\u4E49\u914D\u7F6E\u6587\u4EF6\u540D\u79F0\uFF0C\u7559\u7A7A\u4F7F\u7528\u9ED8\u8BA4\u540D\u79F0"></span></label>
    <input type="text" id="configName" placeholder="\u7559\u7A7A\u4F7F\u7528\u9ED8\u8BA4\u540D\u79F0: clash2socks5" maxlength="30">
    <div class="config-name-preview">
        <small id="namePreview" style="color: #666; font-style: italic;">\u9884\u89C8: clash2socks5-250912</small>
    </div>
</div>

<div class="form-row">
    <div class="form-col">
        <label for="startPort">\u8D77\u59CB\u7AEF\u53E3 <span class="tooltip" data-tooltip="\u4E3A\u6BCF\u4E2A\u8282\u70B9\u5206\u914D\u7684\u8D77\u59CB\u7AEF\u53E3\u53F7"></span></label>
        <input type="number" id="startPort" min="1" max="65535" step="1" value="42000" placeholder="42000">
    </div>
</div>

<button class="btn" id="processButton">\u{1F680} \u751F\u6210Socks5\u914D\u7F6E\u6587\u4EF6</button>
<div class="result-section">
    <h3>\u{1F4CA} \u8F6C\u6362\u7ED3\u679C</h3>
    <div id="infoDiv"></div>
    <div class="form-group">
        <label for="outputYAML">\u751F\u6210\u7684\u914D\u7F6E\u6587\u4EF6\u5185\u5BB9</label>
        <textarea id="outputYAML" rows="12" placeholder="\u8F6C\u6362\u6210\u529F\u540E\uFF0C\u8FD9\u91CC\u5C06\u663E\u793A\u751F\u6210\u7684YAML\u914D\u7F6E\u5185\u5BB9..." readonly></textarea>
    </div>
    <div id="outputDiv"></div>
    
    <!-- \u8BA2\u9605URL\u533A\u57DF -->
    <div id="subscribeSection" class="subscribe-section" style="display: none;">
        <h4>\u{1F517} \u4E00\u952E\u8BA2\u9605\u5730\u5740</h4>
        <div class="subscribe-url-container">
            <div class="url-display">
                <input type="text" id="subscribeUrl" class="subscribe-url-input" readonly placeholder="\u8BA2\u9605URL\u5C06\u5728\u8FD9\u91CC\u663E\u793A...">
                <button type="button" id="copyUrlButton" class="copy-url-btn">\u{1F4CB} \u590D\u5236</button>
            </div>
            <div class="subscribe-usage-hint">
                \u{1F4A1} <strong>\u4F7F\u7528\u65B9\u6CD5\uFF1A</strong><br>
                \u2022 <strong>\u5BA2\u6237\u7AEF\u8F6F\u4EF6\uFF1A</strong>\u5C06\u6B64URL\u914D\u7F6E\u4E3A\u8BA2\u9605\u5730\u5740\uFF0C\u5B9E\u73B0\u81EA\u52A8\u66F4\u65B0<br>
                \u2022 <strong>\u6D4F\u89C8\u5668\u8BBF\u95EE\uFF1A</strong>\u76F4\u63A5\u8BBF\u95EE\u6B64URL\u53EF\u4E0B\u8F7D\u6700\u65B0\u914D\u7F6E\u6587\u4EF6<br>
                \u2022 <strong>\u811A\u672C\u8C03\u7528\uFF1A</strong>\u53EF\u7528\u4E8E\u81EA\u52A8\u5316\u83B7\u53D6\u914D\u7F6E\u6587\u4EF6
            </div>
        </div>
    </div>
</div>
</div>
</div>

<script src="https://cdnjs.cloudflare.com/ajax/libs/js-yaml/4.1.0/js-yaml.min.js"><\/script>
<script>
// \u914D\u7F6E\u547D\u540D\u670D\u52A1\u7C7B
class ConfigNamingService {
    /**
     * \u751F\u6210\u914D\u7F6E\u6587\u4EF6\u540D\u79F0
     * @param {string} customName - \u7528\u6237\u81EA\u5B9A\u4E49\u540D\u79F0
     * @param {Date} date - \u65E5\u671F\u5BF9\u8C61\uFF0C\u9ED8\u8BA4\u5F53\u524D\u65E5\u671F
     * @returns {string} \u683C\u5F0F\u5316\u540E\u7684\u6587\u4EF6\u540D
     */
    generateFileName(customName = '', date = new Date()) {
        const baseName = this.sanitizeInput(customName) || 'clash2socks5';
        const dateStr = this.formatDate(date);
        return baseName + '-' + dateStr;
    }

    /**
     * \u6E05\u7406\u548C\u9A8C\u8BC1\u7528\u6237\u8F93\u5165
     * @param {string} input - \u7528\u6237\u8F93\u5165
     * @returns {string} \u6E05\u7406\u540E\u7684\u8F93\u5165
     */
    sanitizeInput(input) {
        if (!input || typeof input !== 'string') return '';
        
        return input
            .trim()                           // \u79FB\u9664\u9996\u5C3E\u7A7A\u683C
            .replace(/[<>:"/\\|?*]/g, '')    // \u79FB\u9664\u6587\u4EF6\u7CFB\u7EDF\u7279\u6B8A\u5B57\u7B26
            .replace(/s+/g, '-')            // \u7A7A\u683C\u8F6C\u6362\u4E3A\u8FDE\u5B57\u7B26
            .replace(/[^w\u4E00-\u9FA5-]/g, '') // \u53EA\u4FDD\u7559\u5B57\u6BCD\u3001\u6570\u5B57\u3001\u4E2D\u6587\u548C\u8FDE\u5B57\u7B26
            .substring(0, 20);               // \u9650\u5236\u957F\u5EA6
    }

    /**
     * \u683C\u5F0F\u5316\u65E5\u671F\u4E3A YYMMDD \u683C\u5F0F
     * @param {Date} date - \u65E5\u671F\u5BF9\u8C61
     * @returns {string} \u683C\u5F0F\u5316\u7684\u65E5\u671F\u5B57\u7B26\u4E32
     */
    formatDate(date) {
        const year = date.getFullYear().toString().slice(-2);
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        return year + month + day;
    }

    /**
     * \u751F\u6210\u9884\u89C8\u540D\u79F0
     * @param {string} customName - \u7528\u6237\u8F93\u5165\u7684\u81EA\u5B9A\u4E49\u540D\u79F0
     * @returns {string} \u9884\u89C8\u6587\u4EF6\u540D
     */
    generatePreview(customName = '') {
        return this.generateFileName(customName);
    }
}

// Modern JavaScript implementation without jQuery dependency
class ClashConverter {
    constructor() {
        this.initializeEventListeners();
        this.nodeFilter = this.createNodeFilter();
        
        // \u786E\u4FDDConfigNamingService\u6B63\u786E\u521D\u59CB\u5316
        try {
            this.namingService = new ConfigNamingService();
            console.log('\u2705 ConfigNamingService\u521D\u59CB\u5316\u6210\u529F');
        } catch (error) {
            console.error('\u274C ConfigNamingService\u521D\u59CB\u5316\u5931\u8D25:', error);
            // \u521B\u5EFA\u4E00\u4E2A\u7B80\u5355\u7684\u56DE\u9000\u5B9E\u73B0
            this.namingService = this.createFallbackNamingService();
        }
    }

    initializeEventListeners() {
        // Tab switching
        document.querySelectorAll('.tab-button').forEach(button => {
            button.addEventListener('click', (e) => this.switchTab(e));
        });

        // Fetch subscription
        document.getElementById('fetchButton').addEventListener('click', () => this.fetchSubscription());
        document.getElementById('subscriptionUrl').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.fetchSubscription();
        });

        // Process button
        document.getElementById('processButton').addEventListener('click', () => this.processConfig());

        // Config name input with real-time preview
        const configNameInput = document.getElementById('configName');
        configNameInput.addEventListener('input', (e) => this.updateNamePreview(e.target.value));
        configNameInput.addEventListener('blur', (e) => this.updateNamePreview(e.target.value));
        
        // Initialize default preview
        this.updateNamePreview('');

        // File drag and drop
        const inputYAML = document.getElementById('inputYAML');
        inputYAML.addEventListener('dragover', (e) => this.handleDragOver(e));
        inputYAML.addEventListener('drop', (e) => this.handleDrop(e));
        inputYAML.addEventListener('dragleave', (e) => this.handleDragLeave(e));
    }

    switchTab(e) {
        const tabType = e.target.dataset.tab;
        
        // Update buttons
        document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
        e.target.classList.add('active');
        
        // Update content
        document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
        document.getElementById(tabType + '-tab').classList.add('active');
        
        // Clear status
        this.clearResults();
    }

    clearResults() {
        const infoDiv = document.getElementById('infoDiv');
        infoDiv.className = '';
        infoDiv.innerHTML = '';
        document.getElementById('outputDiv').innerHTML = '';
        document.getElementById('outputYAML').value = '';
        this.clearSubscribeUrl();
    }

    /**
     * \u66F4\u65B0\u914D\u7F6E\u540D\u79F0\u9884\u89C8
     * @param {string} customName - \u7528\u6237\u8F93\u5165\u7684\u81EA\u5B9A\u4E49\u540D\u79F0
     */
    updateNamePreview(customName) {
        const previewElement = document.getElementById('namePreview');
        if (previewElement && this.namingService) {
            try {
                const previewName = this.namingService.generatePreview(customName);
                previewElement.textContent = '\u9884\u89C8: ' + previewName;
                
                // \u5982\u679C\u7528\u6237\u8F93\u5165\u4E86\u81EA\u5B9A\u4E49\u540D\u79F0\uFF0C\u9AD8\u4EAE\u663E\u793A
                if (customName && customName.trim()) {
                    previewElement.style.color = '#2c3e50';
                    previewElement.style.fontWeight = '500';
                } else {
                    previewElement.style.color = '#6c757d';
                    previewElement.style.fontWeight = 'normal';
                }
            } catch (error) {
                console.error('\u9884\u89C8\u751F\u6210\u5931\u8D25:', error);
                previewElement.textContent = '\u9884\u89C8: clash2socks5-250912';
            }
        }
    }

    async fetchSubscription() {
        const url = document.getElementById('subscriptionUrl').value.trim();
        const button = document.getElementById('fetchButton');
        const buttonText = button.querySelector('.fetch-text');
        const infoDiv = document.getElementById('infoDiv');

        if (!url) {
            this.showError('\u26A0\uFE0F \u8BF7\u8F93\u5165\u8BA2\u9605\u94FE\u63A5\u5730\u5740\uFF01');
            return;
        }

        // Show loading state
        button.disabled = true;
        buttonText.innerHTML = '<span class="loading-spinner"></span>\u83B7\u53D6\u4E2D...';
        this.showInfo('\u{1F680} \u6B63\u5728\u83B7\u53D6\u8BA2\u9605\u5185\u5BB9...');
        document.getElementById('subscriptionPreview').value = '';

        try {
            const response = await fetch('/api/fetch', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ url })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || '\u83B7\u53D6\u5931\u8D25');
            }

            // Display content
            document.getElementById('subscriptionPreview').value = data.content;
            document.getElementById('inputYAML').value = data.content;

            this.showSuccess('\u2705 \u6210\u529F\u83B7\u53D6\u8BA2\u9605\u5185\u5BB9\uFF01\u683C\u5F0F\uFF1A' + (data.format || 'YAML') + '\uFF0C\u5927\u5C0F\uFF1A' + data.content.length + ' \u5B57\u7B26<br>\u26A1 \u670D\u52A1\u7AEF\u83B7\u53D6\uFF0C\u65E0CORS\u9650\u5236');

        } catch (error) {
            console.error('\u8BA2\u9605\u83B7\u53D6\u5931\u8D25:', error);
            this.showError('\u274C \u83B7\u53D6\u8BA2\u9605\u5931\u8D25\uFF1A' + error.message);
        } finally {
            button.disabled = false;
            buttonText.innerHTML = '\u{1F4E5} \u83B7\u53D6\u914D\u7F6E';
        }
    }

    async processConfig() {
        const inputYAML = document.getElementById('inputYAML').value;
        const startPort = parseInt(document.getElementById('startPort').value);
        const socksUsername = document.getElementById('socksUsername').value.trim();
        const socksPassword = document.getElementById('socksPassword').value.trim();
        const customConfigName = document.getElementById('configName').value.trim();

        this.clearResults();

        // Validation
        if (!inputYAML.trim()) {
            this.showError('\u26A0\uFE0F \u8BF7\u8F93\u5165\u6216\u83B7\u53D6Clash\u914D\u7F6E\u6587\u4EF6\u5185\u5BB9\uFF01');
            return;
        }

        if (!startPort || startPort < 1 || startPort > 65535) {
            this.showError('\u26A0\uFE0F \u8BF7\u8F93\u5165\u6709\u6548\u7684\u7AEF\u53E3\u53F7\uFF081-65535\uFF09\uFF01');
            return;
        }

        const hasUsername = socksUsername.length > 0;
        const hasPassword = socksPassword.length > 0;

        if (hasUsername !== hasPassword) {
            this.showError('\u26A0\uFE0F \u7528\u6237\u540D\u548C\u5BC6\u7801\u5FC5\u987B\u540C\u65F6\u586B\u5199\u6216\u540C\u65F6\u7559\u7A7A\uFF01');
            return;
        }

        try {
            const response = await fetch('/api/convert', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    content: inputYAML,
                    startPort,
                    auth: hasUsername ? { username: socksUsername, password: socksPassword } : null,
                    configName: customConfigName
                })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || '\u8F6C\u6362\u5931\u8D25');
            }

            // Display results
            document.getElementById('outputYAML').value = data.config;

            // Create download link with custom filename
            const blob = new Blob([data.config], { type: 'text/yaml' });
            const downloadLink = document.createElement('a');
            downloadLink.href = URL.createObjectURL(blob);
            
            // Generate custom filename with safety check
            let fileName;
            try {
                if (this.namingService && this.namingService.generateFileName) {
                    fileName = this.namingService.generateFileName(customConfigName);
                } else {
                    // \u4F7F\u7528\u56DE\u9000\u547D\u540D\u903B\u8F91
                    const baseName = this.sanitizeName(customConfigName) || 'clash2socks5';
                    const dateStr = this.formatDateString();
                    fileName = baseName + '-' + dateStr;
                }
            } catch (error) {
                console.error('\u6587\u4EF6\u540D\u751F\u6210\u5931\u8D25:', error);
                fileName = 'clash2socks5-250912';
            }
            
            downloadLink.download = fileName + '.yaml';
            downloadLink.textContent = '\u{1F4E5} \u70B9\u51FB\u4E0B\u8F7D\u751F\u6210\u7684Socks5\u914D\u7F6E\u6587\u4EF6 (' + fileName + '.yaml)';

            const outputDiv = document.getElementById('outputDiv');
            outputDiv.innerHTML = '';
            outputDiv.appendChild(downloadLink);

            // Show success message
            const authInfo = hasUsername ? ', \u8BA4\u8BC1\uFF1A' + socksUsername + '/' + socksPassword : '\uFF0C\u65E0\u9700\u8BA4\u8BC1';
            let message = '\u2705 \u6210\u529F\u8F6C\u6362 ' + data.validNodes + ' \u4E2A\u6709\u6548\u8282\u70B9\uFF01\u7AEF\u53E3\u8303\u56F4\uFF1A' + startPort + ' - ' + (startPort + data.validNodes - 1) + authInfo;
            
            if (data.filteredNodes > 0) {
                message += '<br>\u{1F9F9} \u5DF2\u8FC7\u6EE4 ' + data.filteredNodes + ' \u6761\u975E\u8282\u70B9\u4FE1\u606F';
            }

            this.showSuccess(message);

            // Generate and display subscribe URL
            this.generateAndShowSubscribeUrl({
                subscriptionUrl: this.getCurrentSubscriptionUrl(),
                startPort,
                hasAuth: hasUsername,
                username: socksUsername,
                password: socksPassword,
                configName: customConfigName
            });

        } catch (error) {
            console.error('\u8F6C\u6362\u9519\u8BEF:', error);
            this.showError('\u274C \u914D\u7F6E\u8F6C\u6362\u5931\u8D25\uFF1A' + error.message);
        }
    }

    handleDragOver(e) {
        e.preventDefault();
        e.stopPropagation();
        e.target.classList.add('drag-over');
    }

    handleDrop(e) {
        e.preventDefault();
        e.stopPropagation();
        e.target.classList.remove('drag-over');
        
        const file = e.dataTransfer.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                document.getElementById('inputYAML').value = event.target.result;
            };
            reader.readAsText(file);
        }
    }

    handleDragLeave(e) {
        e.target.classList.remove('drag-over');
    }

    showError(message) {
        const infoDiv = document.getElementById('infoDiv');
        infoDiv.className = '';
        infoDiv.innerHTML = message;
    }

    showSuccess(message) {
        const infoDiv = document.getElementById('infoDiv');
        infoDiv.className = 'success';
        infoDiv.innerHTML = message;
    }

    showInfo(message) {
        const infoDiv = document.getElementById('infoDiv');
        infoDiv.className = '';
        infoDiv.innerHTML = message;
    }

    createNodeFilter() {
        const infoKeywords = [
            '\u5269\u4F59\u6D41\u91CF', '\u5DF2\u7528\u6D41\u91CF', '\u603B\u6D41\u91CF', '\u6D41\u91CF\u91CD\u7F6E', 'GB', 'MB', 'TB',
            '\u4E0A\u4F20', '\u4E0B\u8F7D', '\u6D41\u91CF\u7EDF\u8BA1', '\u6D41\u91CF\u67E5\u8BE2', '\u6D41\u91CF\u63D0\u9192',
            '\u5230\u671F\u65F6\u95F4', '\u5957\u9910\u5230\u671F', '\u8DDD\u79BB\u4E0B\u6B21\u91CD\u7F6E', '\u5269\u4F59\u5929\u6570', '\u6709\u6548\u671F', 
            '\u91CD\u7F6E\u65F6\u95F4', '\u7EED\u8D39', '\u8FC7\u671F', '\u5230\u671F',
            '\u5B98\u7F51', '\u5907\u7528\u5B98\u7F51', '\u5BA2\u670D', '\u8054\u7CFB', '\u7FA4\u7EC4', '\u9891\u9053', 
            'http', 'https', 'www.', '.com', '.cn', '.cc', '.net', '.org',
            'telegram', 'tg', 'qq\u7FA4', '\u5FAE\u4FE1\u7FA4',
            '\u5EFA\u8BAE', '\u63D0\u793A', '\u901A\u77E5', '\u516C\u544A', '\u8BF4\u660E', '\u6CE8\u610F',
            '\u4E13\u7EBF\u8282\u70B9', '\u4E2D\u8F6C\u8282\u70B9', '\u76F4\u8FDE\u8282\u70B9', '\u611F\u5230\u5361\u987F', '\u8BF7\u5207\u6362',
            '\u7EF4\u62A4', '\u5347\u7EA7', '\u6545\u969C', '\u4FEE\u590D',
            '\u8BA2\u9605\u94FE\u63A5', '\u8282\u70B9\u66F4\u65B0', '\u914D\u7F6E\u66F4\u65B0', '\u5957\u9910\u4FE1\u606F', 
            '\u4F1A\u5458\u7B49\u7EA7', '\u7528\u6237\u7B49\u7EA7', '\u8D26\u6237', '\u4F59\u989D'
        ];

        return {
            isInfoNode: function(proxy) {
                if (!proxy || !proxy.name) return true;
                
                const nodeName = proxy.name.toString();
                
                for (const keyword of infoKeywords) {
                    if (nodeName.includes(keyword)) return true;
                }
                
                if (!proxy.server || !proxy.port || !proxy.type) return true;
                
                return false;
            }
        };
    }

    /**
     * Get current subscription URL from the form
     * Enhanced to support both subscription and manual input workflows
     */
    getCurrentSubscriptionUrl() {
        // Try to get from subscription tab first
        const subscriptionUrl = document.getElementById('subscriptionUrl').value.trim();
        if (subscriptionUrl) {
            console.log('\u{1F517} \u4F7F\u7528\u8BA2\u9605\u94FE\u63A5\u6A21\u5F0F:', subscriptionUrl);
            return subscriptionUrl;
        }
        
        // Fallback: Check if manual input has content and create a pseudo-subscription URL
        const manualInput = document.getElementById('inputYAML').value.trim();
        if (manualInput) {
            // Create a special URL that indicates manual input mode
            // This allows URL generation for direct YAML input scenarios
            const pseudoUrl = window.location.origin + '/api/manual-input';
            console.log('\u{1F4DD} \u4F7F\u7528\u624B\u52A8\u8F93\u5165\u6A21\u5F0F\uFF0C\u751F\u6210\u4F2A\u8BA2\u9605URL:', pseudoUrl);
            return pseudoUrl;
        }
        
        console.warn('\u26A0\uFE0F \u6CA1\u6709\u627E\u5230\u8BA2\u9605\u94FE\u63A5\u6216\u624B\u52A8\u8F93\u5165\u5185\u5BB9');
        return null;
    }

    /**
     * Generate subscribe URL based on current form parameters
     * Enhanced to handle both subscription URLs and manual input
     */
    generateSubscribeUrl(params) {
        if (!params.subscriptionUrl) {
            console.warn('\u26A0\uFE0F \u65E0\u6CD5\u751F\u6210\u8BA2\u9605URL\uFF1A\u7F3A\u5C11\u8BA2\u9605\u94FE\u63A5');
            return null;
        }

        // \u5F3A\u5236\u4F7F\u7528 https \u534F\u8BAE\u751F\u6210\u8BA2\u9605\u5730\u5740\uFF08Cloudflare Workers \u9ED8\u8BA4\u652F\u6301 https\uFF09
        const baseUrl = window.location.origin.replace(/^http:/, 'https:');
        
        // Check if this is a manual input pseudo-URL
        if (params.subscriptionUrl.includes('/api/manual-input')) {
            console.log('\u{1F6E0}\uFE0F \u68C0\u6D4B\u5230\u624B\u52A8\u8F93\u5165\u6A21\u5F0F\uFF0C\u751F\u6210\u7279\u6B8A\u8BA2\u9605URL');
            // For manual input, we create a different URL structure
            // We'll use the current YAML content hash as identifier
            const inputContent = document.getElementById('inputYAML').value.trim();
            const contentHash = btoa(inputContent.substring(0, 100)); // Use first 100 chars as identifier
            
            const searchParams = new URLSearchParams({
                mode: 'manual',
                hash: contentHash
            });
            
            // Add port if not default
            if (params.startPort && params.startPort !== 42000) {
                searchParams.set('port', params.startPort.toString());
            }

            // Add auth if provided
            if (params.hasAuth && params.username && params.password) {
                const authString = params.username + ':' + params.password;
                searchParams.set('auth', btoa(authString));
            }

            // Add custom config name if provided
            if (params.configName && params.configName.trim()) {
                searchParams.set('filename', params.configName.trim());
            }

            return baseUrl + '/api/subscribe?' + searchParams.toString();
        }
        
        // Standard subscription URL processing
        const encodedUrl = btoa(params.subscriptionUrl);
        
        const searchParams = new URLSearchParams({
            url: encodedUrl
        });

        // Add port if not default
        if (params.startPort && params.startPort !== 42000) {
            searchParams.set('port', params.startPort.toString());
        }

        // Add auth if provided
        if (params.hasAuth && params.username && params.password) {
            const authString = params.username + ':' + params.password;
            searchParams.set('auth', btoa(authString));
        }

        // Add custom config name if provided
        if (params.configName && params.configName.trim()) {
            searchParams.set('filename', params.configName.trim());
        }

        console.log('\u2705 \u751F\u6210\u6807\u51C6\u8BA2\u9605URL:', baseUrl + '/api/subscribe?' + searchParams.toString());
        return baseUrl + '/api/subscribe?' + searchParams.toString();
    }

    /**
     * Generate and display subscribe URL
     * Enhanced with better user feedback and debugging
     */
    generateAndShowSubscribeUrl(params) {
        console.log('\u{1F680} \u5F00\u59CB\u751F\u6210\u8BA2\u9605URL\uFF0C\u53C2\u6570:', params);
        
        const subscribeUrl = this.generateSubscribeUrl(params);
        
        if (!subscribeUrl) {
            console.warn('\u26A0\uFE0F \u8BA2\u9605URL\u751F\u6210\u5931\u8D25\uFF0C\u9690\u85CF\u8BA2\u9605\u533A\u57DF');
            // Hide subscribe section if no subscription URL
            document.getElementById('subscribeSection').style.display = 'none';
            
            // Show user feedback
            this.showInfo('\u{1F4A1} \u63D0\u793A\uFF1A\u5F53\u524D\u6A21\u5F0F\u4E0B\u65E0\u6CD5\u751F\u6210\u8BA2\u9605URL\uFF0C\u8BF7\u4F7F\u7528\u8BA2\u9605\u94FE\u63A5\u6A21\u5F0F\u6216\u76F4\u63A5\u4E0B\u8F7D\u914D\u7F6E\u6587\u4EF6');
            return;
        }

        console.log('\u2705 \u8BA2\u9605URL\u751F\u6210\u6210\u529F:', subscribeUrl);

        // Show subscribe section
        const subscribeSection = document.getElementById('subscribeSection');
        const subscribeUrlInput = document.getElementById('subscribeUrl');
        
        subscribeUrlInput.value = subscribeUrl;
        subscribeSection.style.display = 'block';

        // Initialize copy functionality
        this.initializeCopyFunction();
        
        // Add success feedback
        console.log('\u{1F389} \u8BA2\u9605URL\u5C55\u793A\u5B8C\u6210');
    }

    /**
     * Initialize copy URL functionality
     */
    initializeCopyFunction() {
        const copyButton = document.getElementById('copyUrlButton');
        const urlInput = document.getElementById('subscribeUrl');
        
        // Remove existing event listeners to avoid duplicates
        copyButton.replaceWith(copyButton.cloneNode(true));
        const newCopyButton = document.getElementById('copyUrlButton');
        
        newCopyButton.addEventListener('click', async () => {
            try {
                await navigator.clipboard.writeText(urlInput.value);
                
                // Visual feedback
                const originalText = newCopyButton.textContent;
                newCopyButton.textContent = '\u2705 \u5DF2\u590D\u5236';
                newCopyButton.classList.add('copied');
                
                setTimeout(() => {
                    newCopyButton.textContent = originalText;
                    newCopyButton.classList.remove('copied');
                }, 2000);
                
            } catch (error) {
                // Fallback for older browsers
                urlInput.select();
                document.execCommand('copy');
                
                const originalText = newCopyButton.textContent;
                newCopyButton.textContent = '\u2705 \u5DF2\u590D\u5236';
                newCopyButton.classList.add('copied');
                
                setTimeout(() => {
                    newCopyButton.textContent = originalText;
                    newCopyButton.classList.remove('copied');
                }, 2000);
            }
        });
    }

    /**
     * Clear subscribe URL section
     */
    clearSubscribeUrl() {
        document.getElementById('subscribeSection').style.display = 'none';
        document.getElementById('subscribeUrl').value = '';
    }

    /**
     * \u521B\u5EFA\u56DE\u9000\u547D\u540D\u670D\u52A1
     * \u5F53ConfigNamingService\u521D\u59CB\u5316\u5931\u8D25\u65F6\u4F7F\u7528
     */
    createFallbackNamingService() {
        console.log('\u{1F504} \u521B\u5EFA\u56DE\u9000\u547D\u540D\u670D\u52A1');
        return {
            generateFileName: (customName = '', date = new Date()) => {
                // \u7B80\u5355\u7684\u6587\u4EF6\u540D\u751F\u6210\u903B\u8F91
                const baseName = this.sanitizeName(customName) || 'clash2socks5';
                const dateStr = this.formatDateString(date);
                return baseName + '-' + dateStr;
            },
            generatePreview: (customName = '') => {
                const baseName = this.sanitizeName(customName) || 'clash2socks5';
                const dateStr = this.formatDateString();
                return baseName + '-' + dateStr;
            }
        };
    }

    /**
     * \u7B80\u5355\u7684\u540D\u79F0\u6E05\u7406\u51FD\u6570
     */
    sanitizeName(input) {
        if (!input || typeof input !== 'string') return '';
        return input
            .trim()
            .replace(/[<>:"/\\|?*]/g, '')
            .replace(/s+/g, '-')
            .replace(/[^w\u4E00-\u9FA5-]/g, '')
            .substring(0, 20);
    }

    /**
     * \u7B80\u5355\u7684\u65E5\u671F\u683C\u5F0F\u5316\u51FD\u6570
     */
    formatDateString(date = new Date()) {
        const year = date.getFullYear().toString().slice(-2);
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        return year + month + day;
    }
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ClashConverter();
});
<\/script>

</body>
</html>`;

// src/handlers/static.js
async function handleStatic(request, env, ctx) {
  const url = new URL(request.url);
  const path = url.pathname;
  if (path === "/" || path === "/index.html") {
    const response = new Response(indexHTML, {
      headers: {
        "Content-Type": "text/html;charset=UTF-8",
        "Cache-Control": "public, max-age=3600"
      }
    });
    return addCORSHeaders(response);
  }
  return new Response("Not Found", {
    status: 404,
    headers: { "Content-Type": "text/plain" }
  });
}
__name(handleStatic, "handleStatic");

// src/services/subscription.js
async function fetchSubscription(url, env) {
  let validUrl;
  try {
    validUrl = new URL(url);
    if (!["http:", "https:"].includes(validUrl.protocol)) {
      throw new Error("\u4EC5\u652F\u6301HTTP\u548CHTTPS\u534F\u8BAE");
    }
    const hostname = validUrl.hostname.toLowerCase();
    const blockedDomains = ["localhost", "127.0.0.1", "0.0.0.0", "::1"];
    if (blockedDomains.some((domain) => hostname.includes(domain))) {
      throw new Error("\u4E0D\u5141\u8BB8\u8BBF\u95EE\u672C\u5730\u5730\u5740");
    }
  } catch (error) {
    if (error.name === "TypeError") {
      throw new Error("URL\u683C\u5F0F\u65E0\u6548");
    }
    throw error;
  }
  const userAgents = [
    "clash.meta/v1.19.13",
    "clash",
    "mihomo"
  ];
  let lastError = null;
  for (const userAgent of userAgents) {
    try {
      console.log(`Attempting to fetch with UA: ${userAgent}`);
      const response = await fetch(validUrl.href, {
        headers: {
          "User-Agent": userAgent,
          "Accept": "text/yaml,application/x-yaml,text/plain,*/*",
          "Cache-Control": "no-cache"
        }
      });
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      const content = await response.text();
      if (!content || content.trim().length === 0) {
        throw new Error("\u83B7\u53D6\u5230\u7684\u5185\u5BB9\u4E3A\u7A7A");
      }
      const processed = processContent(content);
      const subscriptionHeaders = {};
      const headerKeys = [
        "subscription-userinfo",
        "profile-update-interval",
        "profile-web-page-url",
        "profile-title",
        "content-disposition"
      ];
      for (const key of headerKeys) {
        const value = response.headers.get(key);
        if (value) {
          subscriptionHeaders[key] = value;
        }
      }
      console.log(`Successfully fetched subscription: ${content.length} chars`);
      return {
        content: processed.content,
        format: processed.format,
        originalFormat: processed.originalFormat,
        size: processed.content.length,
        subscriptionHeaders
      };
    } catch (error) {
      lastError = error;
      console.log(`Failed with UA ${userAgent}: ${error.message}`);
      continue;
    }
  }
  throw new Error(`\u8BA2\u9605\u83B7\u53D6\u5931\u8D25: ${lastError.message}`);
}
__name(fetchSubscription, "fetchSubscription");
function processContent(content) {
  const trimmed = content.trim();
  const format = detectFormat(trimmed);
  switch (format.format) {
    case "yaml":
      return { content: trimmed, format: "yaml", processed: true };
    case "base64":
      try {
        const decoded = atob(trimmed);
        if (isYamlFormat(decoded)) {
          return { content: decoded, format: "yaml", originalFormat: "base64", processed: true };
        }
        if (decoded.includes("://")) {
          const clashConfig = convertProxyLinksToClash(decoded);
          return { content: clashConfig, format: "yaml", originalFormat: "proxy-links", processed: true };
        }
        return { content: decoded, format: "text", processed: true };
      } catch (error) {
        throw new Error("Base64\u89E3\u7801\u5931\u8D25: " + error.message);
      }
    case "url-encoded":
      try {
        const decoded = decodeURIComponent(trimmed);
        return { content: decoded, format: "yaml", processed: true };
      } catch (error) {
        throw new Error("URL\u89E3\u7801\u5931\u8D25: " + error.message);
      }
    default:
      return { content: trimmed, format: "unknown", processed: false };
  }
}
__name(processContent, "processContent");
function detectFormat(content) {
  if (!content || typeof content !== "string") {
    return { format: "unknown", confidence: 0 };
  }
  if (isYamlFormat(content)) {
    return { format: "yaml", confidence: 0.9 };
  }
  if (isBase64Format(content)) {
    return { format: "base64", confidence: 0.8 };
  }
  if (content.includes("%") && content.length > 50) {
    return { format: "url-encoded", confidence: 0.7 };
  }
  return { format: "unknown", confidence: 0 };
}
__name(detectFormat, "detectFormat");
function isYamlFormat(content) {
  const yamlIndicators = [
    "proxies:",
    "proxy-groups:",
    "rules:",
    "- name:",
    "  server:",
    "  type:",
    "  port:"
  ];
  return yamlIndicators.some((indicator) => content.includes(indicator));
}
__name(isYamlFormat, "isYamlFormat");
function isBase64Format(content) {
  const base64Pattern = /^[A-Za-z0-9+/]+=*$/;
  const lines = content.split("\\n").map((line) => line.trim()).filter((line) => line);
  if (lines.length > 1) {
    return lines.every((line) => base64Pattern.test(line));
  }
  return base64Pattern.test(content) && content.length > 50;
}
__name(isBase64Format, "isBase64Format");
function convertProxyLinksToClash(proxyLinksText) {
  const lines = proxyLinksText.split("\\n").map((line) => line.trim()).filter((line) => line);
  const proxies = [];
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.startsWith("hysteria2://")) {
      try {
        const url = new URL(line);
        const name = decodeURIComponent(url.hash.substring(1)) || `Hy2-${i + 1}`;
        const server = url.hostname;
        const port = parseInt(url.port) || 443;
        const password = url.username;
        proxies.push({
          name,
          type: "hysteria2",
          server,
          port,
          password,
          "skip-cert-verify": true
        });
      } catch (error) {
        console.warn(`Failed to parse Hysteria2 link: ${line}`, error);
      }
    }
  }
  if (proxies.length === 0) {
    throw new Error("\u65E0\u6CD5\u4ECE\u4EE3\u7406\u94FE\u63A5\u4E2D\u89E3\u6790\u51FA\u6709\u6548\u8282\u70B9");
  }
  const clashConfig = {
    proxies,
    "proxy-groups": [{
      name: "PROXY",
      type: "select",
      proxies: proxies.map((p) => p.name)
    }],
    rules: ["MATCH,PROXY"]
  };
  return convertToYAML(clashConfig);
}
__name(convertProxyLinksToClash, "convertProxyLinksToClash");
function convertToYAML(obj) {
  let yaml = "";
  for (const [key, value] of Object.entries(obj)) {
    yaml += `${key}:
`;
    if (Array.isArray(value)) {
      for (const item of value) {
        if (typeof item === "object") {
          yaml += `  - `;
          for (const [itemKey, itemValue] of Object.entries(item)) {
            yaml += `${itemKey}: ${itemValue}
    `;
          }
          yaml = yaml.slice(0, -4) + "\n";
        } else {
          yaml += `  - ${item}
`;
        }
      }
    } else if (typeof value === "object") {
      for (const [subKey, subValue] of Object.entries(value)) {
        yaml += `  ${subKey}: ${subValue}
`;
      }
    } else {
      yaml += `  ${value}
`;
    }
  }
  return yaml;
}
__name(convertToYAML, "convertToYAML");

// node_modules/js-yaml/dist/js-yaml.mjs
function isNothing(subject) {
  return typeof subject === "undefined" || subject === null;
}
__name(isNothing, "isNothing");
function isObject(subject) {
  return typeof subject === "object" && subject !== null;
}
__name(isObject, "isObject");
function toArray(sequence) {
  if (Array.isArray(sequence))
    return sequence;
  else if (isNothing(sequence))
    return [];
  return [sequence];
}
__name(toArray, "toArray");
function extend(target, source) {
  var index, length, key, sourceKeys;
  if (source) {
    sourceKeys = Object.keys(source);
    for (index = 0, length = sourceKeys.length; index < length; index += 1) {
      key = sourceKeys[index];
      target[key] = source[key];
    }
  }
  return target;
}
__name(extend, "extend");
function repeat(string, count) {
  var result = "", cycle;
  for (cycle = 0; cycle < count; cycle += 1) {
    result += string;
  }
  return result;
}
__name(repeat, "repeat");
function isNegativeZero(number) {
  return number === 0 && Number.NEGATIVE_INFINITY === 1 / number;
}
__name(isNegativeZero, "isNegativeZero");
var isNothing_1 = isNothing;
var isObject_1 = isObject;
var toArray_1 = toArray;
var repeat_1 = repeat;
var isNegativeZero_1 = isNegativeZero;
var extend_1 = extend;
var common = {
  isNothing: isNothing_1,
  isObject: isObject_1,
  toArray: toArray_1,
  repeat: repeat_1,
  isNegativeZero: isNegativeZero_1,
  extend: extend_1
};
function formatError(exception2, compact) {
  var where = "", message = exception2.reason || "(unknown reason)";
  if (!exception2.mark)
    return message;
  if (exception2.mark.name) {
    where += 'in "' + exception2.mark.name + '" ';
  }
  where += "(" + (exception2.mark.line + 1) + ":" + (exception2.mark.column + 1) + ")";
  if (!compact && exception2.mark.snippet) {
    where += "\n\n" + exception2.mark.snippet;
  }
  return message + " " + where;
}
__name(formatError, "formatError");
function YAMLException$1(reason, mark) {
  Error.call(this);
  this.name = "YAMLException";
  this.reason = reason;
  this.mark = mark;
  this.message = formatError(this, false);
  if (Error.captureStackTrace) {
    Error.captureStackTrace(this, this.constructor);
  } else {
    this.stack = new Error().stack || "";
  }
}
__name(YAMLException$1, "YAMLException$1");
YAMLException$1.prototype = Object.create(Error.prototype);
YAMLException$1.prototype.constructor = YAMLException$1;
YAMLException$1.prototype.toString = /* @__PURE__ */ __name(function toString(compact) {
  return this.name + ": " + formatError(this, compact);
}, "toString");
var exception = YAMLException$1;
function getLine(buffer, lineStart, lineEnd, position, maxLineLength) {
  var head = "";
  var tail = "";
  var maxHalfLength = Math.floor(maxLineLength / 2) - 1;
  if (position - lineStart > maxHalfLength) {
    head = " ... ";
    lineStart = position - maxHalfLength + head.length;
  }
  if (lineEnd - position > maxHalfLength) {
    tail = " ...";
    lineEnd = position + maxHalfLength - tail.length;
  }
  return {
    str: head + buffer.slice(lineStart, lineEnd).replace(/\t/g, "\u2192") + tail,
    pos: position - lineStart + head.length
    // relative position
  };
}
__name(getLine, "getLine");
function padStart(string, max) {
  return common.repeat(" ", max - string.length) + string;
}
__name(padStart, "padStart");
function makeSnippet(mark, options) {
  options = Object.create(options || null);
  if (!mark.buffer)
    return null;
  if (!options.maxLength)
    options.maxLength = 79;
  if (typeof options.indent !== "number")
    options.indent = 1;
  if (typeof options.linesBefore !== "number")
    options.linesBefore = 3;
  if (typeof options.linesAfter !== "number")
    options.linesAfter = 2;
  var re = /\r?\n|\r|\0/g;
  var lineStarts = [0];
  var lineEnds = [];
  var match;
  var foundLineNo = -1;
  while (match = re.exec(mark.buffer)) {
    lineEnds.push(match.index);
    lineStarts.push(match.index + match[0].length);
    if (mark.position <= match.index && foundLineNo < 0) {
      foundLineNo = lineStarts.length - 2;
    }
  }
  if (foundLineNo < 0)
    foundLineNo = lineStarts.length - 1;
  var result = "", i, line;
  var lineNoLength = Math.min(mark.line + options.linesAfter, lineEnds.length).toString().length;
  var maxLineLength = options.maxLength - (options.indent + lineNoLength + 3);
  for (i = 1; i <= options.linesBefore; i++) {
    if (foundLineNo - i < 0)
      break;
    line = getLine(
      mark.buffer,
      lineStarts[foundLineNo - i],
      lineEnds[foundLineNo - i],
      mark.position - (lineStarts[foundLineNo] - lineStarts[foundLineNo - i]),
      maxLineLength
    );
    result = common.repeat(" ", options.indent) + padStart((mark.line - i + 1).toString(), lineNoLength) + " | " + line.str + "\n" + result;
  }
  line = getLine(mark.buffer, lineStarts[foundLineNo], lineEnds[foundLineNo], mark.position, maxLineLength);
  result += common.repeat(" ", options.indent) + padStart((mark.line + 1).toString(), lineNoLength) + " | " + line.str + "\n";
  result += common.repeat("-", options.indent + lineNoLength + 3 + line.pos) + "^\n";
  for (i = 1; i <= options.linesAfter; i++) {
    if (foundLineNo + i >= lineEnds.length)
      break;
    line = getLine(
      mark.buffer,
      lineStarts[foundLineNo + i],
      lineEnds[foundLineNo + i],
      mark.position - (lineStarts[foundLineNo] - lineStarts[foundLineNo + i]),
      maxLineLength
    );
    result += common.repeat(" ", options.indent) + padStart((mark.line + i + 1).toString(), lineNoLength) + " | " + line.str + "\n";
  }
  return result.replace(/\n$/, "");
}
__name(makeSnippet, "makeSnippet");
var snippet = makeSnippet;
var TYPE_CONSTRUCTOR_OPTIONS = [
  "kind",
  "multi",
  "resolve",
  "construct",
  "instanceOf",
  "predicate",
  "represent",
  "representName",
  "defaultStyle",
  "styleAliases"
];
var YAML_NODE_KINDS = [
  "scalar",
  "sequence",
  "mapping"
];
function compileStyleAliases(map2) {
  var result = {};
  if (map2 !== null) {
    Object.keys(map2).forEach(function(style) {
      map2[style].forEach(function(alias) {
        result[String(alias)] = style;
      });
    });
  }
  return result;
}
__name(compileStyleAliases, "compileStyleAliases");
function Type$1(tag, options) {
  options = options || {};
  Object.keys(options).forEach(function(name) {
    if (TYPE_CONSTRUCTOR_OPTIONS.indexOf(name) === -1) {
      throw new exception('Unknown option "' + name + '" is met in definition of "' + tag + '" YAML type.');
    }
  });
  this.options = options;
  this.tag = tag;
  this.kind = options["kind"] || null;
  this.resolve = options["resolve"] || function() {
    return true;
  };
  this.construct = options["construct"] || function(data) {
    return data;
  };
  this.instanceOf = options["instanceOf"] || null;
  this.predicate = options["predicate"] || null;
  this.represent = options["represent"] || null;
  this.representName = options["representName"] || null;
  this.defaultStyle = options["defaultStyle"] || null;
  this.multi = options["multi"] || false;
  this.styleAliases = compileStyleAliases(options["styleAliases"] || null);
  if (YAML_NODE_KINDS.indexOf(this.kind) === -1) {
    throw new exception('Unknown kind "' + this.kind + '" is specified for "' + tag + '" YAML type.');
  }
}
__name(Type$1, "Type$1");
var type = Type$1;
function compileList(schema2, name) {
  var result = [];
  schema2[name].forEach(function(currentType) {
    var newIndex = result.length;
    result.forEach(function(previousType, previousIndex) {
      if (previousType.tag === currentType.tag && previousType.kind === currentType.kind && previousType.multi === currentType.multi) {
        newIndex = previousIndex;
      }
    });
    result[newIndex] = currentType;
  });
  return result;
}
__name(compileList, "compileList");
function compileMap() {
  var result = {
    scalar: {},
    sequence: {},
    mapping: {},
    fallback: {},
    multi: {
      scalar: [],
      sequence: [],
      mapping: [],
      fallback: []
    }
  }, index, length;
  function collectType(type2) {
    if (type2.multi) {
      result.multi[type2.kind].push(type2);
      result.multi["fallback"].push(type2);
    } else {
      result[type2.kind][type2.tag] = result["fallback"][type2.tag] = type2;
    }
  }
  __name(collectType, "collectType");
  for (index = 0, length = arguments.length; index < length; index += 1) {
    arguments[index].forEach(collectType);
  }
  return result;
}
__name(compileMap, "compileMap");
function Schema$1(definition) {
  return this.extend(definition);
}
__name(Schema$1, "Schema$1");
Schema$1.prototype.extend = /* @__PURE__ */ __name(function extend2(definition) {
  var implicit = [];
  var explicit = [];
  if (definition instanceof type) {
    explicit.push(definition);
  } else if (Array.isArray(definition)) {
    explicit = explicit.concat(definition);
  } else if (definition && (Array.isArray(definition.implicit) || Array.isArray(definition.explicit))) {
    if (definition.implicit)
      implicit = implicit.concat(definition.implicit);
    if (definition.explicit)
      explicit = explicit.concat(definition.explicit);
  } else {
    throw new exception("Schema.extend argument should be a Type, [ Type ], or a schema definition ({ implicit: [...], explicit: [...] })");
  }
  implicit.forEach(function(type$1) {
    if (!(type$1 instanceof type)) {
      throw new exception("Specified list of YAML types (or a single Type object) contains a non-Type object.");
    }
    if (type$1.loadKind && type$1.loadKind !== "scalar") {
      throw new exception("There is a non-scalar type in the implicit list of a schema. Implicit resolving of such types is not supported.");
    }
    if (type$1.multi) {
      throw new exception("There is a multi type in the implicit list of a schema. Multi tags can only be listed as explicit.");
    }
  });
  explicit.forEach(function(type$1) {
    if (!(type$1 instanceof type)) {
      throw new exception("Specified list of YAML types (or a single Type object) contains a non-Type object.");
    }
  });
  var result = Object.create(Schema$1.prototype);
  result.implicit = (this.implicit || []).concat(implicit);
  result.explicit = (this.explicit || []).concat(explicit);
  result.compiledImplicit = compileList(result, "implicit");
  result.compiledExplicit = compileList(result, "explicit");
  result.compiledTypeMap = compileMap(result.compiledImplicit, result.compiledExplicit);
  return result;
}, "extend");
var schema = Schema$1;
var str = new type("tag:yaml.org,2002:str", {
  kind: "scalar",
  construct: function(data) {
    return data !== null ? data : "";
  }
});
var seq = new type("tag:yaml.org,2002:seq", {
  kind: "sequence",
  construct: function(data) {
    return data !== null ? data : [];
  }
});
var map = new type("tag:yaml.org,2002:map", {
  kind: "mapping",
  construct: function(data) {
    return data !== null ? data : {};
  }
});
var failsafe = new schema({
  explicit: [
    str,
    seq,
    map
  ]
});
function resolveYamlNull(data) {
  if (data === null)
    return true;
  var max = data.length;
  return max === 1 && data === "~" || max === 4 && (data === "null" || data === "Null" || data === "NULL");
}
__name(resolveYamlNull, "resolveYamlNull");
function constructYamlNull() {
  return null;
}
__name(constructYamlNull, "constructYamlNull");
function isNull(object) {
  return object === null;
}
__name(isNull, "isNull");
var _null = new type("tag:yaml.org,2002:null", {
  kind: "scalar",
  resolve: resolveYamlNull,
  construct: constructYamlNull,
  predicate: isNull,
  represent: {
    canonical: function() {
      return "~";
    },
    lowercase: function() {
      return "null";
    },
    uppercase: function() {
      return "NULL";
    },
    camelcase: function() {
      return "Null";
    },
    empty: function() {
      return "";
    }
  },
  defaultStyle: "lowercase"
});
function resolveYamlBoolean(data) {
  if (data === null)
    return false;
  var max = data.length;
  return max === 4 && (data === "true" || data === "True" || data === "TRUE") || max === 5 && (data === "false" || data === "False" || data === "FALSE");
}
__name(resolveYamlBoolean, "resolveYamlBoolean");
function constructYamlBoolean(data) {
  return data === "true" || data === "True" || data === "TRUE";
}
__name(constructYamlBoolean, "constructYamlBoolean");
function isBoolean(object) {
  return Object.prototype.toString.call(object) === "[object Boolean]";
}
__name(isBoolean, "isBoolean");
var bool = new type("tag:yaml.org,2002:bool", {
  kind: "scalar",
  resolve: resolveYamlBoolean,
  construct: constructYamlBoolean,
  predicate: isBoolean,
  represent: {
    lowercase: function(object) {
      return object ? "true" : "false";
    },
    uppercase: function(object) {
      return object ? "TRUE" : "FALSE";
    },
    camelcase: function(object) {
      return object ? "True" : "False";
    }
  },
  defaultStyle: "lowercase"
});
function isHexCode(c) {
  return 48 <= c && c <= 57 || 65 <= c && c <= 70 || 97 <= c && c <= 102;
}
__name(isHexCode, "isHexCode");
function isOctCode(c) {
  return 48 <= c && c <= 55;
}
__name(isOctCode, "isOctCode");
function isDecCode(c) {
  return 48 <= c && c <= 57;
}
__name(isDecCode, "isDecCode");
function resolveYamlInteger(data) {
  if (data === null)
    return false;
  var max = data.length, index = 0, hasDigits = false, ch;
  if (!max)
    return false;
  ch = data[index];
  if (ch === "-" || ch === "+") {
    ch = data[++index];
  }
  if (ch === "0") {
    if (index + 1 === max)
      return true;
    ch = data[++index];
    if (ch === "b") {
      index++;
      for (; index < max; index++) {
        ch = data[index];
        if (ch === "_")
          continue;
        if (ch !== "0" && ch !== "1")
          return false;
        hasDigits = true;
      }
      return hasDigits && ch !== "_";
    }
    if (ch === "x") {
      index++;
      for (; index < max; index++) {
        ch = data[index];
        if (ch === "_")
          continue;
        if (!isHexCode(data.charCodeAt(index)))
          return false;
        hasDigits = true;
      }
      return hasDigits && ch !== "_";
    }
    if (ch === "o") {
      index++;
      for (; index < max; index++) {
        ch = data[index];
        if (ch === "_")
          continue;
        if (!isOctCode(data.charCodeAt(index)))
          return false;
        hasDigits = true;
      }
      return hasDigits && ch !== "_";
    }
  }
  if (ch === "_")
    return false;
  for (; index < max; index++) {
    ch = data[index];
    if (ch === "_")
      continue;
    if (!isDecCode(data.charCodeAt(index))) {
      return false;
    }
    hasDigits = true;
  }
  if (!hasDigits || ch === "_")
    return false;
  return true;
}
__name(resolveYamlInteger, "resolveYamlInteger");
function constructYamlInteger(data) {
  var value = data, sign = 1, ch;
  if (value.indexOf("_") !== -1) {
    value = value.replace(/_/g, "");
  }
  ch = value[0];
  if (ch === "-" || ch === "+") {
    if (ch === "-")
      sign = -1;
    value = value.slice(1);
    ch = value[0];
  }
  if (value === "0")
    return 0;
  if (ch === "0") {
    if (value[1] === "b")
      return sign * parseInt(value.slice(2), 2);
    if (value[1] === "x")
      return sign * parseInt(value.slice(2), 16);
    if (value[1] === "o")
      return sign * parseInt(value.slice(2), 8);
  }
  return sign * parseInt(value, 10);
}
__name(constructYamlInteger, "constructYamlInteger");
function isInteger(object) {
  return Object.prototype.toString.call(object) === "[object Number]" && (object % 1 === 0 && !common.isNegativeZero(object));
}
__name(isInteger, "isInteger");
var int = new type("tag:yaml.org,2002:int", {
  kind: "scalar",
  resolve: resolveYamlInteger,
  construct: constructYamlInteger,
  predicate: isInteger,
  represent: {
    binary: function(obj) {
      return obj >= 0 ? "0b" + obj.toString(2) : "-0b" + obj.toString(2).slice(1);
    },
    octal: function(obj) {
      return obj >= 0 ? "0o" + obj.toString(8) : "-0o" + obj.toString(8).slice(1);
    },
    decimal: function(obj) {
      return obj.toString(10);
    },
    /* eslint-disable max-len */
    hexadecimal: function(obj) {
      return obj >= 0 ? "0x" + obj.toString(16).toUpperCase() : "-0x" + obj.toString(16).toUpperCase().slice(1);
    }
  },
  defaultStyle: "decimal",
  styleAliases: {
    binary: [2, "bin"],
    octal: [8, "oct"],
    decimal: [10, "dec"],
    hexadecimal: [16, "hex"]
  }
});
var YAML_FLOAT_PATTERN = new RegExp(
  // 2.5e4, 2.5 and integers
  "^(?:[-+]?(?:[0-9][0-9_]*)(?:\\.[0-9_]*)?(?:[eE][-+]?[0-9]+)?|\\.[0-9_]+(?:[eE][-+]?[0-9]+)?|[-+]?\\.(?:inf|Inf|INF)|\\.(?:nan|NaN|NAN))$"
);
function resolveYamlFloat(data) {
  if (data === null)
    return false;
  if (!YAML_FLOAT_PATTERN.test(data) || // Quick hack to not allow integers end with `_`
  // Probably should update regexp & check speed
  data[data.length - 1] === "_") {
    return false;
  }
  return true;
}
__name(resolveYamlFloat, "resolveYamlFloat");
function constructYamlFloat(data) {
  var value, sign;
  value = data.replace(/_/g, "").toLowerCase();
  sign = value[0] === "-" ? -1 : 1;
  if ("+-".indexOf(value[0]) >= 0) {
    value = value.slice(1);
  }
  if (value === ".inf") {
    return sign === 1 ? Number.POSITIVE_INFINITY : Number.NEGATIVE_INFINITY;
  } else if (value === ".nan") {
    return NaN;
  }
  return sign * parseFloat(value, 10);
}
__name(constructYamlFloat, "constructYamlFloat");
var SCIENTIFIC_WITHOUT_DOT = /^[-+]?[0-9]+e/;
function representYamlFloat(object, style) {
  var res;
  if (isNaN(object)) {
    switch (style) {
      case "lowercase":
        return ".nan";
      case "uppercase":
        return ".NAN";
      case "camelcase":
        return ".NaN";
    }
  } else if (Number.POSITIVE_INFINITY === object) {
    switch (style) {
      case "lowercase":
        return ".inf";
      case "uppercase":
        return ".INF";
      case "camelcase":
        return ".Inf";
    }
  } else if (Number.NEGATIVE_INFINITY === object) {
    switch (style) {
      case "lowercase":
        return "-.inf";
      case "uppercase":
        return "-.INF";
      case "camelcase":
        return "-.Inf";
    }
  } else if (common.isNegativeZero(object)) {
    return "-0.0";
  }
  res = object.toString(10);
  return SCIENTIFIC_WITHOUT_DOT.test(res) ? res.replace("e", ".e") : res;
}
__name(representYamlFloat, "representYamlFloat");
function isFloat(object) {
  return Object.prototype.toString.call(object) === "[object Number]" && (object % 1 !== 0 || common.isNegativeZero(object));
}
__name(isFloat, "isFloat");
var float = new type("tag:yaml.org,2002:float", {
  kind: "scalar",
  resolve: resolveYamlFloat,
  construct: constructYamlFloat,
  predicate: isFloat,
  represent: representYamlFloat,
  defaultStyle: "lowercase"
});
var json = failsafe.extend({
  implicit: [
    _null,
    bool,
    int,
    float
  ]
});
var core = json;
var YAML_DATE_REGEXP = new RegExp(
  "^([0-9][0-9][0-9][0-9])-([0-9][0-9])-([0-9][0-9])$"
);
var YAML_TIMESTAMP_REGEXP = new RegExp(
  "^([0-9][0-9][0-9][0-9])-([0-9][0-9]?)-([0-9][0-9]?)(?:[Tt]|[ \\t]+)([0-9][0-9]?):([0-9][0-9]):([0-9][0-9])(?:\\.([0-9]*))?(?:[ \\t]*(Z|([-+])([0-9][0-9]?)(?::([0-9][0-9]))?))?$"
);
function resolveYamlTimestamp(data) {
  if (data === null)
    return false;
  if (YAML_DATE_REGEXP.exec(data) !== null)
    return true;
  if (YAML_TIMESTAMP_REGEXP.exec(data) !== null)
    return true;
  return false;
}
__name(resolveYamlTimestamp, "resolveYamlTimestamp");
function constructYamlTimestamp(data) {
  var match, year, month, day, hour, minute, second, fraction = 0, delta = null, tz_hour, tz_minute, date;
  match = YAML_DATE_REGEXP.exec(data);
  if (match === null)
    match = YAML_TIMESTAMP_REGEXP.exec(data);
  if (match === null)
    throw new Error("Date resolve error");
  year = +match[1];
  month = +match[2] - 1;
  day = +match[3];
  if (!match[4]) {
    return new Date(Date.UTC(year, month, day));
  }
  hour = +match[4];
  minute = +match[5];
  second = +match[6];
  if (match[7]) {
    fraction = match[7].slice(0, 3);
    while (fraction.length < 3) {
      fraction += "0";
    }
    fraction = +fraction;
  }
  if (match[9]) {
    tz_hour = +match[10];
    tz_minute = +(match[11] || 0);
    delta = (tz_hour * 60 + tz_minute) * 6e4;
    if (match[9] === "-")
      delta = -delta;
  }
  date = new Date(Date.UTC(year, month, day, hour, minute, second, fraction));
  if (delta)
    date.setTime(date.getTime() - delta);
  return date;
}
__name(constructYamlTimestamp, "constructYamlTimestamp");
function representYamlTimestamp(object) {
  return object.toISOString();
}
__name(representYamlTimestamp, "representYamlTimestamp");
var timestamp = new type("tag:yaml.org,2002:timestamp", {
  kind: "scalar",
  resolve: resolveYamlTimestamp,
  construct: constructYamlTimestamp,
  instanceOf: Date,
  represent: representYamlTimestamp
});
function resolveYamlMerge(data) {
  return data === "<<" || data === null;
}
__name(resolveYamlMerge, "resolveYamlMerge");
var merge = new type("tag:yaml.org,2002:merge", {
  kind: "scalar",
  resolve: resolveYamlMerge
});
var BASE64_MAP = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=\n\r";
function resolveYamlBinary(data) {
  if (data === null)
    return false;
  var code, idx, bitlen = 0, max = data.length, map2 = BASE64_MAP;
  for (idx = 0; idx < max; idx++) {
    code = map2.indexOf(data.charAt(idx));
    if (code > 64)
      continue;
    if (code < 0)
      return false;
    bitlen += 6;
  }
  return bitlen % 8 === 0;
}
__name(resolveYamlBinary, "resolveYamlBinary");
function constructYamlBinary(data) {
  var idx, tailbits, input = data.replace(/[\r\n=]/g, ""), max = input.length, map2 = BASE64_MAP, bits = 0, result = [];
  for (idx = 0; idx < max; idx++) {
    if (idx % 4 === 0 && idx) {
      result.push(bits >> 16 & 255);
      result.push(bits >> 8 & 255);
      result.push(bits & 255);
    }
    bits = bits << 6 | map2.indexOf(input.charAt(idx));
  }
  tailbits = max % 4 * 6;
  if (tailbits === 0) {
    result.push(bits >> 16 & 255);
    result.push(bits >> 8 & 255);
    result.push(bits & 255);
  } else if (tailbits === 18) {
    result.push(bits >> 10 & 255);
    result.push(bits >> 2 & 255);
  } else if (tailbits === 12) {
    result.push(bits >> 4 & 255);
  }
  return new Uint8Array(result);
}
__name(constructYamlBinary, "constructYamlBinary");
function representYamlBinary(object) {
  var result = "", bits = 0, idx, tail, max = object.length, map2 = BASE64_MAP;
  for (idx = 0; idx < max; idx++) {
    if (idx % 3 === 0 && idx) {
      result += map2[bits >> 18 & 63];
      result += map2[bits >> 12 & 63];
      result += map2[bits >> 6 & 63];
      result += map2[bits & 63];
    }
    bits = (bits << 8) + object[idx];
  }
  tail = max % 3;
  if (tail === 0) {
    result += map2[bits >> 18 & 63];
    result += map2[bits >> 12 & 63];
    result += map2[bits >> 6 & 63];
    result += map2[bits & 63];
  } else if (tail === 2) {
    result += map2[bits >> 10 & 63];
    result += map2[bits >> 4 & 63];
    result += map2[bits << 2 & 63];
    result += map2[64];
  } else if (tail === 1) {
    result += map2[bits >> 2 & 63];
    result += map2[bits << 4 & 63];
    result += map2[64];
    result += map2[64];
  }
  return result;
}
__name(representYamlBinary, "representYamlBinary");
function isBinary(obj) {
  return Object.prototype.toString.call(obj) === "[object Uint8Array]";
}
__name(isBinary, "isBinary");
var binary = new type("tag:yaml.org,2002:binary", {
  kind: "scalar",
  resolve: resolveYamlBinary,
  construct: constructYamlBinary,
  predicate: isBinary,
  represent: representYamlBinary
});
var _hasOwnProperty$3 = Object.prototype.hasOwnProperty;
var _toString$2 = Object.prototype.toString;
function resolveYamlOmap(data) {
  if (data === null)
    return true;
  var objectKeys = [], index, length, pair, pairKey, pairHasKey, object = data;
  for (index = 0, length = object.length; index < length; index += 1) {
    pair = object[index];
    pairHasKey = false;
    if (_toString$2.call(pair) !== "[object Object]")
      return false;
    for (pairKey in pair) {
      if (_hasOwnProperty$3.call(pair, pairKey)) {
        if (!pairHasKey)
          pairHasKey = true;
        else
          return false;
      }
    }
    if (!pairHasKey)
      return false;
    if (objectKeys.indexOf(pairKey) === -1)
      objectKeys.push(pairKey);
    else
      return false;
  }
  return true;
}
__name(resolveYamlOmap, "resolveYamlOmap");
function constructYamlOmap(data) {
  return data !== null ? data : [];
}
__name(constructYamlOmap, "constructYamlOmap");
var omap = new type("tag:yaml.org,2002:omap", {
  kind: "sequence",
  resolve: resolveYamlOmap,
  construct: constructYamlOmap
});
var _toString$1 = Object.prototype.toString;
function resolveYamlPairs(data) {
  if (data === null)
    return true;
  var index, length, pair, keys, result, object = data;
  result = new Array(object.length);
  for (index = 0, length = object.length; index < length; index += 1) {
    pair = object[index];
    if (_toString$1.call(pair) !== "[object Object]")
      return false;
    keys = Object.keys(pair);
    if (keys.length !== 1)
      return false;
    result[index] = [keys[0], pair[keys[0]]];
  }
  return true;
}
__name(resolveYamlPairs, "resolveYamlPairs");
function constructYamlPairs(data) {
  if (data === null)
    return [];
  var index, length, pair, keys, result, object = data;
  result = new Array(object.length);
  for (index = 0, length = object.length; index < length; index += 1) {
    pair = object[index];
    keys = Object.keys(pair);
    result[index] = [keys[0], pair[keys[0]]];
  }
  return result;
}
__name(constructYamlPairs, "constructYamlPairs");
var pairs = new type("tag:yaml.org,2002:pairs", {
  kind: "sequence",
  resolve: resolveYamlPairs,
  construct: constructYamlPairs
});
var _hasOwnProperty$2 = Object.prototype.hasOwnProperty;
function resolveYamlSet(data) {
  if (data === null)
    return true;
  var key, object = data;
  for (key in object) {
    if (_hasOwnProperty$2.call(object, key)) {
      if (object[key] !== null)
        return false;
    }
  }
  return true;
}
__name(resolveYamlSet, "resolveYamlSet");
function constructYamlSet(data) {
  return data !== null ? data : {};
}
__name(constructYamlSet, "constructYamlSet");
var set = new type("tag:yaml.org,2002:set", {
  kind: "mapping",
  resolve: resolveYamlSet,
  construct: constructYamlSet
});
var _default = core.extend({
  implicit: [
    timestamp,
    merge
  ],
  explicit: [
    binary,
    omap,
    pairs,
    set
  ]
});
var _hasOwnProperty$1 = Object.prototype.hasOwnProperty;
var CONTEXT_FLOW_IN = 1;
var CONTEXT_FLOW_OUT = 2;
var CONTEXT_BLOCK_IN = 3;
var CONTEXT_BLOCK_OUT = 4;
var CHOMPING_CLIP = 1;
var CHOMPING_STRIP = 2;
var CHOMPING_KEEP = 3;
var PATTERN_NON_PRINTABLE = /[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x84\x86-\x9F\uFFFE\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/;
var PATTERN_NON_ASCII_LINE_BREAKS = /[\x85\u2028\u2029]/;
var PATTERN_FLOW_INDICATORS = /[,\[\]\{\}]/;
var PATTERN_TAG_HANDLE = /^(?:!|!!|![a-z\-]+!)$/i;
var PATTERN_TAG_URI = /^(?:!|[^,\[\]\{\}])(?:%[0-9a-f]{2}|[0-9a-z\-#;\/\?:@&=\+\$,_\.!~\*'\(\)\[\]])*$/i;
function _class(obj) {
  return Object.prototype.toString.call(obj);
}
__name(_class, "_class");
function is_EOL(c) {
  return c === 10 || c === 13;
}
__name(is_EOL, "is_EOL");
function is_WHITE_SPACE(c) {
  return c === 9 || c === 32;
}
__name(is_WHITE_SPACE, "is_WHITE_SPACE");
function is_WS_OR_EOL(c) {
  return c === 9 || c === 32 || c === 10 || c === 13;
}
__name(is_WS_OR_EOL, "is_WS_OR_EOL");
function is_FLOW_INDICATOR(c) {
  return c === 44 || c === 91 || c === 93 || c === 123 || c === 125;
}
__name(is_FLOW_INDICATOR, "is_FLOW_INDICATOR");
function fromHexCode(c) {
  var lc;
  if (48 <= c && c <= 57) {
    return c - 48;
  }
  lc = c | 32;
  if (97 <= lc && lc <= 102) {
    return lc - 97 + 10;
  }
  return -1;
}
__name(fromHexCode, "fromHexCode");
function escapedHexLen(c) {
  if (c === 120) {
    return 2;
  }
  if (c === 117) {
    return 4;
  }
  if (c === 85) {
    return 8;
  }
  return 0;
}
__name(escapedHexLen, "escapedHexLen");
function fromDecimalCode(c) {
  if (48 <= c && c <= 57) {
    return c - 48;
  }
  return -1;
}
__name(fromDecimalCode, "fromDecimalCode");
function simpleEscapeSequence(c) {
  return c === 48 ? "\0" : c === 97 ? "\x07" : c === 98 ? "\b" : c === 116 ? "	" : c === 9 ? "	" : c === 110 ? "\n" : c === 118 ? "\v" : c === 102 ? "\f" : c === 114 ? "\r" : c === 101 ? "\x1B" : c === 32 ? " " : c === 34 ? '"' : c === 47 ? "/" : c === 92 ? "\\" : c === 78 ? "\x85" : c === 95 ? "\xA0" : c === 76 ? "\u2028" : c === 80 ? "\u2029" : "";
}
__name(simpleEscapeSequence, "simpleEscapeSequence");
function charFromCodepoint(c) {
  if (c <= 65535) {
    return String.fromCharCode(c);
  }
  return String.fromCharCode(
    (c - 65536 >> 10) + 55296,
    (c - 65536 & 1023) + 56320
  );
}
__name(charFromCodepoint, "charFromCodepoint");
var simpleEscapeCheck = new Array(256);
var simpleEscapeMap = new Array(256);
for (i = 0; i < 256; i++) {
  simpleEscapeCheck[i] = simpleEscapeSequence(i) ? 1 : 0;
  simpleEscapeMap[i] = simpleEscapeSequence(i);
}
var i;
function State$1(input, options) {
  this.input = input;
  this.filename = options["filename"] || null;
  this.schema = options["schema"] || _default;
  this.onWarning = options["onWarning"] || null;
  this.legacy = options["legacy"] || false;
  this.json = options["json"] || false;
  this.listener = options["listener"] || null;
  this.implicitTypes = this.schema.compiledImplicit;
  this.typeMap = this.schema.compiledTypeMap;
  this.length = input.length;
  this.position = 0;
  this.line = 0;
  this.lineStart = 0;
  this.lineIndent = 0;
  this.firstTabInLine = -1;
  this.documents = [];
}
__name(State$1, "State$1");
function generateError(state, message) {
  var mark = {
    name: state.filename,
    buffer: state.input.slice(0, -1),
    // omit trailing \0
    position: state.position,
    line: state.line,
    column: state.position - state.lineStart
  };
  mark.snippet = snippet(mark);
  return new exception(message, mark);
}
__name(generateError, "generateError");
function throwError(state, message) {
  throw generateError(state, message);
}
__name(throwError, "throwError");
function throwWarning(state, message) {
  if (state.onWarning) {
    state.onWarning.call(null, generateError(state, message));
  }
}
__name(throwWarning, "throwWarning");
var directiveHandlers = {
  YAML: /* @__PURE__ */ __name(function handleYamlDirective(state, name, args) {
    var match, major, minor;
    if (state.version !== null) {
      throwError(state, "duplication of %YAML directive");
    }
    if (args.length !== 1) {
      throwError(state, "YAML directive accepts exactly one argument");
    }
    match = /^([0-9]+)\.([0-9]+)$/.exec(args[0]);
    if (match === null) {
      throwError(state, "ill-formed argument of the YAML directive");
    }
    major = parseInt(match[1], 10);
    minor = parseInt(match[2], 10);
    if (major !== 1) {
      throwError(state, "unacceptable YAML version of the document");
    }
    state.version = args[0];
    state.checkLineBreaks = minor < 2;
    if (minor !== 1 && minor !== 2) {
      throwWarning(state, "unsupported YAML version of the document");
    }
  }, "handleYamlDirective"),
  TAG: /* @__PURE__ */ __name(function handleTagDirective(state, name, args) {
    var handle, prefix;
    if (args.length !== 2) {
      throwError(state, "TAG directive accepts exactly two arguments");
    }
    handle = args[0];
    prefix = args[1];
    if (!PATTERN_TAG_HANDLE.test(handle)) {
      throwError(state, "ill-formed tag handle (first argument) of the TAG directive");
    }
    if (_hasOwnProperty$1.call(state.tagMap, handle)) {
      throwError(state, 'there is a previously declared suffix for "' + handle + '" tag handle');
    }
    if (!PATTERN_TAG_URI.test(prefix)) {
      throwError(state, "ill-formed tag prefix (second argument) of the TAG directive");
    }
    try {
      prefix = decodeURIComponent(prefix);
    } catch (err) {
      throwError(state, "tag prefix is malformed: " + prefix);
    }
    state.tagMap[handle] = prefix;
  }, "handleTagDirective")
};
function captureSegment(state, start, end, checkJson) {
  var _position, _length, _character, _result;
  if (start < end) {
    _result = state.input.slice(start, end);
    if (checkJson) {
      for (_position = 0, _length = _result.length; _position < _length; _position += 1) {
        _character = _result.charCodeAt(_position);
        if (!(_character === 9 || 32 <= _character && _character <= 1114111)) {
          throwError(state, "expected valid JSON character");
        }
      }
    } else if (PATTERN_NON_PRINTABLE.test(_result)) {
      throwError(state, "the stream contains non-printable characters");
    }
    state.result += _result;
  }
}
__name(captureSegment, "captureSegment");
function mergeMappings(state, destination, source, overridableKeys) {
  var sourceKeys, key, index, quantity;
  if (!common.isObject(source)) {
    throwError(state, "cannot merge mappings; the provided source object is unacceptable");
  }
  sourceKeys = Object.keys(source);
  for (index = 0, quantity = sourceKeys.length; index < quantity; index += 1) {
    key = sourceKeys[index];
    if (!_hasOwnProperty$1.call(destination, key)) {
      destination[key] = source[key];
      overridableKeys[key] = true;
    }
  }
}
__name(mergeMappings, "mergeMappings");
function storeMappingPair(state, _result, overridableKeys, keyTag, keyNode, valueNode, startLine, startLineStart, startPos) {
  var index, quantity;
  if (Array.isArray(keyNode)) {
    keyNode = Array.prototype.slice.call(keyNode);
    for (index = 0, quantity = keyNode.length; index < quantity; index += 1) {
      if (Array.isArray(keyNode[index])) {
        throwError(state, "nested arrays are not supported inside keys");
      }
      if (typeof keyNode === "object" && _class(keyNode[index]) === "[object Object]") {
        keyNode[index] = "[object Object]";
      }
    }
  }
  if (typeof keyNode === "object" && _class(keyNode) === "[object Object]") {
    keyNode = "[object Object]";
  }
  keyNode = String(keyNode);
  if (_result === null) {
    _result = {};
  }
  if (keyTag === "tag:yaml.org,2002:merge") {
    if (Array.isArray(valueNode)) {
      for (index = 0, quantity = valueNode.length; index < quantity; index += 1) {
        mergeMappings(state, _result, valueNode[index], overridableKeys);
      }
    } else {
      mergeMappings(state, _result, valueNode, overridableKeys);
    }
  } else {
    if (!state.json && !_hasOwnProperty$1.call(overridableKeys, keyNode) && _hasOwnProperty$1.call(_result, keyNode)) {
      state.line = startLine || state.line;
      state.lineStart = startLineStart || state.lineStart;
      state.position = startPos || state.position;
      throwError(state, "duplicated mapping key");
    }
    if (keyNode === "__proto__") {
      Object.defineProperty(_result, keyNode, {
        configurable: true,
        enumerable: true,
        writable: true,
        value: valueNode
      });
    } else {
      _result[keyNode] = valueNode;
    }
    delete overridableKeys[keyNode];
  }
  return _result;
}
__name(storeMappingPair, "storeMappingPair");
function readLineBreak(state) {
  var ch;
  ch = state.input.charCodeAt(state.position);
  if (ch === 10) {
    state.position++;
  } else if (ch === 13) {
    state.position++;
    if (state.input.charCodeAt(state.position) === 10) {
      state.position++;
    }
  } else {
    throwError(state, "a line break is expected");
  }
  state.line += 1;
  state.lineStart = state.position;
  state.firstTabInLine = -1;
}
__name(readLineBreak, "readLineBreak");
function skipSeparationSpace(state, allowComments, checkIndent) {
  var lineBreaks = 0, ch = state.input.charCodeAt(state.position);
  while (ch !== 0) {
    while (is_WHITE_SPACE(ch)) {
      if (ch === 9 && state.firstTabInLine === -1) {
        state.firstTabInLine = state.position;
      }
      ch = state.input.charCodeAt(++state.position);
    }
    if (allowComments && ch === 35) {
      do {
        ch = state.input.charCodeAt(++state.position);
      } while (ch !== 10 && ch !== 13 && ch !== 0);
    }
    if (is_EOL(ch)) {
      readLineBreak(state);
      ch = state.input.charCodeAt(state.position);
      lineBreaks++;
      state.lineIndent = 0;
      while (ch === 32) {
        state.lineIndent++;
        ch = state.input.charCodeAt(++state.position);
      }
    } else {
      break;
    }
  }
  if (checkIndent !== -1 && lineBreaks !== 0 && state.lineIndent < checkIndent) {
    throwWarning(state, "deficient indentation");
  }
  return lineBreaks;
}
__name(skipSeparationSpace, "skipSeparationSpace");
function testDocumentSeparator(state) {
  var _position = state.position, ch;
  ch = state.input.charCodeAt(_position);
  if ((ch === 45 || ch === 46) && ch === state.input.charCodeAt(_position + 1) && ch === state.input.charCodeAt(_position + 2)) {
    _position += 3;
    ch = state.input.charCodeAt(_position);
    if (ch === 0 || is_WS_OR_EOL(ch)) {
      return true;
    }
  }
  return false;
}
__name(testDocumentSeparator, "testDocumentSeparator");
function writeFoldedLines(state, count) {
  if (count === 1) {
    state.result += " ";
  } else if (count > 1) {
    state.result += common.repeat("\n", count - 1);
  }
}
__name(writeFoldedLines, "writeFoldedLines");
function readPlainScalar(state, nodeIndent, withinFlowCollection) {
  var preceding, following, captureStart, captureEnd, hasPendingContent, _line, _lineStart, _lineIndent, _kind = state.kind, _result = state.result, ch;
  ch = state.input.charCodeAt(state.position);
  if (is_WS_OR_EOL(ch) || is_FLOW_INDICATOR(ch) || ch === 35 || ch === 38 || ch === 42 || ch === 33 || ch === 124 || ch === 62 || ch === 39 || ch === 34 || ch === 37 || ch === 64 || ch === 96) {
    return false;
  }
  if (ch === 63 || ch === 45) {
    following = state.input.charCodeAt(state.position + 1);
    if (is_WS_OR_EOL(following) || withinFlowCollection && is_FLOW_INDICATOR(following)) {
      return false;
    }
  }
  state.kind = "scalar";
  state.result = "";
  captureStart = captureEnd = state.position;
  hasPendingContent = false;
  while (ch !== 0) {
    if (ch === 58) {
      following = state.input.charCodeAt(state.position + 1);
      if (is_WS_OR_EOL(following) || withinFlowCollection && is_FLOW_INDICATOR(following)) {
        break;
      }
    } else if (ch === 35) {
      preceding = state.input.charCodeAt(state.position - 1);
      if (is_WS_OR_EOL(preceding)) {
        break;
      }
    } else if (state.position === state.lineStart && testDocumentSeparator(state) || withinFlowCollection && is_FLOW_INDICATOR(ch)) {
      break;
    } else if (is_EOL(ch)) {
      _line = state.line;
      _lineStart = state.lineStart;
      _lineIndent = state.lineIndent;
      skipSeparationSpace(state, false, -1);
      if (state.lineIndent >= nodeIndent) {
        hasPendingContent = true;
        ch = state.input.charCodeAt(state.position);
        continue;
      } else {
        state.position = captureEnd;
        state.line = _line;
        state.lineStart = _lineStart;
        state.lineIndent = _lineIndent;
        break;
      }
    }
    if (hasPendingContent) {
      captureSegment(state, captureStart, captureEnd, false);
      writeFoldedLines(state, state.line - _line);
      captureStart = captureEnd = state.position;
      hasPendingContent = false;
    }
    if (!is_WHITE_SPACE(ch)) {
      captureEnd = state.position + 1;
    }
    ch = state.input.charCodeAt(++state.position);
  }
  captureSegment(state, captureStart, captureEnd, false);
  if (state.result) {
    return true;
  }
  state.kind = _kind;
  state.result = _result;
  return false;
}
__name(readPlainScalar, "readPlainScalar");
function readSingleQuotedScalar(state, nodeIndent) {
  var ch, captureStart, captureEnd;
  ch = state.input.charCodeAt(state.position);
  if (ch !== 39) {
    return false;
  }
  state.kind = "scalar";
  state.result = "";
  state.position++;
  captureStart = captureEnd = state.position;
  while ((ch = state.input.charCodeAt(state.position)) !== 0) {
    if (ch === 39) {
      captureSegment(state, captureStart, state.position, true);
      ch = state.input.charCodeAt(++state.position);
      if (ch === 39) {
        captureStart = state.position;
        state.position++;
        captureEnd = state.position;
      } else {
        return true;
      }
    } else if (is_EOL(ch)) {
      captureSegment(state, captureStart, captureEnd, true);
      writeFoldedLines(state, skipSeparationSpace(state, false, nodeIndent));
      captureStart = captureEnd = state.position;
    } else if (state.position === state.lineStart && testDocumentSeparator(state)) {
      throwError(state, "unexpected end of the document within a single quoted scalar");
    } else {
      state.position++;
      captureEnd = state.position;
    }
  }
  throwError(state, "unexpected end of the stream within a single quoted scalar");
}
__name(readSingleQuotedScalar, "readSingleQuotedScalar");
function readDoubleQuotedScalar(state, nodeIndent) {
  var captureStart, captureEnd, hexLength, hexResult, tmp, ch;
  ch = state.input.charCodeAt(state.position);
  if (ch !== 34) {
    return false;
  }
  state.kind = "scalar";
  state.result = "";
  state.position++;
  captureStart = captureEnd = state.position;
  while ((ch = state.input.charCodeAt(state.position)) !== 0) {
    if (ch === 34) {
      captureSegment(state, captureStart, state.position, true);
      state.position++;
      return true;
    } else if (ch === 92) {
      captureSegment(state, captureStart, state.position, true);
      ch = state.input.charCodeAt(++state.position);
      if (is_EOL(ch)) {
        skipSeparationSpace(state, false, nodeIndent);
      } else if (ch < 256 && simpleEscapeCheck[ch]) {
        state.result += simpleEscapeMap[ch];
        state.position++;
      } else if ((tmp = escapedHexLen(ch)) > 0) {
        hexLength = tmp;
        hexResult = 0;
        for (; hexLength > 0; hexLength--) {
          ch = state.input.charCodeAt(++state.position);
          if ((tmp = fromHexCode(ch)) >= 0) {
            hexResult = (hexResult << 4) + tmp;
          } else {
            throwError(state, "expected hexadecimal character");
          }
        }
        state.result += charFromCodepoint(hexResult);
        state.position++;
      } else {
        throwError(state, "unknown escape sequence");
      }
      captureStart = captureEnd = state.position;
    } else if (is_EOL(ch)) {
      captureSegment(state, captureStart, captureEnd, true);
      writeFoldedLines(state, skipSeparationSpace(state, false, nodeIndent));
      captureStart = captureEnd = state.position;
    } else if (state.position === state.lineStart && testDocumentSeparator(state)) {
      throwError(state, "unexpected end of the document within a double quoted scalar");
    } else {
      state.position++;
      captureEnd = state.position;
    }
  }
  throwError(state, "unexpected end of the stream within a double quoted scalar");
}
__name(readDoubleQuotedScalar, "readDoubleQuotedScalar");
function readFlowCollection(state, nodeIndent) {
  var readNext = true, _line, _lineStart, _pos, _tag = state.tag, _result, _anchor = state.anchor, following, terminator, isPair, isExplicitPair, isMapping, overridableKeys = /* @__PURE__ */ Object.create(null), keyNode, keyTag, valueNode, ch;
  ch = state.input.charCodeAt(state.position);
  if (ch === 91) {
    terminator = 93;
    isMapping = false;
    _result = [];
  } else if (ch === 123) {
    terminator = 125;
    isMapping = true;
    _result = {};
  } else {
    return false;
  }
  if (state.anchor !== null) {
    state.anchorMap[state.anchor] = _result;
  }
  ch = state.input.charCodeAt(++state.position);
  while (ch !== 0) {
    skipSeparationSpace(state, true, nodeIndent);
    ch = state.input.charCodeAt(state.position);
    if (ch === terminator) {
      state.position++;
      state.tag = _tag;
      state.anchor = _anchor;
      state.kind = isMapping ? "mapping" : "sequence";
      state.result = _result;
      return true;
    } else if (!readNext) {
      throwError(state, "missed comma between flow collection entries");
    } else if (ch === 44) {
      throwError(state, "expected the node content, but found ','");
    }
    keyTag = keyNode = valueNode = null;
    isPair = isExplicitPair = false;
    if (ch === 63) {
      following = state.input.charCodeAt(state.position + 1);
      if (is_WS_OR_EOL(following)) {
        isPair = isExplicitPair = true;
        state.position++;
        skipSeparationSpace(state, true, nodeIndent);
      }
    }
    _line = state.line;
    _lineStart = state.lineStart;
    _pos = state.position;
    composeNode(state, nodeIndent, CONTEXT_FLOW_IN, false, true);
    keyTag = state.tag;
    keyNode = state.result;
    skipSeparationSpace(state, true, nodeIndent);
    ch = state.input.charCodeAt(state.position);
    if ((isExplicitPair || state.line === _line) && ch === 58) {
      isPair = true;
      ch = state.input.charCodeAt(++state.position);
      skipSeparationSpace(state, true, nodeIndent);
      composeNode(state, nodeIndent, CONTEXT_FLOW_IN, false, true);
      valueNode = state.result;
    }
    if (isMapping) {
      storeMappingPair(state, _result, overridableKeys, keyTag, keyNode, valueNode, _line, _lineStart, _pos);
    } else if (isPair) {
      _result.push(storeMappingPair(state, null, overridableKeys, keyTag, keyNode, valueNode, _line, _lineStart, _pos));
    } else {
      _result.push(keyNode);
    }
    skipSeparationSpace(state, true, nodeIndent);
    ch = state.input.charCodeAt(state.position);
    if (ch === 44) {
      readNext = true;
      ch = state.input.charCodeAt(++state.position);
    } else {
      readNext = false;
    }
  }
  throwError(state, "unexpected end of the stream within a flow collection");
}
__name(readFlowCollection, "readFlowCollection");
function readBlockScalar(state, nodeIndent) {
  var captureStart, folding, chomping = CHOMPING_CLIP, didReadContent = false, detectedIndent = false, textIndent = nodeIndent, emptyLines = 0, atMoreIndented = false, tmp, ch;
  ch = state.input.charCodeAt(state.position);
  if (ch === 124) {
    folding = false;
  } else if (ch === 62) {
    folding = true;
  } else {
    return false;
  }
  state.kind = "scalar";
  state.result = "";
  while (ch !== 0) {
    ch = state.input.charCodeAt(++state.position);
    if (ch === 43 || ch === 45) {
      if (CHOMPING_CLIP === chomping) {
        chomping = ch === 43 ? CHOMPING_KEEP : CHOMPING_STRIP;
      } else {
        throwError(state, "repeat of a chomping mode identifier");
      }
    } else if ((tmp = fromDecimalCode(ch)) >= 0) {
      if (tmp === 0) {
        throwError(state, "bad explicit indentation width of a block scalar; it cannot be less than one");
      } else if (!detectedIndent) {
        textIndent = nodeIndent + tmp - 1;
        detectedIndent = true;
      } else {
        throwError(state, "repeat of an indentation width identifier");
      }
    } else {
      break;
    }
  }
  if (is_WHITE_SPACE(ch)) {
    do {
      ch = state.input.charCodeAt(++state.position);
    } while (is_WHITE_SPACE(ch));
    if (ch === 35) {
      do {
        ch = state.input.charCodeAt(++state.position);
      } while (!is_EOL(ch) && ch !== 0);
    }
  }
  while (ch !== 0) {
    readLineBreak(state);
    state.lineIndent = 0;
    ch = state.input.charCodeAt(state.position);
    while ((!detectedIndent || state.lineIndent < textIndent) && ch === 32) {
      state.lineIndent++;
      ch = state.input.charCodeAt(++state.position);
    }
    if (!detectedIndent && state.lineIndent > textIndent) {
      textIndent = state.lineIndent;
    }
    if (is_EOL(ch)) {
      emptyLines++;
      continue;
    }
    if (state.lineIndent < textIndent) {
      if (chomping === CHOMPING_KEEP) {
        state.result += common.repeat("\n", didReadContent ? 1 + emptyLines : emptyLines);
      } else if (chomping === CHOMPING_CLIP) {
        if (didReadContent) {
          state.result += "\n";
        }
      }
      break;
    }
    if (folding) {
      if (is_WHITE_SPACE(ch)) {
        atMoreIndented = true;
        state.result += common.repeat("\n", didReadContent ? 1 + emptyLines : emptyLines);
      } else if (atMoreIndented) {
        atMoreIndented = false;
        state.result += common.repeat("\n", emptyLines + 1);
      } else if (emptyLines === 0) {
        if (didReadContent) {
          state.result += " ";
        }
      } else {
        state.result += common.repeat("\n", emptyLines);
      }
    } else {
      state.result += common.repeat("\n", didReadContent ? 1 + emptyLines : emptyLines);
    }
    didReadContent = true;
    detectedIndent = true;
    emptyLines = 0;
    captureStart = state.position;
    while (!is_EOL(ch) && ch !== 0) {
      ch = state.input.charCodeAt(++state.position);
    }
    captureSegment(state, captureStart, state.position, false);
  }
  return true;
}
__name(readBlockScalar, "readBlockScalar");
function readBlockSequence(state, nodeIndent) {
  var _line, _tag = state.tag, _anchor = state.anchor, _result = [], following, detected = false, ch;
  if (state.firstTabInLine !== -1)
    return false;
  if (state.anchor !== null) {
    state.anchorMap[state.anchor] = _result;
  }
  ch = state.input.charCodeAt(state.position);
  while (ch !== 0) {
    if (state.firstTabInLine !== -1) {
      state.position = state.firstTabInLine;
      throwError(state, "tab characters must not be used in indentation");
    }
    if (ch !== 45) {
      break;
    }
    following = state.input.charCodeAt(state.position + 1);
    if (!is_WS_OR_EOL(following)) {
      break;
    }
    detected = true;
    state.position++;
    if (skipSeparationSpace(state, true, -1)) {
      if (state.lineIndent <= nodeIndent) {
        _result.push(null);
        ch = state.input.charCodeAt(state.position);
        continue;
      }
    }
    _line = state.line;
    composeNode(state, nodeIndent, CONTEXT_BLOCK_IN, false, true);
    _result.push(state.result);
    skipSeparationSpace(state, true, -1);
    ch = state.input.charCodeAt(state.position);
    if ((state.line === _line || state.lineIndent > nodeIndent) && ch !== 0) {
      throwError(state, "bad indentation of a sequence entry");
    } else if (state.lineIndent < nodeIndent) {
      break;
    }
  }
  if (detected) {
    state.tag = _tag;
    state.anchor = _anchor;
    state.kind = "sequence";
    state.result = _result;
    return true;
  }
  return false;
}
__name(readBlockSequence, "readBlockSequence");
function readBlockMapping(state, nodeIndent, flowIndent) {
  var following, allowCompact, _line, _keyLine, _keyLineStart, _keyPos, _tag = state.tag, _anchor = state.anchor, _result = {}, overridableKeys = /* @__PURE__ */ Object.create(null), keyTag = null, keyNode = null, valueNode = null, atExplicitKey = false, detected = false, ch;
  if (state.firstTabInLine !== -1)
    return false;
  if (state.anchor !== null) {
    state.anchorMap[state.anchor] = _result;
  }
  ch = state.input.charCodeAt(state.position);
  while (ch !== 0) {
    if (!atExplicitKey && state.firstTabInLine !== -1) {
      state.position = state.firstTabInLine;
      throwError(state, "tab characters must not be used in indentation");
    }
    following = state.input.charCodeAt(state.position + 1);
    _line = state.line;
    if ((ch === 63 || ch === 58) && is_WS_OR_EOL(following)) {
      if (ch === 63) {
        if (atExplicitKey) {
          storeMappingPair(state, _result, overridableKeys, keyTag, keyNode, null, _keyLine, _keyLineStart, _keyPos);
          keyTag = keyNode = valueNode = null;
        }
        detected = true;
        atExplicitKey = true;
        allowCompact = true;
      } else if (atExplicitKey) {
        atExplicitKey = false;
        allowCompact = true;
      } else {
        throwError(state, "incomplete explicit mapping pair; a key node is missed; or followed by a non-tabulated empty line");
      }
      state.position += 1;
      ch = following;
    } else {
      _keyLine = state.line;
      _keyLineStart = state.lineStart;
      _keyPos = state.position;
      if (!composeNode(state, flowIndent, CONTEXT_FLOW_OUT, false, true)) {
        break;
      }
      if (state.line === _line) {
        ch = state.input.charCodeAt(state.position);
        while (is_WHITE_SPACE(ch)) {
          ch = state.input.charCodeAt(++state.position);
        }
        if (ch === 58) {
          ch = state.input.charCodeAt(++state.position);
          if (!is_WS_OR_EOL(ch)) {
            throwError(state, "a whitespace character is expected after the key-value separator within a block mapping");
          }
          if (atExplicitKey) {
            storeMappingPair(state, _result, overridableKeys, keyTag, keyNode, null, _keyLine, _keyLineStart, _keyPos);
            keyTag = keyNode = valueNode = null;
          }
          detected = true;
          atExplicitKey = false;
          allowCompact = false;
          keyTag = state.tag;
          keyNode = state.result;
        } else if (detected) {
          throwError(state, "can not read an implicit mapping pair; a colon is missed");
        } else {
          state.tag = _tag;
          state.anchor = _anchor;
          return true;
        }
      } else if (detected) {
        throwError(state, "can not read a block mapping entry; a multiline key may not be an implicit key");
      } else {
        state.tag = _tag;
        state.anchor = _anchor;
        return true;
      }
    }
    if (state.line === _line || state.lineIndent > nodeIndent) {
      if (atExplicitKey) {
        _keyLine = state.line;
        _keyLineStart = state.lineStart;
        _keyPos = state.position;
      }
      if (composeNode(state, nodeIndent, CONTEXT_BLOCK_OUT, true, allowCompact)) {
        if (atExplicitKey) {
          keyNode = state.result;
        } else {
          valueNode = state.result;
        }
      }
      if (!atExplicitKey) {
        storeMappingPair(state, _result, overridableKeys, keyTag, keyNode, valueNode, _keyLine, _keyLineStart, _keyPos);
        keyTag = keyNode = valueNode = null;
      }
      skipSeparationSpace(state, true, -1);
      ch = state.input.charCodeAt(state.position);
    }
    if ((state.line === _line || state.lineIndent > nodeIndent) && ch !== 0) {
      throwError(state, "bad indentation of a mapping entry");
    } else if (state.lineIndent < nodeIndent) {
      break;
    }
  }
  if (atExplicitKey) {
    storeMappingPair(state, _result, overridableKeys, keyTag, keyNode, null, _keyLine, _keyLineStart, _keyPos);
  }
  if (detected) {
    state.tag = _tag;
    state.anchor = _anchor;
    state.kind = "mapping";
    state.result = _result;
  }
  return detected;
}
__name(readBlockMapping, "readBlockMapping");
function readTagProperty(state) {
  var _position, isVerbatim = false, isNamed = false, tagHandle, tagName, ch;
  ch = state.input.charCodeAt(state.position);
  if (ch !== 33)
    return false;
  if (state.tag !== null) {
    throwError(state, "duplication of a tag property");
  }
  ch = state.input.charCodeAt(++state.position);
  if (ch === 60) {
    isVerbatim = true;
    ch = state.input.charCodeAt(++state.position);
  } else if (ch === 33) {
    isNamed = true;
    tagHandle = "!!";
    ch = state.input.charCodeAt(++state.position);
  } else {
    tagHandle = "!";
  }
  _position = state.position;
  if (isVerbatim) {
    do {
      ch = state.input.charCodeAt(++state.position);
    } while (ch !== 0 && ch !== 62);
    if (state.position < state.length) {
      tagName = state.input.slice(_position, state.position);
      ch = state.input.charCodeAt(++state.position);
    } else {
      throwError(state, "unexpected end of the stream within a verbatim tag");
    }
  } else {
    while (ch !== 0 && !is_WS_OR_EOL(ch)) {
      if (ch === 33) {
        if (!isNamed) {
          tagHandle = state.input.slice(_position - 1, state.position + 1);
          if (!PATTERN_TAG_HANDLE.test(tagHandle)) {
            throwError(state, "named tag handle cannot contain such characters");
          }
          isNamed = true;
          _position = state.position + 1;
        } else {
          throwError(state, "tag suffix cannot contain exclamation marks");
        }
      }
      ch = state.input.charCodeAt(++state.position);
    }
    tagName = state.input.slice(_position, state.position);
    if (PATTERN_FLOW_INDICATORS.test(tagName)) {
      throwError(state, "tag suffix cannot contain flow indicator characters");
    }
  }
  if (tagName && !PATTERN_TAG_URI.test(tagName)) {
    throwError(state, "tag name cannot contain such characters: " + tagName);
  }
  try {
    tagName = decodeURIComponent(tagName);
  } catch (err) {
    throwError(state, "tag name is malformed: " + tagName);
  }
  if (isVerbatim) {
    state.tag = tagName;
  } else if (_hasOwnProperty$1.call(state.tagMap, tagHandle)) {
    state.tag = state.tagMap[tagHandle] + tagName;
  } else if (tagHandle === "!") {
    state.tag = "!" + tagName;
  } else if (tagHandle === "!!") {
    state.tag = "tag:yaml.org,2002:" + tagName;
  } else {
    throwError(state, 'undeclared tag handle "' + tagHandle + '"');
  }
  return true;
}
__name(readTagProperty, "readTagProperty");
function readAnchorProperty(state) {
  var _position, ch;
  ch = state.input.charCodeAt(state.position);
  if (ch !== 38)
    return false;
  if (state.anchor !== null) {
    throwError(state, "duplication of an anchor property");
  }
  ch = state.input.charCodeAt(++state.position);
  _position = state.position;
  while (ch !== 0 && !is_WS_OR_EOL(ch) && !is_FLOW_INDICATOR(ch)) {
    ch = state.input.charCodeAt(++state.position);
  }
  if (state.position === _position) {
    throwError(state, "name of an anchor node must contain at least one character");
  }
  state.anchor = state.input.slice(_position, state.position);
  return true;
}
__name(readAnchorProperty, "readAnchorProperty");
function readAlias(state) {
  var _position, alias, ch;
  ch = state.input.charCodeAt(state.position);
  if (ch !== 42)
    return false;
  ch = state.input.charCodeAt(++state.position);
  _position = state.position;
  while (ch !== 0 && !is_WS_OR_EOL(ch) && !is_FLOW_INDICATOR(ch)) {
    ch = state.input.charCodeAt(++state.position);
  }
  if (state.position === _position) {
    throwError(state, "name of an alias node must contain at least one character");
  }
  alias = state.input.slice(_position, state.position);
  if (!_hasOwnProperty$1.call(state.anchorMap, alias)) {
    throwError(state, 'unidentified alias "' + alias + '"');
  }
  state.result = state.anchorMap[alias];
  skipSeparationSpace(state, true, -1);
  return true;
}
__name(readAlias, "readAlias");
function composeNode(state, parentIndent, nodeContext, allowToSeek, allowCompact) {
  var allowBlockStyles, allowBlockScalars, allowBlockCollections, indentStatus = 1, atNewLine = false, hasContent = false, typeIndex, typeQuantity, typeList, type2, flowIndent, blockIndent;
  if (state.listener !== null) {
    state.listener("open", state);
  }
  state.tag = null;
  state.anchor = null;
  state.kind = null;
  state.result = null;
  allowBlockStyles = allowBlockScalars = allowBlockCollections = CONTEXT_BLOCK_OUT === nodeContext || CONTEXT_BLOCK_IN === nodeContext;
  if (allowToSeek) {
    if (skipSeparationSpace(state, true, -1)) {
      atNewLine = true;
      if (state.lineIndent > parentIndent) {
        indentStatus = 1;
      } else if (state.lineIndent === parentIndent) {
        indentStatus = 0;
      } else if (state.lineIndent < parentIndent) {
        indentStatus = -1;
      }
    }
  }
  if (indentStatus === 1) {
    while (readTagProperty(state) || readAnchorProperty(state)) {
      if (skipSeparationSpace(state, true, -1)) {
        atNewLine = true;
        allowBlockCollections = allowBlockStyles;
        if (state.lineIndent > parentIndent) {
          indentStatus = 1;
        } else if (state.lineIndent === parentIndent) {
          indentStatus = 0;
        } else if (state.lineIndent < parentIndent) {
          indentStatus = -1;
        }
      } else {
        allowBlockCollections = false;
      }
    }
  }
  if (allowBlockCollections) {
    allowBlockCollections = atNewLine || allowCompact;
  }
  if (indentStatus === 1 || CONTEXT_BLOCK_OUT === nodeContext) {
    if (CONTEXT_FLOW_IN === nodeContext || CONTEXT_FLOW_OUT === nodeContext) {
      flowIndent = parentIndent;
    } else {
      flowIndent = parentIndent + 1;
    }
    blockIndent = state.position - state.lineStart;
    if (indentStatus === 1) {
      if (allowBlockCollections && (readBlockSequence(state, blockIndent) || readBlockMapping(state, blockIndent, flowIndent)) || readFlowCollection(state, flowIndent)) {
        hasContent = true;
      } else {
        if (allowBlockScalars && readBlockScalar(state, flowIndent) || readSingleQuotedScalar(state, flowIndent) || readDoubleQuotedScalar(state, flowIndent)) {
          hasContent = true;
        } else if (readAlias(state)) {
          hasContent = true;
          if (state.tag !== null || state.anchor !== null) {
            throwError(state, "alias node should not have any properties");
          }
        } else if (readPlainScalar(state, flowIndent, CONTEXT_FLOW_IN === nodeContext)) {
          hasContent = true;
          if (state.tag === null) {
            state.tag = "?";
          }
        }
        if (state.anchor !== null) {
          state.anchorMap[state.anchor] = state.result;
        }
      }
    } else if (indentStatus === 0) {
      hasContent = allowBlockCollections && readBlockSequence(state, blockIndent);
    }
  }
  if (state.tag === null) {
    if (state.anchor !== null) {
      state.anchorMap[state.anchor] = state.result;
    }
  } else if (state.tag === "?") {
    if (state.result !== null && state.kind !== "scalar") {
      throwError(state, 'unacceptable node kind for !<?> tag; it should be "scalar", not "' + state.kind + '"');
    }
    for (typeIndex = 0, typeQuantity = state.implicitTypes.length; typeIndex < typeQuantity; typeIndex += 1) {
      type2 = state.implicitTypes[typeIndex];
      if (type2.resolve(state.result)) {
        state.result = type2.construct(state.result);
        state.tag = type2.tag;
        if (state.anchor !== null) {
          state.anchorMap[state.anchor] = state.result;
        }
        break;
      }
    }
  } else if (state.tag !== "!") {
    if (_hasOwnProperty$1.call(state.typeMap[state.kind || "fallback"], state.tag)) {
      type2 = state.typeMap[state.kind || "fallback"][state.tag];
    } else {
      type2 = null;
      typeList = state.typeMap.multi[state.kind || "fallback"];
      for (typeIndex = 0, typeQuantity = typeList.length; typeIndex < typeQuantity; typeIndex += 1) {
        if (state.tag.slice(0, typeList[typeIndex].tag.length) === typeList[typeIndex].tag) {
          type2 = typeList[typeIndex];
          break;
        }
      }
    }
    if (!type2) {
      throwError(state, "unknown tag !<" + state.tag + ">");
    }
    if (state.result !== null && type2.kind !== state.kind) {
      throwError(state, "unacceptable node kind for !<" + state.tag + '> tag; it should be "' + type2.kind + '", not "' + state.kind + '"');
    }
    if (!type2.resolve(state.result, state.tag)) {
      throwError(state, "cannot resolve a node with !<" + state.tag + "> explicit tag");
    } else {
      state.result = type2.construct(state.result, state.tag);
      if (state.anchor !== null) {
        state.anchorMap[state.anchor] = state.result;
      }
    }
  }
  if (state.listener !== null) {
    state.listener("close", state);
  }
  return state.tag !== null || state.anchor !== null || hasContent;
}
__name(composeNode, "composeNode");
function readDocument(state) {
  var documentStart = state.position, _position, directiveName, directiveArgs, hasDirectives = false, ch;
  state.version = null;
  state.checkLineBreaks = state.legacy;
  state.tagMap = /* @__PURE__ */ Object.create(null);
  state.anchorMap = /* @__PURE__ */ Object.create(null);
  while ((ch = state.input.charCodeAt(state.position)) !== 0) {
    skipSeparationSpace(state, true, -1);
    ch = state.input.charCodeAt(state.position);
    if (state.lineIndent > 0 || ch !== 37) {
      break;
    }
    hasDirectives = true;
    ch = state.input.charCodeAt(++state.position);
    _position = state.position;
    while (ch !== 0 && !is_WS_OR_EOL(ch)) {
      ch = state.input.charCodeAt(++state.position);
    }
    directiveName = state.input.slice(_position, state.position);
    directiveArgs = [];
    if (directiveName.length < 1) {
      throwError(state, "directive name must not be less than one character in length");
    }
    while (ch !== 0) {
      while (is_WHITE_SPACE(ch)) {
        ch = state.input.charCodeAt(++state.position);
      }
      if (ch === 35) {
        do {
          ch = state.input.charCodeAt(++state.position);
        } while (ch !== 0 && !is_EOL(ch));
        break;
      }
      if (is_EOL(ch))
        break;
      _position = state.position;
      while (ch !== 0 && !is_WS_OR_EOL(ch)) {
        ch = state.input.charCodeAt(++state.position);
      }
      directiveArgs.push(state.input.slice(_position, state.position));
    }
    if (ch !== 0)
      readLineBreak(state);
    if (_hasOwnProperty$1.call(directiveHandlers, directiveName)) {
      directiveHandlers[directiveName](state, directiveName, directiveArgs);
    } else {
      throwWarning(state, 'unknown document directive "' + directiveName + '"');
    }
  }
  skipSeparationSpace(state, true, -1);
  if (state.lineIndent === 0 && state.input.charCodeAt(state.position) === 45 && state.input.charCodeAt(state.position + 1) === 45 && state.input.charCodeAt(state.position + 2) === 45) {
    state.position += 3;
    skipSeparationSpace(state, true, -1);
  } else if (hasDirectives) {
    throwError(state, "directives end mark is expected");
  }
  composeNode(state, state.lineIndent - 1, CONTEXT_BLOCK_OUT, false, true);
  skipSeparationSpace(state, true, -1);
  if (state.checkLineBreaks && PATTERN_NON_ASCII_LINE_BREAKS.test(state.input.slice(documentStart, state.position))) {
    throwWarning(state, "non-ASCII line breaks are interpreted as content");
  }
  state.documents.push(state.result);
  if (state.position === state.lineStart && testDocumentSeparator(state)) {
    if (state.input.charCodeAt(state.position) === 46) {
      state.position += 3;
      skipSeparationSpace(state, true, -1);
    }
    return;
  }
  if (state.position < state.length - 1) {
    throwError(state, "end of the stream or a document separator is expected");
  } else {
    return;
  }
}
__name(readDocument, "readDocument");
function loadDocuments(input, options) {
  input = String(input);
  options = options || {};
  if (input.length !== 0) {
    if (input.charCodeAt(input.length - 1) !== 10 && input.charCodeAt(input.length - 1) !== 13) {
      input += "\n";
    }
    if (input.charCodeAt(0) === 65279) {
      input = input.slice(1);
    }
  }
  var state = new State$1(input, options);
  var nullpos = input.indexOf("\0");
  if (nullpos !== -1) {
    state.position = nullpos;
    throwError(state, "null byte is not allowed in input");
  }
  state.input += "\0";
  while (state.input.charCodeAt(state.position) === 32) {
    state.lineIndent += 1;
    state.position += 1;
  }
  while (state.position < state.length - 1) {
    readDocument(state);
  }
  return state.documents;
}
__name(loadDocuments, "loadDocuments");
function loadAll$1(input, iterator, options) {
  if (iterator !== null && typeof iterator === "object" && typeof options === "undefined") {
    options = iterator;
    iterator = null;
  }
  var documents = loadDocuments(input, options);
  if (typeof iterator !== "function") {
    return documents;
  }
  for (var index = 0, length = documents.length; index < length; index += 1) {
    iterator(documents[index]);
  }
}
__name(loadAll$1, "loadAll$1");
function load$1(input, options) {
  var documents = loadDocuments(input, options);
  if (documents.length === 0) {
    return void 0;
  } else if (documents.length === 1) {
    return documents[0];
  }
  throw new exception("expected a single document in the stream, but found more");
}
__name(load$1, "load$1");
var loadAll_1 = loadAll$1;
var load_1 = load$1;
var loader = {
  loadAll: loadAll_1,
  load: load_1
};
var _toString = Object.prototype.toString;
var _hasOwnProperty = Object.prototype.hasOwnProperty;
var CHAR_BOM = 65279;
var CHAR_TAB = 9;
var CHAR_LINE_FEED = 10;
var CHAR_CARRIAGE_RETURN = 13;
var CHAR_SPACE = 32;
var CHAR_EXCLAMATION = 33;
var CHAR_DOUBLE_QUOTE = 34;
var CHAR_SHARP = 35;
var CHAR_PERCENT = 37;
var CHAR_AMPERSAND = 38;
var CHAR_SINGLE_QUOTE = 39;
var CHAR_ASTERISK = 42;
var CHAR_COMMA = 44;
var CHAR_MINUS = 45;
var CHAR_COLON = 58;
var CHAR_EQUALS = 61;
var CHAR_GREATER_THAN = 62;
var CHAR_QUESTION = 63;
var CHAR_COMMERCIAL_AT = 64;
var CHAR_LEFT_SQUARE_BRACKET = 91;
var CHAR_RIGHT_SQUARE_BRACKET = 93;
var CHAR_GRAVE_ACCENT = 96;
var CHAR_LEFT_CURLY_BRACKET = 123;
var CHAR_VERTICAL_LINE = 124;
var CHAR_RIGHT_CURLY_BRACKET = 125;
var ESCAPE_SEQUENCES = {};
ESCAPE_SEQUENCES[0] = "\\0";
ESCAPE_SEQUENCES[7] = "\\a";
ESCAPE_SEQUENCES[8] = "\\b";
ESCAPE_SEQUENCES[9] = "\\t";
ESCAPE_SEQUENCES[10] = "\\n";
ESCAPE_SEQUENCES[11] = "\\v";
ESCAPE_SEQUENCES[12] = "\\f";
ESCAPE_SEQUENCES[13] = "\\r";
ESCAPE_SEQUENCES[27] = "\\e";
ESCAPE_SEQUENCES[34] = '\\"';
ESCAPE_SEQUENCES[92] = "\\\\";
ESCAPE_SEQUENCES[133] = "\\N";
ESCAPE_SEQUENCES[160] = "\\_";
ESCAPE_SEQUENCES[8232] = "\\L";
ESCAPE_SEQUENCES[8233] = "\\P";
var DEPRECATED_BOOLEANS_SYNTAX = [
  "y",
  "Y",
  "yes",
  "Yes",
  "YES",
  "on",
  "On",
  "ON",
  "n",
  "N",
  "no",
  "No",
  "NO",
  "off",
  "Off",
  "OFF"
];
var DEPRECATED_BASE60_SYNTAX = /^[-+]?[0-9_]+(?::[0-9_]+)+(?:\.[0-9_]*)?$/;
function compileStyleMap(schema2, map2) {
  var result, keys, index, length, tag, style, type2;
  if (map2 === null)
    return {};
  result = {};
  keys = Object.keys(map2);
  for (index = 0, length = keys.length; index < length; index += 1) {
    tag = keys[index];
    style = String(map2[tag]);
    if (tag.slice(0, 2) === "!!") {
      tag = "tag:yaml.org,2002:" + tag.slice(2);
    }
    type2 = schema2.compiledTypeMap["fallback"][tag];
    if (type2 && _hasOwnProperty.call(type2.styleAliases, style)) {
      style = type2.styleAliases[style];
    }
    result[tag] = style;
  }
  return result;
}
__name(compileStyleMap, "compileStyleMap");
function encodeHex(character) {
  var string, handle, length;
  string = character.toString(16).toUpperCase();
  if (character <= 255) {
    handle = "x";
    length = 2;
  } else if (character <= 65535) {
    handle = "u";
    length = 4;
  } else if (character <= 4294967295) {
    handle = "U";
    length = 8;
  } else {
    throw new exception("code point within a string may not be greater than 0xFFFFFFFF");
  }
  return "\\" + handle + common.repeat("0", length - string.length) + string;
}
__name(encodeHex, "encodeHex");
var QUOTING_TYPE_SINGLE = 1;
var QUOTING_TYPE_DOUBLE = 2;
function State(options) {
  this.schema = options["schema"] || _default;
  this.indent = Math.max(1, options["indent"] || 2);
  this.noArrayIndent = options["noArrayIndent"] || false;
  this.skipInvalid = options["skipInvalid"] || false;
  this.flowLevel = common.isNothing(options["flowLevel"]) ? -1 : options["flowLevel"];
  this.styleMap = compileStyleMap(this.schema, options["styles"] || null);
  this.sortKeys = options["sortKeys"] || false;
  this.lineWidth = options["lineWidth"] || 80;
  this.noRefs = options["noRefs"] || false;
  this.noCompatMode = options["noCompatMode"] || false;
  this.condenseFlow = options["condenseFlow"] || false;
  this.quotingType = options["quotingType"] === '"' ? QUOTING_TYPE_DOUBLE : QUOTING_TYPE_SINGLE;
  this.forceQuotes = options["forceQuotes"] || false;
  this.replacer = typeof options["replacer"] === "function" ? options["replacer"] : null;
  this.implicitTypes = this.schema.compiledImplicit;
  this.explicitTypes = this.schema.compiledExplicit;
  this.tag = null;
  this.result = "";
  this.duplicates = [];
  this.usedDuplicates = null;
}
__name(State, "State");
function indentString(string, spaces) {
  var ind = common.repeat(" ", spaces), position = 0, next = -1, result = "", line, length = string.length;
  while (position < length) {
    next = string.indexOf("\n", position);
    if (next === -1) {
      line = string.slice(position);
      position = length;
    } else {
      line = string.slice(position, next + 1);
      position = next + 1;
    }
    if (line.length && line !== "\n")
      result += ind;
    result += line;
  }
  return result;
}
__name(indentString, "indentString");
function generateNextLine(state, level) {
  return "\n" + common.repeat(" ", state.indent * level);
}
__name(generateNextLine, "generateNextLine");
function testImplicitResolving(state, str2) {
  var index, length, type2;
  for (index = 0, length = state.implicitTypes.length; index < length; index += 1) {
    type2 = state.implicitTypes[index];
    if (type2.resolve(str2)) {
      return true;
    }
  }
  return false;
}
__name(testImplicitResolving, "testImplicitResolving");
function isWhitespace(c) {
  return c === CHAR_SPACE || c === CHAR_TAB;
}
__name(isWhitespace, "isWhitespace");
function isPrintable(c) {
  return 32 <= c && c <= 126 || 161 <= c && c <= 55295 && c !== 8232 && c !== 8233 || 57344 <= c && c <= 65533 && c !== CHAR_BOM || 65536 <= c && c <= 1114111;
}
__name(isPrintable, "isPrintable");
function isNsCharOrWhitespace(c) {
  return isPrintable(c) && c !== CHAR_BOM && c !== CHAR_CARRIAGE_RETURN && c !== CHAR_LINE_FEED;
}
__name(isNsCharOrWhitespace, "isNsCharOrWhitespace");
function isPlainSafe(c, prev, inblock) {
  var cIsNsCharOrWhitespace = isNsCharOrWhitespace(c);
  var cIsNsChar = cIsNsCharOrWhitespace && !isWhitespace(c);
  return (
    // ns-plain-safe
    (inblock ? (
      // c = flow-in
      cIsNsCharOrWhitespace
    ) : cIsNsCharOrWhitespace && c !== CHAR_COMMA && c !== CHAR_LEFT_SQUARE_BRACKET && c !== CHAR_RIGHT_SQUARE_BRACKET && c !== CHAR_LEFT_CURLY_BRACKET && c !== CHAR_RIGHT_CURLY_BRACKET) && c !== CHAR_SHARP && !(prev === CHAR_COLON && !cIsNsChar) || isNsCharOrWhitespace(prev) && !isWhitespace(prev) && c === CHAR_SHARP || prev === CHAR_COLON && cIsNsChar
  );
}
__name(isPlainSafe, "isPlainSafe");
function isPlainSafeFirst(c) {
  return isPrintable(c) && c !== CHAR_BOM && !isWhitespace(c) && c !== CHAR_MINUS && c !== CHAR_QUESTION && c !== CHAR_COLON && c !== CHAR_COMMA && c !== CHAR_LEFT_SQUARE_BRACKET && c !== CHAR_RIGHT_SQUARE_BRACKET && c !== CHAR_LEFT_CURLY_BRACKET && c !== CHAR_RIGHT_CURLY_BRACKET && c !== CHAR_SHARP && c !== CHAR_AMPERSAND && c !== CHAR_ASTERISK && c !== CHAR_EXCLAMATION && c !== CHAR_VERTICAL_LINE && c !== CHAR_EQUALS && c !== CHAR_GREATER_THAN && c !== CHAR_SINGLE_QUOTE && c !== CHAR_DOUBLE_QUOTE && c !== CHAR_PERCENT && c !== CHAR_COMMERCIAL_AT && c !== CHAR_GRAVE_ACCENT;
}
__name(isPlainSafeFirst, "isPlainSafeFirst");
function isPlainSafeLast(c) {
  return !isWhitespace(c) && c !== CHAR_COLON;
}
__name(isPlainSafeLast, "isPlainSafeLast");
function codePointAt(string, pos) {
  var first = string.charCodeAt(pos), second;
  if (first >= 55296 && first <= 56319 && pos + 1 < string.length) {
    second = string.charCodeAt(pos + 1);
    if (second >= 56320 && second <= 57343) {
      return (first - 55296) * 1024 + second - 56320 + 65536;
    }
  }
  return first;
}
__name(codePointAt, "codePointAt");
function needIndentIndicator(string) {
  var leadingSpaceRe = /^\n* /;
  return leadingSpaceRe.test(string);
}
__name(needIndentIndicator, "needIndentIndicator");
var STYLE_PLAIN = 1;
var STYLE_SINGLE = 2;
var STYLE_LITERAL = 3;
var STYLE_FOLDED = 4;
var STYLE_DOUBLE = 5;
function chooseScalarStyle(string, singleLineOnly, indentPerLevel, lineWidth, testAmbiguousType, quotingType, forceQuotes, inblock) {
  var i;
  var char = 0;
  var prevChar = null;
  var hasLineBreak = false;
  var hasFoldableLine = false;
  var shouldTrackWidth = lineWidth !== -1;
  var previousLineBreak = -1;
  var plain = isPlainSafeFirst(codePointAt(string, 0)) && isPlainSafeLast(codePointAt(string, string.length - 1));
  if (singleLineOnly || forceQuotes) {
    for (i = 0; i < string.length; char >= 65536 ? i += 2 : i++) {
      char = codePointAt(string, i);
      if (!isPrintable(char)) {
        return STYLE_DOUBLE;
      }
      plain = plain && isPlainSafe(char, prevChar, inblock);
      prevChar = char;
    }
  } else {
    for (i = 0; i < string.length; char >= 65536 ? i += 2 : i++) {
      char = codePointAt(string, i);
      if (char === CHAR_LINE_FEED) {
        hasLineBreak = true;
        if (shouldTrackWidth) {
          hasFoldableLine = hasFoldableLine || // Foldable line = too long, and not more-indented.
          i - previousLineBreak - 1 > lineWidth && string[previousLineBreak + 1] !== " ";
          previousLineBreak = i;
        }
      } else if (!isPrintable(char)) {
        return STYLE_DOUBLE;
      }
      plain = plain && isPlainSafe(char, prevChar, inblock);
      prevChar = char;
    }
    hasFoldableLine = hasFoldableLine || shouldTrackWidth && (i - previousLineBreak - 1 > lineWidth && string[previousLineBreak + 1] !== " ");
  }
  if (!hasLineBreak && !hasFoldableLine) {
    if (plain && !forceQuotes && !testAmbiguousType(string)) {
      return STYLE_PLAIN;
    }
    return quotingType === QUOTING_TYPE_DOUBLE ? STYLE_DOUBLE : STYLE_SINGLE;
  }
  if (indentPerLevel > 9 && needIndentIndicator(string)) {
    return STYLE_DOUBLE;
  }
  if (!forceQuotes) {
    return hasFoldableLine ? STYLE_FOLDED : STYLE_LITERAL;
  }
  return quotingType === QUOTING_TYPE_DOUBLE ? STYLE_DOUBLE : STYLE_SINGLE;
}
__name(chooseScalarStyle, "chooseScalarStyle");
function writeScalar(state, string, level, iskey, inblock) {
  state.dump = function() {
    if (string.length === 0) {
      return state.quotingType === QUOTING_TYPE_DOUBLE ? '""' : "''";
    }
    if (!state.noCompatMode) {
      if (DEPRECATED_BOOLEANS_SYNTAX.indexOf(string) !== -1 || DEPRECATED_BASE60_SYNTAX.test(string)) {
        return state.quotingType === QUOTING_TYPE_DOUBLE ? '"' + string + '"' : "'" + string + "'";
      }
    }
    var indent = state.indent * Math.max(1, level);
    var lineWidth = state.lineWidth === -1 ? -1 : Math.max(Math.min(state.lineWidth, 40), state.lineWidth - indent);
    var singleLineOnly = iskey || state.flowLevel > -1 && level >= state.flowLevel;
    function testAmbiguity(string2) {
      return testImplicitResolving(state, string2);
    }
    __name(testAmbiguity, "testAmbiguity");
    switch (chooseScalarStyle(
      string,
      singleLineOnly,
      state.indent,
      lineWidth,
      testAmbiguity,
      state.quotingType,
      state.forceQuotes && !iskey,
      inblock
    )) {
      case STYLE_PLAIN:
        return string;
      case STYLE_SINGLE:
        return "'" + string.replace(/'/g, "''") + "'";
      case STYLE_LITERAL:
        return "|" + blockHeader(string, state.indent) + dropEndingNewline(indentString(string, indent));
      case STYLE_FOLDED:
        return ">" + blockHeader(string, state.indent) + dropEndingNewline(indentString(foldString(string, lineWidth), indent));
      case STYLE_DOUBLE:
        return '"' + escapeString(string) + '"';
      default:
        throw new exception("impossible error: invalid scalar style");
    }
  }();
}
__name(writeScalar, "writeScalar");
function blockHeader(string, indentPerLevel) {
  var indentIndicator = needIndentIndicator(string) ? String(indentPerLevel) : "";
  var clip = string[string.length - 1] === "\n";
  var keep = clip && (string[string.length - 2] === "\n" || string === "\n");
  var chomp = keep ? "+" : clip ? "" : "-";
  return indentIndicator + chomp + "\n";
}
__name(blockHeader, "blockHeader");
function dropEndingNewline(string) {
  return string[string.length - 1] === "\n" ? string.slice(0, -1) : string;
}
__name(dropEndingNewline, "dropEndingNewline");
function foldString(string, width) {
  var lineRe = /(\n+)([^\n]*)/g;
  var result = function() {
    var nextLF = string.indexOf("\n");
    nextLF = nextLF !== -1 ? nextLF : string.length;
    lineRe.lastIndex = nextLF;
    return foldLine(string.slice(0, nextLF), width);
  }();
  var prevMoreIndented = string[0] === "\n" || string[0] === " ";
  var moreIndented;
  var match;
  while (match = lineRe.exec(string)) {
    var prefix = match[1], line = match[2];
    moreIndented = line[0] === " ";
    result += prefix + (!prevMoreIndented && !moreIndented && line !== "" ? "\n" : "") + foldLine(line, width);
    prevMoreIndented = moreIndented;
  }
  return result;
}
__name(foldString, "foldString");
function foldLine(line, width) {
  if (line === "" || line[0] === " ")
    return line;
  var breakRe = / [^ ]/g;
  var match;
  var start = 0, end, curr = 0, next = 0;
  var result = "";
  while (match = breakRe.exec(line)) {
    next = match.index;
    if (next - start > width) {
      end = curr > start ? curr : next;
      result += "\n" + line.slice(start, end);
      start = end + 1;
    }
    curr = next;
  }
  result += "\n";
  if (line.length - start > width && curr > start) {
    result += line.slice(start, curr) + "\n" + line.slice(curr + 1);
  } else {
    result += line.slice(start);
  }
  return result.slice(1);
}
__name(foldLine, "foldLine");
function escapeString(string) {
  var result = "";
  var char = 0;
  var escapeSeq;
  for (var i = 0; i < string.length; char >= 65536 ? i += 2 : i++) {
    char = codePointAt(string, i);
    escapeSeq = ESCAPE_SEQUENCES[char];
    if (!escapeSeq && isPrintable(char)) {
      result += string[i];
      if (char >= 65536)
        result += string[i + 1];
    } else {
      result += escapeSeq || encodeHex(char);
    }
  }
  return result;
}
__name(escapeString, "escapeString");
function writeFlowSequence(state, level, object) {
  var _result = "", _tag = state.tag, index, length, value;
  for (index = 0, length = object.length; index < length; index += 1) {
    value = object[index];
    if (state.replacer) {
      value = state.replacer.call(object, String(index), value);
    }
    if (writeNode(state, level, value, false, false) || typeof value === "undefined" && writeNode(state, level, null, false, false)) {
      if (_result !== "")
        _result += "," + (!state.condenseFlow ? " " : "");
      _result += state.dump;
    }
  }
  state.tag = _tag;
  state.dump = "[" + _result + "]";
}
__name(writeFlowSequence, "writeFlowSequence");
function writeBlockSequence(state, level, object, compact) {
  var _result = "", _tag = state.tag, index, length, value;
  for (index = 0, length = object.length; index < length; index += 1) {
    value = object[index];
    if (state.replacer) {
      value = state.replacer.call(object, String(index), value);
    }
    if (writeNode(state, level + 1, value, true, true, false, true) || typeof value === "undefined" && writeNode(state, level + 1, null, true, true, false, true)) {
      if (!compact || _result !== "") {
        _result += generateNextLine(state, level);
      }
      if (state.dump && CHAR_LINE_FEED === state.dump.charCodeAt(0)) {
        _result += "-";
      } else {
        _result += "- ";
      }
      _result += state.dump;
    }
  }
  state.tag = _tag;
  state.dump = _result || "[]";
}
__name(writeBlockSequence, "writeBlockSequence");
function writeFlowMapping(state, level, object) {
  var _result = "", _tag = state.tag, objectKeyList = Object.keys(object), index, length, objectKey, objectValue, pairBuffer;
  for (index = 0, length = objectKeyList.length; index < length; index += 1) {
    pairBuffer = "";
    if (_result !== "")
      pairBuffer += ", ";
    if (state.condenseFlow)
      pairBuffer += '"';
    objectKey = objectKeyList[index];
    objectValue = object[objectKey];
    if (state.replacer) {
      objectValue = state.replacer.call(object, objectKey, objectValue);
    }
    if (!writeNode(state, level, objectKey, false, false)) {
      continue;
    }
    if (state.dump.length > 1024)
      pairBuffer += "? ";
    pairBuffer += state.dump + (state.condenseFlow ? '"' : "") + ":" + (state.condenseFlow ? "" : " ");
    if (!writeNode(state, level, objectValue, false, false)) {
      continue;
    }
    pairBuffer += state.dump;
    _result += pairBuffer;
  }
  state.tag = _tag;
  state.dump = "{" + _result + "}";
}
__name(writeFlowMapping, "writeFlowMapping");
function writeBlockMapping(state, level, object, compact) {
  var _result = "", _tag = state.tag, objectKeyList = Object.keys(object), index, length, objectKey, objectValue, explicitPair, pairBuffer;
  if (state.sortKeys === true) {
    objectKeyList.sort();
  } else if (typeof state.sortKeys === "function") {
    objectKeyList.sort(state.sortKeys);
  } else if (state.sortKeys) {
    throw new exception("sortKeys must be a boolean or a function");
  }
  for (index = 0, length = objectKeyList.length; index < length; index += 1) {
    pairBuffer = "";
    if (!compact || _result !== "") {
      pairBuffer += generateNextLine(state, level);
    }
    objectKey = objectKeyList[index];
    objectValue = object[objectKey];
    if (state.replacer) {
      objectValue = state.replacer.call(object, objectKey, objectValue);
    }
    if (!writeNode(state, level + 1, objectKey, true, true, true)) {
      continue;
    }
    explicitPair = state.tag !== null && state.tag !== "?" || state.dump && state.dump.length > 1024;
    if (explicitPair) {
      if (state.dump && CHAR_LINE_FEED === state.dump.charCodeAt(0)) {
        pairBuffer += "?";
      } else {
        pairBuffer += "? ";
      }
    }
    pairBuffer += state.dump;
    if (explicitPair) {
      pairBuffer += generateNextLine(state, level);
    }
    if (!writeNode(state, level + 1, objectValue, true, explicitPair)) {
      continue;
    }
    if (state.dump && CHAR_LINE_FEED === state.dump.charCodeAt(0)) {
      pairBuffer += ":";
    } else {
      pairBuffer += ": ";
    }
    pairBuffer += state.dump;
    _result += pairBuffer;
  }
  state.tag = _tag;
  state.dump = _result || "{}";
}
__name(writeBlockMapping, "writeBlockMapping");
function detectType(state, object, explicit) {
  var _result, typeList, index, length, type2, style;
  typeList = explicit ? state.explicitTypes : state.implicitTypes;
  for (index = 0, length = typeList.length; index < length; index += 1) {
    type2 = typeList[index];
    if ((type2.instanceOf || type2.predicate) && (!type2.instanceOf || typeof object === "object" && object instanceof type2.instanceOf) && (!type2.predicate || type2.predicate(object))) {
      if (explicit) {
        if (type2.multi && type2.representName) {
          state.tag = type2.representName(object);
        } else {
          state.tag = type2.tag;
        }
      } else {
        state.tag = "?";
      }
      if (type2.represent) {
        style = state.styleMap[type2.tag] || type2.defaultStyle;
        if (_toString.call(type2.represent) === "[object Function]") {
          _result = type2.represent(object, style);
        } else if (_hasOwnProperty.call(type2.represent, style)) {
          _result = type2.represent[style](object, style);
        } else {
          throw new exception("!<" + type2.tag + '> tag resolver accepts not "' + style + '" style');
        }
        state.dump = _result;
      }
      return true;
    }
  }
  return false;
}
__name(detectType, "detectType");
function writeNode(state, level, object, block, compact, iskey, isblockseq) {
  state.tag = null;
  state.dump = object;
  if (!detectType(state, object, false)) {
    detectType(state, object, true);
  }
  var type2 = _toString.call(state.dump);
  var inblock = block;
  var tagStr;
  if (block) {
    block = state.flowLevel < 0 || state.flowLevel > level;
  }
  var objectOrArray = type2 === "[object Object]" || type2 === "[object Array]", duplicateIndex, duplicate;
  if (objectOrArray) {
    duplicateIndex = state.duplicates.indexOf(object);
    duplicate = duplicateIndex !== -1;
  }
  if (state.tag !== null && state.tag !== "?" || duplicate || state.indent !== 2 && level > 0) {
    compact = false;
  }
  if (duplicate && state.usedDuplicates[duplicateIndex]) {
    state.dump = "*ref_" + duplicateIndex;
  } else {
    if (objectOrArray && duplicate && !state.usedDuplicates[duplicateIndex]) {
      state.usedDuplicates[duplicateIndex] = true;
    }
    if (type2 === "[object Object]") {
      if (block && Object.keys(state.dump).length !== 0) {
        writeBlockMapping(state, level, state.dump, compact);
        if (duplicate) {
          state.dump = "&ref_" + duplicateIndex + state.dump;
        }
      } else {
        writeFlowMapping(state, level, state.dump);
        if (duplicate) {
          state.dump = "&ref_" + duplicateIndex + " " + state.dump;
        }
      }
    } else if (type2 === "[object Array]") {
      if (block && state.dump.length !== 0) {
        if (state.noArrayIndent && !isblockseq && level > 0) {
          writeBlockSequence(state, level - 1, state.dump, compact);
        } else {
          writeBlockSequence(state, level, state.dump, compact);
        }
        if (duplicate) {
          state.dump = "&ref_" + duplicateIndex + state.dump;
        }
      } else {
        writeFlowSequence(state, level, state.dump);
        if (duplicate) {
          state.dump = "&ref_" + duplicateIndex + " " + state.dump;
        }
      }
    } else if (type2 === "[object String]") {
      if (state.tag !== "?") {
        writeScalar(state, state.dump, level, iskey, inblock);
      }
    } else if (type2 === "[object Undefined]") {
      return false;
    } else {
      if (state.skipInvalid)
        return false;
      throw new exception("unacceptable kind of an object to dump " + type2);
    }
    if (state.tag !== null && state.tag !== "?") {
      tagStr = encodeURI(
        state.tag[0] === "!" ? state.tag.slice(1) : state.tag
      ).replace(/!/g, "%21");
      if (state.tag[0] === "!") {
        tagStr = "!" + tagStr;
      } else if (tagStr.slice(0, 18) === "tag:yaml.org,2002:") {
        tagStr = "!!" + tagStr.slice(18);
      } else {
        tagStr = "!<" + tagStr + ">";
      }
      state.dump = tagStr + " " + state.dump;
    }
  }
  return true;
}
__name(writeNode, "writeNode");
function getDuplicateReferences(object, state) {
  var objects = [], duplicatesIndexes = [], index, length;
  inspectNode(object, objects, duplicatesIndexes);
  for (index = 0, length = duplicatesIndexes.length; index < length; index += 1) {
    state.duplicates.push(objects[duplicatesIndexes[index]]);
  }
  state.usedDuplicates = new Array(length);
}
__name(getDuplicateReferences, "getDuplicateReferences");
function inspectNode(object, objects, duplicatesIndexes) {
  var objectKeyList, index, length;
  if (object !== null && typeof object === "object") {
    index = objects.indexOf(object);
    if (index !== -1) {
      if (duplicatesIndexes.indexOf(index) === -1) {
        duplicatesIndexes.push(index);
      }
    } else {
      objects.push(object);
      if (Array.isArray(object)) {
        for (index = 0, length = object.length; index < length; index += 1) {
          inspectNode(object[index], objects, duplicatesIndexes);
        }
      } else {
        objectKeyList = Object.keys(object);
        for (index = 0, length = objectKeyList.length; index < length; index += 1) {
          inspectNode(object[objectKeyList[index]], objects, duplicatesIndexes);
        }
      }
    }
  }
}
__name(inspectNode, "inspectNode");
function dump$1(input, options) {
  options = options || {};
  var state = new State(options);
  if (!state.noRefs)
    getDuplicateReferences(input, state);
  var value = input;
  if (state.replacer) {
    value = state.replacer.call({ "": value }, "", value);
  }
  if (writeNode(state, 0, value, true, true))
    return state.dump + "\n";
  return "";
}
__name(dump$1, "dump$1");
var dump_1 = dump$1;
var dumper = {
  dump: dump_1
};
function renamed(from, to) {
  return function() {
    throw new Error("Function yaml." + from + " is removed in js-yaml 4. Use yaml." + to + " instead, which is now safe by default.");
  };
}
__name(renamed, "renamed");
var Type = type;
var Schema = schema;
var FAILSAFE_SCHEMA = failsafe;
var JSON_SCHEMA = json;
var CORE_SCHEMA = core;
var DEFAULT_SCHEMA = _default;
var load = loader.load;
var loadAll = loader.loadAll;
var dump = dumper.dump;
var YAMLException = exception;
var types = {
  binary,
  float,
  map,
  null: _null,
  pairs,
  set,
  timestamp,
  bool,
  int,
  merge,
  omap,
  seq,
  str
};
var safeLoad = renamed("safeLoad", "load");
var safeLoadAll = renamed("safeLoadAll", "loadAll");
var safeDump = renamed("safeDump", "dump");
var jsYaml = {
  Type,
  Schema,
  FAILSAFE_SCHEMA,
  JSON_SCHEMA,
  CORE_SCHEMA,
  DEFAULT_SCHEMA,
  load,
  loadAll,
  dump,
  YAMLException,
  types,
  safeLoad,
  safeLoadAll,
  safeDump
};
var js_yaml_default = jsYaml;

// src/services/converter.js
async function convertConfig(content, startPort, auth, env) {
  try {
    const yamlData = js_yaml_default.load(content);
    if (!yamlData || !yamlData.proxies || !Array.isArray(yamlData.proxies)) {
      throw new Error("\u914D\u7F6E\u6587\u4EF6\u683C\u5F0F\u9519\u8BEF\uFF0C\u672A\u627E\u5230\u6709\u6548\u7684\u4EE3\u7406\u5217\u8868");
    }
    const originalCount = yamlData.proxies.length;
    const nodeFilter = createNodeFilter();
    const filterResult = nodeFilter.filterProxies(yamlData.proxies);
    const validProxies = filterResult.validProxies;
    const filteredCount = filterResult.filteredCount;
    if (validProxies.length === 0) {
      throw new Error("\u914D\u7F6E\u6587\u4EF6\u4E2D\u6CA1\u6709\u627E\u5230\u6709\u6548\u7684\u4EE3\u7406\u8282\u70B9");
    }
    const numProxies = validProxies.length;
    if (startPort + numProxies - 1 > 65535) {
      throw new Error(`\u7AEF\u53E3\u8303\u56F4\u8D85\u51FA\u9650\u5236\uFF01\u9700\u8981 ${numProxies} \u4E2A\u7AEF\u53E3\uFF0C\u4F46\u4ECE ${startPort} \u5F00\u59CB\u4F1A\u8D85\u8FC765535`);
    }
    const newConfig = {
      "allow-lan": true,
      "external-controller": "0.0.0.0:9090",
      "secret": "wangzh",
      "experimental": {
        "external-controller-cors": {
          "enabled": true,
          "allow-origins": ["*"]
        }
      },
      "dns": {
        "enable": true,
        "enhanced-mode": "fake-ip",
        "fake-ip-range": "198.18.0.1/16",
        "default-nameserver": ["114.114.114.114"],
        "nameserver": ["https://doh.pub/dns-query"]
      },
      "listeners": [],
      "proxies": validProxies
    };
    newConfig.listeners = Array.from({ length: numProxies }, (_, i) => {
      const listener = {
        name: `mixed${i}`,
        type: "mixed",
        port: startPort + i,
        proxy: validProxies[i].name
      };
      if (auth && auth.username && auth.password) {
        listener.users = [{
          username: auth.username,
          password: auth.password
        }];
      }
      return listener;
    });
    const configYAML = js_yaml_default.dump(newConfig);
    return {
      config: configYAML,
      validNodes: numProxies,
      filteredNodes: filteredCount,
      originalNodes: originalCount,
      portRange: {
        start: startPort,
        end: startPort + numProxies - 1
      }
    };
  } catch (error) {
    console.error("Config conversion error:", error);
    if (error.name === "YAMLException") {
      throw new Error("YAML\u683C\u5F0F\u89E3\u6790\u9519\u8BEF\uFF1A" + error.message);
    }
    throw error;
  }
}
__name(convertConfig, "convertConfig");
function createNodeFilter() {
  const infoKeywords = [
    // Traffic related
    "\u5269\u4F59\u6D41\u91CF",
    "\u5DF2\u7528\u6D41\u91CF",
    "\u603B\u6D41\u91CF",
    "\u6D41\u91CF\u91CD\u7F6E",
    "GB",
    "MB",
    "TB",
    "\u4E0A\u4F20",
    "\u4E0B\u8F7D",
    "\u6D41\u91CF\u7EDF\u8BA1",
    "\u6D41\u91CF\u67E5\u8BE2",
    "\u6D41\u91CF\u63D0\u9192",
    // Time related
    "\u5230\u671F\u65F6\u95F4",
    "\u5957\u9910\u5230\u671F",
    "\u8DDD\u79BB\u4E0B\u6B21\u91CD\u7F6E",
    "\u5269\u4F59\u5929\u6570",
    "\u6709\u6548\u671F",
    "\u91CD\u7F6E\u65F6\u95F4",
    "\u7EED\u8D39",
    "\u8FC7\u671F",
    "\u5230\u671F",
    // Website and contact info
    "\u5B98\u7F51",
    "\u5907\u7528\u5B98\u7F51",
    "\u5BA2\u670D",
    "\u8054\u7CFB",
    "\u7FA4\u7EC4",
    "\u9891\u9053",
    "http",
    "https",
    "www.",
    ".com",
    ".cn",
    ".cc",
    ".net",
    ".org",
    "telegram",
    "tg",
    "qq\u7FA4",
    "\u5FAE\u4FE1\u7FA4",
    // Service info
    "\u5EFA\u8BAE",
    "\u63D0\u793A",
    "\u901A\u77E5",
    "\u516C\u544A",
    "\u8BF4\u660E",
    "\u6CE8\u610F",
    "\u4E13\u7EBF\u8282\u70B9",
    "\u4E2D\u8F6C\u8282\u70B9",
    "\u76F4\u8FDE\u8282\u70B9",
    "\u611F\u5230\u5361\u987F",
    "\u8BF7\u5207\u6362",
    "\u7EF4\u62A4",
    "\u5347\u7EA7",
    "\u6545\u969C",
    "\u4FEE\u590D",
    // Subscription and package info
    "\u8BA2\u9605\u94FE\u63A5",
    "\u8282\u70B9\u66F4\u65B0",
    "\u914D\u7F6E\u66F4\u65B0",
    "\u5957\u9910\u4FE1\u606F",
    "\u4F1A\u5458\u7B49\u7EA7",
    "\u7528\u6237\u7B49\u7EA7",
    "\u8D26\u6237",
    "\u4F59\u989D"
  ];
  const urlPattern = /(https?:\/\/[^\s]+)|(www\.[^\s]+\.[a-z]{2,})/i;
  const datePattern = /\d{4}-\d{2}-\d{2}/;
  const numberUnitPattern = /\d+\.?\d*\s*(GB|MB|TB|天|小时|分钟|日|月|年)/i;
  return {
    isInfoNode: function(proxy) {
      if (!proxy || !proxy.name) {
        return true;
      }
      const nodeName = proxy.name.toString();
      for (const keyword of infoKeywords) {
        if (nodeName.includes(keyword)) {
          return true;
        }
      }
      if (urlPattern.test(nodeName)) {
        return true;
      }
      if (datePattern.test(nodeName)) {
        return true;
      }
      if (numberUnitPattern.test(nodeName)) {
        return true;
      }
      if (!proxy.server || !proxy.port || !proxy.type) {
        return true;
      }
      return false;
    },
    filterProxies: function(proxies) {
      if (!Array.isArray(proxies)) {
        return { validProxies: [], filteredCount: 0, filteredNodes: [] };
      }
      const validProxies = [];
      const filteredNodes = [];
      for (const proxy of proxies) {
        if (this.isInfoNode(proxy)) {
          filteredNodes.push(proxy.name || "\u672A\u77E5\u8282\u70B9");
        } else {
          validProxies.push(proxy);
        }
      }
      return {
        validProxies,
        filteredCount: filteredNodes.length,
        filteredNodes
      };
    }
  };
}
__name(createNodeFilter, "createNodeFilter");

// src/utils/cache.js
var ErrorHandler = class {
  static handle(error, context = "") {
    console.error(`Error in ${context}:`, error);
    let status = 500;
    let userMessage = "\u670D\u52A1\u5668\u5185\u90E8\u9519\u8BEF";
    if (error.message.includes("URL\u683C\u5F0F\u65E0\u6548") || error.message.includes("\u4E0D\u5141\u8BB8\u8BBF\u95EE")) {
      status = 400;
      userMessage = error.message;
    } else if (error.message.includes("\u83B7\u53D6\u5931\u8D25") || error.message.includes("\u8D85\u65F6")) {
      status = 502;
      userMessage = error.message;
    } else if (error.message.includes("\u914D\u7F6E\u6587\u4EF6\u683C\u5F0F\u9519\u8BEF") || error.message.includes("YAML")) {
      status = 400;
      userMessage = error.message;
    } else if (error.message.includes("\u7AEF\u53E3\u8303\u56F4")) {
      status = 400;
      userMessage = error.message;
    }
    return new Response(JSON.stringify({
      error: true,
      message: userMessage,
      details: false ? error.stack : void 0
    }), {
      status,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      }
    });
  }
};
__name(ErrorHandler, "ErrorHandler");
var RequestHandler = class {
  static async withTimeout(promise, timeoutMs = 15e3) {
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error("\u8BF7\u6C42\u8D85\u65F6")), timeoutMs);
    });
    try {
      return await Promise.race([promise, timeoutPromise]);
    } catch (error) {
      throw error;
    }
  }
  /**
   * Basic request validation
   */
  static validateUrl(url) {
    try {
      const urlObj = new URL(url);
      if (!["http:", "https:"].includes(urlObj.protocol)) {
        throw new Error("URL\u683C\u5F0F\u65E0\u6548\uFF1A\u53EA\u652F\u6301HTTP/HTTPS\u534F\u8BAE");
      }
      const hostname = urlObj.hostname.toLowerCase();
      if (hostname === "localhost" || hostname === "127.0.0.1" || hostname.startsWith("192.168.") || hostname.startsWith("10.") || hostname.startsWith("172.16.") || hostname.includes("local")) {
        throw new Error("\u4E0D\u5141\u8BB8\u8BBF\u95EE\u672C\u5730\u5730\u5740");
      }
      return urlObj;
    } catch (error) {
      if (error.message.includes("\u4E0D\u5141\u8BB8\u8BBF\u95EE") || error.message.includes("URL\u683C\u5F0F\u65E0\u6548")) {
        throw error;
      }
      throw new Error("URL\u683C\u5F0F\u65E0\u6548");
    }
  }
};
__name(RequestHandler, "RequestHandler");

// src/handlers/api.js
async function handleAPI(request, env, ctx) {
  const url = new URL(request.url);
  const path = url.pathname;
  try {
    let response;
    switch (path) {
      case "/api/health":
        response = new Response(JSON.stringify({
          status: "ok",
          timestamp: (/* @__PURE__ */ new Date()).toISOString(),
          version: "1.0.0",
          worker: "clash2socks5-converter"
        }), {
          headers: { "Content-Type": "application/json" }
        });
        break;
      case "/api/fetch":
        if (request.method !== "POST") {
          throw new Error("Method not allowed");
        }
        response = await handleFetchSubscription(request, env);
        break;
      case "/api/convert":
        if (request.method !== "POST") {
          throw new Error("Method not allowed");
        }
        response = await handleConvertConfig(request, env);
        break;
      case "/api/subscribe":
        if (request.method !== "GET") {
          throw new Error("Method not allowed");
        }
        response = await handleSubscribeDownload(request, env);
        break;
      default:
        response = new Response(JSON.stringify({
          error: "Not Found",
          message: "API endpoint not found"
        }), {
          status: 404,
          headers: { "Content-Type": "application/json" }
        });
    }
    return addCORSHeaders(response);
  } catch (error) {
    return ErrorHandler.handle(error, "API Handler");
  }
}
__name(handleAPI, "handleAPI");
async function handleFetchSubscription(request, env) {
  const body = await request.json();
  const { url } = body;
  if (!url) {
    throw new Error("URL is required");
  }
  RequestHandler.validateUrl(url);
  const result = await RequestHandler.withTimeout(
    fetchSubscription(url, env),
    6e4
    // 60 second timeout
  );
  return new Response(JSON.stringify({
    ...result,
    cached: false,
    // Always fresh data
    timestamp: (/* @__PURE__ */ new Date()).toISOString()
  }), {
    headers: { "Content-Type": "application/json" }
  });
}
__name(handleFetchSubscription, "handleFetchSubscription");
async function handleConvertConfig(request, env) {
  const body = await request.json();
  const { content, startPort, auth, configName } = body;
  if (!content) {
    throw new Error("Content is required");
  }
  if (!startPort || startPort < 1 || startPort > 65535) {
    throw new Error("Valid start port is required (1-65535)");
  }
  const result = await RequestHandler.withTimeout(
    convertConfig(content, startPort, auth, env),
    2e4
    // 20 second timeout
  );
  const fileName = generateCustomFilename(configName);
  return new Response(JSON.stringify({
    ...result,
    fileName,
    // Include generated filename in response
    timestamp: (/* @__PURE__ */ new Date()).toISOString()
  }), {
    headers: { "Content-Type": "application/json" }
  });
}
__name(handleConvertConfig, "handleConvertConfig");
async function handleSubscribeDownload(request, env) {
  const url = new URL(request.url);
  const searchParams = url.searchParams;
  const params = parseSubscribeParams(searchParams);
  let subscriptionResult;
  if (params.mode === "manual") {
    console.log("\u{1F6E0}\uFE0F \u5904\u7406\u624B\u52A8\u8F93\u5165\u6A21\u5F0F\u8BA2\u9605\u8BF7\u6C42");
    const instructionContent = `# Clash2Socks5 \u624B\u52A8\u8F93\u5165\u6A21\u5F0F\u8BA2\u9605\u8BF4\u660E
# 
# \u6B64\u8BA2\u9605URL\u662F\u4E3A\u624B\u52A8\u8F93\u5165\u7684\u914D\u7F6E\u751F\u6210\u7684\u53C2\u8003\u94FE\u63A5
# \u7531\u4E8E\u624B\u52A8\u8F93\u5165\u7684\u5185\u5BB9\u65E0\u6CD5\u52A8\u6001\u83B7\u53D6\uFF0C\u8BF7\u6309\u4EE5\u4E0B\u6B65\u9AA4\u4F7F\u7528\uFF1A
# 
# 1. \u8FD4\u56DE\u7F51\u9875\u754C\u9762: ${url.origin}
# 2. \u5728"\u624B\u52A8\u8F93\u5165"\u6807\u7B7E\u9875\u4E2D\u7C98\u8D34\u60A8\u7684Clash\u914D\u7F6E
# 3. \u8BBE\u7F6E\u76F8\u540C\u7684\u53C2\u6570\uFF1A\u7AEF\u53E3=${params.startPort}${params.auth ? `, \u8BA4\u8BC1=${params.auth.username}/**` : ", \u65E0\u8BA4\u8BC1"}
# 4. \u70B9\u51FB"\u751F\u6210Socks5\u914D\u7F6E\u6587\u4EF6"\u6309\u94AE
# 5. \u4E0B\u8F7D\u751F\u6210\u7684\u914D\u7F6E\u6587\u4EF6
#
# \u5982\u9700\u81EA\u52A8\u66F4\u65B0\u529F\u80FD\uFF0C\u8BF7\u4F7F\u7528"\u8BA2\u9605\u94FE\u63A5"\u6A21\u5F0F
#
# \u751F\u6210\u65F6\u95F4: ${(/* @__PURE__ */ new Date()).toISOString()}
# \u914D\u7F6E\u54C8\u5E0C: ${params.hash}

# \u4EE5\u4E0B\u662F\u793A\u4F8B\u914D\u7F6E\u7ED3\u6784\uFF0C\u8BF7\u66FF\u6362\u4E3A\u60A8\u7684\u5B9E\u9645\u914D\u7F6E
allow-lan: true
dns:
  enable: true
  enhanced-mode: fake-ip
  fake-ip-range: 198.18.0.1/16
  default-nameserver:
    - 114.114.114.114
  nameserver:
    - https://doh.pub/dns-query

# \u8BF7\u5728\u7F51\u9875\u754C\u9762\u5B8C\u6210\u5B9E\u9645\u8F6C\u6362
`;
    const filename2 = params.filename || `manual-mode-instructions-${(/* @__PURE__ */ new Date()).toISOString().slice(0, 10)}`;
    return new Response(instructionContent, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Content-Disposition": `attachment; filename="${filename2}.txt"`,
        "Cache-Control": "no-cache, no-store, must-revalidate",
        "X-Generated-At": (/* @__PURE__ */ new Date()).toISOString(),
        "X-Mode": "manual-instructions"
      }
    });
  }
  RequestHandler.validateUrl(params.subscriptionUrl);
  subscriptionResult = await RequestHandler.withTimeout(
    fetchSubscription(params.subscriptionUrl, env),
    6e4
    // 60 second timeout
  );
  const convertResult = await RequestHandler.withTimeout(
    convertConfig(subscriptionResult.content, params.startPort, params.auth, env),
    2e4
    // 20 second timeout
  );
  const filename = generateCustomFilename(params.filename);
  const responseHeaders = {
    "Content-Type": "application/x-yaml",
    "Content-Disposition": generateContentDisposition(filename + ".yaml"),
    "Cache-Control": "no-cache, no-store, must-revalidate",
    "X-Generated-At": (/* @__PURE__ */ new Date()).toISOString(),
    "X-Source-Format": subscriptionResult.format || "unknown",
    "X-Node-Count": convertResult.validNodes.toString()
  };
  if (subscriptionResult.subscriptionHeaders) {
    const passthrough = [
      "subscription-userinfo",
      "profile-update-interval",
      "profile-web-page-url",
      "profile-title"
    ];
    for (const key of passthrough) {
      if (subscriptionResult.subscriptionHeaders[key]) {
        responseHeaders[key] = subscriptionResult.subscriptionHeaders[key];
      }
    }
  }
  if (!responseHeaders["profile-update-interval"]) {
    responseHeaders["profile-update-interval"] = "24";
  }
  return new Response(convertResult.config, { headers: responseHeaders });
}
__name(handleSubscribeDownload, "handleSubscribeDownload");
function parseSubscribeParams(searchParams) {
  const mode = searchParams.get("mode");
  if (mode === "manual") {
    console.log("\u{1F6E0}\uFE0F \u68C0\u6D4B\u5230\u624B\u52A8\u8F93\u5165\u6A21\u5F0F");
    const hash = searchParams.get("hash");
    if (!hash) {
      throw new Error("\u624B\u52A8\u8F93\u5165\u6A21\u5F0F\u9700\u8981\u5185\u5BB9\u6807\u8BC6hash\u53C2\u6570");
    }
    const portParam2 = searchParams.get("port");
    const startPort2 = portParam2 ? parseInt(portParam2) : 42e3;
    if (startPort2 < 1 || startPort2 > 65535) {
      throw new Error("\u7AEF\u53E3\u8303\u56F4\u5FC5\u987B\u57281-65535\u4E4B\u95F4");
    }
    let auth2 = null;
    const encodedAuth2 = searchParams.get("auth");
    if (encodedAuth2) {
      try {
        const authString = atob(encodedAuth2);
        const [username, password] = authString.split(":");
        if (username && password) {
          auth2 = { username, password };
        }
      } catch (error) {
        throw new Error("\u8BA4\u8BC1\u53C2\u6570\u683C\u5F0F\u9519\u8BEF\uFF0C\u8BF7\u63D0\u4F9BBase64\u7F16\u7801\u7684username:password");
      }
    }
    const filename2 = searchParams.get("filename");
    return {
      mode: "manual",
      hash,
      startPort: startPort2,
      auth: auth2,
      filename: filename2,
      subscriptionUrl: null
      // Manual mode doesn't have subscription URL
    };
  }
  const encodedUrl = searchParams.get("url");
  if (!encodedUrl) {
    throw new Error("URL\u53C2\u6570\u662F\u5FC5\u9700\u7684\uFF0C\u8BF7\u63D0\u4F9BBase64\u7F16\u7801\u7684\u8BA2\u9605\u94FE\u63A5");
  }
  let subscriptionUrl;
  try {
    subscriptionUrl = atob(encodedUrl);
  } catch (error) {
    throw new Error("URL\u53C2\u6570\u683C\u5F0F\u9519\u8BEF\uFF0C\u8BF7\u63D0\u4F9B\u6709\u6548\u7684Base64\u7F16\u7801");
  }
  const portParam = searchParams.get("port");
  const startPort = portParam ? parseInt(portParam) : 42e3;
  if (startPort < 1 || startPort > 65535) {
    throw new Error("\u7AEF\u53E3\u8303\u56F4\u5FC5\u987B\u57281-65535\u4E4B\u95F4");
  }
  let auth = null;
  const encodedAuth = searchParams.get("auth");
  if (encodedAuth) {
    try {
      const authString = atob(encodedAuth);
      const [username, password] = authString.split(":");
      if (username && password) {
        auth = { username, password };
      }
    } catch (error) {
      throw new Error("\u8BA4\u8BC1\u53C2\u6570\u683C\u5F0F\u9519\u8BEF\uFF0C\u8BF7\u63D0\u4F9BBase64\u7F16\u7801\u7684username:password");
    }
  }
  const filename = searchParams.get("filename");
  return {
    subscriptionUrl,
    startPort,
    auth,
    filename
  };
}
__name(parseSubscribeParams, "parseSubscribeParams");
function generateCustomFilename(customName = "") {
  const sanitizedName = sanitizeFileName(customName) || "clash2socks5";
  const now = /* @__PURE__ */ new Date();
  const year = now.getFullYear().toString().slice(-2);
  const month = (now.getMonth() + 1).toString().padStart(2, "0");
  const day = now.getDate().toString().padStart(2, "0");
  const dateStr = `${year}${month}${day}`;
  return `${sanitizedName}-${dateStr}`;
}
__name(generateCustomFilename, "generateCustomFilename");
function sanitizeFileName(input) {
  if (!input || typeof input !== "string")
    return "";
  return input.trim().replace(/[<>:"/\\|?*]/g, "").replace(/\s+/g, "-").replace(/[^\w\u4e00-\u9fa5-]/g, "").substring(0, 20);
}
__name(sanitizeFileName, "sanitizeFileName");
function generateContentDisposition(filename) {
  if (!filename || typeof filename !== "string") {
    return 'attachment; filename="config.yaml"';
  }
  const asciiFilename = filename.replace(/[^\w.-]/g, "_").substring(0, 50);
  const encodedFilename = encodeURIComponent(filename);
  return `attachment; filename="${asciiFilename}"; filename*=UTF-8''${encodedFilename}`;
}
__name(generateContentDisposition, "generateContentDisposition");

// src/index.js
var src_default = {
  async fetch(request, env, ctx) {
    try {
      if (request.method === "OPTIONS") {
        return handleCORS();
      }
      const url = new URL(request.url);
      const path = url.pathname;
      if (path.startsWith("/api/")) {
        return await handleAPI(request, env, ctx);
      }
      return await handleStatic(request, env, ctx);
    } catch (error) {
      console.error("Worker error:", error);
      return new Response(JSON.stringify({
        error: "Internal server error",
        message: error.message
      }), {
        status: 500,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*"
        }
      });
    }
  }
};
export {
  src_default as default
};
/*! Bundled license information:

js-yaml/dist/js-yaml.mjs:
  (*! js-yaml 4.1.0 https://github.com/nodeca/js-yaml @license MIT *)
*/
//# sourceMappingURL=index.js.map
