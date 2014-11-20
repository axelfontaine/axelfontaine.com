$(function () {
    window.prettyPrint && prettyPrint();
    $.backstretch("/assets/bg.jpg");
    window.loadOnStartup && loadOnStartup();

    var searchBox = $("#cse-search-box").find("input");
    searchBox.focus(function () {
        $(this).removeClass("google-branding");
    });
    searchBox.blur(function () {
        $(this).addClass("google-branding");
    });


    var confirm = null;

    $('#contact-form').submit(function (e) {
        //if ($('#entry_0').val().indexOf("http://") == 0) {
        //    e.preventDefault();
        //    confirm = 'contact-spam';
        //} else {
        confirm = 'contact-confirm';
        //}

        $('#contact').modal('hide');
    });

    $('#contact').on('hidden', function () {
        if (confirm != null) {
            $('#' + confirm).modal('show');
        }
        confirm = null;
    });

    $('a[data-contact]').click(function (e) {
        e.preventDefault();
        showContactPopup($(this).data('contact'));
    })
});

function showContactPopup(subject) {
    if (subject == null) {
        subject = '';
    }
    $('#entry_1090068038').val(subject);
    $('#entry_1737582163').val('');
    $('#contact').modal('show');
}

function postContactForm() {
    $.ajax({
        url: "//forms.brace.io/axel@boxfuse.com",
        method: "POST",
        data: {
            "_replyto": $('#entry_1364296767').val(),
            "name": $('#entry_338282018').val(),
            "_subject": $('#entry_1090068038').val(),
            "_message": $('#entry_1737582163').val(),
            "_gotcha": $("input[name='_gotcha']").val()
        },
        dataType: "json"
    });
}