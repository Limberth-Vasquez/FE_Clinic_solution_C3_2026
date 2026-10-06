using Microsoft.AspNetCore.Mvc;

namespace WEB_UI.Controllers
{
    public class PatientController : Controller
    {
        public IActionResult PatientList()
        {
            return View();
        }
    }
}
