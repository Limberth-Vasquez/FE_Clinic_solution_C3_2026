using Microsoft.AspNetCore.Mvc;
using WEB_UI.Models;

namespace WEB_UI.Controllers
{
    public class LoginController : Controller
    {
        public IActionResult Login()
        {
            return View();
        }

        [HttpPost]
        public IActionResult Login(User user)
        {
            if (user == null || string.IsNullOrEmpty(user.UserName) || string.IsNullOrEmpty(user.Password))
            {
                ViewBag.message = "usuario y/o contraseña incorrectos";
                return View();
            }

            //se debe hacer la validación de usuario y contraseña contra la base de datos
            //HttpClient --> Api --> Manager --> CRUD --> Mapper --> Dao --> BD

            user.FullName = "Limbert Vasquez Quesada";
            //iniciar sesion
            HttpContext.Session.SetString("user", user.FullName);
            return RedirectToAction("Index", "Home");
        }

        public IActionResult Logout() 
        {
            HttpContext.Session.Clear();
            return RedirectToAction("Index", "Home");
        }
    }
}
