$(function () {
    window.prettyPrint && prettyPrint();
    $.backstretch("/assets/bg.jpg");
    window.loadOnStartup && loadOnStartup();

    var searchBox = $("#cse-search-box").find("input");
    searchBox.focus(function() {
        $(this).removeClass("google-branding");
    });
    searchBox.blur(function() {
        $(this).addClass("google-branding");
    });


    var confirm = null;

    $('#contact-form').submit(function (e) {
        if ($('#entry_0').val().indexOf("http://") == 0) {
            e.preventDefault();
            confirm = 'contact-spam';
        } else {
            confirm = 'contact-confirm';
        }

        $('#contact').modal('hide');
    });

    $('#contact').on('hidden', function () {
        if (confirm != null) {
            $('#' + confirm).modal('show');
        }
        confirm = null;
    });

    $('a[data-contact]').click(function(e) {
        e.preventDefault();
        showContactPopup($(this).data('contact'));
    })
});

function showContactPopup(subject) {
    if (subject == null) {
        subject = '';
    }
    $('#entry_0').val(subject);
    $('#entry_1').val('');
    $('#contact').modal('show');
}
