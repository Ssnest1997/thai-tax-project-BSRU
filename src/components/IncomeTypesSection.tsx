import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, Briefcase, DollarSign, Building, TrendingUp, Home, Gift, Calculator, Banknote } from "lucide-react";

const IncomeTypesSection = () => {
  const [openSections, setOpenSections] = useState<number[]>([0]);

  const toggleSection = (index: number) => {
    setOpenSections(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const incomeTypes = [
    {
      id: 1,
      title: "เงินเดือน ค่าจ้าง โบนัส",
      icon: Briefcase,
      description: "รายได้จากการเป็นลูกจ้างหรือพนักงานบริษัท",
      details: [
        "เงินเดือนประจำ ค่าจ้างรายวัน รายชั่วโมง",
        "เงินโบนัส ค่าล่วงเวลา เบี้ยขยัน เงินประจำตำแหน่ง",
        "เงินช่วยเหลือค่าครองชีพ ค่าเบี้ยเลี้ยง (เกินอัตราที่กำหนด)",
        "เงินชดเชยในการเลิกจ้าง ค่าชดเชยแทนการบอกกล่าว",
        "สวัสดิการต่างๆ ที่ได้รับจากนายจ้าง เช่น ค่าที่พัก ค่ารถ"
      ],
      taxNote: "ได้รับยกเว้นภาษี 100,000 บาท หรือร้อยละ 50 ของรายได้ แล้วแต่จำนวนใดจะน้อยกว่า"
    },
    {
      id: 2,
      title: "ค่าธรรมเนียม ค่านายหน้า",
      icon: DollarSign,
      description: "รายได้จากการให้บริการวิชาชีพหรือการเป็นนายหน้า",
      details: [
        "ค่าธรรมเนียมแพทย์ พยาบาล ทันตแพทย์ สัตวแพทย์",
        "ค่าธรรมเนียมทนายความ นักบัญชี สถาปนิก วิศวกร",
        "ค่านายหน้าซื้อขายอสังหาริมทรัพย์ ตัวแทนประกันภัย",
        "ค่าจ้างที่ปรึกษา ค่าสอนพิเศษ ค่าบรรยาย",
        "รายได้จากการแสดง การกีฬาอาชีพ"
      ],
      taxNote: "ได้รับยกเว้นภาษี 100,000 บาท หรือร้อยละ 30 ของรายได้ แล้วแต่จำนวนใดจะน้อยกว่า"
    },
    {
      id: 3,
      title: "ค่าลิขสิทธิ์ ค่าแฟรนไชส์",
      icon: Building,
      description: "รายได้จากสิทธิในทรัพย์สินทางปัญญา",
      details: [
        "ค่าลิขสิทธิ์หนังสือ เพลง ภาพยนตร์ โปรแกรมคอมพิวเตอร์",
        "ค่าสิทธิบัตร ค่าเครื่องหมายการค้า",
        "ค่าแฟรนไชส์ ค่าสิทธิการใช้ชื่อการค้า",
        "ค่าจ้างใช้สูตรการผลิต วิธีการทำงาน",
        "ค่าเช่าหรือค่าให้เช่าทรัพย์สินทางปัญญา"
      ],
      taxNote: "ได้รับยกเว้นภาษีร้อยละ 40 ของรายได้"
    },
    {
      id: 4,
      title: "ดอกเบี้ย เงินปันผล รายได้จากหุ้น",
      icon: TrendingUp,
      description: "รายได้จากการลงทุนในตราสารการเงิน",
      details: [
        "ดอกเบี้ยเงินฝาก พันธบัตร หุ้นกู้",
        "เงินปันผลจากหุ้น รายได้จากกองทุนรวม",
        "กำไรจากการขายหุ้น หุ้นกู้ (ถือครองเกิน 1 ปี)",
        "รายได้จากการเล่นหุ้น การเก็งกำไร",
        "ดอกเบี้ยเงินให้กู้ยืม ค่าปรับผิดสัญญา"
      ],
      taxNote: "เงินปันผลได้รับยกเว้นภาษีในอัตราต่างๆ ตามประเภทการลงทุน"
    },
    {
      id: 5,
      title: "รายได้จากทรัพย์สิน",
      icon: Home,
      description: "รายได้จากการให้เช่าหรือการใช้ประโยชน์จากทรัพย์สิน",
      details: [
        "ค่าเช่าบ้าน ที่ดิน อาคาร โรงงาน",
        "ค่าเช่ารถยนต์ เครื่องจักร อุปกรณ์",
        "รายได้จากการใช้ประโยชน์ในทรัพย์สิน",
        "ค่าธรรมเนียมการโอนสิทธิ์การเช่า",
        "เงินจ่ายล่วงหน้าค่าเช่า เงินประกัน"
      ],
      taxNote: "ได้รับยกเว้นภาษีร้อยละ 30 ของรายได้ หรือค่าใช้จ่ายจริง แล้วแต่จำนวนใดจะมากกว่า"
    },
    {
      id: 6,
      title: "รายได้จากสัญญาจ้างทำของ",
      icon: Calculator,
      description: "รายได้จากการรับจ้างผลิตสินค้าหรือให้บริการ",
      details: [
        "รายได้จากการรับจ้างก่อสร้าง ซ่อมแซม",
        "รายได้จากการรับจ้างผลิตสินค้า",
        "รายได้จากการรับจ้างขนส่ง บรรทุก",
        "รายได้จากการรับจ้างทำงานศิลปกรรม",
        "รายได้จากการรับจ้างใดๆ ที่มีลักษณะเป็นสัญญาจ้างทำของ"
      ],
      taxNote: "ได้รับยกเว้นภาษีร้อยละ 70 ของรายได้"
    },
    {
      id: 7,
      title: "รายได้จากการพนัน การเล่นการพนัน",
      icon: Gift,
      description: "รายได้จากกิจกรรมการพนันที่ถูกกฎหมายและผิดกฎหมาย",
      details: [
        "รางวัลจากการซื้อลอตเตอรี่ สลากกินแบ่งรัฐบาล",
        "รางวัลจากการเล่นหวยใต้ดิน",
        "กำไรจากการเล่นการพนันทุกประเภท",
        "รางวัลจากการแข่งขันกีฬา การแข่งม้า",
        "รายได้อื่นๆ ที่มีลักษณะเป็นการพนัน"
      ],
      taxNote: "ไม่มีการยกเว้นภาษี ต้องเสียภาษีจากรายได้ทั้งหมด"
    },
    {
      id: 8,
      title: "รายได้จากธุรกิจ การค้า อสังหาริมทรัพย์",
      icon: Banknote,
      description: "รายได้จากการประกอบธุรกิจ การค้า หรือการขายทรัพย์สิน",
      details: [
        "กำไรจากการขายสินค้า การให้บริการ",
        "กำไรจากการขายที่ดิน บ้าน คอนโด",
        "รายได้จากการประกอบธุรกิจส่วนตัว",
        "กำไรจากการซื้อมาขายไป การเก็งกำไร",
        "รายได้อื่นๆ ที่ไม่อยู่ในประเภท 1-7"
      ],
      taxNote: "คำนวณจากกำไรสุทธิ (รายได้ - ค่าใช้จ่าย) ไม่มีการยกเว้นภาษี"
    }
  ];

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              ประเภทเงินได้ที่ต้องเสียภาษี
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              ประเทศไทยแบ่งเงินได้ออกเป็น 8 ประเภทเพื่อความเป็นธรรมในการจัดเก็บภาษี 
              แต่ละประเภทมีวิธีคำนวณและสิทธิยกเว้นภาษีที่แตกต่างกัน
            </p>
          </div>

          {/* Income Types Grid */}
          <div className="space-y-6">
            {incomeTypes.map((type, index) => {
              const Icon = type.icon;
              const isOpen = openSections.includes(index);
              
              return (
                <Card key={type.id} className="shadow-medium transition-all duration-200 hover:shadow-strong">
                  <Collapsible open={isOpen} onOpenChange={() => toggleSection(index)}>
                    <CollapsibleTrigger asChild>
                      <CardHeader className="cursor-pointer hover:bg-muted/50 transition-colors">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center">
                              <Icon className="w-6 h-6 text-primary-foreground" />
                            </div>
                            <div className="text-left">
                              <CardTitle className="text-xl text-foreground">
                                ประเภทที่ {type.id}: {type.title}
                              </CardTitle>
                              <p className="text-muted-foreground mt-1">
                                {type.description}
                              </p>
                            </div>
                          </div>
                          <ChevronDown 
                            className={`w-5 h-5 text-muted-foreground transition-transform duration-200 ${
                              isOpen ? 'rotate-180' : ''
                            }`} 
                          />
                        </div>
                      </CardHeader>
                    </CollapsibleTrigger>
                    
                    <CollapsibleContent>
                      <CardContent className="pt-0">
                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <h4 className="font-semibold text-foreground mb-3">
                              รายการรายได้ที่ครอบคลุม:
                            </h4>
                            <ul className="space-y-2">
                              {type.details.map((detail, idx) => (
                                <li key={idx} className="flex items-start text-muted-foreground">
                                  <span className="w-2 h-2 bg-secondary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                  {detail}
                                </li>
                              ))}
                            </ul>
                          </div>
                          
                          <div className="bg-gradient-card p-4 rounded-lg">
                            <h4 className="font-semibold text-foreground mb-2 flex items-center">
                              <Calculator className="w-4 h-4 mr-2 text-accent" />
                              หลักการคำนวณภาษี:
                            </h4>
                            <p className="text-muted-foreground text-sm leading-relaxed">
                              {type.taxNote}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </CollapsibleContent>
                  </Collapsible>
                </Card>
              );
            })}
          </div>

          {/* Additional Info */}
          <Card className="mt-12 bg-gradient-secondary shadow-medium">
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-secondary-foreground/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="w-4 h-4 text-secondary-foreground" />
                </div>
                <div>
                  <h4 className="font-semibold text-secondary-foreground mb-2">
                    ข้อมูลสำคัญที่ต้องทราบ
                  </h4>
                  <p className="text-secondary-foreground/80 text-sm leading-relaxed">
                    การคำนวณภาษีเงินได้บุคคลธรรมดาจะรวมรายได้จากทุกประเภทที่ได้รับในปีภาษีนั้น 
                    หลังจากหักค่าใช้จ่ายและการลดหย่อนตามสิทธิแล้ว จึงนำไปคำนวณภาษีตามอัตราขั้นบันได
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default IncomeTypesSection;