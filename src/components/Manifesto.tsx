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
      <div className="mx-auto max-w-[1400px] px-5 py-32 md:px-10 md:py-48">
        {/* Section label */}
        <div className="mb-12 flex items-center gap-4">
          <span className="h-px w-8 bg-gilt opacity-70" aria-hidden />
          <span className="t-label text-gilt">Our philosophy</span>
        </div>

        <h2 id="manifesto" className="sr-only">
          Our approach in a sentence
        </h2>
        <p data-lit className="display t-lead max-w-[27ch] lg:ml-[8%] lg:max-w-[30ch]">
          <Words text={manifesto} />
        </p>

        <p data-reveal className="mt-8 max-w-[42ch] text-[1.0625rem] leading-[1.75] text-stone lg:ml-[8%]">
          {manifestoCaption}
        </p>

        <div data-reveal className="mt-12 lg:ml-[8%]">
          <Button href="/counsel" variant="link">
            Meet our counsel
          </Button>
        </div>

        {/* Values grid */}
        <div data-stagger className="mt-20 grid gap-8 sm:grid-cols-2 lg:ml-[8%] lg:grid-cols-4 lg:mt-24">
          {values.map((v, i) => (
            <div key={v.title} className="group border-t border-line pt-7">
              <span className="t-label text-stone/40">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="display mt-4 text-[1.4rem] leading-[1.2]">{v.title}</h3>
              <p className="mt-3 text-[0.9375rem] leading-[1.7]">{v.body}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Wide library plate */}
      <div
        data-clip
        className="photo relative h-[68svh] min-h-[26rem] w-full overflow-hidden bg-moss"
      >
        <div data-clip-inner className="absolute inset-0">
          <Img id={photography.library.id} alt={photography.library.alt} sizes="100vw" />
        </div>

        {/* Caption overlay */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-ink/80 to-transparent px-5 pb-10 pt-20 md:px-10">
          <p className="t-label text-gilt">Est. 2018 · Lahore High Court</p>
          <p className="mt-2 max-w-md text-[0.9375rem] leading-[1.6] text-ivory/80">
            Our chambers sit a short walk from the Lahore High Court — within reach when time is short and the stakes are high.
          </p>
        </div>
      </div>
    </section>
  );
}