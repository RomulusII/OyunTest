﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Model
{
    public class Profession
    {
        [Key]
        public int Id { get; set; }

        public string Name { get; set; }
        public List<TechnologyAbilityImpact> AffectingAbilities { get; set; }

    }
}
