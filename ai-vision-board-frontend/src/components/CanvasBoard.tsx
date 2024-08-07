import React, { useEffect, useRef } from 'react';
import { useDrop } from 'react-dnd';
import { fabric } from 'fabric';

const CanvasBoard: React.FC = () => {
  const canvasRef = useRef<fabric.Canvas | null>(null);

  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'image',
    drop: (item: { src: string }) => addImageToCanvas(item.src),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  useEffect(() => {
    const canvas = new fabric.Canvas('canvas', {
      width: 800,
      height: 600,
      backgroundColor: 'lightgray',
    });
    canvasRef.current = canvas;
  }, []);

  const addImageToCanvas = (src: string) => {
    fabric.Image.fromURL(src, (img) => {
      if (canvasRef.current) {
        const scaleFactor = Math.min(200 / img.width!, 200 / img.height!);
        img.scale(scaleFactor);
        img.set({
          left: canvasRef.current.width! / 2,
          top: canvasRef.current.height! / 2,
          originX: 'center',
          originY: 'center',
          hasControls: true,
          selectable: true,
        });
        canvasRef.current.add(img);
        canvasRef.current.renderAll();
      }
    });
  };

  return (
    <div ref={drop} className="canvas-container" style={{ border: isOver ? '2px solid green' : 'none' }}>
      <canvas id="canvas" />
    </div>
  );
}

export default CanvasBoard;
