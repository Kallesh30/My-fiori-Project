sap.ui.define([
	"tcs/hr/payroll/controller/BaseController",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator"
], function(Controller, Filter, FilterOperator) {
	"use strict";

	return Controller.extend("tcs.hr.payroll.controller.View1", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf tcs.hr.payroll.view.View1
		 */
		//	onInit: function() {
		//
		//	},

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf tcs.hr.payroll.view.View1
		 */
		//	onBeforeRendering: function() {
		//
		//	},
		onNext: function(){
			//step 1: Obtain the app object (mother) because only mother can help
			//to navigate to another child
			var oApp = this.getView().getParent().getParent();
			//step 2: ask mother to go to next child - view2
			oApp.toDetail("idView2");
		},
		onDelete: function(oEvent){
			var oItemToBeDeleted = oEvent.getParameter("listItem");
			var oList = oEvent.getSource();
			oList.removeItem(oItemToBeDeleted);
		},
		onSearch: function(oEvent){
			var searchVal = oEvent.getParameter("query");
			if(!searchVal){
				searchVal = oEvent.getParameter("newValue");
			}
			var oFilterNam = new Filter("name", FilterOperator.Contains, searchVal);
			var oFilterCat = new Filter("type", FilterOperator.Contains, searchVal);
			var oFilter = new Filter({
				filters: [oFilterNam, oFilterCat],
				and: false
			});
			var aFilter = [oFilter];
			var oList = this.getView().byId("idList");
			oList.getBinding("items").filter(aFilter);
		},
		onItemPress: function(oEvent){
			//get the address of selected item
			var oSelectedItem = oEvent.getParameter("listItem");
			var address = oSelectedItem.getBindingContextPath();
			//Get the view2 object and bind this address of selected element to whole of view 2
			var oView2 = this.getView().getParent().getParent().getDetailPages()[1];
			oView2.bindElement(address);
			this.onNext();
		}
		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf tcs.hr.payroll.view.View1
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf tcs.hr.payroll.view.View1
		 */
		//	onExit: function() {
		//
		//	}

	});

});