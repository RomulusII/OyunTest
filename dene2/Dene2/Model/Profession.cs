using System;
using System.Collections.Generic;
using System.Text;

namespace Model
{
    public class Profession
    {
        public string Name { get; set; }
        public List<TechnologyAbilityImpact> AffectingAbilities { get; set; }

    }
}
