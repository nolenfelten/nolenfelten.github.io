Number.prototype.formatMoney = function (c, d, t) {
    var n = this,
        c = isNaN(c = Math.abs(c)) ? 2 : c,
        d = d == undefined ? "." : d,
        t = t == undefined ? "," : t,
        s = n < 0 ? "-" : "",
        i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "",
        j = (j = i.length) > 3 ? j % 3 : 0;
    return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
};

if (jQuery.widget !== undefined && jQuery.ui.tooltip !== undefined) {
    jQuery.widget.bridge('uitooltip', jQuery.ui.tooltip); // Resolve name collision between jQuery UI and Twitter Bootstrap
}

jQuery(function ($) {
    sln_init($);
    if(salon.has_stockholm_transition == 'yes'){
        $('body').on("click",'a[target!="_blank"]:not(.no_ajax):not(.no_link)', function(){setTimeout(function(){sln_init(jQuery);}, 2000)});
    }
});

function sln_init($) {
    if ($('#salon-step-services').length || $('#salon-step-secondary').length) {
        sln_serviceTotal($);
    }
    if ($('#salon-step-date').length) {
        sln_stepDate($);
    } else {
        if ($('#salon-step-details').length) {
            $('a.tec-link').click(function (e) {
                e.preventDefault();
                var href = $(this).attr('href');
                var locHref = window.location.href;
                var hrefGlue = (href.indexOf('?') == -1) ? '?' : '&' ;
                var locHrefGlue = (locHref.indexOf('?') == -1) ? '?' : '&';
                window.location.href = href + hrefGlue +'redirect_to=' + encodeURI(locHref + locHrefGlue +'sln_step_page=details');
            });
        }
        if ($('#salon-step-details-new').length) {
            facebookInit();
        }
        $('[data-salon-toggle="next"]').click(function (e) {
            var form = $(this).closest('form');
            $('#sln-salon input.sln-invalid').removeClass('sln-invalid');
            if (form[0].checkValidity()) {
                sln_loadStep($, form.serialize() + '&' + $(this).data('salon-data'));
            }else{
                $('#sln-salon input:invalid').addClass('sln-invalid').attr('placeholder', salon.checkout_field_placeholder);
            }
            return false;
        });
    }
    $('[data-salon-toggle="direct"]').click(function (e) {
        e.preventDefault();
        sln_loadStep($, $(this).data('salon-data'));
        return false;
    });

    // CHECKBOXES
    $('#sln-salon input:checkbox').each(function () {
        $(this).change(function () {
            if($(this).is(':checked')) {
                $(this).parent().addClass("is-checked");
            }
            else {
                $(this).parent().removeClass("is-checked");
            }

        })
    });
    // RADIOBOXES
    $('#sln-salon input:radio').each(function () {
        $(this).click(function () {
            //var selector = '.is-checked input[name="' + jQuery(this).attr('name').replace(/([\[\]])/g, '\\\\$1') + '"]';
            var name = jQuery(this).attr('name');
            jQuery('.is-checked').each(function() {
                if(jQuery(this).find('input').attr('name') == name) {
                    $(this).removeClass('is-checked');
                }
            });
            $(this).parent().toggleClass("is-checked");
        });
    });

    $('.sln-edit-text').change(function() {
        var data = "key=" + $(this).attr('id') + "&value=" + $(this).val() + "&action=salon&method=SetCustomText&security=" + salon.ajax_nonce;
        $.ajax({
            url: salon.ajax_url,
            data: data,
            method: 'POST',
            dataType: 'json',
            success: function (data) {
            },
            error: function(data){alert('error'); console.log(data);}
        });
        return false;
    });

    $('div.editable').on('click', function() {
        var self = $(this);
        self.addClass('focus');
        var text  = self.find('.text');
        var input = self.find('input');
        input.val(text.text().trim()).trigger('focus');
    });

    $('div.editable .input input').on('blur', function() {
        var self = $(this);
        var div  = self.closest('.editable');
        div.removeClass('focus');
        var text = div.find('.text');
        text.html(self.val());
    });

    $('#sln_no_user_account').on('change', function() {
        if ($(this).is(':checked')) {
            $('#sln_password').attr('disabled', 'disabled').parent().css('display', 'none');
            $('#sln_password_confirm').attr('disabled', 'disabled').parent().css('display', 'none');
        }
        else {
            $('#sln_password').attr('disabled', false).parent().css('display', 'block');
            $('#sln_password_confirm').attr('disabled', false).parent().css('display', 'block');
        }
    }).change();
}
function sln_loadStep($, data) {
    var loadingMessage = '<div class="sln-loader-wrapper"><div class="sln-loader">Loading...</div></div>';
    data += "&action=salon&method=salonStep&security=" + salon.ajax_nonce;
    $('#sln-notifications').html(loadingMessage).addClass('sln-notifications--active');
    $.ajax({
        url: salon.ajax_url,
        data: data,
        method: 'POST',
        dataType: 'json',
        success: function (data) {
            if (typeof data.redirect != 'undefined') {
                window.location.href = data.redirect;
            } else {
                $('#sln-salon').replaceWith(data.content);
                salon.ajax_nonce = data.nonce;
                $('html, body').animate({
                    scrollTop: $("#sln-salon").offset().top
                }, 700);
                sln_init($);
            }
        },
        error: function(data){alert('error'); console.log(data);}
    });
}

