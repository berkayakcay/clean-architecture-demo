using System;
using System.Collections.Generic;
using System.Linq;
using Domain;

namespace Persistence
{
    public class Seed
    {
        public static void SeedData(DataContext context)
        {
            if (!context.Activity.Any())
            {
                var activities = new List<Activity>()
                {
                    new Activity
                    {
                        Title = "Insurer Activity",
                        Description = "2020 Insurer Meeting",
                        Category = "insurer",
                        Date = DateTime.Now.AddMonths(-1),
                        City = "İzmir",
                        Venue = "Konak"
                    }
                };
                context.Activity.AddRange(activities);
                context.SaveChanges();
            }
        }
    }
}