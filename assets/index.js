function loadOnStartup() {
    initScrollSpy();
    relativeLatestPostDate();
}

function initScrollSpy() {
    var navBar = $('#offering-navbar');
    var navBarFixed = $('#offering-navbar-fixed');
    var lastId;
    var topMenuHeight = navBar.outerHeight();
    // All list items
    var menuItems = navBarFixed.find("a");
    // Anchors corresponding to menu items
    var scrollItems = menuItems.map(function () {
        return $($(this).attr("href"));
    });
    scrollItems.push($("#clients"));

    $(document).scroll(function () {
        if (navBar.offset().top <= $(this).scrollTop()) {
            navBarFixed.removeClass('hide');
        } else {
            navBarFixed.addClass('hide');
        }

        // Get container scroll position
        var fromTop = $(this).scrollTop() + topMenuHeight;

        // Get id of current scroll item
        var cur = scrollItems.map(function () {
            if ($(this).offset().top < fromTop) {
                return this;
            }
            return null;
        });
        // Get the id of the current element
        cur = cur[cur.length - 1];
        var id = cur && cur.length ? cur[0].id : "";

        if (lastId !== id) {
            lastId = id;
            // Set/remove active class
            menuItems
                    .parent().removeClass("active")
                    .end().filter("[href=#" + id + "]").parent().addClass("active");
        }
    });

    $('.navbar li a').click(function (event) {
        event.preventDefault();

        var anchor = $($(this).attr('href'));
        $('html, body').stop().animate({
            scrollTop: anchor.offset().top - 30
        }, 1000);
    });
}

function relativeLatestPostDate() {
    $('#latest-posts').find('span').each(function() {
        $(this).text(moment($(this).text()).fromNow());
    });
}