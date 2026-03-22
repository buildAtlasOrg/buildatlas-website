import type { Metadata } from "next";
import DemoApp from "@/components/demo/DemoApp";

export const metadata: Metadata = {
  title: "BuildAtlas — Live Demo",
  description:
    "See BuildAtlas in action. Visualize GitHub Actions pipelines as interactive graphs and debug failures instantly.",
};

export default function DemoPage() {
  return <DemoApp />;
}
