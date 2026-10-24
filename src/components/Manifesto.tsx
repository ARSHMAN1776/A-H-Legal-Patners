import { manifesto, manifestoCaption, photography, values } from "@/lib/content";
import { Img } from "@/components/Img";
import { Button } from "@/components/Button";

function Words({ text }: { text: string }) {
  return (
    <>
      {text.split(" ").map((token, i) => {
        const italic = token.includes("*");
        const word = token.replaceAll("*", "");
        return (
          <span key={i}>
            {italic ? (
              <em className="lit-word font-light">{word}</em>
            ) : (
              <span className="lit-word">{word}</span>
            )}{" "}
          </span>
        );
      })}
    </>
  );
}

export function Manifesto() {
  return (
    <section aria-labelledby="manifesto" className="bg-ink">
      <div className="mx-auto max-w-[1400px] px-5 py-16 sm:py-20 md:py-28 md:px-10">
        {/* Section label */}
        <div className="mb-8 sm:mb-10 flex items-center gap-4">
          <span className="h-px w-6 sm:w-8 bg-gilt opacity-70" aria-hidden />
          <span className="t-label text-gilt">Our philosophy</span>
        </div>

        <h2 id="manifesto" className="sr-only">
          Our approach in a sentence
        </h2>
        <p data-lit className="display t-lead max-w-[27ch] lg:ml-[6%] lg:max-w-[30ch]">
          <Words text={manifesto} />
        </p>

        <p data-reveal className="mt-5 sm:mt-7 max-w-[42ch] text-[1rem] sm:text-[1.0625rem] leading-[1.7] text-stone lg:ml-[6%]">
          {manifestoCaption}
        </p>

        <div data-reveal className="mt-7 sm:mt-10 lg:ml-[6%]">
          <Button href="/counsel" variant="link">
            Meet our counsel
          </Button>
        </div>

        {/* Values grid */}
        <div data-stagger className="mt-12 sm:mt-16 grid gap-5 sm:grid-cols-2 lg:ml-[6%] lg:grid-cols-4 lg:mt-20">
          {values.map((v, i) => (
            <div key={v.title} className="group rounded-xl border border-line/40 bg-forest/15 p-5 lg:border-none lg:border-t lg:border-line lg:bg-transparent lg:p-0 lg:pt-6">
              <span className="t-label text-stone/40">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="display mt-3 text-[1.3rem] leading-[1.2]">{v.title}</h3>
              <p className="mt-2 text-[0.875rem] leading-[1.65] text-stone">{v.body}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Wide library plate - scaled height for mobile to prevent endless scrolling */}
      <div
        data-clip
        className="photo relative h-[36svh] sm:h-[48svh] min-h-[16rem] md:min-h-[22rem] w-full overflow-hidden bg-moss"
      >
        <div data-clip-inner className="absolute inset-0">
          <Img id={photography.library.id} alt={photography.library.alt} sizes="100vw" />
        </div>

        {/* Caption overlay */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-ink/90 to-transparent px-5 pb-6 pt-16 md:px-10 md:pb-10 md:pt-20">
          <p className="t-label text-gilt">Est. 2018 · Lahore High Court</p>
          <p className="mt-1.5 max-w-md text-[0.875rem] sm:text-[0.9375rem] leading-[1.6] text-ivory/80">
            Our chambers sit a short walk from the Lahore High Court — within reach when time is short and the stakes are high.
          </p>
        </div>
      </div>
    </section>
  );
}