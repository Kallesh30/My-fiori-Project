sap.ui.define(
	["sap/ui/core/UIComponent"], 
	function(UIComponent){
		return UIComponent.extend("tcs.hr.payroll.Component",{
			metadata: {
				manifest: "json"
			},
			init: function(){
				//calling the base class constructor to get the benefits 
				//from the base
				UIComponent.prototype.init.apply(this);
			},
			createContent: function(){
				var oView = new sap.ui.view("idRoot",{
					viewName: "tcs.hr.payroll.view.App",
					type: sap.ui.core.mvc.ViewType.XML
				});
				
				return oView;
			}
		});
});