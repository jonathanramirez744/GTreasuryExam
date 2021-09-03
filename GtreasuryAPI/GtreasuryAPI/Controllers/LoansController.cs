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
    public class LoansController : ApiController
    {

        private GTreasuryEntities1 _context;

        public LoansController()
        {
            _context = new GTreasuryEntities1();
        }

        [HttpGet]
        public IHttpActionResult GetLoanInfo(string filter = null)
        {

            int loanId = 1;
            if (!string.IsNullOrWhiteSpace(filter))
            {
                var filterProp = filter.Split(',').ToList();
                var searchValList = filterProp[1].Split(':').ToList();
                var searchVal = searchValList[1].Replace("\"", "");
                searchVal = searchVal.Replace("\\", "");
                searchVal = searchVal.Replace("}", "");
                searchVal = searchVal.Replace("]", "");
                loanId =int.Parse(searchVal);
            }

            var clients = _context.tblLoans.Include(s => s.tblClient).SingleOrDefault(s=>s.intLoanId==loanId);

            var LoanAmount = clients.dblLoanAmont;
            //n = Payments per year * number of years
            //r = Annual rate(converted to decimal) / 12 payments per year
            //D = Discount Factor
            //D = {[(1 + r)n] - 1} / [r(1 + r)n]

            var n = 12 * clients.intLoanTerm;
            var r = ((double)clients.dblLoadFixedRate / (double)100) / (double)12;

            var D_1 = Math.Pow((double)(1 + r), (double)(n)) - 1 ;
            var D_2 = Math.Pow((double)((1 + r)), (double)(n)) * r;
            var D = D_1 / D_2;

            var MonthlyAmortization = LoanAmount / D;
            var TotalLoanAmount = MonthlyAmortization * n;

            List<AmortSchedule> amortSchedules = new List<AmortSchedule>();

            DateTime paymentDate = (DateTime)clients.dtmLoanStartDate;
            var balance = TotalLoanAmount;
            for (var x = 0; x < n; x++)
            {
                paymentDate = paymentDate.AddMonths(1);
                balance = (balance - MonthlyAmortization) < 0? 0: balance - MonthlyAmortization;
                AmortSchedule amortSchedule = new AmortSchedule
                {
                    PaymentDate = paymentDate.AddMonths(1),
                    Monthly = (double)MonthlyAmortization,
                    RemainingBalance = (double)balance
                };
                amortSchedules.Add(amortSchedule);
            }
            return Ok(new {data = amortSchedules});
        }


    }
}
