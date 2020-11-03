$(function() {

    //全选框
    $(".checkall").change(function() {
        $(".checkall, .j-checkbox").prop("checked", $(this).prop("checked"));
        if ($(this).prop("checked")) {
            $(".cart-item").addClass("check-cart-item");
        } else {
            $(".cart-item").removeClass("check-cart-item");
        }
        getSum();
    });
    $(".j-checkbox").change(function() {
        if ($(".j-checkbox:checked").length == $(".j-checkbox").length) {
            $(".checkall").prop("checked", true);
        } else {
            $(".checkall").prop("checked", false);
        }
        if ($(this).prop("checked")) {
            $(this).parents(".cart-item").addClass("check-cart-item");
        } else {
            $(this).parents(".cart-item").removeClass("check-cart-item");
        }
        getSum();
    });

    //商品的增加、减少
    $(".increment").click(function() {
        var n = $(this).siblings(".itxt").val();
        n++;
        $(this).siblings(".itxt").val(n);
        //计算增加小计模块
        var p = $(this).parents(".p-num").siblings(".p-price").text();
        p = p.substr(1);
        var price = (p * n).toFixed(2)
        $(this).parents(".p-num").siblings(".p-sum").text("￥" + price);
        getSum();
    })
    $(".decrement").click(function() {
        var n = $(this).siblings(".itxt").val();
        n--;
        if (n == 0) {
            return n = 0;
        };

        $(this).siblings(".itxt").val(n);
        //计算减少小计模块
        var p = $(this).parents(".p-num").siblings(".p-price").text();
        p = p.substr(1);
        var price = (p * n).toFixed(2)
        $(this).parents(".p-num").siblings(".p-sum").text("￥" + price);
        getSum();
    })

    // 计算总计和总额
    getSum();

    function getSum() {
        var count = 0,
            sum = 0;
        $(".itxt").each(function(i, elem) {
            if ($(elem).parents(".p-num").siblings(".p-checkbox").children(".j-checkbox").prop("checked")) {
                count += parseInt($(elem).val());
            }
        })
        $(".p-sum").each(function(i, elem) {
            if ($(elem).siblings(".p-checkbox").children(".j-checkbox").prop("checked")) {
                sum += parseFloat($(elem).text().substr(1));
            }
        })
        $(".amount-sum em").text(count);
        $(".price-sum em").text("￥" + sum.toFixed(2))
    }

    // 删除商品模块
    $(".p-action").click(function() {
        $(this).parent(".cart-item").remove();
        getSum();
    })
    $(".remove-batch").click(function() {
        // $(".j-checkbox:checked").parents(".cart-item").remove();
        $(".cart-item.check-cart-item").remove();
        getSum();
    })
    $(".clear-all").click(function() {
        $(".cart-item").remove();
        getSum();
    })
})