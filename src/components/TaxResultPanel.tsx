import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calculator, PieChart, TrendingUp, Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import type { TaxCalculation } from "@/components/TaxCalculatorSection";

interface TaxResultPanelProps {
  calculation: TaxCalculation | null;
}

const TaxResultPanel = ({ calculation }: TaxResultPanelProps) => {
  return (
    <Card className="shadow-medium">
      <CardHeader>
        <CardTitle className="flex items-center text-primary">
          <PieChart className="w-5 h-5 mr-2" />
          ผลการคำนวณภาษี
        </CardTitle>
      </CardHeader>
      <CardContent>
        {calculation ? (
          <div className="space-y-6">
            {/* Summary */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gradient-primary text-primary-foreground p-4 rounded-lg">
                <p className="text-sm opacity-90">รายได้รวม</p>
                <p className="text-xl font-bold">
                  {calculation.grossIncome.toLocaleString()} บาท
                </p>
              </div>
              <div className="bg-gradient-secondary text-secondary-foreground p-4 rounded-lg">
                <p className="text-sm opacity-90">ภาษีที่ต้องจ่าย</p>
                <p className="text-xl font-bold">
                  {Math.round(calculation.tax).toLocaleString()} บาท
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between">
                <span>รายได้รวม:</span>
                <span className="font-semibold">{calculation.grossIncome.toLocaleString()} บาท</span>
              </div>
              <div className="flex justify-between">
                <span>หัก ค่าใช้จ่าย/ลดหย่อน:</span>
                <span className="font-semibold text-secondary">
                  -{calculation.totalDeductions.toLocaleString()} บาท
                </span>
              </div>
              <div className="flex justify-between border-t pt-2">
                <span>เงินได้สุทธิ:</span>
                <span className="font-semibold">{calculation.netIncome.toLocaleString()} บาท</span>
              </div>
              <div className="flex justify-between">
                <span>อัตราภาษีเฉลี่ย:</span>
                <span className="font-semibold">{calculation.effectiveRate.toFixed(2)}%</span>
              </div>
            </div>

            {/* Tax Breakdown */}
            {calculation.brackets.length > 0 && (
              <div>
                <h4 className="font-semibold mb-3 flex items-center">
                  <TrendingUp className="w-4 h-4 mr-2 text-accent" />
                  รายละเอียดการคำนวณภาษีแต่ละขั้น
                </h4>
                <div className="space-y-2">
                  {calculation.brackets.map((bracket, index) => (
                    <div key={index} className="bg-muted/50 p-3 rounded-lg">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">{bracket.range}</span>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger>
                              <Info className="w-4 h-4 text-muted-foreground" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>เงินได้ในขั้น: {bracket.taxableAmount.toLocaleString()} บาท</p>
                              <p>อัตราภาษี: {bracket.rate}%</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                      <div className="flex justify-between items-center mt-1">
                        <span className="text-xs text-muted-foreground">
                          {bracket.taxableAmount.toLocaleString()} บาท × {bracket.rate}%
                        </span>
                        <span className="font-semibold text-destructive">
                          {Math.round(bracket.tax).toLocaleString()} บาท
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-8">
            <Calculator className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">
              กรอกข้อมูลรายได้และเลือกรายการลดหย่อนภาษี<br />
              เพื่อคำนวณภาษีที่ต้องจ่าย
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TaxResultPanel;
