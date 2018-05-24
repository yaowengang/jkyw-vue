    mui.init({
        swipeBack: true //启用右滑关闭功能
    });


    function delete_order(params) {
        var btnArray = ['取消', '确认'];
        mui.confirm('确认删除此订单吗？删除之后无法恢复', '警 告', btnArray, function(e) {
            if (e.index == 1) {
                params.parents(".order-main").remove();
                Adopt('ok', '删除成功');
            } else {

            }
        });
    }

    function confirm_receipt(params) {
        var btnArray = ['取消', '确认收货'];
        mui.confirm('收到商品请您仔细检查后收获，如有问题请与客服联系', '警 告', btnArray, function(e) {
            if (e.index == 1) {
                params.parents(".order-main").find(".order-main-title span").text("交易成功");
                params.parents(".order-main").find(".order-detail").after("<div class='pay-box' ><button>退货退款</button><button class = 'colorff3300'>评价</button> </div>");
                params.parents(".order-main").find(".sj-pay div").html("<button class='remove'>删除订单</button>");
            } else {

            }
        });
    }

   /* function returnGoods(_this) {
      _this.$router.push({
        path:'/evaluate'
      })
    }*/


    $("body").on('click', 'button', function() {
        var thisd = $(this);
        var thishtml = $(this).text();
        console.log(thishtml);
        switch (thishtml) {
            case "删除订单":
                delete_order(thisd);
                break;
            case "确认收货":
                confirm_receipt(thisd);
                break;
            case "评价":
                evaluate();
                break;
            /*case "退货退款":
                returnGoods(thisd);
                break;*/
            default:
                break;
        }
    });

    $("body").on('click', '.order-detail', function() {
        var orderStatus = $(this).parents(".order-main").find(".order-status").text();
        console.log(orderStatus)
        if (orderStatus == "交易成功") {
            location.href = "orderdetail-done.html";
        } else {
            location.href = "orderdetail.html";
        }
    })




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