function sln_stepDate($) {
    var isValid;
    var items = $('#salon-step-date').data('intervals');
    var doingFunc = false;
    var func = function () {
        if (doingFunc) return;
        setTimeout(function () {
            doingFunc = true;
            $('[data-ymd]').addClass('disabled');
            $.each(items.dates, function (key, value) {
                $('.day[data-ymd="' + value + '"]').removeClass('disabled');
            });
            $('.day[data-ymd]').removeClass('full');
            $.each(items.fullDays, function (key, value) {
                console.log(value);
                $('.day[data-ymd="' + value + '"]').addClass('disabled full');
            });

            $.each(items.times, function (key, value) {
                $('.hour[data-ymd="' + value + '"]').removeClass('disabled');
                $('.minute[data-ymd="' + value + '"]').removeClass('disabled');
                $('.hour[data-ymd="' + value.split(':')[0] + ':00"]').removeClass('disabled');
            });
            doingFunc = false;
        }, 200);
        return true;
    }
    func();
    $('body').on('sln_date', func);

    function validate(obj, autosubmit) {
        var form = $(obj).closest('form');
        //var validatingMessage = '<img src="' + salon.loading + '" alt="loading .." width="16" height="16" /> '+salon.txt_validating;
        var validatingMessage = '<div class="sln-alert sln-alert--wait">'+salon.txt_validating+'</div>';
        var data = form.serialize();
        data += "&action=salon&method=checkDate&security=" + salon.ajax_nonce;
        $('#sln-notifications').addClass('sln-notifications--active').html(validatingMessage);
        $.ajax({
            url: salon.ajax_url,
            data: data,
            method: 'POST',
            dataType: 'json',
            success: function (data) {
                $('.sln-alert').remove();
                if (!data.success) {
                    var alertBox = $('<div class="sln-alert sln-alert--problem"></div>');
                    $(data.errors).each(function () {
                        alertBox.append('<p>').html(this);
                    });
                    $('#sln-notifications').html('').append(alertBox);
// we bind a new interval so we needn't to disable
//                    $('#sln-step-submit').attr('disabled', true);
                    isValid = false;
                } else {
                    $('#sln-step-submit').attr('disabled', false);
                    $('#sln-notifications').html('').removeClass('sln-notifications--active');
                    isValid = true;
                    if (autosubmit)
                        submit();
                }
                bindIntervals(data.intervals);
            }
        });
    }

    function bindIntervals(intervals) {
//        putOptions($('#sln_date_day'), intervals.days, intervals.suggestedDay);
//        putOptions($('#sln_date_month'), intervals.months, intervals.suggestedMonth);
//        putOptions($('#sln_date_year'), intervals.years, intervals.suggestedYear);
        items = intervals;
        func();
        putOptions($('#sln_date'), intervals.suggestedDate);
        putOptions($('#sln_time'), intervals.suggestedTime);
    }

    function putOptions(selectElem, value) {
        selectElem.val(value);
    }

    function submit() {
        if ($('#sln-step-submit').data('salon-toggle').length)
            sln_loadStep($, $('#salon-step-date').serialize() + '&' + $('#sln-step-submit').data('salon-data'));
        else
            $('#sln-step-submit').click();
    }

    $('#sln_date, #sln_time').change(function () {
        validate(this, false);
    });
    $('#salon-step-date').submit(function () {
        if (!isValid) {
            validate(this, true);
        } else {
            submit();
        }
        return false;
    });

    initDatepickers($);
    initTimepickers($);
}

