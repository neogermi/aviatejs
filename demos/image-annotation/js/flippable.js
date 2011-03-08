/*
 * Copyright 2011 DFKI GmbH
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

(function($, undefined) {

    $.widget('ui.flippable', {

    	// default options
    	options: {
    		// the container that replaces the image in the DOM tree
    		container: jQuery("<div>")
    		.css('perspective', '1000') //defines how 'far away' we are
    		.css('-webkit-perspective', '1000'), //defines how 'far away' we are
    		
    		// the object that stores front (the image) and
    		// back (the metadata)
    		parent: jQuery('<div>')
    		.css('transform-style', 'preserve-3d')
    		.css('-webkit-transform-style', 'preserve-3d')
    		.css('transition', '1.0s linear')
    		.css('-webkit-transition', '1.0s linear')
    		.data('flipped', false),
    		
    		back: jQuery('<div>')
    		.css('overflow', 'auto') //make it scrollable
    		.css('backface-visibility', 'hidden')
    		.css('-webkit-backface-visibility', 'hidden')
    		.css('transform', 'rotateY(-180deg)')
    		.css('-webkit-transform', 'rotateY(-180deg)'),
    		
    		trigger: 'click'
    	},
    	
    	_create: function() {
    		var that = this;
    		
    		var image = jQuery(this.element);
    		
    		this._copyPosCss(image, this.options.container);
    		
    		//append the back-panel to the parent
    		//
    		this.options.back
    		.appendTo(this.options.parent);

    		var imgWidth = 200;//elem.width();
    		var imgHeight = 370;//elem.height();
    		
    		this.options.parent
    		.appendTo(this.options.container)
    		.width(imgWidth + 'px')
    		.height(imgHeight + 'px');
    		
    		this.options.back
    		.width(imgWidth + 'px')
    		.height(imgHeight + 'px');
    		
    		//replace the image with the container in the DOM tree
    		image
    		.replaceWith(this.options.container);
    		
    		//now we can put the image into the right place
    		this.options.parent
    		.prepend(image);
    		
    		//and add the correct CSS values
    		image
    		.css('backface-visibility', 'hidden')
    		.css('-webkit-backface-visibility', 'hidden')
    		.css('position', 'absolute')
    		.css('z-index', '0');
    			
    		//bind the flipping to the given event
    		that.options.parent
    		.bind(this.options.trigger, function (ev) {
				if (that.options.parent.data('flipped')) {
					that.options.parent.
					data('flipped', false)
	    			.css('-webkit-transform', 'rotateY(0deg)');
				} else {
					that.options.parent.
					data('flipped', true)
	    			.css('-webkit-transform', 'rotateY(-180deg)');
				}
    		});
    		
    		this.fillInfo(this.options.back);
    		
		},
		
		_copyPosCss: function (from, to) {
			var styles = ['float','position','marginLeft','marginRight',
			              'marginTop','marginBottom','paddingLeft','paddingRight',
			              'paddingTop','paddingBottom'];
			
			jQuery.each(styles, function (i, e) {
				if (from.css(e)) {
					to.css(e, from.css(e));
					from.css(e, '');
				}
			});
		},
		
		fillInfo: function (back) {
			var tbl = $('<table>');
			for (var i = 0; i < 100; i++) {
				var row = $('<tr>');
				
				var key = $('<td>' + i + '&nbsp;&nbsp;</td>');
				var val = $('<td>' + "germi" + '</td>');
				
				row.appendTo(tbl).append(key).append(val);
			}
			back.append(tbl);
		},
		
		_setOption: function( key, value ) {
			jQuery.Widget.prototype._setOption.apply(this, [key, value]);
			//TO BE COMING in jQueryUI 1.9: super._setOption(key, value);
		}
		
    });

}(jQuery));
