import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Calculator, PieChart, TrendingUp, Info, AlertCircle } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import TaxDeductionForm from "@/components/TaxDeductionForm";
import TaxResultPanel from "@/components/TaxResultPanel";

export interface TaxCalculation {
  grossIncome: number;
  totalDeductions: number;
  netIncome: number;
  tax: number;
  effectiveRate: number;
  brackets: { range: string; taxableAmount: number; rate: number; tax: number }[];
}

export interface DeductionOption {
  id: string;
  label: string;
  amount: number;
  max: number | null;
  description?: string;
  group: string;
}

// อ้างอิงตามกฎหมายภาษีไทย ปีภาษี 2568 (ยื่นปี 2569)
export const deductionOptions: DeductionOption[] = [
  // กลุ่มส่วนตัวและครอบครัว
  { id: "personal", label: "ค่าลดหย่อนส่วนตัว", amount: 60000, max: 60000, group: "personal", description: "สิทธิพื้นฐานสำหรับผู้มีเงินได้ทุกคน" },
  { id: "spouse", label: "คู่สมรส (ไม่มีรายได้)", amount: 60000, max: 60000, group: "personal", description: "คู่สมรสที่จดทะเบียนถูกต้องตามกฎหมายและไม่มีรายได้ตลอดปีภาษี" },
  { id: "child_before_2018", label: "บุตร (เกิดก่อน พ.ศ. 2561) คนละ 30,000", amount: 30000, max: 30000, group: "personal", description: "บุตรชอบด้วยกฎหมาย อายุไม่เกิน 25 ปีและยังศึกษาอยู่ หรืออายุไม่ถึง 20 ปี (กรอกจำนวนเงินรวมทั้งหมด)" },
  { id: "child_after_2018", label: "บุตรคนที่ 2+ (เกิดตั้งแต่ พ.ศ. 2561) คนละ 60,000", amount: 60000, max: 60000, group: "personal", description: "บุตรคนที่ 2 เป็นต้นไปที่เกิดตั้งแต่ พ.ศ. 2561 ลดหย่อนได้ 60,000 บาท/คน (กรอกจำนวนเงินรวมทั้งหมด)" },
  { id: "parent", label: "ค่าอุปการะเลี้ยงดูบิดามารดา (คนละ 30,000)", amount: 30000, max: 120000, group: "personal", description: "บิดามารดาต้องอายุ 60 ปีขึ้นไป มีเงินได้ไม่เกิน 30,000 บาท/ปี ใช้ได้ทั้งพ่อแม่ตนเองและคู่สมรส รวมสูงสุด 4 คน (120,000 บาท)" },
  { id: "disabled_person", label: "ค่าอุปการะผู้พิการ/ทุพพลภาพ (คนละ 60,000)", amount: 60000, max: null, group: "personal", description: "ผู้พิการต้องมีบัตรประจำตัวผู้พิการ มีเงินได้ไม่เกิน 30,000 บาท/ปี และผู้มีเงินได้ต้องเป็นผู้ดูแลจริง" },
  { id: "prenatal", label: "ค่าฝากครรภ์และค่าคลอดบุตร", amount: 0, max: 60000, group: "personal", description: "ตามที่จ่ายจริง สูงสุด 60,000 บาทต่อการตั้งครรภ์" },

  // กลุ่มประกันและเงินออม
  { id: "life_insurance", label: "เบี้ยประกันชีวิต/สะสมทรัพย์", amount: 0, max: 100000, group: "insurance", description: "กรมธรรม์ที่มีความคุ้มครอง 10 ปีขึ้นไป สูงสุด 100,000 บาท" },
  { id: "health_insurance", label: "เบี้ยประกันสุขภาพ (ตนเอง)", amount: 0, max: 25000, group: "insurance", description: "สูงสุด 25,000 บาท (รวมกับประกันชีวิตต้องไม่เกิน 100,000 บาท)" },
  { id: "parent_health_insurance", label: "เบี้ยประกันสุขภาพบิดามารดา", amount: 0, max: 15000, group: "insurance", description: "ตามที่จ่ายจริง สูงสุด 15,000 บาท บิดามารดาต้องอายุ 60 ปีขึ้นไป" },
  { id: "pension_insurance", label: "เบี้ยประกันบำนาญ", amount: 0, max: 200000, group: "retirement", description: "สูงสุด 200,000 บาท (ไม่เกิน 15% ของรายได้) รวมกลุ่มเกษียณต้องไม่เกิน 500,000 บาท" },
  { id: "spouse_life_insurance", label: "เบี้ยประกันชีวิตคู่สมรส", amount: 0, max: 10000, group: "insurance", description: "คู่สมรสที่ไม่มีรายได้ สูงสุด 10,000 บาท" },

  // กลุ่มกองทุนเพื่อการเกษียณ
  { id: "provident_fund", label: "กองทุนสำรองเลี้ยงชีพ (PVD)", amount: 0, max: 500000, group: "retirement", description: "ไม่เกิน 15% ของรายได้ สูงสุด 500,000 บาท รวมกลุ่มเกษียณต้องไม่เกิน 500,000 บาท" },
  { id: "rmf", label: "กองทุนรวมเพื่อการเลี้ยงชีพ (RMF)", amount: 0, max: 500000, group: "retirement", description: "ไม่เกิน 30% ของรายได้ สูงสุด 500,000 บาท รวมกลุ่มเกษียณต้องไม่เกิน 500,000 บาท" },
  { id: "nsf", label: "กองทุนการออมแห่งชาติ (กอช.)", amount: 0, max: 30000, group: "retirement", description: "ตามที่จ่ายจริง สูงสุด 30,000 บาท รวมกลุ่มเกษียณต้องไม่เกิน 500,000 บาท" },

  // กลุ่มประกันสังคม
  { id: "social_security", label: "เงินสมทบประกันสังคม", amount: 0, max: 9000, group: "social", description: "ตามที่จ่ายจริง สูงสุด 9,000 บาท (สำหรับผู้ประกันตน ม.33)" },

  // กลุ่มการลงทุน
  { id: "thai_esg", label: "กองทุนรวม Thai ESG", amount: 0, max: 300000, group: "investment", description: "ไม่เกิน 30% ของรายได้ สูงสุด 300,000 บาท (1 ม.ค. 2567 - 31 ธ.ค. 2569)" },

  // กลุ่มที่อยู่อาศัย
  { id: "housing_loan", label: "ดอกเบี้ยเงินกู้ยืมเพื่อที่อยู่อาศัย", amount: 0, max: 100000, group: "housing", description: "ตามที่จ่ายจริง สูงสุด 100,000 บาท" },
  { id: "new_home", label: "ค่าสร้างบ้านใหม่", amount: 0, max: 100000, group: "housing", description: "10,000 บาท ต่อค่าก่อสร้างทุก 1 ล้านบาท สูงสุด 100,000 บาท (สัญญา 9 เม.ย. 67 - 31 ธ.ค. 68)" },

  // กลุ่มมาตรการรัฐ
  { id: "easy_e_receipt", label: "Easy e-Receipt", amount: 0, max: 50000, group: "government", description: "ค่าซื้อสินค้า/บริการที่มี e-Tax Invoice (16 ม.ค. - 28 ก.พ. 2568)" },
  { id: "secondary_city_tour", label: "ค่าเที่ยวเมืองรอง", amount: 0, max: 20000, group: "government", description: "ค่าใช้จ่ายท่องเที่ยวเมืองรอง (29 ต.ค. - 15 ธ.ค. 2568)" },

  // กลุ่มบริจาค
  { id: "donation_general", label: "เงินบริจาคทั่วไป", amount: 0, max: null, group: "donation", description: "ตามที่จ่ายจริง สูงสุด 10% ของเงินได้หลังหักค่าใช้จ่ายและค่าลดหย่อนอื่น" },
  { id: "donation_education", label: "เงินบริจาคสนับสนุนการศึกษา/กีฬา/รพ.รัฐ (2 เท่า)", amount: 0, max: null, group: "donation", description: "หักได้ 2 เท่าของที่จ่ายจริง สูงสุด 10% ของเงินได้หลังหักค่าใช้จ่ายและค่าลดหย่อน" },
];

