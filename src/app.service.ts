import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return `<!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8" />
          <meta
            name="viewport"
            content="width=device-width,user-scalable=no,initial-scale=1.0,maximum-scale=1.0,minimum-scale=1.0"
          />
          <title>创意画板</title>
          <style>
            #canvas {
              background: white;
              display: block;
              position: fixed;
              top: 0;
              left: 0;
            }
            ul,
            ol {
              list-style: none;
              padding: 0;
            }
            body {
              overflow: hidden;
              min-width: 800px;
            }
            * {
              margin: 0;
              padding: 0px;
            }
            .icon {
              width: 1em;
              height: 1em;
              vertical-align: -0.15em;
              fill: currentColor;
              overflow: hidden;
            }
            .footer {
              height: 80px;
              position: fixed;
              bottom: 0;
              font-size: 16px;
              background: #f0f0f0;
              color: #fff;
              width: 100%;
              display: flex;
              align-items: center;
              justify-content: center;
            }
            .tools {
              position: relative;
              background: #ebeceb;
              display: flex;
              flex-wrap: wrap;
              justify-content: center;
              margin-left: auto;
              margin-right: auto;
              border-bottom-right-radius: 10px;
              border-bottom-left-radius: 10px;
              z-index: 1;
              padding: 20px 0;
              width: 650px;
              margin-top: -106px;
              transition: 0.5s;
            }
            .tools.show {
              margin-top: 0px;
            }
            .tools:hover {
              margin-top: 0px;
            }
            .tools > .actions {
              display: flex;
            }
            .tools > .actions .icon {
              width: 28px;
              height: 28px;
            }
            .sizes > li .icon {
              width: 28px;
              height: 28px;
              padding: 5px;
            }
            .tools > .actions > li {
              width: 40px;
              height: 40px;
              display: flex;
              justify-content: center;
              align-items: center;
              border-radius: 4px;
              transition: all 0.3s;
              margin: 0 2px;
              background: #cccac9;
              border: 2px solid transparent;
            }
            .tools > .actions > li.active {
              background: #93c8ff;
            }
            .tools > .actions > li:hover {
              cursor: pointer;
              border: 2px solid #93c8ff;
            }
            .colors {
              display: flex;
              justify-content: center;
              align-items: center;
              flex-wrap: wrap;
              background: #cbcccb;
              margin: 0 10px 0 10px;
              border-radius: 5px;
              padding: 6px 2px;
            }
            .colors > .allColor {
              display: flex;
              width: 100px;
              justify-content: center;
              flex-wrap: wrap;
              background: #cbcccb;
              padding: 4px;
              margin: 0 10px 0 10px;
              border-radius: 5px;
            }
            .colors > .allColor > li {
              width: 25px;
              height: 25px;
              margin: 2px;
              border-radius: 2px;
              border: 2px solid transparent;
              transition: all 0.3s;
            }
            .colors > .allColor > li:hover {
              border: 2px solid #93c8ff;
            }
            .colors > .currentColor {
              width: 40px;
              height: 40px;
              margin-right: 16px;
              border-radius: 50%;
            }
            .colors > .allColor > li.color1 {
              background: black;
            }
            .colors > .allColor > li.color2 {
              background: blue;
            }
            .colors > .allColor > li.color3 {
              background: red;
            }
            .colors > .allColor > li.color4 {
              background: #549b77;
            }
            .colors > .allColor > li.color5 {
              background: #feaa39;
            }
            .colors > .allColor > li.color6 {
              background: #cd2256;
            }
            .colors > .allColor > li.active {
            }

            .currentColor.color1 {
              background: black;
            }
            .currentColor.color2 {
              background: blue;
            }
            .currentColor.color3 {
              background: red;
            }
            .currentColor.color4 {
              background: #549b77;
            }
            .currentColor.color5 {
              background: #feaa39;
            }
            .currentColor.color6 {
              background: #cd2256;
            }

            .sizes {
              display: flex;
            }

            .sizes > li {
              margin: 0 2px;
              width: 40px;
              height: 40px;
              border-radius: 4px;
              transition: all 0.1s;
              display: flex;
              justify-content: center;
              align-items: center;
              background: #cccac9;
              border: 2px solid transparent;
            }
            .sizes > li:hover {
              border: 2px solid #93c8ff;
              background: #cccac9;
              cursor: pointer;
            }
            .sizes > li.active {
              background: #94c9ff;
            }
            /* rem = pageWidht/20 */
            @media (min-width: 320px) and (max-width: 500px) {
              body {
                min-width: 100%;
              }
              .tools {
                width: 100%;
                padding-bottom: 6.25rem;
                border-bottom-right-radius: 0.62rem;
                border-bottom-left-radius: 0.62rem;
                position: relative;
                margin-top: -8rem;
              }
              .tools > .actions {
                justify-content: center;
              }
              .tools > .actions .icon {
                width: 1.8rem;
                height: 1.8rem;
              }
              .tools > .actions > li,
              .tools > .sizes > li {
                width: 2.2rem;
                height: 2.2rem;
              }
              .tools > .colors {
                position: absolute;
                margin: auto;
                top: 4.5rem;
                padding: 0.38rem 2px;
              }
              .tools > .colors > .allColor {
                flex-wrap: nowrap;
                width: auto;
              }
              .tools > .colors > .allColor > li {
                width: 1.8rem;
                height: 1.8rem;
                margin: 0.1rem;
              }
              .colors > .currentColor {
                width: 2.5rem;
                height: 2.5rem;
                margin-right: 1rem;
                border-radius: 50%;
              }
              .tools > .sizes {
                justify-content: center;
              }
            }
          </style>
        </head>
        <body>
          <div class="tools show">
            <ul class="actions">
              <li id="pen" class="active">
                <svg class="icon">
                  <use xlink:href="#icon-nib"></use>
                </svg>
              </li>
              <li id="eraser">
                <svg class="icon">
                  <use xlink:href="#icon-rubber"></use>
                </svg>
              </li>
              <li id="clear">
                <svg class="clear icon">
                  <use xlink:href="#icon-decorate"></use>
                </svg>
              </li>
              <li id="download">
                <svg class="download icon">
                  <use xlink:href="#icon-download1"></use>
                </svg>
              </li>
            </ul>
            <ol class="colors">
              <div class="allColor">
                <li id="color1" class="color1"></li>
                <li id="color2" class="color2"></li>
                <li id="color3" class="color3"></li>
                <li id="color4" class="color4"></li>
                <li id="color5" class="color5"></li>
                <li id="color6" class="color6 active"></li>
              </div>
              <div class="currentColor color1" id="currentColor"></div>
            </ol>
            <ol class="sizes">
              <li id="thin" class="thin">
                <svg class="icon">
                  <use xlink:href="#icon-point"></use>
                </svg>
              </li>
              <li id="middle" class="middle active">
                <svg class="icon">
                  <use xlink:href="#icon-point2"></use>
                </svg>
              </li>
              <li id="thick" class="thick">
                <svg class="icon">
                  <use xlink:href="#icon-point3"></use>
                </svg>
              </li>
            </ol>
          </div>
          <canvas id="canvas" width="300" height="300"></canvas>
          <footer class="footer">
            <a href="https://beian.miit.gov.cn/" target="_blank">ICP备案号：</a>
            <a href="https://beian.miit.gov.cn/" target="_blank"
              >粤ICP备2024236721号</a
            >
          </footer>
        </body>
        <script>
          var canvas = document.getElementById("canvas");
          var context = canvas.getContext("2d");
          var eraserEnable = false;
          var lineWidth = 4;
          var points = [];
          var beginPoint = null;
          var pageWidth = window.innerWidth;
          var colors = ["color1", "color2", "color3", "color4", "color5", "color6"];

          //移动端设置
          document.write("<style>html{font-size:" + pageWidth / 20 + "px;}</style>");

          autoSetCanvasSize(canvas);
          listenToUser(canvas);
          setTimeout(() => {
            var tools = document.querySelector(".tools");
            tools.classList.remove("show");
          }, 3000);

          function listenToUser(canvas) {
            var using = false;
            context.fillStyle = "black";
            context.fillStyle = "black";
            context.lineJoin = "round";
            context.lineCap = "round";
            //特性检测
            if (document.body.ontouchstart !== undefined) {
              //在触屏设备上使用
              canvas.ontouchstart = function (pos) {
                using = true;
                var x = pos.targetTouches[0].clientX;
                var y = pos.targetTouches[0].clientY;
                if (eraserEnable) {
                  context.clearRect(x - 10, y - 10, 20, 20);
                } else {
                  points.push[{ x, y }];
                  beginPoint = { x: x, y: y };
                  drawCircle(x, y, lineWidth / 2);
                }
              };
              canvas.ontouchmove = function (pos) {
                var x = pos.targetTouches[0].clientX;
                var y = pos.targetTouches[0].clientY;
                if (!using) {
                  return;
                }
                points.push({ x, y });
                if (points.length > 3) {
                  points.shift[0];
                }
                if (eraserEnable) {
                  context.clearRect(x - 10, y - 10, 20, 20);
                } else {
                  if (points.length > 3) {
                    const lastTwoPoints = points.slice(-2);
                    const controlPoint = lastTwoPoints[0];
                    const endPoint = {
                      x: (lastTwoPoints[0].x + lastTwoPoints[1].x) / 2,
                      y: (lastTwoPoints[0].y + lastTwoPoints[1].y) / 2,
                    };
                    drawLine(beginPoint, controlPoint, endPoint);
                    beginPoint = endPoint;
                  }
                }
              };
              canvas.ontouchend = function (pos) {
                if (!using) {
                  return;
                }
                var x = pos.changedTouches[0].clientX;
                var y = pos.changedTouches[0].clientY;
                points.push({ x, y });
                if (points.length > 3 && eraserEnable === false) {
                  const lastTwoPoints = points.slice(-2);
                  const controlPoint = lastTwoPoints[0];
                  const endPoint = lastTwoPoints[1];
                  drawLine(beginPoint, controlPoint, endPoint);
                }
                beginPoint = null;
                points = [];
                using = false;
              };
            } else {
              //在PC上使用的程序
              canvas.onmousedown = function (pos) {
                using = true;
                var x = pos.clientX;
                var y = pos.clientY;
                points.push[{ x, y }];
                if (eraserEnable) {
                  context.clearRect(x - 10, y - 10, 20, 20);
                } else {
                  beginPoint = { x: x, y: y };
                  drawCircle(x, y, lineWidth / 2);
                }
              };
              canvas.onmousemove = function (pos) {
                var x = pos.clientX;
                var y = pos.clientY;
                points.push({ x, y });
                if (!using) {
                  return;
                }
                if (eraserEnable) {
                  context.clearRect(x - 10, y - 10, 20, 20);
                } else {
                  if (points.length > 3) {
                    const lastTwoPoints = points.slice(-2);
                    const controlPoint = lastTwoPoints[0];
                    const endPoint = {
                      x: (lastTwoPoints[0].x + lastTwoPoints[1].x) / 2,
                      y: (lastTwoPoints[0].y + lastTwoPoints[1].y) / 2,
                    };
                    drawLine(beginPoint, controlPoint, endPoint);
                    beginPoint = endPoint;
                  }
                }
              };
              canvas.onmouseup = function (pos) {
                if (!using) {
                  return;
                }
                var x = pos.clientX;
                var y = pos.clientY;
                points.push({ x, y });
                if (points.length > 3 && eraserEnable === false) {
                  const lastTwoPoints = points.slice(-2);
                  const controlPoint = lastTwoPoints[0];
                  const endPoint = lastTwoPoints[1];
                  drawLine(beginPoint, controlPoint, endPoint);
                }
                beginPoint = null;
                points = [];
                using = false;
              };
            }
          }

          /*****************/

          function drawCircle(x, y, radius) {
            context.beginPath();
            context.arc(x, y, radius, 0, Math.PI * 2);
            context.fill();
          }
          function drawLine(beginPoint, controlPoint, endPoint) {
            context.beginPath();
            context.moveTo(beginPoint.x, beginPoint.y);
            context.lineWidth = lineWidth;
            context.quadraticCurveTo(
              controlPoint.x,
              controlPoint.y,
              endPoint.x,
              endPoint.y
            );
            context.stroke();
            context.closePath();
          }
          function autoSetCanvasSize(canvas) {
            setCanvasSize();
            window.onresize = function () {
              setCanvasSize();
            };
            function setCanvasSize() {
              var pageWidth = document.documentElement.clientWidth;
              var pageHeight = document.documentElement.clientHeight;
              canvas.width = pageWidth;
              canvas.height = pageHeight - 80;
              context.fillStyle = "white";
              context.fillRect(0, 0, pageWidth, pageHeight);
            }
          }
          pen.onclick = function () {
            eraserEnable = false;
            pen.classList.add("active");
            eraser.classList.remove("active");
          };
          eraser.onclick = function () {
            eraserEnable = true;
            eraser.classList.add("active");
            pen.classList.remove("active");
          };
          color1.onclick = function () {
            color1.classList.add("active");
            color2.classList.remove("active");
            color3.classList.remove("active");
            color4.classList.remove("active");
            color5.classList.remove("active");
            color6.classList.remove("active");
            colors.map(function (color) {
              if (color !== "color1") {
                currentColor.classList.remove(color);
              }
            });
            currentColor.classList.add("color1");
            context.fillStyle = "black";
            context.strokeStyle = "black";
          };
          color2.onclick = function () {
            color2.classList.add("active");
            color1.classList.remove("active");
            color3.classList.remove("active");
            color4.classList.remove("active");
            color5.classList.remove("active");
            color6.classList.remove("active");
            colors.map(function (color) {
              if (color !== "color2") {
                currentColor.classList.remove(color);
              }
            });
            currentColor.classList.add("color2");
            context.fillStyle = "blue";
            context.strokeStyle = "blue";
          };
          color3.onclick = function () {
            color3.classList.add("active");
            color2.classList.remove("active");
            color1.classList.remove("active");
            color4.classList.remove("active");
            color5.classList.remove("active");
            color6.classList.remove("active");
            colors.map(function (color) {
              if (color !== "color3") {
                currentColor.classList.remove(color);
              }
            });
            currentColor.classList.add("color3");
            context.fillStyle = "red";
            context.strokeStyle = "red";
          };
          color4.onclick = function () {
            color4.classList.add("active");
            color2.classList.remove("active");
            color3.classList.remove("active");
            color1.classList.remove("active");
            color5.classList.remove("active");
            color6.classList.remove("active");
            colors.map(function (color) {
              if (color !== "color4") {
                currentColor.classList.remove(color);
              }
            });
            currentColor.classList.add("color4");
            context.fillStyle = "#549B77";
            context.strokeStyle = "#549B77";
          };
          color5.onclick = function () {
            color5.classList.add("active");
            color2.classList.remove("active");
            color3.classList.remove("active");
            color4.classList.remove("active");
            color1.classList.remove("active");
            color6.classList.remove("active");
            colors.map(function (color) {
              if (color !== "color5") {
                currentColor.classList.remove(color);
              }
            });
            currentColor.classList.add("color5");
            context.fillStyle = "#FEAA39";
            context.strokeStyle = "#FEAA39";
          };
          color6.onclick = function () {
            color6.classList.add("active");
            color2.classList.remove("active");
            color3.classList.remove("active");
            color4.classList.remove("active");
            color5.classList.remove("active");
            color1.classList.remove("active");
            colors.map(function (color) {
              if (color !== "color6") {
                currentColor.classList.remove(color);
              }
            });
            currentColor.classList.add("color6");

            context.fillStyle = "#CD2256";
            context.strokeStyle = "#CD2256";
          };
          thin.onclick = function () {
            lineWidth = 2;
            thin.classList.add("active");
            middle.classList.remove("active");
            thick.classList.remove("active");
          };
          middle.onclick = function () {
            lineWidth = 4;
            middle.classList.add("active");
            thin.classList.remove("active");
            thick.classList.remove("active");
          };
          thick.onclick = function () {
            lineWidth = 8;
            thick.classList.add("active");
            middle.classList.remove("active");
            thin.classList.remove("active");
          };
          clear.onclick = function () {
            context.clearRect(0, 0, canvas.width, canvas.height);
          };
          download.onclick = function () {
            var url = canvas.toDataURL("image/png");
            var a = document.createElement("a");
            a.href = url;
            a.download = "myPainting";
            a.target = "_blank";
            a.click();
          };
        </script>
        <script src="//at.alicdn.com/t/font_631244_4uxbu6azbg5.js"></script>
      </html>
    `;
  }
}
