function loadOnStartup() {
    initScrollSpy();
    initUpcoming();
    relativeLatestPostDate();
    initTalksMap();
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
    $('#latest-posts').find('span').each(function () {
        $(this).text(moment($(this).text()).fromNow());
    });
}

//Coordinate lookup: http://www.mapcoordinates.net/en
var speakingEvents = [
    ['Microservices Meetup Munich', 'München', 'Germany', 48.1366069, 11.5770851,
        [
            ['2016-06-15', 'Immutable Infrastructure: Rise of the Machine Images', 'http://www.meetup.com/Microservices-Meetup-Munich/events/230468731/', false]
        ]
    ],
    ['DevOps Lisbon', 'Lisbon', 'Portugal', 38.7223263, -9.1392714,
        [
            ['2016-05-19', 'Immutable Infrastructure: Rise of the Machine Images', 'http://www.meetup.com/DevOps-Lisbon/events/230513782/', false]
        ]
    ],
    ['Bash', 'Belfast', 'UK', 54.597285, -5.93012,
        [
            ['2016-04-25', 'Here comes the Cloud! But is your architecture ready for it?', 'http://www.meetup.com/devbash/events/229123932/', false]
        ]
    ],
    ['Instil', 'Belfast', 'UK', 54.597285, -5.93012,
        [
            ['2016-04-25', 'Architecting for Continuous Delivery and Zero Downtime (2 days)', '/training/continuousdelivery.html', true]
        ]
    ],
    ['JAX 2016', 'Mainz', 'Germany', 49.9928617, 8.2472526,
        [
            ['2016-04-20', 'Immutable Infrastructure auf AWS: Hasta la vista Haustiere, hier kommt das Vieh!', 'https://jax.de/session/immutable-infrastructure-auf-aws-hasta-la-vista-haustiere-hier-kommt-das-vieh/', false]
        ]
    ],
    ['comSysto', 'München', 'Germany', 48.1366069, 11.5770851,
        [
            ['2016-04-11', 'Architecting for Continuous Delivery and Zero Downtime (2 days)', '/training/continuousdelivery.html', true]
        ]
    ],
    ['JUG CH', 'Bern', 'CH', 46.9479739, 7.4474468,
        [
            ['2016-04-05', 'Immutable Infrastructure: Rise of the Machine Images', 'http://jug.ch/html/events/2016/immutable_infrastructure.html', false]
        ]
    ],
    ['QCon London 2016', 'London', 'UK', 51.508515, -0.1254872,
        [
            ['2016-03-07', 'Immutable Infrastructure: Rise of the Machine Images', 'http://qconlondon.com/speakers/axel-fontaine', false]
        ]
    ],
    ['GOTO Berlin', 'Berlin', 'Germany', 52.519171, 13.4060912,
        [
            ['2015-12-03', 'Immutable Infrastructure: Kiss your Pets Goodbye, Here Comes the Cattle!', 'http://gotocon.com/berlin-2015/presentation/Immutable%20Infrastructure:%20Kiss%20your%20Pets%20Goodbye,%20Here%20Comes%20the%20Cattle', false]
        ]
    ],
    ['DevOpsCon 2015', 'München', 'Germany', 48.1366069, 11.5770851,
        [
            ['2015-11-24', 'Immutable Infrastructure auf AWS: Hasta la vista Haustiere, hier kommt das Vieh!', 'http://devopsconference.de/session/immutable-infrastructure-auf-aws-hasta-la-vista-haustiere-hier-kommt-das-vieh/', false]
        ]
    ],
    ['Worldpay London', 'London', 'UK', 51.508515, -0.1254872,
        [
            ['2015-11-18', 'Immutable Infrastructure: Kiss your Pets Goodbye, Here Comes the Cattle!', 'http://www.meetup.com/Worldpay-Developers-engineers-and-testers/events/225943635/', false]
        ]
    ],
    ['AWS User Group München', 'München', 'Germany', 48.1366069, 11.5770851,
        [
            ['2015-11-09', 'Immutable Infrastructure on AWS: kiss you pets goodbye, here comes the cattle!', 'http://www.meetup.com/AWS-Munich/events/222476355/', false]
        ]
    ],
    ['W-JAX 2015', 'München', 'Germany', 48.1366069, 11.5770851,
        [
            ['2015-11-04', 'Auf Wolke sieben: Architektur und Deployment von Microservices für die Cloud', 'https://jax.de/wjax2015/sessions/auf-wolke-sieben-architektur-und-deployment-von-microservices-fuer-die-cloud', false]
        ]
    ],
    ['SkillsMatter', 'London', 'UK', 51.508515, -0.1254872,
        [
            ['2015-09-24', 'Architecting for Continuous Delivery and Zero Downtime (2 days)', '/training/continuousdelivery.html', true]
        ]
    ],
    ['comSysto', 'München', 'Germany', 48.1366069, 11.5770851,
        [
            ['2015-09-17', 'Architecting for Continuous Delivery and Zero Downtime (2 days)', '/training/continuousdelivery.html', true]
        ]
    ],
    ['JavaZone 2015', 'Oslo', 'Norway', 59.913869, 10.752245,
        [
            ['2015-09-10', 'Up in the sky: Architecture and Deployment of Microservices for the Cloud', 'http://2015.javazone.no/details.html?talk=9d8b67334c65cd7cd21dee8fe8de3f9128f70a923107ee365427747e341a9c54', false]
        ]
    ],
    ['JUG Augsburg', 'Augsburg', 'Germany', 48.3714407, 10.8982552,
        [
            ['2015-06-25', 'Flyway - Database Migration made easy', 'http://www.jug-augsburg.de/', false]
        ]
    ],
    ['Devoxx UK 2015', 'London', 'UK', 51.508515, -0.1254872,
        [
            ['2015-06-18', 'Flyway - Database Migration made easy', 'http://cfp.devoxx.co.uk/2015/talk/UEO-0132/Flyway_-_Database_Migration_made_easy', false]
        ]
    ],
    ['GOTO Nights Berlin', 'Berlin', 'Germany', 52.519171, 13.4060912,
        [
            ['2015-06-03', 'Immutable Infrastructure: the new App Deployment', 'https://secure.trifork.com/berlin-2015/freeevent/index.jsp?eventOID=6973', false]
        ]
    ],
    ['DevOpsCon 2015', 'Berlin', 'Germany', 52.519171, 13.4060912,
        [
            ['2015-06-03', 'Flyway - Database Migration made easy', 'http://devopsconference.de/2015/sessions/flyway-database-migration-made-easy', false]
        ]
    ],
    ['DevOps Norway', 'Oslo', 'Norway', 59.913869, 10.752245,
        [
            ['2015-05-27', 'Immutable Infrastructure: the new App Deployment', 'http://www.meetup.com/DevOps-Norway/events/222018498/', false]
        ]
    ],
    ['ProgramUtvikling', 'Oslo', 'Norway', 59.913869, 10.752245,
        [
            ['2015-05-27', 'Architecting for Continuous Delivery and Zero Downtime (2 days)', '/training/continuousdelivery.html', true]
        ]
    ],
    ['Geecon 2015', 'Krakow', 'Poland', 50.0646501, 19.9449799,
        [
            ['2015-05-14', 'Immutable Infrastructure: the new App Deployment', 'http://2015.geecon.org/speakers/info.html?id=33', false]
        ]
    ],
    ['Bucharest JUG', 'Bucharest', 'Romania', 44.4304489, 26.0979342,
        [
            ['2015-05-12', 'Immutable Infrastructure: the new App Deployment', 'http://www.meetup.com/Bucharest-Java-User-Group/events/221990777/', false]
        ]
    ],
    ['comSysto', 'München', 'Germany', 48.1366069, 11.5770851,
        [
            ['2015-04-23', 'Architecting for Continuous Delivery and Zero Downtime (2 days)', '/training/continuousdelivery.html', true]
        ]
    ],
    ['JAX 2015', 'Mainz', 'Germany', 49.9928617, 8.2472526,
        [
            ['2015-04-21', 'Auf Wolke sieben: Architektur und Deployment von Microservices für die Cloud', 'https://jax.de/2015/sessions/auf-wolke-sieben-architektur-und-deployment-von-microservices-fuer-die-cloud', false]
        ]
    ],
    ['Bash', 'Belfast', 'UK', 54.597285, -5.93012,
        [
            ['2015-03-30', 'Immutable Infrastructure: the new App Deployment', 'http://www.meetup.com/devbash/events/220774267/', false]
        ]
    ],
    ['Instil', 'Belfast', 'UK', 54.597285, -5.93012,
        [
            ['2015-03-30', 'Architecting for Continuous Delivery and Zero Downtime (2 days)', 'http://instil.co/courses/architecting-for-continuous-delivery-and-zero-downtime/', true]
        ]
    ],
    ['Javaland 2015', 'Brühl', 'Germany', 50.8267554, 6.8987865,
        [
            ['2015-03-25', 'Immutable Infrastructure: das neue App Deployment', 'http://www.javaland.eu/', false]
        ]
    ],
    ['DevNexus 2015', 'Atlanta', 'USA', 33.7489954, -84.3879824,
        [
            ['2015-03-12', 'Flyway - Database Migration made easy', 'http://devnexus.com/s/speakers#Axel_Fontaine', false],
            ['2015-03-11', 'Immutable Infrastructure: the new App Deployment', 'http://devnexus.com/s/speakers#Axel_Fontaine', false]
        ]
    ],
    ['DevOps Stockholm', 'Stockholm', 'Sweden', 59.32893, 18.06491,
        [
            ['2015-02-05', 'Continuous Delivery and Zero Downtime', 'http://www.meetup.com/DevOps-Stockholm/events/220067315/#event-comments-section', false],
            ['2015-02-05', 'Immutable Infrastructure generation: the new App Deployment', 'http://www.meetup.com/DevOps-Stockholm/events/220067315/#event-comments-section', false]
        ]
    ],
    ['Jfokus 2015', 'Stockholm', 'Sweden', 59.32893, 18.06491,
        [
            ['2015-02-05', 'Architecting for Continuous Delivery and Zero Downtime (2 days)', 'http://www.jfokus.se/jfokus/training.jsp', true],
            ['2015-02-04', 'Immutable Infrastructure generation: the new App Deployment', 'http://www.jfokus.se/jfokus/talks.jsp#ImmutableInfrastruct', false]
        ]
    ],
    ['comSysto', 'München', 'Germany', 48.1366069, 11.5770851,
        [
            ['2015-01-26', 'Architecting for Continuous Delivery and Zero Downtime (2 days)', 'https://www.eventbrite.de/e/architecting-for-continuous-delivery-and-zero-downtime-tickets-14444268195', true]
        ]
    ],
    ['Flavia', 'Kassel', 'Germany', 51.3127114, 9.4797461,
        [
            ['2014-11-17', 'Continuous Delivery and Zero Downtime (2 days, private)', 'http://www.flavia-it.de/', true]
        ]
    ],
    ['Devoxx 2014', 'Antwerpen', 'Belgium', 51.2192159, 4.4028818,
        [
            ['2014-11-11', 'Boxfuse: Immutable Server Generation', 'http://www.devoxx.be', false]
        ]
    ],
    ['WJAX 2014', 'München', 'Germany', 48.1366069, 11.5770851,
        [
            ['2014-11-05', 'Inspiration statt Transpiration: Java App Deployment für das 21. Jahrhundert', 'http://jax.de/wjax2014/sessions/inspiration-statt-transpiration-java-app-deployment-fuer-das-21-jahrhundert', false]
        ]
    ],
    ['JavaOne 2014', 'San Fransisco', 'USA', 37.7749295, -122.4194155,
        [
            ['2014-10-01', 'Continuous Delivery and Zero Downtime', 'https://www.oracle.com/javaone/agenda/index.html', false]
        ]
    ],
    ['JavaZone 2014', 'Oslo', 'Norway', 59.913869, 10.752245,
        [
            ['2014-09-11', 'Immutable Server Generation: the new App Deployment', 'http://2014.javazone.no/presentation.html?id=2d36ece1', false]
        ]
    ],
    ['SkillsMatter', 'London', 'UK', 51.508515, -0.1254872,
        [
            ['2014-06-23', 'Immutable Server Generation: the new App Deployment', 'https://skillsmatter.com/meetups/6343-immutable-server-generation-the-new-app-deployment', false]
        ]
    ],
    ['Geekout 2014', 'Tallinn', 'Estonia', 59.4369608, 24.7535746,
        [
            ['2014-06-12', 'Continuous Delivery and Zero Downtime', 'http://2014.geekout.ee/', false]
        ]
    ],
    ['33rd Degree 2014', 'Krakow', 'Poland', 50.0646501, 19.9449799,
        [
            ['2014-06-10', 'Inspiration over Perspiration: Java App Deployment for the 21st century', 'http://2014.33degree.org/talk/show/69', false]
        ]
    ],
    ['JAX 2014', 'Mainz', 'Germany', 49.9928617, 8.2472526,
        [
            ['2014-05-14', 'Inspiration statt Transpiration: Java App Deployment für das 21. Jahrhundert', 'http://jax.de/', false]
        ]
    ],
    ['Javaforum', 'Stockholm', 'Sweden', 59.32893, 18.06491,
        [
            ['2014-03-11', 'Inspiration over Perspiration: Java App Deployment for the 21st century', 'http://www.jforum.se/jf/?meeting=118', false]
        ]
    ],
    ['Jfokus 2014', 'Stockholm', 'Sweden', 59.32893, 18.06491,
        [
            ['2014-03-12', 'Architecting for Continuous Delivery: from Zero to Hero (2 days)', 'http://www.jfokus.se/jfokus/training.jsp', true],
            ['2014-02-06', 'Architecting for Continuous Delivery: from Zero to Hero (2 days)', 'http://www.jfokus.se/jfokus/training.jsp', true],
            ['2014-02-04', 'Continuous Delivery and Zero Downtime', 'http://www.jfokus.se/jfokus/talks.jsp#ContinuousDeliveryan', false],
            ['2014-02-03', 'Continuous Delivery: from Zero to Hero (3 hour tutorial)', 'http://www.jfokus.se/jfokus/talks.jsp#ContinuousDelivery%3Af', false]
        ]
    ],
    ['LJUG', 'München', 'Germany', 48.1366069, 11.5770851,
        [
            ['2013-12-02', 'Photon: The End Of App Deployment As You Know It', 'http://www.meetup.com/Lightweight-Java-User-Group-Munchen/events/148055102/', false]
        ]
    ],
    ['jDays 2013', 'Göteborg', 'Sweden', 57.70887, 11.97456,
        [
            ['2013-11-27', 'Inspiration over Perspiration: Java App Deployment for the 21st century', 'http://www.jdays.se/speakers#AxelFontaine', false]
        ]
    ],
    ['Devoxx 2013', 'Antwerpen', 'Belgium', 51.2192159, 4.4028818,
        [
            ['2013-11-11', 'Flyway: The agile database migration framework for Java', 'http://www.devoxx.be/dv13-axel-fontaine.html', false]
        ]
    ],
    ['W-JAX 2013', 'München', 'Germany', 48.1366069, 11.5770851,
        [
            ['2013-11-07', 'Architecting for Continuous Delivery and Zero Downtime', 'http://jax.de/node/905', false]
        ]
    ],
    ['XP Days 2013', 'Kiev', 'Ukraine', 50.4501, 30.5234,
        [
            ['2013-10-11', 'Flyway: The agile database migration framework for Java', 'http://xpdays.com.ua/program/#flyway', false],
            ['2013-10-11', 'Architecting for Continuous Delivery and Zero Downtime', 'http://xpdays.com.ua/program/#continuous-delivery', false]
        ]
    ],
    ['SourceTalk Tage 2013', 'Göttingen', 'Germany', 51.5400673, 9.9243452,
        [
            ['2013-10-02', 'Architecting for Continuous Delivery: from Zero to Hero', 'http://www.sourcetalk.de/2013/', true]
        ]
    ],
    ['JavaZone 2013', 'Oslo', 'Norway', 59.913869, 10.752245,
        [
            ['2013-09-11', 'Flyway: The agile database migration framework for Java', 'http://www.javazone.no', false]
        ]
    ],
    ['JAX 2013', 'Mainz', 'Germany', 49.9928617, 8.2472526,
        [
            ['2013-04-25', 'Architecting for Continuous Delivery', 'http://jax.de/2013/sessions/?tid=2886#session-24808', false]
        ]
    ],
    ['CONFESS_2013', 'Vienna', 'Austria', 48.2081743, 16.3738189,
        [
            ['2013-04-04', 'Flyway: The agile database migration framework for Java', 'https://2013.con-fess.com/sessions/-/details/78/Flyway--The-agile-database-migration-framework-for-Java', false],
            ['2013-04-03', 'Architecting for Continuous Delivery', 'https://2013.con-fess.com/sessions/-/details/77/Architecting-for-Continuous-Delivery', false]
        ]
    ],
    ['Devoxx France', 'Paris', 'France', 48.856614, 2.3522219,
        [
            ['2013-03-28', 'Architecting for Continuous Delivery', 'http://www.devoxx.com/display/FR13/Architecting+for+Continuous+Delivery', false]
        ]
    ],
    ['33rd Degree', 'Warsaw', 'Poland', 52.2296756, 21.0122287,
        [
            ['2013-03-14', 'Flyway: The agile database migration framework for Java', 'http://2013.33degree.org/talk/show/52', false],
            ['2013-03-13', 'Architecting for Continuous Delivery', 'http://2013.33degree.org/talk/show/51', false]
        ]
    ],
    ['jDays 2012', 'Göteborg', 'Sweden', 57.70887, 11.97456,
        [
            ['2012-12-03', 'Flyway: The agile database migration framework for Java', 'https://www.jdays.se/speakers201212?abstractId=13401278607', false],
            ['2012-12-03', 'Architecting for Continuous Delivery', 'https://www.jdays.se/speakers201212?abstractId=13400589886', false]
        ]
    ],
    ['JUG CH', 'Zürich', 'Switzerland', 47.3686498, 8.5391825,
        [
            ['2012-10-25', 'Architecting for Continuous Delivery', 'http://www.jug.ch/html/events/2012/continuous_delivery.html', false]
        ]
    ],
    ['JUGH', 'Kassel', 'Germany', 51.3127114, 9.4797461,
        [
            ['2012-09-14', 'Continuous Delivery', 'http://www.jugh.de/display/jugh/2012/08/24/JUGH-Treffen+Continuous+Delivery+mit+Axel+Fontaine+am+14.+September+2012', false]
        ]
    ],
    ['eJUG', 'Linz', 'Austria', 48.30694, 14.28583,
        [
            ['2011-06-30', 'Continuous Delivery', 'http://ejug.at/', false]
        ]
    ],
    ['JUG Berlin Brandenburg', 'Berlin', 'Germany', 52.519171, 13.4060912,
        [
            ['2011-06-22', 'Continuous Delivery', 'http://www.jug-bb.de/2011/06/dran-bleiben-continuous-delivery-fur-java-anwendungen/', false]
        ]
    ],
    ['JUG Scotland', 'Edinburgh', 'UK', 55.953252, -3.188267,
        [
            ['2011-06-15', 'Continuous Delivery', 'http://www.ukjugs.org', false]
        ]
    ],
    ['JUG Hamburg', 'Hamburg', 'Germany', 53.5510846, 9.9936818,
        [
            ['2011-05-18', 'Continuous Delivery', 'http://www.jughh.org/das-thema-im-mai11-continuous-delivery', false]
        ]
    ],
    ['JUG Cologne', 'Köln', 'Germany', 50.937531, 6.9602786,
        [
            ['2011-05-09', 'Continuous Delivery', 'http://jugcologne.org/', false]
        ]
    ],
    ['BeJUG', 'Leuven', 'Belgium', 50.877571, 4.704328,
        [
            ['2011-05-05', 'Continuous Delivery', 'http://www.bejug.org/confluenceBeJUG/display/BeJUG/Continuous+Delivery', false]
        ]
    ],
    ['JUG Stuttgart', 'Stuttgart', 'Germany', 48.7754181, 9.1817588,
        [
            ['2011-04-07', 'Continuous Delivery', 'http://jugs.org/protokolle2011.html#07042011', false]
        ]
    ],
    ['Rheinjug', 'Düsseldorf', 'Germany', 51.2277411, 6.7734556,
        [
            ['2011-03-31', 'Continuous Delivery', 'http://www.rheinjug.de/knowledge/berichte-a-news-mainmenu-34/154-nachlese-continuous-delivery', false]
        ]
    ],
    ['JUG Metropolregion  Nürnberg', 'Nürnberg', 'Germany', 49.45203, 11.07675,
        [
            ['2011-02-17', 'Continuous Delivery', 'http://www.jug-n.de/', false]
        ]
    ],
    ['JUGM', 'München', 'Germany', 48.1366069, 11.5770851,
        [
            ['2011-02-07', 'Continuous Delivery', 'http://www.jugm.de/', false]
        ]
    ],
    ['JUG Augsburg', 'Augsburg', 'Germany', 48.3714407, 10.8982552,
        [
            ['2010-10-28', 'Continuous Delivery', 'http://5578.srv1.scgo.eu/jug-augsburg-de/index.php?article_id=97', false]
        ]
    ]
];

