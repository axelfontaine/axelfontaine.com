function loadOnStartup() {
    var map = new google.maps.Map(document.getElementById("talk-map"), {
        center: new google.maps.LatLng(48.1366069, 11.5770851),
        zoom: 8,
        disableDefaultUI: true,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    });

    //Coordinate lookup: http://www.mapcoordinates.net/en
    var talks = [
        ['XP Days 2013', 'Kiev, Ukraine', 50.4501, 30.5234,
            [
                ['2013-10-11', 'Flyway: The agile database migration framework for Java', 'http://xpdays.com.ua/program/#flyway'],
                ['2013-10-11', 'Architecting for Continuous Delivery and Zero Downtime', 'http://xpdays.com.ua/program/#continuous-delivery']
            ]
        ],
        ['JavaZone 2013', 'Oslo, Norway', 59.913869, 10.752245,
            [
                ['2013-09-11', 'Flyway: The agile database migration framework for Java', 'http://www.javazone.no']
            ]
        ],
        ['JAX 2013', 'Mainz, Germany', 49.9928617, 8.2472526,
            [
                ['2013-04-25', 'Architecting for Continuous Delivery', 'http://jax.de/2013/sessions/?tid=2886#session-24808']
            ]
        ],
        ['CONFESS_2013', 'Vienna, Austria', 48.2081743, 16.3738189,
            [
                ['2013-04-04', 'Flyway: The agile database migration framework for Java', 'https://2013.con-fess.com/sessions/-/details/78/Flyway--The-agile-database-migration-framework-for-Java'],
                ['2013-04-03', 'Architecting for Continuous Delivery', 'https://2013.con-fess.com/sessions/-/details/77/Architecting-for-Continuous-Delivery']
            ]
        ],
        ['Devoxx France', 'Paris, France', 48.856614, 2.3522219,
            [
                ['2013-03-28', 'Architecting for Continuous Delivery', 'http://www.devoxx.com/display/FR13/Architecting+for+Continuous+Delivery']
            ]
        ],
        ['33rd Degree', 'Warsaw, Poland', 52.2296756, 21.0122287,
            [
                ['2013-03-14', 'Flyway: The agile database migration framework for Java', 'https://2013.con-fess.com/sessions/-/details/78/Flyway--The-agile-database-migration-framework-for-Java'],
                ['2013-03-13', 'Architecting for Continuous Delivery', 'https://2013.con-fess.com/sessions/-/details/77/Architecting-for-Continuous-Delivery']
            ]
        ],
        ['jDays 2012', 'Göteborg, Sweden', 57.70887, 11.97456,
            [
                ['2012-12-03', 'Flyway: The agile database migration framework for Java', 'https://www.jdays.se/speakers201212?abstractId=13401278607'],
                ['2012-12-03', 'Architecting for Continuous Delivery', 'https://www.jdays.se/speakers201212?abstractId=13400589886']
            ]
        ],
        ['JUG CH', 'Zürich, Switzerland', 47.3686498, 8.5391825,
            [
                ['2012-10-25', 'Architecting for Continuous Delivery', 'http://www.jug.ch/html/events/2012/continuous_delivery.html']
            ]
        ],
        ['JUGH', 'Kassel, Germany', 51.3127114, 9.4797461,
            [
                ['2012-09-14', 'Continuous Delivery', 'http://www.jugh.de/display/jugh/2012/08/24/JUGH-Treffen+Continuous+Delivery+mit+Axel+Fontaine+am+14.+September+2012']
            ]
        ],
        ['eJUG', 'Linz, Austria', 48.30694, 14.28583,
            [
                ['2011-06-30', 'Continuous Delivery', 'http://ejug.at/']
            ]
        ],
        ['JUG Berlin Brandenburg', 'Berlin, Germany', 52.519171, 13.4060912,
            [
                ['2011-06-22', 'Continuous Delivery', 'http://www.jug-bb.de/2011/06/dran-bleiben-continuous-delivery-fur-java-anwendungen/']
            ]
        ],
        ['JUG Scotland', 'Edinburgh, UK', 55.953252, -3.188267,
            [
                ['2011-06-15', 'Continuous Delivery', 'http://www.ukjugs.org']
            ]
        ],
        ['JUG Hamburg', 'Hamburg, Germany', 53.5510846, 9.9936818,
            [
                ['2011-05-18', 'Continuous Delivery', 'http://www.jughh.org/das-thema-im-mai11-continuous-delivery']
            ]
        ],
        ['JUG Cologne', 'Köln, Germany', 50.937531, 6.9602786,
            [
                ['2011-05-09', 'Continuous Delivery', 'http://jugcologne.org/']
            ]
        ],
        ['BeJUG', 'Leuven, Belgium', 50.877571, 4.704328,
            [
                ['2011-05-05', 'Continuous Delivery', 'http://www.bejug.org/confluenceBeJUG/display/BeJUG/Continuous+Delivery']
            ]
        ],
        ['JUG Stuttgart', 'Stuttgart, Germany', 48.7754181, 9.1817588,
            [
                ['2011-04-07', 'Continuous Delivery', 'http://jugs.org/protokolle2011.html#07042011']
            ]
        ],
        ['Rheinjug', 'Düsseldorf, Germany', 51.2277411, 6.7734556,
            [
                ['2011-03-31', 'Continuous Delivery', 'http://www.rheinjug.de/knowledge/berichte-a-news-mainmenu-34/154-nachlese-continuous-delivery']
            ]
        ],
        ['JUG Metropolregion  Nürnberg', 'Nürnberg, Germany', 49.45203, 11.07675,
            [
                ['2011-02-17', 'Continuous Delivery', 'http://www.jug-n.de/']
            ]
        ],
        ['JUGM', 'München, Germany', 48.1366069, 11.5770851,
            [
                ['2011-02-07', 'Continuous Delivery', 'http://www.jugm.de/']
            ]
        ],
        ['JUG Augsburg', 'Augsburg, Germany', 48.3714407, 10.8982552,
            [
                ['2010-10-28', 'Continuous Delivery', 'http://5578.srv1.scgo.eu/jug-augsburg-de/index.php?article_id=97']
            ]
        ]
    ];

    var bounds = new google.maps.LatLngBounds();

    var shadow = {
        url: '/assets/pin-small-shadow.png',
        anchor: new google.maps.Point(6, 20)
    };

    for (var i = 0; i < talks.length; i++) {
        var talk = talks[i];
        var myLatLng = new google.maps.LatLng(talk[2], talk[3]);
        bounds.extend(myLatLng);
        var image;

        if (moment(talk[4][0][0] + 'T23:59:59').diff(moment()) > 0) {
            //Upcoming talk
            image = '/assets/pin-small-green.png';
        } else {
            //Past talk
            image = '/assets/pin-small-gray.png';
        }

        var title = talk[0] + ' (' + talk[1] + ')';
        for (var j = 0; j < talk[4].length; j++) {
            title += '\n' + talk[4][j][0] + ' ' + talk[4][j][1];
        }

        var marker = new google.maps.Marker({
            position: myLatLng,
            shadow: shadow,
            icon: image,
            map: map,
            title: title,
            zIndex: talks.length - i
        });

        addVenueLink(marker, talk);
    }
    map.fitBounds(bounds);
}

function addVenueLink(marker, talk) {
    google.maps.event.addListener(marker, 'click', function () {
        window.location = talk[4][0][2];
    });
}