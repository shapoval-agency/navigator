(() => {
    "use strict";
    const modules_flsModules = {};
    function isWebp() {
        function testWebP(callback) {
            let webP = new Image;
            webP.onload = webP.onerror = function() {
                callback(webP.height == 2);
            };
            webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
        }
        testWebP((function(support) {
            let className = support === true ? "webp" : "no-webp";
            document.documentElement.classList.add(className);
        }));
    }
    function functions_getHash() {
        if (location.hash) return location.hash.replace("#", "");
    }
    function setHash(hash) {
        hash = hash ? `#${hash}` : window.location.href.split("#")[0];
        history.pushState("", "", hash);
    }
    let _slideUp = (target, duration = 500, showmore = 0) => {
        if (!target.classList.contains("_slide")) {
            target.classList.add("_slide");
            target.style.transitionProperty = "height, margin, padding";
            target.style.transitionDuration = duration + "ms";
            target.style.height = `${target.offsetHeight}px`;
            target.offsetHeight;
            target.style.overflow = "hidden";
            target.style.height = showmore ? `${showmore}px` : `0px`;
            target.style.paddingTop = 0;
            target.style.paddingBottom = 0;
            target.style.marginTop = 0;
            target.style.marginBottom = 0;
            window.setTimeout((() => {
                target.hidden = !showmore ? true : false;
                !showmore ? target.style.removeProperty("height") : null;
                target.style.removeProperty("padding-top");
                target.style.removeProperty("padding-bottom");
                target.style.removeProperty("margin-top");
                target.style.removeProperty("margin-bottom");
                !showmore ? target.style.removeProperty("overflow") : null;
                target.style.removeProperty("transition-duration");
                target.style.removeProperty("transition-property");
                target.classList.remove("_slide");
                document.dispatchEvent(new CustomEvent("slideUpDone", {
                    detail: {
                        target
                    }
                }));
            }), duration);
        }
    };
    let _slideDown = (target, duration = 500, showmore = 0) => {
        if (!target.classList.contains("_slide")) {
            target.classList.add("_slide");
            target.hidden = target.hidden ? false : null;
            showmore ? target.style.removeProperty("height") : null;
            let height = target.offsetHeight;
            target.style.overflow = "hidden";
            target.style.height = showmore ? `${showmore}px` : `0px`;
            target.style.paddingTop = 0;
            target.style.paddingBottom = 0;
            target.style.marginTop = 0;
            target.style.marginBottom = 0;
            target.offsetHeight;
            target.style.transitionProperty = "height, margin, padding";
            target.style.transitionDuration = duration + "ms";
            target.style.height = height + "px";
            target.style.removeProperty("padding-top");
            target.style.removeProperty("padding-bottom");
            target.style.removeProperty("margin-top");
            target.style.removeProperty("margin-bottom");
            window.setTimeout((() => {
                target.style.removeProperty("height");
                target.style.removeProperty("overflow");
                target.style.removeProperty("transition-duration");
                target.style.removeProperty("transition-property");
                target.classList.remove("_slide");
                document.dispatchEvent(new CustomEvent("slideDownDone", {
                    detail: {
                        target
                    }
                }));
            }), duration);
        }
    };
    let _slideToggle = (target, duration = 500) => {
        if (target.hidden) return _slideDown(target, duration); else return _slideUp(target, duration);
    };
    let bodyLockStatus = true;
    let bodyLockToggle = (delay = 500) => {
        if (document.documentElement.classList.contains("lock")) bodyUnlock(delay); else bodyLock(delay);
    };
    let bodyUnlock = (delay = 500) => {
        let body = document.querySelector("body");
        if (bodyLockStatus) {
            let lock_padding = document.querySelectorAll("[data-lp]");
            setTimeout((() => {
                for (let index = 0; index < lock_padding.length; index++) {
                    const el = lock_padding[index];
                    el.style.paddingRight = "0px";
                }
                body.style.paddingRight = "0px";
                document.documentElement.classList.remove("lock");
            }), delay);
            bodyLockStatus = false;
            setTimeout((function() {
                bodyLockStatus = true;
            }), delay);
        }
    };
    let bodyLock = (delay = 500) => {
        let body = document.querySelector("body");
        if (bodyLockStatus) {
            let lock_padding = document.querySelectorAll("[data-lp]");
            for (let index = 0; index < lock_padding.length; index++) {
                const el = lock_padding[index];
                el.style.paddingRight = window.innerWidth - document.querySelector(".wrapper").offsetWidth + "px";
            }
            body.style.paddingRight = window.innerWidth - document.querySelector(".wrapper").offsetWidth + "px";
            document.documentElement.classList.add("lock");
            bodyLockStatus = false;
            setTimeout((function() {
                bodyLockStatus = true;
            }), delay);
        }
    };
    function spollers() {
        const spollersArray = document.querySelectorAll("[data-spollers]");
        if (spollersArray.length > 0) {
            document.addEventListener("click", setSpollerAction);
            const spollersRegular = Array.from(spollersArray).filter((function(item, index, self) {
                return !item.dataset.spollers.split(",")[0];
            }));
            if (spollersRegular.length) initSpollers(spollersRegular);
            let mdQueriesArray = dataMediaQueries(spollersArray, "spollers");
            if (mdQueriesArray && mdQueriesArray.length) mdQueriesArray.forEach((mdQueriesItem => {
                mdQueriesItem.matchMedia.addEventListener("change", (function() {
                    initSpollers(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia);
                }));
                initSpollers(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia);
            }));
            function initSpollers(spollersArray, matchMedia = false) {
                spollersArray.forEach((spollersBlock => {
                    spollersBlock = matchMedia ? spollersBlock.item : spollersBlock;
                    if (matchMedia.matches || !matchMedia) {
                        spollersBlock.classList.add("_spoller-init");
                        initSpollerBody(spollersBlock);
                    } else {
                        spollersBlock.classList.remove("_spoller-init");
                        initSpollerBody(spollersBlock, false);
                    }
                }));
            }
            function initSpollerBody(spollersBlock, hideSpollerBody = true) {
                let spollerItems = spollersBlock.querySelectorAll("details");
                if (spollerItems.length) spollerItems.forEach((spollerItem => {
                    let spollerTitle = spollerItem.querySelector("summary");
                    if (hideSpollerBody) {
                        spollerTitle.removeAttribute("tabindex");
                        if (!spollerItem.hasAttribute("data-open")) {
                            spollerItem.open = false;
                            spollerTitle.nextElementSibling.hidden = true;
                        } else {
                            spollerTitle.classList.add("_spoller-active");
                            spollerItem.open = true;
                        }
                    } else {
                        spollerTitle.setAttribute("tabindex", "-1");
                        spollerTitle.classList.remove("_spoller-active");
                        spollerItem.open = true;
                        spollerTitle.nextElementSibling.hidden = false;
                    }
                }));
            }
            function setSpollerAction(e) {
                const el = e.target;
                if (el.closest("summary") && el.closest("[data-spollers]")) {
                    e.preventDefault();
                    if (el.closest("[data-spollers]").classList.contains("_spoller-init")) {
                        const spollerTitle = el.closest("summary");
                        const spollerBlock = spollerTitle.closest("details");
                        const spollersBlock = spollerTitle.closest("[data-spollers]");
                        const oneSpoller = spollersBlock.hasAttribute("data-one-spoller");
                        const scrollSpoller = spollerBlock.hasAttribute("data-spoller-scroll");
                        const spollerSpeed = spollersBlock.dataset.spollersSpeed ? parseInt(spollersBlock.dataset.spollersSpeed) : 500;
                        if (!spollersBlock.querySelectorAll("._slide").length) {
                            if (oneSpoller && !spollerBlock.open) hideSpollersBody(spollersBlock);
                            !spollerBlock.open ? spollerBlock.open = true : setTimeout((() => {
                                spollerBlock.open = false;
                            }), spollerSpeed);
                            spollerTitle.classList.toggle("_spoller-active");
                            _slideToggle(spollerTitle.nextElementSibling, spollerSpeed);
                            if (scrollSpoller && spollerTitle.classList.contains("_spoller-active")) {
                                const scrollSpollerValue = spollerBlock.dataset.spollerScroll;
                                const scrollSpollerOffset = +scrollSpollerValue ? +scrollSpollerValue : 0;
                                const scrollSpollerNoHeader = spollerBlock.hasAttribute("data-spoller-scroll-noheader") ? document.querySelector(".header").offsetHeight : 0;
                                window.scrollTo({
                                    top: spollerBlock.offsetTop - (scrollSpollerOffset + scrollSpollerNoHeader),
                                    behavior: "smooth"
                                });
                            }
                        }
                    }
                }
                if (!el.closest("[data-spollers]")) {
                    const spollersClose = document.querySelectorAll("[data-spoller-close]");
                    if (spollersClose.length) spollersClose.forEach((spollerClose => {
                        const spollersBlock = spollerClose.closest("[data-spollers]");
                        const spollerCloseBlock = spollerClose.parentNode;
                        if (spollersBlock.classList.contains("_spoller-init")) {
                            const spollerSpeed = spollersBlock.dataset.spollersSpeed ? parseInt(spollersBlock.dataset.spollersSpeed) : 500;
                            spollerClose.classList.remove("_spoller-active");
                            _slideUp(spollerClose.nextElementSibling, spollerSpeed);
                            setTimeout((() => {
                                spollerCloseBlock.open = false;
                            }), spollerSpeed);
                        }
                    }));
                }
            }
            function hideSpollersBody(spollersBlock) {
                const spollerActiveBlock = spollersBlock.querySelector("details[open]");
                if (spollerActiveBlock && !spollersBlock.querySelectorAll("._slide").length) {
                    const spollerActiveTitle = spollerActiveBlock.querySelector("summary");
                    const spollerSpeed = spollersBlock.dataset.spollersSpeed ? parseInt(spollersBlock.dataset.spollersSpeed) : 500;
                    spollerActiveTitle.classList.remove("_spoller-active");
                    _slideUp(spollerActiveTitle.nextElementSibling, spollerSpeed);
                    setTimeout((() => {
                        spollerActiveBlock.open = false;
                    }), spollerSpeed);
                }
            }
        }
    }
    function tabs() {
        const tabs = document.querySelectorAll("[data-tabs]");
        let tabsActiveHash = [];
        if (tabs.length > 0) {
            const hash = functions_getHash();
            if (hash && hash.startsWith("tab-")) tabsActiveHash = hash.replace("tab-", "").split("-");
            tabs.forEach(((tabsBlock, index) => {
                tabsBlock.classList.add("_tab-init");
                tabsBlock.setAttribute("data-tabs-index", index);
                tabsBlock.addEventListener("click", setTabsAction);
                initTabs(tabsBlock);
            }));
            let mdQueriesArray = dataMediaQueries(tabs, "tabs");
            if (mdQueriesArray && mdQueriesArray.length) mdQueriesArray.forEach((mdQueriesItem => {
                mdQueriesItem.matchMedia.addEventListener("change", (function() {
                    setTitlePosition(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia);
                }));
                setTitlePosition(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia);
            }));
        }
        function setTitlePosition(tabsMediaArray, matchMedia) {
            tabsMediaArray.forEach((tabsMediaItem => {
                tabsMediaItem = tabsMediaItem.item;
                let tabsTitles = tabsMediaItem.querySelector("[data-tabs-titles]");
                let tabsTitleItems = tabsMediaItem.querySelectorAll("[data-tabs-title]");
                let tabsContent = tabsMediaItem.querySelector("[data-tabs-body]");
                let tabsContentItems = tabsMediaItem.querySelectorAll("[data-tabs-item]");
                tabsTitleItems = Array.from(tabsTitleItems).filter((item => item.closest("[data-tabs]") === tabsMediaItem));
                tabsContentItems = Array.from(tabsContentItems).filter((item => item.closest("[data-tabs]") === tabsMediaItem));
                tabsContentItems.forEach(((tabsContentItem, index) => {
                    if (matchMedia.matches) {
                        tabsContent.append(tabsTitleItems[index]);
                        tabsContent.append(tabsContentItem);
                        tabsMediaItem.classList.add("_tab-spoller");
                    } else {
                        tabsTitles.append(tabsTitleItems[index]);
                        tabsMediaItem.classList.remove("_tab-spoller");
                    }
                }));
            }));
        }
        function initTabs(tabsBlock) {
            let tabsTitles = tabsBlock.querySelectorAll("[data-tabs-titles]>*");
            let tabsContent = tabsBlock.querySelectorAll("[data-tabs-body]>*");
            const tabsBlockIndex = tabsBlock.dataset.tabsIndex;
            const tabsActiveHashBlock = tabsActiveHash[0] == tabsBlockIndex;
            if (tabsActiveHashBlock) {
                const tabsActiveTitle = tabsBlock.querySelector("[data-tabs-titles]>._tab-active");
                tabsActiveTitle ? tabsActiveTitle.classList.remove("_tab-active") : null;
            }
            if (tabsContent.length) tabsContent.forEach(((tabsContentItem, index) => {
                tabsTitles[index].setAttribute("data-tabs-title", "");
                tabsContentItem.setAttribute("data-tabs-item", "");
                if (tabsActiveHashBlock && index == tabsActiveHash[1]) tabsTitles[index].classList.add("_tab-active");
                tabsContentItem.hidden = !tabsTitles[index].classList.contains("_tab-active");
            }));
        }
        function setTabsStatus(tabsBlock) {
            let tabsTitles = tabsBlock.querySelectorAll("[data-tabs-title]");
            let tabsContent = tabsBlock.querySelectorAll("[data-tabs-item]");
            const tabsBlockIndex = tabsBlock.dataset.tabsIndex;
            function isTabsAnamate(tabsBlock) {
                if (tabsBlock.hasAttribute("data-tabs-animate")) return tabsBlock.dataset.tabsAnimate > 0 ? Number(tabsBlock.dataset.tabsAnimate) : 500;
            }
            const tabsBlockAnimate = isTabsAnamate(tabsBlock);
            if (tabsContent.length > 0) {
                const isHash = tabsBlock.hasAttribute("data-tabs-hash");
                tabsContent = Array.from(tabsContent).filter((item => item.closest("[data-tabs]") === tabsBlock));
                tabsTitles = Array.from(tabsTitles).filter((item => item.closest("[data-tabs]") === tabsBlock));
                tabsContent.forEach(((tabsContentItem, index) => {
                    if (tabsTitles[index].classList.contains("_tab-active")) {
                        if (tabsBlockAnimate) _slideDown(tabsContentItem, tabsBlockAnimate); else tabsContentItem.hidden = false;
                        if (isHash && !tabsContentItem.closest(".popup")) setHash(`tab-${tabsBlockIndex}-${index}`);
                    } else if (tabsBlockAnimate) _slideUp(tabsContentItem, tabsBlockAnimate); else tabsContentItem.hidden = true;
                }));
            }
        }
        function setTabsAction(e) {
            const el = e.target;
            if (el.closest("[data-tabs-title]")) {
                const tabTitle = el.closest("[data-tabs-title]");
                const tabsBlock = tabTitle.closest("[data-tabs]");
                if (!tabTitle.classList.contains("_tab-active") && !tabsBlock.querySelector("._slide")) {
                    let tabActiveTitle = tabsBlock.querySelectorAll("[data-tabs-title]._tab-active");
                    tabActiveTitle.length ? tabActiveTitle = Array.from(tabActiveTitle).filter((item => item.closest("[data-tabs]") === tabsBlock)) : null;
                    tabActiveTitle.length ? tabActiveTitle[0].classList.remove("_tab-active") : null;
                    tabTitle.classList.add("_tab-active");
                    setTabsStatus(tabsBlock);
                }
                e.preventDefault();
            }
        }
    }
    function menuInit() {
        if (document.querySelector(".icon-menu")) document.addEventListener("click", (function(e) {
            if (bodyLockStatus && e.target.closest(".icon-menu")) {
                bodyLockToggle();
                document.documentElement.classList.toggle("menu-open");
            }
        }));
    }
    function uniqArray(array) {
        return array.filter((function(item, index, self) {
            return self.indexOf(item) === index;
        }));
    }
    function dataMediaQueries(array, dataSetValue) {
        const media = Array.from(array).filter((function(item, index, self) {
            if (item.dataset[dataSetValue]) return item.dataset[dataSetValue].split(",")[0];
        }));
        if (media.length) {
            const breakpointsArray = [];
            media.forEach((item => {
                const params = item.dataset[dataSetValue];
                const breakpoint = {};
                const paramsArray = params.split(",");
                breakpoint.value = paramsArray[0];
                breakpoint.type = paramsArray[1] ? paramsArray[1].trim() : "max";
                breakpoint.item = item;
                breakpointsArray.push(breakpoint);
            }));
            let mdQueries = breakpointsArray.map((function(item) {
                return "(" + item.type + "-width: " + item.value + "px)," + item.value + "," + item.type;
            }));
            mdQueries = uniqArray(mdQueries);
            const mdQueriesArray = [];
            if (mdQueries.length) {
                mdQueries.forEach((breakpoint => {
                    const paramsArray = breakpoint.split(",");
                    const mediaBreakpoint = paramsArray[1];
                    const mediaType = paramsArray[2];
                    const matchMedia = window.matchMedia(paramsArray[0]);
                    const itemsArray = breakpointsArray.filter((function(item) {
                        if (item.value === mediaBreakpoint && item.type === mediaType) return true;
                    }));
                    mdQueriesArray.push({
                        itemsArray,
                        matchMedia
                    });
                }));
                return mdQueriesArray;
            }
        }
    }
    class Parallax {
        constructor(elements) {
            if (elements.length) this.elements = Array.from(elements).map((el => new Parallax.Each(el, this.options)));
        }
        destroyEvents() {
            this.elements.forEach((el => {
                el.destroyEvents();
            }));
        }
        setEvents() {
            this.elements.forEach((el => {
                el.setEvents();
            }));
        }
    }
    Parallax.Each = class {
        constructor(parent) {
            this.parent = parent;
            this.elements = this.parent.querySelectorAll("[data-prlx]");
            this.animation = this.animationFrame.bind(this);
            this.offset = 0;
            this.value = 0;
            this.smooth = parent.dataset.prlxSmooth ? Number(parent.dataset.prlxSmooth) : 15;
            this.setEvents();
        }
        setEvents() {
            this.animationID = window.requestAnimationFrame(this.animation);
        }
        destroyEvents() {
            window.cancelAnimationFrame(this.animationID);
        }
        animationFrame() {
            const topToWindow = this.parent.getBoundingClientRect().top;
            const heightParent = this.parent.offsetHeight;
            const heightWindow = window.innerHeight;
            const positionParent = {
                top: topToWindow - heightWindow,
                bottom: topToWindow + heightParent
            };
            const centerPoint = this.parent.dataset.prlxCenter ? this.parent.dataset.prlxCenter : "center";
            if (positionParent.top < 30 && positionParent.bottom > -30) switch (centerPoint) {
              case "top":
                this.offset = -1 * topToWindow;
                break;

              case "center":
                this.offset = heightWindow / 2 - (topToWindow + heightParent / 2);
                break;

              case "bottom":
                this.offset = heightWindow - (topToWindow + heightParent);
                break;
            }
            this.value += (this.offset - this.value) / this.smooth;
            this.animationID = window.requestAnimationFrame(this.animation);
            this.elements.forEach((el => {
                const parameters = {
                    axis: el.dataset.axis ? el.dataset.axis : "v",
                    direction: el.dataset.direction ? el.dataset.direction + "1" : "-1",
                    coefficient: el.dataset.coefficient ? Number(el.dataset.coefficient) : 5,
                    additionalProperties: el.dataset.properties ? el.dataset.properties : ""
                };
                this.parameters(el, parameters);
            }));
        }
        parameters(el, parameters) {
            if (parameters.axis == "v") el.style.transform = `translate3D(0, ${(parameters.direction * (this.value / parameters.coefficient)).toFixed(2)}px,0) ${parameters.additionalProperties}`; else if (parameters.axis == "h") el.style.transform = `translate3D(${(parameters.direction * (this.value / parameters.coefficient)).toFixed(2)}px,0,0) ${parameters.additionalProperties}`;
        }
    };
    if (document.querySelectorAll("[data-prlx-parent]")) modules_flsModules.parallax = new Parallax(document.querySelectorAll("[data-prlx-parent]"));
    let addWindowScrollEvent = false;
    setTimeout((() => {
        if (addWindowScrollEvent) {
            let windowScroll = new Event("windowScroll");
            window.addEventListener("scroll", (function(e) {
                document.dispatchEvent(windowScroll);
            }));
        }
    }), 0);
    gsap.registerPlugin(ScrollTrigger);
    gsap.from(".header__logo", {
        opacity: 0,
        x: -20,
        ease: "expo.inOut",
        duration: .5
    });
    gsap.from(".header nav ul li", {
        opacity: 0,
        x: -20,
        ease: "power3.inOut",
        duration: .5,
        stagger: .08
    });
    gsap.from(".header .button--radius", {
        opacity: 0,
        x: -20,
        ease: "expo.inOut",
        duration: .5,
        delay: .3
    });
    gsap.from(".header .bar", {
        opacity: 0,
        x: -20,
        ease: "expo.inOut",
        duration: .5,
        delay: .4
    });
    gsap.from(".header__buttons .button--main", {
        opacity: 0,
        x: -20,
        ease: "expo.inOut",
        duration: .5,
        delay: .6
    });
    if (document.querySelector(".hero__title")) gsap.from(".hero__title", {
        opacity: 0,
        delay: .6,
        y: 20,
        ease: "expo.inOut",
        duration: .5
    });
    if (document.querySelector(".hero__subheading")) gsap.from(".hero__subheading", {
        opacity: 0,
        delay: .6,
        y: 20,
        ease: "expo.inOut",
        duration: .5
    });
    if (document.querySelector(".hero__text-holder")) gsap.from(".hero__text-holder", {
        opacity: 0,
        delay: .6,
        y: 20,
        ease: "expo.inOut",
        duration: .5
    });
    if (document.querySelector(".hero__buttons")) gsap.from(".hero__buttons", {
        opacity: 0,
        delay: .8,
        y: 20,
        ease: "expo.inOut",
        duration: .5
    });
    if (document.querySelector(".rating-hero")) gsap.from(".rating-hero", {
        opacity: 0,
        delay: 1,
        x: -200,
        ease: "expo.inOut",
        duration: .5
    });
    if (document.querySelector(".hero__image-holder")) gsap.from(".hero__image-holder", {
        opacity: 0,
        delay: 1.2,
        x: 200,
        ease: "expo.inOut",
        duration: .5
    });
    if (document.querySelector(".about__subtitle")) gsap.from(".about__subtitle", {
        scrollTrigger: {
            trigger: ".about"
        },
        x: -100,
        opacity: 0,
        duration: .5,
        delay: .2
    });
    if (document.querySelector(".about__title")) gsap.from(".about__title", {
        scrollTrigger: {
            trigger: ".about"
        },
        x: -100,
        opacity: 0,
        duration: .5,
        delay: .4
    });
    if (document.querySelector(".about__quote")) gsap.from(".about__quote", {
        scrollTrigger: {
            trigger: ".about__left-col"
        },
        x: -100,
        opacity: 0,
        duration: .5,
        delay: .6
    });
    if (document.querySelector(".about__left-col")) gsap.from(".about__left-col", {
        scrollTrigger: {
            trigger: ".about__left-col"
        },
        x: -100,
        opacity: 0,
        duration: .5,
        delay: .6
    });
    if (document.querySelector(".about__right-col")) gsap.from(".about__right-col", {
        scrollTrigger: {
            trigger: ".about__right-col"
        },
        opacity: 0,
        duration: .5,
        delay: .8
    });
    if (document.querySelector(".services__subtitle")) gsap.from(".services__subtitle", {
        scrollTrigger: {
            trigger: ".services"
        },
        x: -100,
        opacity: 0,
        duration: .5,
        delay: .2
    });
    if (document.querySelector(".services__title")) gsap.from(".services__title", {
        scrollTrigger: {
            trigger: ".services"
        },
        x: -100,
        opacity: 0,
        duration: .5,
        delay: .4
    });
    if (document.querySelector(".services__quote")) gsap.from(".services__quote", {
        scrollTrigger: {
            trigger: ".header-services__right-col"
        },
        x: 100,
        opacity: 0,
        duration: .5,
        delay: .6
    });
    if (document.querySelector(".services__header")) {
        const tl = gsap.timeline({
            defaults: {
                duration: .5,
                ease: "power2.inOut",
                delay: .8
            },
            scrollTrigger: {
                trigger: ".services__header",
                start: "top center",
                toggleActions: "play none none none"
            }
        });
        document.querySelectorAll(".services__card").forEach(((card, index) => {
            let xValue = 0;
            let yValue = 0;
            if (index === 0) xValue = -100; else if (index === 2) xValue = 100; else if (index === 1) yValue = 50;
            tl.from(card, {
                xPercent: xValue,
                y: yValue,
                autoAlpha: 0
            }, index * .1);
        }));
    }
    if (document.querySelector(".services__list")) gsap.from(".services__list", {
        scrollTrigger: {
            trigger: ".services__card"
        },
        y: 150,
        opacity: 0,
        duration: .5,
        delay: .9
    });
    if (document.querySelector(".cta__left-col")) gsap.from(".cta__left-col", {
        scrollTrigger: {
            trigger: ".cta"
        },
        x: -150,
        opacity: 0,
        duration: .5,
        delay: .3
    });
    if (document.querySelector(".cta__right-col")) gsap.from(".cta__right-col", {
        scrollTrigger: {
            trigger: ".cta"
        },
        x: 150,
        opacity: 0,
        duration: .5,
        delay: .6
    });
    if (document.querySelector(".clients__header")) gsap.from(".clients__header", {
        scrollTrigger: {
            trigger: ".clients__header"
        },
        opacity: 0,
        duration: .5,
        delay: .2
    });
    if (document.querySelector(".cases__subtitle")) gsap.from(".cases__subtitle", {
        scrollTrigger: {
            trigger: ".cases__header"
        },
        x: -100,
        opacity: 0,
        duration: .5,
        delay: .2
    });
    if (document.querySelector(".cases__title")) gsap.from(".cases__title", {
        scrollTrigger: {
            trigger: ".cases__header"
        },
        x: -100,
        opacity: 0,
        duration: .5,
        delay: .4
    });
    if (document.querySelector(".cases__slider")) gsap.from(".cases__slider", {
        scrollTrigger: {
            trigger: ".cases__header"
        },
        opacity: 0,
        duration: .5,
        delay: .6
    });
    if (document.querySelector(".slider-cases__nav")) gsap.from(".slider-cases__nav", {
        scrollTrigger: {
            trigger: ".cases__header"
        },
        opacity: 0,
        duration: .5,
        delay: .6
    });
    if (document.querySelector(".text-image__left-col")) gsap.from(".text-image__left-col", {
        scrollTrigger: {
            trigger: ".text-image__body"
        },
        x: -150,
        opacity: 0,
        duration: .5,
        delay: .4
    });
    if (document.querySelector(".text-image__right-col")) gsap.from(".text-image__right-col", {
        scrollTrigger: {
            trigger: ".text-image__body"
        },
        x: 150,
        opacity: 0,
        duration: .5,
        delay: .4
    });
    if (document.querySelector(".team__left-col")) gsap.from(".team__left-col", {
        scrollTrigger: {
            trigger: ".team__container"
        },
        x: -100,
        opacity: 0,
        duration: .5,
        delay: .3
    });
    if (document.querySelector(".team__right-col")) gsap.from(".team__right-col", {
        scrollTrigger: {
            trigger: ".team__container"
        },
        opacity: 0,
        duration: .5,
        delay: .6
    });
    if (document.querySelector(".header-news-podcast__subtitle")) gsap.from(".header-news-podcast__subtitle", {
        scrollTrigger: {
            trigger: ".news-podcast__header"
        },
        x: -100,
        opacity: 0,
        duration: .5,
        delay: .2
    });
    if (document.querySelector(".header-news-podcast__title")) gsap.from(".header-news-podcast__title", {
        scrollTrigger: {
            trigger: ".news-podcast__header"
        },
        x: -100,
        opacity: 0,
        duration: .5,
        delay: .4
    });
    if (document.querySelector(".header-news-podcast__link")) gsap.from(".header-news-podcast__link", {
        scrollTrigger: {
            trigger: ".news-podcast__header"
        },
        x: 100,
        opacity: 0,
        duration: .5,
        delay: .6
    });
    if (document.querySelector(".news-podcast__content")) gsap.from(".news-podcast__content", {
        scrollTrigger: {
            trigger: ".news-podcast__content"
        },
        opacity: 0,
        duration: .5,
        delay: .8
    });
    jQuery(document).ready((function($) {
        initSwiper();
        initSubmenu();
        closeSubmenu();
        initSearch();
        initSocialWidget();
        initStableWindowWwidth();
        function initStableWindowWwidth() {
            var originalWidth = jQuery(".wrapper").width();
            jQuery("[data-fancybox]").click((function() {
                jQuery(".wrapper").width(originalWidth);
                jQuery(".header").width(originalWidth);
            }));
            jQuery("[data-fancybox-close]").click((function() {
                jQuery(".wrapper").width("auto");
                jQuery(".header").width("auto");
            }));
        }
        function initSwiper() {
            new Swiper(".slider-clients", {
                slidesPerView: "auto",
                spaceBetween: 16,
                loop: true,
                speed: 4e3,
                autoplay: {
                    delay: 300,
                    disableOnInteraction: false
                },
                freeMode: true,
                breakpoints: {
                    1280: {
                        spaceBetween: 24
                    }
                }
            });
            new Swiper(".slider-team", {
                slidesPerView: "auto",
                spaceBetween: 0,
                loop: false,
                scrollbar: {
                    el: ".swiper-scrollbar",
                    draggable: true
                },
                navigation: {
                    nextEl: ".swiper-button-next",
                    prevEl: ".swiper-button-prev"
                },
                breakpoints: {
                    1280: {
                        spaceBetween: 0
                    }
                }
            });
            new Swiper(".slider-benefits", {
                slidesPerView: "auto",
                spaceBetween: 32,
                loop: false,
                pagination: {
                    el: ".benefits-swiper-pagination"
                },
                navigation: {
                    nextEl: ".swiper-button-next",
                    prevEl: ".swiper-button-prev"
                },
                breakpoints: {
                    1280: {
                        spaceBetween: 48,
                        pagination: false,
                        scrollbar: {
                            el: ".swiper-scrollbar",
                            draggable: true
                        }
                    }
                }
            });
            new Swiper(".slider-cases", {
                slidesPerView: "auto",
                spaceBetween: 16,
                loop: false,
                speed: 500,
                autoHeight: true,
                navigation: {
                    nextEl: ".cases-button-next",
                    prevEl: ".cases-button-prev"
                },
                pagination: {
                    el: ".cases-swiper-pagination",
                    clickable: true
                },
                breakpoints: {
                    1280: {
                        spaceBetween: 48
                    }
                }
            });
            if ($(window).width() <= 1279) {
                new Swiper(".slider-news-podcast", {
                    slidesPerView: "auto",
                    spaceBetween: 16,
                    loop: false,
                    navigation: {
                        nextEl: ".news-podcast-button-next",
                        prevEl: ".news-podcast-button-prev"
                    },
                    pagination: {
                        el: ".news-podcast-swiper-pagination",
                        clickable: true
                    }
                });
            }
        }
        function initSubmenu() {
            $(".header .spollers__title").click((function() {
                if ($(window).width() >= 1280) if ($(".submenu").hasClass("show")) $(".submenu").removeClass("show"); else $(".submenu").addClass("show");
                $(this).toggleClass("active");
            }));
        }
        function closeSubmenu() {
            $(".submenu__close").click((function() {
                $(".submenu").removeClass("show");
                $(".spollers__title").removeClass("active");
                $("body").removeClass("lock");
            }));
        }
        function initSocialWidget() {
            $(".social-widget__button").click((function() {
                $(".social-widget").toggleClass("active");
            }));
        }
        function initSearch() {
            $(".search-btn").click((function() {
                $(".bar").toggleClass("active");
                $(".header__menu").toggleClass("hide");
                $(".header__buttons").toggleClass("active");
                if ($(".bar").hasClass("active")) {
                    $(".bar input").removeAttr("disabled");
                    $(this).removeClass("_icon-MagnifyingGlass-1");
                    $(this).addClass("_icon-X");
                } else {
                    $(".bar input").attr("disabled", "disabled");
                    $(this).addClass("_icon-MagnifyingGlass-1");
                    $(this).removeClass("_icon-X");
                }
                if ($(window).width() <= 1279) $(".header__logo").toggleClass("hide");
            }));
            $(".search-btn-mobile").click((function() {
                $(".bar-mobile").toggleClass("active");
                $(".menu__close").toggleClass("hide");
                $(".header__buttons").toggleClass("active");
                if ($(".bar-mobile").hasClass("active")) {
                    $(".bar-mobile input").removeAttr("disabled");
                    $(this).removeClass("_icon-MagnifyingGlass-1");
                    $(this).addClass("_icon-X");
                } else {
                    $(".bar-mobile input").attr("disabled", "disabled");
                    $(this).addClass("_icon-MagnifyingGlass-1");
                    $(this).removeClass("_icon-X");
                }
            }));
        }
        if ($('[data-fancybox=""]').length > 0) $('[data-fancybox=""]').fancybox({
            autoFocus: false,
            touch: false
        });
        $(".modal-thk__close").on("click", (function() {
            $.fancybox.close();
        }));
        $(".modal-contact__close").on("click", (function() {
            $.fancybox.close();
        }));
    }));
    document.addEventListener("DOMContentLoaded", (function() {
        document.querySelector(".clear-search-mobile").addEventListener("click", (function() {
            document.querySelector(".search-input-mobile").value = "";
        }));
        document.querySelectorAll(".clear-search").forEach((function(clearButton) {
            clearButton.addEventListener("click", (function() {
                var parent = this.closest(".bar__input-holder");
                parent.querySelector(".search-input").value = "";
            }));
        }));
        let messageBlock = document.querySelector(".message");
        let messageBtnClose = document.querySelector(".close");
        let fixedHeader = document.querySelector(".fixed-header");
        document.querySelector(".sidebar");
        let isMessageClosed = sessionStorage.getItem("messageClosed");
        if (!isMessageClosed) messageBlock.classList.add("show");
        const updateMaxHeight = () => {
            const headerHeight = fixedHeader.offsetHeight;
            document.querySelector(".submenu").style.maxHeight = `calc(100vh - ${headerHeight}px)`;
        };
        if (window.matchMedia("(min-width: 1280px)").matches) {
            const observer = new MutationObserver(updateMaxHeight);
            observer.observe(fixedHeader, {
                attributes: true,
                childList: true,
                subtree: true
            });
            updateMaxHeight();
        }
        var avatarsLinksImg = document.querySelectorAll(".avatars-links img");
        for (var i = 0; i < avatarsLinksImg.length; i++) avatarsLinksImg[i].style.zIndex = avatarsLinksImg.length - i;
        const iconMenu = document.querySelector(".menu__button");
        const menuBody = document.querySelector(".menu__body");
        const closeMenuButton = document.querySelector(".menu__close");
        const overlay = document.querySelector(".overlay");
        const contactBtnMobile = document.querySelector(".menu__footer-buttons .button--main");
        if (iconMenu) iconMenu.addEventListener("click", (function(e) {
            document.body.classList.toggle("_lock");
            iconMenu.classList.toggle("_active");
            menuBody.classList.toggle("_active");
        }));
        if (closeMenuButton) closeMenuButton.addEventListener("click", (function(e) {
            menuBody.classList.remove("_active");
            document.body.classList.remove("_lock");
            iconMenu.classList.remove("_active");
        }));
        if (overlay) overlay.addEventListener("click", (function(e) {
            menuBody.classList.remove("_active");
            document.body.classList.remove("_lock");
            iconMenu.classList.remove("_active");
        }));
        if (contactBtnMobile) contactBtnMobile.addEventListener("click", (function(e) {
            menuBody.classList.toggle("_active");
            document.body.classList.toggle("_lock");
            iconMenu.classList.toggle("_active");
        }));
        let rating = document.getElementsByName("rating");
        rating.forEach((e => {
            e.addEventListener("click", (function() {}));
        }));
        const copyLinkButton = document.getElementById("copyLinkButton");
        if (copyLinkButton) copyLinkButton.addEventListener("click", (event => {
            const urlToCopy = event.currentTarget.getAttribute("data-href");
            const sysInput = document.createElement("input");
            sysInput.value = urlToCopy;
            document.body.appendChild(sysInput);
            sysInput.select();
            document.execCommand("copy");
            document.body.removeChild(sysInput);
        }));
        function isElementInViewport(el) {
            const rect = el.getBoundingClientRect();
            return rect.top < window.innerHeight * .5 && rect.bottom > window.innerHeight * .5;
        }
        function setActiveLink() {
            const titles = document.querySelectorAll(".sidebar-content__right-col .sidebar-content__title");
            const links = document.querySelectorAll(".sidebar__links .sidebar__link");
            titles.forEach(((title, index) => {
                if (isElementInViewport(title)) {
                    links.forEach((link => link.classList.remove("_active")));
                    links[index].classList.add("_active");
                }
            }));
        }
        window.addEventListener("scroll", setActiveLink);
        messageBtnClose.addEventListener("click", (function(e) {
            e.preventDefault();
            messageBlock.classList.remove("show");
            sessionStorage.setItem("messageClosed", true);
            adjustTopPosition();
        }));
        function getHeaderHeight() {
            const header = document.querySelector(".fixed-header");
            return header ? header.offsetHeight : 0;
        }
        function adjustTopPosition() {
            const headerHeight = getHeaderHeight();
            const elementsToAdjust = document.querySelectorAll(".dynamic-top");
            elementsToAdjust.forEach((element => {
                element.style.top = `${headerHeight}px`;
            }));
        }
        document.addEventListener("DOMContentLoaded", adjustTopPosition);
        window.addEventListener("resize", adjustTopPosition);
        function scrollToAnchor(id) {
            if (!id || id === "#") return;
            const headerHeight = getHeaderHeight();
            const anchor = document.querySelector(id);
            if (anchor) {
                const anchorPosition = anchor.getBoundingClientRect().top + window.pageYOffset;
                const offsetPosition = anchorPosition - headerHeight;
                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        }
        document.querySelectorAll(".sidebar__link").forEach((link => {
            link.addEventListener("click", (function(e) {
                e.preventDefault();
                const href = this.getAttribute("href");
                if (href && href.startsWith("#") && href.length > 1) scrollToAnchor(href);
            }));
        }));
        let players = document.querySelectorAll(".audio-wrapper");
        function pauseAllOtherAudios(currentAudio) {
            players.forEach((function(player) {
                let audio = player.querySelector(".audioElement");
                if (audio !== currentAudio) {
                    audio.pause();
                    let playPauseButton = audio.closest(".audioPlayer").querySelector(".playPauseButton");
                    if (playPauseButton) {
                        playPauseButton.classList.add("_icon-Play");
                        playPauseButton.classList.remove("_icon-Pause");
                    }
                }
            }));
        }
        players.forEach((function(player) {
            let audioPlayer = player.querySelector(".audioPlayer");
            let durationDisplay = audioPlayer.querySelector(".durationDisplay");
            let audio = audioPlayer.querySelector(".audioElement");
            let playPauseButton = audioPlayer.querySelector(".playPauseButton");
            let progressBar = player.querySelector(".progress-bar");
            let muteButton = player.querySelector(".mute-button");
            let speedButton = player.querySelector(".speed-button");
            if (audio) {
                function formatTime(seconds) {
                    let hours = Math.floor(seconds / 3600);
                    let minutes = Math.floor(seconds % 3600 / 60);
                    let secs = Math.floor(seconds % 60);
                    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
                }
                function updateDurationDisplay() {
                    if (!audio.paused) {
                        if (durationDisplay) durationDisplay.textContent = formatTime(audio.currentTime);
                    } else if (durationDisplay) durationDisplay.textContent = formatTime(audio.duration);
                }
                if (audio.readyState > 0) updateDurationDisplay(); else audio.onloadedmetadata = updateDurationDisplay;
                audio.addEventListener("timeupdate", updateDurationDisplay);
                if (playPauseButton) playPauseButton.onclick = function() {
                    if (audio.paused) {
                        pauseAllOtherAudios(audio);
                        audio.play().catch((e => console.error("Play failed:", e)));
                        this.classList.remove("_icon-Play");
                        this.classList.add("_icon-Pause");
                    } else {
                        audio.pause();
                        this.classList.add("_icon-Play");
                        this.classList.remove("_icon-Pause");
                    }
                };
                if (progressBar) {
                    audio.addEventListener("timeupdate", (function() {
                        let progress = audio.currentTime / audio.duration * 100;
                        progressBar.value = progress;
                    }));
                    progressBar.addEventListener("click", (function(e) {
                        let rect = this.getBoundingClientRect();
                        let clickPosition = (e.pageX - window.scrollX - rect.left) / rect.width;
                        audio.currentTime = clickPosition * audio.duration;
                    }));
                }
                if (muteButton) muteButton.addEventListener("click", (function() {
                    audio.muted = !audio.muted;
                    this.textContent = audio.muted ? "Unmute" : "Mute";
                    if (audio.muted) {
                        this.classList.remove("_icon-SpeakerSimpleHigh");
                        this.classList.add("_icon-SpeakerSimpleX");
                    } else {
                        this.classList.add("_icon-SpeakerSimpleHigh");
                        this.classList.remove("_icon-SpeakerSimpleX");
                    }
                }));
                if (speedButton) speedButton.addEventListener("click", (function() {
                    let newPlaybackRate = audio.playbackRate == 1 ? 2 : 1;
                    audio.playbackRate = newPlaybackRate;
                    this.textContent = newPlaybackRate == 1 ? "Normal Speed" : "x2 Speed";
                    if (newPlaybackRate == 2) {
                        this.classList.remove("_icon-X1");
                        this.classList.add("_icon-X2");
                    } else {
                        this.classList.remove("_icon-X2");
                        this.classList.add("_icon-X1");
                    }
                }));
            } else console.error("Audio element is not found in the player:", player);
        }));
    }));
    window["FLS"] = true;
    isWebp();
    menuInit();
    spollers();
    tabs();
})();