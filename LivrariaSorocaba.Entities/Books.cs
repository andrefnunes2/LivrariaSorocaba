//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace LivrariaSorocaba.Entities
{
    using System;
    using System.Collections.Generic;
    
    public partial class Books
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Books()
        {
            this.AuthorBooks = new HashSet<AuthorBooks>();
            this.CategoryBooks = new HashSet<CategoryBooks>();
        }
    
        public int ID { get; set; }
        public int IDPublisher { get; set; }
        public string Title { get; set; }
        public Nullable<System.DateTime> ReleaseDay { get; set; }
        public int Units { get; set; }
        public bool HasCover { get; set; }
        public string Description { get; set; }
        public Nullable<bool> Active { get; set; }
    
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<AuthorBooks> AuthorBooks { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<CategoryBooks> CategoryBooks { get; set; }
        public virtual Publishers Publishers { get; set; }
    }
}