// กำหนดว่าแต่ละประเภทรายได้สามารถใช้ค่าลดหย่อนตัวใดได้บ้าง
// อ้างอิงตามประมวลรัษฎากรและกฎหมายภาษีไทย ปีภาษี 2568
const allDeductionIds = deductionOptions.map(d => d.id);

// ค่าลดหย่อนพื้นฐานที่ใช้ได้ทุกประเภทรายได้
const universalDeductions = [
  "personal", "spouse", "child_before_2018", "child_after_2018",
  "parent", "disabled_person", "prenatal",
  "life_insurance", "health_insurance", "parent_health_insurance",
  "pension_insurance", "spouse_life_insurance",
  "rmf", "nsf", "thai_esg",
  "housing_loan", "new_home",
  "easy_e_receipt", "secondary_city_tour",
  "donation_general", "donation_education",
];

// เงินได้ 40(1) เงินเดือน: ใช้ได้ทุกตัว รวม PVD และประกันสังคม
const salary40_1 = [...universalDeductions, "provident_fund", "social_security"];
// เงินได้ 40(2) ค่านายหน้า: ใช้ได้เกือบทุกตัว มีประกันสังคมได้ (ม.33) แต่ไม่มี PVD
const fee40_2 = [...universalDeductions, "social_security"];
// เงินได้ 40(3)-(8): ใช้ค่าลดหย่อนทั่วไปได้ ไม่มี PVD ไม่มีประกันสังคม ม.33
// แต่อาจมีประกันสังคม ม.39/40 ได้ → เราใส่ให้เลือกได้
const general40 = [...universalDeductions, "social_security"];
// เงินได้ 40(4) ดอกเบี้ย/เงินปันผล: ใช้ Final Tax เท่านั้น (หัก ณ ที่จ่าย 15%/10%)
// ไม่มีค่าลดหย่อนให้เลือก — ระบบจะแสดงข้อความแจ้งแทน
const interest40_4: string[] = [];

