document.writeln("<link rel=\'stylesheet\' href=\'/static/css/popreminder.css\'>");
document.writeln("<div class=\'mask\'>");
document.writeln("    <div class=\'warning_con ok\'>");
document.writeln("         <div class=\'iconImg\'>");
document.writeln("             <img class=\'img1\'>");
document.writeln("             <img class=\'img2\'>");
document.writeln("         </div>");
document.writeln("        <div class=\'describe\'>");
document.writeln("            <h1></h1>");
document.writeln("        </div>");
document.writeln("    </div>");
document.writeln("</div>");

function Adopt(failOrsuccessfully, waringdescribe, fn) {
    $('.mask').fadeIn(300);
    var Describe = $('.describe');
    var WariningImg = $('.iconImg img');
    var winWidth = $(window);
    var warningCon = $(".warning_con");

    console.log(warningCon.innerHeight())
    $(".warning_con").css({
        left: (winWidth.width() - warningCon.width()) / 2,
        top: (winWidth.height() - warningCon.outerHeight()) / 2
    });


    if (failOrsuccessfully == 'ok') {
        WariningImg.eq(0).attr('src', '/static/img/Okicon_1.png');
        WariningImg.eq(1).attr('src', '/static/img/Okicon_2.png')
    } else {
        WariningImg.eq(0).attr('src', '/static/img/Noicon_1.png');
        WariningImg.eq(1).attr('src', '/static/img/Noicon_2.png')
    }
    Describe.find('h1').html(waringdescribe);

    setTimeout(function() {
        $(".describe").animate({
            'opacity': 1
        }, function() {
            if (fn) { fn() };
        });
    }, 400);

    setTimeout(function() {
        $(".mask").fadeOut(300)
    }, 3000);
}
