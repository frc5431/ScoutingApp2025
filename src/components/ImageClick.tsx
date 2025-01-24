import React, { useRef, useState, useEffect } from 'react';

export interface imageClickProps {
  type: string;
  robotPos?: { x: number; y: number };
  setRobotPos?: React.Dispatch<React.SetStateAction<{ x: number; y: number }>>;
  autonPath?: { x: number; y: number }[];
  setAutonPath?: React.Dispatch<React.SetStateAction<{ x: number; y: number }[]>>;
  resetTrigger?: number;
}

const ImageClick: React.FC<imageClickProps> = ({robotPos, autonPath, setAutonPath, setRobotPos, type, resetTrigger}: imageClickProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [dotPositions, setDotPositions] = useState<{ x: number; y: number }[]>(Array.isArray(autonPath) ? autonPath : robotPos ? [robotPos] : []);
  
  const draw = (image: HTMLImageElement, ctx: CanvasRenderingContext2D) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.drawImage(image, 0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.fillStyle = 'purple';
    dotPositions.forEach(({ x, y }) => {
      ctx.beginPath();
      ctx.arc(x, y, 8, 0, 2 * Math.PI);
      ctx.fill();
      if (dotPositions.length > 1) {
        ctx.strokeStyle = 'teal';
        ctx.lineWidth = 2;
        
        for (let i = 0; i < dotPositions.length - 1; i++) {
          const start = dotPositions[i];
          const end = dotPositions[i + 1];
          
          ctx.beginPath();
          ctx.moveTo(start.x, start.y);
          ctx.lineTo(end.x, end.y);
          ctx.stroke();
          
          const angle = Math.atan2(end.y - start.y, end.x - start.x);
          ctx.save();
          ctx.translate(end.x, end.y);
          ctx.rotate(angle);
          ctx.beginPath();
          ctx.moveTo(0, 0);
          ctx.lineTo(-15, -7);
          ctx.lineTo(-15, 7);
          ctx.closePath();
          ctx.fillStyle = 'teal';
          ctx.fill();
          ctx.restore();
        }
      }
    });
  };

  const handleClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (type === "one" && dotPositions.length > 0) {
      setDotPositions(prevPositions => prevPositions.slice(0, -1));
    }
    if (canvasRef.current) {
      const rect = canvasRef.current.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      setDotPositions((prevPositions) => [...prevPositions, { x, y }]);

      if (type === "one" && setRobotPos) {
        setRobotPos({x: x, y: y});
      }
      else if (type === "path" && setAutonPath) {
        setAutonPath((prevPositions) => [...prevPositions, { x, y }])
      }
    }
  };

  useEffect(() => {
    if (robotPos || autonPath) {
      const ctx = canvasRef.current?.getContext('2d');
      if (ctx) {
        const image = new Image();
        image.src = '/reefscapeField.png'; 
        image.onload = () => {
          draw(image, ctx);
        }
      }
    }
  }, [])

  useEffect(() => {
    const ctx = canvasRef.current?.getContext('2d');
    if (ctx) {
      const image = new Image();
      image.src = '/reefscapeField.png'; 
      image.onload = () => {
        draw(image, ctx);
      };
    }
  }, [dotPositions]);

  useEffect(() => {
    setDotPositions(autonPath ?? []);
  }, [autonPath])

  return (
    <div>
      <canvas
        ref={canvasRef}
        width={700}
        height={350}
        style={{ border: '1px solid black', borderRadius: '40px'}}
        onClick={handleClick}
      />
    </div>
  );
};

export default ImageClick;