$(function(){
    // set navigation bar
    setNavigation();

    // scroll to top
    $(document).ready(function(){
        console.log(this);
        $(this).scrollTop(0);
    });

    var $window = $(window);
    var $workSection = $('div.workcontainer');

     // scroll to work section when clicked
     $("a.btn").on('click', function(event) {
        if (this.hash !== "") {
          // Prevent default anchor click behavior
          event.preventDefault();
          var hash = this.hash;

          //load work items first
        //   loadWorkItems();
    
          // Using jQuery's animate() method to add smooth page scroll
          // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
          $('html, body').delay(100).animate({
            scrollTop: $(hash).offset().top
          }, 1000, function(){
            window.location.hash = hash;
          });
        }
    });

    $window.on('scroll', function(){
        var scrolled = $window.scrollTop();
        // var workSectionOffset = $("section.workpreview").offset().top / 3;
        var workSectionTriggerOffset = $workSection.offset().top;
        var windowheight = $window.height();
        var currentPosition = scrolled + windowheight;
        
        if(currentPosition > workSectionTriggerOffset){
            loadWorkItems();
        }
    });

   
})

function loadWorkItems(){
    $('div.workcontainer').each(function(work){
        if($(this).hasClass("hidden")){
            $(this).removeClass("hidden");
        }
    });
}

function unloadWorkItems(){
    $('div.workcontainer a').each(function(work){
        if(!$(this).hasClass("hidden")){
            $(this).addClass("hidden");
        }
    });
}

function setNavigation(){
    if($("#aboutnav").hasClass("active")){
        $(this).removeClass("active");
    }
    else if($("#worknav").hasClass("active")){
        $(this).removeClass("active");
    }
}