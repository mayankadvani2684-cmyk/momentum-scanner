export default async function handler(req, res) {
  if (req.method !== "GET") return res.status(405).json({ error: "Method not allowed" });

  const token = req.headers["access-token"];
  const clientId = req.headers["client-id"];

  if (!token || !clientId) {
    return res.status(400).json({ error: "Missing access-token or client-id headers" });
  }

  try {
    const response = await fetch("https://api.dhan.co/v2/profile", {
      method: "GET",
      headers: {
        "access-token": token,
        "client-id": clientId,
      },
    });
    const data = await response.json();
    return res.status(response.status).json(data);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
