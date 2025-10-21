## Feats
1. 先取用proposalsData
2. groupby budget year
3. 在對每個子項目groupby government
example會很類似，但不一樣，要按照實際程式碼
```
const data = [
  { id: 1, name: 'andy', year: 2025 },
  { id: 2, name: 'andy', year: 2024 },
  { id: 3, name: 'ben',  year: 2024 },
  { id: 4, name: 'jill', year: 2024 },
];

const result = _.mapValues(
  _.groupBy(data, 'name'),
  (items) => _.groupBy(items, 'year')
);

console.log(result);
```
4. 最後mapping成
```
type NodeDatum = {
  name: string;
  value?: number;
  color?: string;
  id?: string;
  children?: NodeDatum[];
};
const FAKE_DATA: NodeDatum = {
  name: "root",
  children: [
    {
      name: "#999999\n台灣自來水\n股份有限公司\n999999萬",
      value: 999999,
      color: "#6B7FFF",
      id: "1-14-1-05-024-7990",
      children: [
        {
          name: "#999999\n台灣自來水\n股份有限公司\n999999萬",
          value: 999999,
          color: "#6B7FFF",
          id: "1-14-1-05-024-7991",
        },
        {
          name: "#999999\n台灣自來水\n股份有限公司\n999999萬",
          value: 999999,
          color: "#6B7FFF",
          id: "1-14-1-05-024-7991",
        },
      ],
    },
    {
      name: "徐巧芯\n中國國民黨\n689998萬",
      value: 689998,
      color: "#6B7FFF",
      id: "1-14-1-05-024-7991",
      children: [
        // { name: "B-1", value: 1600 },
        // { name: "B-2", value: 300 },
      ],
    },
    {
      name: "徐巧芯\n中國國民黨\n70000萬",
      value: 70000,
      color: "#6B7FFF",
      id: "1-14-1-05-024-7992",
      children: [
        // { name: "C-1", value: 600 },
        // { name: "C-2", value: 500 },
        // { name: "C-3", value: 400 },
        // { name: "C-4", value: 300 },
      ],
    },
  ],
};
```
5. pass data 給 SessionChart

## Docs
1. https://lodash.com/docs/4.17.15#groupBy
2. https://lodash.com/docs/4.17.15#mapValues
3. https://lodash.com/docs/4.17.15#map
4. https://moldstud.com/articles/p-best-practices-for-working-with-lodash-in-a-project
## Reminders

1. 不用run pnpm dev
2. 不要破壞現有的邏輯
3. 不要破壞現有的排版