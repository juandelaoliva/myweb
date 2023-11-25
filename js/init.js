!function(e) {
    "use strict";
    var t = {
        root: e(":root"),
        isTabClicked: false, // Added flag for tab click tracking
        init: function() {
            t.BgImg(),
            t.imgToSVG(),
            t.navigation__resize(),
            t.navigation__closer(),
            t.scrollToNextSection(),
            t.about__parallax(),
            t.tabs(),
            t.progress(),
            t.isotope(),
            t.testimonial(),
            t.loadBlogPosts(),
            t.contactForm(),
            t.movingPlaceholder(),
            t.cvHover(),
            t.magnific(),
            t.wow(),
            t.scrollToAnchor(),
            t.colorScheme(),
            t.mobileMenuOpener(),
            t.logoHambScroll(),
            t.darkLightSwitch()
        },
        mobileMenuOpener: function() {
            var hamburger = e(".thm_fn_mobilemenu_wrap .hamburger"),
                mobileMenu = e(".thm_fn_mobilemenu_wrap .mobilemenu");
        
            hamburger.on("click", function() {
                if (hamburger.hasClass("is-active")) {
                    hamburger.removeClass("is-active");
                    mobileMenu.removeClass("opened");
                    mobileMenu.slideUp(500);
                } else {
                    hamburger.addClass("is-active");
                    mobileMenu.addClass("opened");
                    mobileMenu.slideDown(500);
                }
                return false;
            });
        
            mobileMenu.find('.anchor_nav a').on('click', function() {
                hamburger.click(); // Simulate a click on the hamburger to close the menu
            });
        
            e(document).on('click', function(event) {
                if (!e(event.target).closest('.thm_fn_mobilemenu_wrap').length) {
                    if (mobileMenu.is(':visible')) {
                        hamburger.click(); // Simulate a click on the hamburger to close the menu
                    }
                }
            });
        },
        darkLightSwitch: function() {
            var lightModeBtn = e(".lightmode"),
                darkModeBtn = e(".darkmode");
        
            lightModeBtn.on("click", function() {
                e("body").removeClass("dark-mode");
                // Update button states
                darkModeBtn.removeClass("active");
                lightModeBtn.addClass("active");
            });
        
            darkModeBtn.on("click", function() {
                e("body").addClass("dark-mode");
                // Update button states
                lightModeBtn.removeClass("active");
                darkModeBtn.addClass("active");
            });
        },
        logoHambScroll: function() {
            var prevScrollpos = window.pageYOffset;
            var logoHambElement = document.getElementById("logo_hamb");
            var mobileMenu = e(".mobilemenu");
        
            window.onscroll = function() {
                if (t.isTabClicked) return; // Check if tab click is in progress
        
                var currentScrollPos = window.pageYOffset;
        
                // Check for negative scroll or scroll at top of the page
                if (currentScrollPos <= 0) {
                    return;
                }

                // Prevent if the menu is open.
                if (mobileMenu.hasClass('opened')) {
                    return;
                }
        
                if (prevScrollpos > currentScrollPos) {
                    logoHambElement.style.top = "0";
                } else {
                    logoHambElement.style.top = "-50px";
                }
                prevScrollpos = currentScrollPos;
            };
        
            logoHambElement.onclick = function() {
                logoHambElement.style.top = "0";
            };
        },                  
        colorScheme: function() {
            var n = e(".thm_fn_color_scheme")
              , o = n.find(".item")
              , a = o.length
              , s = 1
              , i = Math.ceil(a / 3)
              , r = n.find("[data-color]")
              , c = n.find(".opener")
              , l = "--text-color-for-main-bg";
            t.root.css("--main-color").replace(/\s+/g, "");
            r.each(function() {
                e(this).css({
                    backgroundColor: e(this).attr("data-color")
                })
            }),
            n.find(".current").text(s),
            n.find(".separator").text("/"),
            n.find(".total").text(i),
            o.eq(2).nextAll().addClass("disabled"),
            n.find(".my__nav a").off().on("click", function() {
                var t = e(this);
                s = t.hasClass("next") ? s === i ? 1 : s + 1 : 1 === s ? i : s - 1,
                o.addClass("disabled");
                for (var a = 0; a < 3; a++)
                    o.eq(3 * (s - 1) + a).removeClass("disabled");
                return n.find(".current").text(s),
                !1
            }),
            r.on("click", function() {
                var n = e(this)
                  , o = n.attr("data-color").replace(/\s+/g, "");
                return n.hasClass("active") || "" !== o && "#" !== o && (r.removeClass("active"),
                n.addClass("active"),
                t.root.css("--main-color", o),
                o,
                t.setTextColor(o, l)),
                !1
            });
            c.off().on("click", function(e) {
                return e.preventDefault(),
                e.stopPropagation(),
                n.addClass("opened"),
                !1
            }).on("mouseenter", function() {
                return !1
            }).on("mouseleave", function() {
                return !1
            }),
            n.find(".closer").off().on("click", function(e) {
                return e.preventDefault(),
                e.stopPropagation(),
                n.removeClass("opened"),
                !1
            }),
            n.find(".color_box").on("click", function(e) {
                e.preventDefault(),
                e.stopPropagation()
            }),
            e("body").on("click", function() {
                n.removeClass("opened")
            })
        },
        setTextColor: function(e, n) {
            t.returnLuma(e) < 60 ? t.root.css(n, "#fff") : t.root.css(n, "#000")
        },
        returnLuma: function(e) {
            var t = e.substring(1)
              , n = parseInt(t, 16);
            return .2126 * (n >> 16 & 255) + .7152 * (n >> 8 & 255) + .0722 * (n >> 0 & 255)
        },
        scrollToAnchor: function() {
            e(".main_button a").on("click", function() {
                var t = e(this);
                e(t.attr("href")).length && e("html, body").animate({
                    scrollTop: e(t.attr("href")).offset().top
                }, 1e3)
            })
        },
        wow: function() {
            new WOW({
                callback: function(t) {
                    e(t).addClass("done")
                }
            }).init()
        },
        magnific: function() {
            e(".gallery_zoom").each(function() {
                var n = e(this)
                  , o = t.magnificItems(n);
                n.magnificPopup({
                    gallery: {
                        enabled: !0
                    },
                    removalDelay: 300,
                    mainClass: "mfp-fade",
                    items: o
                })
            })
        },
        magnificItems: function(t) {
            var n = [];
            return t.find(".zoom").each(function() {
                var t = e(this)
                  , o = t.attr("href")
                  , a = t.attr("data-title");
                a && void 0 !== a || (a = "");
                var s = {
                    src: o,
                    type: "image",
                    title: a
                };
                n.push(s)
            }),
            n = n.reduce(function(e, t) {
                return 0 === e.filter(e=>e.src === t.src && e.title === t.title).length && e.push(t),
                e
            }, [])
        },
        cvHover: function() {
            e(".fn_cs_cv_btn a").on("mouseenter", function() {
                e(this).closest(".fn_cs_cv_btn").addClass("hovered")
            }).on("mouseleave", function() {
                e(this).closest(".fn_cs_cv_btn").removeClass("hovered")
            })
        },
        movingPlaceholder: function() {
            e(".thm_fn_contact .input_wrapper").each(function() {
                var t = e(this)
                  , n = t.find("input, textarea");
                "" === n.val() && t.removeClass("active"),
                n.on("focus", function() {
                    t.addClass("active")
                }).on("blur", function() {
                    "" === n.val() && t.removeClass("active")
                })
            })
        },
        contactForm: function() {
            e("#send_message").on("click", function() {
                var t = e(".thm_fn_contact .contact_form")
                  , n = e("#name").val()
                  , o = e("#email").val()
                  , a = e("#message").val()
                  , s = e("#phone").val()
                  , i = t.find(".success")
                  , r = i.data("success")
                  , c = t.data("email");
                return i.empty(),
                "" === n || "" === o || "" === a || "" === c || "" === s ? e(".empty_notice").slideDown(500).delay(2e3).slideUp(500) : e.post("modal/contact.php", {
                    ajax_name: n,
                    ajax_email: o,
                    ajax_emailto: c,
                    ajax_message: a,
                    ajax_phone: s
                }, function(e) {
                    i.append(e),
                    i.find(".contact_error").length ? i.slideDown(500).delay(2e3).slideUp(500) : (i.append("<span class='contact_success'>" + r + "</span>"),
                    i.slideDown(500).delay(4e3).slideUp(500)),
                    "" === e && t[0].reset()
                }),
                !1
            })
        },
        loadBlogPosts: function() {
            e(".blog_list .load_more a").on("mousedown", function() {
                var t = e(this)
                  , n = t.find(".text");
                if (t.hasClass("done"))
                    return t.addClass("hold"),
                    n.text(t.attr("data-no")),
                    !1
            }).on("mouseup", function() {
                var t = e(this)
                  , n = t.find(".text");
                if (t.hasClass("done"))
                    return t.removeClass("hold"),
                    n.text(t.attr("data-done")),
                    !1
            }).on("mouseleave", function() {
                var t = e(this)
                  , n = t.find(".text");
                if (t.hasClass("done"))
                    return t.removeClass("hold"),
                    n.text(t.attr("data-done")),
                    !1
            }),
            e(".blog_list .load_more a").on("click", function() {
                var n = e(this)
                  , o = n.find(".text");
                if (n.hasClass("loading") || n.hasClass("done"))
                    return !1;
                n.addClass("loading");
                for (var a, s = n.attr("data-loading").split(""), i = "", r = s.length, c = 2e3 / r, l = 0; l < r; l++)
                    i += s[l],
                    t.search_placeholder(o, i, l, c);
                return a = setInterval(function() {
                    i = "";
                    for (var e = 0; e < r; e++)
                        i += s[e],
                        t.search_placeholder(o, i, e, c)
                }, c * r),
                setTimeout(function() {
                    clearInterval(a),
                    n.removeClass("loading")
                }, c * r * 1.9),
                setTimeout(function() {
                    n.closest(".blog_list").find(".be_animated").each(function(t, n) {
                        setTimeout(function() {
                            e(n).addClass("fadeInTop done")
                        }, 100 * t)
                    }),
                    n.addClass("done"),
                    o.text(n.attr("data-done"))
                }, c * r * 2),
                !1
            })
        },
        search_placeholder: function(e, t, n, o) {
            setTimeout(function() {
                e.text(t)
            }, n * o)
        },
        testimonial: function() {
            e(".fn_cs_testimonials .owl-carousel").each(function() {
                var t = e(this)
                  , n = t.closest(".fn_cs_testimonials");
                t.owlCarousel({
                    autoplay: !0,
                    autoplayTimeout: 7e3,
                    smartSpeed: 1e3,
                    loop: !0,
                    margin: 10,
                    nav: !1,
                    items: 1,
                    dots: !1
                }),
                t.trigger("refresh.owl.carousel"),
                t.on("changed.owl.carousel", function() {
                    t.trigger("stop.owl.autoplay"),
                    t.trigger("play.owl.autoplay")
                });
                var o = n.find(".my__nav .prev")
                  , a = n.find(".my__nav .next");
                o.off().on("click", function() {
                    return t.trigger("prev.owl"),
                    !1
                }),
                a.off().on("click", function() {
                    return t.trigger("next.owl"),
                    !1
                })
            }),
            t.imgToSVG(),
            t.BgImg()
        },
        isotope: function() {
            var t = e(".fn__masonry");
            e().isotope && t.each(function() {
                e(this).isotope({
                    itemSelector: ".masonry_in",
                    masonry: {}
                })
            })
        },
        progress: function() {
            e(".fn_cs_progress_bar").each(function() {
                var n = e(this);
                n.waypoint({
                    handler: function() {
                        t.progressF(n)
                    },
                    offset: "90%"
                })
            })
        },
        progressF: function(t) {
            t.find(".progress_item").each(function(t) {
                var n = e(this)
                  , o = parseInt(n.data("value"))
                  , a = n.find(".progress_percent");
                n.find(".progress_bg").css({
                    width: o + "%"
                }),
                setTimeout(function() {
                    n.addClass("open"),
                    a.html(o + "%").css({
                        right: 100 - o + "%"
                    })
                }, 500 * t)
            })
        },
        recallProgress: function(e) {
            e.find(".progress_bg").css({
                width: "0%"
            }),
            e.find(".progress_percent").html("").css({
                right: "100%"
            }),
            e.find(".progress_item").removeClass("open"),
            t.progress()
        },
        tabs: function() {
            e(".fn_cs_tabs .tab_header a").off().on("click", function() {
                var n = e(this),
                    o = n.parent(),
                    a = n.closest(".fn_cs_tabs"),
                    tabContent = e(n.attr("href"));
        
                if (!o.hasClass("active")) {
                    o.siblings().removeClass("active");
                    a.find(".tab_content").children().removeClass("active");
                    o.addClass("active");
                    tabContent.addClass("active");
                    t.recallProgress(a);
        
                    t.isTabClicked = true; // Set the flag
        
                    e('html, body').animate({
                        scrollTop: tabContent.offset().top - 60
                    }, 'slow');
        
                    // Extend the duration for which isTabClicked remains true
                    setTimeout(function() {
                        t.isTabClicked = false; // Reset the flag
                    }, 2000); // Adjust this duration as needed
                }
                return false;
            })
        },
                      
        about__parallax: function() {
            e("#scene").parallax()
        },
        scrollToNextSection: function() {
            var t = 0
              , n = null;
            e(".fn__next_section button").on("click", function() {
                var o = e(this).closest(".fn__next_section")
                  , a = 0;
                return 1 === ++t ? (n = setTimeout(function() {
                    a = o.next().offset().top,
                    e("html, body").animate({
                        scrollTop: a - 40
                    }, 700),
                    t = 0
                }, 300),
                !1) : (clearTimeout(n),
                o.addClass("reverse"),
                setTimeout(function() {
                    o.removeClass("reverse")
                }, 1e3),
                setTimeout(function() {
                    a = o.prev().offset().top,
                    e("html, body").animate({
                        scrollTop: a - 40
                    }, 700)
                }, 300),
                t = 0,
                !1)
            }).on("dblclick", function(e) {
                e.preventDefault()
            })
        },
        navigation__closer: function() {
            var n = e(".thm_fn_wrapper_all");
            e(".thm_fn_sidebar .nav__button").off().on("click", function() {
                return n.hasClass("sidebar-closed") ? n.removeClass("sidebar-closed") : n.addClass("sidebar-closed"),
                setTimeout(function() {
                    t.isotope(),
                    t.testimonial()
                }, 500),
                !1
            })
        },
        navigation__resize: function() {
            var n = !1
              , o = e(".thm_fn_sidebar")
              , a = e(".thm_fn_content")
              , s = o.find(".nav_line")
              , i = o.data("max")
              , r = o.data("min")
              , c = e("body")
              , l = o.find(".width_indicator");
            s.on("mousedown", function(e) {
                n = !0,
                e.clientX,
                c.addClass("sidebar-resize")
            }),
            e(document).on("mousemove", function(e) {
                var t = e.clientX;
                !n || t > i || t < r || (o.css("width", t),
                a.css("padding-left", t),
                l.html(t + "px"))
            }).on("mouseup", function() {
                n = !1,
                c.removeClass("sidebar-resize"),
                t.testimonial(),
                t.isotope()
            })
        },
        imgToSVG: function() {
            e("img.fn__svg").each(function() {
                var t = e(this)
                  , n = t.attr("class")
                  , o = t.attr("src");
                e.get(o, function(o) {
                    var a = e(o).find("svg");
                    void 0 !== n && (a = a.attr("class", n + " replaced-svg")),
                    t.replaceWith(a)
                }, "xml")
            })
        },
        BgImg: function() {
            e("*[data-bg-img]").each(function() {
                var t = e(this)
                  , n = t.attr("data-bg-img");
                void 0 !== n && t.css({
                    backgroundImage: "url(" + n + ")"
                })
            }),
            e("*[data-fn-bg-img]").each(function() {
                var t = e(this)
                  , n = t.attr("data-fn-bg-img");
                void 0 !== n && t.css({
                    backgroundImage: "url(" + n + ")"
                })
            })
        }
    };
    e(document).ready(function() {
        t.init()
    }),
    e(window).on("resize", function() {
        t.isotope()
    }),
    e(window).on("load", function() {
        setTimeout(function() {
            t.isotope()
        }, 10)
    }),
    e(window).on("scroll", function() {})
}(jQuery),
jQuery(".anchor_nav").onePageNav();
