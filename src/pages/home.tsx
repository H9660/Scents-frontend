import Shoppingpage from "./shoppingpage.tsx";
export async function getStaticProps() {
  const res = await fetch(`${process.env.API_KEY}api/perfume/all`);
  console.log(process.env.API_KEY)
  const perfumesData = await res.json();
  return {
    props: { perfumesData},
    revalidate: 60, // ISR: Updates data every 60 s ec
  };
}
export default function Home({perfumesData=[]}) {
  return (
    <>
    <div suppressHydrationWarning>
    <Shoppingpage perfumesData={perfumesData}/>
    </div>
    </>
  );
}
