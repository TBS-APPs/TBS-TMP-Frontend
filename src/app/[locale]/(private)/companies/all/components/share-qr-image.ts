export type ShareQrResult = "shared" | "downloaded" | "failed";

async function svgToPngBlob(svg: SVGElement): Promise<Blob> {
  const serializer = new XMLSerializer();
  const svgString = serializer.serializeToString(svg);
  const svgBlob = new Blob([svgString], {
    type: "image/svg+xml;charset=utf-8",
  });
  const url = URL.createObjectURL(svgBlob);

  try {
    const img = new Image();
    await new Promise<void>((resolve, reject) => {
      img.onload = () => resolve();
      img.onerror = () => reject(new Error("Failed to load SVG image"));
      img.src = url;
    });

    const svgEl = svg as SVGSVGElement;
    const width =
      svgEl.width?.baseVal?.value ||
      Number.parseInt(svg.getAttribute("width") ?? "", 10) ||
      256;
    const height =
      svgEl.height?.baseVal?.value ||
      Number.parseInt(svg.getAttribute("height") ?? "", 10) ||
      256;

    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      throw new Error("Canvas not supported");
    }
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, width, height);
    ctx.drawImage(img, 0, 0, width, height);

    return await new Promise<Blob>((resolve, reject) => {
      canvas.toBlob((blob) => {
        if (blob) resolve(blob);
        else reject(new Error("Failed to create PNG"));
      }, "image/png");
    });
  } finally {
    URL.revokeObjectURL(url);
  }
}

function downloadBlob(blob: Blob, fileName: string) {
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = fileName;
  anchor.click();
  URL.revokeObjectURL(url);
}

export async function shareQrImage(
  svgElement: SVGElement,
  fileName: string,
  title?: string,
): Promise<ShareQrResult> {
  const blob = await svgToPngBlob(svgElement);
  const file = new File([blob], fileName, { type: "image/png" });

  if (navigator.canShare?.({ files: [file] })) {
    try {
      await navigator.share({ files: [file], title });
      return "shared";
    } catch (error) {
      if (error instanceof Error && error.name === "AbortError") {
        return "failed";
      }
    }
  }

  downloadBlob(blob, fileName);
  return "downloaded";
}
