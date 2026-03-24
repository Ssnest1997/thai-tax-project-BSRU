import HeroSection from "@/components/HeroSection";
import TaxIntroSection from "@/components/TaxIntroSection";
import IncomeTypesSection from "@/components/IncomeTypesSection";
import TaxCalculatorSection from "@/components/TaxCalculatorSection";

const Index = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <div id="intro">
        <TaxIntroSection />
      </div>
      <IncomeTypesSection />
      <div id="calculator">
        <TaxCalculatorSection />
      </div>
    </div>
  );
};

export default Index;
