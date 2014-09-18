/**
 * Angular Elastic Input Directive
 * A directive for AngularJS which automatically resizes the width of input field according to the content, while typing.
 * @author: Jacek Pulit <jacek.pulit@gmail.com>
 * @license: The MIT License
 */

'use strict';

angular.module('ngElasticInput', []).directive('elasticInput', function(){
    return {
        restrict: 'A',
        link: function postLink(scope, element, attrs) {

            var mirror = jQuery('<span style="position:fixed; top:-999px; left:0; white-space:pre;"></span>');

            element.css('minWidth', scope.$eval(attrs.elasticInputMinwidth) || 50);
            element.css('maxWidth', scope.$eval(attrs.elasticInputMaxwidth) || 250);

            jQuery.each([
                'fontFamily', 'fontSize', 'fontWeight', 'fontStyle',
                'letterSpacing', 'textTransform', 'wordSpacing', 'textIndent',
                'boxSizing', 'borderRightWidth', 'borderLeftWidth', 'borderLeftStyle', 'borderRightStyle',
                'paddingLeft', 'paddingRight', 'marginLeft', 'marginRight'], function(i,val){
                mirror.css(val, element.css(val));
            });

            jQuery('body').append(mirror);

            update();

            element.on("keydown keyup focus input propertychange change", function(){ update(); });

            function update() {
                mirror.text(element.val());
                element.css('width', mirror.outerWidth());
            }

        }
    };
});