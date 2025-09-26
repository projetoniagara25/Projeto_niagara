import AboutUsSection from "@/components/AboutUsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import GoogleMapsSection from "@/components/GoogleMapsSection";
import Header from "@/components/Header";
import MainSection from "@/components/MainSection";
import MainSlider from "@/components/MainSlider";
import ProductCarousel from "@/components/ProductCarousel";
import WhyChooseUsSection from "@/components/WhyChooseUsSection";

export default function Home() {

  return (
    <>
    <Header></Header>

      <main className="flex flex-col h-max bg-gray-200 w-full">

        <MainSlider></MainSlider>
        {/* <MainSection></MainSection> */}
        <AboutUsSection></AboutUsSection>
        <ProductCarousel></ProductCarousel>
        <WhyChooseUsSection></WhyChooseUsSection>
        <ContactSection></ContactSection>
      
      </main>

      <Footer></Footer>

    </>
  );
}
