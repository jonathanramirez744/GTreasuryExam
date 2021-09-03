/*
 * This file launches the application by asking Ext JS to create
 * and launch() the Application class.
 */
Ext.application({
    extend: 'GTreasuryExam.Application',

    name: 'GTreasuryExam',

    requires: [
        // This will automatically load all classes in the GTreasuryExam namespace
        // so that application classes do not need to require each other.
        'GTreasuryExam.*'
    ],

    // The name of the initial view to create.
    mainView: 'GTreasuryExam.view.main.Main'
});
