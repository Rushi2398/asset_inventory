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
                console.log(this.getOwnerComponent().getModel())
                var oData = {
                    "available": [
                        {
                            "ID": 1,
                            "key": "yes",
                            "value": "Yes"
                        }, 
                        {
                            "ID": 2,
                            "key": "no",
                            "value": "No"
                        }
                    ],
                    "inoperation": [
                        {
                            "ID": 1,
                            "key": "yes",
                            "value": "Yes"
                        },
                        {
                            "ID": 2,
                            "key": "less",
                            "value": "No (<1 year)"
                        },
                        {
                            "ID": 3,
                            "key": "more",
                            "value": "No (>1 year)"
                        }
                    ],
                    "other": [
                        {
                            "ID": 1,
                            "key": "updated",
                            "value": "Asset data to be updated"
                        },
                        {
                            "ID": 2,
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
            onSelection: function(event){
                debugger
                var oDataModel = this.getOwnerComponent().getModel()
                //var oDataModel = event.getSource();                
                var oValue = event.getParameter("selectedItem").getParent().getValue()
                var path = event.getSource().getBindingContext().getPath();
                //var value = oDataModel.getProperty(path)
                //path = path.slice(1,path.length)
                console.log(path)
                
                console.log(oDataModel.getProperty(path))
                // if (oValue === "No") {
                //     oDataModel.getObject(path).showAssetInOpertnDpDn = false;
                // } else {
                //     oDataModel.getObject(path).showAssetInOpertnDpDn = true;
                // }
            },
            // onSelection1: function(event){
            //     var oValue = event.getParameter("selectedItem").getParent().getValue()
            //     var path =event.getSource().getBindingContext().getPath();
            //     console.log(path)
            // }
        });
    });
