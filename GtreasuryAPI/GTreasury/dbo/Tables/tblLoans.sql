CREATE TABLE [dbo].[tblLoans] (
    [intLoanId]        INT        IDENTITY (1, 1) NOT NULL,
    [dblLoanAmont]     FLOAT (53) NULL,
    [dtmLoanStartDate] DATE       NULL,
    [intLoanTerm]      INT        NULL,
    [dblLoadFixedRate] INT        NULL,
    [intClientId]      INT        NOT NULL,
    CONSTRAINT [PK_tblLoans] PRIMARY KEY CLUSTERED ([intLoanId] ASC), 
    CONSTRAINT [FK_tblLoans_tblClients] FOREIGN KEY ([intClientId]) REFERENCES [tblClients]([intClientId])
);

