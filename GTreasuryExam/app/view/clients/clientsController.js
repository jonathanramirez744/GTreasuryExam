Ext.define('GTreasuryExam.view.clients.clientsController',{
    extend: 'Ext.app.ViewController',
    requires:[
        'GTreasuryExam.store.clients',
        'GTreasuryExam.store.amortization'
    ],
    alias:'controller.clients',
    onClick: function (args1, args2) {
        var popWin = Ext.create('GTreasuryExam.view.clients.PopClients');
        popWin.getViewModel().set('formTitle', 'Add New client');
        popWin.getViewModel().set('btnText', 'Add Client');
        popWin.getViewModel().set('genHidden', true);
        popWin.getViewModel().set('genHidden1', false);
        Ext.getCmp('dtmLoanStartDate').readOnly = true;
        popWin.show();
    },
    onEdit: function (grid, rowIndex, colIndex) {
        var selected = grid.getStore().getAt(rowIndex);
        var popWin = Ext.create('GTreasuryExam.view.clients.PopClients');
        selected.data.dtmLoanStartDate = new Date(selected.data.dtmLoanStartDate)
        popWin.getViewModel().set('selected', selected)
        popWin.getViewModel().set('formTitle', 'Update Client');
        popWin.getViewModel().set('btnText', 'Update');
        popWin.getViewModel().set('genHidden', false);
        popWin.getViewModel().set('genHidden1', true);
        //console.log(selected.data)
        Ext.getCmp('strClientName').readOnly = false;


        popWin.show();

    },

    onGenerate:function(sender, records){
        var me = this,
            win = me.getView();
            vm=win.getViewModel();
            
            record=vm.data.selected.data;
            //store = Ext.data.StoreManager.lookup('amortizationStoreId');
            //loanId=Ext.first('#txtRentalId').getValue();
        //store.filter('intLoanId', vm.data.fldTranscationID);
    
        var popWin = Ext.create('GTreasuryExam.view.clients.AmortizationPop');
        var grid = popWin.down('#AmortizationGridId');
        var store =  grid.store;
        store.filter('PaymentDate', record.intLoanId)
        popWin.show();
        console.log(store);
    },

    onUpdate:function(){
        var store = Ext.StoreManager.lookup('clientsStoreId');
        var me = this,
            win = me.getView();
            vm=win.getViewModel();
            
            vm_data = vm.data;
        
        console.log(vm.data.selected)     
        debugger;  
        if(vm.data.selected.data== undefined){
            store.insert(0, vm_data.selected);
            store.sync({
                callback:function(){
                    store.load();
                }
            });
        }else{
            var record = vm.data.selected.data;
            if(record.strClientName != record.tblClient.strClientName){
                record.tblClient.strClientName =record.strClientName
                
            }
            store.sync({
                callback:function(){
                    store.load();
                }
            });
        }
        
    },
    onDelete:function(grid, rowIndex, colIndex){
        var rec = grid.getStore().getAt(rowIndex);
        var internal_id = rec.internalId;
        var store = Ext.StoreManager.lookup('clientsStoreId');
        var record = store.getByInternalId(internal_id);
        console.log(record)
        Ext.MessageBox.confirm('Confirm', 'Are you sure you want to delete the customer?', function (btn) {
            if (btn == 'yes') {
                store.remove(record);
                store.sync({
                    callback:function(){
                        store.load();
                    }
                });
                
            }
        });
    }
})