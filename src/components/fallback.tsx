import { Button } from "../components/ui/button";

export default function Fallback() {
  return (
    <div
      className="flex flex-col items-center justify-center min-h-[400px] w-full gap-4 text-center py-6"
      style={{ backgroundColor: "#282a36" }}
    >
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
          Uh oh! Something went wrong.
        </h1>
        <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
          Don&apos;t worry, we&apos;re on it. Try refreshing the page or check
          back in a few minutes.
        </p>
      </div>
      <Button variant="outline" onClick={() => alert("Go back")}>
        Go back
      </Button>
    </div>
  );
}