function sln_serviceTotal($) {
    var $checkboxes = $('.sln-service-list input[type="checkbox"]');
    var $totalbox = $('#services-total');
    function evalTot() {
        var tot = 0;
        $checkboxes.each(function () {
            if ($(this).is(':checked')) {
                tot += $(this).data('price');
            }
        });
        var decimals = (parseFloat(tot) === parseFloat(parseInt(tot)) ? 0 : 2);
        $totalbox.text($totalbox.data('symbol-left') + tot.formatMoney(decimals, $totalbox.data('symbol-decimal'), $totalbox.data('symbol-thousand')) + $totalbox.data('symbol-right'));
    }

    function checkServices($) {
        var form, data;
        if ($('#salon-step-services').size()) {
            form = $('#salon-step-services');
            data = form.serialize() + "&action=salon&method=CheckServices&part=primaryServices&security=" + salon.ajax_nonce;
        }
        else if ($('#salon-step-secondary').size()) {
            form = $('#salon-step-secondary');
            data = form.serialize() + "&action=salon&method=CheckServices&part=secondaryServices&security=" + salon.ajax_nonce;
        }
        else {
            return;
        }

        $.ajax({
            url: salon.ajax_url,
            data: data,
            method: 'POST',
            dataType: 'json',
            success: function (data) {
                if (!data.success) {
                    var alertBox = $('<div class="sln-alert sln-alert--problem"></div>');
                    $.each(data.errors, function () {
                        alertBox.append('<p>').html(this);
                    });
                }
                else {
                    $('.sln-alert').remove();
                    if(data.services)
                    $.each(data.services, function(index, value) {
                        var checkbox = $('#sln_services_' + index);
                        var errorsArea = $('#sln_services_' + index).closest('.sln-service').find('.errors-area');
                        if (value.status == -1) {
                            var alertBox = $('<div class="sln-alert sln-alert-medium sln-alert--problem"><p>' + value.error + '</p></div>');
                            checkbox.attr('checked', false).attr('disabled', 'disabled').change();
                            errorsArea.html(alertBox);
                        }
                        else if (value.status == 0) {
                            checkbox.attr('checked', false).attr('disabled', false).change();
                        }
                        else if (value.status == 1) {
                            checkbox.attr('checked', true).change();
                        }
                    });
                    evalTot();
                }
            }
        });
    }

    $checkboxes.click(function () {
        checkServices($);
    });
    checkServices($);
    evalTot();
}

function initDatepickers($) {
    $('.sln_datepicker input').each(function () {
        $(this).attr('readonly','readonly');
        if ($(this).hasClass('started')) {
            return;
        } else {
            $(this)
                .addClass('started')
                .datetimepicker({
                    format: $(this).data('format'),
                    weekStart: $(this).data('weekstart'),
                    minuteStep: 60,
                    autoclose: true,
                    minView: 2,
                    maxView: 4,
                    todayBtn: true,
                    language: $(this).data('locale')
                })
                .on('show', function () {
                    $('body').trigger('sln_date');
                })
                .on('place', function () {
                    $('body').trigger('sln_date');
                })
                .on('changeMonth', function () {
                    $('body').trigger('sln_date');
                })
                .on('changeYear', function () {
                    $('body').trigger('sln_date');
                })
                .on('hide', function () {
                    if($(this).is(':focus'));
                        $(this).blur();
               })
            ;
        }
    });
    var elementExists = document.getElementById('sln-salon');
    if( elementExists){
        setTimeout(function(){
        $('.datetimepicker.sln-datetimepicker').wrap( "<div class='sln-salon-bs-wrap'></div>" );
        }, 50);
    }
}

