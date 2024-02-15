export async function GET() {
  const res = await fetch(
    "https://pr-stats.deveditor.workers.dev/pr-stats/api/author",
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const data = await res.json();

  return Response.json({ data });
}
