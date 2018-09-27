Vue.component('body-menu', {
    template:
    `
        <div>
            <nav class="nav justify-content-center my-2 nav-fill nav-pills">
                <a class="nav-item nav-link">Home</a>
                <a class="nav-item nav-link">Page 1</a>
                <a class="nav-item nav-link">Page 2</a>
                <a class="nav-item nav-link">Page 3</a>
            </nav>   
            <canvas id="canvas"></canvas>
        </div>
    `,

    // mounted() {
    //   this.data = this.$children;
    // },
    data() {
        return {
            menuItems: [
                { id:1, name: 'Home', active: true },
                { id:2, name: 'Page 1', active: false },
                { id:3, name: 'Page 2', active: false },
                { id:4, name: 'Page 3', active: false },
            ]
        };
    },
    mounted: function () {
        (function () {
            var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
            window.requestAnimationFrame = requestAnimationFrame;
        })();

        console.log(document.getElementById("canvas"));

        var canvas = document.getElementById("canvas"),
            ctx = canvas.getContext("2d");


        canvas.height = document.body.offsetHeight + 500;
        canvas.width = 2500;

        // console.log('canvas.width', canvas.width);

        var parts = [],
            minSpawnTime = 90,
            lastTime = new Date().getTime(),
            maxLifeTime = Math.min(20000, (canvas.height/(1.5*60)*1000)),
            emitterX = canvas.width / 2,
            emitterY = canvas.height - 10,
            smokeImage = new Image();

        function spawn() {
            if(new Date().getTime() > lastTime + minSpawnTime) {
                lastTime = new Date().getTime();
                parts.push(new smoke(0, emitterY));
                parts.push(new smoke(50, emitterY));
                parts.push(new smoke(100, emitterY));
                parts.push(new smoke(150, emitterY));
                parts.push(new smoke(200, emitterY));
                parts.push(new smoke(250, emitterY));

                parts.push(new smoke(500, emitterY));
                parts.push(new smoke(550, emitterY));
                parts.push(new smoke(600, emitterY));
                parts.push(new smoke(650, emitterY));
                parts.push(new smoke(700, emitterY));
                parts.push(new smoke(750, emitterY));



                parts.push(new smoke(1000, emitterY));
                parts.push(new smoke(1050, emitterY));
                parts.push(new smoke(1100, emitterY));
                parts.push(new smoke(1150, emitterY));
                parts.push(new smoke(1200, emitterY));
                parts.push(new smoke(1250, emitterY));


                parts.push(new smoke(1500, emitterY));
                parts.push(new smoke(1550, emitterY));
                parts.push(new smoke(1600, emitterY));
                parts.push(new smoke(1650, emitterY));
                parts.push(new smoke(1700, emitterY));
                parts.push(new smoke(1750, emitterY));

                parts.push(new smoke(2000, emitterY));
                parts.push(new smoke(2050, emitterY));
                parts.push(new smoke(2100, emitterY));
                parts.push(new smoke(2150, emitterY));
                parts.push(new smoke(2200, emitterY));
                parts.push(new smoke(2250, emitterY));

            }
        }

        function render() {
            var len = parts.length;
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            while (len--) {
                if (parts[len].y < 0 || parts[len].lifeTime > maxLifeTime) {
                    parts.splice(len, 1);
                } else {
                    parts[len].update();

                    ctx.save();
                    var offsetX = -parts[len].size/2,
                        offsetY = -parts[len].size/2;

                    ctx.translate(parts[len].x-offsetX, parts[len].y-offsetY);
                    ctx.rotate(parts[len].angle / 180 * Math.PI);
                    ctx.globalAlpha  = parts[len].alpha;
                    ctx.drawImage(smokeImage, offsetX,offsetY, parts[len].size, parts[len].size);
                    ctx.restore();
                }
            }
            spawn();
            requestAnimationFrame(render);
        }

        function smoke(x, y, index) {
            this.x = x;
            this.y = y;

            this.size = 1;
            this.startSize = 32;
            this.endSize = 40;

            this.angle = Math.random() * 359;

            this.startLife = new Date().getTime();
            this.lifeTime = 0;

            this.velY = -1 - (Math.random()*0.5);
            this.velX = Math.floor(Math.random() * (-6) + 3) / 10;
        }

        smoke.prototype.update = function () {
            this.lifeTime = new Date().getTime() - this.startLife;
            this.angle += 0.2;

            var lifePerc = ((this.lifeTime / maxLifeTime) * 100);

            this.size = this.startSize + ((this.endSize - this.startSize) * lifePerc * .1);

            this.alpha = 1 - (lifePerc * .01);
            this.alpha = Math.max(this.alpha,0);

            this.x += this.velX;
            this.y += this.velY;
        }

        // smokeImage.src = "http://somethinghitme.com/projects/particle%20test/images/smoke.png";
        // smokeImage.src = "./smoke.png";
        smokeImage.src = "./smoke1.jpg";
        // smokeImage.src = "./smoke2.png";
        // smokeImage.src = "./smoke3.png";
        // smokeImage.src = "./cloud1.png";
        // smokeImage.src = "./cloud2.png";
        // smokeImage.src = "./cloud3.png";
        smokeImage.onload = function () {
            render();
        }


        window.onresize = resizeMe;
        window.onload = resizeMe;
        function resizeMe() {
            canvas.height = document.body.offsetHeight;
        }
    }

});

Vue.component('menu-item', {
    template: '<a class="nav-item nav-link"><slot></slot></a>',
});


new Vue({
    el:'#main-body',
});


