import type { V2_MetaFunction } from "@remix-run/node";
import NoDnd from "~/components/NoDnd";

export const meta: V2_MetaFunction = () => [{ title: "Remix Notes" }];

export default function Index() {
  return (
    <main className="w-full">
        <NoDnd />
    </main>
  );
}
