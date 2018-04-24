using LivrariaSorocaba.Entities;
using System;
using System.Linq;

namespace LivrariaSorocaba.Middleware.Controllers
{
    public class BooksController
    {
        DatabaseEntities db = new DatabaseEntities();

        public BooksController() {
            db.Configuration.ProxyCreationEnabled = false;
        }

        #region GET

        public object Get()
        {
            return db.Books.ToList().OrderBy(o => o.Title);
        }
        
        public object Get(int id)
        {
            db.Configuration.ProxyCreationEnabled = true;

            return (from b in db.Books
                    where b.ID == id
                    select new
                    {
                        ID = b.ID,
                        IDPublisher = b.IDPublisher,
                        Authors = b.AuthorBooks.Select(s => s.IDAuthor),
                        Categories = b.CategoryBooks.Select(s => s.IDCategory),
                        Title = b.Title,
                        Units = b.Units,
                        ReleaseDay = b.ReleaseDay,
                        Description = b.Description,
                        Active = b.Active
                    }
                ).FirstOrDefault();
        }

        public object GetPublishers()
        {
            return db.Publishers.ToList();
        }

        public object GetAuthors()
        {
            return db.Authors.ToList();
        }

        public object GetCategories()
        {
            return db.Categories.ToList();
        }
        #endregion

        #region POST

        public bool Post(Books book)
        {
            try
            {
                db.Books.Add(book);
                db.SaveChanges();

                var idBook = book.ID;

                foreach (int idAuthor in book.Authors)
                {
                    db.AuthorBooks.Add(new AuthorBooks() {
                        IDBook = idBook,
                        IDAuthor = idAuthor
                    });
                }

                foreach (int idCategory in book.Categories)
                {
                    db.CategoryBooks.Add(new CategoryBooks()
                    {
                        IDBook = idBook,
                        IDCategory = idCategory
                    });
                }
                db.SaveChanges();

                return true;
            }
            catch (Exception ex)
            {
                //registrar e tratar erro
                return false;
            }
        }

        #endregion

        #region PUT

        public bool Put(Books book)
        {
            try
            {
                if (db.Books.Find(book.ID) == null)
                    return false;

                db.AuthorBooks.RemoveRange(db.AuthorBooks.Where(w => w.IDBook == book.ID));
                db.CategoryBooks.RemoveRange(db.CategoryBooks.Where(w => w.IDBook == book.ID));
                db.SaveChanges();

                db.Entry(db.Books.Find(book.ID)).CurrentValues.SetValues(book);
                db.SaveChanges();

                var idBook = book.ID;
                
                foreach (int idAuthor in book.Authors)
                {
                    db.AuthorBooks.Add(new AuthorBooks()
                    {
                        IDBook = idBook,
                        IDAuthor = idAuthor
                    });
                }

                foreach (int idCategory in book.Categories)
                {
                    db.CategoryBooks.Add(new CategoryBooks()
                    {
                        IDBook = idBook,
                        IDCategory = idCategory
                    });
                }
                db.SaveChanges();
                
                return true;
            }
            catch (Exception ex)
            {
                //registrar e tratar erro
                return false;
            }
        }

        #endregion

        #region DELETE

        public void Delete(int idBook)
        {
            try
            {
                db.AuthorBooks.RemoveRange(db.AuthorBooks.Where(w => w.IDBook == idBook));
                db.CategoryBooks.RemoveRange(db.CategoryBooks.Where(w => w.IDBook == idBook));
                db.Books.Remove(db.Books.Find(idBook));
                db.SaveChanges();
            }
            catch (Exception ex)
            {
                //registrar e tratar erro
            }
        }

        #endregion
    }
}