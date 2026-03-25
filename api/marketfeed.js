export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { clientId, token, ...body } = req.body;

  if (!clientId || !token) {
    return res.status(400).json({ error: "Missing clientId or token" });
  }

  try {
    const response = await fetch("https://api.dhan.co/v2/marketfeed/ltp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "access-token": token,
        "client-id": clientId,
      },
      body: JSON.stringify(body),
    });
    const data = await response.json();
    return res.status(response.status).json(data);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