export const eligibleDeductionsByIncomeType: Record<string, string[]> = {
  salary: salary40_1,
  professional_fee: fee40_2,
  copyright: general40,
  interest: interest40_4,
  property: general40,
  professional: general40,
  contract: general40,
  business: general40,
};

// อ้างอิงค่าใช้จ่ายหักตามประเภทเงินได้ ตามประมวลรัษฎากร
export const incomeTypeExpenses: Record<string, { label: string; rate: string; description: string }> = {
  salary: { label: "เงินเดือน ค่าจ้าง (มาตรา 40(1))", rate: "50% ไม่เกิน 100,000 บาท", description: "หักค่าใช้จ่ายเหมา 50% สูงสุด 100,000 บาท" },
  professional_fee: { label: "ค่าธรรมเนียม ค่านายหน้า (มาตรา 40(2))", rate: "50% ไม่เกิน 100,000 บาท", description: "หักค่าใช้จ่ายเหมา 50% สูงสุด 100,000 บาท" },
  copyright: { label: "ค่าลิขสิทธิ์ ค่ากู๊ดวิลล์ (มาตรา 40(3))", rate: "50% ไม่เกิน 100,000 บาท", description: "หักค่าใช้จ่ายเหมา 50% สูงสุด 100,000 บาท หรือตามจริง" },
  interest: { label: "ดอกเบี้ย เงินปันผล (มาตรา 40(4))", rate: "ไม่สามารถหักค่าใช้จ่ายได้", description: "เงินได้ประเภทนี้ไม่สามารถหักค่าใช้จ่ายได้" },
  property: { label: "รายได้จากทรัพย์สินให้เช่า (มาตรา 40(5))", rate: "10-30% ตามประเภททรัพย์สิน", description: "บ้าน/อาคาร 30%, ที่ดินเกษตร 20%, ที่ดินอื่น 15%, ยานพาหนะ 30% หรือตามจริง" },
  professional: { label: "วิชาชีพอิสระ (มาตรา 40(6))", rate: "30-60% ตามวิชาชีพ", description: "แพทย์ 60%, ศิลปิน 60%, วิศวกร/สถาปนิก/ทนายความ/นักบัญชี 30% หรือตามจริง" },
  contract: { label: "รับเหมา/รับจ้างทำของ (มาตรา 40(7))", rate: "60%", description: "หักค่าใช้จ่ายเหมา 60% หรือตามจริง" },
  business: { label: "ธุรกิจ การค้า อุตสาหกรรม (มาตรา 40(8))", rate: "60%", description: "หักค่าใช้จ่ายเหมา 60% หรือตามจริง" },
};

