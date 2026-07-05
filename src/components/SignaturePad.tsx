'use client';

import React, { useRef, useState, useEffect } from 'react';
import { RotateCcw, Trash2 } from 'lucide-react';

interface SignaturePadProps {
  value?: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function SignaturePad({
  value,
  onChange,
  placeholder = 'Sign here / یہاں دستخط کریں',
}: SignaturePadProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [history, setHistory] = useState<string[]>([]);

  // Initialize and resize canvas
  const resizeCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Save current drawing if any
    const dataUrl = canvas.toDataURL();
    const hasDrawing = history.length > 0 || (value && value.length > 100);

    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;

    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.strokeStyle = '#065f46'; // Emerald green ink
      ctx.lineWidth = 2.5;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      // Restore drawing if it was resized
      if (hasDrawing) {
        const img = new Image();
        img.onload = () => {
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        };
        img.src = value || dataUrl;
      }
    }
  };

  useEffect(() => {
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    return () => window.removeEventListener('resize', resizeCanvas);
  }, []);

  // Sync canvas with initial/value load if it's set externally (like loaded draft)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas && value && history.length === 0) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        const img = new Image();
        img.onload = () => {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        };
        img.src = value;
      }
    }
  }, [value]);

  const getCoordinates = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };

    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

    return {
      x: clientX - rect.left,
      y: clientY - rect.top,
    };
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Save state for undo
    setHistory((prev) => [...prev, canvas.toDataURL()]);

    const coords = getCoordinates(e);
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.beginPath();
      ctx.moveTo(coords.x, coords.y);
      setIsDrawing(true);
    }
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    e.preventDefault();

    const canvas = canvasRef.current;
    if (!canvas) return;

    const coords = getCoordinates(e);
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.lineTo(coords.x, coords.y);
      ctx.stroke();
    }
  };

  const stopDrawing = () => {
    if (!isDrawing) return;
    setIsDrawing(false);
    const canvas = canvasRef.current;
    if (canvas) {
      onChange(canvas.toDataURL());
    }
  };

  const clear = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
    setHistory([]);
    onChange('');
  };

  const undo = () => {
    if (history.length === 0) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const newHistory = [...history];
    const prevState = newHistory.pop();
    setHistory(newHistory);

    if (prevState) {
      const img = new Image();
      img.onload = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        onChange(canvas.toDataURL());
      };
      img.src = prevState;
    } else {
      clear();
    }
  };

  return (
    <div ref={containerRef} className="w-full flex flex-col gap-2">
      <div className="relative w-full h-32 border-2 border-dashed border-emerald-600/30 hover:border-emerald-500 rounded-lg bg-emerald-50/10 backdrop-blur-sm overflow-hidden transition-all duration-300">
        <canvas
          ref={canvasRef}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
          className="absolute inset-0 w-full h-full cursor-crosshair touch-none"
        />
        {!value && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none text-emerald-800/40 text-xs font-medium">
            {placeholder}
          </div>
        )}
      </div>
      <div className="flex justify-end gap-2 text-xs">
        <button
          type="button"
          onClick={undo}
          disabled={history.length === 0}
          className="flex items-center gap-1 px-2.5 py-1.5 rounded bg-emerald-50/50 hover:bg-emerald-100/50 text-emerald-800 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200"
        >
          <RotateCcw className="w-3 h-3" />
          Undo
        </button>
        <button
          type="button"
          onClick={clear}
          disabled={!value}
          className="flex items-center gap-1 px-2.5 py-1.5 rounded bg-red-50 hover:bg-red-100 text-red-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200"
        >
          <Trash2 className="w-3 h-3" />
          Clear
        </button>
      </div>
    </div>
  );
}