function initTimepickers($) {
    $('.sln_timepicker input').each(function () {
      $(this).attr('readonly','readonly');
        if ($(this).hasClass('started')) {
            return;
        } else {
            var picker = $(this)
                .addClass('started')
                .datetimepicker({
                    format: $(this).data('format'),
                    minuteStep: $(this).data('interval'),
                    autoclose: true,
                    minView: $(this).data('interval') == 60 ? 1: 0,
                    maxView: 1,
                    startView: 1,
                    showMeridian: $(this).data('meridian') ? true : false,
                })
                .on('show', function () {
                    $('body').trigger('sln_date');
                })
                .on('place', function () {
                    $('body').trigger('sln_date');
                })
                .on('hide', function () {
                    if($(this).is(':focus'));
                        $(this).blur();
                })

               .data('datetimepicker').picker;
            picker.addClass('timepicker');
        }
    });
}
/* ========================================================================
 * Bootstrap: transition.js v3.2.0
 * http://getbootstrap.com/javascript/#transitions
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // CSS TRANSITION SUPPORT (Shoutout: http://www.modernizr.com/)
  // ============================================================

  function transitionEnd() {
    var el = document.createElement('bootstrap')

    var transEndEventNames = {
      WebkitTransition : 'webkitTransitionEnd',
      MozTransition    : 'transitionend',
      OTransition      : 'oTransitionEnd otransitionend',
      transition       : 'transitionend'
    }

    for (var name in transEndEventNames) {
      if (el.style[name] !== undefined) {
        return { end: transEndEventNames[name] }
      }
    }

    return false // explicit for ie8 (  ._.)
  }

  // http://blog.alexmaccaw.com/css-transitions
  $.fn.emulateTransitionEnd = function (duration) {
    var called = false
    var $el = this
    $(this).one('bsTransitionEnd', function () { called = true })
    var callback = function () { if (!called) $($el).trigger($.support.transition.end) }
    setTimeout(callback, duration)
    return this
  }

  $(function () {
    $.support.transition = transitionEnd()

    if (!$.support.transition) return

    $.event.special.bsTransitionEnd = {
      bindType: $.support.transition.end,
      delegateType: $.support.transition.end,
      handle: function (e) {
        if ($(e.target).is(this)) return e.handleObj.handler.apply(this, arguments)
      }
    }
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: collapse.js v3.2.0
 * http://getbootstrap.com/javascript/#collapse
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // COLLAPSE PUBLIC CLASS DEFINITION
  // ================================

  var Collapse = function (element, options) {
    this.$element      = $(element)
    this.options       = $.extend({}, Collapse.DEFAULTS, options)
    this.transitioning = null

    if (this.options.parent) this.$parent = $(this.options.parent)
    if (this.options.toggle) this.toggle()
  }

  Collapse.VERSION  = '3.2.0'

  Collapse.DEFAULTS = {
    toggle: true
  }

  Collapse.prototype.dimension = function () {
    var hasWidth = this.$element.hasClass('width')
    return hasWidth ? 'width' : 'height'
  }

  Collapse.prototype.show = function () {
    if (this.transitioning || this.$element.hasClass('in')) return

    var startEvent = $.Event('show.bs.collapse')
    this.$element.trigger(startEvent)
    if (startEvent.isDefaultPrevented()) return

    var actives = this.$parent && this.$parent.find('> .panel > .in')

    if (actives && actives.length) {
      var hasData = actives.data('bs.collapse')
      if (hasData && hasData.transitioning) return
      Plugin.call(actives, 'hide')
      hasData || actives.data('bs.collapse', null)
    }

    var dimension = this.dimension()

    this.$element
      .removeClass('collapse')
      .addClass('collapsing')[dimension](0)

    this.transitioning = 1

    var complete = function () {
      this.$element
        .removeClass('collapsing')
        .addClass('collapse in')[dimension]('')
      this.transitioning = 0
      this.$element
        .trigger('shown.bs.collapse')
    }

    if (!$.support.transition) return complete.call(this)

    var scrollSize = $.camelCase(['scroll', dimension].join('-'))

    this.$element
      .one('bsTransitionEnd', $.proxy(complete, this))
      .emulateTransitionEnd(350)[dimension](this.$element[0][scrollSize])
  }

  Collapse.prototype.hide = function () {
    if (this.transitioning || !this.$element.hasClass('in')) return

    var startEvent = $.Event('hide.bs.collapse')
    this.$element.trigger(startEvent)
    if (startEvent.isDefaultPrevented()) return

    var dimension = this.dimension()

    this.$element[dimension](this.$element[dimension]())[0].offsetHeight

    this.$element
      .addClass('collapsing')
      .removeClass('collapse')
      .removeClass('in')

    this.transitioning = 1

    var complete = function () {
      this.transitioning = 0
      this.$element
        .trigger('hidden.bs.collapse')
        .removeClass('collapsing')
        .addClass('collapse')
    }

    if (!$.support.transition) return complete.call(this)

    this.$element
      [dimension](0)
      .one('bsTransitionEnd', $.proxy(complete, this))
      .emulateTransitionEnd(350)
  }

  Collapse.prototype.toggle = function () {
    this[this.$element.hasClass('in') ? 'hide' : 'show']()
  }


  // COLLAPSE PLUGIN DEFINITION
  // ==========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.collapse')
      var options = $.extend({}, Collapse.DEFAULTS, $this.data(), typeof option == 'object' && option)

      if (!data && options.toggle && option == 'show') option = !option
      if (!data) $this.data('bs.collapse', (data = new Collapse(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.collapse

  $.fn.collapse             = Plugin
  $.fn.collapse.Constructor = Collapse


  // COLLAPSE NO CONFLICT
  // ====================

  $.fn.collapse.noConflict = function () {
    $.fn.collapse = old
    return this
  }


  // COLLAPSE DATA-API
  // =================

  $(document).on('click.bs.collapse.data-api', '[data-toggle="collapse"]', function (e) {
    var href
    var $this   = $(this)
    var target  = $this.attr('data-target')
        || e.preventDefault()
        || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '') // strip for ie7
    var $target = $(target)
    var data    = $target.data('bs.collapse')
    var option  = data ? 'toggle' : $this.data()
    var parent  = $this.attr('data-parent')
    var $parent = parent && $(parent)

    if (!data || !data.transitioning) {
      if ($parent) $parent.find('[data-toggle="collapse"][data-parent="' + parent + '"]').not($this).addClass('collapsed')
      $this[$target.hasClass('in') ? 'addClass' : 'removeClass']('collapsed')
    }

    Plugin.call($target, option)
  });

function reattachEvents(){
    $('.sln-datetimepicker-close').unbind('click').click(function(){
      $('.datetimepicker.sln-datetimepicker').hide();
    });
}
setTimeout(function(){
  $('.datetimepicker.sln-datetimepicker div').append('<em class="sln-datetimepicker-close">'+salon.txt_close+'</em>');
  reattachEvents();
}, 500);
}(jQuery);

function facebookInit() {
    if (salon.fb_app_id !== undefined) {
        if (window.fbAsyncInit === undefined) {
            window.fbAsyncInit = function() {
                FB.init({
                    appId      : salon.fb_app_id,
                    cookie     : true,
                    xfbml      : true,
                    version    : 'v2.8'
                });
                FB.AppEvents.logPageView();

                jQuery('[data-salon-toggle=fb_login]').unbind('click').click(function() {
                    var callback;
                    if (jQuery(this).attr('data-salon-target') === 'step') {
                        callback = facebookRefreshStepCallback;
                    }
                    else {
                        callback = facebookRefreshPageCallback;
                    }

                    FB.login(function() {
                        facebookLogin(callback);
                    }, {scope: 'email'});

                    return false;
                });
            };

            (function(d, s, id){
                var js, fjs = d.getElementsByTagName(s)[0];
                if (d.getElementById(id)) {return;}
                js = d.createElement(s); js.id = id;
                js.src = "//connect.facebook.net/en_US/sdk.js";
                fjs.parentNode.insertBefore(js, fjs);
            }(document, 'script', 'facebook-jssdk'));
        }
        else {
            window.fbAsyncInit();
        }
    }
    else {
        jQuery('[data-salon-toggle=fb_login]').remove();
    }
}

function facebookLogin(callback) {
    var auth = FB.getAuthResponse();
    if (auth) {
        FB.api('/me?fields=id,email,name', function(response)
        {
            var email = response.email !== undefined ? response.email : '';
            var id = response.id !== undefined ? response.id : '';
            var name = response.name !== undefined ? response.name : '';
            var tmp = name.split(' ');
            var lastname = tmp.pop();
            var firstname = tmp.join(' ');

            var data = "fbEmail=" + email + "&fbID=" + id + "&fbFirstName=" + firstname + "&fbLastName=" + lastname + "&action=salon&method=FacebookLogin&security=" + salon.ajax_nonce;
            jQuery.ajax({
                url: salon.ajax_url,
                data: data,
                method: 'POST',
                dataType: 'json',
                success: callback,
                error: function(data){alert('error'); console.log(data);}
            });
        });
    }
}

function facebookRefreshStepCallback(response) {
    if (response.success) {
        var params = 'sln_step_page=details';
        sln_loadStep(jQuery, params);
    }
    else {
        var alertBox = jQuery('<div class="sln-alert sln-alert--problem"></div>');
        jQuery(response.errors).each(function () {
            alertBox.append('<p>').html(this);
        });
        jQuery('#sln-notifications').html('').append(alertBox);
    }
}

function facebookRefreshPageCallback(response) {
    if (response.success) {
        location.reload();
    }
    else {
        alert('error');
        console.log(response);
    }
}
