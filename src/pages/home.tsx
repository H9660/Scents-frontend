import Shoppingpage from "./shoppingpage.tsx";
import axios from "axios";
export async function getStaticProps() {
  const res= await axios.get(process.env.API_KEY + `api/perfume/all`);
  const perfumesData = res.data
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
