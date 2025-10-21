import CirclePackChart from "../circle-pack-chart";
import type { NodeDatum } from "../helpers";

type SessionChartProps = {
  data: NodeDatum[]; // 每個元素代表一個年度 session
};

const SessionChart = ({ data }: SessionChartProps) => {
  // 如果沒有資料，顯示提示訊息
  if (!data || data.length === 0) {
    return (
      <div className="flex w-full items-center justify-center py-8">
        <p className="text-gray-500">目前無提案資料</p>
      </div>
    );
  }

  return (
    <>
      {data.map((session) => (
        <div
          key={session.id}
          className="mb-2 flex w-full flex-col items-start justify-center border-b-1"
        >
          <div className="flex flex-col items-start justify-center">
            <p>{session.name}</p>
            <p>{session.committeeName}</p>
          </div>
          <div className="md:mx-auto">
            <CirclePackChart
              data={{
                id: session.id,
                name: "root",
                children: session.children,
              }}
              padding={4}
            />
          </div>
        </div>
      ))}
    </>
  );
};

export default SessionChart;
