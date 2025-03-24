// ملف ai-agent.js - المساعد الذكي الآلي
document.addEventListener('DOMContentLoaded', function() {
    const aiAssistant = document.getElementById('ai-assistant');
    const chatHistory = document.getElementById('chat-history');
    const userMessage = document.getElementById('user-message');
    const sendButton = document.getElementById('send-message');
    const minimizeButton = document.getElementById('minimize-assistant');
    
    // الرمز السري للأوامر المهمة
    const SECRET_CODE = "1241";
    
    // حد الاستخدام اليومي
    const REQUEST_LIMIT = 20;
    
    // المفاتيح مشفرة بـ Base64
    const encryptedKeys = {
        claude: "UE1BSy02N2M0ZTkwOGNlNjUxODAwMDEyYmVhYjEtM2E4NDU0ODI2YzY4ZTliNTIxZGFjMDc0YzU1Njc0YTIzZQ==",
        openai: "c2stcHJvai1nVjNZeGUyZUFnRVVFQ2xtU1ZjSkdqYnM2U0Z1aWlXNmJOdHNocFFDZXZ6MjFBSnZTRTUzMHQ3Q3p3LTN2ZW4tMDJYYXEweEVDUFQzQmxia0ZKbUdGSXVVdUdTa1ZrMVBYUk55dTk2b2htb0dtdG9FcGxpMjQwNEI4REtPbjQ1Q09jR3hhSGs2X3E1LW8tbnBPWk0xM0dCaFVEOEE=",
        wathq: "S2d4MmUzT0ZPeFZkbmd4M1ZqNU96MFQzTGl2R21oVHo=",
        wathqAppId: "VHJpYWxfQXBwXzI0OTgz",
        telegram: "ODAxODQyNDkxMzpBQUU3Ni1lYXVwN3hEX3ZFckRaRFFoZU1hUFVXYnVLdENYNA=="
    };
    
    // إحصائيات الاستخدام
    let requestCount = parseInt(localStorage.getItem('ai_request_count') || '0');
    let lastRequestDate = localStorage.getItem('ai_last_request_date') || '';
    
    // إعادة ضبط العداد إذا كان يوم جديد
    const today = new Date().toDateString();
    if (lastRequestDate !== today) {
        requestCount = 0;
        localStorage.setItem('ai_last_request_date', today);
        localStorage.setItem('ai_request_count', '0');
    }
    
    // التحية عند بداية التشغيل
    setTimeout(function() {
        addMessage("مرحباً! أنا مساعدك الذكي. يمكنني مساعدتك في العديد من المهام. للأوامر المهمة، ستحتاج إلى كتابة الرمز السري. ماذا تريد أن تفعل اليوم؟", false);
        showUsageCount();
    }, 1000);
    
    // جعل المساعد قابل للسحب
    makeDraggable(aiAssistant, aiAssistant.querySelector('.ai-header'));
    
    // إضافة معالجات الأحداث
    minimizeButton.addEventListener('click', toggleMinimize);
    sendButton.addEventListener('click', handleSend);
    userMessage.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            handleSend();
        }
    });
    
    // فك تشفير المفاتيح
    function decryptKey(encrypted) {
        return atob(encrypted);
    }
    
    // تبديل حالة المساعد (مصغر/موسع)
    function toggleMinimize() {
        aiAssistant.classList.toggle('minimized');
        if (aiAssistant.classList.contains('minimized')) {
            minimizeButton.textContent = '□';
        } else {
            minimizeButton.textContent = '_';
            chatHistory.scrollTop = chatHistory.scrollHeight;
        }
    }
    
    // جعل العنصر قابل للسحب
    function makeDraggable(element, handle) {
        let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
        
        handle.onmousedown = dragMouseDown;
        
        function dragMouseDown(e) {
            e.preventDefault();
            pos3 = e.clientX;
            pos4 = e.clientY;
            document.onmouseup = closeDragElement;
            document.onmousemove = elementDrag;
        }
        
        function elementDrag(e) {
            e.preventDefault();
            pos1 = pos3 - e.clientX;
            pos2 = pos4 - e.clientY;
            pos3 = e.clientX;
            pos4 = e.clientY;
            
            const newTop = (element.offsetTop - pos2);
            const newLeft = (element.offsetLeft - pos1);
            
            // التأكد من بقاء المساعد ضمن حدود الشاشة
            if (newTop > 0 && newTop < window.innerHeight - 100) {
                element.style.top = newTop + "px";
            }
            if (newLeft > 0 && newLeft < window.innerWidth - 150) {
                element.style.left = newLeft + "px";
            }
        }
        
        function closeDragElement() {
            document.onmouseup = null;
            document.onmousemove = null;
        }
    }
    
    // إضافة رسالة للمحادثة
    function addMessage(text, isUser) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${isUser ? 'user-message' : 'ai-message'}`;
        messageDiv.textContent = text;
        chatHistory.appendChild(messageDiv);
        chatHistory.scrollTop = chatHistory.scrollHeight;
    }
    
    // عرض عداد الاستخدام
    function showUsageCount() {
        // إزالة العداد السابق إن وجد
        const oldCounter = chatHistory.querySelector('.usage-counter');
        if (oldCounter) {
            chatHistory.removeChild(oldCounter);
        }
        
        const usageDiv = document.createElement('div');
        usageDiv.className = 'message system-message usage-counter';
        usageDiv.textContent = `الاستخدام اليومي: ${requestCount}/${REQUEST_LIMIT}`;
        chatHistory.appendChild(usageDiv);
        chatHistory.scrollTop = chatHistory.scrollHeight;
    }
    
    // التحقق من أمر يحتاج للرمز السري
    function requiresAuth(message) {
        const sensitiveKeywords = [
            'احذف', 'امسح', 'غير', 'عدل', 'اضف', 'انشئ', 'ارسل', 'اتصل',
            'delete', 'change', 'modify', 'create', 'send', 'call', 'api'
        ];
        
        return sensitiveKeywords.some(keyword => 
            message.toLowerCase().includes(keyword) || 
            message.includes(keyword)
        );
    }
    
    // معالجة إرسال الرسالة
    async function handleSend() {
        const message = userMessage.value.trim();
        if (!message) return;
        
        // عرض رسالة المستخدم
        addMessage(message, true);
        userMessage.value = '';
        
        // التحقق مما إذا كان الأمر يتطلب رمز سري
        if (requiresAuth(message)) {
            const codePrompt = await promptForSecretCode();
            if (!codePrompt) {
                addMessage("تم إلغاء الأمر. هذا الأمر يتطلب تأكيد الرمز السري.", false);
                return;
            }
            
            if (codePrompt !== SECRET_CODE) {
                addMessage("الرمز السري غير صحيح. تم إلغاء الأمر.", false);
                return;
            }
        }
        
        // التحقق من حد الاستخدام اليومي
        if (requestCount >= REQUEST_LIMIT) {
            addMessage("لقد تجاوزت الحد اليومي للاستخدام. يرجى المحاولة غدًا.", false);
            return;
        }
        
        // إضافة رسالة "جاري التفكير..."
        const thinkingDiv = document.createElement('div');
        thinkingDiv.className = 'message ai-message';
        thinkingDiv.textContent = 'جاري التفكير...';
        chatHistory.appendChild(thinkingDiv);
        chatHistory.scrollTop = chatHistory.scrollHeight;
        
        // معالجة الأمر (محاولة تنفيذ العمليات الخاصة أولاً)
        let response;
        if (message.includes('ملخص') && message.includes('يوتيوب')) {
            response = "لتلخيص فيديو يوتيوب، أحتاج رابط الفيديو. يرجى مشاركة الرابط وسأقوم بتلخيص المحتوى.";
        } else {
            // استدعاء API كلود
            try {
                const apiKey = decryptKey(encryptedKeys.claude);
                response = await callClaudeAPI(message, apiKey);
                
                // تحديث عداد الاستخدام
                requestCount++;
                localStorage.setItem('ai_request_count', requestCount.toString());
            } catch (error) {
                console.error('Error calling AI API:', error);
                response = 'عذراً، حدث خطأ في الاتصال. يرجى المحاولة مرة أخرى.';
            }
        }
        
        // إزالة رسالة "جاري التفكير..."
        chatHistory.removeChild(thinkingDiv);
        
        // عرض الرد
        addMessage(response, false);
        
        // تحديث عداد الاستخدام
        showUsageCount();
    }
    
    // طلب الرمز السري
    async function promptForSecretCode() {
        return new Promise((resolve) => {
            const codePrompt = prompt("هذا الأمر يتطلب تأكيد الرمز السري. الرجاء إدخال الرمز:");
            resolve(codePrompt);
        });
    }
    
    // استدعاء API كلود
    async function callClaudeAPI(message, apiKey) {
        const response = await fetch('https://api.anthropic.com/v1/messages', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': apiKey,
                'anthropic-version': '2023-06-01'
            },
            body: JSON.stringify({
                model: "claude-3-haiku-20240307",
                max_tokens: 1000,
                messages: [
                    { 
                        role: "user", 
                        content: `أنت مساعد ذكي (AI Agent) يمكنه تنفيذ مهام متنوعة. المستخدم هو المالك. أجب على السؤال التالي: ${message}`
                    }
                ]
            })
        });
        
        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }
        
        const data = await response.json();
        return data.content[0].text;
    }
    
    // استدعاء OpenAI API (كاحتياطي)
    async function callOpenAIAPI(message, apiKey) {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages: [
                    {
                        role: "system",
                        content: "أنت مساعد ذكي (AI Agent) يمكنه تنفيذ مهام متنوعة. المستخدم هو المالك."
                    },
                    {
                        role: "user",
                        content: message
                    }
                ],
                max_tokens: 500
            })
        });
        
        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }
        
        const data = await response.json();
        return data.choices[0].message.content;
    }
});
