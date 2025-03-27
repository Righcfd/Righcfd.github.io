* {<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400">
  <!-- خلفية -->
  <rect width="600" height="400" fill="#f8f9fa" rx="10" ry="10"/>
  
  <!-- عنوان -->
  <text x="300" y="30" font-family="Arial, sans-serif" font-size="20" fill="#2c3e50" text-anchor="middle" font-weight="bold">هيكلية مشروع منصة الذكاء الاصطناعي</text>
  
  <!-- طبقات المشروع -->
  <!-- طبقة الواجهة -->
  <rect x="50" y="60" width="500" height="80" fill="#3498db" rx="5" ry="5" opacity="0.8"/>
  <text x="300" y="90" font-family="Arial, sans-serif" font-size="16" fill="white" text-anchor="middle">طبقة واجهة المستخدم</text>
  <text x="300" y="115" font-family="Arial, sans-serif" font-size="12" fill="white" text-anchor="middle">index.html | style.css | main.js | auth.js</text>
  
  <!-- طبقة المصادقة -->
  <rect x="100" y="150" width="400" height="60" fill="#9b59b6" rx="5" ry="5" opacity="0.8"/>
  <text x="300" y="180" font-family="Arial, sans-serif" font-size="14" fill="white" text-anchor="middle">نظام المصادقة والأمان (auth.js)</text>
  
  <!-- طبقة الاتصال بالذكاء الاصطناعي -->
  <rect x="100" y="220" width="400" height="60" fill="#2ecc71" rx="5" ry="5" opacity="0.8"/>
  <text x="300" y="250" font-family="Arial, sans-serif" font-size="14" fill="white" text-anchor="middle">نظام الاتصال بخدمات الذكاء الاصطناعي (main.js)</text>
  
  <!-- طبقة التكامل الخلفية -->
  <rect x="50" y="290" width="500" height="80" fill="#e74c3c" rx="5" ry="5" opacity="0.8"/>
  <text x="300" y="320" font-family="Arial, sans-serif" font-size="16" fill="white" text-anchor="middle">طبقة الخدمات الخلفية</text>
  <text x="300" y="345" font-fa
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    background-color: #f8f9fa;
    color: #333;
}

/* تنسيق شاشة تسجيل الدخول */
.login-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #f8f9fa;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
}

.login-box {
    background-color: white;
    padding: 30px;
    border-radius: 10px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    width: 90%;
    max-width: 350px;
    text-align: center;
}

.login-box h2 {
    margin-bottom: 20px;
    color: #4285f4;
}

.login-box input {
    width: 100%;
    padding: 12px;
    border: 1px solid #ddd;
    border-radius: 5px;
    margin-bottom: 15px;
    font-size: 16px;
}

.login-box button {
    background-color: #4285f4;
    color: white;
    border: none;
    padding: 12px 20px;
    border-radius: 5px;
    font-size: 16px;
    cursor: pointer;
    width: 100%;
}

.error-message {
    color: #f44336;
    margin-top: 10px;
    font-size: 14px;
}

/* التطبيق الرئيسي */
.app {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
}

header {
    text-align: center;
    margin-bottom: 20px;
}

h1 {
    color: #4285f4;
}

button {
    background-color: #4285f4;
    color: white;
    border: none;
    padding: 10px 15px;
    border-radius: 5px;
    margin: 10px 0;
    font-size: 16px;
    cursor: pointer;
}

ul {
    list-style: none;
    margin-top: 20px;
}

li {
    padding: 10px;
    border-bottom: 1px solid #ddd;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

footer {
    text-align: center;
    margin-top: 30px;
    font-size: 14px;
    color: #666;
}

/* المساعد الذكي العائم */
.ai-assistant {
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 350px;
    background-color: white;
    border-radius: 10px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
    z-index: 100;
    transition: all 0.3s ease;
    overflow: hidden;
}

.ai-header {
    background-color: #4285f4;
    color: white;
    padding: 10px 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: move;
}

.ai-header h3 {
    margin: 0;
    font-size: 16px;
}

.ai-header button {
    background: none;
    border: none;
    color: white;
    font-size: 18px;
    cursor: pointer;
    margin: 0;
    padding: 0 5px;
}

.ai-body {
    padding: 15px;
}

.chat-history {
    height: 250px;
    overflow-y: auto;
    border: 1px solid #e0e0e0;
    border-radius: 5px;
    padding: 10px;
    margin-bottom: 10px;
    background-color: #f9f9f9;
}

.message {
    margin-bottom: 10px;
    padding: 8px 12px;
    border-radius: 5px;
    max-width: 85%;
    word-wrap: break-word;
}

.user-message {
    background-color: #e3f2fd;
    margin-left: auto;
    text-align: right;
}

.ai-message {
    background-color: #f1f1f1;
}

.system-message {
    background-color: #fff3cd;
    text-align: center;
    margin: 5px auto;
    font-size: 12px;
    color: #856404;
}

.chat-input {
    display: flex;
}

.chat-input input {
    flex: 1;
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
    margin-right: 8px;
}

.chat-input button {
    padding: 8px 15px;
}

/* وضع المساعد المصغر */
.ai-assistant.minimized {
    height: 40px;
    width: 180px;
}

.ai-assistant.minimized .ai-body {
    display: none;
}

