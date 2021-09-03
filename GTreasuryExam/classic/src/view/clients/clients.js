Ext.define('GTreasuryExam.view.clients.clients',{
    extend:'Ext.grid.Panel',
    xtype:'clients',
    title:'Clients',
    id:'clientsId',   
    requires:[
        'GTreasuryExam.view.clients.clientsController'
    ],
    store:{
        type:'myclients'
    },
    controller: 'clients',
    columns:[
        {text:'Client Name',dataIndex:'strClientName',flex:1},
        {text:'Loan Amount',dataIndex:'dblLoanAmont',flex:1},
        {text:'Loan Term',dataIndex:'intLoanTerm',flex:1},
        {
            xtype: 'actioncolumn',
            text:'Action',
            flex: .5,
            items: [{
                iconCls: 'ext ext-edit-html',
                tooltip: 'Edit',
                handler: 'onEdit'
            }, {
                iconCls: 'x-fa fa-trash',
                tooltip: 'Delete',
                handler: 'onDelete',
                margin:'0 5 0 0'
            }]

        }

    ],
    bbar: {
        xtype: 'pagingtoolbar',
        //store: Ext.data.StoreManager.lookup('clientsStoreId'),
        displayInfo: true,
        displayMsg: 'Display records {0} - {1} of {2}',
        emptyMsg: 'No Record to display'
    },

    buttons: [
        {
            xtype: 'button',
            text: 'Add New',
            handler: 'onClick'
        }
    ],    
})

//window to add and update
Ext.define('GTreasuryExam.view.clients.PopClients',{
    extend:'Ext.window.Window',  
    id:'clientMaintenanceId',
    requires:[
        'GTreasuryExam.view.clients.clientsController'
    ],
    viewModel: {
        type: 'clients'
    },
    bind: {
        title: '{formTitle}',
    },
    controller: 'clients',
    bodyPadding: 10,
    height: 500,
    width: 400,
    layout: 'fit',
    items:[
        {
            xtype:'form',
            id:'form-id-clients',
            defaultType:'textfield',
            items:[
                {
                    fieldLabel:'Name',
                    id:'strClientName',
                    name:'strClientName',
                    bind:{
                        value:'{selected.strClientName}',                   
                    },
                        
                    
                },
                {
                    xtype:'datefield',
                    fieldLabel:'StartDate',
                    name:'dtmLoanStartDate',
                    id:'dtmLoanStartDate',
                    //minValue: new Date(),
                    bind:{
                        value:'{selected.dtmLoanStartDate}',
                        readOnly:'{genHidden1}'
                    }
                },
                {
                    xtype: 'numberfield',
                    fieldLabel:'Loan Amount',
                    name:'dblLoanAmont',
                    minValue: 5000,
                    bind:{
                        value:'{selected.dblLoanAmont}',
                        readOnly:'{genHidden1}'

                    }
                },
                {
                    xtype: 'numberfield',
                    fieldLabel:'Term',
                    name:'intLoanTerm',
                    minValue: 1,
                    bind:{
                        value:'{selected.intLoanTerm}'
                    }
                },
                {
                    xtype: 'numberfield',
                    fieldLabel:'Fixed Rate',
                    name:'dblLoadFixedRate',
                    minValue: 0,
                    maxValue: 100,
                    bind:{
                        value:'{selected.dblLoadFixedRate}',
                        readOnly:'{genHidden1}'
                    }
                },
            ]
        }
    ],
    buttons: [
        {
            xtype: 'button',
            bind: {
                text: '{btnText}',
            },
            handler: 'onUpdate'
        },
        {
            xtype: 'button',
            text:'Generate',
            handler: 'onGenerate',
            bind: {
                hidden: '{genHidden}',
            },
        },
    ]
})


//Grid for the amortization
Ext.define('GTreasuryExam.view.clients.AmortizationGrid',{
    extend:'Ext.grid.Panel',
    xtype:'AmortizationGrid',
    id:'AmortizationGridId',
    store:{
        type:'amortization'
    },
    columns:[
        {
            text:'Payment Date',dataIndex:'PaymentDate',flex:1
        },
        {
            text:'Monthly Amortization',dataIndex:'Monthly',flex:1
        },
        {
            text:'Remaining Balance',dataIndex:'RemainingBalance',flex:1
        }
    ]
})

//Window for grid panel
Ext.define('GTreasuryExam.view.clients.AmortizationPop',{
    extend:'Ext.window.Window', 
    title:'Amortization Schedule',
    height: 500,
    width: 700,
    items:[
        {
            xtype:'AmortizationGrid'
        }
    ],
    overflowY: 'scroll'
})