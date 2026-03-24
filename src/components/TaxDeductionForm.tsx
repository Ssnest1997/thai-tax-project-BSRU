import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import type { DeductionOption } from "@/components/TaxCalculatorSection";

interface TaxDeductionFormProps {
  deductionOptions: DeductionOption[];
  selectedDeductions: { [key: string]: boolean };
  customDeductions: { [key: string]: string };
  onDeductionChange: (id: string, checked: boolean) => void;
  onCustomDeductionChange: (id: string, value: string) => void;
}

const groupLabels: Record<string, string> = {
  personal: "👤 กลุ่มส่วนตัวและครอบครัว",
  insurance: "🛡️ กลุ่มประกัน",
  retirement: "🏦 กลุ่มกองทุนเพื่อการเกษียณ",
  social: "📋 กลุ่มประกันสังคม",
  investment: "📈 กลุ่มการลงทุน",
  housing: "🏠 กลุ่มที่อยู่อาศัย",
  government: "🏛️ กลุ่มมาตรการรัฐ",
  donation: "🎁 กลุ่มบริจาค",
};

const groupOrder = ["personal", "insurance", "retirement", "social", "investment", "housing", "government", "donation"];

const TaxDeductionForm = ({
  deductionOptions,
  selectedDeductions,
  customDeductions,
  onDeductionChange,
  onCustomDeductionChange,
}: TaxDeductionFormProps) => {
  const groupedDeductions = groupOrder.map(group => ({
    group,
    label: groupLabels[group],
    items: deductionOptions.filter(d => d.group === group),
  })).filter(g => g.items.length > 0);

  return (
    <div>
      <Label className="text-base font-semibold">รายการลดหย่อนภาษี</Label>
      <p className="text-xs text-muted-foreground mb-3">อ้างอิงปีภาษี 2568 ตามประมวลรัษฎากร</p>
      <div className="space-y-4">
        {groupedDeductions.map(({ group, label, items }) => (
          <div key={group}>
            <p className="text-sm font-semibold text-primary mb-2">{label}</p>
            <div className="space-y-2">
              {items.map((deduction) => (
                <div key={deduction.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div className="flex items-center space-x-3 flex-1 min-w-0">
                    <Checkbox
                      id={deduction.id}
                      checked={selectedDeductions[deduction.id] || false}
                      onCheckedChange={(checked) => onDeductionChange(deduction.id, checked as boolean)}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1">
                        <Label htmlFor={deduction.id} className="text-sm font-medium cursor-pointer">
                          {deduction.label}
                        </Label>
                        {deduction.description && (
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger>
                                <Info className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                              </TooltipTrigger>
                              <TooltipContent className="max-w-xs">
                                <p className="text-xs">{deduction.description}</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        )}
                      </div>
                      {deduction.max && (
                        <p className="text-xs text-muted-foreground">
                          สูงสุด {deduction.max.toLocaleString()} บาท
                        </p>
                      )}
                    </div>
                  </div>
                  {selectedDeductions[deduction.id] && deduction.amount === 0 && (
                    <Input
                      type="number"
                      placeholder="จำนวนเงิน"
                      value={customDeductions[deduction.id] || ""}
                      onChange={(e) => onCustomDeductionChange(deduction.id, e.target.value)}
                      className="w-28 h-8 text-xs ml-2"
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-3 p-3 bg-accent/10 rounded-lg">
        <p className="text-xs text-muted-foreground">
          <strong>หมายเหตุ:</strong> กลุ่มเกษียณ (ประกันบำนาญ + PVD + RMF + กอช.) รวมกันต้องไม่เกิน 500,000 บาท / ประกันชีวิต + ประกันสุขภาพ รวมกันต้องไม่เกิน 100,000 บาท
        </p>
      </div>
    </div>
  );
};

export default TaxDeductionForm;
