import Image from "next/image";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ContextInputCard from "./components/ContextInputCard";
import StageTracker from "./components/StageTracker";

export default function Home() {
  return (
    console.log("hello id and password",process.env.GOOGLE_CLIENT_ID,process.env.GOOGLE_CLIENT_SECRET,process.env.DATABASE_URL),
    <div className="bg-black min-h-screen">
            <Navbar/>
            <Hero/>
            <StageTracker/>
=      
    </div>
  );
}
