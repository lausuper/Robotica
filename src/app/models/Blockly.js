"use strict";

this.app = app || {};

this.app.models = app.models || {};

this.app.models.Blockly = Backbone.Model.extend({
  defaults: {},

  initialize: function() {

  },

  exportWorkspaceXml : function() {
    var xmlDom = Blockly.Xml.workspaceToDom(this.get('workspace'));
    var xmlText = Blockly.Xml.domToPrettyText(xmlDom);
    return xmlText;
  },

  addWorkspaceOnChangeListener : function(onChange) {
    this.get('workspace').addChangeListener(onChange);
  },

  removeWorkspaceOnChangeListener : function(onChange) {
    this.get('workspace').removeChangeListener(onChange);
  },

  exportWorkspaceArduino : function() {
    var code = Blockly.Arduino.workspaceToCode(this.get('workspace'));
    var setupRE = /void setup\(.*\) \{([\s\S]*?)\}/;
    var loopRE = /void loop\(.*\) \{([\s\S]*?)\s\}/;
    var allDefsRE = /([\s\S]*?)void setup()/;
    var allDefs = code.match(allDefsRE)[1];
    console.log("allDefs : " + allDefs);
    var setup = code.match(setupRE)[1];
    console.log("setup : " + setup);
    var loop = code.match(loopRE)[1];
    console.log("loop : " + loop);
    return arduinoCode.format(allDefs, setup, loop);
  },

  exportWorkspaceJavascript : function() {
    return Blockly.JavaScript.workspaceToCode(this.get('workspace'));
  },

  importWorkspaceXml : function(xmlText) {
    this.get('workspace').clear();
    var xmlDom = Blockly.Xml.textToDom(xmlText);
    Blockly.Xml.domToWorkspace(xmlDom, this.get('workspace'));
  },

  codeIsEmpty : function() {
    var code = Blockly.JavaScript.workspaceToCode(this.get('workspace'));
    return !code || !code.trim().length
  },

  clearWorkspace : function() {
    this.get('workspace').clear();
  }
});