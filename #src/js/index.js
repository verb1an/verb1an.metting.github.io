document.addEventListener("DOMContentLoaded", () => {
    ui();
    scroll_anim();

    xmlhttpreq.open("GET", "../source/price.json", true);
    xmlhttpreq.send();
    price_switcher();

    new Swiper(".features__swiper", {
        slidesPerView: 3,
        spaceBetween: 80,
        loop: true,

        autoplay: {
            delay: 4000,
        },

        breakpoints: {
            320: {
                slidesPerView: 1,
            },
            630: {
                slidesPerView: 2,
            },
            991: {
                slidesPerView: 3,
            }
        }
    });
});

const ui = () => {
    let html = document.querySelector("html");
    let menu = document.querySelector('.header .nav');
    let btn_to_top = document.querySelector(".btn--to_top");
    let btn_mobile_menu = document.querySelector('.btn--burger');

    document.querySelectorAll(".btn.btn--def").forEach((el) => {
        el.addEventListener("mousemove", (e) => {
            let x, y;
            if (
                window.getComputedStyle(el).getPropertyValue("position") ==
                "relative"
            ) {
                (x = e.clientX - (e.target.offsetLeft - html.scrollLeft)),
                    (y = e.clientY - (e.target.offsetTop - html.scrollTop));
            } else {
                (x = e.clientX - e.target.offsetLeft),
                    (y = e.clientY - e.target.offsetTop);
            }
            el.style.setProperty("--x", x + "px");
            el.style.setProperty("--y", y + "px");
        });
    });

    document.addEventListener("scroll", () => {
        if (html.scrollTop > 300) {
            btn_to_top.classList.add("show");
        } else {
            btn_to_top.classList.remove("show");
        }
    });

    btn_to_top.addEventListener("click", () => {
        html.scrollTo(0, 0);
        window.location.hash = '';
    });

    btn_mobile_menu.addEventListener('click', toggleMenu);
    for ( let i = 0; i < menu.children.length; i++ ) {
        menu.children[i].addEventListener('click', toggleMenu);
    }

    function toggleMenu() {
        menu.classList.toggle('mobile--active');
        btn_mobile_menu.classList.toggle('mobile--active');
    }
};

prices

let prices = [];

const price_switcher = () => {
    let toggles = document.querySelectorAll(".price__list .tabs label");
    toggles.forEach((el) => {
        el.addEventListener("click", () => {
            prices.forEach((price) => {
                if (price.time_type == el.getAttribute("data--subtime")) {
                    replace_price(price);
                    console.log( el.getAttribute("data--subtime") )
                }
            });
        });
    });
};

function replace_price(obj) {
    document
        .querySelectorAll(".price__list .content .item")
        .forEach((el, i) => {
            el.children[0].children[1].innerHTML = `
            ${obj.prices[i]} <span class="pricetime">/${obj.time_type.substring(0, 2)}</span
        `;
        });
}

var xmlhttpreq = new XMLHttpRequest();
xmlhttpreq.onreadystatechange = function () {
    if ((this.readyState == 4) & (this.status == 200)) {
        prices = JSON.parse(this.responseText);
        replace_price(prices[1]);
    }
};

const scroll_anim = () => {
    let scroll_anim_items = document.querySelectorAll('._scroll_animate-item');
    if(scroll_anim_items.length > 0) {

        window.addEventListener('scroll', anim_on_scroll);

        scroll_anim_items.forEach((el) => {
            if ( el.getAttribute('data-sai_dur') )
                el.style.transition = `${el.getAttribute('data-sai_dur')}s`;
            if ( el.getAttribute('data-sai_del') )
                el.style.transitionDelay = `${el.getAttribute('data-sai_del')}s`;
        })
        
        function anim_on_scroll() {
            scroll_anim_items.forEach((el) => {
                let itemHeight = el.offsetHeight || el.getBoundingClientRect().height,
                    itemOffset = offset(el).top,
                    animStart = 16;

                let animItemPoint = window.innerHeight - window.innerHeight / animStart;
                

                if( (pageYOffset > itemOffset - animItemPoint ) && pageYOffset < (itemOffset + itemHeight) ) {
                    el.classList.add('_sai_animate');
                    
                }else{
                    el.classList.remove('_sai_animate');
                }
            });
        }
    }
    anim_on_scroll();

    function offset(el) {
        const rect = el.getBoundingClientRect(),
            scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
            scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        return {
            top: rect.top + scrollTop,
            left: rect.left + scrollLeft
        }
    }
};