
import NavBar from './components/NavBar';
import HeroSection from './components/HeroSection';
import Footer from './components/Footer';
import ServicesSection from './components/ServicesSection';
import VehicleSection from './components/VehicleSection';
import WhyChooseUs from './components/WhyChooseUs';
import TestimonialsSection from './components/TestimonialsSection';
import CTASection from './components/CTASection';
function App() {
  return (
    <div className="bg-slate-950 min-h-screen text-white flex flex-col">
        <NavBar/>
        <HeroSection/>
        <ServicesSection/>
        <VehicleSection />
        <WhyChooseUs/>
        <TestimonialsSection/>
        <CTASection/>
        <Footer/>
    </div>
  )
}

export default App;