$(document).ready(function() {
    // Hàm đăng xuất
    $('#Logout').click(function() {
        localStorage.clear();
        window.location.href = "/login";
    });

    // Hàm Login
    $('#Login').click(function() {
        var email = document.getElementById('email').value;
        var password = document.getElementById('password').value;
        var basicInfo = JSON.stringify({
            email: email,
            password: password
        });
        $.ajax({
            type: "POST",
            url: "/auth/login",
            dataType: 'json',
            contentType: "application/json; charset=utf-8",
            data: basicInfo,
            success: function(data) {
                localStorage.token = data.token;
                window.location.href = "/user/profile";
            },
            error: function() {
                alert("Login Failed. Vui lòng kiểm tra lại tài khoản hoặc mật khẩu.");
            }
        });
    });

    // Hiển thị thông tin người dùng đăng nhập thành công
    // Code này sẽ tự chạy khi load trang (dành cho trang profile)
    if(window.location.pathname === '/user/profile') {
        $.ajax({
            type: 'GET',
            url: '/users/me',
            dataType: 'json',
            contentType: "application/json; charset=utf-8",
            beforeSend: function(xhr) {
                if (localStorage.token) {
                    xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.token);
                }
            },
            success: function(data) {
                $('#profile').html("Xin chào, " + data.fullName + "!");
                if(data.images) {
                    $('#images').attr("src", data.images);
                } else {
                    $('#images').attr("src", "https://via.placeholder.com/150");
                }
            },
            error: function(e) {
                var json = e.responseText;
                $('#feedback').html("Chưa đăng nhập hoặc phiên đăng nhập đã hết hạn.");
                // Tự động đá về trang login nếu chưa đăng nhập
                setTimeout(function() {
                    window.location.href = "/login";
                }, 2000);
            }
        });
    }
});
