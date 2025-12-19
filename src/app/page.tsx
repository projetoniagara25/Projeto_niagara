import AboutUsSection from "../components/AboutUsSection";
import ContactSection from "../components/ContactSection";
import Footer from "../components/footer/Footer";
import Header from "../components/header/Header";
import MainSlider from "../components/mainPage/MainSlider";
import ProductCarousel from "../components/ProductCarousel";
import WhyChooseUsSection from "../components/WhyChooseUsSection";
import InstagramFeed from "@/components/instagram/InstagramFeed";

export default function Home() {

  const whatsappNumber = '5511995354703';

  return (
    <>
    <Header></Header>

      <main className="flex flex-col h-max bg-gray-200 w-full overflow-x-hidden">


        <MainSlider></MainSlider>
        <AboutUsSection></AboutUsSection>
        <ProductCarousel whatsapp={whatsappNumber}></ProductCarousel>
        <WhyChooseUsSection></WhyChooseUsSection>
        <InstagramFeed></InstagramFeed>
        <ContactSection  whatsapp={whatsappNumber}></ContactSection>
      
      </main>

      <Footer whatsapp={whatsappNumber}></Footer>

    </>
  );
}
