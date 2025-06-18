export default async function handler(req, res) {
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

    // ✅ Estrai la risposta corretta
    const reply = data?.message?.content || '⚠️ Nessuna risposta ricevuta.';

    res.status(200).json({ response: reply });
  } catch (err) {
    console.error("Errore chiamata a Flask:", err);
    res.status(500).json({ error: 'Errore durante la richiesta' });
  }
}
