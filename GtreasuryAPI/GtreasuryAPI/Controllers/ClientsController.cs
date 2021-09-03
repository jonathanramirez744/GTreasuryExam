using GtreasuryAPI.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
namespace GtreasuryAPI.Controllers
{
    public class ClientsController : ApiController
    {

        //Get the clients info
        
        private GTreasuryEntities1 _context;

        public ClientsController()
        {
            _context = new GTreasuryEntities1();
        }

        [HttpGet]
        public IHttpActionResult getClientsInfo()
        {
            var clients = _context.tblClients.Include(s => s.tblLoans).Select(s=> new { 
                s.intClientId,
                strFullNae = s.strClientSurname + ", " + s.strClientName +" " + s.strClientMiddleName + "." ,
                tblLoans = s.tblLoans.Select(l => new {
                    l.intLoanId,
                    l.dblLoanAmont,
                    l.intLoanTerm
                })
            });

            var loansSummary = _context.tblLoans.Include(s => s.tblClient);
            return Ok(new { data = loansSummary });
        }

        [HttpPut]

        public IHttpActionResult UpdateClients(tblLoan tblLoan)
        {


            int ClientId = tblLoan.tblClient.intClientId;
            var ClientInfo = _context.tblLoans.SingleOrDefault(c => c.intClientId == ClientId);
            if (ClientInfo == null)
                throw new HttpResponseException(HttpStatusCode.NotFound);
            ClientInfo.tblClient.strClientName = tblLoan.tblClient.strClientName;
            ClientInfo.dblLoadFixedRate = tblLoan.dblLoadFixedRate;
            _context.SaveChanges();

            return Ok();
        }

        [HttpPost]
        public IHttpActionResult AddClients(tblLoan tblLoan)
        {

            //Save the User
            tblClient tblClient = new tblClient()
            {
                strClientMiddleName = "NA",
                strClientSurname = "NA",
                strClientName = tblLoan.strClientName,
                dtmClientBirthDate = DateTime.Now,
            };
            _context.tblClients.Add(tblClient);
            _context.SaveChanges();


            //get the Primary key
            var ClientId = _context.tblClients.SingleOrDefault(s => s.strClientName == tblLoan.strClientName).intClientId;
            tblLoan tblLoan1 = new tblLoan()
            {
                dblLoanAmont = tblLoan.dblLoanAmont,
                dtmLoanStartDate = tblLoan.dtmLoanStartDate,
                intLoanTerm = tblLoan.intLoanTerm,
                dblLoadFixedRate = tblLoan.dblLoadFixedRate,
                intClientId = ClientId
            };
            _context.tblLoans.Add(tblLoan1);
            _context.SaveChanges();


            return Ok();
        }
        [HttpDelete]
        public IHttpActionResult DeleteClients(tblLoan tblLoan)
        {
            var LoanId = tblLoan.intLoanId;
            var customerInDb = _context.tblLoans.Single(c => c.intLoanId == LoanId);
            if (customerInDb == null)
                throw new HttpResponseException(HttpStatusCode.NotFound);
            _context.tblLoans.Remove(customerInDb);
            _context.SaveChanges();

            return Ok();
        }
    }
}
