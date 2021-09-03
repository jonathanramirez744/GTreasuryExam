Ext.define('GTreasuryExam.model.clients',{
    extend:'GTreasuryExam.model.Base',
    alias: 'model.clients',
    fields:[
        {name:'intClientId'},
        {
            name:'strClientName',
            mapping:'tblClient.strClientName'
        },
        {
            name:'intLoanId',
        },
        {
            name:'dblLoanAmont',
        },
        {
            name:'intLoanTerm',
        },
    ]

})

Ext.define('GTreasuryExam.model.amortization',{
    extend:'GTreasuryExam.model.Base',
    alias: 'model.amortization',
    fields:[
        {name:'PaymentDate'},
        {name:'Monthly'},
        {name:'RemainingBalance'},       
    ]
})