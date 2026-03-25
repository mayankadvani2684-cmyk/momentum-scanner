export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { clientId, token, ...orderBody } = req.body;

  if (!clientId || !token) {
    return res.status(400).json({ error: "Missing clientId or token" });
  }

  try {
    const response = await fetch("https://api.dhan.co/v2/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "access-token": token,
        "client-id": clientId,        // ← was missing
      },
      body: JSON.stringify({
        dhanClientId: clientId,
        ...orderBody,
      }),
    });
    const data = await response.json();
    return res.status(response.status).json(data);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
