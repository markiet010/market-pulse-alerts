export async function onRequestGet({ env }) {
  const apiKey = env.TWELVE_DATA_API_KEY;

  if (!apiKey) {
    return Response.json(
      { error: "API key is not configured" },
      { status: 500 }
    );
  }

  const url = new URL("https://api.twelvedata.com/price");
  url.searchParams.set("symbol", "XAU/USD");
  url.searchParams.set("apikey", apiKey);

  const response = await fetch(url);
  const data = await response.json();

  if (!response.ok || !data.price) {
    return Response.json(
      { error: data.message || "Gold price unavailable" },
      { status: 502 }
    );
  }

  return Response.json({
    symbol: "XAU/USD",
    price: data.price
  });
}
