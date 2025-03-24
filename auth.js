// ملف auth.js - المسؤول عن المصادقة
document.addEventListener('DOMContentLoaded', function() {
    const loginScreen = document.getElementById('login-screen');
    const mainContent = document.getElementById('main-content');
    const passwordInput = document.getElementById('password-input');
    const loginButton = document.getElementById('login-button');
    const loginError = document.getElementById('login-error');
    
    // رمز الدخول المشفر (1241)
    const encodedPass = "MTI0MQ=="; // Base64 لـ "1241"
    
    // التحقق من حالة تسجيل الدخول
    checkLoginState();
    
    // إضافة معالج لزر تسجيل الدخول
    loginButton.addEventListener('click', attemptLogin);
    
    // معالجة ضغط مفتاح Enter في حقل كلمة المرور
    passwordInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            attemptLogin();
        }
    });
    
    // التحقق من حالة تسجيل الدخول
    function checkLoginState() {
        const isLoggedIn = sessionStorage.getItem('authenticated') === 'true';
        if (isLoggedIn) {
            showMainContent();
        }
    }
    
    // محاولة تسجيل الدخول
    function attemptLogin() {
        const enteredPassword = passwordInput.value;
        
        if (enteredPassword === atob(encodedPass)) {
            // تسجيل الدخول ناجح
            sessionStorage.setItem('authenticated', 'true');
            showMainContent();
        } else {
            // تسجيل الدخول فاشل
            loginError.textContent = 'رمز الدخول غير صحيح';
            passwordInput.value = '';
        }
    }
    
    // إظهار المحتوى الرئيسي وإخفاء شاشة تسجيل الدخول
    function showMainContent() {
        loginScreen.style.display = 'none';
        mainContent.style.display = 'block';
    }
});
