using LivrariaSorocaba.Entities;
using LivrariaSorocaba.Middleware.Controllers;
using System.Web.Mvc;

namespace LivrariaSorocaba.Controllers
{
    public class MainController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        [HttpGet]
        public object GetBook(int id = 0)
        {
            return id > 0
                ? Json(new BooksController().Get(id), JsonRequestBehavior.AllowGet)
                : Json(new BooksController().Get(), JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public object GetPublishers()
        {
            return Json(new BooksController().GetPublishers(), JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public object GetAuthors()
        {
            return Json(new BooksController().GetAuthors(), JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public object GetCategories()
        {
            return Json(new BooksController().GetCategories(), JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public void SetBook(Books book)
        {
            if(book.ID > 0)
                new BooksController().Put(book);
            else
                new BooksController().Post(book);
        }

        [HttpGet]
        public void DeleteBook(int idBook)
        {
            if(idBook > 0) new BooksController().Delete(idBook);
        }
    }
}