function initUpcoming() {
    var upcomingTalks = [];
    var upcomingTrainings = [];

    for (var i = 0; i < speakingEvents.length; i++) {
        var speakingEvent = speakingEvents[i];
        var eventName = speakingEvent[0];
        var eventCity = speakingEvent[1];

        for (var j = 0; j < speakingEvent[5].length; j++) {
            var talk = speakingEvent[5][j];
            var talkDate = talk[0];
            var talkTitle = talk[1];
            var talkUrl = talk[2];
            var talkIsTraining = talk[3];

            if (moment(talkDate + 'T23:59:59').diff(moment()) > 0) {
                //Upcoming talks only
                var talkDetails = {
                    "url": talkUrl,
                    "event": eventName,
                    "city": eventCity,
                    "date": talkDate,
                    "title": talkTitle
                };
                if (talkIsTraining) {
                    upcomingTrainings.push(talkDetails);
                } else {
                    upcomingTalks.push(talkDetails);
                }
            }
        }
    }

    var upcoming = $("#upcoming table");
    if (upcomingTalks.length > 0) {
        upcoming.append("<tr><td colspan='2'><strong>My Upcoming Talks</strong></td></tr>");

        for (var t = upcomingTalks.length - 1; t >= 0; t--) {
            var upcomingTalk = upcomingTalks[t];
            upcoming.append("<tr><td><a href='" + upcomingTalk.url + "'>" + upcomingTalk.event + "</a></td>" +
                "<td><a href='" + upcomingTalk.url + "'>" + upcomingTalk.date + ' ' + upcomingTalk.title + "</a></td>")
        }
    }

    if (upcomingTrainings.length > 0) {
        upcoming.append("<tr><td colspan='2'><strong>My Upcoming Trainings</strong></td></tr>");

        for (var r = upcomingTrainings.length - 1; r >= 0; r--) {
            var upcomingTraining = upcomingTrainings[r];
            upcoming.append("<tr><td><a href='" + upcomingTraining.url + "'>" + upcomingTraining.city + "</a></td>" +
                "<td><a href='" + upcomingTraining.url + "'>" + upcomingTraining.date + ' ' + upcomingTraining.title + "</a></td>")
        }
    }
}

