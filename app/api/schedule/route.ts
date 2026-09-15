import { schedule } from "@/data/schedule";
function escapePdf(v: string) {
  return v
    .replace(/[^\x20-\x7E]/g, "-")
    .replace(/\\/g, "\\\\")
    .replace(/\(/g, "\\(")
    .replace(/\)/g, "\\)");
}
export async function GET() {
  const objects: string[] = [];
  const add = (v: string) => {
    objects.push(v);
    return objects.length;
  };
  add("<< /Type /Catalog /Pages 2 0 R >>");
  add("");
  const font = add("<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>");
  const pages: number[] = [];
  for (const day of schedule) {
    const lines = [
      "KILF - Kollam International Literature Festival",
      "SAMPLE PROGRAMME - NOT A CONFIRMED SCHEDULE",
      "Day " + day.day + " / " + day.date + ", 2026",
      "Asramam Maidan, Kollam",
      "",
      ...day.sessions.flatMap((s) => [
        s.time + " - " + s.title,
        s.type + " / " + s.venue,
        s.speaker,
        "",
      ]),
      "Final programme and accessibility information to be announced.",
    ];
    const stream =
      "BT /F1 11 Tf 48 795 Td 20 TL " +
      lines
        .map((line, i) => (i ? "T* " : "") + "(" + escapePdf(line) + ") Tj")
        .join("\n") +
      " ET";
    const content = add(
      "<< /Length " +
        Buffer.byteLength(stream) +
        " >>\nstream\n" +
        stream +
        "\nendstream",
    );
    pages.push(
      add(
        "<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Resources << /Font << /F1 " +
          font +
          " 0 R >> >> /Contents " +
          content +
          " 0 R >>",
      ),
    );
  }
  objects[1] =
    "<< /Type /Pages /Kids [" +
    pages.map((id) => id + " 0 R").join(" ") +
    "] /Count " +
    pages.length +
    " >>";
  let pdf = "%PDF-1.4\n";
  const offsets = [0];
  objects.forEach((obj, i) => {
    offsets.push(Buffer.byteLength(pdf));
    pdf += i + 1 + " 0 obj\n" + obj + "\nendobj\n";
  });
  const start = Buffer.byteLength(pdf);
  pdf +=
    "xref\n0 " +
    (objects.length + 1) +
    "\n0000000000 65535 f \n" +
    offsets
      .slice(1)
      .map((offset) => String(offset).padStart(10, "0") + " 00000 n \n")
      .join("") +
    "trailer\n<< /Size " +
    (objects.length + 1) +
    " /Root 1 0 R >>\nstartxref\n" +
    start +
    "\n%%EOF";
  return new Response(pdf, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": 'attachment; filename="KILF-preview-schedule.pdf"',
      "Cache-Control": "public, max-age=3600",
    },
  });
}
