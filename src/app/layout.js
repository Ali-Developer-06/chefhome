import "./globals.css";
import Footer from "@/Components/Footer";
import Navigation from "@/Components/Navigation";

export const metadata = {
  title: "Chef @t Home",
  description: "Order meals from professional chefs",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-[#F5EBDD]">
        <Navigation />
        <main className="max-w-6xl mx-auto px-4 py-8">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
