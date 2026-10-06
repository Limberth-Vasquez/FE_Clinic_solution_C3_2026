using Microsoft.AspNetCore.Mvc;

namespace WEB_UI.Controllers
{
    public class AppointmentController : Controller
    {
        public IActionResult AppointmentList()
        {
            return View();
        }
        public IActionResult CreateAppointment()
        {
            return View();
        }
    }
}
