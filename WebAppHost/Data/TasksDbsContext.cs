using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using WebAppHost.Models;

namespace WebAppHost.Data
{
    public class TasksDbsContext : DbContext
    {
        public TasksDbsContext (DbContextOptions<TasksDbsContext> options)
            : base(options)
        {
        }

        public DbSet<WebAppHost.Models.Tasks> Tasks { get; set; } = default!;
    }
}
