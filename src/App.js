import React, { useRef, useState, useEffect, useCallback } from "react";

import Circle from "./shapes/Circle/Circle";
import Square from "./shapes/Square/Square";

import "./App.css";

// class App extends React.Component {
//   canvasRef = React.createRef();
//   state = {
//     circles: [],
//     x: 0,
//     y: 0
//   };

//   createCircles = ctx => {
//     const circles = [];
//     for (let i = 0; i < 100; i++) {
//       const circle = Circle.createCircle(
//         ctx,
//         40,
//         window.innerHeight,
//         window.innerWidth
//       );
//       circle.draw();
//       circles.push(circle);
//     }

//     return circles;
//   };

//   componentDidMount() {
//     const ctx = this.canvasRef.current.getContext("2d");
//     // const animate = () => {
//     //   requestAnimationFrame(animate);
//     //   // ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
//     //   for (let i = 0; i < this.state.circles.length; i++) {
//     //     this.state.circles[i].update(window.innerHeight, window.innerWidth, {
//     //       x: this.state.x,
//     //       y: this.state.y
//     //     });
//     //   }
//     // };
//     this.setState({
//       circles: this.createCircles(ctx)
//     });
//     // animate();
//   }

//   render() {
//     return (
//       <div className="App">
//         <canvas
//           width={window.innerWidth}
//           height={window.innerHeight}
//           ref={this.canvasRef}
//           onMouseMove={e => {
//             const ctx = this.canvasRef.current.getContext("2d");
//             const animate = () => {
//               requestAnimationFrame(animate);
//               // ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
//               for (let i = 0; i < this.state.circles.length; i++) {
//                 this.state.circles[i].update(
//                   window.innerHeight,
//                   window.innerWidth,
//                   {
//                     x: this.state.x,
//                     y: this.state.y
//                   }
//                 );
//               }
//             };
//             animate();
//             this.setState({
//               x: e.pageX,
//               y: e.pageY
//             });
//             // ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
//             // for (let i = 0; i < circles.length; i++) {
//             //   circles[i].update(window.innerWidth, window.innerHeight, {
//             //     x: e.pageX,
//             //     y: e.pageY
//             //   });
//             // }
//           }}
//         />
//       </div>
//     );
//   }
// }

// export default App;

function App() {
  const canvasRef = useRef(null);
  const [circles, setCircles] = useState([]);
  const [squares, setSquares] = useState([]);
  const [x, setX] = useState(undefined);
  const [y, setY] = useState(undefined);

  const createCircles = ctx => {
    const circles = [];
    for (let i = 0; i < 500; i++) {
      const circle = Circle.createCircle(
        ctx,
        40,
        window.innerHeight,
        window.innerWidth
      );
      circles.push(circle);
    }
    return circles;
  };

  const createSquares = ctx => {
    const squares = [];
    for (let i = 0; i < 500; i++) {
      squares.push(
        Square.createSquare(ctx, 40, window.innerHeight, window.innerWidth)
      );
    }
    return squares;
  };

  useEffect(() => {
    const ctx = canvasRef.current.getContext("2d");
    setCircles(createCircles(ctx));
    setSquares(createSquares(ctx));
  }, []);

  useEffect(() => {
    (function animate() {
      const ctx = canvasRef.current.getContext("2d");
      requestAnimationFrame(animate);
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      circles.forEach(circle =>
        circle.update(window.innerHeight, window.innerWidth)
      );
      squares.forEach(square =>
        square.update(window.innerHeight, window.innerWidth)
      );
    })();
  }, [circles, squares]);

  useEffect(() => {
    circles.forEach(circle => circle.setMouse({ x, y }));
    squares.forEach(square => square.setMouse({ x, y }));
  }, [x, y, circles, squares]);

  return (
    <div className="App">
      <canvas
        width={window.innerWidth}
        height={window.innerHeight}
        ref={canvasRef}
        onMouseMove={e => {
          setX(e.pageX);
          setY(e.pageY);
        }}
      />
    </div>
  );
}

export default App;
