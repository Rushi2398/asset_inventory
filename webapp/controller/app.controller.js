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
            }
        });
    });
