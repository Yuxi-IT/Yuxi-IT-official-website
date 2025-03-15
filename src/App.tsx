import { Route, Routes } from "react-router-dom";

import IndexPage from "@/pages/index";
import DocsPage from "@/pages/product";
import PricingPage from "@/pages/pricing";
import BlogPage from "@/pages/blog";
import AboutPage from "@/pages/about";
import SponsorPage from "@/pages/sponsor";
import ContactPage from "@/pages/contact";
import BlogViwer from "./pages/viwer";

function App() {
  return (
    <Routes>
      <Route element={<IndexPage />} path="/" />
      <Route element={<DocsPage />} path="/product" />
      <Route element={<PricingPage />} path="/pricing" />
      <Route element={<BlogPage />} path="/blog" />
      <Route element={<AboutPage />} path="/about" />
      <Route element={<SponsorPage />} path="/sponsor" />
      <Route element={<ContactPage />} path="/contact" />
      <Route element={<BlogViwer />} path="/view" />
    </Routes>
  );
}
export default App;
