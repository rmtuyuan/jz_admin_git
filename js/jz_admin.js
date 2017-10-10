// 提示框的 逻辑
function showInfo(text) {
    $("body").addClass("overflow-hidden");
    $(".info-text").html(text);
    $(".modal-info").show();

}
$(".info-sure").click(function (e) {
    e.preventDefault();
    $("body").removeClass("overflow-hidden");
    $(".modal-info").hide();
});

function openHref(url) {
    $(".info-sure-2").click(function (e) {
        e.preventDefault();
        window.location.href = url;
    });
}
(function ($) {
    //获取url参数的封装函数
    //decodeURI() 和 decodeURIComponent()
    $.getUrlParam = function (name) {
        var reg = new RegExp("(^|&|#)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) {
            return decodeURIComponent(r[2]);
        }
        return null;
    }
    $.mygetUrlParam = function (name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");

        var r = window.location.hash.substr(1).match(reg);
        if (r != null) {
            return decodeURIComponent(r[2]);
        }
        return null;
    }
})(jQuery);

//家族 后台功能
//登录成功后 获取 
//公众功能
var login_uid = null; //uid
var server = null; //http:
var Comment = {
    init: function () {

        if (!login_uid) {
            //没有登录 提示登录
            // window.location.href="";
        }
    }
};

//首页功能

var Index = {
    init: function () {
        //主播收入
        //            var form = new FormData();
        //     form.append("uid", uid); // 

        //     fetch(server + "/user/my_info", {
        //         method: 'POST',
        // //      headers: { 'Accept': 'application/json',
        // //      'Content-Type': 'application/json'},
        //         mode: 'cors',
        //         cache: 'default',
        //         body: form
        //     }).then((response) => response.json()).then(function (data) {
        //         //console.log(data);
        //         if (data.code == 200) {
        //             console.log(data);
        //         }
        //     });
    }
};

