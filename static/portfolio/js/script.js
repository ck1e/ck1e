(function ($) {
    "use strict";
    AOS.init();
    $("#loader").fakeLoader({timeToHide: 1, zIndex: "999", spinner: "spinner3", bgColor: "#111", imagePath: ""});
    $('#toggle').on('click', function () {
        $(this).toggleClass('active');
        $('#overlay').toggleClass('open');
        if ($('.spin').length) $('.spin').toggleClass('hidden');
    });
    $('.nav-left').on('mouseenter', function () {
        $('.left-anim').addClass('-active'), $('.decor').addClass('-active'), $('.logo').addClass('-active'), $('.copyright').addClass('-active'), $('.decor-bottom').addClass('-active-left');
    }).on('mouseleave', function () {
        $('.left-anim').removeClass('-active'), $('.decor').removeClass('-active'), $('.logo').removeClass('-active'), $('.copyright').removeClass('-active'), $('.decor-bottom').removeClass('-active-left');
    });
    $('.nav-right').on('mouseenter', function () {
        $('.right-anim').addClass('-active'), $('.decor').addClass('-active'), $('.social').addClass('-active'), $('.button_container').addClass('-active'), $('.decor-bottom').addClass('-active-right');
    }).on('mouseleave', function () {
        $('.right-anim').removeClass('-active'), $('.decor').removeClass('-active'), $('.social').removeClass('-active'), $('.button_container').removeClass('-active'), $('.decor-bottom').removeClass('-active-right');
    });
    var cursor = {
        delay: 8,
        _x: 0,
        _y: 0,
        endX: (window.innerWidth / 2),
        endY: (window.innerHeight / 2),
        cursorVisible: true,
        cursorEnlarged: false,
        $dot: document.querySelector('.cursor-dot'),
        $outline: document.querySelector('.cursor-dot-outline'),
        init: function () {
            this.dotSize = this.$dot.offsetWidth;
            this.outlineSize = this.$outline.offsetWidth;
            this.setupEventListeners();
            this.animateDotOutline();
        },
        setupEventListeners: function () {
            var self = this;
            document.querySelectorAll('a').forEach(function (el) {
                el.addEventListener('mouseover', function () {
                    self.cursorEnlarged = true;
                    self.toggleCursorSize();
                });
                el.addEventListener('mouseout', function () {
                    self.cursorEnlarged = false;
                    self.toggleCursorSize();
                });
            });
            document.addEventListener('mousedown', function () {
                self.cursorEnlarged = true;
                self.toggleCursorSize();
            });
            document.addEventListener('mouseup', function () {
                self.cursorEnlarged = false;
                self.toggleCursorSize();
            });
            document.addEventListener('mousemove', function (e) {
                self.cursorVisible = true;
                self.toggleCursorVisibility();
                self.endX = e.pageX;
                self.endY = e.pageY;
                self.$dot.style.top = self.endY + 'px';
                self.$dot.style.left = self.endX + 'px';
            });
            document.addEventListener('mouseenter', function (e) {
                self.cursorVisible = true;
                self.toggleCursorVisibility();
                self.$dot.style.opacity = 1;
                self.$outline.style.opacity = 1;
            });
            document.addEventListener('mouseleave', function (e) {
                self.cursorVisible = true;
                self.toggleCursorVisibility();
                self.$dot.style.opacity = 0;
                self.$outline.style.opacity = 0;
            });
        },
        animateDotOutline: function () {
            var self = this;
            self._x += (self.endX - self._x) / self.delay;
            self._y += (self.endY - self._y) / self.delay;
            self.$outline.style.top = self._y + 'px';
            self.$outline.style.left = self._x + 'px';
            requestAnimationFrame(this.animateDotOutline.bind(self));
        },
        toggleCursorSize: function () {
            var self = this;
            if (self.cursorEnlarged) {
                self.$dot.style.transform = 'translate(-50%, -50%) scale(0.75)';
                self.$outline.style.transform = 'translate(-50%, -50%) scale(1.5)';
            } else {
                self.$dot.style.transform = 'translate(-50%, -50%) scale(1)';
                self.$outline.style.transform = 'translate(-50%, -50%) scale(1)';
            }
        },
        toggleCursorVisibility: function () {
            var self = this;
            if (self.cursorVisible) {
                self.$dot.style.opacity = 1;
                self.$outline.style.opacity = 1;
            } else {
                self.$dot.style.opacity = 0;
                self.$outline.style.opacity = 0;
            }
        }
    }
    cursor.init();



    const initBgGradient = function () {
        let listGradient = [
            'linear-gradient(45deg, #040d2c,#462a8b,#c505d6)',
            'linear-gradient(90deg, #effe65,#c76646,#3a0f2d)',
            'linear-gradient(90deg, #9f2ef4,#f97d64,#ffcd42)',
            'linear-gradient(45deg, #bf46d2,#8da2ff,#b0dafc)',
            'linear-gradient(45deg, #50f2c4,#26d0e3,#757aff)',
            'linear-gradient(90deg, #bc97ee,#5093e1,#1ed567)',
            'linear-gradient(90deg, #00a49b,#026773,#092c4e)',
            'linear-gradient(90deg, #dd708f,#8a346d,#391548)',
            'linear-gradient(90deg, #454545,#212121)',
            'linear-gradient(90deg, #6cff95,#1e524e)'
        ]

        let getRandomPermutation = (n) => {
            let arr = Array.from(Array(n).keys());

            for (let i = (n - 1); i > 0; i--) {
                let j = Math.floor(Math.random() * i);

                [arr[i], arr[j]] = [arr[j], arr[i]];
            }

            return arr;
        }

        let permutation = getRandomPermutation(listGradient.length);
        let temp = listGradient.slice();

        $('.bg-gradient').each(function ( index ) {
            $( this ).css( "background", temp[permutation[index]]);
        });
    }
window.addEventListener("DOMContentLoaded", initBgGradient);
})(jQuery);
