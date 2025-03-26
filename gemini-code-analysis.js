// 1. استيراد المكتبات اللازمة
const {
  GoogleGenerativeAI,  // مكتبة Google للذكاء الاصطناعي التوليدي
  HarmCategory,        // فئات المحتوى الضار
  HarmBlockThreshold,  // عتبات حظر المحتوى الضار
} = require("@google/generative-ai");  // استيراد من حزمة جوجل الرسمية
const fs = require("node:fs");         // للتعامل مع نظام الملفات
const mime = require("mime-types");    // للتعامل مع أنواع MIME

// 2. إعداد مفتاح API واتصال بالخدمة
const apiKey = process.env.GEMINI_API_KEY;  // قراءة مفتاح API من متغيرات البيئة
const genAI = new GoogleGenerativeAI(apiKey); // إنشاء كائن للاتصال بالخدمة

// 3. تحديد النموذج المراد استخدامه
const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",  // استخدام نموذج gemini-2.0-flash (نموذج سريع)
});

// 4. تكوين إعدادات التوليد
const generationConfig = {
  temperature: 2,             // درجة حرارة عالية للإبداع (2 من 0-2)
  topP: 0.95,                 // احتمالية أعلى التوكينات (0.95 من 0-1)
  topK: 40,                   // أفضل 40 احتمال للكلمة التالية
  maxOutputTokens: 8192,      // الحد الأقصى لطول الناتج (8192 توكين)
  responseModalities: [],     // أنماط الاستجابة (فارغة حالياً)
  responseMimeType: "application/json", // نوع استجابة JSON
};

// 5. الدالة الرئيسية لتشغيل البرنامج
async function run() {
  // 6. بدء جلسة محادثة مع النموذج
  const chatSession = model.startChat({
    generationConfig,  // تطبيق إعدادات التوليد
    history: [],       // بدء محادثة بدون سجل سابق
  });

  // 7. إرسال رسالة إلى النموذج (يجب استبدال "INSERT_INPUT_HERE" برسالتك)
  const result = await chatSession.sendMessage("INSERT_INPUT_HERE");
  
  // 8. معالجة النتيجة (البيانات الثنائية مثل الصور)
  // ملاحظة: يحتاج إلى تعديل للتطبيقات على جانب العميل
  const candidates = result.response.candidates;
  for(let candidate_index = 0; candidate_index < candidates.length; candidate_index++) {
    for(let part_index = 0; part_index < candidates[candidate_index].content.parts.length; part_index++) {
      const part = candidates[candidate_index].content.parts[part_index];
      if(part.inlineData) {
        try {
          const filename = `output_${candidate_index}_${part_index}.${mime.extension(part.inlineData.mimeType)}`;
          fs.writeFileSync(filename, Buffer.from(part.inlineData.data, 'base64'));
          console.log(`Output written to: ${filename}`);
        } catch (err) {
          console.error(err);
        }
      }
    }
  }
  
  // 9. طباعة النص الناتج من الاستجابة
  console.log(result.response.text());
}

// 10. تشغيل البرنامج
run();