const taxBrackets = [
  { min: 0, max: 150000, rate: 0 },
  { min: 150001, max: 300000, rate: 5 },
  { min: 300001, max: 500000, rate: 10 },
  { min: 500001, max: 750000, rate: 15 },
  { min: 750001, max: 1000000, rate: 20 },
  { min: 1000001, max: 2000000, rate: 25 },
  { min: 2000001, max: 5000000, rate: 30 },
  { min: 5000001, max: Infinity, rate: 35 },
];

const TaxCalculatorSection = () => {
  const [income, setIncome] = useState<string>("");
  const [incomeType, setIncomeType] = useState<string>("");

  const handleIncomeTypeChange = (type: string) => {
    setIncomeType(type);
    // เคลียร์ค่าลดหย่อนที่เลือกไว้เมื่อเปลี่ยนประเภทรายได้
    setSelectedDeductions({});
    setCustomDeductions({});
    setCalculation(null);
  };

  // กรองค่าลดหย่อนตามประเภทรายได้
  const filteredDeductions = incomeType
    ? deductionOptions.filter(d => (eligibleDeductionsByIncomeType[incomeType] || []).includes(d.id))
    : [];
  const [selectedDeductions, setSelectedDeductions] = useState<{ [key: string]: boolean }>({});
  const [customDeductions, setCustomDeductions] = useState<{ [key: string]: string }>({});
  const [calculation, setCalculation] = useState<TaxCalculation | null>(null);
  const [incomeError, setIncomeError] = useState<string>("");

  const handleIncomeChange = (value: string) => {
    const numericValue = value.replace(/[^0-9.]/g, '');
    const parsedValue = parseFloat(numericValue);
    
    if (numericValue === '') {
      setIncome('');
      setIncomeError('');
      return;
    }
    
    if (isNaN(parsedValue)) {
      setIncomeError('กรุณากรอกตัวเลขเท่านั้น');
      return;
    }
    
    if (parsedValue < 0) {
      setIncomeError('รายได้ต้องเป็นค่าบวก');
      return;
    }
    
    setIncome(numericValue);
    setIncomeError('');
  };

  const getExpenseExemption = (grossIncome: number, type: string): number => {
    switch (type) {
      case "salary":
      case "professional_fee":
      case "copyright":
        return Math.min(100000, grossIncome * 0.5);
      case "interest":
        return 0; // ไม่สามารถหักค่าใช้จ่ายได้
      case "property":
        return grossIncome * 0.3; // ใช้อัตราเฉลี่ย 30%
      case "professional":
        return grossIncome * 0.3; // ใช้อัตราต่ำสุด (วิศวกร/ทนาย/นักบัญชี)
      case "contract":
      case "business":
        return grossIncome * 0.6;
      default:
        return 0;
    }
  };

  const calculateTax = () => {
    const grossIncome = parseFloat(income) || 0;
    if (grossIncome <= 0 || incomeError) return;

    let totalAllowances = 0;
    let retirementTotal = 0;
    const retirementIds = ["pension_insurance", "provident_fund", "rmf", "nsf"];
    const RETIREMENT_CAP = 500000;

    // ประกันชีวิต + ประกันสุขภาพ รวมกันไม่เกิน 100,000
    let lifeHealthTotal = 0;
    const lifeHealthIds = ["life_insurance", "health_insurance"];

    Object.keys(selectedDeductions).forEach(key => {
      if (!selectedDeductions[key]) return;
      const deduction = deductionOptions.find(d => d.id === key);
      if (!deduction) return;

      const customAmount = parseFloat(customDeductions[key]) || deduction.amount;
      let deductionAmount = deduction.max ? Math.min(customAmount, deduction.max) : customAmount;

      // จำกัดกลุ่มเกษียณรวมไม่เกิน 500,000
      if (retirementIds.includes(key)) {
        const remaining = Math.max(0, RETIREMENT_CAP - retirementTotal);
        deductionAmount = Math.min(deductionAmount, remaining);
        retirementTotal += deductionAmount;
      }

      // ประกันชีวิต+สุขภาพ รวมไม่เกิน 100,000
      if (lifeHealthIds.includes(key)) {
        const remaining = Math.max(0, 100000 - lifeHealthTotal);
        deductionAmount = Math.min(deductionAmount, remaining);
        lifeHealthTotal += deductionAmount;
      }

      totalAllowances += deductionAmount;
    });

    // หักค่าใช้จ่ายตามประเภทเงินได้
    const exemption = getExpenseExemption(grossIncome, incomeType);

    const netIncome = Math.max(0, grossIncome - exemption - totalAllowances);

    // เงินบริจาค (จำกัด 10% ของเงินได้หลังหักค่าใช้จ่ายและค่าลดหย่อน)
    // Note: donation is already included in totalAllowances above, 
    // but we should cap it. For simplicity, this is approximated.

    // Calculate progressive tax
    let tax = 0;
    let remainingIncome = netIncome;
    const brackets: { range: string; taxableAmount: number; rate: number; tax: number }[] = [];

    for (const bracket of taxBrackets) {
      if (remainingIncome <= 0) break;

      const taxableInBracket = Math.min(
        remainingIncome,
        bracket.max === Infinity ? remainingIncome : bracket.max - bracket.min + 1
      );

      const taxInBracket = taxableInBracket * (bracket.rate / 100);
      tax += taxInBracket;

      if (taxableInBracket > 0) {
        brackets.push({
          range: bracket.max === Infinity
            ? `${bracket.min.toLocaleString()}+ บาท`
            : `${bracket.min.toLocaleString()} - ${bracket.max.toLocaleString()} บาท`,
          taxableAmount: taxableInBracket,
          rate: bracket.rate,
          tax: taxInBracket
        });
      }

      remainingIncome -= taxableInBracket;
    }

    const effectiveRate = grossIncome > 0 ? (tax / grossIncome) * 100 : 0;

    setCalculation({
      grossIncome,
      totalDeductions: exemption + totalAllowances,
      netIncome,
      tax,
      effectiveRate,
      brackets
    });
  };

  const handleDeductionChange = (id: string, checked: boolean) => {
    setSelectedDeductions(prev => ({ ...prev, [id]: checked }));
  };

  const handleCustomDeductionChange = (id: string, value: string) => {
    setCustomDeductions(prev => ({ ...prev, [id]: value }));
  };

  return (
    <section className="py-16 bg-gradient-card">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              คำนวณภาษีของคุณ
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              ใช้เครื่องมือคำนวณภาษีเพื่อประเมินภาษีเงินได้ที่ต้องจ่าย
              พร้อมคำแนะนำการวางแผนลดหย่อนภาษี
            </p>
            <div className="flex items-center justify-center gap-2 mt-3">
              <AlertCircle className="w-4 h-4 text-accent" />
              <p className="text-sm text-muted-foreground">อ้างอิงตามกฎหมายภาษีไทย ปีภาษี 2568 (ยื่นภาษีปี 2569)</p>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Input Form */}
            <Card className="shadow-medium">
              <CardHeader>
                <CardTitle className="flex items-center text-primary">
                  <Calculator className="w-5 h-5 mr-2" />
                  ข้อมูลรายได้และการลดหย่อน
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Income Input */}
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="income">รายได้ต่อปี (บาท)</Label>
                    <Input
                      id="income"
                      type="text"
                      placeholder="กรอกรายได้ต่อปี"
                      value={income}
                      onChange={(e) => handleIncomeChange(e.target.value)}
                      className={`text-lg ${incomeError ? 'border-destructive' : ''}`}
                    />
                    {incomeError && (
                      <p className="text-sm text-destructive mt-1">{incomeError}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="incomeType">ประเภทรายได้</Label>
                    <Select value={incomeType} onValueChange={handleIncomeTypeChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="เลือกประเภทรายได้" />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(incomeTypeExpenses).map(([key, val]) => (
                          <SelectItem key={key} value={key}>{val.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {incomeType && incomeTypeExpenses[incomeType] && (
                      <div className="mt-2 p-3 bg-muted/50 rounded-lg space-y-1">
                        <p className="text-xs text-muted-foreground">
                          <strong>การหักค่าใช้จ่าย:</strong> {incomeTypeExpenses[incomeType].description}
                        </p>
                        {incomeType === "interest" && (
                          <div className="mt-1 p-3 bg-accent/10 rounded border border-accent/20">
                            <p className="text-xs text-accent-foreground font-medium">
                              💡 เงินได้ 40(4) ดอกเบี้ย/เงินปันผล — Final Tax (หัก ณ ที่จ่าย)
                            </p>
                            <ul className="text-xs text-muted-foreground mt-1 space-y-0.5 list-disc list-inside">
                              <li>ดอกเบี้ยเงินฝาก/ตราสารหนี้: หัก ณ ที่จ่าย <strong>15%</strong></li>
                              <li>เงินปันผล: หัก ณ ที่จ่าย <strong>10%</strong></li>
                            </ul>
                            <p className="text-xs text-muted-foreground mt-2">
                              ✅ ภาษีถูกหัก ณ ที่จ่ายแล้ว ไม่ต้องนำมาคำนวณรวมกับเงินได้อื่น และ<strong>ไม่สามารถใช้ค่าลดหย่อนใดๆ ได้</strong>
                            </p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* Deductions - แสดงเฉพาะเมื่อเลือกประเภทรายได้แล้ว */}
                {incomeType ? (
                  filteredDeductions.length > 0 ? (
                    <TaxDeductionForm
                      deductionOptions={filteredDeductions}
                      selectedDeductions={selectedDeductions}
                      customDeductions={customDeductions}
                      onDeductionChange={handleDeductionChange}
                      onCustomDeductionChange={handleCustomDeductionChange}
                    />
                  ) : incomeType === "interest" ? (
                    <div className="p-4 bg-accent/10 rounded-lg text-center border border-accent/20">
                      <p className="text-sm text-muted-foreground">
                        ✅ เงินได้ 40(4) ใช้ระบบ Final Tax (หัก ณ ที่จ่าย) ไม่ต้องนำมาคำนวณรวมและไม่มีค่าลดหย่อน
                      </p>
                    </div>
                  ) : (
                    <div className="p-4 bg-muted/50 rounded-lg text-center">
                      <p className="text-sm text-muted-foreground">
                        ⚠️ ประเภทรายได้นี้ไม่มีค่าลดหย่อนที่สามารถใช้ได้
                      </p>
                    </div>
                  )
                ) : (
                  <div className="p-4 bg-muted/50 rounded-lg text-center">
                    <p className="text-sm text-muted-foreground">
                      กรุณาเลือกประเภทรายได้ก่อนเพื่อแสดงรายการลดหย่อนที่ใช้ได้
                    </p>
                  </div>
                )}

                <Button onClick={calculateTax} className="w-full" size="lg">
                  <Calculator className="w-4 h-4 mr-2" />
                  คำนวณภาษี
                </Button>
              </CardContent>
            </Card>

            {/* Results */}
            <TaxResultPanel calculation={calculation} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default TaxCalculatorSection;
