import type { V2_MetaFunction } from "@remix-run/node";
import Demo from "~/components/Demo";

export const meta: V2_MetaFunction = () => [{ title: "Remix Notes" }];

export default function Index() {
  return (
    <main className="text-center w-full">
        <Demo />
    </main>
  );
}
