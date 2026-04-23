"use client"
import { useRouter } from "next/navigation";


export default function Home() {

    const router = useRouter();


   return (
        <div className="flex flex-col items-center h-screen text-center">
           
                <nav className="flex justify-between items-center px-4 md:px-16 lg:px-24 xl:px-32 py-3.5 border-b border-gray-200 w-full">
                    <a href="#" className="text-2xl font-semibold">
                        ISSOP
                    </a>
                    <div>
                        <button onClick={() => router.push("/login")} className="cursor-pointer bg-white border border-slate-300 text-slate-800 hover:bg-gray-300 px-6 md:px-8 py-2.5 rounded-full font-medium transition">
                        Sign in
                    </button>
                    <button onClick={() => router.push("/register")} className="cursor-pointer bg-black text-white hover:bg-gray-800 px-6 md:px-8 py-2.5 rounded-full font-medium transition">
                        Sign up
                    </button>
                    </div>
                    
                </nav>
                
                <h1 className="font-berkshire text-[45px]/[52px] md:text-6xl/[65px] mt-6 max-w-4xl pt-30">
                    Integrated Smart Services & Operations Platform 
                </h1>
                
            
                <form className="flex items-center mt-8 max-w-lg h-16 w-full rounded-full border border-gray-300">
                    <input type="email" placeholder="Enter email address" className="w-full h-full outline-none bg-transparent pl-6 pr-2 text-white placeholder:text-slate-300 rounded-full" />
                    <button className="bg-black text-white hover:bg-gray-800 text-nowrap px-8 md:px-10 h-12 mr-2 rounded-full font-medium transition">
                        Early access
                    </button>
                </form>
            
        </div>
    );
}
