$(function () {
    window.prettyPrint && prettyPrint();
    $.backstretch("/assets/bg.jpg");
    window.loadOnStartup && loadOnStartup();


    var submitted = false;

    $('#contact-form').submit(function () {
        submitted = true;
    });

    $('#contact-hidden-iframe').load(function () {
        if (submitted) {
            $('#contact').modal('hide')
        }
    });

    $('#contact').on('hidden', function () {
        if (submitted) {
            $('#contact-confirm').modal('show');
        }
        submitted = false;
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
