import { Hero } from "@/components/Hero";
import { Commitments } from "@/components/Commitments";
import { Manifesto } from "@/components/Manifesto";
import { Practice } from "@/components/Practice";
import { Process } from "@/components/Process";
import { Counsel } from "@/components/Counsel";
import { Faq } from "@/components/Faq";

export function Home() {
  return (
    <div>
      <Hero />
      <Commitments />
      <Manifesto />
      <Practice />
      <Process />
      <Counsel />
      <Faq />
    </div>
  );
}
