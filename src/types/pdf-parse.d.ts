// pdf-parse v1 ships no type definitions, and we import the implementation
// module directly to avoid its index.js test-file behavior.
declare module "pdf-parse/lib/pdf-parse.js" {
  interface PdfParseResult {
    numpages: number;
    numrender: number;
    info: unknown;
    metadata: unknown;
    version: string;
    text: string;
  }
  function pdfParse(
    dataBuffer: Buffer | Uint8Array,
    options?: Record<string, unknown>
  ): Promise<PdfParseResult>;
  export default pdfParse;
}
