export default function Testpage({ params }: { params: { pageID: string } }) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
       <div>Some text : {params.pageID}</div>
      </main>
    );
  }