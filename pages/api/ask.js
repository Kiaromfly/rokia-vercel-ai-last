export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method Not Allowed" });

  try {
    const response = await fetch("http://91.99.175.12:8080/ask", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer RokiaLab-2025-ACCESS"
      },
      body: JSON.stringify(req.body)
    });

    const data = await response.json();
    return res.status(200).json(data);

  } catch (error) {
    console.error("Errore nel proxy:", error);
    return res.status(500).json({ error: "Errore di comunicazione con il server AI." });
  }
}
