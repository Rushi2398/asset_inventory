sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel) {
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
            // onSelection: function(event){
            //     var oValue = event.getParameter("selectedItem").getParent().getValue()
            //     var path =event.getSource().getBindingContext().getPath();
            //     this.getView().byId("_IDGenObjectStatus2").setEnabled(false)
            //     console.log(path)
            // },
            // onSelection1: function(event){
            //     var oValue = event.getParameter("selectedItem").getParent().getValue()
            //     var path =event.getSource().getBindingContext().getPath();
            //     console.log(path)
            // }
        });
    });
