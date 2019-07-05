$(function(){
    setNavigation();

    $(document).ready(function(){
        console.log(this);
        $(this).scrollTop(0);
    });

    var $window = $(window);

    // scroll to id location
    var page_url = window.location.href;
    var page_id = page_url.substring(page_url.lastIndexOf("#") + 1);
    if(page_id==="aboutcontactme"){ 
        $('html, body').animate({
            scrollTop: $('#' + page_id).offset().top
        }, 1000);
    }

    var $aboutcontactme = $("#aboutcontactme");

    $window.on('scroll', function(){
        var scrolled = $window.scrollTop();

        var aboutcontactmeTrigger = $aboutcontactme.offset().top + 300;
        var windowHeight = $window.height();
        var currentposition = windowHeight + scrolled;

        if(currentposition > aboutcontactmeTrigger){
            if($("#aboutheading").hasClass("contactmehidden")){
                $("#aboutheading").removeClass("contactmehidden");
            }

            if($("#contactinfo").hasClass("contactmehidden")){
                $("#contactinfo").removeClass("contactmehidden");
            }

            if($("#contactmeform").hasClass("formhidden")){
                $("#contactmeform").removeClass("formhidden");
            }
        }
    });

})

function setNavigation(){
    if($("#worknav").hasClass("active")){
        $(this).removeClass("active");
    }
    $("#aboutnav").addClass("active");
}