//主播认证 
var Anchor_atte = {
    init: function () {
        this.DataLoad();
    },
    DataLoad: function () {
        //显示 头像 和昵称
        //            var form = new FormData();
        //     form.append("uid", uid); // 

        //     fetch(server + "/user/my_info", {
        //         method: 'POST',
        // //      headers: { 'Accept': 'application/json',
        // //      'Content-Type': 'application/json'},
        //         mode: 'cors',
        //         cache: 'default',
        //         body: form
        //     }).then((response) => response.json()).then(function (data) {
        //         //console.log(data);
        //         if (data.code == 200) {
        //             console.log(data);
        //         }
        //     });
    },
    InputCheck: function () {
        //判断各个都填没有

    },
    upload_img_ok: false,
    upload_img_src: null,
    login_uid: null, //uid 
    login_token: null, //token
    pic_id_front: null, //身份证正面
    pic_id_back: null, //身份证反面
    init: function () {
        //初始化
        this.login_uid = $.getUrlParam("login_uid");
        this.login_token = $.getUrlParam("login_token");
        this.conmitInput();
        this.phoneReg();
        this.getSmsCode();
        this.uploadImg();
        this.allSubmitClick();
    },
    conmitInput: function () {
        $(".atte-form-box input").keyup(function () {

            if ($(this).val().length > 0) {
                $(this).addClass("actived");
                $(this).removeClass("erroed");
                $(this).css("color", "#333");

            } else {
                $(this).removeClass("actived");
                $(this).addClass("erroed");
                $(this).css("color", "#fe426f");
            }
        });

        $(".atte-form-box input").blur(function () {

            if ($(this).val().length > 0) {
                $(this).addClass("actived");
                $(this).removeClass("erroed");
                $(this).css("color", "#333");
            } else {
                $(this).removeClass("actived");
                $(this).addClass("erroed");
                $(this).css("color", "#fe426f");
            }
        });
        //图片是否上传 图片提交按钮

        $(".upload-submit-btn").click(function (e) {
            e.preventDefault();
            //判断两张图片是否都上传
            if (atteRolu.pic_id_front) {
                //正面上传
                if (atteRolu.pic_id_back) {
                    //都上传了
                    $(".form-nav").show();
                    $(".upload-img-nav").hide();
                    $(".atte-main-box").css("left", "0");
                } else {
                    showInfo("身份证国徽面没上传");
                }
            } else {
                showInfo("身份证正面没上传");
            }
        });


    },

    uploadImg: function () {
        //上传图片 显示图片
        $(".img-box-btn>input").change(function (e) {
            var imgPath = $(this).val();
            var ipt = $(this);
            if (imgPath == "") {
                showInfo('请选择上传图片!');
                //alert("请选择上传图片！");
                return;
            }
            //判断上传文件的后缀名
            var strExtension = imgPath.substr(imgPath.lastIndexOf('.') + 1);
            if (strExtension != 'jpg' && strExtension != 'gif' &&
                strExtension != 'png' && strExtension != 'bmp' && strExtension != 'JPG' && strExtension != 'PNG') {
                showInfo('请选择图片文件!');
                // alert("请选择图片文件");
                return;
            } else {
                for (var n = 0; n < this.files.length; n++) {
                    var fileObj = this.files[n];
                    var imgUrl = window.URL.createObjectURL(this.files[n]);
                    var form_2 = new FormData();
                    // ipt.parent().siblings(".img-box").find("div").css("background", "url(" + imgUrl + ") no-repeat").css("background-size", "100% 100%").find("img").attr("src", imgUrl)
                    form_2.append("login_uid", atteRolu.login_uid);
                    form_2.append("login_token", atteRolu.login_token);
                    form_2.append("file", fileObj);
                    fetch(server + "/file/upload", {
                        method: 'POST',
                        //headers: myHeaders,
                        mode: 'cors',
                        cache: 'default',
                        body: form_2
                    }).then((response) => response.json()).then(function (data) {
                        //console.log(data);
                        // atteRolu[ipt.attr("name")]=222;
                        //  console.log(atteRolu.pic_id_front);
                        if (data.code == 200) {
                            //添加图片 
                            ipt.parent().siblings(".img-box").find("div").css("background", "url(" + data.data.url + ") no-repeat").css("background-size", "100% 100%").find("img").attr("src", data.data.url);
                            ipt.addClass("actived").removeClass("erroed");
                            atteRolu[ipt.attr("name")] = data.data.url;


                        } else {
                            ipt.addClass("erroed").removeClass("actived");
                            showInfo('当前网络不稳定,上传失败,请重新上传');
                        }

                    });

                }
            }

        });
    },

    allSubmitClick: function () {
        //点击提交  判断是否都填写完成 
        $("#all_submit_btn").click(function (e) {
            e.preventDefault();
            // 判断是否都填写完成 

            if ($("input").length == $("input.actived").length) {
                //都填了 fetch   跳转
                var form_2 = new FormData();
                for (var j = 0; j < $(".atte-form-box input.actived").length; j++) {
                    var element = $($(".atte-form-box input.actived")[j]);
                    form_2.append(element.attr("name"), element.val()); // 
                }
                form_2.append("pic_id_front", atteRolu.pic_id_front); // 
                form_2.append("pic_id_back", atteRolu.pic_id_back); //
                form_2.append("login_uid", atteRolu.login_uid); // 
                form_2.append("login_token", atteRolu.login_token); //
                fetch(server + "/user/authentication", {
                    method: 'POST',
                    //headers: myHeaders,
                    mode: 'cors',
                    cache: 'default',
                    body: form_2
                }).then((response) => response.json()).then(function (data) {
                    if (data.code == 200) {
                        // 成功 跳转网页
                        alert("提交成功");
                        window.location.href = 'attestation_after.html?login_uid=' + atteRolu.login_uid + "&login_token=" + atteRolu.login_token;

                    } else if (data.code == 400) {
                        showInfo(data.message);
                    } else {
                        showInfo('当前网络不稳定,提交失败,请重新提交');
                    }

                });


            } else {
                //有没填 的 
                if ($($("input.erroed")[0]).hasClass("not-upload-info")) {
                    //图片没上传
                    showInfo($($("input.erroed")[0]).parent().siblings(".img-box-txt").html() + "没上传");

                } else {
                    //其他没填写
                    showInfo($($("input.erroed")[0]).siblings("p").html() + "没填写");
                }
            }

        });

    }
}

