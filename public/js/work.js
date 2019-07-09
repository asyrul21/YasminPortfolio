workids = [
    'duitnow',
    'quickaccess',
    'cardactivation',
    'tydee',
    'letitburn',
    'showreel'
]

$(function(){
    //set navigation
    setNavigation();

    //scroll to top
    $(document).ready(function(){
        console.log(this);
        $(this).scrollTop(0);
    });

    var $window = $(window);

    //hide to top arrow
    $("#totop").hide();

    // scroll to id location
    var page_url = window.location.href;
    var page_id = page_url.substring(page_url.lastIndexOf("#") + 1);
    if(workids.includes(page_id)){
        //load all sections
        loadAllContents();
        // loadAllSections();
 
        setTimeout(() => {
            $('html, body').animate({
                scrollTop: $('#' + page_id).offset().top
            }, 2000);
        }, 1000);
    }

    // Declare section ids here
    var $duitnow = $("#duitnow");
    var $quickaccess = $("#quickaccess");
    var $cardactivation = $("#cardactivation");

    var $tydee = $("#tydee");
    var $letitburn = $("#letitburn");
    var $showreel = $("#showreel");

    $window.on('scroll', function(){
        var scrolled = $window.scrollTop();

        // get document and window height
        var documentheight = $(document).height();
        var windowheight = $window.height();

        // get section off sets
        var duitnowSectionTriggerOffset = $duitnow.offset().top;
        var quickaccessSectionTriggerOffset = $quickaccess.offset().top;
        var cardactivationSectionTriggerOffset = $cardactivation.offset().top;

        var tydeeSectionTriggerOffset = $tydee.offset().top;
        var letitburnSectionTriggerOffset = $letitburn.offset().top;
        var showreelSectionTriggerOffset = $showreel.offset().top;     

        // current position
        var currentposition = windowheight + scrolled;
        
        // padding
        var triggerBottomPosition = documentheight - 100;

        if(scrolled === 0){
            $("#totop").fadeOut();
        }

        // Load section upon scrolling
        if(currentposition > duitnowSectionTriggerOffset){
            $("#totop").fadeIn();
            loadContent("duitnow");
            //loadSectionContent("duitnow");
        }
        
        if(currentposition > quickaccessSectionTriggerOffset){
            loadContent("quickaccess");
            //loadSectionContent("quickaccess");
        }
        
        if(currentposition > cardactivationSectionTriggerOffset){
            loadContent("cardactivation");
            //loadSectionContent("cardactivation");
        }
        if(currentposition > tydeeSectionTriggerOffset){
            loadContent("tydee");
            //loadSectionContent("tydee");
        }
        
        if(currentposition > letitburnSectionTriggerOffset){
            loadContent("letitburn");
            //loadSectionContent("letitburn");
        }
        
        if(currentposition > showreelSectionTriggerOffset){
            loadContent("showreel");
            //loadSectionContent("showreel");
        }
    });

    $("a#totop").on('click', function(event) {
        if (this.hash !== "") {
          // Prevent default anchor click behavior
          event.preventDefault();
          var hash = this.hash;

          $('html, body').delay(200).animate({
            scrollTop: $(hash).offset().top
          }, 800, function(){
            window.location.hash = hash;
          });
        }
    });
})

// Declare load content functions here
function loadContent(id){
    let idcontent = '#' + id + 'content';
    console.log(idcontent);
    
    if($(idcontent).hasClass("hidden")){
        $(idcontent).removeClass("hidden");
    }
}

function loadSectionContent(id){
    if(!workids.includes(id)){
        return;
    }
    let idselector = "#" + id;
    let ajaxpath = "/ajax/" + id;
    // ajax call
    $(idselector).load(ajaxpath);
    setTimeout( function(){
        if($(idselector).hasClass("hidden")){
            $(idselector).removeClass("hidden");
        }
    },100);
}

function loadAllSections(){
    workids.forEach(workid => {
        loadSectionContent(workid);
    });
}

function loadAllContents(){
    workids.forEach(workid => {
        loadContent(workid);
    });
}

function setNavigation(){
    if($("#aboutnav").hasClass("active")){
        $(this).removeClass("active");
    }
    $("#worknav").addClass("active");
}