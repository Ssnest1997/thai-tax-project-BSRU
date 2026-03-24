import { Button } from "@/components/ui/button";
import { ArrowDown, Calculator, BookOpen, TrendingUp } from "lucide-react";
import heroImage from "@/assets/tax-hero-image.jpg";

const HeroSection = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center bg-gradient-hero overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.1),transparent)] bg-[size:50px_50px]"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-white space-y-6">
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                มาทำความรู้จัก
                <span className="text-accent block">ภาษีเงินได้</span>
                กันอย่างง่ายดาย
              </h1>
              <p className="text-xl text-white/90 leading-relaxed max-w-2xl">
                เรียนรู้เกี่ยวกับระบบภาษีเงินได้บุคคลธรรมดาในประเทศไทย 
                พร้อมเครื่องมือคำนวณภาษีที่แม่นยำและใช้งานง่าย 
                เพื่อการวางแผนทางการเงินที่ดีขึ้น
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 py-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-accent">8</div>
                <div className="text-sm text-white/80">ประเภทเงินได้</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-accent">8</div>
                <div className="text-sm text-white/80">ขั้นอัตราภาษี</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-accent">35%</div>
                <div className="text-sm text-white/80">อัตราภาษีสูงสุด</div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="bg-accent text-accent-foreground hover:bg-accent-light transition-all"
                onClick={() => scrollToSection('calculator')}>
                
                <Calculator className="w-5 h-5 mr-2" />
                คำนวณภาษี
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white/30 transition-all text-accent-foreground bg-secondary-foreground hover:bg-white/20 hover:border-white/50"
                onClick={() => scrollToSection('intro')}>
                
                <BookOpen className="w-5 h-5 mr-2" />
                เรียนรู้เพิ่มเติม
              </Button>
            </div>

            {/* Scroll Indicator */}
            <div className="mt-12">
              <button
                onClick={() => scrollToSection('intro')}
                className="flex items-center text-white/70 hover:text-white transition-colors group">
                
                <span className="mr-2">เลื่อนลงเพื่อเรียนรู้</span>
                <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative">
            <div className="relative z-10">
              <img
                src={heroImage}
                alt="Thai Tax Calculation Illustration"
                className="w-full h-auto rounded-2xl shadow-strong" />
              
            </div>
            
            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-accent/20 rounded-full flex items-center justify-center backdrop-blur-sm">
              <TrendingUp className="w-8 h-8 text-accent" />
            </div>
            <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-secondary/20 rounded-full flex items-center justify-center backdrop-blur-sm">
              <Calculator className="w-6 h-6 text-secondary-light" />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-20 fill-background">
          <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25"></path>
          <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5"></path>
          <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"></path>
        </svg>
      </div>
    </section>);

};

export default HeroSection;