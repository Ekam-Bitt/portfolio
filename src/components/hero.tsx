import { BlockchainSolids } from "@/components/ui/blockchain-solids";
import { HyperText } from "@/components/ui/hyper-text";
import { Spotlight } from "@/components/ui/spotlight";

export function Hero() {
    return (
        <div className="h-[40rem] w-full rounded-md flex items-center justify-center bg-white dark:bg-black/[0.96] antialiased bg-grid-black/[0.05] dark:bg-grid-white/[0.02] relative overflow-hidden">
            <Spotlight
                className="-top-40 left-0 md:left-60 md:-top-20"
                fill="white"
            />
            <BlockchainSolids />
            <div className="p-4 max-w-7xl mx-auto relative z-10 w-full pt-0 pointer-events-none">
                <div className="pointer-events-auto">
                    <h1 className="text-4xl md:text-7xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-950 to-neutral-500 dark:from-neutral-50 dark:to-neutral-400 bg-opacity-50">
                        <HyperText text="Full-Stack Developer" className="block" />
                        <span className="text-blue-500">+</span> <br />
                        <HyperText text="Blockchain Engineer" className="block" />
                    </h1>
                    <p className="mt-4 font-normal text-base text-neutral-600 dark:text-neutral-300 max-w-lg text-center mx-auto">
                        I build scalable, secure, and user-centric applications for the web and web3.
                        Turning complex problems into elegant solutions.
                    </p>

                </div>
            </div>
        </div>
    );
}