//公告板 
var Public_notice = {
    init: function () {

        var form_2 = new FormData();
        form_2.append("login_uid", atteRolu.login_uid); // 
        form_2.append("login_token", atteRolu.login_token); //
        fetch(server + "/user/authentication", {
            method: 'POST',
            //headers: myHeaders,
            mode: 'cors',
            cache: 'default',
            body: form_2
        }).then((response) => response.json()).then(function (data) {
            if (data.code == 200) {
                // 成功  渲染页面
            } else if (data.code == 400) {
                showInfo(data.message);
            } else {
                showInfo('当前网络不稳定,提交失败,请重新提交');
            }

        });

        //点击 去掉new字

    }
    
}


//首页功能

var Family_index = {
    init: function () {
        //家族首页
        //            var form = new FormData();
        //     form.append("uid", uid); // 

        //     fetch(server + "/user/my_info", {
        //         method: 'POST',
        // //      headers: { 'Accept': 'application/json',
        // //      'Content-Type': 'application/json'},
        //         mode: 'cors',
        //         cache: 'default',
        //         body: form
        //     }).then((response) => response.json()).then(function (data) {
        //         //console.log(data);
        //         if (data.code == 200) {
        //             console.log(data);
        //         }
        //     });
    }
};

//家族设置
var Family_setting={
    init:function () {  
        this.DataLoad();
        this.CheckInput();
        this.Img_upload();
        this.ClickSubmit();
    },
    DataLoad:function () {  
        //显示头像昵称
            //            var form = new FormData();
        //     form.append("uid", uid); // 

        //     fetch(server + "/user/my_info", {
        //         method: 'POST',
        // //      headers: { 'Accept': 'application/json',
        // //      'Content-Type': 'application/json'},
        //         mode: 'cors',
        //         cache: 'default',
        //         body: form
        //     }).then((response) => response.json()).then(function (data) {
        //         //console.log(data);
        //         if (data.code == 200) {
        //             console.log(data);
        //         }
        //     });
    },
    CheckInput:function () {  
            $(".fs-text-input").keyup(function () {

            if ($(this).val().length > 0) {
                $(this).addClass("actived");
                $(this).removeClass("erroed");
                $(this).css("color", "#333");

            } else {
                $(this).removeClass("actived");
                $(this).addClass("erroed");
                $(this).css("color", "#fe426f");
            }
        });

        $(".fs-text-input").blur(function () {

            if ($(this).val().length > 0) {
                $(this).addClass("actived");
                $(this).removeClass("erroed");
                $(this).css("color", "#333");
            } else {
                $(this).removeClass("actived");
                $(this).addClass("erroed");
                $(this).css("color", "#fe426f");
            }
        });
    },
    Img_upload:function () {  
        //上传图片
          $(".fs-img-file").change(function (e) {
            var imgPath = $(this).val();
            var ipt = $(this);
            if (imgPath == "") {
                showInfo('请选择上传图片!');
                //alert("请选择上传图片！");
                return;
            }
            //判断上传文件的后缀名
            var strExtension = imgPath.substr(imgPath.lastIndexOf('.') + 1);
            if (strExtension != 'jpg' && strExtension != 'gif' &&
                strExtension != 'png' && strExtension != 'bmp' && strExtension != 'JPG' && strExtension != 'PNG') {
                showInfo('请选择图片文件!');
                // alert("请选择图片文件");
                return;
            } else {
                for (var n = 0; n < this.files.length; n++) {
                    var fileObj = this.files[n];
                    var imgUrl = window.URL.createObjectURL(this.files[n]);
                    var form_2 = new FormData();
                    // ipt.parent().siblings(".img-box").find("div").css("background", "url(" + imgUrl + ") no-repeat").css("background-size", "100% 100%").find("img").attr("src", imgUrl)
                    form_2.append("login_uid", atteRolu.login_uid);
                    form_2.append("login_token", atteRolu.login_token);
                    form_2.append("file", fileObj);
                    fetch(server + "/file/upload", {
                        method: 'POST',
                        //headers: myHeaders,
                        mode: 'cors',
                        cache: 'default',
                        body: form_2
                    }).then((response) => response.json()).then(function (data) {
                        //console.log(data);
                        // atteRolu[ipt.attr("name")]=222;
                        //  console.log(atteRolu.pic_id_front);
                        if (data.code == 200) {
                            //添加图片 
                            ipt.parent().siblings(".img-box").find("div").css("background", "url(" + data.data.url + ") no-repeat").css("background-size", "100% 100%").find("img").attr("src", data.data.url);
                            ipt.addClass("actived").removeClass("erroed");
                            atteRolu[ipt.attr("name")] = data.data.url;


                        } else {
                            ipt.addClass("erroed").removeClass("actived");
                            showInfo('当前网络不稳定,上传失败,请重新上传');
                        }

                    });

                }
            }

        });
    },
    ClickSubmit:function () {  
        //点击提交按钮
          //点击提交  判断是否都填写完成 
        $(".fs-atte-submit").click(function (e) {
            e.preventDefault();
            // 判断是否都填写完成 

            if ($(".fs-input").length == $(".fs-input.actived").length) {
                //都填了 fetch   跳转
                var form_2 = new FormData();
                for (var j = 0; j < $(".fs-input.actived").length; j++) {
                    var element = $($(".fs-input.actived")[j]);
                    form_2.append(element.attr("name"), element.val()); // 
                }
             
                form_2.append("login_uid", atteRolu.login_uid); // 
                form_2.append("login_token", atteRolu.login_token); //
                fetch(server + "/user/authentication", {
                    method: 'POST',
                    //headers: myHeaders,
                    mode: 'cors',
                    cache: 'default',
                    body: form_2
                }).then((response) => response.json()).then(function (data) {
                    if (data.code == 200) {
                        // 成功 跳转网页
                        alert("提交成功");
                        window.location.href = 'attestation_after.html?login_uid=' + atteRolu.login_uid + "&login_token=" + atteRolu.login_token;

                    } else if (data.code == 400) {
                        showInfo(data.message);
                    } else {
                        showInfo('当前网络不稳定,提交失败,请重新提交');
                    }

                });


            } else {
                //有没填 的 
                if ($($(".fs-input.erroed")[0]).hasClass("fs-img-file")) {
                    //图片没上传
                    showInfo( "logo没上传");

                } else {
                    //其他没填写
                    showInfo($($(".fs-input.erroed")[0]).siblings("p").html() + "没填写");
                }
            }

        });
    }
    
};

