/*
 * jQuery MultiSelect UI Widget Filtering Plugin 1.3pre
 * Copyright (c) 2011 Eric Hynds
 * http://www.erichynds.com/jquery/jquery-ui-multiselect-widget/
 * Depends:
 *  - jQuery UI MultiSelect widget
 * Dual licensed under the MIT and GPL licenses:
 *  http://www.opensource.org/licenses/mit-license.php
 *  http://www.gnu.org/licenses/gpl.html
*/
(function($){var rEscape = /[\-\[\]{}()*+?.,\\^$|#\s]/g;$.widget("ech.multiselectfilter", {options: {label: "Filter:",width: null,placeholder: "Enter keywords"},_create: function(){var self = this,opts = this.options,instance = (this.instance = $(this.element).data("multiselect")),header = (this.header = instance.menu.find(".ui-multiselect-header").addClass("ui-multiselect-hasfilter")),wrapper = (this.wrapper = $('<div class="ui-multiselect-filter">'+(opts.label.length ? opts.label : '')+'<input placeholder="'+opts.placeholder+'" type="search"' + (/\d/.test(opts.width) ? 'style="width:'+opts.width+'px"' : '') + ' /></div>').prependTo( this.header ));this.inputs = instance.menu.find('input[type="checkbox"], input[type="radio"]');this.input = wrapper.find("input").bind({keydown: function( e ){if( e.which === 13 ){e.preventDefault();}},keyup: $.proxy(self._handler, self),click: $.proxy(self._handler, self)});this.updateCache();instance._toggleChecked = function(flag, group){var $inputs = (group && group.length) ?group :this.labels.find('input'),_self = this,selector = self.instance._isOpen ?":disabled, :hidden" :":disabled";$inputs = $inputs.not( selector ).each(this._toggleCheckbox('checked', flag));this.update();var values = $inputs.map(function(){return this.value;}).get();this.element.find('option').filter(function(){if( !this.disabled && $.inArray(this.value, values) > -1 ){_self._toggleCheckbox('selected', flag).call( this );}});};$(document).bind("multiselectrefresh", function(){self.updateCache();self._handler();});},_handler: function( e ){var term = $.trim( this.input[0].value.toLowerCase() ),rows = this.rows, inputs = this.inputs, cache = this.cache;if( !term ){rows.show();} else {rows.hide();var regex = new RegExp(term.replace(rEscape, "\\$&"), 'gi');this._trigger( "filter", e, $.map(cache, function(v,i){if( v.search(regex) !== -1 ){rows.eq(i).show();return inputs.get(i);}return null;}));}this.instance.menu.find(".ui-multiselect-optgroup-label").each(function(){var $this = $(this);$this[ $this.nextUntil('.ui-multiselect-optgroup-label').filter(':visible').length ? 'show' : 'hide' ]();});},updateCache: function(){this.rows = this.instance.menu.find(".ui-multiselect-checkboxes li:not(.ui-multiselect-optgroup-label)");this.cache = this.element.children().map(function(){var self = $(this);if( this.tagName.toLowerCase() === "optgroup" ){self = self.children();}return self.map(function(){return this.innerHTML.toLowerCase();}).get();}).get();},widget: function(){return this.wrapper;},destroy: function(){$.Widget.prototype.destroy.call( this );this.input.val('').trigger("keyup");this.wrapper.remove();}});})(jQuery);