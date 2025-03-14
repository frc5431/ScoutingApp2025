import confetti from 'canvas-confetti';

export const triggerConfetti = (type: 'basic' | 'burst' | 'cannon' | 'fireworks' = 'basic', color: string) => {
  let colors: string[] = ['']; 

  switch (color) { 
    case '5431':
      colors = ['#9370DB', '#3673CD', '#00D4E3', '#7D61CF'];
      break;
    
    case 'rainbow':
      colors = ['#FF0000', '#FFA500', '#FFFF00', '#008000', '#0000FF', '#4B0082', '#EE82EE'];
      break;

    case 'red':
      colors = ['#ff283a']
      break;
    
    case 'blue':
      colors = ['#007bff']
      break;
  }


  switch (type) {
    case 'basic':
      confetti({
        particleCount: 20,
        spread: 70,
        origin: { y: 1 },
        colors: colors
      });
      break;
    
      case 'burst':
        const duration = 3 * 1000;
        const animationEnd = Date.now() + duration;
        const defaults = { 
          startVelocity: 30, 
          spread: 360, 
          ticks: 60, 
          zIndex: 0 
        };
  
        const interval = setInterval(() => {
          const timeLeft = animationEnd - Date.now();
          if (timeLeft <= 0) {
            return clearInterval(interval);
          }
  
          const particleCount = 50 * (timeLeft / duration);
          confetti(Object.assign({}, defaults, { 
            particleCount, 
            origin: { x: 0.2, y: Math.random() - 0.2 },
            colors: colors
          }));
          confetti(Object.assign({}, defaults, { 
            particleCount, 
            origin: { x: 0.8, y: Math.random() - 0.2 },
            colors: colors
          }));
        }, 250);
        break;
      
      // ... rest of the code remains the same
    
  
    
    case 'cannon':
      const end = Date.now() + (1 * 1000);

      (function frame() {
        confetti({
          particleCount: 1,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: colors
        });
        confetti({
          particleCount: 1,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: colors
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      })();
      break;
    
      case 'fireworks':
        colors.forEach(color => {
          confetti({
            origin: { y: 0.7 },
            colors: [color],
            spread: 70,
            scalar: 1
          });
        });
        break;  
  }
};

//stealing confetti code because I am too lazy 