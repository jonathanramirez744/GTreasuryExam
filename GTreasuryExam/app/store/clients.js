Ext.define('GTreasuryExam.store.clients',{
    extend:'Ext.data.Store',
    alias:'store.myclients',
    storeId: 'clientsStoreId',
    model:'GTreasuryExam.model.clients',
    remoteFilter: true,
    pageSize:10,
    proxy: {
        type: 'rest',
        url: 'https://localhost:44352/api/Clients',
        actionMethods: {
            read:'GET',
            create: 'POST',
            update: 'PUT',
            destroy: 'DELETE'
        },
        api:
        {
            read: 'https://localhost:44352/api/Clients/get',
            create: 'https://localhost:44352/api/Clients/post?',
            update: 'https://localhost:44352/api/Clients/put?',
            destroy: 'https://localhost:44352/api/Clients/delete?'
        },
        reader: {
            type: 'json',
            rootProperty: 'data'
        },
        writer: {
            type: 'json',
            writeAllFields: true,
        }
    },
    autoLoad:true
}) 

Ext.define('GTreasuryExam.store.amortization',{
    extend:'Ext.data.Store',
    alias:'store.amortization',
    storeId: 'amortizationStoreId',
    model:'GTreasuryExam.model.amortization',
    remoteFilter: true,
    pageSize:10,
    proxy: {
        type: 'rest',
        url: 'https://localhost:44352/api/Loans',
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    },
    autoLoad:true
})