function loadOnStartup() {
    initScrollSpy();
    loadLatestTweets();
}

function initScrollSpy() {
    var navBar = $('#offering-navbar');
    var lastId;
    var topMenuHeight = navBar.outerHeight() + 15;
    // All list items
    var menuItems = navBar.find("a");
    // Anchors corresponding to menu items
    var scrollItems = menuItems.map(function () {
        return $($(this).attr("href"));
    });

    $(document).scroll(function () {
        // If has not activated (has no attribute "data-top"
        if (!navBar.attr('data-top')) {
            // If already fixed, then do nothing
            if (navBar.hasClass('navbar-fixed-top')) return;
            // Remember top position
            var offset = navBar.offset();
            navBar.attr('data-top', offset.top);
        }

        if (navBar.attr('data-top') - navBar.outerHeight() <= $(this).scrollTop()) {
            navBar.addClass('navbar-fixed-top');
        } else {
            navBar.removeClass('navbar-fixed-top');
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

function loadLatestTweets() {
    function parseDate(str) {
        var v=str.split(' ');
        return new Date(Date.parse(v[1]+" "+v[2]+", "+v[5]+" "+v[3]+" UTC"));
    }

    function parseURL(str) {
        return str.replace(/[A-Za-z]+:\/\/[A-Za-z0-9-_]+\.[A-Za-z0-9-_:%&~\?\/.=]+/g, function(url) {
            return url.link(url);
        });
    }

    function parseUsername(str) {
        return str.replace(/[@]+[A-Za-z0-9-_]+/g, function(u) {
            var username = u.replace("@","")
            return u.link("http://twitter.com/"+username);
        });
    }

    function parseHashtag(str) {
        return str.replace(/[#]+[A-Za-z0-9-_]+/g, function(t) {
            var tag = t.replace("#","%23")
            return t.link("http://search.twitter.com/search?q="+tag);
        });
    }

    var numTweets = 5;
    var _url = 'https://api.twitter.com/1/statuses/user_timeline/axelfontaine.json?callback=?&count='+numTweets+'&include_rts=1';
    $.getJSON(_url,function(data){
    for(var i = 0; i< data.length; i++){
            var text = data[i].text;
            var created = parseDate(data[i].created_at);
            var createdDate = moment(created).fromNow();
            var tweet = parseHashtag(parseUsername(parseURL(text)));
            var tweetLink = '<span class="tweet-link"><a href="https://twitter.com/#!/axelfontaine/status/'+data[i].id_str+'">'+createdDate+'</a></span>';
            $("#tweets").append('<div class="row"><div class="span1"></div><div class="tweet span4">'+tweet+'<br/>' + tweetLink + '</div></div>');
        }
    });
}
