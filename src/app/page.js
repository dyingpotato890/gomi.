import Header from "@/components/Header"
import Content from "@/components/Content"

export default function Home() {
  return (
    <div className="flex flex-col w-full h-screen bg-[url('@/landingpageimage.png')] bg-cover bg-center">
    <Header/>
    <h1 className="pl-10 text-white font-rethink font-bold text-[5rem]">Clicks <br/> Turned to <br/> Clean Streets </h1>
    </div>
  );
}
