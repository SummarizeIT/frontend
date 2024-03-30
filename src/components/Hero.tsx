import { buttonVariants } from "./ui/button";
import { HeroCards } from "./HeroCards";
import { GitHubLogoIcon } from "@radix-ui/react-icons";

export const Hero = () => {
  return (
    <section className="container grid lg:grid-cols-2 place-items-center py-20 md:py-32 gap-10">
      <div className="text-center lg:text-start space-y-6">
        <main className="text-5xl md:text-6xl font-bold">
          <h1 className="inline">
            <span className="inline bg-gradient-to-r from-[#2d81ac]  to-[#023047] text-transparent bg-clip-text">
              Summarize your Important Meetings
            </span>{" "}
          </h1>{" "}
        </main>

        <p className="text-xl text-muted-foreground md:w-10/12 mx-auto lg:mx-0">
          speech summarization software designed to process and summarize spoken
          content in Arabic and English. This tool aims to efficiently organize
          and condense spoken words from various scenarios like meetings and
          lectures.
        </p>

        <div className="space-y-4 md:space-y-0 md:space-x-4">
          <a
            href="https://github.com/SummarizeIT"
            target="_blank"
            className={`w-full md:w-1/3 ${buttonVariants({
              variant: "outline",
            })}`}
          >
            Github Organization
            <GitHubLogoIcon className="ml-2 w-5 h-5" />
          </a>
        </div>
      </div>

      {/* Hero cards sections */}
      <div className="z-10">
        <HeroCards />
      </div>
    </section>
  );
};
