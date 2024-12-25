# ou-react-hooks

`ou-react-hooks` 是一个 React Hooks 库，提供了一些实用的自定义 Hook，帮助你更方便地管理 React 应用中的状态和副作用。

## 安装

使用 npm 或 pnpm 或 yarn 安装：

```sh
npm install ou-react-hooks
# 或者
pnpm install ou-react-hooks
# 或者
yarn add ou-react-hooks
```

## 使用方法

### `useUpdateFun`

一个简单的 Hook，用于强制组件更新。

```tsx
import { useUpdateFun } from "ou-react-hooks";

const MyComponent = () => {
  const update = useUpdateFun();

  return <button onClick={update}>强制更新</button>;
};
```

### `useReactRef`

一个带有 value 的响应式引用的 Hook。

```tsx
import { useReactRef } from "ou-react-hooks";
import { useEffect } from "react";

const MyComponent = () => {
  const { value: count } = useReactRef(1);

  useEffect(() => {
    setTimeout(() => {
      count.value += 1;
    }, 1000);
  }, []);

  return <div>{count.value}</div>;
};
```

### `useReactReactive`

一个用于创建响应式状态的 Hook。

```ts
import { useReactReactive } from "ou-react-hooks";
import { useEffect } from "react";

const MyComponent = () => {
  const { value: myData } = useReactReactive({ count: 0 });
  useEffect(() => {
    setTimeout(() => {
      myData.count += 1;
    }, 1000);
  }, []);

  return <div>{myData.count}</div>;
};
```

### `useInitProxyUpdate`

一个用于优化渲染性能的 hooks  
需要搭配 `useReactRef` 或 `useReactReactive` 使用

```tsx
import { useReactReactive } from "ou-react-hooks";
import Children from "xxxx";

const Parent = () => {
  const { value: myData } = useReactReactive({
    list: new Array(10).fill({ text: "这是一段文本" }),
  });

  const handleClick = (item) => {
    item.text += "1";
  };

  return myData.map((item) => (
    <>
      <Children data={item} />
      <button onClick={() => handleClick(item)}>+1</button>
    </>
  ));
};
```

当点击按钮的时候，只会触发某个 Children 的渲染，而非触发 Parent 的渲染

```tsx
import { useInitProxyUpdate } from "ou-react-hooks";

const Children = ({ data }) => {
  const { set } = useInitProxyUpdate();

  useEffect(() => {
    set(data);
  }, [data]);

  return <div>{data.text}</div>;
};
```

## 贡献

欢迎贡献代码！请确保在提交 PR 之前运行所有测试并通过 ESLint 检查。

## 许可证

[MIT](LICENSE)
