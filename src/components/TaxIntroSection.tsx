import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const TaxIntroSection = () => {
  const taxBrackets = [
    { netIncome: "0 - 150,000", taxableIncome: "0 – 150,000", rate: "0%" },
    { netIncome: "150,001 - 300,000", taxableIncome: "150,001 – 300,000", rate: "5%" },
    { netIncome: "300,001 - 500,000", taxableIncome: "300,001 – 500,000", rate: "10%" },
    { netIncome: "500,001 - 750,000", taxableIncome: "500,001 – 750,000", rate: "15%" },
    { netIncome: "750,001 - 1,000,000", taxableIncome: "750,001 – 1,000,000", rate: "20%" },
    { netIncome: "1,000,001 - 2,000,000", taxableIncome: "1,000,001 – 2,000,000", rate: "25%" },
    { netIncome: "2,000,001 - 5,000,000", taxableIncome: "2,000,001 – 5,000,000", rate: "30%" },
    { netIncome: "5,000,001 ขึ้นไป", taxableIncome: "5,000,001 ขึ้นไป", rate: "35%" },
  ];

  return (
    <section className="py-16 bg-gradient-card">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              มาทำความรู้จักภาษีกัน
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              ภาษีเงินได้บุคคลธรรมดาเป็นส่วนสำคัญในการพัฒนาประเทศ 
              เรียนรู้เกี่ยวกับการคำนวณภาษีและการลดหย่อนภาษีเพื่อการวางแผนทางการเงินที่ดี
            </p>
          </div>

          {/* Introduction Content */}
          <Card className="mb-12 shadow-medium">
            <CardHeader>
              <CardTitle className="text-2xl text-primary">การลดหย่อนภาษี</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-lg font-semibold text-foreground mb-3">
                    ทำไมต้องเสียภาษี?
                  </h4>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      เพื่อสนับสนุนการพัฒนาโครงสร้างพื้นฐานของประเทศ
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      เป็นแหล่งรายได้หลักของรัฐบาลในการบริหารประเทศ
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      สร้างความเสมอภาคทางสังคมผ่านระบบการจัดเก็บภาษีแบบขั้นบันได
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-foreground mb-3">
                    สิทธิในการลดหย่อนภาษี
                  </h4>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-secondary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      ค่าใช้จ่ายส่วนตัว ครอบครัว และผู้อยู่ในอุปการะ
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-secondary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      ค่าประกันสุขภาพ ประกันชีวิต และกองทุนสำรองเลี้ยงชีพ
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-secondary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      ค่าดอกเบี้ยเงินกู้ที่อยู่อาศัย และเงินบริจาค
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tax Brackets Table */}
          <Card className="shadow-medium">
            <CardHeader>
              <CardTitle className="text-2xl text-primary">อัตราภาษีเงินได้บุคคลธรรมดา ปี 2567</CardTitle>
              <p className="text-muted-foreground">
                ตารางอัตราภาษีแบบขั้นบันไดสำหรับเงินได้สุทธิประจำปี
              </p>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-muted">
                      <th className="border border-border p-4 text-left font-semibold text-foreground">
                        เงินได้สุทธิ (บาท)
                      </th>
                      <th className="border border-border p-4 text-left font-semibold text-foreground">
                        ช่วงเงินได้สุทธิของแต่ละชั้น
                      </th>
                      <th className="border border-border p-4 text-left font-semibold text-foreground">
                        อัตราภาษี (%)
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {taxBrackets.map((bracket, index) => (
                      <tr key={index} className="hover:bg-muted/50 transition-colors">
                        <td className="border border-border p-4 text-foreground">
                          {bracket.netIncome}
                        </td>
                        <td className="border border-border p-4 text-foreground">
                          {bracket.taxableIncome}
                        </td>
                        <td className="border border-border p-4">
                          <span className={`font-semibold ${
                            bracket.rate === "0%" ? "text-success" : 
                            parseFloat(bracket.rate) <= 15 ? "text-accent" : "text-destructive"
                          }`}>
                            {bracket.rate}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-4 p-4 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground">
                  <strong>หมายเหตุ:</strong> อัตราภาษีข้างต้นใช้สำหรับเงินได้สุทธิหลังหักค่าใช้จ่ายและเงินลดหย่อนต่างๆ แล้ว
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default TaxIntroSection;