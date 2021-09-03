using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace GtreasuryAPI.Models
{
    public class AmortSchedule
    {
        public DateTime PaymentDate { get; set; }
        public double Monthly { get; set; }

        public double RemainingBalance { get; set; }

    }
}