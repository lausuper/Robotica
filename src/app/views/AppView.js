"use strict";

this.app = app || {};

this.app.views = app.views || {};

app.views.AppView = Backbone.View.extend({
  initialize : function() {
    $.material.init();
    this.$homeNavbarCollapseElement = this.$el.find('#home-navbar-collapse');
    this.$homeContentElement = this.$el.find("#home-content");
    this.$homeBlocklyWrapperElement = this.$el.find("#home-blockly-wrapper");
    this.$homeSimulatorWrapperElement = this.$el.find("#home-simulator-wrapper");
    this.$mapsModalElement = $("#maps-modal");
    this.$stateIndicatorElement = $("#state-indicator");
    
    this.setInitialLayoutMode();

    this.$homeNavbarCollapseElement.on('shown.bs.collapse hidden.bs.collapse', app.blocklyView.forceBlocklySvgResize);
    this.$homeSimulatorWrapperElement.click($.proxy(this.toggleLayoutMode, this));
  },
  setInitialLayoutMode : function() {
    if (_.contains(["xs", "sm"], this.getState())) {
      this.setLayoutModeCollapsed();
    } else { /* ["md", "lg"] */
      this.setLayoutModeExpanded();
    }
  },

  setLayoutModeCollapsed : function() {
    this.$homeContentElement.removeClass('content-expanded');
    this.$homeSimulatorWrapperElement.removeClass('simulator-expanded');
    this.$homeBlocklyWrapperElement.removeClass('blockly-expanded');
    this.$homeContentElement.addClass('content-collapsed');
    this.$homeSimulatorWrapperElement.addClass('simulator-collapsed');
    this.$homeBlocklyWrapperElement.addClass('blockly-collapsed');
    app.simulatorView.enableSimulatorDragging();
    app.simulatorView.onContainerResize();
    app.blocklyView.onContainerResize();
  },
  
  setLayoutModeExpanded : function() {
    this.$homeContentElement.removeClass('content-collapsed');
    this.$homeSimulatorWrapperElement.removeClass('simulator-collapsed');
    this.$homeBlocklyWrapperElement.removeClass('blockly-collapsed');
    this.$homeContentElement.addClass('content-expanded');
    this.$homeSimulatorWrapperElement.addClass('simulator-expanded');
    this.$homeBlocklyWrapperElement.addClass('blockly-expanded');
    app.simulatorView.disableSimulatorDragging();
    app.simulatorView.onContainerResize();
    app.blocklyView.onContainerResize();
  },
  
  toggleLayoutMode : function() {
    if(this.$homeContentElement.hasClass('content-expanded')) {
      this.setLayoutModeCollapsed();
    } else {
      this.setLayoutModeExpanded();
    }
  },

  getState : function() {
    var computedStyle = window.getComputedStyle(this.$stateIndicatorElement[0], ':before');
    return computedStyle.getPropertyValue('content').replace(/"/g,'') || 'unknown';
  }

});