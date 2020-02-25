sap.ui.define([
	"tcs/hr/payroll/controller/BaseController",
	"sap/m/MessageBox",
	"sap/m/MessageToast"
], function(Controller, MsgBox, MsgToast) {
	"use strict";

	return Controller.extend("tcs.hr.payroll.controller.View2", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf tcs.hr.payroll.view.View2
		 */
		//	onInit: function() {
		//
		//	},
		onApprove: function(){
			MsgBox.confirm("Do wish to order this fruit?",{
				title: "Confirm to Anubhav",
				onClose: this.myConfirm
			});
		},
		onDropdownChange: function(oEvent){
			this.printData(oEvent.getSource().getSelectedKey())	;
		},
		onMulti: function(oEvent){
			var oMulti = oEvent.getSource();
			var allItems = oMulti.getSelectedItems();
			var allData = "";
			for(var i=0; i<allItems.length; i++) {
				allData =  allData + "," + allItems[i].getKey();
			}
			this.printData(allData);
		},
		onWalla: function(){
			this.printData("wallah");
		},
		onItemPress: function(oEvent){
			//step 1: get the path of selected element
			var sPath = oEvent.getParameter("listItem").getBindingContextPath();
			//step 2: get the object of view3
			var oSplitApp = this.getView().getParent().getParent();
			var oView3 = oSplitApp.getDetailPages()[2];
			//step 3: bind view 3 with absolute path whole of view3
			oView3.bindElement(sPath);
			//step 4: trigger nav to 3rd level view
			oSplitApp.toDetail("idView3");
			
		},
		oFragFilter: null,
		oFragCity: null,
		onFilter: function(){
			if(!this.oFragFilter){
				this.oFragFilter = new sap.ui.xmlfragment("idFilter",
				"tcs.hr.payroll.fragments.popup",this);
				//this line will give fragment (child of the view) access to resources (model)
				//which view has
				this.getView().addDependent(this.oFragFilter);
				this.oFragFilter.bindAggregation("items",{
					path: '/supplier',
					template: new sap.m.DisplayListItem({
						label: "{name}",
						value: "{location}"
					})
				});
			}
			this.oFragFilter.open();
		},
		inpField: null,
		onItemSel: function(oEvent){
			var allItems =  oEvent.getParameter("selectedItems");
			if(allItems.length > 0){
				var oTable = this.getView().byId("suppTab");
				var aFilter = [];
				for (var i=0; i<allItems.length; i++) {
					aFilter.push(new sap.ui.model.Filter("name",
					sap.ui.model.FilterOperator.EQ, allItems[i].getLabel()));
					
				}
				var oFilter = new sap.ui.model.Filter({
					filters: aFilter,
					and: false
				});
				oTable.getBinding("items").filter([oFilter]);
			}else{
				var selItemTitle = oEvent.getParameter("selectedItem").getLabel();
				this.inpField.setValue(selItemTitle);
			}
		},
		onF4Help: function(oEvent){
			this.inpField = oEvent.getSource();
			if(!this.oFragCity){
				this.oFragCity = new sap.ui.xmlfragment("idCity",
								"tcs.hr.payroll.fragments.popup",this);
				//this line will give fragment (child of the view) access to resources (model)
				//which view has
				this.getView().addDependent(this.oFragCity);
				this.oFragCity.bindAggregation("items",{
					path: '/cities',
					template: new sap.m.DisplayListItem({
						label: "{name}",
						value: "{state}"
					})
				});
				this.oFragCity.setMultiSelect(false);
			}
			this.oFragCity.open();
		},
		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf tcs.hr.payroll.view.View2
		 */
		//	onBeforeRendering: function() {
		//
		//	},
		onBack: function(){
			//step 1: Obtain the app object (mother) because only mother can help
			//to navigate to another child
			var oApp = this.getView().getParent();
			//step 2: ask mother to go to next child - view2
			oApp.to("idView1");
		}
		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf tcs.hr.payroll.view.View2
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf tcs.hr.payroll.view.View2
		 */
		//	onExit: function() {
		//
		//	}

	});

});