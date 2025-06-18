export default async function handler(req, res) {
  // ✅ Gestione preflight CORS (OPTIONS)
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Origin', '*'); // oppure specifica il tuo dominio
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    return res.status(200).end();
  }

  // ✅ Altri metodi non ammessi
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { prompt } = req.body;

  try {
    const apiRes = await fetch("http://91.99.175.12:8080/ask", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer RokiaLab-2025-ACCESS"
      },
      body: JSON.stringify({ prompt })
    });

    const data = await apiRes.json();
    const reply = data?.message?.content || '⚠️ Nessuna risposta ricevuta.';

    // ✅ CORS headers per la risposta finale
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(200).json({ response: reply });
  } catch (err) {
    console.error("Errore chiamata a Flask:", err);
    res.status(500).json({ error: 'Errore durante la richiesta' });
  }
}
