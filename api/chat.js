export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method Not Allowed' });
  try {
    const { text } = JSON.parse(req.body);
    const token = process.env.HF_TOKEN; 
    const response = await fetch("https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.3", {
      headers: { "Authorization": `Bearer ${token}`, "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify({ inputs: `[INST] Ты — Lesiva, продюсер из Тбилиси. Отвечай кратко по-братски. Вопрос: ${text} [/INST]` }),
    });
    const result = await response.json();
    const answer = result[0]?.generated_text.split('[/INST]').pop().trim() || "На связи!";
    res.status(200).json({ answer });
  } catch (e) {
    res.status(500).json({ error: "Ошибка сервера" });
  }
}
