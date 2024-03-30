import PSUT from "../assets/PSUT.png";
import RSS from "../assets/RSS.png";

export const Sponsors = () => {
  return (
    <section id="sponsors" className="container pt-24 sm:py-32">
      <h2 className="text-center text-md lg:text-xl font-bold mb-8 text-primary">
        Investors & Sponsors
      </h2>

      <div className="flex flex-wrap justify-center items-center gap-4 md:gap-8">
        <div className="flex items-center gap-1 text-muted-foreground/60">
          <img src={PSUT} alt="PSUT Logo" />
        </div>
        <div className="flex items-center gap-1 text-muted-foreground/60">
          <img src={RSS} alt="PSUT Logo" />
        </div>
      </div>
    </section>
  );
};