function initTalksMap() {
    var map = new google.maps.Map(document.getElementById("talk-map"), {
        center: new google.maps.LatLng(48.1366069, 11.5770851),
        zoom: 3,
        disableDefaultUI: true,
        scrollwheel: false,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    });

    var bounds = new google.maps.LatLngBounds();

    var shadow = {
        url: '/assets/pin-small-shadow.png',
        anchor: new google.maps.Point(6, 20)
    };

    for (var i = 0; i < speakingEvents.length; i++) {
        var talk = speakingEvents[i];
        var myLatLng = new google.maps.LatLng(talk[3], talk[4]);
        bounds.extend(myLatLng);
        var image;

        if (moment(talk[5][0][0] + 'T23:59:59').diff(moment()) > 0) {
            //Upcoming talk
            image = '/assets/pin-small-green.png';
        } else {
            //Past talk
            image = '/assets/pin-small-gray.png';
        }

        var title = talk[0] + ' (' + talk[1] + ', ' + talk[2] + ')';
        for (var j = 0; j < talk[5].length; j++) {
            title += '\n' + talk[5][j][0] + ' ' + talk[5][j][1];
        }

        var marker = new google.maps.Marker({
            position: myLatLng,
            shadow: shadow,
            icon: image,
            map: map,
            title: title,
            zIndex: speakingEvents.length - i
        });

        addVenueLink(marker, talk);
    }
    map.panToBounds(bounds);
    map.setCenter(bounds.getCenter());
}

function addVenueLink(marker, talk) {
    google.maps.event.addListener(marker, 'click', function () {
        window.location = talk[5][0][2];
    });
}