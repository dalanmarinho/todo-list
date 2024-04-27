import { BrowserRouter } from "react-router-dom";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { BarbecueProvider } from "./context/calc";
import { Toaster } from "react-hot-toast";
import { Rotas } from "./Routes/routes";

export function App() {
  return (
    <BrowserRouter>
      <BarbecueProvider>
        <Header />
        <main className="flex-1 container mx-auto px-4 max-w-[1480px] lg:w-[59%] md:w-[60%] sm:w-[60%]">
          <Rotas />
          <Toaster />
        </main>
        <Footer />
      </BarbecueProvider>
    </BrowserRouter>
  );
}