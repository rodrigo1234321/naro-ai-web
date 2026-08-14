const dotenv = require('dotenv');
dotenv.config();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY || '';

async function testGemini() {
  console.log('Testing Gemini API key...');
  if (!GEMINI_API_KEY) {
    console.log('GEMINI_API_KEY is missing in local .env');
    return;
  }
  
  const prompt = 'Responde en 1 frase: ¿Qué es CS2?';
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`;
  
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
    });
    
    console.log('Response Status:', res.status);
    const data = await res.json();
    if (res.ok) {
      console.log('Gemini SUCCESS Response:', JSON.stringify(data, null, 2));
    } else {
      console.log('Gemini ERROR Response:', JSON.stringify(data, null, 2));
    }
  } catch (err) {
    console.error('Fetch Exception:', err);
  }
}

testGemini();
