import Shoppingpage from "./shoppingpage.tsx";
export async function getStaticProps() {
  const res = await fetch(`${process.env.API_KEY}api/perfume/all`);
  const perfumesData = await res.json();
  return {
    props: { perfumesData },
    revalidate: 60,
  };
}
export default function Home({ perfumesData = [] }) {
  return (
    <>
      <div suppressHydrationWarning>
        <Shoppingpage perfumesData={perfumesData} />
      </div>
    </>
  );
}
