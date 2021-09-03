CREATE TABLE [dbo].[tblClients] (
    [intClientId]         INT          IDENTITY (1, 1) NOT NULL,
    [strClientName]       VARCHAR (50) NOT NULL,
    [strClientMiddleName] VARCHAR (3)  NOT NULL,
    [strClientSurname]    VARCHAR (50) NOT NULL,
    [dtmClientBirthDate]  DATE         NOT NULL,
    CONSTRAINT [PK_tblClients] PRIMARY KEY CLUSTERED ([intClientId] ASC)
);

