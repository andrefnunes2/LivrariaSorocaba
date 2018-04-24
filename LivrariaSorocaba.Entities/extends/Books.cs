using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LivrariaSorocaba.Entities
{
    public partial class Books
    {
        public virtual ICollection<int> Authors { get; set; }
        public virtual ICollection<int> Categories { get; set; }
    }
}
