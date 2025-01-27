import React from "react";
import { FlipWords } from "@/components/ui/flip-words";
import HomeCards from "@/components/modules/home-cards/page";

const Home: React.FC = () => {
  const words = ["memes", "tokens", "RWAs", "Whatever"];

  return (
    <main className="pt-20 space-y-4">
      <section className="space-y-2 text-center">
        <h1 className="font-extrabold">Pool Money.</h1>
        <h1 className="font-extrabold">
          Trade
          <FlipWords words={words} />
        </h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa est
          laudantium vero?
        </p>
      </section>
      <HomeCards />
    </main>
  );
};

export default Home;