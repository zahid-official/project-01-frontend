import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative py-36 overflow-hidden">
      <div className="absolute inset-x-0 top-0 flex h-full w-full items-center justify-center opacity-100">
        <img
          alt="background"
          src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/patterns/square-alt-grid.svg"
          className="[mask-image:radial-gradient(75%_75%_at_center,white,transparent)] opacity-90"
        />
      </div>
      <div className="relative z-10 container">
        <div className="mx-auto flex max-w-5xl flex-col items-center">
          <div className="flex flex-col items-center text-center">
            <div className="rounded-xl bg-background/30 p-4 shadow-sm backdrop-blur-sm">
              <svg
                data-logo="logo"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 50 41"
                className="h-12"
              >
                <g
                  style={{ opacity: 1 }}
                  id="logogram"
                  transform="translate(0, 0) rotate(0)"
                >
                  <path
                    d="M37.8473 40.43C44.2801 40.2989 49.4526 35.0373 49.4526 28.5688C49.4526 25.4231 48.2038 22.4061 45.9809 20.1818L26.2421 0.429993V12.707C26.2421 14.7603 27.0573 16.7295 28.5082 18.1814L33.1321 22.8084L33.1448 22.8207L40.8979 30.5789C41.1497 30.8309 41.1497 31.2394 40.8979 31.4913C40.6461 31.7433 40.2379 31.7433 39.9861 31.4913L37.3136 28.8171H12.5917L9.91919 31.4913C9.6674 31.7433 9.25918 31.7433 9.00739 31.4913C8.75561 31.2394 8.75561 30.8309 9.00739 30.5789L16.7605 22.8207L16.7732 22.8084L21.3971 18.1814C22.848 16.7295 23.6631 14.7603 23.6631 12.707V0.429993L3.92439 20.1818C1.70146 22.4061 0.452637 25.4231 0.452637 28.5688C0.452637 35.0373 5.62516 40.2989 12.058 40.43H37.8473Z"
                    fill="currentColor"
                  />
                </g>
                <g
                  style={{ opacity: 1 }}
                  id="logotype"
                  transform="translate(50, 20.5)"
                />
              </svg>
            </div>
            <div>
              <h1 className="mb-5 text-2xl font-bold tracking-tight text-pretty lg:text-5xl">
                Explore the nature with{" "}
                <span className="text-primary">Wandora</span>
              </h1>
              <p className="mx-auto max-w-3xl text-muted-foreground lg:text-xl">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Elig
                doloremque mollitia fugiat omnis! Porro facilis quo animi
                consequatur. Explicabo.
              </p>
            </div>
            <div className="mt-8 flex justify-center gap-3">
              <Button className="shadow-sm transition-shadow hover:shadow">
                Explore Wandora
              </Button>
              <Button variant="outline" className="group">
                Learn more
                <ExternalLink className="transition-transform group-hover:translate-x-0.5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
