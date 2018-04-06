jQuery(document).ready(function () {
    var input = jQuery("#textbx");
    var tb = jQuery("#tb");
    var info;

    function init() {
        jQuery.ajax({
            type: "GET",
            url: "http://127.0.0.1:8081/data.json",
            success: getData
        });
    }

    function getData(data) {
        info = data;
        drawTable(data);
    }

    function drawTable(data) {
        jQuery("#tb tr").remove();
        tb.append("<tr><th>UserID</th><th>FirstName</th><th>LastName</th><th>Address</th></tr>");
        for (var i = 0; i < data.length; i++) {
            var p = data[i];
            tb.append("<tr><td>" + p.user_id + "</td><td>" + p.firstName + "</td><td>" + p.lastName + "</td><td>" + p.place + "</td></tr>");
        }

    }

    jQuery("#textbx").keyup(function () {

        var content = [];
        var value = jQuery(this).val();
        var da = JSON.parse(localStorage.getItem("info"));
        if (value == "") {
            drawTable(da);
        } else {
            for (var i = 0; i < da.length; i++) {
                var p = info[i];
                for (var prop in p) {
                    if (isSubstr(value, p[prop])) {
                        content.push(p);
                        break;
                    }
                }
            }
            drawTable(content);
        }
        
        function isSubstr(s1, s2) {
            var reg = new RegExp(s1,"i");
            if(s2.search(reg) == 0) {
                return true;
            }
            return false;
        }

    })

    init();






})