//家族信息完善
var Family_msg_done={ 
    init:function () { 
        this.DataLoad();
     },
     DataLoad:function () {  
         //显示数据
           //            var form = new FormData();
        //     form.append("uid", uid); // 

        //     fetch(server + "/user/my_info", {
        //         method: 'POST',
        // //      headers: { 'Accept': 'application/json',
        // //      'Content-Type': 'application/json'},
        //         mode: 'cors',
        //         cache: 'default',
        //         body: form
        //     }).then((response) => response.json()).then(function (data) {
        //         //console.log(data);
        //         if (data.code == 200) {
        //             console.log(data);
        //         }
        //     });
     }
};

//成员管理
var Membership={
    init:function () {  

    },
    searchSome:function () {  
        //上面搜索框
    },
    DataLoad:function () { 
        //数据加载
     },
    ClickSearch:function () {  
        //查询 相关
    },
    editSome:function () {  
        //操作的各个按钮
       
        //编辑 
    },
    Atte_msg:function () {  
        //认证信息 显示数据
         //            var form = new FormData();
        //     form.append("uid", uid); // 

        //     fetch(server + "/user/my_info", {
        //         method: 'POST',
        // //      headers: { 'Accept': 'application/json',
        // //      'Content-Type': 'application/json'},
        //         mode: 'cors',
        //         cache: 'default',
        //         body: form
        //     }).then((response) => response.json()).then(function (data) {
        //         //console.log(data);
        //         if (data.code == 200) {
        //             console.log(data);
        //         }
        //     });
    },
    AddJjr:function () {  
        // 添加经纪人
             //   var form = new FormData();
        //     form.append("uid", uid); // 

        //     fetch(server + "/user/my_info", {
        //         method: 'POST',
        // //      headers: { 'Accept': 'application/json',
        // //      'Content-Type': 'application/json'},
        //         mode: 'cors',
        //         cache: 'default',
        //         body: form
        //     }).then((response) => response.json()).then(function (data) {
        //         //console.log(data);
        //         if (data.code == 200) {
        //             console.log(data);
        //         }
        //     });

    },
    Check_contract:function () {  
        //查看合同
           //   var form = new FormData();
        //     form.append("uid", uid); // 

        //     fetch(server + "/user/my_info", {
        //         method: 'POST',
        // //      headers: { 'Accept': 'application/json',
        // //      'Content-Type': 'application/json'},
        //         mode: 'cors',
        //         cache: 'default',
        //         body: form
        //     }).then((response) => response.json()).then(function (data) {
        //         //console.log(data);
        //         if (data.code == 200) {
        //             console.log(data);
        //         }
        //     });
    },
    Del_people:function () {  
        //移除成员
    },
    Edit_people:function () {  
        //编辑成员
    },
    Batch_anchor:function () {  
        //导入主播 
        //显示数据
        //点击 checkbox 导入
    }

};

