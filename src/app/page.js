import Header from "@/components/Header"
import Content from "@/components/Content"

const Map = dynamic(() => import('../components/Map'), {
    ssr: false,
});
export default function Home() {
  return (
    <div className="flex flex-col items-center h-screen w-screen bg-[#E8E9F3]">
    <Header/>
    <div className="flex w-[65rem] flex-1">
      <Content/>
      <Content/>
    </div>
    </div>
  );
}
