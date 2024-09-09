import Link from "next/link";

export default function Pages({ params }: { params: { pageID: string } }) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>Some text : {params.pageID} jflksdjflksldjkl</div>
      <Link href="/Testing/test">Go here </Link>
    </main>
  );
}