//成员增减审批
var People_add={
    init:function () {  
        
    }, 
     searchSome:function () {  
        //上面搜索框
    },
    Atte_msg:function () {
        //点击编辑  
        //认证信息 显示数据
         //    var form = new FormData();
        //     form.append("uid", uid); // 

        //     fetch(server + "/user/my_info", {
        //         method: 'POST',
        //         headers: { 'Accept': 'application/json',
        //        'Content-Type': 'application/json'},
        //         mode: 'cors',
        //         cache: 'default',
        //         body: form
        //     }).then((response) => response.json()).then(function (data) {
        //         //console.log(data);
        //         if (data.code == 200) {
        //             console.log(data);
        //         }
        //     });

    },
    Sign_contact:function () {  
        //签署合同

    },
    Edit_agree:function () {  
        //同意或者驳回

          //    var form = new FormData();
        //     form.append("uid", uid); // 

        //     fetch(server + "/user/my_info", {
        //         method: 'POST',
        //         headers: { 'Accept': 'application/json',
        //        'Content-Type': 'application/json'},
        //         mode: 'cors',
        //         cache: 'default',
        //         body: form
        //     }).then((response) => response.json()).then(function (data) {
        //         //console.log(data);
        //         if (data.code == 200) {
        //             console.log(data);
        //         }
        //     });
    }


}

//成员月数据
var People_month_data={
    init:function () {  

    },
    searchSome:function () {  
        //上面搜索框
    },
    DataLoad:function () {  
        //数据加载 
    }
}

//成员天数据
var People_day_data={
    init:function () {  

    },
    searchSome:function () {  
        //上面搜索框
    },
    DataLoad:function () {  
        //数据加载 
    }
}

//家族收入来源
var Famliy_income={
    init:function () {  

    },
    searchSome:function () {  
        //上面搜索
    },
    DataLoad:function () {  
        //表格数据加载
    }
}



$(function () {
    //
    login_uid = $.getUrlParam("login_uid"); //更新 uid
    // Comment.init();
    // Index.init();
    // Public_notice.init(); //公告
    // Family_index.init(); //家族首页
    // Family_setting.init();//家族设置
    // Family_msg_done.init(); //家族信息完善 
    
       
});

