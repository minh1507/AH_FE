import React, { useEffect, useRef } from "react";

interface CanvasProps {
  image: string | null;
  rotation: number;
  brightness: number;
}

const Canvas: React.FC<CanvasProps> = ({ image, rotation, brightness }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    if (image) {
      const img = new Image();
      img.src = image;
      img.onload = () => {
        imgRef.current = img;
        drawImage();
      };
    }
  }, [image, rotation, brightness]);

  const drawImage = () => {
    const canvas = canvasRef.current;
    const img = imgRef.current;
    if (canvas && img) {
      const ctx = canvas.getContext("2d");
      canvas.width = img.width;
      canvas.height = img.height;
      ctx?.clearRect(0, 0, canvas.width, canvas.height);

      ctx?.translate(canvas.width / 2, canvas.height / 2);
      ctx?.rotate((rotation * Math.PI) / 180);
      ctx?.drawImage(img, -img.width / 2, -img.height / 2);
      ctx?.resetTransform();

      applyBrightnessToCanvas(ctx, canvas);
    }
  };

  const applyBrightnessToCanvas = (
    ctx: CanvasRenderingContext2D | null,
    canvas: HTMLCanvasElement
  ) => {
    const imageData = ctx?.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData?.data;
    if (data) {
      const brightnessFactor = brightness / 50;
      for (let i = 0; i < data.length; i += 4) {
        data[i] = data[i] * brightnessFactor;
        data[i + 1] = data[i + 1] * brightnessFactor;
        data[i + 2] = data[i + 2] * brightnessFactor;
      }
      ctx?.putImageData(imageData!, 0, 0);
    }
  };

  return <canvas ref={canvasRef} style={{ maxWidth: "100%", maxHeight: "100%" }} />;
};

export default Canvas;
