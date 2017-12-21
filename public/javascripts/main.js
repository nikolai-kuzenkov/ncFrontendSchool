(function($) {

    var Validation = {
        init: function() {

        },
        validate: function(data) {
            return true;
        }
    };

    var AppView = {
        init: function() {
            this.content = $("#main").find("#content");
        },
        redraw: function(redrawData) {
            var data = redrawData.data;
            var successCallback = redrawData.successCallback;
            var _this = this;
            this.content.fadeOut(function() {
                _this.content.html(data);
                _this.content.fadeIn(function() {
                    if(successCallback != undefined) {
                        successCallback(data);
                    }
                });
            });
        }
    };

    var Navigation = {
        init: function() {
            this.createHandlers();
            this.checkURL();
        },
        checkURL: function() {
            var resource = document.location.pathname;
            this.navigationStep.processRequest(resource, Navigation.wizard.getPageByResource(resource).redrawCallback);
        },
        createHandlers: function() {
            this.mainElement = $("#main");
            this.navigation = this.mainElement.find(".nav");
            this.navElements = this.navigation.find(".navigationButton");
            this.navElements.click(this.navigationStep.handleClick);
        },
        navigationStep: {
            handleClick: function(event) {
                var resource = $(this).data("loadresourse");
                Navigation.navigationStep.processRequest(resource, Navigation.wizard.getPageByResource(resource).redrawCallback);
            },
            processRequest: function(resource, successCallback) {
                $.ajax({
                    url: resource,
                    type: "post",
                    dataType: "html",
                    success: function(data) {
                        AppView.redraw({data: data, successCallback: successCallback});
                    },
                    error: function(xhr) {
                        alert("Not OK");
                    }
                });
            }
        },
        wizard: {
            getPageByResource: function(resource) {
                var page;
                var pages = $.map(Navigation.wizard.pages, function(value, index) {
                    return [value];
                });
                pages.forEach(function(item, i) {
                    if(item.resource == resource)
                        page = item;
                });
                return page;
            },
            pages: {
                main: {
                    name: "Main",
                    resource: "/",
                    redrawCallback: function(data) {

                    }
                },
                createTicket: {
                    name: "Create Ticket",
                    resource: "/createTicket",
                    redrawCallback: function(data) {
                        var clientForm = $("#clientForm");
                        clientForm.find("input[type='submit']").click(function(event) {
                            event.preventDefault();
                            var formData = {};
                            clientForm.serializeArray().map(function(x){formData[x.name] = x.value;});
                            if(Validation.validate(formData)) {
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
                                        $("#content").append(div);
                                    },
                                    error: function(xhr) {
                                        console.log(xhr.responseText);
                                    }
                                });
                            }

                        });
                    }
                }
            }
        }
    };


    $(document).ready(function() {
        AppView.init();
        Navigation.init();
    });

})(jQuery);

