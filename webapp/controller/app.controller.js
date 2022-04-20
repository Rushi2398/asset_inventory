sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageBox"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel, MessageBox, library) {
        "use strict";

        return Controller.extend("sap.ui.inventory.controller.app", {

            onInit: function () {
                
                var oData = {
                    "available": [
                        {
                            "key": "yes",
                            "value": "Yes"
                        }, 
                        {
                            "key": "no",
                            "value": "No"
                        }
                    ],
                    "inoperation": [
                        {
                            "key": "yes",
                            "value": "Yes"
                        },
                        {
                            "key": "less",
                            "value": "No (<1 year)"
                        },
                        {
                            "key": "more",
                            "value": "No (>1 year)"
                        }
                    ],
                    "other": [
                        {
                            "key": "updated",
                            "value": "Asset data to be updated"
                        },
                        {
                            "key": "inventoried",
                            "value": "Asset cannot be Inventoried"
                        },
                    ]
                }
                var oModel = new JSONModel(oData);
                this.getView().setModel(oModel,"custModel");

                var oTable = this.getView().byId("_IDGenTable1");
                var colCount = 7;
                oTable.setFixedColumnCount(colCount);
            },

            onAvailabilitySelection: function(event){
                var oDataModel = this.getOwnerComponent().getModel();
                try{
                    var oValue = event.getParameter("selectedItem").getParent().getValue();
                    var oBox = event.getSource();
                    oBox.setValueState(sap.ui.core.ValueState.None);
                } catch {
                    this.handleChange(event);
                }      
                // var oValue = event.getParameter("selectedItem").getParent().getValue();
                var path = event.getSource().getBindingContext().getPath();
                if (oValue === "No") {
                    oDataModel.setProperty(path+"/showAssetInOpertnDpDn",false)
                } else {
                    oDataModel.setProperty(path+"/showAssetInOpertnDpDn",true)
                }
            },

            onMassUpdatePress : function () {
                var oTable = this.getView().byId("_IDGenTable1");
                var selectIndices = oTable.getSelectedIndices();
                if(selectIndices.length != 0){
                    this._getDialog().open();
                } else {
                    MessageBox.alert("Select atleast one row for mass update!");
                }
            },

            _getDialog : function () {
                if (!this._oDialog) {
                    this._oDialog = sap.ui.xmlfragment("sap.ui.inventory.fragment.massUpdate", this);
                    this.getView().addDependent(this._oDialog);
                }
                return this._oDialog;
            },

            handleChange: function (oEvent) {
                var oValidatedComboBox = oEvent.getSource(),
                    sSelectedKey = oValidatedComboBox.getSelectedKey(),
                    sValue = oValidatedComboBox.getValue();
    
                if (!sSelectedKey && sValue) {
                    oValidatedComboBox.setValueState(sap.ui.core.ValueState.Error);
                    oValidatedComboBox.setValueStateText("Please enter a valid Selection!");
                } else {
                    oValidatedComboBox.setValueState(sap.ui.core.ValueState.None);
                }
            },

            saveDialog: function() {
                var available = sap.ui.getCore().byId("_IDGenComboStatus1").getValue();
                var inOperation = sap.ui.getCore().byId("_IDGenComboStatus2").getValue();
                var other = sap.ui.getCore().byId("_IDGenComboStatus3").getValue();
                var oTable = this.getView().byId("_IDGenTable1");
                var rows = oTable.getRows();
                var selectIndices = oTable.getSelectedIndices();
                var that = this;
                if (available === "") {
                    MessageBox.error("Select one value from Availability!");
                } else if (available === "Yes"){
                    if (inOperation === "") {
                        MessageBox.error("Select one value from InOperation")
                    } else {
                        that._populateData(available, inOperation, other, rows, selectIndices);
                    }
                } else if (available === "No"){
                    that._populateData(available, inOperation, other, rows, selectIndices);
                }
            },

            validateData : function(){
                var available = sap.ui.getCore().byId("_IDGenComboStatus1").getValue();
                if (available === "No"){
                    sap.ui.getCore().getControl("_IDGenComboStatus2").setEnabled(false);
                    sap.ui.getCore().getControl("_IDGenComboStatus3").setEnabled(false);
                } else {
                    sap.ui.getCore().getControl("_IDGenComboStatus2").setEnabled(true);
                    sap.ui.getCore().getControl("_IDGenComboStatus3").setEnabled(true);
                }
            },

            _populateData : function(available, inOperation, other, rows, selectIndices){
                for( var i of selectIndices){
                    var  path = rows[i].getBindingContext().getPath();
                    var oDataModel = this.getOwnerComponent().getModel();
                    if(available === "No"){
                        oDataModel.setProperty(path+"/Availability",available);
                        oDataModel.setProperty(path+"/showAssetInOpertnDpDn",false);
                        oDataModel.setProperty(path+"/InOperation",null);
                        oDataModel.setProperty(path+"/Other",null);
                    } else {
                        oDataModel.setProperty(path+"/Availability",available);
                        oDataModel.setProperty(path+"/showAssetInOpertnDpDn",true);
                        oDataModel.setProperty(path+"/InOperation",inOperation);
                        oDataModel.setProperty(path+"/Other",other);
                    }
                }
                this.closeDialog();
                return;                
            },
            
            closeDialog: function () {
                sap.ui.getCore().byId("_IDGenComboStatus1").setValue(null);
                sap.ui.getCore().byId("_IDGenComboStatus2").setValue(null);
                sap.ui.getCore().byId("_IDGenComboStatus3").setValue(null);
                sap.ui.getCore().getControl("_IDGenComboStatus2").setEnabled(true);
                sap.ui.getCore().getControl("_IDGenComboStatus3").setEnabled(true);
                this._getDialog().close();
            },

            onRefresh: function() {
                this.getView().byId("_IDGenTable1").getModel().refresh(true);
            }
        });
    });
