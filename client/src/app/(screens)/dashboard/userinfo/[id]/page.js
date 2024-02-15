import { Card, Title, LineChart } from "@tremor/react";

async function getUserData(id) {
  console.log(id, "params api test");
  const res = await fetch(
    `https://pr-stats.deveditor.workers.dev/pr-stats/api/author/${id}`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function User({ params }) {
  const data = await getUserData(params.id);
  console.log(data, "data api test");

  function getFormattedDate(originalData) {
    const date = new Date(originalData);

    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");

    return `${day}/${month}/${year}`;
  }

  const sumOfCommentsCount = data.reviews.reduce(
    (accumulator, { commentsCount }) => {
      return accumulator + commentsCount;
    },
    0
  );

  const sumOfReviewTime = data.reviews.reduce((accumulator, { reviewTime }) => {
    return accumulator + reviewTime;
  }, 0);

  const formattedData = data.reviews.map(function formatteDataForClientSide(
    prInfo
  ) {
    return {
      ...prInfo,
      submittedAt: getFormattedDate(prInfo.submittedAt),
    };
  });

  return (
    <div className="h-auto overflow-y-auto grid auto-rows-max p-4 gap-4 w-full">
      <div className="flex gap-4">
        <Card>
          <div></div>
          <Title>Comments count</Title>
          <div className="font-bold	text-lg text-cyan-600	">
            {sumOfCommentsCount}
          </div>
        </Card>
        <Card>
          <div></div>
          <Title>Review time</Title>
          <div className="font-bold	text-lg text-lime-600	">
            {sumOfReviewTime}
          </div>
        </Card>
      </div>
      <Card>
        <Title>Reviewer chart</Title>
        <LineChart
          className="mt-6"
          data={formattedData}
          index="submittedAt"
          categories={["reviewTime", "commentsCount"]}
          colors={["lime", "cyan"]}
          // valueFormatter={axisFormatter}
        />
      </Card>
    </div>
  );
}
