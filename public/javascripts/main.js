(function($) {

    var Navigation = {
        init: function() {
            this.createHandlers();
        },
        createHandlers: function() {
            this.mainElement = $("#main");
            this.navigation = this.mainElement.find(".nav");
            this.createTicketToService = this.navigation.find("#createTicketToService");
            this.createTicketToService.click(this.handleNavClick.process);
        },
        handleNavClick: {
            process: function(event) {
                $.ajax({
                    url: "/blocks/clientForm.html",
                    dataType: "html",
                    success: function(data) {
                        var content = $("#content");
                        content.html(data);
                        var clientForm = $("#clientForm");
                        content.fadeIn();
                        clientForm.find("input[type='submit']").click(function(event) {
                            event.preventDefault();
                            var formData = {};
                            clientForm.serializeArray().map(function(x){formData[x.name] = x.value;});
                            var go = clientValidate(formData);
                            if(go) {
                                $.ajax({
                                    url: "/getResource",
                                    dataType: "json",
                                    type: "post",
                                    data: JSON.stringify(formData),
                                    contentType: "application/json",
                                    success: function(responseData) {
                                        var div = $("<div>");
                                        var header = $("<h2>");
                                        header.text(responseData.text);
                                        var datefield = $("<div>");
                                        datefield.text(responseData.date);
                                        var status = $("<div>");
                                        status.text(responseData.status);
                                        div.append(header).append(datefield).append(status);
                                        content.empty();
                                        content.append(div);
                                    },
                                    error: function(xhr) {
                                        console.log(xhr.responseText);
                                    }
                                });
                            }

                        });
                    },
                    error: function() {
                        alert("Not OK");
                    }
                });
            }
        }

    };

    var State = {
        init: function() {
            this.getResource();
        },
        getResource: function() {
            $.ajax({
                url: document.location.pathname,
                dataType: "html",
                success: function(data) {


                },
                error: function() {
                    alert("Not OK");
                }
            });
        }
    };


    $(document).ready(function(){
        State.init();
        Navigation.init();
    });





})(jQuery);

