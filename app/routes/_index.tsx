import type { V2_MetaFunction } from "@remix-run/node";

import { Provider } from 'react-redux'

import NoDnd from "~/components/NoDnd";
import { store } from "~/dataReduxStore";

export const meta: V2_MetaFunction = () => [{ title: "Remix Notes" }];

export default function Index() {
  return (
    <main className="w-full">
      <Provider store={store}>
        <NoDnd />
      </Provider>
    </main>
  );
}
