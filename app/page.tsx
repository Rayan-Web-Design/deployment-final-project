import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home | Book Management Library",
  description:
    "Discover popular books, new arrivals, and personalized recommendations.",
};

export default async function HomePage() {
  return <section className="container mx-auto h-full space-y-8 p-4"></section>;
}
